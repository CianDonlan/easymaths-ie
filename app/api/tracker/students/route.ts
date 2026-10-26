import { database, hashPassword, normalizeUsername, validatePassword } from "../../../tracker/auth";
import { jsonError, member, sameOrigin } from "../../../tracker/server";

export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid request origin.", 403);
  const tutor = await member();
  if (!tutor || tutor.role !== "tutor") return jsonError("Tutor access required.", 403);
  try {
    const input = await request.json() as Record<string, unknown>;
    const username = normalizeUsername(input.username);
    const displayName = typeof input.displayName === "string" ? input.displayName.trim().slice(0, 80) : "";
    if (!displayName) return jsonError("Enter the student's name.", 400);
    const password = validatePassword(input.password);
    const hash = await hashPassword(password);
    const id = crypto.randomUUID(), now = new Date().toISOString();
    await database().batch([
      database().prepare("INSERT INTO tracker_users(id,username,display_name,role,password_hash,created_at,updated_at) VALUES(?,?,?,'student',?,?,?)").bind(id,username,displayName,hash,now,now),
      database().prepare("INSERT INTO tracker_assignments(tutor_id,student_id,created_at) VALUES(?,?,?)").bind(tutor.id,id,now),
    ]);
    return Response.json({ id, username, displayName });
  } catch (error) { return jsonError(error instanceof Error ? error.message : "Could not add student.", 400); }
}
