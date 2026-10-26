import test from "node:test";
import assert from "node:assert/strict";
import { summarize, validateAttempt, methodScale } from "../app/tracker/model.ts";
import { papers, parts } from "../app/tracker/catalogue.ts";

const attempt = (id, partId, at, score, earnedMarks = null, maximumMarks = null) => ({ id, studentId:"s", partId, attemptedAt:at, methodScore:score, scaleVersion:methodScale.version, earnedMarks, maximumMarks, note:null, createdAt:at, updatedAt:at });

test("the supplied scale rises from copying to exam pace", () => {
  assert.deepEqual(methodScale.levels.map(x => x.value), [1,2,3,4,5]);
  assert.match(methodScale.levels[0].label, /Copy/);
  assert.match(methodScale.levels[4].label, /exam pace/);
});

test("repeated and backdated attempts remain distinct; latest summary uses practice date", () => {
  const rows = [attempt("a","q1","2026-09-01T10:00:00.000Z",1,0,10),attempt("b","q1","2026-09-03T10:00:00.000Z",4,8,10),attempt("c","q2","2026-09-02T10:00:00.000Z",3,1,2)];
  const summary = summarize(rows, 5);
  assert.equal(summary.attemptCount, 3);
  assert.equal(summary.uniqueCount, 2);
  assert.equal(summary.attemptMean, 8/3);
  assert.equal(summary.latestMean, 3.5);
  assert.ok(Math.abs(summary.marks.percent - 9/22*100) < 1e-9); // 9 of 22, not mean of percentages
  assert.equal(summarize(rows.filter(x=>x.id!=="b"),5).latestMean,2);
});

test("blank marks, recorded zero, and invalid marks", () => {
  assert.equal(validateAttempt({methodScore:2,attemptedAt:"2026-09-01T10:00",earnedMarks:"",maximumMarks:""},null).earnedMarks,null);
  assert.equal(validateAttempt({methodScore:2,attemptedAt:"2026-09-01T10:00",earnedMarks:"0",maximumMarks:"10"},null).earnedMarks,0);
  assert.throws(()=>validateAttempt({methodScore:2,attemptedAt:"2026-09-01T10:00",earnedMarks:"11",maximumMarks:"10"},null));
  assert.throws(()=>validateAttempt({methodScore:0,attemptedAt:"2026-09-01T10:00"},null));
  assert.equal(summarize([],2).attemptMean,null);
  assert.equal(summarize([attempt("a","q","2026-09-01T10:00:00Z",2,0,null)],2).marks,null);
});

test("catalogue has stable distinct IDs and numeric book order", () => {
  assert.equal(new Set(parts.map(x=>x.id)).size, parts.length);
  assert.equal(new Set(papers.map(x=>x.id)).size, papers.length);
  assert.equal(papers.length,24);
  assert.equal(parts.filter(x=>x.status==="needs-review").length,0);
  assert.equal(parts.filter(x=>x.status==="structure-reviewed").length,1049);
  assert.equal(papers.filter(x=>x.bookMatch==="contents-confirmed").length,22);
  assert.ok(parts.find(x=>x.label==="Q3(b)(ii)"));
  assert.ok(parts.find(x=>x.label==="Q10(f)(ii)"));
  assert.deepEqual(parts.find(x=>x.id==="lc-hl-2026-normal-p2-5bi").topicIds, ["p2-circle", "p2-probability"]);
  assert.deepEqual(parts.find(x=>x.id==="lc-hl-2025-normal-p1-10di").topicIds, ["p1-algebra"]);
  assert.deepEqual(parts.find(x=>x.id==="lc-hl-2025-normal-p1-10diii").topicIds, ["p1-number"]);
  assert.deepEqual(parts.find(x=>x.id==="lc-hl-2025-normal-p2-7ciii").topicIds, ["p2-geometry"]);
  assert.deepEqual(parts.find(x=>x.id==="lc-hl-2025-normal-p2-7civ").topicIds, ["p2-trigonometry"]);
  assert.deepEqual(parts.find(x=>x.id==="lc-hl-2024-normal-p1-8b").topicIds, ["p1-graphs"]);
  assert.deepEqual(parts.find(x=>x.id==="lc-hl-2024-normal-p2-10ci").topicIds, ["p2-probability"]);
  assert.deepEqual(parts.find(x=>x.id==="lc-hl-2020-normal-p2-9c").topicIds, ["p2-geometry", "p1-calculus"]);
  assert.deepEqual(parts.find(x=>x.id==="lc-hl-2021-normal-p2-7b").topicIds, ["p1-algebra"]);
  assert.deepEqual(parts.find(x=>x.id==="lc-hl-2022-deferred-p1-8cii").topicIds, ["p1-graphs"]);
  assert.deepEqual(parts.find(x=>x.id==="lc-hl-2023-deferred-p1-8bi").topicIds, ["p2-geometry", "p1-algebra"]);
  assert.deepEqual(parts.find(x=>x.id==="lc-hl-2024-deferred-p1-9ei").topicIds, ["p2-geometry"]);
  assert.deepEqual(parts.find(x=>x.id==="lc-hl-2024-deferred-p2-8b").topicIds, ["p1-number"]);
  for (const paper of papers) {
    const rows=parts.filter(x=>x.paperId===paper.id);
    const lastQuestion = paper.year <= 2020 ? "Q9" : "Q10";
    assert.ok(rows.find(x=>x.label.startsWith(lastQuestion)));
    assert.ok(rows.findIndex(x=>x.label.startsWith(lastQuestion)) > rows.findIndex(x=>x.label.startsWith("Q2")));
    assert.ok(rows.every(x=>x.maximumMarks===null));
  }
});
