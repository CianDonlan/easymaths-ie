import bookPaper from "./book2018p1.json";
import type { StudyPaper, StudyQuestion } from "../types";

const paperId = "lc-hl-2018-normal-p1";
type Content = Pick<StudyQuestion, "prompt" | "answer" | "solution"> & Partial<Pick<StudyQuestion, "expression" | "illustration" | "answerCheck" | "selfCheck">>;

// Source prompts and figures checked on printed pages 3–18. Solutions are
// authored explanations; individual marks and official scheme allocations are unverified.
const content: Record<string, Content> = {
  "1a": {
    "prompt": "Solve simultaneously: 2x + 3y − z = −4; 3x + 2y + 2z = 14; x − 3z = −13.",
    "answer": "x = 2, y = −1, z = 5",
    "solution": "The third equation gives x = 3z − 13. Substitute into the first two to get 5z + 3y = 22 and 11z + 2y = 53. Multiply these by 2 and 3 respectively, then subtract: 23z = 115, so z = 5. Hence y = −1 and x = 2. Substitution verifies all three equations.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        2,
        -1,
        5
      ],
      "placeholder": "e.g. 2, -1, 5",
      "hint": "Enter x, y, z in that order."
    }
  },
  "1b": {
    "prompt": "Solve (2x − 3)/(x + 2) ≥ 3 for real x ≠ −2.",
    "answer": "−9 ≤ x < −2",
    "solution": "Bring 3 to the left: (−x − 9)/(x + 2) ≥ 0, or (x + 9)/(x + 2) ≤ 0. The critical values are −9 (zero numerator) and −2 (undefined). A sign chart gives nonpositive values only between them. Include −9 and exclude −2.",
    "answerCheck": {
      "kind": "interval",
      "minimum": -9,
      "maximum": -2,
      "includeMinimum": true,
      "includeMaximum": false,
      "placeholder": "e.g. [-9, -2)",
      "hint": "Enter an interval or equivalent chained inequality, with −9 included and −2 excluded."
    }
  },
  "2a": {
    "prompt": "The first three terms of a geometric series are x², 5x − 8 and x + 8, for real x. Use the common ratio to show x³ − 17x² + 80x − 64 = 0.",
    "answer": "(5x − 8)² = x²(x + 8), giving x³ − 17x² + 80x − 64 = 0",
    "solution": "The two consecutive ratios must agree: (5x − 8)/x² = (x + 8)/(5x − 8). Neither denominator can be zero in this geometric sequence: x = 0 would give first term 0 but second −8, and 5x − 8 = 0 would force the next term to be zero, which it is not. Cross-multiplication gives 25x² − 80x + 64 = x³ + 8x². Rearrange to the required cubic.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Equate consecutive-term ratios.",
        "Expand the cross-product and rearrange to the cubic."
      ]
    }
  },
  "2b": {
    "prompt": "For f(x) = x³ − 17x² + 80x − 64, show f(1) = 0 and find another real x with f(x) = 0.",
    "answer": "f(1) = 0; the other root is x = 8 (a repeated root).",
    "solution": "Substitute 1: 1 − 17 + 80 − 64 = 0. Thus x − 1 is a factor. Dividing gives x² − 16x + 64 = (x − 8)². Hence f(x) = (x − 1)(x − 8)² and the other distinct root is 8.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Explicitly evaluate f(1).",
        "Factor the quotient or substitute to verify x = 8."
      ]
    }
  },
  "2c": {
    "prompt": "The geometric series begins x², 5x − 8, x + 8, …, with x = 1 or 8. Find the x giving a finite sum to infinity and find that sum.",
    "answer": "x = 8, S∞ = 128",
    "solution": "For x = 1, the first terms are 1,−3,9 and the ratio is −3, so no finite sum to infinity exists. For x = 8, the terms are 64,32,16 with ratio 1/2. Since |r| < 1, S∞ = 64/(1 − 1/2) = 128.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        8,
        128
      ],
      "placeholder": "e.g. 8, 128",
      "hint": "Enter x, sum to infinity, in that order."
    }
  },
  "3a": {
    "prompt": "For h(x) = cos(2x), find the angle of inclination of the tangent at x = π/3, measured anticlockwise from the positive x-axis in the range 0° ≤ θ < 180°.",
    "answer": "120° (2π/3 radians)",
    "solution": "Differentiate in radians: h′(x) = −2sin(2x). At π/3 the slope is −2sin(2π/3) = −√3. Thus tanθ = −√3. The inclination in [0°,180°) is 120°, rather than the calculator’s principal arctangent −60°.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 120,
      "placeholder": "e.g. 120",
      "hint": "Enter the inclination in degrees, without a degree sign."
    }
  },
  "3b": {
    "prompt": "Find the average value of h(x) = cos(2x) on 0 ≤ x ≤ π/4. Give the exact answer in terms of π.",
    "answer": "2/π",
    "solution": "Average = [1/(π/4)]∫₀^(π/4) cos(2x) dx = (4/π)[sin(2x)/2]₀^(π/4) = (4/π)(1/2) = 2/π. Divide the integral by the interval length, not by the number of endpoints.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use integral divided by interval length π/4.",
        "Evaluate the integral as 1/2 and simplify to 2/π."
      ]
    }
  },
  "4a": {
    "prompt": "Prove by induction that (cosθ + i sinθ)ⁿ = cos(nθ) + i sin(nθ) for every positive integer n, where i² = −1.",
    "answer": "The n = 1 case is immediate; multiplication by cosθ + i sinθ and the addition formulae prove the inductive step.",
    "solution": "For n = 1 the identity is immediate. Assume it holds for n = k. Then the (k + 1)st power is [cos(kθ) + i sin(kθ)](cosθ + i sinθ). Expanding with i² = −1 gives real part cos(kθ)cosθ − sin(kθ)sinθ = cos((k + 1)θ), and imaginary part sin(kθ)cosθ + cos(kθ)sinθ = sin((k + 1)θ). Thus it holds at k + 1. By induction it holds for all positive integers n.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Verify the base case and state the induction assumption.",
        "Multiply and use i² = −1.",
        "Apply both angle-addition formulae and conclude by induction."
      ]
    }
  },
  "4b": {
    "prompt": "Simplify (−1/2 + (√3/2)i)³ using de Moivre’s theorem or otherwise.",
    "answer": "1",
    "solution": "The base has modulus 1 and argument 2π/3: cos(2π/3) + i sin(2π/3). Cubing gives cos(2π) + i sin(2π) = 1.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 1,
      "placeholder": "e.g. 1",
      "hint": "Enter the simplified real value. Show your method in your workings."
    }
  },
  "5ai": {
    "prompt": "In the Sieve of Sundaram table, row 1 begins 4,7,10,13,… and row 2 begins 7,12,17,22,… . Find the positive difference between the sums of the first 45 terms of those rows.",
    "answer": "2115",
    "solution": "The first row has first term 4 and difference 3, so S₁ = 45[2(4) + 44(3)]/2 = 3150. The second has first term 7 and difference 5, so S₂ = 45[2(7) + 44(5)]/2 = 5265. The positive difference is 5265 − 3150 = 2115.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 2115,
      "placeholder": "e.g. 2115",
      "hint": "Enter the positive difference between the two sums."
    },
    "illustration": "p1-2018-sundaram"
  },
  "5aii": {
    "prompt": "The Sieve of Sundaram table has rows beginning 4,7,10,13; 7,12,17,22; 10,17,24,31; 13,22,31,40. Each row and column continues arithmetically in this pattern. Find the entry in row 60, column 70.",
    "answer": "8530",
    "solution": "Row r begins with 3r + 1 and has common difference 2r + 1. Thus entry (r,c) is 3r + 1 + (c − 1)(2r + 1) = 2rc + r + c. At r = 60,c = 70 this gives 8400 + 60 + 70 = 8530.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 8530,
      "placeholder": "e.g. 8530",
      "hint": "Enter the row-60, column-70 entry."
    },
    "illustration": "p1-2018-sundaram"
  },
  "5b": {
    "prompt": "A sequence has a₁ = 4, a₂ = 2 and aₙ = aₙ₋₁ − aₙ₋₂ for n ≥ 3. Write the next six terms, then find a₂₀₁₉.",
    "answer": "a₃,…,a₈ = −2,−4,−2,2,4,2; a₂₀₁₉ = −2",
    "solution": "Subtract the two preceding terms in the specified order to obtain −2,−4,−2,2,4,2. The pair (a₇,a₈) = (4,2) repeats the initial pair, so the recurrence repeats every six terms. Since 2019 = 6(336) + 3, a₂₀₁₉ = a₃ = −2.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        -2,
        -4,
        -2,
        2,
        4,
        2,
        -2
      ],
      "placeholder": "e.g. -2, -4, -2, 2, 4, 2, -2",
      "hint": "Enter a₃,a₄,a₅,a₆,a₇,a₈, then a₂₀₁₉, in that order."
    }
  },
  "6a": {
    "prompt": "Find all intersection points of h(x) = x and k(x) = x³.",
    "answer": "(−1,−1), (0,0), (1,1)",
    "solution": "Equate x³ = x, so x(x² − 1) = x(x − 1)(x + 1) = 0. Thus x = −1,0,1. Since y = x, the corresponding points are (−1,−1), (0,0) and (1,1).",
    "answerCheck": {
      "kind": "coordinate-set",
      "expected": [
        [
          -1,
          -1
        ],
        [
          0,
          0
        ],
        [
          1,
          1
        ]
      ],
      "placeholder": "e.g. (-1,-1), (0,0), (1,1)",
      "hint": "Enter all three coordinate pairs, in any order."
    },
    "illustration": "p1-2018-cubic"
  },
  "6bi": {
    "prompt": "Find the total area enclosed between h(x) = x and k(x) = x³.",
    "answer": "1/2 square unit",
    "solution": "The intersections occur at x = −1,0,1. On [0,1], x ≥ x³ and the area is ∫₀¹(x − x³) dx = [x²/2 − x⁴/4]₀¹ = 1/4. By origin symmetry the other enclosed region has the same area, so total = 2(1/4) = 1/2. A signed integral over [−1,1] alone would cancel the two areas.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.5,
      "placeholder": "e.g. 0.5",
      "hint": "Enter the total unsigned area, as a fraction or decimal."
    },
    "illustration": "p1-2018-cubic"
  },
  "6bii": {
    "prompt": "On the supplied axes for h(x) = x and k(x) = x³, draw k⁻¹, the inverse of k. Draw on paper using reflection symmetry.",
    "answer": "The increasing cube-root curve y = ∛x, reflected from y = x³ in y = x.",
    "solution": "Interchange x and y in y = x³ to obtain x = y³, hence y = ∛x. Reflect points across y = x: for example (1/8,1/512) maps to (1/512,1/8), and (1/2,1/8) maps to (1/8,1/2). The inverse passes through (−1,−1),(0,0),(1,1) and has a vertical tangent at the origin.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Reflect the cubic in the line y = x.",
        "Retain the three fixed intersection points.",
        "Draw an increasing cube-root curve, steep at the origin."
      ]
    },
    "illustration": "p1-2018-cubic"
  },
  "7a": {
    "prompt": "Jack’s typing model is t(x) = k ln(1 − x/80), for 0 ≤ x ≤ 70, where t is days of practice and x is words per minute. Given t(35) = 35.96, write an equation for k and show k = −62.5 to 1 decimal place.",
    "answer": "35.96 = k ln(45/80); k ≈ −62.5",
    "solution": "Substitute x = 35: 35.96 = k ln(1 − 35/80) = k ln(45/80). Divide to get k = 35.96/ln(45/80) ≈ −62.49955, which rounds to −62.5. The sign is negative because the logarithm is negative.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Substitute both the given speed and practice time.",
        "Isolate k and round to −62.5."
      ]
    }
  },
  "7b": {
    "prompt": "Jack’s practice time to reach x words per minute is t(x) = −62.5ln(1 − x/80) days, for 0 ≤ x ≤ 70. Find the speed Jack can learn with 100 days of practice, to the nearest whole word per minute.",
    "answer": "64 wpm",
    "solution": "Set 100 = −62.5ln(1 − x/80). Then ln(1 − x/80) = −1.6, so x = 80(1 − e^(−1.6)) ≈ 63.8483. This is in the model’s domain and rounds to 64 wpm.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 64,
      "placeholder": "e.g. 64",
      "hint": "Enter the speed in whole words per minute."
    }
  },
  "7c": {
    "prompt": "Jack’s practice time to reach x words per minute is t(x) = −62.5ln(1 − x/80) days, for 0 ≤ x ≤ 70. Complete the time table for x = 0,10,20,30,40,50,60,70 to the nearest day, then draw t(x) on the supplied axes on paper.",
    "answer": "0,8,18,29,43,61,87,130 days; an increasing, upward-curving graph.",
    "solution": "Substitute each speed into −62.5ln(1 − x/80) to get approximately 0,8.3457,17.9801,29.3752,43.3217,61.3018,86.6434,129.9651 days. Round to the listed integers and plot. Join with a smooth increasing convex curve; t′(x) = 62.5/(80 − x) increases throughout this domain.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Complete all eight time entries in the stated order.",
        "Plot the rounded values on the speed/time axes.",
        "Draw a smooth increasing curve bending upwards."
      ]
    },
    "illustration": "p1-2018-typing-table"
  },
  "7d": {
    "prompt": "Jack’s practice time to reach x words per minute is t(x) = −62.5ln(1 − x/80) days, for 0 ≤ x ≤ 70. A simpler model is p(x) = 1.5x days. On your graph of t, draw p for 0 ≤ x ≤ 70.",
    "answer": "The straight segment from (0,0) to (70,105).",
    "solution": "For p(x) = 1.5x, use points such as (0,0),(20,30),(40,60),(60,90) and (70,105). Join with a straight line on the same speed/time axes as your logarithmic graph.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use slope 1.5 days per wpm and intercept zero.",
        "Draw a straight segment over the stated domain on the same axes as t."
      ]
    },
    "illustration": "p1-2018-typing-axes"
  },
  "7ei": {
    "prompt": "Jack’s practice time to reach x words per minute is t(x) = −62.5ln(1 − x/80) days, for 0 ≤ x ≤ 70. Let p(x) = 1.5x and h(x) = p(x) − t(x). Use your graphs to estimate the solution of h(x) = 0 for x > 0.",
    "answer": "Approximately 62 wpm (numerical intersection about 61.88).",
    "solution": "h(x) = 0 means p(x) = t(x), so read the positive intersection of the two graphs. It is near x = 62 wpm. Solving 1.5x + 62.5ln(1 − x/80) = 0 numerically gives about 61.8835. The intersection at x = 0 is excluded by the question.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Read the positive crossing of your two plotted graphs.",
        "Give a sensible graph estimate near 62 wpm and exclude zero."
      ]
    }
  },
  "7eii": {
    "prompt": "Jack’s practice time to reach x words per minute is t(x) = −62.5ln(1 − x/80) days, for 0 ≤ x ≤ 70. For h(x) = 1.5x − t(x), use calculus to find its maximum on [0,70], to the nearest whole day.",
    "answer": "17 days (attained at x = 115/3 ≈ 38.33 wpm)",
    "solution": "h(x) = 1.5x + 62.5ln(1 − x/80), so h′(x) = 1.5 − 62.5/(80 − x). Setting this to zero gives 80 − x = 125/3, hence x = 115/3. The second derivative is −62.5/(80 − x)² < 0. The endpoint values are h(0) = 0 and h(70) ≈ −24.9651, while the stationary value is about 16.7297. Thus the global maximum rounds to 17 days.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 17,
      "placeholder": "e.g. 17",
      "hint": "Enter the maximum difference in days to the nearest whole number. Show the stationary-point and maximum checks in your workings."
    }
  },
  "8a": {
    "prompt": "f(x) = e^(−x²/2)/√(2π) is symmetric about the y-axis. B is (−1,1/√(2πe)) and C is its reflection in that axis. Find A, the point where the graph crosses the y-axis, in terms of π.",
    "answer": "A = (0,1/√(2π))",
    "solution": "On the y-axis x = 0, so e^(−x²/2) = e⁰ = 1. Therefore f(0) = 1/√(2π), giving A = (0,1/√(2π)).",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Set x = 0 and evaluate the exponential.",
        "State the full coordinate pair in exact form."
      ]
    },
    "illustration": "p1-2018-bell"
  },
  "8b": {
    "prompt": "f(x) = e^(−x²/2)/√(2π) is symmetric about the y-axis. B is (−1,1/√(2πe)) and C is its reflection in that axis. Find the area of the rectangle bounded by BC, the x-axis, x = −1 and x = 1, to 3 decimal places.",
    "answer": "0.484 square unit",
    "solution": "The width is 1 − (−1) = 2 and height is f(1) = 1/√(2πe). Thus area = 2/√(2πe) ≈ 0.483941449, rounding to 0.484.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.484,
      "placeholder": "e.g. 0.484",
      "hint": "Enter the rectangle area to 3 decimal places."
    },
    "illustration": "p1-2018-bell"
  },
  "8c": {
    "prompt": "f(x) = e^(−x²/2)/√(2π) is symmetric about the y-axis. B is (−1,1/√(2πe)) and C is its reflection in that axis. Use calculus to show f is decreasing at C.",
    "answer": "f′(1) = −1/√(2πe) < 0",
    "solution": "The chain rule gives f′(x) = −x e^(−x²/2)/√(2π). Symmetry gives C x-coordinate 1. Hence f′(1) = −e^(−1/2)/√(2π) = −1/√(2πe), which is negative. A negative derivative means the function is decreasing there.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Differentiate using the chain rule.",
        "Use C at x = 1 and explain the negative derivative."
      ]
    },
    "illustration": "p1-2018-bell"
  },
  "8d": {
    "prompt": "f(x) = e^(−x²/2)/√(2π) is symmetric about the y-axis. B is (−1,1/√(2πe)) and C is its reflection in that axis. Show the graph has a point of inflection at B.",
    "answer": "f″(x) = (x² − 1)e^(−x²/2)/√(2π), which changes sign at x = −1.",
    "solution": "Differentiate f′(x) = −x e^(−x²/2)/√(2π) using the product rule. This gives f″(x) = (x² − 1)e^(−x²/2)/√(2π). The exponential factor is positive. Just to the left of −1, x² − 1 > 0; just to the right, x² − 1 < 0. Thus concavity changes at x = −1, so B is an inflection point. Showing f″(−1) = 0 alone would not establish the sign change.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Obtain the second derivative.",
        "Check opposite signs on the two sides of −1.",
        "Conclude a change of concavity at B."
      ]
    },
    "illustration": "p1-2018-bell"
  },
  "9a": {
    "prompt": "Step 0 of a Sierpinski pattern is one filled equilateral triangle. At each next step, remove the open central triangle formed by joining the midpoints of each surviving triangle. Complete the table for steps 0–3: step 0 has count 1 and remaining fraction 1, and step 2 has remaining fraction 9/16. Supply the other five entries.",
    "answer": "Counts at steps 1,2,3: 3,9,27; fractions at steps 1,3: 3/4,27/64",
    "solution": "Each surviving triangle produces three smaller triangles, so counts multiply by 3 at each step: 1,3,9,27. Each new triangle has one quarter the area of its parent; retaining three gives an area multiplier 3/4. The fractions are therefore 1,3/4,9/16,27/64.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        3,
        9,
        27,
        0.75,
        0.421875
      ],
      "placeholder": "e.g. 3, 9, 27, 3/4, 27/64",
      "hint": "Enter the three missing counts (steps 1,2,3), then the two missing fractions (steps 1,3)."
    },
    "illustration": "p1-2018-sierpinski"
  },
  "9bi": {
    "prompt": "Step 0 of a Sierpinski pattern is one filled equilateral triangle. At each next step, remove the open central triangle formed by joining the midpoints of each surviving triangle. Write the number of filled triangles at step n.",
    "answer": "3ⁿ",
    "solution": "The count starts at 1 when n = 0 and triples at each step. Thus Nₙ = 1 × 3ⁿ = 3ⁿ. Using 3^(n − 1) would incorrectly shift the step-zero indexing.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use the count multiplier 3.",
        "Check that the formula gives 1 at n = 0."
      ]
    }
  },
  "9bii": {
    "prompt": "Step 0 of a Sierpinski pattern is one filled equilateral triangle. At each next step, remove the open central triangle formed by joining the midpoints of each surviving triangle. Find the first step k with more than 10⁹ filled triangles.",
    "answer": "k = 19",
    "solution": "Solve 3ᵏ > 10⁹: k > 9ln10/ln3 ≈ 18.8631. The first integer is 19. Indeed 3¹⁸ = 387420489 < 10⁹, while 3¹⁹ = 1162261467 > 10⁹.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 19,
      "placeholder": "e.g. 19",
      "hint": "Enter the first integer step exceeding the strict threshold."
    }
  },
  "9ci": {
    "prompt": "Step 0 of a Sierpinski pattern is one filled equilateral triangle. At each next step, remove the open central triangle formed by joining the midpoints of each surviving triangle. Find the first step h at which the remaining area fraction is less than 1/100.",
    "answer": "h = 17",
    "solution": "The fraction at step h is (3/4)ʰ. Taking logarithms in (3/4)ʰ < 0.01 and dividing by negative ln(3/4) reverses the inequality: h > ln(0.01)/ln(0.75) ≈ 16.00785. Hence h = 17. Step 16 leaves about 0.0100226, still just above 1/100.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 17,
      "placeholder": "e.g. 17",
      "hint": "Enter the least integer step giving a remaining fraction strictly below 1/100."
    }
  },
  "9cii": {
    "prompt": "Step 0 of a Sierpinski pattern is one filled equilateral triangle. At each next step, remove the open central triangle formed by joining the midpoints of each surviving triangle. What fraction of the original area remains in the limit as the number of steps tends to infinity?",
    "answer": "0",
    "solution": "The remaining fraction is (3/4)ⁿ. Since 0 < 3/4 < 1, it tends to zero as n tends to infinity.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0,
      "placeholder": "e.g. 0",
      "hint": "Enter the limiting area fraction."
    }
  },
  "9di": {
    "prompt": "Step 0 of a Sierpinski pattern is one filled equilateral triangle. At each next step, remove the open central triangle formed by joining the midpoints of each surviving triangle. The original triangle has side 1. Total perimeters at steps 0 and 2 are 3 and 27/4. Complete the missing perimeters at steps 1,3,4.",
    "answer": "9/2, 81/8, 243/16 units",
    "solution": "At step n there are 3ⁿ triangles, each of side 1/2ⁿ. The total perimeter is Pₙ = 3ⁿ × 3/2ⁿ = 3(3/2)ⁿ. Therefore P₁ = 9/2, P₃ = 81/8 and P₄ = 243/16.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        4.5,
        10.125,
        15.1875
      ],
      "placeholder": "e.g. 9/2, 81/8, 243/16",
      "hint": "Enter the missing perimeters for steps 1,3,4, in that order."
    },
    "illustration": "p1-2018-perimeter-table"
  },
  "9dii": {
    "prompt": "Step 0 of a Sierpinski pattern is one filled equilateral triangle. At each next step, remove the open central triangle formed by joining the midpoints of each surviving triangle. The original triangle has side 1. Find the total perimeter of all filled triangles at step 35, to the nearest unit.",
    "answer": "4,368,329 units",
    "solution": "There are 3³⁵ triangles, each with perimeter 3/2³⁵. Their total is 3(3/2)³⁵ ≈ 4368328.818, rounding to 4368329 units.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 4368329,
      "placeholder": "e.g. 4368329",
      "hint": "Enter the perimeter rounded to the nearest unit, without thousands separators."
    }
  },
  "9diii": {
    "prompt": "Step 0 of a Sierpinski pattern is one filled equilateral triangle. At each next step, remove the open central triangle formed by joining the midpoints of each surviving triangle. Comment on total filled area and total perimeter as n tends to infinity.",
    "answer": "Area tends to zero; total perimeter grows without bound.",
    "solution": "The remaining area is the original area multiplied by (3/4)ⁿ, which tends to zero. The sum of all surviving triangle perimeters is 3(3/2)ⁿ for an original side of 1; since 3/2 > 1, this grows without bound. Increasingly many smaller triangles can have decreasing total area and increasing total boundary length.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use the area ratio 3/4 to justify the zero limit.",
        "Use the perimeter ratio 3/2 to justify unbounded growth."
      ]
    }
  }
};

export const realPaper2018p1: StudyPaper = {
  id: paperId, year: 2018, level: "Higher", paperNumber: 1, kind: "real", estimatedMinutes: 150,
  title: "2018 Higher Level Paper 1",
  description: "All nine questions ready onscreen with worked solutions and answer checks or guided self-checks.",
  questions: bookPaper.parts.map((part) => {
    const code = part.id.slice(paperId.length + 1);
    if (!content[code]) throw new Error(`Missing reviewed content for ${part.id}`);
    return { id: part.id, number: part.label.replace(/^Q/, "").replace("(", " ("), marks: null,
      topic: part.topicIds.includes("p1-complex") ? "Complex numbers" : part.topicIds.includes("p1-calculus") ? "Functions and calculus" : part.topicIds.includes("p1-sequences") ? "Sequences and series" : part.topicIds.includes("p1-number") ? "Number and arithmetic" : part.topicIds.includes("p1-graphs") ? "Functions and graphs" : "Algebra",
      ...content[code] };
  }),
};
