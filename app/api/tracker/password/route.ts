import { clearSessionCookie, database, hashPassword, validatePassword, verifyPassword } from "../../../tracker/auth";
import { jsonError, member, sameOrigin } from "../../../tracker/server";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid request origin.", 403);
  const user = await member();
  if (!user) return jsonError("Sign in required.", 401);
  try {
    const input = await request.json() as Record<string, unknown>;
    const currentPassword = typeof input.currentPassword === "string" ? input.currentPassword : "";
    if (currentPassword.length > 128) return jsonError("Current password is incorrect.", 400);
    const newPassword = validatePassword(input.newPassword);
    const row = await database().prepare("SELECT password_hash FROM tracker_users WHERE id=?").bind(user.id).first<{password_hash:string}>();
    if (!row || !await verifyPassword(currentPassword, row.password_hash)) return jsonError("Current password is incorrect.", 400);
    if (await verifyPassword(newPassword, row.password_hash)) return jsonError("Choose a different password.", 400);
    const hash = await hashPassword(newPassword);
    await database().batch([
      database().prepare("UPDATE tracker_users SET password_hash=?,updated_at=? WHERE id=?").bind(hash, new Date().toISOString(), user.id),
      database().prepare("DELETE FROM tracker_sessions WHERE user_id=?").bind(user.id),
    ]);
    return Response.json({ ok: true }, { headers: { "Set-Cookie": clearSessionCookie(request), "Cache-Control": "no-store" } });
  } catch (error) { return jsonError(error instanceof Error ? error.message : "Could not change password.", 400); }
}
