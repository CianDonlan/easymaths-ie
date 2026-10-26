import type { Attempt } from "./model";
import { currentCookie, database, tokenHash } from "./auth";
export { database } from "./auth";

export type Member = { id: string; username: string; displayName: string; role: "student" | "tutor" };

export async function member(): Promise<Member | null> {
  const token = await currentCookie();
  if (!token) return null;
  const row = await database().prepare("SELECT u.id,u.username,u.display_name,u.role FROM tracker_sessions s JOIN tracker_users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?").bind(await tokenHash(token), new Date().toISOString()).first<{id:string;username:string;display_name:string;role:"student"|"tutor"}>();
  return row ? { id:row.id, username:row.username, displayName:row.display_name, role:row.role } : null;
}

export async function canRead(user: Member, studentId: string) {
  if (user.role === "student") return user.id === studentId;
  const row = await database().prepare("SELECT 1 FROM tracker_assignments WHERE tutor_id=? AND student_id=?").bind(user.id, studentId).first();
  return !!row;
}

type AttemptRow = { id:string;student_id:string;part_id:string;attempted_at:string;method_score:number;scale_version:string;earned_marks:number|null;maximum_marks:number|null;note:string|null;created_at:string;updated_at:string };
export function mapAttempt(row: AttemptRow): Attempt {
  return { id: row.id, studentId: row.student_id, partId: row.part_id, attemptedAt: row.attempted_at, methodScore: row.method_score, scaleVersion: row.scale_version, earnedMarks: row.earned_marks, maximumMarks: row.maximum_marks, note: row.note, createdAt: row.created_at, updatedAt: row.updated_at };
}
export async function attemptsFor(studentId: string) {
  const result = await database().prepare("SELECT * FROM tracker_attempts WHERE student_id=? ORDER BY attempted_at DESC, created_at DESC").bind(studentId).all<AttemptRow>();
  return result.results.map(mapAttempt);
}

export function jsonError(message: string, status: number) { return Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } }); }
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !!origin && new URL(origin).origin === new URL(request.url).origin;
}
