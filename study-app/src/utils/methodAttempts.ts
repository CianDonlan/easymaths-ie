import { bookPapers } from "../data/realCatalogue";

export const METHOD_STORAGE_KEY = "lc-maths-local-method-attempts-v1";
export const METHOD_SCALE_VERSION = "easy-maths-five-levels-v1";

export const methodLevels = [
  { value: 1, label: "Copy the solution", detail: "Write out the worked solution, then note what each step does." },
  { value: 2, label: "Build with the solution", detail: "Use the solution for guidance while you construct your own answer." },
  { value: 3, label: "Use notes or examples", detail: "Find the method in your notes or a similar example." },
  { value: 4, label: "Answer independently", detail: "Complete the part without help; focus on getting it right." },
  { value: 5, label: "Answer at exam pace", detail: "Complete it without help, correctly and within an appropriate exam time." },
] as const;

// A device-only record. The account owner is deliberately absent until a server
// can assign one; these are separate from sample final-answer checks.
export interface LocalMethodAttempt {
  id: string;
  partId: string;
  attemptedAt: string;
  methodScore: number;
  scaleVersion: typeof METHOD_SCALE_VERSION;
  earnedMarks: null;
  maximumMarks: null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

const validPartIds = new Set(bookPapers.flatMap((paper) => paper.parts.map((part) => part.id)));

export function readMethodAttempts(): LocalMethodAttempt[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(METHOD_STORAGE_KEY) ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.filter((row): row is LocalMethodAttempt =>
      typeof row === "object" && row !== null
      && typeof row.id === "string"
      && typeof row.partId === "string" && validPartIds.has(row.partId)
      && typeof row.attemptedAt === "string" && Number.isFinite(Date.parse(row.attemptedAt))
      && Number.isInteger(row.methodScore) && row.methodScore >= 1 && row.methodScore <= 5
      && row.scaleVersion === METHOD_SCALE_VERSION
      && typeof row.createdAt === "string" && Number.isFinite(Date.parse(row.createdAt))
      && typeof row.updatedAt === "string" && Number.isFinite(Date.parse(row.updatedAt))
      && (row.note === null || typeof row.note === "string")
      && row.earnedMarks === null && row.maximumMarks === null,
    );
  } catch {
    return [];
  }
}

export function saveMethodAttempts(attempts: LocalMethodAttempt[]): boolean {
  try {
    localStorage.setItem(METHOD_STORAGE_KEY, JSON.stringify(attempts));
    return true;
  } catch {
    return false;
  }
}

export function latestByPart(attempts: LocalMethodAttempt[]) {
  const history = new Map<string, { latest: LocalMethodAttempt; count: number }>();
  for (const attempt of attempts) {
    const old = history.get(attempt.partId);
    const latest = !old || attempt.attemptedAt > old.latest.attemptedAt
      || (attempt.attemptedAt === old.latest.attemptedAt && attempt.createdAt > old.latest.createdAt)
      ? attempt : old.latest;
    history.set(attempt.partId, { latest, count: (old?.count ?? 0) + 1 });
  }
  return history;
}

export function paperMethodProgress(attempts: LocalMethodAttempt[]) {
  const history = latestByPart(attempts);
  const ordered = [...attempts].sort((a, b) =>
    a.attemptedAt.localeCompare(b.attemptedAt)
    || a.createdAt.localeCompare(b.createdAt)
    || a.id.localeCompare(b.id));
  const best = new Map<string, number>();
  const improved = new Set<string>();
  for (const attempt of ordered) {
    const previous = best.get(attempt.partId);
    if (previous !== undefined && attempt.methodScore > previous) improved.add(attempt.partId);
    if (previous === undefined || attempt.methodScore > previous) best.set(attempt.partId, attempt.methodScore);
  }
  return {
    attempts: attempts.length,
    parts: history.size,
    improved: improved.size,
    independent: [...history.values()].filter(({ latest }) => latest.methodScore >= 4).length,
  };
}
