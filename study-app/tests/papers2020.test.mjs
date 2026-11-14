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
const part = (n, code) => findRealPaper(`lc-hl-2020-normal-p${n}`).questions.find((q) => q.id.endsWith(`-${code}`));
const check = (n, code, answer, expected = "correct") => assert.equal(checkAnswer(String(answer), part(n, code).answerCheck), expected, `P${n} ${code}: ${answer}`);

test("2020 uses nine-question catalogues, complete leaf coverage and verified source PDFs", async () => {
  for (const [n, count, checked] of [[1, 36, 22], [2, 30, 20]]) {
    const id = `lc-hl-2020-normal-p${n}`;
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
    const pdf = await readFile(`data/papers/2020_normal_lc_maths_hl_english_paper_${n}.pdf`);
    assert.equal(createHash("sha256").update(pdf).digest("hex"), book.sourceSha256);
  }
});

test("2020 Paper 1 checks all configured formats and rejects common wrong answers", () => {
  const examples = [
    ["1ai", "6", "-6"], ["1aii", "4", "-4"], ["1aiii", "8, 7", "6, 7"],
    ["1b", "-3 ≤ x ≤ -2", "-3 < x < -2"], ["2a", "3, 4, -2, -5", "3, -4, -2, -5"],
    ["2bi", "1-i", "1+i"], ["3bi", "1, 2", "2, 1"], ["3bii", "3125, 1/5", "25, 1/5"],
    ["4b", "y=-8x+23", "y=8x+23"], ["5a", "1244.06", "1244.07"], ["6bii", "12", "3"],
    ["7ai", "10, 15, 21, 28, 36", "10, 15, 20, 28, 36"], ["7biii", "6216", "6328"], ["7c", "1225", "35"],
    ["8ai", "5, 5", "10, 10"], ["8aiv", "50", "25"], ["8b", "-1", "1"],
    ["9ai", "603", "602"], ["9aii", "8.7", "8.6"], ["9b", "743", "751"], ["9d", "18", "17"], ["9e", "7", "6"],
  ];
  for (const [code, correct, incorrect] of examples) {
    check(1, code, correct); check(1, code, incorrect, "incorrect"); check(1, code, "unsupported response", "unreadable");
  }
  check(1, "2bi", "1-1i"); check(1, "2bi", "r = 1 − i");
  for (const malformed of ["1--i", "1+-i", "1-ii"]) check(1, "2bi", malformed, "unreadable");
  for (const code of ["2bii", "3a", "4a", "4c", "5b", "6a", "6bi", "7aii", "7bi", "7bii", "7d", "8aii", "8aiii", "9c"]) {
    assert.ok(part(1, code).selfCheck && !part(1, code).answerCheck, code);
  }
});

test("2020 Paper 2 checks controlled numerical answers and both documented normal approximations", () => {
  const examples = [
    ["1b", "33.435", "26.565"], ["2a", "9", "3"], ["3a", "6.34", "6.35"], ["3b", "9", "3"],
    ["4b", "4.4", "2.6"], ["5ai", "2/3", "4/6"], ["6a", "36.9%", "104%"],
    ["6bi", "135/2048", "135/1024"], ["6bii", "1, 1, 2", "1, 1, 1"], ["7aii", "93.31", "93.30"],
    ["7aiii", "132", "228"], ["7b", "65.2", "195.5"], ["7c", "13", "26"], ["7d", "1.2", "7.2"],
    ["8ai", "341", "340"], ["8bii", "0.8", "0.2"], ["8d", "14.59%", "85.41%"],
    ["8e", "4, 6, 9, 11, 14, 16, 23, 25", "4, 6, 8, 11, 14, 16, 23, 25"],
    ["9a", "83.85", "97.5"], ["9c", "1.2, 80.5", "1.2, 90"],
  ];
  for (const [code, correct, incorrect] of examples) {
    check(2, code, correct); check(2, code, incorrect, "incorrect"); check(2, code, "unsupported response", "unreadable");
  }
  check(2, "6bi", "0.065918");
  check(2, "8d", "14.69%"); check(2, "8d", "0.1459"); check(2, "8d", "0.1469");
  for (const code of ["1a", "2b", "4a", "5aii", "5b", "7ai", "8aii", "8bi", "8c", "9b"]) {
    assert.ok(part(2, code).selfCheck && !part(2, code).answerCheck, code);
  }
});

test("2020 results agree with independent calculations and boundary checks", () => {
  const round = (x, places = 0) => Number(x.toFixed(places));
  // Accumulate the present value directly, independently of the closed-form solution.
  const payment = 250000 / Array.from({ length: 300 }, (_, i) => 1.00287 ** -(i + 1)).reduce((a, b) => a + b);
  check(1, "5a", round(payment, 2));
  const payoff = Array.from({ length: 168 }, (_, i) => 1771 / 1.003 ** (i + 1)).reduce((a, b) => a + b);
  assert.equal(round(payoff, 2), 233438.25);
  for (const x of [25, 1 / 5]) {
    assert.ok((126 / 25) * x - 1 > 0);
    assert.ok(Math.abs(Math.log(5 * x * x) / Math.log(5) - 2 - Math.log((126 / 25) * x - 1) / Math.log(5)) < 1e-10);
  }
  assert.equal(111 * 112 / 2 + 112 * 113 / 2, 12544);
  check(1, "7biii", 111 * 112 / 2);
  check(1, "7c", round((((3 + 2 * Math.sqrt(2)) ** 3 - (3 - 2 * Math.sqrt(2)) ** 3) / (4 * Math.sqrt(2))) ** 2));
  check(1, "9ai", round(450 * Math.exp(0.065 * 4.5)));
  check(1, "9aii", round(Math.log(790 / 450) / 0.065, 1));
  check(1, "9b", round(450 * (Math.exp(0.065 * 12) - Math.exp(0.065 * 3)) / (0.065 * 9)));
  assert.ok(29.25 * Math.exp(0.065 * 17) <= 90 && 29.25 * Math.exp(0.065 * 18) > 90);
  check(1, "9e", round(Math.log(450 / 220) / (0.17 - 0.065)));
  check(2, "1b", round(60 - Math.atan(0.5) * 180 / Math.PI, 3));
  check(2, "2a", Math.sqrt((5 - 2) ** 2 + (8 + 1) ** 2 - 3 ** 2));
  // Solve the pole using horizontal components rather than the sine-rule solution.
  const r = (angle) => angle * Math.PI / 180;
  const near = Math.cos(r(5)) * Math.tan(r(52)) - Math.sin(r(5));
  const far = Math.cos(r(5)) * Math.tan(r(35)) - Math.sin(r(5));
  check(2, "3a", round(6 * far / (near - far), 2));
  check(2, "4b", round(7 - (0.5 * 7 * 7 * 1.2 - 21) * 2 / (7 * Math.sin(1.2)), 1));
  check(2, "6a", 0.3 * 0.7 + 0.6 * 0.25 + 0.1 * 0.09);
  check(2, "6bi", 0.25 * 10 * 0.25 ** 2 * 0.75 ** 3);
  for (const height of [8.37, Math.sqrt(81 - 3.3 ** 2)]) {
    const depth = height - 1;
    const volume = Math.PI * (3.3 * depth / height) ** 2 * depth / 3;
    check(2, "7b", round(volume, 1));
    check(2, "7c", round(volume / (Math.PI * 0.8 ** 2 * 2.5)));
    const fillDepth = Math.cbrt(60 * 3 * height ** 2 / (Math.PI * 3.3 ** 2));
    check(2, "7d", round(height - fillDepth, 1));
  }
  check(2, "7aii", round(Math.PI * 3.3 * 9, 2));
  check(2, "7aiii", 360 * 3.3 / 9);
  check(2, "9a", round(Math.hypot(90 - 15 * 0.5, 30 * 0.5), 2));
  const t = 2700 / 2250;
  check(2, "9c", `${t}, ${round(Math.hypot(90 - 15 * t, 30 * t), 1)}`);
});

test("spinner enumeration and ordered-list constraints independently confirm guided content", () => {
  const counts = [0, 0, 0];
  for (const a of [1, 1, 2, 3]) for (const b of [1, 1, 2, 3]) counts[(a + b) % 3]++;
  assert.deepEqual(counts, [5, 5, 6]);
  const possibilities = [];
  for (let a = 1; a <= 22; a++) for (let b = a + 2; b < 15; b++) for (let d = 1; d < 25; d++) {
    const row = [a, b, 15 - b, d, 25 - d, 16, 23, a + 21];
    if (row.some((v, i) => v <= 0 || (i && v - row[i - 1] < 2))) continue;
    if (row.reduce((x, y) => x + y) / 8 !== 13.5) continue;
    if ((row[5] + row[6]) / 2 - (row[1] + row[2]) / 2 !== 12) continue;
    possibilities.push(row);
  }
  assert.deepEqual(possibilities, [[4, 6, 9, 11, 14, 16, 23, 25]]);
  check(2, "8e", possibilities[0].join(", "));
});

test("new 2020 method records coexist with earlier papers and retain repeated history", async () => {
  const { readMethodAttempts, saveMethodAttempts, paperMethodProgress } = await load("src/utils/methodAttempts.ts");
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const storage = new Map();
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: (k) => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v) } });
  try {
    const attempts = Array.from({ length: 14 }, (_, i) => ({
      id: `2020-repeat-${i}`, partId: i === 0 ? "lc-hl-2021-normal-p1-1a" : `lc-hl-2020-normal-p${i % 2 + 1}-${i % 2 === 0 ? "1ai" : "1a"}`,
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
