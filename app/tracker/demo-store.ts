import { partById } from "./catalogue";
import { methodScale, type Attempt, validateAttempt } from "./model";
import { DEFAULT_WEEKLY_PART_GOAL, validWeeklyPartGoal, type WeeklyPartGoal } from "./goals";

export const demoStorageKey = "easy-maths-tracker-local-demo-v1";
export const demoGoalStorageKey = "easy-maths-tracker-weekly-goal-v1";
export const demoPartGoalStorageKey = "easy-maths-tracker-weekly-parts-v1";
export const demoStudentId = "local-demo-student";

export function readDemoGoalDays(storage: Pick<Storage, "getItem">): 2 | 3 | 4 {
  const value = Number(storage.getItem(demoGoalStorageKey));
  return value === 2 || value === 3 || value === 4 ? value : 3;
}

export function saveDemoGoalDays(storage: Pick<Storage, "setItem">, days: 2 | 3 | 4) {
  storage.setItem(demoGoalStorageKey, String(days));
}

export function readDemoPartGoal(storage: Pick<Storage, "getItem">): WeeklyPartGoal {
  const value = Number(storage.getItem(demoPartGoalStorageKey));
  return validWeeklyPartGoal(value) ? value : DEFAULT_WEEKLY_PART_GOAL;
}

export function saveDemoPartGoal(storage: Pick<Storage, "setItem">, parts: WeeklyPartGoal) {
  storage.setItem(demoPartGoalStorageKey, String(parts));
}

export function readDemoAttempts(storage: Pick<Storage, "getItem">): Attempt[] {
  try {
    const value: unknown = JSON.parse(storage.getItem(demoStorageKey) ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.filter((row): row is Attempt =>
      typeof row === "object" && row !== null &&
      typeof row.id === "string" && typeof row.partId === "string" && partById.has(row.partId) &&
      row.studentId === demoStudentId && Number.isInteger(row.methodScore) &&
      row.methodScore >= 1 && row.methodScore <= 5 &&
      typeof row.attemptedAt === "string" && Number.isFinite(Date.parse(row.attemptedAt)) &&
      typeof row.createdAt === "string" && Number.isFinite(Date.parse(row.createdAt))
    ).sort((a, b) => b.attemptedAt.localeCompare(a.attemptedAt) || b.createdAt.localeCompare(a.createdAt));
  } catch { return []; }
}

export function saveDemoAttempt(storage: Pick<Storage, "getItem" | "setItem">, input: Record<string, unknown>): Attempt {
  const part = partById.get(String(input.partId));
  if (!part) throw new Error("Unknown question part.");
  const values = validateAttempt(input, part.maximumMarks);
  const rows = readDemoAttempts(storage);
  const editing = typeof input.id === "string" && input.id.length > 0;
  const id = editing ? String(input.id) : String(input.submissionId || crypto.randomUUID());
  const existing = rows.find(row => row.id === id);
  if (editing && !existing) throw new Error("Attempt not found.");
  if (!editing && existing) return existing;
  const now = new Date().toISOString();
  const attempt: Attempt = {
    id, studentId: demoStudentId, partId: part.id, attemptedAt: values.attemptedAt,
    methodScore: values.methodScore, scaleVersion: methodScale.version,
    earnedMarks: values.earnedMarks, maximumMarks: values.maximumMarks, note: values.note,
    createdAt: existing?.createdAt ?? now, updatedAt: now,
  };
  storage.setItem(demoStorageKey, JSON.stringify([attempt, ...rows.filter(row => row.id !== id)]));
  return attempt;
}

export function deleteDemoAttempt(storage: Pick<Storage, "getItem" | "setItem">, id: string) {
  const rows = readDemoAttempts(storage);
  if (!rows.some(row => row.id === id)) throw new Error("Attempt not found.");
  storage.setItem(demoStorageKey, JSON.stringify(rows.filter(row => row.id !== id)));
}
