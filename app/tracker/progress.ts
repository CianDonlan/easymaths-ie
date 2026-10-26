import type { Part } from "./catalogue";
import { dublinDay } from "./goals.ts";
import { historyByPart, type Attempt } from "./model.ts";

export const PAPER_EQUIVALENT_PARTS = 35;

export function paperEquivalentProgress(attempts: Pick<Attempt, "id">[]) {
  const count = attempts.length;
  return { count, equivalents: count / PAPER_EQUIVALENT_PARTS };
}

export function improvementSummary(attempts: Attempt[], now = new Date().toISOString()) {
  const ordered = [...attempts].sort((a, b) =>
    a.attemptedAt.localeCompare(b.attemptedAt) || a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id));
  const bestByPart = new Map<string, number>();
  const events: { id: string; partId: string; from: number; to: number; attemptedAt: string }[] = [];
  for (const attempt of ordered) {
    const previous = bestByPart.get(attempt.partId);
    if (previous !== undefined && attempt.methodScore > previous) {
      events.push({ id: attempt.id, partId: attempt.partId, from: previous, to: attempt.methodScore, attemptedAt: attempt.attemptedAt });
    }
    if (previous === undefined || attempt.methodScore > previous) bestByPart.set(attempt.partId, attempt.methodScore);
  }
  const thisMonth = events.filter(event => dublinDay(event.attemptedAt).slice(0, 7) === dublinDay(now).slice(0, 7));
  const latest = historyByPart(attempts);
  const currentIndependent = [...latest.values()].filter(row => row.latest.methodScore >= 4).length;
  return {
    partsImproved: new Set(events.map(event => event.partId)).size,
    partsImprovedThisMonth: new Set(thisMonth.map(event => event.partId)).size,
    stepsThisMonth: thisMonth.reduce((sum, event) => sum + event.to - event.from, 0),
    currentIndependent,
    events,
    recentImprovements: [...events].reverse().slice(0, 4),
  };
}

export function topicProgress(attempts: Attempt[], parts: Part[]) {
  const partMap = new Map(parts.map(part => [part.id, part]));
  const latest = historyByPart(attempts);
  const topics = new Map<string, { tried: number; independent: number; levels: number[]; paperIds: Set<string>; loggedAttempts: number; levelTotal: number; averageLevel: number }>();
  let unclassifiedParts = 0;
  for (const [partId, history] of latest) {
    const part = partMap.get(partId);
    if (!part || part.status !== "structure-reviewed" || !part.topicIds.length) {
      unclassifiedParts++;
      continue;
    }
    for (const topicId of part.topicIds) {
      const row = topics.get(topicId) ?? { tried: 0, independent: 0, levels: [0, 0, 0, 0, 0], paperIds: new Set<string>(), loggedAttempts: 0, levelTotal: 0, averageLevel: 0 };
      row.tried++;
      row.levels[history.latest.methodScore - 1]++;
      if (history.latest.methodScore >= 4) row.independent++;
      row.paperIds.add(part.paperId);
      topics.set(topicId, row);
    }
  }
  for (const attempt of attempts) {
    const part = partMap.get(attempt.partId);
    if (!part || part.status !== "structure-reviewed") continue;
    for (const topicId of part.topicIds) {
      const row = topics.get(topicId);
      if (!row) continue;
      row.loggedAttempts++;
      row.levelTotal += attempt.methodScore;
      row.averageLevel = row.levelTotal / row.loggedAttempts;
    }
  }
  return { topics, unclassifiedParts };
}
