import { createSession, database, hashPassword, normalizeUsername, setupAllowed, setupKeyRequired, validatePassword } from "../../../tracker/auth";
import { jsonError, sameOrigin } from "../../../tracker/server";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const row = await database().prepare("SELECT 1 FROM tracker_users WHERE role='tutor' LIMIT 1").first();
    return Response.json({ needsSetup: !row && (setupKeyRequired() || await setupAllowed(request)), setupKeyRequired: setupKeyRequired() }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return jsonError(error instanceof Error ? error.message : "Database unavailable.", 503); }
}
export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError("Setup is unavailable.", 403);
  try {
    const input = await request.json() as Record<string, unknown>;
    if (!await setupAllowed(request, input.setupKey)) return jsonError("Setup is unavailable.", 403);
    const username = normalizeUsername(input.username);
    const password = validatePassword(input.password);
    const displayName = typeof input.displayName === "string" ? input.displayName.trim().slice(0, 80) : "";
    if (!displayName) return jsonError("Enter your name.", 400);
    const existing = await database().prepare("SELECT 1 FROM tracker_users WHERE role='tutor' LIMIT 1").first();
    if (existing) return jsonError("Tutor account already exists.", 409);
    const now = new Date().toISOString(), id = crypto.randomUUID();
    const hash = await hashPassword(password);
    // The unique bootstrap guard prevents two simultaneous setup requests.
    const result = await database().prepare("INSERT INTO tracker_users(id,username,display_name,role,password_hash,created_at,updated_at) SELECT ?,?,?,'tutor',?,?,? WHERE NOT EXISTS (SELECT 1 FROM tracker_users WHERE role='tutor')").bind(id,username,displayName,hash,now,now).run();
    if (!result.meta.changes) return jsonError("Tutor account already exists.", 409);
    return Response.json({ ok:true }, { headers: { "Set-Cookie": await createSession(id, request), "Cache-Control":"no-store" } });
  } catch (error) { return jsonError(error instanceof Error ? error.message : "Setup failed.", 400); }
}
