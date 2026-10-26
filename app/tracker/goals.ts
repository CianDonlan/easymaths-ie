import type { Attempt } from "./model";

export type WeeklyGoalDays = 2 | 3 | 4;
export const DEFAULT_WEEKLY_GOAL_DAYS: WeeklyGoalDays = 3;
export type WeeklyPartGoal = 12 | 20 | 30;
export const DEFAULT_WEEKLY_PART_GOAL: WeeklyPartGoal = 20;

export function validWeeklyPartGoal(value: unknown): value is WeeklyPartGoal {
  return value === 12 || value === 20 || value === 30;
}

export function validWeeklyGoalDays(value: unknown): value is WeeklyGoalDays {
  return value === 2 || value === 3 || value === 4;
}

const dublinFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Dublin", year: "numeric", month: "2-digit", day: "2-digit",
});

export function dublinDay(iso: string): string {
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) throw new Error("Invalid practice date.");
  const parts = Object.fromEntries(dublinFormatter.formatToParts(date).map(part => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function mondayOf(day: string): string {
  const [year, month, date] = day.split("-").map(Number);
  const utc = Date.UTC(year, month - 1, date);
  const weekday = new Date(utc).getUTCDay();
  return new Date(utc - ((weekday + 6) % 7) * 86400_000).toISOString().slice(0, 10);
}

export function weeklyGoalProgress(
  attempts: Pick<Attempt, "attemptedAt">[],
  goalDays: WeeklyGoalDays,
  now = new Date().toISOString(),
) {
  const today = dublinDay(now);
  const weekStart = mondayOf(today);
  const activeDates = [...new Set(attempts.map(attempt => dublinDay(attempt.attemptedAt)))].filter(day => mondayOf(day) === weekStart).sort();
  return { today, weekStart, activeDates, activeDays: activeDates.length, goalDays, reached: activeDates.length >= goalDays };
}

export function weeklyVolumeProgress(
  attempts: Pick<Attempt, "partId" | "attemptedAt" | "createdAt">[],
  goalParts: WeeklyPartGoal,
  now = new Date().toISOString(),
) {
  const weekStart = mondayOf(dublinDay(now));
  const ordered = [...attempts].sort((a, b) => a.attemptedAt.localeCompare(b.attemptedAt) || a.createdAt.localeCompare(b.createdAt));
  const seen = new Set<string>();
  let count = 0;
  let newParts = 0;
  for (const attempt of ordered) {
    const inWeek = mondayOf(dublinDay(attempt.attemptedAt)) === weekStart;
    if (inWeek) {
      count++;
      if (!seen.has(attempt.partId)) newParts++;
    }
    seen.add(attempt.partId);
  }
  return { count, goalParts, newParts, revisits: count - newParts, reached: count >= goalParts };
}
