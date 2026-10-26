import { clearSessionCookie, cookieValue, createSession, database, normalizeUsername, tokenHash, verifyPassword } from "../../../tracker/auth";
import { jsonError, sameOrigin } from "../../../tracker/server";

export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid request origin.", 403);
  try {
    const input = await request.json() as Record<string, unknown>;
    const username = normalizeUsername(input.username);
    const password = typeof input.password === "string" ? input.password : "";
    if (password.length > 128) return jsonError("Invalid username or password.", 401);
    const ip = request.headers.get("x-nf-client-connection-ip") ?? request.headers.get("cf-connecting-ip") ?? "local";
    const key = await tokenHash(`${ip}:${username}`);
    const now = new Date().toISOString();
    const throttle = await database().prepare("SELECT failures,blocked_until FROM tracker_login_throttle WHERE key=?").bind(key).first<{failures:number;blocked_until:string|null}>();
    if (throttle?.blocked_until && throttle.blocked_until > now) return jsonError("Too many attempts. Try again in 15 minutes.", 429);
    const user = await database().prepare("SELECT id,password_hash FROM tracker_users WHERE username=?").bind(username).first<{id:string;password_hash:string}>();
    if (!user || !await verifyPassword(password, user.password_hash)) {
      const failures = (throttle?.failures ?? 0) + 1;
      const blockedUntil = failures >= 5 ? new Date(Date.now() + 15 * 60_000).toISOString() : null;
      await database().prepare("INSERT INTO tracker_login_throttle(key,failures,blocked_until,updated_at) VALUES(?,?,?,?) ON CONFLICT(key) DO UPDATE SET failures=excluded.failures,blocked_until=excluded.blocked_until,updated_at=excluded.updated_at").bind(key,failures,blockedUntil,now).run();
      return jsonError("Invalid username or password.", 401);
    }
    await database().prepare("DELETE FROM tracker_login_throttle WHERE key=?").bind(key).run();
    return Response.json({ ok:true }, { headers: { "Set-Cookie": await createSession(user.id, request), "Cache-Control":"no-store" } });
  } catch (error) { return jsonError(error instanceof Error ? error.message : "Sign in failed.", 400); }
}
export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid request origin.", 403);
  const token = cookieValue(request);
  if (token) await database().prepare("DELETE FROM tracker_sessions WHERE token_hash=?").bind(await tokenHash(token)).run();
  return Response.json({ ok:true }, { headers: { "Set-Cookie": clearSessionCookie(request), "Cache-Control":"no-store" } });
}
