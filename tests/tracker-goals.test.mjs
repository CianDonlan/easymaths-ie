import test from "node:test";
import assert from "node:assert/strict";
import { dublinDay, mondayOf, weeklyGoalProgress, weeklyVolumeProgress, validWeeklyPartGoal } from "../app/tracker/goals.ts";
import { historyByPart } from "../app/tracker/model.ts";

const row = attemptedAt => ({ attemptedAt });

test("practice days are distinct Dublin dates in the Monday-to-Sunday week", () => {
  const now = "2026-10-25T12:00:00.000Z";
  const attempts = [
    row("2026-10-19T08:00:00.000Z"), row("2026-10-19T20:00:00.000Z"),
    row("2026-10-24T15:00:00.000Z"), row("2026-10-26T00:00:00.000Z"),
  ];
  const progress = weeklyGoalProgress(attempts, 3, now);
  assert.equal(progress.weekStart, "2026-10-19");
  assert.deepEqual(progress.activeDates, ["2026-10-19", "2026-10-24"]);
  assert.equal(progress.activeDays, 2);
  assert.equal(progress.reached, false);
  assert.equal(weeklyGoalProgress(attempts, 2, now).reached, true);
});

test("Irish daylight saving boundaries use the student's calendar day", () => {
  assert.equal(dublinDay("2026-03-29T22:30:00.000Z"), "2026-03-29");
  assert.equal(dublinDay("2026-03-29T23:30:00.000Z"), "2026-03-30");
  assert.equal(mondayOf("2026-03-29"), "2026-03-23");
  const progress = weeklyGoalProgress([row("2026-03-29T22:30:00.000Z"), row("2026-03-29T23:30:00.000Z")], 3, "2026-03-30T12:00:00.000Z");
  assert.deepEqual(progress.activeDates, ["2026-03-30"]);
});

test("editing or deleting attempts recomputes goal progress from practice dates", () => {
  const now = "2026-10-25T12:00:00.000Z";
  const monday = row("2026-10-19T12:00:00.000Z");
  const tuesday = row("2026-10-20T12:00:00.000Z");
  assert.equal(weeklyGoalProgress([monday, tuesday], 2, now).activeDays, 2);
  assert.equal(weeklyGoalProgress([monday, { ...tuesday, attemptedAt: monday.attemptedAt }], 2, now).activeDays, 1);
  assert.equal(weeklyGoalProgress([monday], 2, now).activeDays, 1);
});

test("weekly volume counts attempts and separates new parts from revisits", () => {
  const now = "2026-10-25T12:00:00.000Z";
  const attempt = (partId, attemptedAt, createdAt = attemptedAt) => ({ partId, attemptedAt, createdAt });
  const attempts = [
    attempt("a", "2026-10-18T12:00:00.000Z"),
    attempt("a", "2026-10-19T12:00:00.000Z"),
    attempt("b", "2026-10-20T12:00:00.000Z"),
    attempt("b", "2026-10-20T13:00:00.000Z"),
    attempt("c", "2026-10-25T22:30:00.000Z"),
    attempt("d", "2026-10-26T00:30:00.000Z"),
  ];
  const progress = weeklyVolumeProgress(attempts, 20, now);
  assert.deepEqual([progress.count, progress.newParts, progress.revisits, progress.reached], [4, 2, 2, false]);
  assert.equal(weeklyVolumeProgress(attempts.slice(0, 4), 20, now).count, 3);
  assert.equal(validWeeklyPartGoal(20), true);
  assert.equal(validWeeklyPartGoal(18), false);
});

test("picker history uses latest practice date and counts all attempts", () => {
  const attempt = (id, attemptedAt, createdAt, methodScore) => ({ id, partId: "part-a", attemptedAt, createdAt, methodScore });
  const history = historyByPart([
    attempt("first", "2026-10-22T12:00:00.000Z", "2026-10-22T12:00:00.000Z", 2),
    attempt("backdated", "2026-10-19T12:00:00.000Z", "2026-10-25T12:00:00.000Z", 5),
    attempt("latest", "2026-10-22T12:00:00.000Z", "2026-10-23T12:00:00.000Z", 3),
  ]).get("part-a");
  assert.equal(history.count, 3);
  assert.equal(history.latest.methodScore, 3);
});
