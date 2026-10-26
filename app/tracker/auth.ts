import { headers } from "next/headers";
import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../chatgpt-auth";

type TrackerEnv = { DB?: D1Database; TRACKER_SETUP_EMAIL?: string };
const runtime = env as unknown as TrackerEnv;
export const SESSION_COOKIE = "tracker_session";
const SESSION_DAYS = 14;
// Hosted Workers rejects PBKDF2 calls above 100,000 iterations.
const ITERATIONS = 100_000;
const LEGACY_ITERATIONS = 600_000;

export function database(): D1Database {
  if (!runtime.DB) throw new Error("Tracker database is not configured. Run npm run tracker:db:local.");
  return runtime.DB;
}
export function normalizeUsername(value: unknown): string {
  const username = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (!/^[a-z0-9][a-z0-9._-]{2,31}$/.test(username)) throw new Error("Username must be 3–32 characters: letters, numbers, dots, underscores or hyphens.");
  return username;
}
export function validatePassword(value: unknown): string {
  if (typeof value !== "string" || value.length < 12 || value.length > 128) throw new Error("Password must be 12–128 characters.");
  return value;
}
function hex(bytes: Uint8Array): string { return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join(""); }
function unhex(value: string): Uint8Array { return Uint8Array.from(value.match(/.{2}/g) ?? [], byte => Number.parseInt(byte, 16)); }
async function derive(password: string, salt: Uint8Array, iterations: number): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  return hex(new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", salt: salt as BufferSource, iterations, hash: "SHA-256" }, key, 256)));
}
export async function hashPassword(password: string): Promise<string> {
  validatePassword(password);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2-sha256:${ITERATIONS}:${hex(salt)}:${await derive(password, salt, ITERATIONS)}`;
}
export async function verifyPassword(password: string, encoded: string): Promise<boolean> {
  const [algorithm, rounds, salt, hash] = encoded.split(":");
  if (algorithm !== "pbkdf2-sha256" || ![String(ITERATIONS), String(LEGACY_ITERATIONS)].includes(rounds) || !/^[0-9a-f]{32}$/.test(salt ?? "") || !/^[0-9a-f]{64}$/.test(hash ?? "")) return false;
  const actual = await derive(password, unhex(salt), Number(rounds));
  let diff = 0;
  for (let i = 0; i < hash.length; i++) diff |= hash.charCodeAt(i) ^ actual.charCodeAt(i);
  return diff === 0;
}
export async function tokenHash(token: string): Promise<string> { return hex(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token)))); }
export function cookieValue(request: Request): string | null {
  const cookie = request.headers.get("cookie")?.split(";").map(item => item.trim()).find(item => item.startsWith(`${SESSION_COOKIE}=`));
  const token = cookie?.slice(SESSION_COOKIE.length + 1);
  return token && /^[0-9a-f]{64}$/.test(token) ? token : null;
}
export async function currentCookie(): Promise<string | null> {
  const cookie = (await headers()).get("cookie")?.split(";").map(item => item.trim()).find(item => item.startsWith(`${SESSION_COOKIE}=`));
  const token = cookie?.slice(SESSION_COOKIE.length + 1);
  return token && /^[0-9a-f]{64}$/.test(token) ? token : null;
}
export async function createSession(userId: string, request: Request): Promise<string> {
  const token = hex(crypto.getRandomValues(new Uint8Array(32)));
  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_DAYS * 86400_000).toISOString();
  await database().prepare("INSERT INTO tracker_sessions(token_hash,user_id,expires_at,created_at) VALUES(?,?,?,?)").bind(await tokenHash(token), userId, expires, now.toISOString()).run();
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_DAYS * 86400}${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`;
}
export function clearSessionCookie(request: Request): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`;
}
export function localSetupAllowed(request: Request): boolean {
  return process.env.NODE_ENV === "development" && ["localhost", "127.0.0.1", "[::1]"].includes(new URL(request.url).hostname);
}
export function setupKeyRequired(): boolean {
  return typeof process.env.TRACKER_SETUP_KEY === "string" && process.env.TRACKER_SETUP_KEY.length >= 32;
}
export async function setupAllowed(request: Request, suppliedKey?: unknown): Promise<boolean> {
  if (localSetupAllowed(request)) return true;
  if (setupKeyRequired()) {
    if (typeof suppliedKey !== "string") return false;
    const expected = await tokenHash(process.env.TRACKER_SETUP_KEY!);
    const actual = await tokenHash(suppliedKey);
    let diff = 0;
    for (let index = 0; index < expected.length; index++) diff |= expected.charCodeAt(index) ^ actual.charCodeAt(index);
    return diff === 0;
  }
  const email = runtime.TRACKER_SETUP_EMAIL?.trim().toLowerCase();
  if (!email) return false;
  const identity = await getChatGPTUser();
  return identity?.email.trim().toLowerCase() === email;
}
