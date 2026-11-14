import type { StudyPaper } from "../types";
import { findRealPaper } from "./realCatalogue";

// These are original, exam-style prototype questions—not transcriptions of SEC papers.
export const papers: StudyPaper[] = [
  {
    id: "2025-hl-paper-1-sample",
    year: 2025,
    level: "Higher",
    paperNumber: 1,
    title: "2025 Practice Paper 1",
    description: "A short prototype set covering core Paper 1 topics.",
    estimatedMinutes: 18,
    questions: [
      {
        id: "q1",
        number: "1 (a)",
        topic: "Algebra",
        marks: 10,
        prompt: "Solve the equation x² − 5x + 6 = 0.",
        answer: "x = 2 or x = 3",
        solution:
          "Factorise the quadratic: x² − 5x + 6 = (x − 2)(x − 3). For the product to equal zero, x − 2 = 0 or x − 3 = 0. Therefore x = 2 or x = 3.",
        answerCheck: {
          kind: "number-set",
          expected: [2, 3],
          placeholder: "e.g. x = 2 or x = 3",
          hint: "Enter both solutions in either order.",
        },
      },
      {
        id: "q2",
        number: "2 (a)",
        topic: "Calculus",
        marks: 10,
        prompt: "Let f(x) = x³ − 4x² + 2x + 1. Find f′(2).",
        answer: "f′(2) = −2",
        solution:
          "Differentiate term by term: f′(x) = 3x² − 8x + 2. Substitute x = 2: f′(2) = 3(2²) − 8(2) + 2 = 12 − 16 + 2 = −2.",
        answerCheck: {
          kind: "numeric",
          expected: -2,
          placeholder: "Enter your final answer",
          hint: "You can enter the value on its own or after an equals sign.",
        },
      },
      {
        id: "q3",
        number: "3 (b)",
        topic: "Sequences & series",
        marks: 15,
        prompt:
          "An arithmetic sequence begins 7, 11, 15, … Find the sum of its first 8 terms.",
        answer: "168",
        solution:
          "Here a = 7, d = 4 and n = 8. Use Sₙ = n/2[2a + (n − 1)d]. So S₈ = 8/2[14 + 7(4)] = 4(42) = 168.",
      },
      {
        id: "q4",
        number: "4 (a)",
        topic: "Probability",
        marks: 10,
        prompt:
          "A bag contains 5 blue counters and 3 green counters. Two counters are chosen at random without replacement. Find the probability that both are blue.",
        answer: "5/14",
        solution:
          "The probability of choosing blue first is 5/8. There are then 4 blue counters among 7 counters, so the probability of another blue is 4/7. Multiply: (5/8)(4/7) = 20/56 = 5/14.",
        answerCheck: {
          kind: "numeric",
          expected: 5 / 14,
          tolerance: 0.0005,
          placeholder: "e.g. 5/14",
          hint: "Equivalent fractions, decimals and percentages are accepted.",
        },
      },
    ],
  },
  {
    id: "2024-hl-paper-2-sample",
    year: 2024,
    level: "Higher",
    paperNumber: 2,
    title: "2024 Practice Paper 2",
    description: "A short prototype set covering geometry and statistics.",
    estimatedMinutes: 14,
    questions: [
      {
        id: "q1",
        number: "1 (a)",
        topic: "Geometry",
        marks: 10,
        prompt:
          "A sector of a circle has radius 6 cm and angle 120°. Find its area in terms of π.",
        answer: "12π cm²",
        solution:
          "A full circle has area πr² = 36π cm². The sector is 120/360 = 1/3 of the circle, so its area is 1/3 × 36π = 12π cm².",
      },
      {
        id: "q2",
        number: "2 (a)",
        topic: "Statistics",
        marks: 10,
        prompt: "Find the mean and median of the data set 4, 7, 7, 8, 9.",
        answer: "Mean = 7; median = 7",
        solution:
          "The total is 4 + 7 + 7 + 8 + 9 = 35. Divide by 5 to get a mean of 7. The middle value in the ordered list is also 7, so the median is 7.",
      },
      {
        id: "q3",
        number: "3 (b)",
        topic: "Trigonometry",
        marks: 15,
        prompt:
          "A 5 m ladder rests against a vertical wall and makes an angle of 68° with the ground. Find the vertical height reached, correct to two decimal places.",
        answer: "4.64 m",
        solution:
          "The ladder is the hypotenuse and the height is opposite the 68° angle. Use sin(68°) = height/5. Therefore height = 5 sin(68°) ≈ 4.64 m.",
      },
    ],
  },
];

export function findPaper(paperId: string) {
  return findRealPaper(paperId) ?? papers.find((paper) => paper.id === paperId);
}
