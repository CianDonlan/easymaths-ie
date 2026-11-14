import { realPartContent } from "./realQuestionContent";
import bookPaper from "./book2025p1.json";
import type { AnswerCheck, StudyPaper } from "../types";

const paperId = "lc-hl-2025-normal-p1";
const topicNames: Record<string, string> = {
  "p1-algebra": "Algebra",
  "p1-calculus": "Calculus",
  "p1-complex": "Complex numbers",
  "p1-number": "Number and arithmetic",
  "p1-sequences": "Sequences and series",
};
const configs: Record<string, AnswerCheck> = {
  [`${paperId}-1a`]: {
    kind: "interval", minimum: -9, maximum: 15,
    placeholder: "e.g. -9 ≤ x ≤ 15",
    hint: "Enter a closed interval such as -9 ≤ x ≤ 15 or [-9, 15].",
  },
  [`${paperId}-1b`]: {
    kind: "radical-polynomial", quadratic: 8, linear: -78, radical: 70,
    placeholder: "e.g. 8x² - 78x + 70√x",
    hint: "Enter a simplified sum using x² and √x. Reordered terms are fine.",
  },
  [`${paperId}-1c`]: {
    kind: "number-set", expected: [-1.5, 2, 2.5],
    placeholder: "e.g. x = -3/2, x = 2, x = 5/2",
    hint: "Enter all three solutions, separated by commas or ‘or’, in any order.",
  },
  [`${paperId}-2ai`]: {
    kind: "linear-cos", linear: 2, cosine: 4, frequency: 4,
    placeholder: "e.g. 2x + 4cos(4x)",
    hint: "Enter the derivative as a sum using cos(4x). Reordered terms are fine.",
  },
  [`${paperId}-2aii`]: {
    kind: "line-equation", xCoefficient: 4, yCoefficient: -1, constant: 6,
    placeholder: "e.g. 4x - y + 6 = 0",
    hint: "Enter a linear equation in x and y. Equivalent rearrangements are accepted.",
  },
  [`${paperId}-2bi`]: {
    kind: "interval", minimum: 3, maximum: 4, includeMinimum: false, includeMaximum: false,
    placeholder: "e.g. 3 < x < 4",
    hint: "Use an open interval such as 3 < x < 4 or (3, 4).",
  },
  [`${paperId}-2bii`]: {
    kind: "fraction", expected: 1 / 3,
    placeholder: "e.g. 1/3",
    hint: "Give the value as a fraction, as requested on the paper.",
  },
  [`${paperId}-3a`]: {
    kind: "power-chain", expectedCoefficient: 420,
    placeholder: "e.g. 420x^4(3x^5-4)^27",
    hint: "Enter the chain-rule form 28(3x^5-4)^27(15x^4), or the simplified form.",
  },
  [`${paperId}-3c`]: {
    kind: "log-quotient", argument: 46, denominator: 5,
    placeholder: "e.g. ln(46)/5",
    hint: "Enter the exact answer using ln, in the requested ln(a)/b form.",
  },
  [`${paperId}-4a`]: {
    kind: "complex-pair", real: -7 / 41, imaginary: 22 / 41, tolerance: 0.0001,
    placeholder: "e.g. -7/41 + (22/41)i",
    hint: "Enter real and imaginary parts in a + bi form. Fractions or accurate decimals work.",
  },
  [`${paperId}-5a`]: {
    kind: "vertex-form", a: 5, h: 2, k: -32,
    placeholder: "e.g. 5(x+2)^2-32",
    hint: "Enter the completed-square form a(x+h)^2+k.",
  },
  [`${paperId}-5b`]: {
    kind: "constant-log", constant: 15, logCoefficient: 5,
    placeholder: "e.g. 15 + 5ln(p)",
    hint: "Enter a sum of a constant and a multiple of ln(p). Reordered terms are fine.",
  },
  [`${paperId}-5c`]: {
    kind: "numeric", expected: 91,
    placeholder: "e.g. n = 91",
    hint: "Enter the value of n.",
  },
  [`${paperId}-6a`]: {
    kind: "polynomial-powers", variable: "p", coefficients: { 7: 128, 6: 1344, 5: 6048 },
    placeholder: "e.g. 128p^7+1344p^6+6048p^5",
    hint: "Enter the first three simplified terms in p. Superscripts or ^ notation work.",
  },
  [`${paperId}-6bii`]: {
    kind: "numeric", expected: 3,
    placeholder: "e.g. x = 3",
    hint: "Enter the single value of x.",
  },
  [`${paperId}-7ai`]: {
    kind: "numeric", expected: 28.2,
    placeholder: "e.g. A(3) = 28.2",
    hint: "Enter A(3) in centimetres. Compare your working for A(2) = 22 with the solution below.",
  },
  [`${paperId}-7aii`]: {
    kind: "linear-sequence", slope: 6.2, intercept: 9.6,
    placeholder: "e.g. A(n) = 6.2n + 9.6",
    hint: "Enter A(n) as a simplified linear expression in n.",
  },
  [`${paperId}-7aiii`]: {
    kind: "numeric", expected: 629.6,
    placeholder: "e.g. 629.6",
    hint: "Enter A(100) in centimetres.",
  },
  [`${paperId}-7av`]: {
    kind: "numeric", expected: 17,
    placeholder: "e.g. k = 17",
    hint: "Enter the first whole-number stage above 10 m.",
  },
  [`${paperId}-7bi`]: {
    kind: "numeric", expected: 0.5618, tolerance: 0.000001,
    placeholder: "e.g. 0.5618",
    hint: "Enter the length of O₃ in centimetres.",
  },
  [`${paperId}-8a`]: {
    kind: "numeric", expected: 665.55,
    placeholder: "e.g. 665.55",
    hint: "Enter the final euro price as a number, without the € sign.",
  },
  [`${paperId}-8b`]: {
    kind: "numeric", expected: 1.168,
    placeholder: "e.g. d = 1.168",
    hint: "Enter d rounded to three decimal places.",
  },
  [`${paperId}-8c`]: {
    kind: "numeric", expected: 1,
    placeholder: "e.g. 1",
    hint: "Enter the total time in hours, without units.",
  },
  [`${paperId}-8d`]: {
    kind: "numeric", expected: 82,
    placeholder: "e.g. 82",
    hint: "Enter the time to the nearest whole minute, without units.",
  },
  [`${paperId}-8eii`]: {
    kind: "numeric", expected: 1.155,
    placeholder: "e.g. x = 1.155",
    hint: "Enter x in kilometres, rounded to three decimal places.",
  },
  [`${paperId}-9aii`]: {
    kind: "linear-expression", variable: "c", slope: 0.1, intercept: -8.5,
    placeholder: "e.g. 0.1c - 8.5",
    hint: "Enter dF/dc as a simplified linear expression in c.",
  },
  [`${paperId}-9aiii`]: {
    kind: "numeric", expected: 2.8,
    placeholder: "e.g. 2.8",
    hint: "Enter dF/dc at t = 7, rounded to one decimal place.",
  },
  [`${paperId}-9av`]: {
    kind: "numeric", expected: 7.2, tolerance: 0.05,
    placeholder: "e.g. 7.2",
    hint: "Enter the rate per minute as a number. Values consistent with exact or rounded work are accepted.",
  },
  [`${paperId}-9bi`]: {
    kind: "ordered-values", expected: [3.9, 18.6, 46.6, 59.6],
    placeholder: "e.g. 3.9, 18.6, 46.6, 59.6",
    hint: "Enter v(1), v(3), v(5), v(6) in that order, separated by commas.",
  },
  [`${paperId}-9biii`]: {
    kind: "numeric", expected: 58.3,
    placeholder: "e.g. 58.3",
    hint: "Enter the average speed in km/h, rounded to one decimal place.",
  },
  [`${paperId}-10b`]: {
    kind: "coordinate-set", expected: [[2000, 0], [-2000, 0], [0, 2000], [0, -2000]],
    placeholder: "e.g. (2000, 0), (-2000, 0), (0, 2000), (0, -2000)",
    hint: "Enter all four coordinate pairs, separated by commas, in any order.",
  },
  [`${paperId}-10c`]: {
    kind: "numeric", expected: 8,
    placeholder: "e.g. n = 8",
    hint: "Enter the smallest natural number n.",
  },
  [`${paperId}-10diii`]: {
    kind: "numeric", expected: 0.25,
    placeholder: "e.g. 1/4",
    hint: "Enter the limiting proportion as a fraction or decimal.",
  },
  [`${paperId}-10ei`]: {
    kind: "numeric", expected: 4,
    placeholder: "e.g. H(1) = 4",
    hint: "Enter the number of dots in Pattern 1.",
  },
};

export const realPaper: StudyPaper = {
  id: paperId,
  year: 2025,
  level: "Higher",
  paperNumber: 1,
  title: "2025 Higher Level Paper 1",
  description: "All 51 parts across Questions 1–10 are ready onscreen.",
  estimatedMinutes: 240,
  kind: "real",
  questions: (["1a", "1b", "1c", "2ai", "2aii", "2bi", "2bii", "2biii", "3a", "3b", "3c", "4a", "4b", "4c", "5a", "5b", "5c", "6a", "6bi", "6bii", "7ai", "7aii", "7aiii", "7aiv", "7av", "7bi", "7bii", "7biii", "8a", "8b", "8c", "8d", "8ei", "8eii", "8eiii", "9ai", "9aii", "9aiii", "9aiv", "9av", "9bi", "9bii", "9biii", "10a", "10b", "10c", "10di", "10dii", "10diii", "10ei", "10eii"] as const).map((code) => {
    const id = `${paperId}-${code}`;
    const content = realPartContent[id];
    const metadata = bookPaper.parts.find((part) => part.id === id);
    if (!metadata) throw new Error(`Missing tracker part ${id}`);
    return {
      id, number: metadata.label.replace(/^Q/, "").replace("(", " ("),
      topic: metadata.topicIds.map((topicId) => topicNames[topicId] ?? topicId).join(" · "), marks: null,
      prompt: content.intro, expression: content.expression, illustration: content.illustration,
      selfCheck: content.selfCheck,
      answer: content.answer, solution: content.solution.join("\n\n"),
      answerCheck: configs[id],
    };
  }),
};
