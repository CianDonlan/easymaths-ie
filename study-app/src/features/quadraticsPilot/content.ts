import type { AnswerCheck } from "../../types";

export type HelpSection = "square" | "turning" | "positive-example" | "negative-example" | "hint";
export interface PilotTask {
  id: string;
  label: string;
  title: string;
  source?: { paperId: string; partId: string; label: string };
  prompt: string;
  hint: string;
  answer: string;
  solution: string[];
  comparison: string[];
  answerCheck?: AnswerCheck;
}
const pair = (expected: number[], hint: string): AnswerCheck => ({ kind: "ordered-values", expected, placeholder: "e.g. 1, 2", hint });
export const pilotTasks: PilotTask[] = [
  {
    id: "warmup-square", label: "Warm-up 1", title: "Make a square",
    prompt: "Write x² + 6x + 2 in the form (x + h)² + k.",
    hint: "What is half the coefficient of x? Expand (x + that number)² and compare its constant with 2.",
    answer: "(x + 3)² − 7",
    solution: ["Half of 6 is 3, so start with (x + 3)².", "Expanding gives x² + 6x + 9. Our expression has +2, so subtract 7.", "Therefore x² + 6x + 2 = (x + 3)² − 7."],
    comparison: ["The square contains x + 3.", "The constant outside the square is −7.", "Expanding your answer recovers all three original terms."],
  },
  {
    id: "warmup-minimum", label: "Warm-up 2", title: "Read the minimum",
    prompt: "Find the minimum point of f(x) = 2x² − 8x + 1 by completing the square.",
    hint: "First write 2(x² − 4x) + 1. Once you have a square, ask when that square is zero.",
    answer: "Minimum point (2, −7)",
    solution: ["2(x² − 4x) + 1 = 2[(x − 2)² − 4] + 1.", "So f(x) = 2(x − 2)² − 7.", "The square is smallest at x = 2; the minimum y-value is −7. The point is (2, −7)."],
    comparison: ["Complete the square to 2(x − 2)² − 7.", "Give both coordinates, with x first.", "Explain why the positive coefficient makes this a minimum."],
    answerCheck: pair([2, -7], "Enter minimum x, minimum y, separated by a comma. Fractions are accepted; workings are not graded."),
  },
  {
    id: "exam-square", label: "Exam 1", title: "A fractional coefficient inside",
    source: { paperId: "lc-hl-2017-normal-p1", partId: "lc-hl-2017-normal-p1-1a", label: "2017 · Paper 1 · Q1(a)" },
    prompt: "Write f(x) = 2x² − 7x − 10 as a(x + h)² + k, with rational a, h and k.",
    hint: "Start with 2[x² − (7/2)x] − 10. What is half of −7/2? Remember that any correction inside the brackets is also multiplied by 2.",
    answer: "2(x − 7/4)² − 129/8",
    solution: ["Factor the first two terms: 2[x² − (7/2)x] − 10.", "Complete the square inside: x² − (7/2)x = (x − 7/4)² − 49/16.", "Multiply the correction by 2: 2(x − 7/4)² − 49/8 − 10.", "Combine the constants: f(x) = 2(x − 7/4)² − 129/8. Thus a = 2, h = −7/4, k = −129/8."],
    comparison: ["Keep coefficient 2 outside the square.", "Use x − 7/4 inside it.", "The outside constant is −129/8; check by expanding."],
  },
  {
    id: "exam-minimum", label: "Exam 2", title: "Use the completed square",
    source: { paperId: "lc-hl-2017-normal-p1", partId: "lc-hl-2017-normal-p1-1b", label: "2017 · Paper 1 · Q1(b)" },
    prompt: "Find the minimum point of f(x) = 2x² − 7x − 10. You may use your completed-square form from the previous task.",
    hint: "Use your previous expression. Find the x that makes the bracket zero, then read off the remaining constant.",
    answer: "(7/4, −129/8)",
    solution: ["From the previous task, f(x) = 2(x − 7/4)² − 129/8.", "The square is nonnegative. Its coefficient is positive, so the minimum occurs when x − 7/4 = 0.", "Thus x = 7/4 and y = −129/8. The minimum point is (7/4, −129/8)."],
    comparison: ["Give x = 7/4, the value that makes the bracket zero.", "Give y = −129/8, the constant outside the square.", "Give the point, not just the minimum value."],
    answerCheck: pair([7/4, -129/8], "Enter minimum x, minimum y. Exact fractions such as 7/4 are accepted. Workings are not graded."),
  },
  {
    id: "exam-reverse", label: "Exam 3", title: "Work backwards from a minimum",
    source: { paperId: "lc-hl-2023-normal-p1", partId: "lc-hl-2023-normal-p1-2a", label: "2023 · Paper 1 · Q2(a)" },
    prompt: "The quadratic f(x) = x² + bx + c has a minimum at (3, −1). Find b and c. Try using the turning-point form.",
    hint: "A quadratic with leading coefficient 1 and minimum (r, s) can be written (x − r)² + s. Substitute the given point, then expand.",
    answer: "b = −6, c = 8",
    solution: ["The leading coefficient is 1 and the minimum is (3, −1), so f(x) = (x − 3)² − 1.", "Expand: x² − 6x + 9 − 1 = x² − 6x + 8.", "Compare with x² + bx + c: b = −6 and c = 8. The catalogue also explains a valid calculus method."],
    comparison: ["Use the minimum to write (x − 3)² − 1.", "Expand before comparing coefficients.", "Give b = −6 and c = 8, with their signs."],
    answerCheck: pair([-6, 8], "Enter b, c, in that order. This checks the coefficients, not the method."),
  },
  {
    id: "fresh-try", label: "Fresh try", title: "Try the method again",
    prompt: "Find the minimum point of f(x) = 2x² + 8x + 3 by completing the square. Try it before opening help this time.",
    hint: "Take 2 outside the quadratic and linear terms. Complete the square inside, then find where the bracket is zero.",
    answer: "Minimum point (−2, −5)",
    solution: ["2x² + 8x + 3 = 2(x² + 4x) + 3.", "Complete the square: 2[(x + 2)² − 4] + 3 = 2(x + 2)² − 5.", "The square is zero at x = −2, so the minimum point is (−2, −5)."],
    comparison: ["Obtain 2(x + 2)² − 5.", "Set x + 2 = 0, giving x = −2.", "Give both coordinates (−2, −5)."],
    answerCheck: pair([-2, -5], "Enter minimum x, minimum y. Workings are not graded."),
  },
];

export const pilotExamples = [
  { id: "positive-example" as const, title: "Example: a positive linear term", expression: "3x² + 12x + 5", steps: [
    { equation: "3(x² + 4x) + 5", explanation: "Take 3 outside the first two terms. Leave the +5 outside." },
    { equation: "3[(x + 2)² − 4] + 5", explanation: "Half of 4 is 2. Since (x + 2)² introduces +4, subtract 4 inside the brackets." },
    { equation: "3(x + 2)² − 12 + 5", explanation: "The correction is multiplied by 3 too: 3 × (−4) = −12." },
    { equation: "3(x + 2)² − 7", explanation: "Combine constants. The minimum is (−2, −7), because x + 2 is zero at −2." },
  ] },
  { id: "negative-example" as const, title: "Example: a negative linear term", expression: "2x² − 6x + 7", steps: [
    { equation: "2(x² − 3x) + 7", explanation: "Take 2 outside the first two terms." },
    { equation: "2[(x − 3/2)² − 9/4] + 7", explanation: "Half of −3 is −3/2. Its square is +9/4, so subtract 9/4 to compensate." },
    { equation: "2(x − 3/2)² − 9/2 + 7", explanation: "Multiply the correction by the outside coefficient 2." },
    { equation: "2(x − 3/2)² + 5/2", explanation: "Combine constants. The minimum is (3/2, 5/2). Check the sign by setting the bracket equal to zero." },
  ] },
];
