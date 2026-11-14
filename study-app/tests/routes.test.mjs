import assert from "node:assert/strict";
import test from "node:test";
import { rolldown } from "rolldown";

async function loadBundled(entry) {
  const bundle = await rolldown({ input: entry, platform: "node" });
  try {
    const output = await bundle.generate({ format: "esm" });
    return import(`data:text/javascript,${encodeURIComponent(output.output[0].code)}`);
  } finally {
    await bundle.close();
  }
}

const { parseRoutePath } = await loadBundled("src/utils/parseRoute.ts");
const { findBookPaper, findRealPaper } = await loadBundled("src/data/realCatalogue.ts");
const { checkAnswer } = await loadBundled("src/utils/checkAnswer.ts");

test("2022 Paper 1 exposes all 48 reviewed parts in tracker order", () => {
  const paperId = "lc-hl-2022-normal-p1";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.equal(book.questions.length, 10);
  assert.equal(book.parts.length, 48);
  assert.equal(paper.questions.length, 48);
  assert.deepEqual(paper.questions.map((q) => q.id), book.parts.map((p) => p.id));
  assert.deepEqual(parseRoutePath(`/book/${paperId}`), { screen: "book", paperId, partId: undefined });
  for (const question of paper.questions) {
    assert.deepEqual(parseRoutePath(`/book/${paperId}/parts/${question.id}`), {
      screen: "question", paperId, questionId: question.id,
    });
    assert.ok(question.prompt && question.answer && question.solution, question.id);
    assert.ok(question.answerCheck || question.selfCheck, question.id);
    assert.equal(question.marks, null);
  }
  const invalidPart = `${paperId}-not-a-part`;
  assert.deepEqual(parseRoutePath(`/book/${paperId}/parts/${invalidPart}`), {
    screen: "book", paperId, partId: invalidPart,
  });
});

test("2022 Paper 1 checks both discriminant values, elimination, exact area and strict derivative interval", () => {
  const paper = findRealPaper("lc-hl-2022-normal-p1");
  const part = (code) => paper.questions.find((q) => q.id.endsWith(`-${code}`));
  const examples = [
    ["1a", "6, -6", "6, 6"],
    ["1cii", "6", "0"],
    ["2bii", "-12, 60, 225", "60, -12, 225"],
    ["3aiii", "20π", "80pi"],
    ["3b", "0, 512", "0, -512"],
    ["5bi", "9, -1, 7/2", "9, -1, -7/2"],
    ["5bii", "1.14 < x < 5.86", "1.14 ≤ x ≤ 5.86"],
    ["6b", "60", "120"],
  ];
  for (const [code, correct, incorrect] of examples) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
    assert.equal(checkAnswer("not a mathematical answer", part(code).answerCheck), "unreadable", code);
  }
  for (const code of ["1b", "1ci", "2a", "2bi", "3ai", "3aii", "4a", "4bi", "4bii", "5a", "6a", "6c"]) {
    assert.ok(part(code).selfCheck && !part(code).answerCheck, code);
  }
  assert.equal(part("2bi").illustration, "integral-regions-2022");
  assert.equal(part("3aiii").illustration, "complex-circle-2022");
  assert.equal(part("6c").illustration, "derivative-graph-2022");
});

test("2022 Paper 1 applications check extrema, cycle windows, logarithms and requested rounding", () => {
  const paper = findRealPaper("lc-hl-2022-normal-p1");
  const part = (code) => paper.questions.find((q) => q.id.endsWith(`-${code}`));
  const examples = [
    ["7a", "162", "62"],
    ["7b", "6x^2 - 57x + 105", "6x^2 - 28.5x + 105"],
    ["7d", "70, 185.625", "94.5, 185.625"],
    ["7e", "4, 45", "4, 75"],
    ["8a", "12, 42, 102, 132, 102, 42, 12, 42, 102", "12, 42, 102, 132, 102, 42, 12, 42, 103"],
    ["8c", "6, 12, 132", "6, 12, 120"],
    ["8d", "34", "33"],
    ["8e", "3.85", "2.15"],
    ["8f", "65.8", "72"],
    ["9a", "4.18", "1.52"],
    ["9b", "5.3", "5"],
    ["9d", "37.27", "37.5"],
    ["9e", "37.5", "22.5"],
    ["9fii", "11", "50"],
    ["10a", "0.65", "65"],
    ["10b", "8.49", "9.49"],
    ["10ci", "-0.06", "0.06"],
    ["10eii", "0.165", "0.485"],
  ];
  for (const [code, correct, incorrect] of examples) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  // Recalculate the rounded results from the models rather than only testing stored examples.
  const round = (n, places) => Number(n.toFixed(places));
  const numericModels = [
    ["8e", round(6 - 3 * Math.acos(-19 / 30) / Math.PI, 2)],
    ["8f", round((72 * 8 - 180 * Math.sin(8 * Math.PI / 3) / Math.PI) / 8, 1)],
    ["9a", round(15 * 0.6 ** 2.5, 2)],
    ["9b", round(Math.log(1 / 15) / Math.log(0.6), 1)],
    ["9d", round(15 * (1 - 0.6 ** 10) / (1 - 0.6), 2)],
    ["9fii", round(50 * 0.15 / (1 - 0.85 ** 7), 0)],
    ["10a", round(0.82 - 0.12 * Math.log(4), 2)],
    ["10b", round(Math.exp((0.82 - 0.55) / 0.12) - 1, 2)],
    ["10eii", round(Math.log(80 / 47) / Math.log(25), 3)],
  ];
  for (const [code, value] of numericModels) assert.equal(checkAnswer(String(value), part(code).answerCheck), "correct", code);
  for (const code of ["7c", "7fi", "7fii", "7g", "8b", "9c", "9fi", "10cii", "10d", "10ei"]) {
    assert.ok(part(code).selfCheck && !part(code).answerCheck, code);
  }
  assert.equal(paper.questions.filter((q) => q.answerCheck).length, 26);
});

test("2022 method attempts survive a revisit and repeated attempts retain their history", async () => {
  const { readMethodAttempts, saveMethodAttempts, paperMethodProgress } = await loadBundled("src/utils/methodAttempts.ts");
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const storage = new Map();
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  } });
  try {
    const row = { partId: "lc-hl-2022-normal-p1-1a", scaleVersion: "easy-maths-five-levels-v1", earnedMarks: null, maximumMarks: null, note: null };
    const attempts = [
      { ...row, id: "first", methodScore: 2, attemptedAt: "2026-11-13T12:00:00Z", createdAt: "2026-11-13T12:00:00Z", updatedAt: "2026-11-13T12:00:00Z" },
      { ...row, id: "repeat", methodScore: 4, attemptedAt: "2026-11-14T12:00:00Z", createdAt: "2026-11-14T12:00:00Z", updatedAt: "2026-11-14T12:00:00Z" },
    ];
    assert.equal(saveMethodAttempts(attempts), true);
    assert.deepEqual(readMethodAttempts(), attempts);
    assert.deepEqual(paperMethodProgress(readMethodAttempts()), { attempts: 2, parts: 1, improved: 1, independent: 1 });
  } finally {
    if (previous) Object.defineProperty(globalThis, "localStorage", previous);
    else delete globalThis.localStorage;
  }
});

test("2022 Paper 2 has all 47 tracker parts with feedback and stable study routes", () => {
  const paperId = "lc-hl-2022-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.equal(book.questions.length, 10);
  assert.equal(book.parts.length, 47);
  assert.equal(paper.questions.length, 47);
  assert.equal(paper.questions.filter((q) => q.answerCheck).length, 26);
  assert.deepEqual(paper.questions.map((q) => q.id), book.parts.map((p) => p.id));
  assert.equal(parseRoutePath(`/book/${paperId}`).screen, "book");
  for (const q of paper.questions) {
    assert.deepEqual(parseRoutePath(`/book/${paperId}/parts/${q.id}`), { screen: "question", paperId, questionId: q.id });
    assert.ok(q.prompt && q.answer && q.solution, q.id);
    assert.ok(q.answerCheck || q.selfCheck, q.id);
    assert.equal(q.marks, null);
  }
  const part = (code) => paper.questions.find((q) => q.id.endsWith(`-${code}`));
  const examples = [
    ["1ai", "5654, 7007, 14138", "5654, 7007, 8576"],
    ["1b", "1/49", "1/343"],
    ["1c", "8, 12", "12, 8"],
    ["2a", "4/5, 8/5", "31/5, -13/5"],
    ["3a", "-58", "58"],
    ["3b", "2", "-1/2"],
    ["4b", "10", "100"],
    ["5ai", "0.3375", "0.135"],
    ["5aii", "[0.2875, 0.3875]", "[0.2912, 0.3838]"],
    ["5aiii", "[0.2912, 0.3838]", "[0.2875, 0.3875]"],
    ["6b", "95", "85"],
    ["7a", "18", "4.5"],
    ["7b", "2.5", "5"],
    ["7di", "82.448", "82.447"],
    ["7dii", "5.1", "0.3"],
    ["8av", "0.966", "-0.966"],
    ["8c", "55, 87", "54, 88"],
    ["8dii", "0.195", "0.209"],
    ["9a", "402, 134", "402, 402"],
    ["9b", "93", "92"],
    ["9dii", "4.0", "-4.0"],
    ["10ai", "10.56%", "89.44%"],
    ["10aii", "215", "235"],
    ["10b", "0.0429", "0.1715"],
    ["10c", "0.6769", "0.2852"],
    ["10d", "1/897", "50/44850"],
  ];
  for (const [code, correct, incorrect] of examples) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
    assert.equal(checkAnswer("an unsupported answer", part(code).answerCheck), "unreadable", code);
  }
  assert.equal(checkAnswer("10.5649773667%", part("10ai").answerCheck), "correct");
  assert.equal(checkAnswer("0.1056", part("10ai").answerCheck), "incorrect");
  for (const code of ["1aii", "2b", "2c", "3c", "4ai", "4aii", "5b", "6a", "6c", "7c", "7e", "8ai", "8aii", "8aiii", "8aiv", "8b", "8di", "9ci", "9cii", "9di", "10e"]) {
    assert.ok(part(code).selfCheck && !part(code).answerCheck, code);
  }
  assert.equal(part("6a").illustration, "p2-2022-circumcentre");
  assert.equal(part("8ai").illustration, "p2-2022-cars-incomplete");
  assert.equal(part("8aii").illustration, "p2-2022-cars-complete");
});

test("2022 Paper 2 numerical configurations agree with recalculated models", () => {
  const paper = findRealPaper("lc-hl-2022-normal-p2");
  const check = (code, value) => assert.equal(checkAnswer(String(value), paper.questions.find((q) => q.id.endsWith(`-${code}`)).answerCheck), "correct", code);
  const round = (n, places) => Number(n.toFixed(places));
  const p = 135 / 400;
  const error = 1.96 * Math.sqrt(p * (1 - p) / 400);
  check("5aiii", `[${round(p - error, 4)}, ${round(p + error, 4)}]`);
  check("7di", round(4 * Math.PI * 2.7 ** 3 / 3, 3));
  check("7dii", round(2.7 + Math.sqrt(2.7 ** 2 - 5.4 / Math.PI), 1));
  check("8dii", round(1 - 0.905 * 0.959 * 0.927, 3));
  check("9a", `${round(30 * 35 * Math.sin(50 * Math.PI / 180) / 2, 0)}, ${round(10 * 35 * Math.sin(50 * Math.PI / 180) / 2, 0)}`);
  check("9b", round(65 + Math.sqrt(30 ** 2 + 35 ** 2 - 2 * 30 * 35 * Math.cos(50 * Math.PI / 180)), 0));
  check("9dii", round(Math.sqrt(100 * 0.255 ** 2 / (0.686 ** 2 - 0.255 ** 2)), 1));
  check("10b", round(0.95 ** 3 * 0.05, 4));
  check("10c", round(0.9 ** 20 + 20 * 0.1 * 0.9 ** 19 + 190 * 0.1 ** 2 * 0.9 ** 18, 4));
  // Enumerate the distinct whole-number scores to verify both mean and median constraints.
  const known = [46, 68, 24, 74, 42, 30, 61, 54, 28, 50, 57];
  const possible = [];
  for (let s = 1; s <= 100; s++) {
    const m = 13 * 52 - known.reduce((sum, n) => sum + n, 0) - s;
    const scores = [...known, s, m];
    if (m >= 1 && m <= 100 && new Set(scores).size === 13 && scores.sort((a, b) => a - b)[6] === 54) possible.push(s);
  }
  check("8c", `${Math.min(...possible)}, ${Math.max(...possible)}`);
  const city = [22, 27, 24, 16, 15, 21, 30, 17];
  const motorway = [34, 38, 34, 27, 24, 30, 40, 30];
  const meanX = city.reduce((a, b) => a + b) / 8;
  const meanY = motorway.reduce((a, b) => a + b) / 8;
  const covariance = city.reduce((sum, x, i) => sum + (x - meanX) * (motorway[i] - meanY), 0);
  const varianceX = city.reduce((sum, x) => sum + (x - meanX) ** 2, 0);
  const varianceY = motorway.reduce((sum, y) => sum + (y - meanY) ** 2, 0);
  check("8av", round(covariance / Math.sqrt(varianceX * varianceY), 3));
});

test("real-paper cards open their catalogue routes", () => {
  assert.deepEqual(parseRoutePath("/book/lc-hl-2025-normal-p1"), {
    screen: "book", paperId: "lc-hl-2025-normal-p1", partId: undefined,
  });
  assert.deepEqual(parseRoutePath("/book/lc-hl-2025-normal-p2"), {
    screen: "book", paperId: "lc-hl-2025-normal-p2", partId: undefined,
  });
  assert.deepEqual(parseRoutePath("/book/lc-hl-2024-normal-p1"), {
    screen: "book", paperId: "lc-hl-2024-normal-p1", partId: undefined,
  });
  assert.deepEqual(parseRoutePath("/book/lc-hl-2024-normal-p2"), {
    screen: "book", paperId: "lc-hl-2024-normal-p2", partId: undefined,
  });
  assert.deepEqual(parseRoutePath("/book/lc-hl-2023-normal-p1"), {
    screen: "book", paperId: "lc-hl-2023-normal-p1", partId: undefined,
  });
  assert.deepEqual(parseRoutePath("/book/lc-hl-2023-normal-p2"), {
    screen: "book", paperId: "lc-hl-2023-normal-p2", partId: undefined,
  });
  assert.equal(parseRoutePath("/book/no-such-paper").screen, "not-found");
  assert.equal(findBookPaper("lc-hl-2025-normal-p2")?.parts.length, 49);
  assert.equal(findRealPaper("lc-hl-2025-normal-p2")?.questions.length, 49);
});

test("2023 Paper 1 Q1 follows tracker IDs and uses the standard study screen", () => {
  const paperId = "lc-hl-2023-normal-p1";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.equal(book.parts.length, 52);
  assert.deepEqual(paper.questions.slice(0, 3).map((question) => question.id), book.parts.slice(0, 3).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const code of ["1a", "1b", "1c"]) {
    assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-${code}`).screen, "question");
    assert.ok(part(code).solution);
  }
  assert.equal(checkAnswer("2, -16/3", part("1a").answerCheck), "correct");
  assert.equal(checkAnswer("-16/3, 2", part("1a").answerCheck), "correct");
  assert.equal(checkAnswer("2, 16/3", part("1a").answerCheck), "incorrect");
  assert.ok(part("1b").selfCheck);
  assert.ok(part("1c").selfCheck);
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-2a`).screen, "question");
});

test("2023 Paper 1 Q2 and Q3 follow the printed parts and keep graph work ungraded", () => {
  const paperId = "lc-hl-2023-normal-p1";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 11).map((question) => question.id), book.parts.slice(0, 11).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const code of ["2a", "2b", "2ci", "2cii", "3a", "3b", "3ci", "3cii"]) {
    assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-${code}`).screen, "question");
    assert.ok(part(code).solution);
  }
  assert.equal(checkAnswer("-6, 8", part("2a").answerCheck), "correct");
  assert.equal(checkAnswer("8, -6", part("2a").answerCheck), "incorrect");
  assert.equal(checkAnswer("2", part("2b").answerCheck), "correct");
  assert.equal(checkAnswer("3", part("2b").answerCheck), "incorrect");
  assert.equal(part("2ci").illustration, "graph-down-2023");
  assert.equal(part("2cii").illustration, "graph-left-2023");
  assert.ok(part("2ci").selfCheck && !part("2ci").answerCheck);
  assert.ok(part("2cii").selfCheck && !part("2cii").answerCheck);
  for (const code of ["3a", "3b", "3ci", "3cii"]) assert.ok(part(code).selfCheck);
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-4a`).screen, "question");
});

test("2023 Paper 1 Q4 and Q5 add complex, derivative and mapping parts", () => {
  const paperId = "lc-hl-2023-normal-p1";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 20).map((question) => question.id), book.parts.slice(0, 20).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const code of ["4a", "4b", "4ci", "4cii", "4ciii", "5a", "5b", "5ci", "5cii"]) {
    assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-${code}`).screen, "question");
    assert.ok(part(code).solution);
  }
  assert.equal(checkAnswer("-5-3i", part("4a").answerCheck), "correct");
  assert.equal(checkAnswer("-5+3i", part("4a").answerCheck), "incorrect");
  assert.equal(part("4ci").illustration, "argand-2023");
  assert.equal(part("4cii").illustration, "argand-pad-2023");
  assert.equal(part("4ciii").illustration, "argand-2023");
  assert.equal(part("5ci").illustration, "function-maps-2023");
  assert.equal(part("5cii").illustration, "function-maps-2023");
  assert.ok(part("4b").selfCheck && !part("4b").answerCheck);
  assert.ok(part("4cii").selfCheck && !part("4cii").answerCheck);
  assert.ok(part("5a").selfCheck && part("5b").selfCheck && part("5cii").selfCheck);
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-6ai`).screen, "question");
});

test("2023 Paper 1 Q6 and Q7 check values and show both printed diagrams", () => {
  const paperId = "lc-hl-2023-normal-p1";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 30).map((question) => question.id), book.parts.slice(0, 30).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["6ai", "-2, 3", "2, 3"],
    ["6aii", "33/2", "15.5"],
    ["7a", "109", "110"],
    ["7b", "3", "-3"],
    ["7c", "1.42", "4.58"],
    ["7d", "112.33", "112.32"],
    ["7f", "6", "10"],
    ["7g", "15", "12"],
  ]) {
    assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-${code}`).screen, "question");
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.equal(part("6aii").illustration, "between-curves-2023");
  assert.equal(part("7e").illustration, "curvature-choices-2023");
  assert.ok(part("6b").selfCheck && !part("6b").answerCheck);
  assert.ok(part("7e").selfCheck && !part("7e").answerCheck);
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-8a`).screen, "question");
});

test("2023 Paper 1 Q8 checks finance and expected-value answers", () => {
  const paperId = "lc-hl-2023-normal-p1";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 38).map((question) => question.id), book.parts.slice(0, 38).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["8a", "3377.70", "3377.69"],
    ["8bii", "3469.45", "3469.44"],
    ["8c", "0.59%", "0.60%"],
    ["8dii", "326.60", "326.61"],
    ["8e", "18.50", "17.50"],
    ["8f", "22%", "21%"],
  ]) {
    assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-${code}`).screen, "question");
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.equal(checkAnswer("0.59", part("8c").answerCheck), "correct");
  assert.equal(checkAnswer("22", part("8f").answerCheck), "correct");
  assert.equal(checkAnswer("0.0059", part("8c").answerCheck), "incorrect");
  assert.equal(checkAnswer("0.22", part("8f").answerCheck), "incorrect");
  assert.ok(part("8bi").selfCheck && !part("8bi").answerCheck);
  assert.ok(part("8di").selfCheck && !part("8di").answerCheck);
  assert.equal(part("8e").illustration, "ticket-prices-2023");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-9ai`).screen, "question");
});

test("2023 Paper 1 Q9 includes factor conventions and ungraded graph work", () => {
  const paperId = "lc-hl-2023-normal-p1";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 46).map((question) => question.id), book.parts.slice(0, 46).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const code of ["9ai", "9aii", "9aiii", "9bi", "9bii", "9biii", "9ci", "9cii"]) {
    assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-${code}`).screen, "question");
    assert.ok(part(code).solution);
  }
  for (const answer of ["8", "16"]) assert.equal(checkAnswer(answer, part("9aii").answerCheck), "correct");
  assert.equal(checkAnswer("9", part("9aii").answerCheck), "incorrect");
  for (const answer of ["143", "286"]) assert.equal(checkAnswer(answer, part("9aiii").answerCheck), "correct");
  assert.equal(checkAnswer("144", part("9aiii").answerCheck), "incorrect");
  assert.equal(checkAnswer("24", part("9cii").answerCheck), "correct");
  assert.equal(checkAnswer("48", part("9cii").answerCheck), "incorrect");
  assert.ok(part("9ai").selfCheck && !part("9ai").answerCheck);
  assert.equal(part("9bi").illustration, "factor-pairs-table-2023");
  assert.equal(part("9bii").illustration, "factor-points-2023");
  assert.equal(part("9biii").illustration, "factor-curve-2023");
  assert.ok(part("9bii").selfCheck && part("9biii").selfCheck && !part("9biii").answerCheck);
  assert.equal(part("9cii").illustration, "tangent-triangle-2023");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-10a`).screen, "question");
});

test("2023 Paper 1 Q10 completes the paper with an ungraded cover pad and pyramid derivations", () => {
  const paperId = "lc-hl-2023-normal-p1";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.equal(paper.questions.length, 52);
  assert.deepEqual(paper.questions.map((question) => question.id), book.parts.map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const code of ["10a", "10b", "10c", "10d", "10ei", "10eii"]) {
    assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-${code}`).screen, "question");
    assert.ok(part(code).solution);
  }
  assert.equal(part("10a").illustration, "rectangle-cover-pad-2023");
  assert.ok(part("10a").selfCheck && !part("10a").answerCheck);
  assert.equal(part("10b").illustration, "rectangle-cover-2023");
  assert.ok(part("10b").selfCheck && part("10c").selfCheck);
  assert.equal(checkAnswer("21", part("10d").answerCheck), "correct");
  assert.equal(checkAnswer("20", part("10d").answerCheck), "incorrect");
  for (const code of ["10ei", "10eii"]) {
    assert.equal(part(code).illustration, "pyramid-section-2023");
    assert.ok(part(code).selfCheck && !part(code).answerCheck);
  }
});

test("2023 Paper 2 Q1 uses tracker parts and checks the three spinner probabilities", () => {
  const paperId = "lc-hl-2023-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.equal(book.parts.length, 44);
  assert.deepEqual(paper.questions.slice(0, 3).map((question) => question.id), book.parts.slice(0, 3).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, answer, incorrect] of [
    ["1a", "0.0434", "0.0435"],
    ["1b", "0.0779", "0.0780"],
    ["1c", "0.9375", "0.0625"],
  ]) {
    assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-${code}`).screen, "question");
    assert.equal(part(code).illustration, "spinner-2023");
    assert.ok(part(code).solution);
    assert.equal(checkAnswer(answer, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-2a`).screen, "question");
});

test("2023 Paper 2 Q2 and Q3 have checked numerical answers and guided proof parts", () => {
  const paperId = "lc-hl-2023-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 9).map((question) => question.id), book.parts.slice(0, 9).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const code of ["2a", "2b", "2c", "3a", "3bi", "3bii"]) {
    assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-${code}`).screen, "question");
    assert.ok(part(code).solution);
  }
  for (const code of ["2a", "2b", "3bi"]) assert.ok(part(code).selfCheck && !part(code).answerCheck);
  assert.equal(checkAnswer("0, 60, 180, 300, 360", part("2c").answerCheck), "correct");
  assert.equal(checkAnswer("60, 180, 300", part("2c").answerCheck), "unreadable");
  assert.equal(checkAnswer("0, 60, 180, 270, 360", part("2c").answerCheck), "incorrect");
  assert.equal(checkAnswer("63/2", part("3a").answerCheck), "correct");
  assert.equal(checkAnswer("63", part("3a").answerCheck), "incorrect");
  assert.equal(checkAnswer("6, 2", part("3bii").answerCheck), "correct");
  assert.equal(checkAnswer("2, 6", part("3bii").answerCheck), "incorrect");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-4ai`).screen, "question");
});

test("2023 Paper 2 Q4 and Q5 use source diagrams and check statistics and cuboid counts", () => {
  const paperId = "lc-hl-2023-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 16).map((question) => question.id), book.parts.slice(0, 16).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const code of ["4ai", "4aii", "4b", "5ai", "5aii", "5aiii", "5b"]) {
    assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-${code}`).screen, "question");
    assert.ok(part(code).solution);
  }
  for (const code of ["4ai", "4aii", "4b", "5aiii"]) assert.ok(part(code).selfCheck && !part(code).answerCheck);
  assert.equal(part("4b").illustration, "circle-points-2023");
  for (const code of ["5ai", "5aii", "5aiii"]) assert.equal(part(code).illustration, "cube-trials-2023");
  assert.equal(part("5b").illustration, "cuboid-2023");
  assert.deepEqual(book.parts.find((item) => item.id === `${paperId}-5b`).topicIds, ["p2-geometry"]);
  assert.equal(part("5b").topic, "Geometry, area and volume");
  assert.equal(checkAnswer("2.4, 1.6", part("5ai").answerCheck), "correct");
  assert.equal(checkAnswer("2.4, 1.7", part("5ai").answerCheck), "incorrect");
  assert.equal(checkAnswer("-0.762", part("5aii").answerCheck), "correct");
  assert.equal(checkAnswer("-0.761", part("5aii").answerCheck), "incorrect");
  assert.equal(checkAnswer("8, 24, 6", part("5b").answerCheck), "correct");
  assert.equal(checkAnswer("8, 22, 6", part("5b").answerCheck), "incorrect");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-6a`).screen, "question");
});

test("2023 Paper 2 Q6 and Q7 keep proof and model work guided while checking final values", () => {
  const paperId = "lc-hl-2023-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 26).map((question) => question.id), book.parts.slice(0, 26).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const code of ["6a", "6bi", "6bii", "7a", "7b", "7c", "7d", "7ei", "7eii", "7f"]) {
    assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-${code}`).screen, "question");
    assert.ok(part(code).solution);
  }
  for (const code of ["6a", "6bi", "7d", "7f"]) assert.ok(part(code).selfCheck && !part(code).answerCheck);
  assert.equal(part("6bi").illustration, "rectangle-angles-2023");
  assert.equal(part("7a").illustration, "road-gradient-2023");
  assert.equal(part("7b").illustration, "hill-height-2023");
  for (const code of ["7c", "7d", "7ei", "7eii", "7f"]) assert.equal(part(code).illustration, "breathing-2023-graph");
  for (const [code, correct, incorrect] of [
    ["6bii", "66", "65"],
    ["7a", "13%", "12%"],
    ["7b", "70", "69"],
    ["7c", "1.6, 2.4", "2.4, 1.6"],
    ["7ei", "1.717", "1.718"],
    ["7eii", "0.444", "0.445"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-8a`).screen, "question");
});

test("2023 Paper 2 Q8 checks statistics and conditional probability while the tree stays ungraded", () => {
  const paperId = "lc-hl-2023-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 32).map((question) => question.id), book.parts.slice(0, 32).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const code of ["8a", "8bi", "8bii", "8c", "8di", "8dii"]) {
    assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-${code}`).screen, "question");
    assert.ok(part(code).solution);
  }
  assert.equal(part("8a").illustration, "word-score-normal-2023");
  for (const answer of ["0.1515", "0.1520"]) assert.equal(checkAnswer(answer, part("8a").answerCheck), "correct");
  assert.equal(checkAnswer("0.1530", part("8a").answerCheck), "incorrect");
  assert.equal(checkAnswer("3.6518, 3.8282", part("8bi").answerCheck), "correct");
  assert.equal(checkAnswer("3.8282, 3.6518", part("8bi").answerCheck), "incorrect");
  assert.equal(checkAnswer("121", part("8c").answerCheck), "correct");
  assert.equal(checkAnswer("120", part("8c").answerCheck), "incorrect");
  assert.ok(part("8bii").selfCheck && !part("8bii").answerCheck);
  assert.equal(part("8di").illustration, "word-game-tree-pad-2023");
  assert.ok(part("8di").selfCheck && !part("8di").answerCheck);
  assert.equal(part("8dii").illustration, "word-game-tree-complete-2023");
  assert.equal(checkAnswer("745/5929", part("8dii").answerCheck), "correct");
  assert.equal(checkAnswer("0.1257", part("8dii").answerCheck), "correct");
  assert.equal(checkAnswer("0.126", part("8dii").answerCheck), "incorrect");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-9ai`).screen, "question");
});

test("2023 Paper 2 Q9 follows the six tracker parts and uses checked or guided answers", () => {
  const paperId = "lc-hl-2023-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.equal(book.parts.length, 44);
  assert.deepEqual(paper.questions.slice(0, 38).map((question) => question.id), book.parts.slice(0, 38).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const code of ["9ai", "9aii", "9bi", "9bii", "9ci", "9cii"]) {
    assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-${code}`).screen, "question");
    assert.ok(part(code).solution);
  }
  for (const [code, correct, incorrect] of [
    ["9ai", "11.8", "11.9"],
    ["9aii", "7.3", "7.4"],
    ["9bii", "35.41", "35.40"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  for (const code of ["9bi", "9ci", "9cii"]) {
    assert.ok(part(code).selfCheck && !part(code).answerCheck);
  }
  assert.equal(part("9ai").illustration, "square-hex-tiles-2023");
  assert.equal(part("9bi").illustration, "arrowhead-tile-2023");
  assert.equal(part("9cii").illustration, "unit-circle-pair-2023");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-10ai`).screen, "question");
});

test("2023 Paper 2 Q10 completes all tracker parts with geometry and PIN questions", () => {
  const paperId = "lc-hl-2023-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.equal(paper.questions.length, 44);
  assert.deepEqual(paper.questions.map((question) => question.id), book.parts.map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const code of ["10ai", "10aii", "10aiii", "10bi", "10bii", "10biii"]) {
    assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-${code}`).screen, "question");
    assert.ok(part(code).solution);
  }
  for (const [code, correct, incorrect] of [
    ["10aii", "1300.6", "1300.5"],
    ["10bi", "3024", "3025"],
    ["10bii", "1344", "1343"],
    ["10biii", "42", "43"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  for (const code of ["10ai", "10aiii"]) assert.ok(part(code).selfCheck && !part(code).answerCheck);
  for (const code of ["10ai", "10aii", "10aiii"]) assert.equal(part(code).illustration, "basin-2023");
});

test("2024 Paper 2 Q1 uses the tracker catalogue and reviewed onscreen questions", () => {
  const paperId = "lc-hl-2024-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.equal(book.parts.length, 46);
  assert.deepEqual(paper.questions.slice(0, 5).map((question) => question.id), book.parts.slice(0, 5).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["1ai", "4", "3"],
    ["1aii", "0, 9", "9, 0"],
    ["1aiii", "2", "3"],
    ["1c", "0.9145", "0.9144"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.equal(part("1ai").illustration, "swim-stem-leaf-2024");
  assert.equal(part("1b").illustration, "swim-retest-2024");
  assert.ok(part("1b").selfCheck);
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-1ai`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-1c`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-2a`).screen, "question");
});

test("2024 Paper 2 Q2 has reviewed probability checks and explanation prompt", () => {
  const paperId = "lc-hl-2024-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 9).map((question) => question.id), book.parts.slice(0, 9).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["2a", "40", "30"],
    ["2b", "0, 0.5", "0.5, 0"],
    ["2c", "0.3", "0.5"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.equal(part("2a").illustration, "prize-table-2024");
  assert.ok(part("2d").selfCheck);
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-2a`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-2d`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-3a`).screen, "question");
});

test("2024 Paper 2 Q3 checks area and all trigonometric solutions", () => {
  const paperId = "lc-hl-2024-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 12).map((question) => question.id), book.parts.slice(0, 12).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["3a", "122", "123"],
    ["3b", "345, 15, 195, 165", "15, 165"],
    ["3c", "133, 47", "47"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.notEqual(checkAnswer(incorrect, part(code).answerCheck), "correct", code);
  }
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-3c`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-4a`).screen, "question");
});

test("2024 Paper 2 Q4 and Q5 keep constructions guided and check circle results", () => {
  const paperId = "lc-hl-2024-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 17).map((question) => question.id), book.parts.slice(0, 17).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  assert.equal(part("4a").illustration, "centroid-pad-2024");
  assert.equal(part("4b").illustration, "parallel-transversals-2024");
  assert.equal(part("5aii").illustration, "nested-circles-2024");
  assert.equal(part("5b").illustration, "circle-locus-2024");
  for (const code of ["4a", "4b", "5aii"]) assert.ok(part(code).selfCheck);
  for (const [code, correct, incorrect] of [
    ["5ai", "(-2, 3); 2√2", "(2, 3); 2√2"],
    ["5b", "(x-9)^2+(y-31/4)^2=145/16", "(x-9)^2+(y-31/4)^2=146/16"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.equal(checkAnswer("(x-9)²+(y-7.75)²=9.0625", part("5b").answerCheck), "correct");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-5b`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-6a`).screen, "question");
});

test("2024 Paper 2 Q6 checks coordinates, distance and consistent pair counting", () => {
  const paperId = "lc-hl-2024-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 21).map((question) => question.id), book.parts.slice(0, 21).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["6a", "(21, 5)", "(20, 5)"],
    ["6b", "7/5", "6/5"],
    ["6ci", "120", "119"],
    ["6cii", "1/5", "1/4"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.equal(checkAnswer("240", part("6ci").answerCheck), "correct");
  assert.equal(part("6ci").illustration, "lattice-points-2024");
  assert.equal(part("6cii").illustration, "lattice-points-2024");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-6cii`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-7ai`).screen, "question");
});

test("2024 Paper 2 Q7 accepts reviewed rounding and keeps the hypothesis test guided", () => {
  const paperId = "lc-hl-2024-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 27).map((question) => question.id), book.parts.slice(0, 27).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["7ai", "0.5674", "0.5673"],
    ["7aii", "62", "61"],
    ["7bi", "0.24576", "0.2457"],
    ["7bii", "24", "25"],
    ["7c", "59%", "60%"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  for (const result of ["0.5675", "0.56742", "56.75%"]) assert.equal(checkAnswer(result, part("7ai").answerCheck), "correct");
  for (const result of ["0.2458", "0.246"]) assert.equal(checkAnswer(result, part("7bi").answerCheck), "correct");
  assert.ok(part("7d").selfCheck);
  assert.equal(part("7c").illustration, "hotel-booking-tree-2024");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-7d`).screen, "question");
});

test("2024 Paper 2 Q8 checks dimensions and volume while proofs stay guided", () => {
  const paperId = "lc-hl-2024-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 33).map((question) => question.id), book.parts.slice(0, 33).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  assert.equal(checkAnswer("31.4, 15", part("8a").answerCheck), "correct");
  assert.equal(checkAnswer("31.5, 15", part("8a").answerCheck), "incorrect");
  assert.equal(checkAnswer("8240.2", part("8b").answerCheck), "correct");
  assert.equal(checkAnswer("8240.3", part("8b").answerCheck), "incorrect");
  for (const code of ["8ci", "8cii", "8ciii", "8civ"]) {
    assert.equal(part(code).illustration, "double-cone-sphere-2024");
    assert.ok(part(code).selfCheck);
  }
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-8civ`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-9ai`).screen, "question");
});

test("2024 Paper 2 Q9 checks circle, surd, distance and decimal coordinates", () => {
  const paperId = "lc-hl-2024-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.deepEqual(paper.questions.slice(0, 39).map((question) => question.id), book.parts.slice(0, 39).map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["9ai", "(x-1)^2+(y-17)^2=144", "(x-1)^2+(y-17)^2=12"],
    ["9aii", "1+√63", "1-√63"],
    ["9aiii", "221", "222"],
    ["9b", "x = 13", "x = -11"],
    ["9c", "(11.7, 0.9)", "(11.7, 1.9)"],
    ["9d", "(20.4, 3.8)", "(20.4, 3.7)"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.equal(checkAnswer("1+3√7", part("9aii").answerCheck), "correct");
  assert.equal(checkAnswer("8.9372539", part("9aii").answerCheck), "unreadable");
  for (const code of ["9ai", "9aii", "9aiii", "9b", "9c", "9d"]) assert.equal(part(code).illustration, "adventure-course-2024");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-9d`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-10ai`).screen, "question");
});

test("2024 Paper 2 Q10 completes all 46 parts with checked wiper and pattern answers", () => {
  const paperId = "lc-hl-2024-normal-p2";
  const book = findBookPaper(paperId);
  const paper = findRealPaper(paperId);
  assert.equal(book.parts.length, 46);
  assert.deepEqual(paper.questions.map((question) => question.id), book.parts.map((part) => part.id));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["10ai", "120", "100"],
    ["10aii", "41.4", "41.5"],
    ["10aiii", "11439", "11438"],
    ["10b", "113.4", "113.5"],
    ["10ci", "243", "242"],
    ["10cii", "54", "55"],
    ["10ciii", "48", "49"],
  ]) {
    assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-${code}`).screen, "question");
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.equal(checkAnswer("11437", part("10aiii").answerCheck), "correct");
  for (const code of ["10ai", "10aii", "10aiii"]) assert.equal(part(code).illustration, "wiper-original-2024");
  assert.equal(part("10b").illustration, "wiper-adjusted-2024");
});

test("2024 Paper 1 has all 46 parts reviewed onscreen", () => {
  const paperId = "lc-hl-2024-normal-p1";
  const book = findBookPaper(paperId);
  const ready = findRealPaper(paperId);
  assert.equal(book.parts.length, 46);
  assert.deepEqual(ready.questions.map((question) => question.id), book.parts.map((part) => part.id));
  for (const [code, correct, incorrect] of [
    ["1a", "8", "1"],
    ["1c", "51, 46, -40", "51, 46, 40"],
  ]) {
    const part = ready.questions.find((question) => question.id.endsWith(`-${code}`));
    assert.equal(checkAnswer(correct, part.answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part.answerCheck), "incorrect", code);
  }
  assert.ok(ready.questions.find((question) => question.id.endsWith("-1b")).selfCheck);
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-1a`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-2a`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-3c`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-4a`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-5cii`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-6a`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-7ciii`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-8ai`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-8e`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-9a`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-9e`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-10ai`).screen, "question");
  assert.equal(parseRoutePath(`/book/${paperId}/parts/${paperId}-10d`).screen, "question");
});

test("2024 Paper 1 Q10 checks values and derivative while pricing reasoning stays guided", () => {
  const paper = findRealPaper("lc-hl-2024-normal-p1");
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["10ai", "263", "264"],
    ["10aii", "0.667+3x-0.075x^2", "0.667+3x-0.025x^2"],
    ["10b", "14 ≤ x ≤ 21", "13 ≤ x ≤ 21"],
    ["10ci", "2/3", "1/3"],
    ["10cii", "-2, 0", "2, 0"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.equal(checkAnswer("-0.075x²+3x+0.667", part("10aii").answerCheck), "correct");
  assert.equal(part("10ci").illustration, "plant-logo-2024");
  assert.equal(part("10cii").illustration, "plant-logo-2024");
  assert.ok(part("10d").selfCheck);
});

test("2024 Paper 1 Q9 exact and rounded answers, with guided proof parts", () => {
  const paper = findRealPaper("lc-hl-2024-normal-p1");
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["9a", "560π/3", "560π"],
    ["9bii", "6", "18"],
    ["9c", "22.5", "22.6"],
    ["9d", "1.4", "1.5"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.equal(part("9a").illustration, "sphere-cap-2024");
  assert.ok(part("9bi").selfCheck);
  assert.ok(part("9e").selfCheck);
});

test("2024 Paper 1 Q8 values check and drawing and reasoning remain guided", () => {
  const paper = findRealPaper("lc-hl-2024-normal-p1");
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["8ai", "6, 62, 69, 70, 71", "6, 62, 69, 70, 72"],
    ["8b", "40, 2", "2, 40"],
    ["8c", "80", "81"],
    ["8e", "5", "6"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.equal(part("8aii").illustration, "tshirt-graph-2024");
  assert.ok(part("8aii").selfCheck);
  assert.equal(part("8d").illustration, "scarf-choices-2024");
  assert.ok(part("8d").selfCheck);
});

test("2024 Paper 1 Q6 and Q7 checks preserve requested forms and values", () => {
  const paper = findRealPaper("lc-hl-2024-normal-p1");
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["6a", "-1", "1"],
    ["6bi", "4.9 × 10^4", "4.8 × 10^4"],
    ["6bii", "e^7", "e^3.5"],
    ["6biii", "9x/2", "9x"],
    ["7a", "42175", "40400"],
    ["7bii", "334563", "334562"],
    ["7ci", "230", "231"],
    ["7cii", "5535", "5534"],
    ["7ciii", "4.08", "4.00"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.equal(checkAnswer("4.5x", part("6biii").answerCheck), "correct");
  assert.equal(checkAnswer("exp(7)", part("6bii").answerCheck), "correct");
  assert.ok(part("7bi").selfCheck);
});

test("2024 Paper 1 Q4 and Q5 final checks and method prompts", () => {
  const paper = findRealPaper("lc-hl-2024-normal-p1");
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["4b", "-238/361", "238/361"],
    ["5a", "7", "6"],
    ["5b", "1/2, -1/2", "1/2"],
    ["5cii", "2025", "2024"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.notEqual(checkAnswer(incorrect, part(code).answerCheck), "correct", code);
  }
  for (const code of ["4a", "4c", "5ci"]) assert.ok(part(code).selfCheck);
  assert.match(part("4a").solution, /first-principles steps are essential/i);
});

test("2024 Paper 1 Q2 and Q3 checks accept exact and equivalent forms", () => {
  const paper = findRealPaper("lc-hl-2024-normal-p1");
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["2a", "-6-15i; -6+15i", "-6-15i; -6+14i"],
    ["2b", "-512+0i", "512+0i"],
    ["2ci", "3.464+2i", "3.4+2i"],
    ["2cii", "7π/12", "5π/12"],
    ["3bi", "y+21=-7(x-2)", "y+21=-6(x-2)"],
    ["3bii", "3/2", "2"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.equal(checkAnswer("y=-7x-7", part("3bi").answerCheck), "correct");
  assert.ok(part("3a").selfCheck);
  assert.ok(part("3c").selfCheck);
  assert.equal(part("2ci").illustration, "argand-2024");
  assert.equal(part("3c").illustration, "tangent-graph-2024");
});

test("Paper 2 reviewed and companion parts route correctly", () => {
  assert.deepEqual(parseRoutePath("/book/lc-hl-2025-normal-p2/parts/lc-hl-2025-normal-p2-1a"), {
    screen: "question", paperId: "lc-hl-2025-normal-p2", questionId: "lc-hl-2025-normal-p2-1a",
  });
  assert.deepEqual(parseRoutePath("/book/lc-hl-2025-normal-p2/parts/lc-hl-2025-normal-p2-2a"), {
    screen: "book", paperId: "lc-hl-2025-normal-p2", partId: "lc-hl-2025-normal-p2-2a",
  });
  for (const partId of ["lc-hl-2025-normal-p2-2ai", "lc-hl-2025-normal-p2-3b", "lc-hl-2025-normal-p2-4ai", "lc-hl-2025-normal-p2-5bii", "lc-hl-2025-normal-p2-6c", "lc-hl-2025-normal-p2-7cv", "lc-hl-2025-normal-p2-8ai", "lc-hl-2025-normal-p2-8aiii", "lc-hl-2025-normal-p2-8cii", "lc-hl-2025-normal-p2-9ai", "lc-hl-2025-normal-p2-9d", "lc-hl-2025-normal-p2-10ai", "lc-hl-2025-normal-p2-10e"]) {
    assert.deepEqual(parseRoutePath(`/book/lc-hl-2025-normal-p2/parts/${partId}`), {
      screen: "question", paperId: "lc-hl-2025-normal-p2", questionId: partId,
    });
  }
});

test("Paper 2 Q10 completes the reviewed paper with checked values and guided reasoning", () => {
  const paper = findRealPaper("lc-hl-2025-normal-p2");
  const book = findBookPaper("lc-hl-2025-normal-p2");
  assert.deepEqual(paper.questions.map((question) => question.id), book.parts.map((part) => part.id));
  assert.ok(paper.questions.every((question) => question.prompt && question.answer && question.solution && (question.answerCheck || question.selfCheck)));
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["10ai", "280, 340, 400, 460", "280, 340, 400, 520"],
    ["10aii", "0.37", "0.36"],
    ["10b", "384.2, 389.8", "384.2, 389.7"],
    ["10ci", "2.22", "2.21"],
    ["10e", "1.89", "1.88"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  for (const code of ["10cii", "10d"]) assert.ok(part(code).selfCheck);
});

test("Paper 2 Q9 tree and counting checks match the official alternatives", () => {
  const paper = findRealPaper("lc-hl-2025-normal-p2");
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["9ai", "0.933, 0.99, 0.01, 0.922", "0.933, 0.99, 0.01, 0.912"],
    ["9aii", "0.0007, 0.0728, 0.8602", "0.0007, 0.0728, 0.8603"],
    ["9aiii", "0.1391", "0.1392"],
    ["9b", "0.0392", "0.0391"],
    ["9ci", "184756", "184755"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  for (const value of ["0.4766", "0.4768"]) assert.equal(checkAnswer(value, part("9aiv").answerCheck), "correct");
  assert.equal(checkAnswer("0.4767", part("9aiv").answerCheck), "incorrect");
  for (const value of ["3628800", "670442572800"]) assert.equal(checkAnswer(value, part("9cii").answerCheck), "correct");
  assert.equal(checkAnswer("670442572801", part("9cii").answerCheck), "incorrect");
  for (const value of ["8.173 × 10^10", "8.173e10", "6.011 × 10^16"]) assert.equal(checkAnswer(value, part("9d").answerCheck), "correct");
  assert.equal(checkAnswer("8.174 × 10^10", part("9d").answerCheck), "incorrect");
  assert.equal(checkAnswer("81729648000", part("9d").answerCheck), "unreadable");
});

test("Paper 2 Q8 numeric checks and construction self-check are configured", () => {
  const paper = findRealPaper("lc-hl-2025-normal-p2");
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  for (const [code, correct, incorrect] of [
    ["8aii", "127", "126"],
    ["8b", "5.3", "5.2"],
    ["8ci", "25.5", "25.4"],
    ["8cii", "10.8", "9.6"],
  ]) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  assert.ok(part("8ai").selfCheck);
  assert.equal(part("8aiii").illustration, "pyramid-net");
  assert.ok(part("8aiii").selfCheck);
});

test("Paper 2 Q6 and Q7 checks accept verified results and reject nearby values", () => {
  const paper = findRealPaper("lc-hl-2025-normal-p2");
  const part = (code) => paper.questions.find((question) => question.id.endsWith(`-${code}`));
  const examples = [
    ["6a", "510, 150, 30, -210, 390, -330", "510, 150, 30, -210, 390, -320"],
    ["7ai", "1, 10, 3", "1, 9, 3"],
    ["7aii", "6.4, 64.3, 19.3", "6.4, 64.2, 19.3"],
    ["7b", "74.4", "74.3"],
    ["7ciii", "39", "30"],
    ["7civ", "26", "25"],
    ["7cv", "3.85", "3.86"],
  ];
  for (const [code, correct, incorrect] of examples) {
    assert.equal(checkAnswer(correct, part(code).answerCheck), "correct", code);
    assert.equal(checkAnswer(incorrect, part(code).answerCheck), "incorrect", code);
  }
  for (const code of ["6b", "6c", "7ci", "7cii"]) {
    assert.ok(part(code).selfCheck, `${code} has guided checks`);
  }
});
