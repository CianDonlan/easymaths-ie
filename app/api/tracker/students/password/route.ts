import { database, hashPassword, validatePassword } from "../../../../tracker/auth";
import { jsonError, member, sameOrigin } from "../../../../tracker/server";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid request origin.", 403);
  const tutor = await member();
  if (!tutor || tutor.role !== "tutor") return jsonError("Tutor access required.", 403);
  try {
    const input = await request.json() as Record<string, unknown>;
    const studentId = typeof input.studentId === "string" ? input.studentId : "";
    if (!/^[0-9a-f-]{36}$/i.test(studentId)) return jsonError("Student not found.", 404);
    const newPassword = validatePassword(input.newPassword);
    const assigned = await database().prepare("SELECT 1 FROM tracker_assignments WHERE tutor_id=? AND student_id=?").bind(tutor.id, studentId).first();
    if (!assigned) return jsonError("Student not found.", 404);
    const hash = await hashPassword(newPassword);
    await database().batch([
      database().prepare("UPDATE tracker_users SET password_hash=?,updated_at=? WHERE id=? AND role='student'").bind(hash, new Date().toISOString(), studentId),
      database().prepare("DELETE FROM tracker_sessions WHERE user_id=?").bind(studentId),
    ]);
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return jsonError(error instanceof Error ? error.message : "Could not reset password.", 400); }
}
