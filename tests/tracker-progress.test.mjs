import test from "node:test";
import assert from "node:assert/strict";
import { improvementSummary, paperEquivalentProgress, topicProgress } from "../app/tracker/progress.ts";

const attempt = (id, partId, at, methodScore) => ({ id, partId, attemptedAt: at, createdAt: at, methodScore });

test("paper equivalents describe attempt volume at the 35-part boundary", () => {
  assert.deepEqual(paperEquivalentProgress([]), { count: 0, equivalents: 0 });
  assert.deepEqual(paperEquivalentProgress(Array.from({ length: 35 }, (_, index) => ({ id: String(index) }))), { count: 35, equivalents: 1 });
  assert.deepEqual(paperEquivalentProgress(Array.from({ length: 70 }, (_, index) => ({ id: String(index) }))), { count: 70, equivalents: 2 });
  assert.equal(paperEquivalentProgress([{ id: "one" }]).equivalents.toFixed(2), "0.03");
});

test("a one-level gain counts while repeated highs and up-down cycles do not inflate it", () => {
  const rows = [
    attempt("a1", "a", "2026-10-01T10:00:00Z", 1),
    attempt("a2", "a", "2026-10-02T10:00:00Z", 2),
    attempt("a3", "a", "2026-10-03T10:00:00Z", 1),
    attempt("a4", "a", "2026-10-04T10:00:00Z", 2),
    attempt("a5", "a", "2026-10-05T10:00:00Z", 3),
    attempt("b1", "b", "2026-10-02T10:00:00Z", 4),
    attempt("b2", "b", "2026-10-06T10:00:00Z", 5),
  ];
  const result = improvementSummary(rows, "2026-10-25T12:00:00Z");
  assert.equal(result.partsImproved, 2);
  assert.equal(result.partsImprovedThisMonth, 2);
  assert.equal(result.stepsThisMonth, 3);
  assert.equal(result.currentIndependent, 1);
  assert.deepEqual(result.recentImprovements.map(event => event.id), ["b2", "a5", "a2"]);
  assert.equal(improvementSummary(rows.filter(row => row.id !== "a5"), "2026-10-25T12:00:00Z").stepsThisMonth, 2);
});

test("topic view excludes unreviewed parts and keeps multi-topic parts in each topic", () => {
  const parts = [
    { id: "reviewed", paperId: "p1", status: "structure-reviewed", topicIds: ["calculus", "graphs"] },
    { id: "provisional", paperId: "p2", status: "needs-review", topicIds: [] },
  ];
  const rows = [attempt("a", "reviewed", "2026-10-01T10:00:00Z", 2), attempt("b", "reviewed", "2026-10-02T10:00:00Z", 4), attempt("c", "provisional", "2026-10-03T10:00:00Z", 5)];
  const result = topicProgress(rows, parts);
  assert.equal(result.unclassifiedParts, 1);
  assert.equal(result.topics.get("calculus").tried, 1);
  assert.equal(result.topics.get("calculus").loggedAttempts, 2);
  assert.equal(result.topics.get("calculus").averageLevel, 3);
  assert.equal(result.topics.get("graphs").averageLevel, 3);
  assert.equal(result.topics.get("graphs").independent, 1);
  assert.deepEqual(result.topics.get("calculus").levels, [0, 0, 0, 1, 0]);
});
