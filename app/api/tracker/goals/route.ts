import { validWeeklyGoalDays, validWeeklyPartGoal } from "../../../tracker/goals";
import { database, jsonError, member, sameOrigin } from "../../../tracker/server";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return jsonError("Invalid request origin.", 403);
  const user = await member();
  if (!user) return jsonError("Sign in required.", 401);
  try {
    const { days, parts } = await request.json() as { days?: unknown; parts?: unknown };
    if ((days === undefined) === (parts === undefined)) return jsonError("Choose one goal to update.", 400);
    if (days !== undefined && !validWeeklyGoalDays(days)) return jsonError("Choose 2, 3 or 4 practice days.", 400);
    if (parts !== undefined && !validWeeklyPartGoal(parts)) return jsonError("Choose 12, 20 or 30 parts.", 400);
    if (days !== undefined) {
      await database().prepare("UPDATE tracker_users SET weekly_goal_days=?,updated_at=? WHERE id=?").bind(days, new Date().toISOString(), user.id).run();
    } else {
      await database().prepare("UPDATE tracker_users SET weekly_part_goal=?,updated_at=? WHERE id=?").bind(parts, new Date().toISOString(), user.id).run();
    }
    return Response.json(days !== undefined ? { weeklyGoalDays: days } : { weeklyPartGoal: parts }, { headers: { "Cache-Control": "no-store" } });
  } catch { return jsonError("Could not save your goal.", 400); }
}
