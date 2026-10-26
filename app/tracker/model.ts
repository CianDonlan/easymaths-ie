export const methodScale = {
  version: "easy-maths-five-levels-v1",
  levels: [
    { value: 1, label: "Copy the solution", detail: "Write out the worked solution, then add a short note mapping the steps." },
    { value: 2, label: "Build with the solution", detail: "Use the worked solution for guidance and construct your own answer." },
    { value: 3, label: "Use notes or examples", detail: "Find the method or a similar example in notes or a textbook." },
    { value: 4, label: "Answer independently", detail: "Complete the question without help; focus on getting it right." },
    { value: 5, label: "Answer at exam pace", detail: "Complete it without help, correctly and within an appropriate exam time." },
  ],
} as const;

export type Attempt = {
  id: string; studentId: string; partId: string; attemptedAt: string;
  methodScore: number; scaleVersion: string; earnedMarks: number | null;
  maximumMarks: number | null; note: string | null; createdAt: string; updatedAt: string;
};

export function historyByPart(attempts: Attempt[]) {
  const history = new Map<string, { latest: Attempt; count: number }>();
  for (const attempt of attempts) {
    const old = history.get(attempt.partId);
    const latest = !old || attempt.attemptedAt > old.latest.attemptedAt ||
      (attempt.attemptedAt === old.latest.attemptedAt && attempt.createdAt > old.latest.createdAt)
      ? attempt : old.latest;
    history.set(attempt.partId, { latest, count: (old?.count ?? 0) + 1 });
  }
  return history;
}

export function validateAttempt(input: Record<string, unknown>, verifiedMax: number | null) {
  const methodScore = Number(input.methodScore);
  if (!Number.isInteger(methodScore) || methodScore < 1 || methodScore > 5) throw new Error("Choose a level from 1 to 5.");
  const attemptedAt = String(input.attemptedAt ?? "");
  if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d/.test(attemptedAt) || !Number.isFinite(Date.parse(attemptedAt))) throw new Error("Enter a valid date and time.");
  const earnedMarks = input.earnedMarks === "" || input.earnedMarks == null ? null : Number(input.earnedMarks);
  const maximumMarks = verifiedMax ?? (input.maximumMarks === "" || input.maximumMarks == null ? null : Number(input.maximumMarks));
  if (earnedMarks !== null && (!Number.isFinite(earnedMarks) || earnedMarks < 0)) throw new Error("Earned marks must be zero or more.");
  if (maximumMarks !== null && (!Number.isFinite(maximumMarks) || maximumMarks <= 0)) throw new Error("Maximum marks must be above zero.");
  if (earnedMarks !== null && maximumMarks !== null && earnedMarks > maximumMarks) throw new Error("Earned marks cannot exceed maximum marks.");
  const note = String(input.note ?? "").trim();
  if (note.length > 500) throw new Error("Keep notes under 500 characters.");
  return { methodScore, attemptedAt: new Date(attemptedAt).toISOString(), earnedMarks, maximumMarks, note: note || null };
}

export function summarize(attempts: Attempt[], available: number) {
  const latest = historyByPart(attempts);
  const current = [...latest.values()].map(row => row.latest);
  const mean = (rows: Attempt[]) => rows.length ? rows.reduce((sum, a) => sum + a.methodScore, 0) / rows.length : null;
  const eligible = attempts.filter(a => a.earnedMarks !== null && a.maximumMarks !== null && a.maximumMarks > 0);
  const marksEarned = eligible.reduce((sum, a) => sum + (a.earnedMarks ?? 0), 0);
  const marksPossible = eligible.reduce((sum, a) => sum + (a.maximumMarks ?? 0), 0);
  return { attemptCount: attempts.length, uniqueCount: latest.size, available, attemptMean: mean(attempts), latestMean: mean(current), marks: eligible.length ? { earned: marksEarned, possible: marksPossible, percent: marksEarned / marksPossible * 100, count: eligible.length } : null, latest: current };
}
