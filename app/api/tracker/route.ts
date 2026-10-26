import { papers, parts, topics } from "../../tracker/catalogue";
import { attemptsFor, canRead, jsonError, member, database } from "../../tracker/server";
import { methodScale } from "../../tracker/model";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const user = await member();
    if (!user) return jsonError("Sign in to use the tracker.", 401);
    const studentId = new URL(request.url).searchParams.get("student") || user.id;
    const students = user.role === "tutor" ? (await database().prepare('SELECT u.id, u.display_name AS "displayName", u.username FROM tracker_assignments a JOIN tracker_users u ON u.id=a.student_id WHERE a.tutor_id=? ORDER BY u.display_name').bind(user.id).all()).results : [];
    if (user.role === "tutor" && studentId === user.id) {
      const goal = await database().prepare("SELECT weekly_goal_days, weekly_part_goal FROM tracker_users WHERE id=?").bind(user.id).first<{weekly_goal_days:number;weekly_part_goal:number}>();
      return Response.json({ user, students, papers, parts, topics, methodScale, attempts: await attemptsFor(user.id), weeklyGoalDays: goal?.weekly_goal_days ?? 3, weeklyPartGoal: goal?.weekly_part_goal ?? 20, viewedStudentId:user.id }, { headers: { "Cache-Control": "no-store" } });
    }
    if (!await canRead(user, studentId)) return jsonError("Access denied.", 403);
    const attempts = await attemptsFor(studentId);
    const goal = await database().prepare("SELECT weekly_goal_days, weekly_part_goal FROM tracker_users WHERE id=?").bind(studentId).first<{weekly_goal_days:number;weekly_part_goal:number}>();
    return Response.json({ user, students, papers, parts, topics, methodScale, attempts, weeklyGoalDays: goal?.weekly_goal_days ?? 3, weeklyPartGoal: goal?.weekly_part_goal ?? 20, viewedStudentId: studentId }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return jsonError(error instanceof Error ? error.message : "Tracker unavailable.", 503); }
}
