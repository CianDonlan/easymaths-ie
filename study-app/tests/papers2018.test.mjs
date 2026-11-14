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
const part = (n, code) => findRealPaper(`lc-hl-2018-normal-p${n}`).questions.find((q) => q.id.endsWith(`-${code}`));
const check = (n, code, answer, expected = "correct") => assert.equal(checkAnswer(String(answer), part(n, code).answerCheck), expected, `P${n} ${code}: ${answer}`);

test("2018 uses nine-question catalogues, complete leaf coverage and verified source PDFs", async () => {
  for (const [n, count, checked] of [[1, 33, 19], [2, 33, 24]]) {
    const id = `lc-hl-2018-normal-p${n}`;
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
    const pdf = await readFile(`data/papers/2018_normal_lc_maths_hl_english_paper_${n}.pdf`);
    assert.equal(createHash("sha256").update(pdf).digest("hex"), book.sourceSha256);
  }
});

test("2018 checks all automatic formats and their exact input examples", () => {
  const examples = [
    [1, "1a", "2, -1, 5", "2, 1, 5"], [1, "1b", "-9 ≤ x < -2", "-9 < x < -2"],
    [1, "2c", "8, 128", "1, 128"], [1, "3a", "120", "60"], [1, "4b", "1", "-1"],
    [1, "5ai", "2115", "3150"], [1, "5aii", "8530", "8400"], [1, "5b", "-2, -4, -2, 2, 4, 2, -2", "-2, -4, -2, 2, 4, 2, 2"],
    [1, "6a", "(1,1), (-1,-1), (0,0)", "(1,1), (-1,1), (0,0)"], [1, "6bi", "1/2", "0"],
    [1, "7b", "64", "63"], [1, "7eii", "17", "38"], [1, "8b", "0.484", "0.242"],
    [1, "9a", "3, 9, 27, 3/4, 27/64", "3, 9, 27, 1/4, 27/64"], [1, "9bii", "19", "18"],
    [1, "9ci", "17", "16"], [1, "9cii", "0", "1"], [1, "9di", "9/2, 81/8, 243/16", "9/2, 81/16, 243/32"], [1, "9dii", "4368329", "4368328"],
    [2, "1a", "100", "-100"], [2, "1b", "250", "100"], [2, "2a", "0.44", "0.67"], [2, "2bii", "83", "82"],
    [2, "3ai", "100000", "90000"], [2, "3aii", "300", "600"], [2, "3b", "1, 7, 16, 12", "1, 6, 12, 8"],
    [2, "4a", "285, 75, 105, 255", "150, 210, 510, 570"], [2, "5b", "6, 13", "13, 6"],
    [2, "5c", "(x+1)^2+(y-5/2)^2=13/4", "(x-1)^2+(y-5/2)^2=13/4"], [2, "6b", "10", "5"],
    [2, "7a", "2324", "2325"], [2, "7bi", "107.3", "113.7"], [2, "7bii", "71.3, 80.3, 89.3, 98.3, 107.3", "71.3, 80.3, 89.3, 98.3, 120"],
    [2, "7c", "11.5", "13.5"], [2, "7d", "10.0", "16.6"], [2, "8ai", "0.7972", "0.312"],
    [2, "8aii", "0.77, 0.85", "0.77, 0.84"], [2, "8bii", "1/4", "1/2"], [2, "8biii", "0.03465", "0.06930"],
    [2, "8c", "440132.40", "420132.40"], [2, "9a", "51", "129"], [2, "9bii", "18.28, 10, 18.28, 30", "28.28, 20, 28.28, 40"], [2, "9c", "7", "6"],
  ];
  const covered = new Set();
  for (const [n, code, correct, wrong] of examples) {
    covered.add(part(n, code).id);
    check(n, code, correct); check(n, code, wrong, "incorrect"); check(n, code, "unsupported response", "unreadable");
    check(n, code, part(n, code).answerCheck.placeholder.replace(/^e.g. /, ""));
  }
  assert.equal(covered.size, 43);
  for (const n of [1, 2]) for (const q of findRealPaper(`lc-hl-2018-normal-p${n}`).questions) assert.equal(covered.has(q.id), Boolean(q.answerCheck), q.id);
  check(2, "8ai", "0.7960"); check(2, "8ai", "0.7961"); check(2, "8ai", "79.72%");
  for (const [n, code] of [[1, "2a"], [1, "4a"], [1, "6bii"], [1, "7c"], [1, "8d"], [2, "6a"], [2, "8bi"], [2, "9biii"], [2, "9biv"]]) assert.ok(part(n, code).selfCheck);
});

test("2018 results satisfy source equations, bounds and indexing independently", () => {
  const round = (x, dp = 0) => Number(x.toFixed(dp));
  const [x, y, z] = part(1, "1a").answerCheck.expected;
  assert.deepEqual([2 * x + 3 * y - z, 3 * x + 2 * y + 2 * z, x - 3 * z], [-4, 14, -13]);
  for (const v of [-10, -9, -8, -3, -1, 0, 10]) assert.equal((2 * v - 3) / (v + 2) >= 3, v >= -9 && v < -2);
  for (const root of [1, 8]) assert.equal(root ** 3 - 17 * root ** 2 + 80 * root - 64, 0);
  let sequence = [4, 2];
  while (sequence.length < 2019) sequence.push(sequence.at(-1) - sequence.at(-2));
  assert.deepEqual([...sequence.slice(2, 8), sequence[2018]], part(1, "5b").answerCheck.expected);
  const row = (r) => Array.from({ length: 45 }, (_, i) => 3 * r + 1 + i * (2 * r + 1)).reduce((a, b) => a + b);
  check(1, "5ai", row(2) - row(1));
  check(1, "5aii", (3 * 60 + 1) + 69 * (2 * 60 + 1));
  check(1, "7b", round(80 * (1 - Math.exp(-100 / 62.5))));
  const h = (v) => 1.5 * v + 62.5 * Math.log(1 - v / 80);
  const maximumX = 80 - 62.5 / 1.5;
  check(1, "7eii", round(h(maximumX)));
  assert.ok(h(maximumX) > h(0) && h(maximumX) > h(70));
  assert.ok(h(61) > 0 && h(63) < 0);
  check(1, "8b", round(2 / Math.sqrt(2 * Math.PI * Math.E), 3));
  assert.ok(3 ** 18 <= 1e9 && 3 ** 19 > 1e9);
  assert.ok(.75 ** 16 >= .01 && .75 ** 17 < .01);
  check(1, "9dii", round(3 ** 35 * 3 / 2 ** 35));
  check(2, "1a", 2000 - (9000 / 20 + 7000 / 10 + 3000 / 4));
  check(2, "1b", (2000 - 1900) / (1 / 20 + 1 / 10 + 1 / 4));
  // Exhaust all six-digit strings, retaining leading zeros and repetitions.
  let codes = 0;
  for (let i = 0; i < 1000000; i++) if (String(i).padStart(6, "0").includes("2018")) codes++;
  check(2, "3aii", codes);
  const circle = part(2, "5c").answerCheck, r = Math.sqrt(circle.radiusSquared);
  assert.ok(Math.abs(Math.abs(2 * circle.centreX + 3 * circle.centreY + 1) / Math.sqrt(13) - r) < 1e-12);
  const a = [-2, 1], b = [6, 13], small = [circle.centreX, circle.centreY], large = [b[0] - 3, b[1] - 4.5];
  assert.ok(Math.abs(Math.hypot(...b.map((v, i) => v - a[i])) - 8 * r) < 1e-12);
  assert.ok(Math.abs(Math.hypot(...small.map((v, i) => v - large[i])) - 4 * r) < 1e-12);
  const volumes = Array.from({ length: 5 }, (_, i) => 4 * Math.PI * 3 ** 3 / 3 * 1.75 ** i);
  check(2, "7a", round(volumes.reduce((a, b) => a + b)));
  check(2, "7bi", round(120 - 2 * Math.sqrt(503 / (4 * Math.PI)), 1));
  check(2, "7c", (150 - 2 * 20 - 9 * 2) / 8);
  const rb = Math.cbrt(volumes[1] * 3 / (4 * Math.PI));
  check(2, "7d", round(Math.hypot(13.5, 80.3 + rb - 71.3 - 3) - rb - 3, 1));
  const p = 324 / 400, margin = 1.96 * Math.sqrt(p * (1 - p) / 400);
  check(2, "8aii", `${round(p - margin, 2)}, ${round(p + margin, 2)}`);
  check(2, "8biii", round(1.96 * Math.sqrt(.25 / 800), 5));
  const fund = Array.from({ length: 26 }, (_, i) => 20000 * 1.01 ** i / 1.024 ** i).reduce((a, b) => a + b);
  check(2, "8c", round(fund, 2));
  let balance = fund;
  for (let year = 0; year <= 25; year++) { balance -= 20000 * 1.01 ** year; if (year < 25) balance *= 1.024; }
  assert.ok(Math.abs(balance) < 1e-6);
  const angle = Math.asin(3 * Math.sin(15 * Math.PI / 180));
  check(2, "9a", round(angle * 180 / Math.PI));
  const crankRadius = part(2, "9c").answerCheck.expected;
  assert.equal(crankRadius, 7);
  // Recover the unknown radius from coordinates of B relative to A.
  const bx = 36 * Math.cos(10 * Math.PI / 180), by = 36 * Math.sin(10 * Math.PI / 180);
  const exactR = ((bx - 31) ** 2 + by ** 2) / (2 * (bx - 31));
  assert.ok(Math.abs(Math.hypot(bx - 31 - exactR, by) - exactR) < 1e-12);
  check(2, "9c", round(exactR));
  const distance = (degrees) => {
    const rad = degrees * Math.PI / 180;
    return 10 * Math.cos(rad) + Math.sqrt(900 - 100 * Math.sin(rad) ** 2) - 10;
  };
  check(2, "9bii", [90, 180, 270, 360].map((a) => round(distance(a), 2)).join(", "));
  for (let a = 0; a <= 360; a++) assert.ok(distance(a) >= 10 - 1e-10 && distance(a) <= 30 + 1e-10);
});

test("2018 normal probabilities agree with numerical integration", () => {
  const integral = (a, b) => {
    const n = 20000, width = (b - a) / n;
    const density = (v) => Math.exp(-v * v / 2) / Math.sqrt(2 * Math.PI);
    let sum = density(a) + density(b);
    for (let i = 1; i < n; i++) sum += (i % 2 ? 4 : 2) * density(a + i * width);
    return sum * width / 3;
  };
  const se = .12 / Math.sqrt(10);
  check(2, "8ai", integral((4.6 - 4.64) / se, (4.7 - 4.64) / se));
  check(2, "8ai", integral(-1.05, 1.58));
  assert.ok(integral(-8, .435) < .67 && integral(-8, .445) > .67);
  assert.ok(integral(-8, (82 - 72) / 10) < .85 && integral(-8, (83 - 72) / 10) > .85);
  assert.ok(Math.abs(integral(-2, 1) - .8185946141) < 1e-9);
});

test("new 2018 method records coexist with earlier papers and retain repeated history", async () => {
  const { readMethodAttempts, saveMethodAttempts, paperMethodProgress } = await load("src/utils/methodAttempts.ts");
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const storage = new Map();
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: (k) => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v) } });
  try {
    const attempts = Array.from({ length: 14 }, (_, i) => ({
      id: `2018-repeat-${i}`, partId: i === 0 ? "lc-hl-2019-normal-p1-1a" : `lc-hl-2018-normal-p${i % 2 + 1}-1a`,
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
