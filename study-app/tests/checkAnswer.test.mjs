import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../src/utils/checkAnswer.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { checkAnswer } = await import(`data:text/javascript,${encodeURIComponent(compiled)}`);
const inverseSource = await readFile(new URL("../src/utils/inverseGraph.ts", import.meta.url), "utf8");
const inverseCompiled = ts.transpileModule(inverseSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { isInversePath } = await import(`data:text/javascript,${encodeURIComponent(inverseCompiled)}`);

test("complex answers allow the implicit coefficient in plus or minus i", () => {
  const negative = { kind: "complex-pair", real: 1, imaginary: -1 };
  const positive = { kind: "complex-pair", real: 1, imaginary: 1 };
  for (const answer of ["1-i", "1-1i", "r = 1 − i"]) assert.equal(checkAnswer(answer, negative), "correct");
  for (const answer of ["1+i", "1+1i", "r = 1 + i"]) assert.equal(checkAnswer(answer, positive), "correct");
  assert.equal(checkAnswer("1+i", negative), "incorrect");
  assert.equal(checkAnswer("1-i", positive), "incorrect");
  for (const answer of ["1--i", "1+-i", "1-ii"]) assert.equal(checkAnswer(answer, negative), "unreadable");
});

test("2025 Q1(a): closed interval formats and boundaries", () => {
  const config = { kind: "interval", minimum: -9, maximum: 15 };
  for (const answer of ["-9 ≤ x ≤ 15", "-9 <= x <= 15", "[-9,15]", "x ∈ [-9, 15]"]) {
    assert.equal(checkAnswer(answer, config), "correct", answer);
  }
  assert.equal(checkAnswer("[-9,14]", config), "incorrect");
  assert.equal(checkAnswer("-9 < x < 15", config), "incorrect");
});

test("2025 Q1(b): simplified radical expression, including reordered terms", () => {
  const config = { kind: "radical-polynomial", quadratic: 8, linear: -78, radical: 70 };
  for (const answer of ["8x² - 78x + 70√x", "70sqrt(x)+8x^2-78x", "-78x+70√x+8x²"]) {
    assert.equal(checkAnswer(answer, config), "correct", answer);
  }
  assert.equal(checkAnswer("8x² - 78x + 69√x", config), "incorrect");
  assert.equal(checkAnswer("(4x-10√x)(2x+5√x-7)", config), "unreadable");
});

test("2025 Q1(c): three roots in any order", () => {
  const config = { kind: "number-set", expected: [-1.5, 2, 2.5] };
  assert.equal(checkAnswer("x=-3/2, x=2, x=5/2", config), "correct");
  assert.equal(checkAnswer("2.5 or -1.5 or 2", config), "correct");
  assert.equal(checkAnswer("x=-3/2, x=2, x=3", config), "incorrect");
});

test("2025 Q2(a)(i): derivative in reviewed cosine forms", () => {
  const config = { kind: "linear-cos", linear: 2, cosine: 4, frequency: 4 };
  assert.equal(checkAnswer("2x + 4cos(4x)", config), "correct");
  assert.equal(checkAnswer("f′(x) = 4cos(4x) + 2x", config), "correct");
  assert.equal(checkAnswer("2x + cos(4x)", config), "incorrect");
  assert.equal(checkAnswer("2x + 4cos(2x)", config), "unreadable");
});

test("2025 Q2(a)(ii): equivalent tangent equations", () => {
  const config = { kind: "line-equation", xCoefficient: 4, yCoefficient: -1, constant: 6 };
  for (const answer of ["4x - y + 6 = 0", "y = 4x + 6", "-4x + y - 6 = 0", "8x - 2y + 12 = 0"]) {
    assert.equal(checkAnswer(answer, config), "correct", answer);
  }
  assert.equal(checkAnswer("y = 4x + 5", config), "incorrect");
  assert.equal(checkAnswer("y = 4x² + 6", config), "unreadable");
});

test("2025 Q2(b)(i): open interval excludes corners and endpoints", () => {
  const config = { kind: "interval", minimum: 3, maximum: 4, includeMinimum: false, includeMaximum: false };
  assert.equal(checkAnswer("3 < x < 4", config), "correct");
  assert.equal(checkAnswer("x ∈ (3,4)", config), "correct");
  assert.equal(checkAnswer("3 ≤ x ≤ 4", config), "incorrect");
});

test("2025 Q2(b)(ii): required fraction form", () => {
  const config = { kind: "fraction", expected: 1 / 3 };
  assert.equal(checkAnswer("g(g(3)) = 1/3", config), "correct");
  assert.equal(checkAnswer("2/6", config), "correct");
  assert.equal(checkAnswer("1/2", config), "incorrect");
  assert.equal(checkAnswer("0.333333", config), "unreadable");
});

test("2025 Q2(b)(iii): inverse vertices and segment order", () => {
  const correct = [{ x: 0, y: 0 }, { x: 1, y: 3 }, { x: 4, y: 4 }];
  assert.equal(isInversePath(correct), true);
  assert.equal(isInversePath([...correct].reverse()), true);
  assert.equal(isInversePath([{ x: 0, y: 0 }, { x: 3, y: 1 }, { x: 4, y: 4 }]), false);
  assert.equal(isInversePath([{ x: 0, y: 0 }, { x: 4, y: 4 }, { x: 1, y: 3 }]), false);
  assert.equal(isInversePath([{ x: 0, y: 0 }, { x: 1, y: 3 }]), false);
});

test("2025 Q3(a): simplified and unsimplified chain rule", () => {
  const config = { kind: "power-chain", expectedCoefficient: 420 };
  assert.equal(checkAnswer("420x^4(3x^5-4)^27", config), "correct");
  assert.equal(checkAnswer("420x⁴(3x⁵−4)²⁷", config), "correct");
  assert.equal(checkAnswer("28(3x^5-4)^27(15x^4)", config), "correct");
  assert.equal(checkAnswer("400x^4(3x^5-4)^27", config), "incorrect");
  assert.equal(checkAnswer("differentiate by chain rule", config), "unreadable");
});

test("2025 Q3(c): exact logarithm quotient", () => {
  const config = { kind: "log-quotient", argument: 46, denominator: 5 };
  for (const answer of ["ln(46)/5", "k = ln46/5", "(ln(46))/5", "1/5 ln(46)"]) {
    assert.equal(checkAnswer(answer, config), "correct", answer);
  }
  assert.equal(checkAnswer("ln(45)/5", config), "incorrect");
  assert.equal(checkAnswer("0.765", config), "unreadable");
});

test("2025 Q4(a): complex quotient in a + bi form", () => {
  const config = { kind: "complex-pair", real: -7 / 41, imaginary: 22 / 41, tolerance: 0.0001 };
  assert.equal(checkAnswer("-7/41 + (22/41)i", config), "correct");
  assert.equal(checkAnswer("-0.17073 + 0.53659i", config), "correct");
  assert.equal(checkAnswer("-7/41 - (22/41)i", config), "incorrect");
  assert.equal(checkAnswer("(-7+22i)/41", config), "unreadable");
});

test("2025 Q5(a): completed square", () => {
  const config = { kind: "vertex-form", a: 5, h: 2, k: -32 };
  assert.equal(checkAnswer("g(x) = 5(x+2)^2-32", config), "correct");
  assert.equal(checkAnswer("5(x+2)²−32", config), "correct");
  assert.equal(checkAnswer("5(x-2)^2-32", config), "incorrect");
  assert.equal(checkAnswer("5x²+20x-12", config), "unreadable");
});

test("2025 Q5(b): log-law expression", () => {
  const config = { kind: "constant-log", constant: 15, logCoefficient: 5 };
  assert.equal(checkAnswer("15 + 5ln(p)", config), "correct");
  assert.equal(checkAnswer("5ln p + 15", config), "correct");
  assert.equal(checkAnswer("15 + 4ln(p)", config), "incorrect");
  assert.equal(checkAnswer("ln[(e^3p)^5]", config), "unreadable");
});

test("2025 Q5(c) and Q6(b)(ii): numeric results", () => {
  assert.equal(checkAnswer("n=91", { kind: "numeric", expected: 91 }), "correct");
  assert.equal(checkAnswer("n=90", { kind: "numeric", expected: 91 }), "incorrect");
  assert.equal(checkAnswer("x=3", { kind: "numeric", expected: 3 }), "correct");
});

test("2025 Q6(a): first three binomial terms", () => {
  const config = { kind: "polynomial-powers", variable: "p", coefficients: { 7: 128, 6: 1344, 5: 6048 } };
  assert.equal(checkAnswer("128p⁷ + 1344p⁶ + 6048p⁵", config), "correct");
  assert.equal(checkAnswer("6048p^5+128p^7+1344p^6", config), "correct");
  assert.equal(checkAnswer("128p^7+1344p^6+6000p^5", config), "incorrect");
  assert.equal(checkAnswer("(2p+3)^7", config), "unreadable");
});

test("2025 Q7(a)(i–iii, v): stage lengths and threshold", () => {
  assert.equal(checkAnswer("A(3) = 28.2", { kind: "numeric", expected: 28.2 }), "correct");
  assert.equal(checkAnswer("A(3) = 22", { kind: "numeric", expected: 28.2 }), "incorrect");
  const sequence = { kind: "linear-sequence", slope: 6.2, intercept: 9.6 };
  assert.equal(checkAnswer("A(n) = 6.2n + 9.6", sequence), "correct");
  assert.equal(checkAnswer("9.6 + 6.2n", sequence), "correct");
  assert.equal(checkAnswer("6.2n + 15.8", sequence), "incorrect");
  assert.equal(checkAnswer("15.8 + 6.2(n-1)", sequence), "unreadable");
  assert.equal(checkAnswer("629.6", { kind: "numeric", expected: 629.6 }), "correct");
  assert.equal(checkAnswer("k = 17", { kind: "numeric", expected: 17 }), "correct");
});

test("2025 Q7(b)(i): third orbital length", () => {
  const config = { kind: "numeric", expected: 0.5618, tolerance: 0.000001 };
  assert.equal(checkAnswer("O3 = 0.5618", config), "correct");
  assert.equal(checkAnswer("0.561", config), "incorrect");
});

test("2025 Q8(a–d, e)(ii): rounded numeric answers and units", () => {
  const cases = [
    ["665.55", 665.55, "665.54"],
    ["d = 1.168", 1.168, "d = 1.169"],
    ["1", 1, "2"],
    ["82", 82, "83"],
    ["x = 1.155", 1.155, "x = 1.154"],
  ];
  for (const [right, expected, wrong] of cases) {
    const config = { kind: "numeric", expected };
    assert.equal(checkAnswer(right, config), "correct", right);
    assert.equal(checkAnswer(wrong, config), "incorrect", wrong);
  }
  assert.equal(checkAnswer("1 hour 22 minutes", { kind: "numeric", expected: 82 }), "unreadable");
});

test("2025 Q9(a)(ii): derivative as a linear expression in c", () => {
  const config = { kind: "linear-expression", variable: "c", slope: 0.1, intercept: -8.5 };
  assert.equal(checkAnswer("dF/dc = 0.1c - 8.5", config), "correct");
  assert.equal(checkAnswer("-8.5 + 0.1c", config), "correct");
  assert.equal(checkAnswer("0.05c - 8.5", config), "incorrect");
  assert.equal(checkAnswer("derivative is positive", config), "unreadable");
});

test("2025 Q9(a)(iii, v) and (b)(iii): rates and average speed", () => {
  assert.equal(checkAnswer("2.8", { kind: "numeric", expected: 2.8 }), "correct");
  assert.equal(checkAnswer("2.9", { kind: "numeric", expected: 2.8 }), "incorrect");
  const rate = { kind: "numeric", expected: 7.2, tolerance: 0.05 };
  assert.equal(checkAnswer("7.2", rate), "correct");
  assert.equal(checkAnswer("7.2068", rate), "correct");
  assert.equal(checkAnswer("8.2", rate), "incorrect");
  assert.equal(checkAnswer("58.3", { kind: "numeric", expected: 58.3 }), "correct");
});

test("2025 Q9(b)(i): missing speeds in table order", () => {
  const config = { kind: "ordered-values", expected: [3.9, 18.6, 46.6, 59.6] };
  assert.equal(checkAnswer("3.9, 18.6, 46.6, 59.6", config), "correct");
  assert.equal(checkAnswer("3.9;18.6;46.6;59.6", config), "correct");
  assert.equal(checkAnswer("18.6,3.9,46.6,59.6", config), "incorrect");
  assert.equal(checkAnswer("3.9,18.6,46.6", config), "unreadable");
});

test("2025 Q10(b): four extreme coordinates in any order", () => {
  const config = { kind: "coordinate-set", expected: [[2000, 0], [-2000, 0], [0, 2000], [0, -2000]] };
  assert.equal(checkAnswer("(2000,0),(-2000,0),(0,2000),(0,-2000)", config), "correct");
  assert.equal(checkAnswer("{(0,-2000); (0,2000); (-2000,0); (2000,0)}", config), "correct");
  assert.equal(checkAnswer("(2000,0),(-2000,0),(0,2000),(0,2000)", config), "incorrect");
  assert.equal(checkAnswer("(2000,0),(-2000,0),(0,2000)", config), "unreadable");
  assert.equal(checkAnswer("(2000,0),(-2000,0),(0,2000),(0,-2000) extra", config), "unreadable");
});

test("2025 Q10(c), (d)(iii), and (e)(i): numeric answers", () => {
  assert.equal(checkAnswer("n = 8", { kind: "numeric", expected: 8 }), "correct");
  assert.equal(checkAnswer("n = 7", { kind: "numeric", expected: 8 }), "incorrect");
  assert.equal(checkAnswer("Q = 1/4", { kind: "numeric", expected: 0.25 }), "correct");
  assert.equal(checkAnswer("0.5", { kind: "numeric", expected: 0.25 }), "incorrect");
  assert.equal(checkAnswer("H(1) = 4", { kind: "numeric", expected: 4 }), "correct");
});

test("2025 Paper 2 Q1(a–c): values and both line equations", () => {
  assert.equal(checkAnswer("p = -6", { kind: "numeric", expected: -6 }), "correct");
  assert.equal(checkAnswer("40", { kind: "numeric", expected: 40 }), "correct");
  assert.equal(checkAnswer("41", { kind: "numeric", expected: 40 }), "incorrect");
  const lines = { kind: "line-equation-pair", xCoefficient: 2, yCoefficient: 3, constants: [-12, 12] };
  assert.equal(checkAnswer("2x+3y=12; 2x+3y=-12", lines), "correct");
  assert.equal(checkAnswer("3y=-2x-12; 3y=12-2x", lines), "correct");
  assert.equal(checkAnswer("2x+3y=12; 2x+3y=12", lines), "incorrect");
  assert.equal(checkAnswer("2x+3y=12", lines), "unreadable");
});

test("2025 Paper 2 Q2(a): centre, radius, and tangent", () => {
  const circle = { kind: "circle-centre-radius", centreX: 4, centreY: -2, radius: Math.sqrt(45) };
  assert.equal(checkAnswer("(4, -2); 3√5", circle), "correct");
  assert.equal(checkAnswer("(4,-2), sqrt(45)", circle), "correct");
  assert.equal(checkAnswer("(4,-2); 6.7082", circle), "correct");
  assert.equal(checkAnswer("(-4,-2); 3√5", circle), "incorrect");
  assert.equal(checkAnswer("(4,-2); 3√4", circle), "incorrect");
  assert.equal(checkAnswer("4,-2; 3√5", circle), "unreadable");
  const tangent = { kind: "line-equation", xCoefficient: 2, yCoefficient: 1, constant: 9 };
  assert.equal(checkAnswer("y=-2x-9", tangent), "correct");
  assert.equal(checkAnswer("2x+y+9=0", tangent), "correct");
  assert.equal(checkAnswer("y=2x-9", tangent), "incorrect");
});

test("2025 Paper 2 Q2(b) and Q3(b): two k values and simplest fraction", () => {
  const k = { kind: "number-set", expected: [-4, 49] };
  assert.equal(checkAnswer("k=-4 or k=49", k), "correct");
  assert.equal(checkAnswer("49, -4", k), "correct");
  assert.equal(checkAnswer("4, 49", k), "incorrect");
  const probability = { kind: "simplest-fraction", numerator: 67, denominator: 4780 };
  assert.equal(checkAnswer("67/4780", probability), "correct");
  assert.equal(checkAnswer("402/28680", probability), "incorrect");
  assert.equal(checkAnswer("67/4781", probability), "incorrect");
  assert.equal(checkAnswer("0.014", probability), "unreadable");
});

test("2025 Paper 2 Q4 and Q5(b)(ii): statistics and shaded area", () => {
  for (const [right, expected, wrong] of [
    ["x = 17", 17, "x = 16"],
    ["7.5", 7.5, "6.5"],
    ["k = 6", 6, "k = 5"],
    ["14", 14, "12"],
  ]) {
    const config = { kind: "numeric", expected };
    assert.equal(checkAnswer(right, config), "correct", right);
    assert.equal(checkAnswer(wrong, config), "incorrect", wrong);
  }
});

test("original sample checker formats still work", () => {
  assert.equal(checkAnswer("x=3 or x=2", { kind: "number-set", expected: [2, 3] }), "correct");
  assert.equal(checkAnswer("-2", { kind: "numeric", expected: -2 }), "correct");
  assert.equal(checkAnswer("5/14", { kind: "numeric", expected: 5 / 14, tolerance: 0.0005 }), "correct");
  assert.equal(checkAnswer("not a number", { kind: "numeric", expected: -2 }), "unreadable");
});
