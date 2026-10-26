import { partById } from "../../../tracker/catalogue";
import { methodScale, validateAttempt } from "../../../tracker/model";
import { database, jsonError, member, sameOrigin } from "../../../tracker/server";

export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid request origin.", 403);
  const user = await member();
  if (!user) return jsonError("Sign in required.", 401);
  try {
    const input = await request.json() as Record<string, unknown>;
    const part = partById.get(String(input.partId));
    if (!part) return jsonError("Unknown question part.", 400);
    const data = validateAttempt(input, part.maximumMarks);
    const now = new Date().toISOString();
    const id = typeof input.id === "string" && input.id ? input.id : typeof input.submissionId === "string" && /^[0-9a-f-]{36}$/i.test(input.submissionId) ? input.submissionId : crypto.randomUUID();
    let created = false;
    if (input.id) {
      const result = await database().prepare("UPDATE tracker_attempts SET part_id=?,attempted_at=?,method_score=?,scale_version=?,earned_marks=?,maximum_marks=?,note=?,updated_at=? WHERE id=? AND student_id=?").bind(part.id,data.attemptedAt,data.methodScore,methodScale.version,data.earnedMarks,data.maximumMarks,data.note,now,id,user.id).run();
      if (!result.meta.changes) return jsonError("Attempt not found.", 404);
    } else {
      const result = await database().prepare("INSERT OR IGNORE INTO tracker_attempts(id,student_id,part_id,attempted_at,method_score,scale_version,earned_marks,maximum_marks,note,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").bind(id,user.id,part.id,data.attemptedAt,data.methodScore,methodScale.version,data.earnedMarks,data.maximumMarks,data.note,now,now).run();
      created = !!result.meta.changes;
      if (!result.meta.changes) {
        const existing = await database().prepare("SELECT student_id FROM tracker_attempts WHERE id=?").bind(id).first<{student_id:string}>();
        if (existing?.student_id !== user.id) return jsonError("Submission ID conflict.", 409);
      }
    }
    return Response.json({ id, created });
  } catch (error) { return jsonError(error instanceof Error ? error.message : "Save failed.", 400); }
}
export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid request origin.", 403);
  const user = await member();
  if (!user) return jsonError("Sign in required.", 401);
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return jsonError("Missing attempt ID.", 400);
  const result = await database().prepare("DELETE FROM tracker_attempts WHERE id=? AND student_id=?").bind(id,user.id).run();
  return result.meta.changes ? Response.json({ ok: true }) : jsonError("Attempt not found.", 404);
}
