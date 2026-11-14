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
const part = (number, code) => findRealPaper(`lc-hl-2021-normal-p${number}`).questions.find((q) => q.id.endsWith(`-${code}`));
const check = (number, code, answer, expected = "correct") => assert.equal(checkAnswer(String(answer), part(number, code).answerCheck), expected, `P${number} ${code}: ${answer}`);

test("both 2021 papers preserve every tracker leaf, source hash and route", async () => {
  for (const [number, count, checked] of [[1, 44, 24], [2, 42, 26]]) {
    const id = `lc-hl-2021-normal-p${number}`;
    const book = findBookPaper(id);
    const paper = findRealPaper(id);
    assert.equal(book.questions.length, 10);
    assert.equal(book.parts.length, count);
    assert.equal(paper.questions.length, count);
    assert.equal(paper.questions.filter((q) => q.answerCheck).length, checked);
    assert.deepEqual(paper.questions.map((q) => q.id), book.parts.map((p) => p.id));
    assert.equal(new Set(paper.questions.map((q) => q.id)).size, count);
    assert.equal(parseRoutePath(`/book/${id}`).screen, "book");
    for (const question of paper.questions) {
      assert.deepEqual(parseRoutePath(`/book/${id}/parts/${question.id}`), { screen: "question", paperId: id, questionId: question.id });
      assert.ok(question.prompt && question.answer && question.solution, question.id);
      assert.equal(Boolean(question.answerCheck) !== Boolean(question.selfCheck), true, question.id);
      assert.equal(question.marks, null);
      if (question.selfCheck) assert.ok(question.selfCheck.checks.length >= 2, question.id);
    }
    const pdf = await readFile(`data/papers/2021_normal_lc_maths_hl_english_paper_${number}.pdf`);
    assert.equal(createHash("sha256").update(pdf).digest("hex"), book.sourceSha256);
  }
});

test("2021 Paper 1 answer formats, signs, roots and finite-sum boundaries", () => {
  const examples = [
    ["1a", "-1", "1"], ["1b", "2+3i; -2-3i", "2-3i; -2+3i"],
    ["2a", "8, -2", "8, 2"], ["3bi", "-5, 7/3", "5, 7/3"],
    ["4bii", "5", "7"], ["5ai", "6, 1, -18", "6, -1, -18"],
    ["5b", "0.68", "1.73"], ["6b", "8", "6"],
    ["7ai", "45, 40.5, 729/20, 32.805, 29.5245", "45, 40.5, 36.45, 32.805, 29.52"],
    ["7aii", "3.6", "3.2"], ["7aiii", "443", "450"], ["7aiv", "31", "30"],
    ["8bi", "0.003x^2 - 0.24x + 3.6", "0.003x^2 - 0.12x + 3.6"],
    ["8biii", "21", "40"], ["8c", "20.47", "21.875"],
    ["9aiii", "42", "53"], ["9b", "141", "2.35"], ["9c", "70", "50"],
    ["9d", "-4/15", "4/15"], ["10ai", "15", "-4/3"], ["10aii", "11", "235"],
    ["10aiii", "41/6", "6"], ["10aiv", "200", "201"], ["10biv", "6.25", "2.5"],
  ];
  for (const [code, correct, incorrect] of examples) {
    check(1, code, correct); check(1, code, incorrect, "incorrect");
    check(1, code, "unsupported response", "unreadable");
  }
  check(1, "1b", "-2-3i and 2+3i");
  for (const code of ["1c", "2b", "3a", "3bii", "4a", "4bi", "5aii", "6a", "6c", "7bi", "7bii", "7biii", "8ai", "8aii", "8bii", "9ai", "9aii", "10bi", "10bii", "10biii"]) {
    assert.ok(part(1, code).selfCheck && !part(1, code).answerCheck, code);
  }
});

test("2021 Paper 2 answer formats, conditional counts, strict thresholds and units", () => {
  const examples = [
    ["1a", "0.325", "0.0295"], ["1b", "0.78", "0.93"], ["1c", "0.82", "0.12"],
    ["2a", "-2", "2"], ["2ci", "10", "5"], ["2cii", "37, 2, 23, 8", "37, 2, 30, 5"],
    ["4aii", "3/5", "1/5"], ["4b", "330, 150", "120, 300"], ["5aii", "7", "343"],
    ["5b", "13, 45", "12, 45"], ["7b", "2.5", "14"], ["7d", "50.1", "5.01"],
    ["7e", "3.3", "30"], ["7f", "26", "2618"], ["8ai", "223", "222"],
    ["8bi", "-1.79", "1.79"], ["8ci", "0.1152", "0.2174"], ["8cii", "0.2033", "0.0339"],
    ["9ai", "90", "2"], ["9biii", "147.95", "0"], ["9bv", "58646", "155.56"],
    ["10ai", "0.0103", "0.0343"], ["10aii", "0.3409", "0.6591"], ["10aiii", "43", "42"],
    ["10b", "116", "102"], ["10c", "142", "92"],
  ];
  for (const [code, correct, incorrect] of examples) {
    check(2, code, correct); check(2, code, incorrect, "incorrect");
    check(2, code, "unsupported response", "unreadable");
  }
  for (const code of ["2b", "3a", "3bi", "3bii", "4ai", "5ai", "6a", "6b", "7a", "7c", "8aii", "8bii", "9aii", "9bi", "9bii", "9biv"]) {
    assert.ok(part(2, code).selfCheck && !part(2, code).answerCheck, code);
  }
});

test("2021 numerical checks agree with independently recomputed models", () => {
  const round = (n, places = 0) => Number(n.toFixed(places));
  check(1, "5b", round(Math.sqrt(3) - Math.PI / 3, 2));
  check(1, "7aii", round(45 * 0.9 ** 24, 1));
  check(1, "7aiii", round(Array.from({ length: 40 }, (_, i) => 45 * 0.9 ** i).reduce((a, b) => a + b)));
  const firstShort = Array.from({ length: 100 }, (_, i) => i + 1).find((n) => 45 * 0.9 ** (n - 1) < 2);
  check(1, "7aiv", firstShort);
  check(1, "8c", round((0.001 * 75 ** 4 / 4 - 0.12 * 75 ** 3 / 3 + 3.6 * 75 ** 2 / 2 + 5 * 75) / 75, 2));
  check(1, "9aiii", round(95 - (75 * Math.exp(-0.081 * 10) + 20)));
  check(1, "9b", round(60 * Math.log(75 / 62) / 0.081));
  check(1, "9c", 4.05 / 0.081 + 20);
  check(1, "9d", (-1 / 20) / (3 * Math.cbrt(1 / 64) ** 2));
  const maxTime = 41 / 6;
  check(1, "10aiv", round(60 + 41 * maxTime - 3 * maxTime ** 2));
  const laterRadius = 10 + Array.from({ length: 10 }, (_, i) => 1.5 + Math.sin(Math.PI * (i + 1) / 5)).reduce((a, b) => a + b);
  check(1, "10biv", laterRadius ** 2 / 100);
  const choose = (n, k) => {
    let result = 1;
    for (let i = 1; i <= k; i++) result = result * (n - i + 1) / i;
    return result;
  };
  const binomial = (n, k, p) => choose(n, k) * p ** k * (1 - p) ** (n - k);
  check(2, "1a", round(binomial(11, 1, 0.15), 3));
  check(2, "1b", round([0, 1, 2].reduce((sum, k) => sum + binomial(11, k, 0.15), 0), 2));
  check(2, "1c", round([0, 1, 2].reduce((sum, k) => sum + binomial(10, k, 0.15), 0), 2));
  const area = Math.sqrt(31 * 3 * 27);
  check(2, "7d", round(area, 1));
  check(2, "7e", round(2 * area / 30, 1));
  check(2, "7f", round(30000 * Math.tan(0.05 * Math.PI / 180)));
  check(2, "8bi", (19.8 - 21) / (5.2 / Math.sqrt(60)));
  check(2, "8ci", round((18 / 23) * (17 / 22) * (16 / 21) * (5 / 20), 4));
  check(2, "8cii", round(12 * 6 * 5 / choose(23, 3), 4));
  check(2, "9ai", round((1450 * Math.sin(8.57 * Math.PI / 180) / Math.sin(160 * Math.PI / 180)) / 420 * 60));
  check(2, "9biii", round(110 * Math.sqrt(2) * Math.sin(120 * Math.PI * 6.67), 2));
  check(2, "9bv", round(110 * Math.sqrt(2) * 120 * Math.PI * Math.cos(240 * Math.PI)));
  check(2, "10ai", round(binomial(9, 2, 0.08) * 0.08, 4));
  check(2, "10aii", round(1 - 0.92 ** 5, 4));
  assert.ok(1 - 0.92 ** 42 <= 0.97 && 1 - 0.92 ** 43 > 0.97);
  check(2, "10aiii", Math.floor(Math.log(0.03) / Math.log(0.92)) + 1);
  check(2, "10b", 0.8 * 70 + 0.2 * (70 + 150 + 80));
  check(2, "10c", 120000 * 0.0001 + 40000 * 0.002 + 900000 / 18000);
});

test("new 2021 catalogue IDs retain dated method-attempt history", async () => {
  const { readMethodAttempts, saveMethodAttempts, paperMethodProgress } = await load("src/utils/methodAttempts.ts");
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const storage = new Map();
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: (k) => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v) } });
  try {
    const attempts = Array.from({ length: 12 }, (_, i) => ({
      id: `2021-repeat-${i}`, partId: `lc-hl-2021-normal-p${i % 2 + 1}-1a`,
      attemptedAt: new Date(Date.UTC(2026, 10, i + 1)).toISOString(),
      createdAt: new Date(Date.UTC(2026, 10, i + 1)).toISOString(), updatedAt: new Date(Date.UTC(2026, 10, i + 1)).toISOString(),
      methodScore: i < 6 ? 2 : 4, scaleVersion: "easy-maths-five-levels-v1", earnedMarks: null, maximumMarks: null, note: null,
    }));
    assert.equal(saveMethodAttempts(attempts), true);
    assert.deepEqual(readMethodAttempts(), attempts);
    assert.deepEqual(paperMethodProgress(readMethodAttempts()), { attempts: 12, parts: 2, improved: 2, independent: 2 });
  } finally {
    if (previous) Object.defineProperty(globalThis, "localStorage", previous);
    else delete globalThis.localStorage;
  }
});
