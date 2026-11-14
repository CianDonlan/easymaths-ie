import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { rolldown } from "rolldown";

async function load(entry) {
  const bundle = await rolldown({ input: entry, platform: "node" });
  try {
    const output = await bundle.generate({ format: "esm" });
    return import(`data:text/javascript,${encodeURIComponent(output.output[0].code)}`);
  } finally { await bundle.close(); }
}
const { findBookPaper, findRealPaper } = await load("src/data/realCatalogue.ts");
const { parseRoutePath } = await load("src/utils/parseRoute.ts");
const { checkAnswer } = await load("src/utils/checkAnswer.ts");
const part = (n, code) => findRealPaper(`lc-hl-2019-normal-p${n}`).questions.find((q) => q.id.endsWith(`-${code}`));
const check = (n, code, answer, expected = "correct") => assert.equal(checkAnswer(String(answer), part(n, code).answerCheck), expected, `P${n} ${code}: ${answer}`);

test("2019 uses nine-question catalogues, complete leaf coverage and verified source PDFs", async () => {
  for (const [n, count, checked] of [[1, 36, 13], [2, 32, 21]]) {
    const id = `lc-hl-2019-normal-p${n}`;
    const book = findBookPaper(id);
    const paper = findRealPaper(id);
    assert.equal(book.questions.length, 9);
    assert.equal(book.parts.length, count);
    assert.equal(paper.questions.length, count);
    assert.equal(paper.questions.filter((q) => q.answerCheck).length, checked);
    assert.deepEqual(paper.questions.map((q) => q.id), book.parts.map((p) => p.id));
    assert.equal(new Set(paper.questions.map((q) => q.id)).size, count);
    assert.equal(parseRoutePath(`/book/${id}`).screen, "book");
    for (const q of paper.questions) {
      assert.deepEqual(parseRoutePath(`/book/${id}/parts/${q.id}`), { screen: "question", paperId: id, questionId: q.id });
      assert.ok(q.prompt && q.answer && q.solution, q.id);
      assert.ok(Boolean(q.answerCheck) !== Boolean(q.selfCheck), q.id);
      assert.equal(q.marks, null);
      if (q.selfCheck) assert.ok(q.selfCheck.checks.length >= 2, q.id);
    }
    assert.ok(paper.questions.at(-1).id.includes("-9"));
    const pdf = await readFile(`data/papers/2019_normal_lc_maths_hl_english_paper_${n}.pdf`);
    assert.equal(createHash("sha256").update(pdf).digest("hex"), book.sourceSha256);
  }
});

test("2019 checks every automatic format with correct, wrong and unsupported entries", () => {
  const examples = [
    [1, "1a", "2", "6"], [1, "1b", "3/4, -3", "-3/4, 3"], [1, "3b", "e^3", "e^-3"],
    [1, "3c", "-1.53", "1.53"], [1, "4bii", "9/2, 0, 7, 0", "7, 0, 9/2, 0"],
    [1, "5a", "-6, 13", "6, 13"], [1, "7ai", "4/27, 8/81, 16/243", "4/9, 8/27, 16/81"],
    [1, "7aiii", "1", "0"], [1, "7bi", "2/3, 2/9, 7/9, 8/9, 7/27, 25/27", "2/3, 2/9, 7/9, 8/9, 8/27, 25/27"],
    [1, "7biii", "1/4", "2/8"], [1, "8a", "20659", "20658"], [1, "8b", "52/3, 104/3", "26/3, 130/3"], [1, "9bi", "6, 0", "0, 6"],
    [2, "1ai", "48/95", "24/95"], [2, "1aii", "88/969", "352/969"], [2, "1b", "1400", "2450"],
    [2, "3a", "10, -4", "10, 4"], [2, "3b", "(x-1)^2+(y-1)^2=1", "(x+1)^2+(y+1)^2=1"],
    [2, "4b", "1/3", "2/3"], [2, "6a", "11/45, 11/36", "11/36, 11/45"], [2, "6b", "25", "5"],
    [2, "7aii", "0.84", "1.68"], [2, "7aiii", "0.28", "2787.73"], [2, "7aiv", "0.70", "0.28"],
    [2, "7bi", "23.73", "23.72"], [2, "7bii", "0.87", "0.03"], [2, "8ai", "0.1889, 0.2461", "18.89, 24.61"],
    [2, "8aii", "26.05%", "73.95%"], [2, "8aiii", "81", "94"], [2, "8bii", "84.6", "90.0"],
    [2, "9a", "54.4", "54.3"], [2, "9b", "30.75", "149.25"], [2, "9c", "806.65", "1613.30"], [2, "9diii", "11.3", "22.6"],
  ];
  assert.equal(examples.length, 34);
  const covered = new Set();
  for (const [n, code, correct, wrong] of examples) {
    covered.add(part(n, code).id);
    check(n, code, correct); check(n, code, wrong, "incorrect"); check(n, code, "unsupported response", "unreadable");
    check(n, code, part(n, code).answerCheck.placeholder.replace(/^e.g. /, ""));
  }
  for (const n of [1, 2]) for (const q of findRealPaper(`lc-hl-2019-normal-p${n}`).questions) {
    assert.equal(covered.has(q.id), Boolean(q.answerCheck), q.id);
  }
  check(1, "8b", "17.333, 34.667");
  check(2, "8aii", "0.2611"); check(2, "8aii", "0.2605448183");
  check(2, "3b", "x^2+y^2-2x-2y+1=0", "unreadable");
  assert.ok(part(2, "9e").selfCheck);
  assert.ok(part(1, "2b").selfCheck && part(2, "5a").selfCheck);
});

test("2019 numerical results agree with independent algebra, probability and geometry", () => {
  const round = (x, dp = 0) => Number(x.toFixed(dp));
  for (const x of [-3, .75]) assert.ok(Math.abs(3 / (2 * x + 1) + 2 / 5 - 2 / (3 * x - 1)) < 1e-12);
  check(1, "3c", round(4 / Math.E - 3, 2));
  for (const x of [2, 4.5, 7]) assert.equal(2 * x ** 3 - 27 * x ** 2 + 109 * x - 126, 0);
  let remaining = [[0, 1]], removed = 0;
  for (let step = 1; step <= 5; step++) {
    const removedThisStep = remaining.reduce((total, [a, b]) => total + (b - a) / 3, 0);
    if (step >= 3) assert.ok(Math.abs(removedThisStep - part(1, "7ai").answerCheck.expected[step - 3]) < 1e-12);
    removed += removedThisStep;
    assert.ok(Math.abs(removed - (1 - (2 / 3) ** step)) < 1e-12);
    remaining = remaining.flatMap(([a, b]) => [[a, a + (b - a) / 3], [b - (b - a) / 3, b]]);
    if (step <= 3) for (const x of part(1, "7bi").answerCheck.expected) {
      // Endpoints not introduced yet need only belong to a retained closed interval.
      assert.ok(remaining.some(([a, b]) => x >= a - 1e-12 && x <= b + 1e-12));
    }
    assert.ok(remaining.some(([a, b]) => 20 / 81 >= a - 1e-12 && 20 / 81 <= b + 1e-12));
  }
  check(1, "8a", round(22500 * Math.cos(20 * Math.PI / 26) + 37500));
  for (const t of part(1, "8b").answerCheck.expected) assert.ok(Math.abs(22500 * Math.cos(t * Math.PI / 26) + 37500 - 26250) < 1e-8);
  // Enumerate unordered student pairs independently of the probability product.
  let mixed = 0, pairs = 0;
  for (let a = 0; a < 20; a++) for (let b = a + 1; b < 20; b++) { pairs++; if ((a < 12) !== (b < 12)) mixed++; }
  check(2, "1ai", mixed / pairs);
  check(2, "1aii", (12 * 11 * 10 * 8) / (20 * 19 * 18 * 17));
  const populations = [];
  for (let g = 1; g < 200; g++) if (Math.abs(g * (2 * g + 10) / ((3 * g + 10) * (3 * g + 9)) - 1 / 6) < 1e-12) populations.push(3 * g + 10);
  assert.deepEqual(populations, [25]);
  const [x, y] = part(2, "6a").answerCheck.expected;
  assert.ok(Math.abs((.25 + .2) * (x + .2) - .2) < 1e-12);
  assert.ok(Math.abs(.25 + .2 + x + y - 1) < 1e-12);
  const theta = Math.acos(2 / 3);
  const segment = .81 * theta - .6 * Math.sqrt(.81 - .36);
  check(2, "7aii", round(theta, 2)); check(2, "7aiii", round(segment, 2)); check(2, "7aiv", round(segment * 2.5, 2));
  const timer = Math.PI * (2 * 1.25 ** 3 / 3 + 1.25 ** 2 * (3.5 + 1.5 / 3));
  check(2, "7bi", round(timer, 2));
  const height = Math.cbrt(timer * .02 * 108 / (25 * Math.PI));
  check(2, "7bii", round(height, 2)); assert.ok(height < 1.5);
  const p = 174 / 800, margin = 1.96 * Math.sqrt(p * (1 - p) / 800);
  check(2, "8ai", `${(p - margin).toPrecision(4)}, ${(p + margin).toPrecision(4)}`);
  // Standard table lower-tail z ≈ −2.26 for half the two-sided p-value.
  check(2, "8bii", round(87.3 - 2.26 * 12 / Math.sqrt(100), 1));
  const gx = 30 * Math.cos(68 * Math.PI / 180), gy = 30 * Math.sin(68 * Math.PI / 180);
  const sg = Math.hypot(58 - gx, gy), angle = Math.atan2(gy, 58 - gx);
  const area = 58 * gy / 2, radius = area / ((sg + 88) / 2);
  check(2, "9a", round(sg, 1)); check(2, "9b", round(angle * 180 / Math.PI, 2)); check(2, "9c", round(area, 2)); check(2, "9diii", round(radius, 1));
  const pole = radius / Math.sin(angle / 2) * Math.tan(14 * Math.PI / 180);
  assert.equal(round(pole, 1), 10.7);
  assert.equal(round(11.3 / Math.sin(30.75 * Math.PI / 360) * Math.tan(14 * Math.PI / 180), 1), 10.6);
});

test("new 2019 method records coexist with earlier papers and retain repeated history", async () => {
  const { readMethodAttempts, saveMethodAttempts, paperMethodProgress } = await load("src/utils/methodAttempts.ts");
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const storage = new Map();
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: (k) => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v) } });
  try {
    const attempts = Array.from({ length: 14 }, (_, i) => ({
      id: `2019-repeat-${i}`, partId: i === 0 ? "lc-hl-2020-normal-p1-1ai" : `lc-hl-2019-normal-p${i % 2 + 1}-${i % 2 === 0 ? "1a" : "1ai"}`,
      attemptedAt: new Date(Date.UTC(2026, 10, i + 1)).toISOString(),
      createdAt: new Date(Date.UTC(2026, 10, i + 1)).toISOString(), updatedAt: new Date(Date.UTC(2026, 10, i + 1)).toISOString(),
      methodScore: i < 7 ? 2 : 4, scaleVersion: "easy-maths-five-levels-v1", earnedMarks: null, maximumMarks: null, note: null,
    }));
    assert.equal(saveMethodAttempts(attempts), true);
    assert.deepEqual(readMethodAttempts(), attempts);
    assert.deepEqual(paperMethodProgress(readMethodAttempts()), { attempts: 14, parts: 3, improved: 2, independent: 2 });
  } finally {
    if (previous) Object.defineProperty(globalThis, "localStorage", previous);
    else delete globalThis.localStorage;
  }
});
