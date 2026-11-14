import bookPaper from "./book2018p2.json";
import type { StudyPaper, StudyQuestion } from "../types";

const paperId = "lc-hl-2018-normal-p2";
type Content = Pick<StudyQuestion, "prompt" | "answer" | "solution"> & Partial<Pick<StudyQuestion, "expression" | "illustration" | "answerCheck" | "selfCheck">>;

// Authored study explanations, reviewed against printed source pages 3–20.
// No individual leaf marks or official marking-scheme allocations are claimed.
const content: Record<string, Content> = {
  "1a": {
    "prompt": "Mary has probabilities 1/20, 1/10 and 1/4 of first, second and third places, paying €9000, €7000 and €3000 respectively; otherwise she wins nothing. Entry costs €2000. Find her expected loss if she enters.",
    "answer": "€100 expected loss",
    "solution": "Expected prize = 9000/20 + 7000/10 + 3000/4 = 450 + 700 + 750 = €1900. Expected net gain = 1900 − 2000 = −€100, so expected loss is €100. This is an average over the probability model, not a guaranteed loss on one entry.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 100,
      "placeholder": "e.g. 100",
      "hint": "Enter the expected loss as a positive euro amount."
    }
  },
  "1b": {
    "prompt": "Mary has probabilities 1/20, 1/10 and 1/4 of first, second and third places, paying €9000, €7000 and €3000 respectively; otherwise she wins nothing. Entry costs €2000. Each of the three prizes is increased by the same €x, leaving the entry fee unchanged. Find x if Mary now expects to break even.",
    "answer": "x = €250",
    "solution": "The probability of receiving any prize is 1/20 + 1/10 + 1/4 = 2/5. Raising every prize by x therefore raises expected winnings by (2/5)x. For break-even, 1900 + (2/5)x = 2000, giving x = 250.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 250,
      "placeholder": "e.g. 250",
      "hint": "Enter the increase in each prize, in euro."
    }
  },
  "2a": {
    "prompt": "For a standard normal variable Z, the shaded area to the left of a positive cutoff z₁ is 67%. Find z₁ to 2 decimal places.",
    "answer": "z₁ ≈ 0.44",
    "solution": "The diagram means P(Z ≤ z₁) = 0.67, not 67% between zero and z₁. From a cumulative normal table or inverse normal calculation, z₁ ≈ 0.439913, which rounds to 0.44.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.44,
      "placeholder": "e.g. 0.44",
      "hint": "Enter the positive z cutoff to 2 decimal places."
    },
    "illustration": "p2-2018-normal"
  },
  "2bi": {
    "prompt": "Maths marks are normal with mean 70 and standard deviation 15; English marks are normal with mean 72 and standard deviation 10. Mary scores 65 in Maths and 68 in English. In which exam does she perform better relative to her class? Justify.",
    "answer": "Maths: z = −1/3 is higher than the English z = −0.4.",
    "solution": "Standardise both marks: zMaths = (65 − 70)/15 = −1/3 ≈ −0.3333; zEnglish = (68 − 72)/10 = −0.4. A higher z means a higher position relative to the relevant class distribution. Mary therefore does better relatively in Maths, despite her higher raw English mark.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Calculate both standardised scores.",
        "Compare the z values and conclude Maths."
      ]
    }
  },
  "2bii": {
    "prompt": "English marks are normally distributed with mean 72 and standard deviation 10. The top 15% receive an A. Find the least whole-number mark that merits an A.",
    "answer": "83",
    "solution": "The cutoff is the 85th percentile, with z ≈ 1.0364 (about 1.04 in tables). Thus the continuous cutoff is 72 + 10(1.0364) ≈ 82.3643. The least integer meeting it is 83, not the nearest integer 82.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 83,
      "placeholder": "e.g. 83",
      "hint": "Enter the least whole-number mark above the continuous cutoff."
    }
  },
  "2biii": {
    "prompt": "English marks are normal with mean 72 and standard deviation 10. Using the empirical rule or otherwise, estimate the percentage scoring between 52 and 82.",
    "answer": "About 81.5% by the 68–95 rule; about 81.86% from the normal distribution.",
    "solution": "52 is two standard deviations below the mean and 82 is one above. By the empirical rule, the area from −2σ to the mean is 95%/2 = 47.5%, and from the mean to +1σ is 68%/2 = 34%. Their sum is 81.5%. A normal-table calculation gives Φ(1) − Φ(−2) = 0.8413 − 0.0228 = 0.8185, about 81.85%; full precision gives 81.86%. State the approximation used.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Convert the bounds to z = −2 and z = 1.",
        "Add the appropriate regions or subtract cumulative probabilities.",
        "Give about 81.5% using the empirical rule, or about 81.85–81.86% using normal probabilities."
      ]
    }
  },
  "3ai": {
    "prompt": "A six-digit security code uses digits 0–9. Leading zeros and repetitions are allowed. How many codes end in zero?",
    "answer": "100,000",
    "solution": "The final digit is fixed at zero; each of the first five has 10 choices. Thus there are 10⁵ = 100000 codes.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 100000,
      "placeholder": "e.g. 100000",
      "hint": "Enter the number of codes, without thousands separators."
    }
  },
  "3aii": {
    "prompt": "A six-digit code uses digits 0–9, allowing leading zeros and repetition. How many codes contain the consecutive block 2018 in that order?",
    "answer": "300",
    "solution": "The four-digit block can start in position 1,2 or 3. In each case the remaining two digits have 10² = 100 choices. Two copies of 2018 cannot occur within six digits: overlapping copies would require a proper suffix of 2018 to equal a prefix, which none does. Therefore these three cases do not overlap, and total = 3 × 100 = 300.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 300,
      "placeholder": "e.g. 300",
      "hint": "Enter the number of distinct codes containing the consecutive block."
    }
  },
  "3b": {
    "prompt": "Find natural-number coefficients a,b,c,d if [(n + 3)!(n + 2)!]/[(n + 1)!(n + 1)!] = an³ + bn² + cn + d.",
    "answer": "a = 1, b = 7, c = 16, d = 12",
    "solution": "Cancel factorials to get (n + 3)(n + 2) × (n + 2) = (n + 3)(n + 2)². Expand: (n + 3)(n² + 4n + 4) = n³ + 7n² + 16n + 12. Compare coefficients.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        1,
        7,
        16,
        12
      ],
      "placeholder": "e.g. 1, 7, 16, 12",
      "hint": "Enter a,b,c,d, in that order."
    }
  },
  "4a": {
    "prompt": "Solve cos(2x) = −√3/2 for 0° ≤ x ≤ 360°. Give all x values in degrees.",
    "answer": "75°, 105°, 255°, 285°",
    "solution": "As x ranges from 0° to 360°, 2x ranges from 0° to 720°. Cosine is −√3/2 at 150°,210°,510°,570° in that interval. Divide each by 2 to obtain 75°,105°,255°,285°.",
    "answerCheck": {
      "kind": "number-set",
      "expected": [
        75,
        105,
        255,
        285
      ],
      "placeholder": "e.g. 75, 105, 255, 285",
      "hint": "Enter all four angles in degrees without degree signs, in any order."
    }
  },
  "4b": {
    "prompt": "Given cos A = y/2 and 0° < A < 90°, write sin(2A) in terms of y.",
    "answer": "sin(2A) = (y/2)√(4 − y²)",
    "solution": "Because A is acute, sin A is positive. Thus sin A = √(1 − y²/4) = √(4 − y²)/2. The double-angle formula gives sin2A = 2sinA cosA = 2[√(4 − y²)/2](y/2) = y√(4 − y²)/2. Here 0 < y < 2.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Take the positive square root for sin A.",
        "Apply sin2A = 2sinA cosA and simplify."
      ]
    }
  },
  "5a": {
    "prompt": "Verify that A(−2,1) lies on line m: 2x + 3y + 1 = 0.",
    "answer": "2(−2) + 3(1) + 1 = 0",
    "solution": "Substitute the coordinates into the line’s left side: −4 + 3 + 1 = 0. Since the equation is satisfied, A lies on m.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Substitute x = −2,y = 1.",
        "Show the result is zero and state that A lies on m."
      ]
    }
  },
  "5b": {
    "prompt": "Lines m: 2x + 3y + 1 = 0 and n: 2x + 3y − 51 = 0 are parallel. Find B, the point of n closest to A(−2,1).",
    "answer": "B = (6,13)",
    "solution": "The closest segment is perpendicular to n, whose normal vector is (2,3). Write B = (−2 + 2λ,1 + 3λ). Substituting in n gives 2(−2 + 2λ) + 3(1 + 3λ) − 51 = 0, so 13λ = 52 and λ = 4. Thus B = (6,13).",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        6,
        13
      ],
      "placeholder": "e.g. 6, 13",
      "hint": "Enter Bx, By, in that order."
    },
    "illustration": "p2-2018-parallel-lines"
  },
  "5c": {
    "prompt": "Two externally touching circles s,t lie between parallel lines m: 2x + 3y + 1 = 0 and n: 2x + 3y − 51 = 0 as shown. Line m touches s at A(−2,1) and n touches t at B(6,13), with AB perpendicular to both lines. Their radii have ratio s:t = 1:3. Find the equation of s.",
    "answer": "(x + 1)² + (y − 5/2)² = 13/4",
    "solution": "AB = √(8² + 12²) = 4√13. The centres lie on AB. If s has radius r, t has radius 3r, and external tangency gives AB = r + (r + 3r) + 3r = 8r. Hence r = √13/2. The small centre is one eighth of the way from A to B: (−2,1) + (8,12)/8 = (−1,5/2). Squared radius is 13/4, giving the stated equation.",
    "answerCheck": {
      "kind": "circle-equation",
      "centreX": -1,
      "centreY": 2.5,
      "radiusSquared": 3.25,
      "placeholder": "e.g. (x+1)^2+(y-5/2)^2=13/4",
      "hint": "Enter the equation in centre-radius form with both squared brackets."
    },
    "illustration": "p2-2018-touching-circles"
  },
  "6a": {
    "prompt": "In triangle ABC, a line through D on AB and E on AC is parallel to BC. Given AD:DB = s:t for positive integers s,t, prove AE:EC = s:t. Include a labelled diagram, givens, conclusion and construction.",
    "answer": "Parallel DE and BC imply AD/DB = AE/EC.",
    "solution": "Draw ABC with D on AB,E on AC and DE ∥ BC. Given AD/DB = s/t; prove AE/EC = s/t. Construct BE and CD. Triangles BDE and CDE have common base DE and equal heights because B,C lie on a line parallel to DE, so their areas are equal. Triangles ADE and BDE have bases AD,DB on the same line and common height from E, giving [ADE]/[BDE] = AD/DB. Similarly [ADE]/[CDE] = AE/EC using their bases on AC and common height from D. The equal denominators imply AD/DB = AE/EC = s/t.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Draw and label D,E with DE parallel to BC; state the givens and required ratio.",
        "Join BE and CD and justify equal areas BDE,CDE.",
        "Use common-height area ratios to equate AD/DB and AE/EC."
      ]
    },
    "illustration": "p2-2018-parallel-proof"
  },
  "6b": {
    "prompt": "In triangle ABC, ∠CAB = 90°, X lies on AB, Y on AC and Z on BC. AX = 4 cm, AY = 3 cm, AX:XB = 1:2, XY ∥ BC and XZ ∥ AC. Find BZ.",
    "answer": "10 cm",
    "solution": "AX:XB = 1:2 gives AB = 12 and BX = 8. By the parallel intercept theorem, AY:YC = 1:2, hence AC = 9. Pythagoras gives BC = √(12² + 9²) = 15. Since XZ ∥ AC, triangles BXZ and BAC are similar, with scale BX/BA = 8/12 = 2/3. Thus BZ = (2/3)(15) = 10 cm.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 10,
      "placeholder": "e.g. 10",
      "hint": "Enter BZ in centimetres."
    },
    "illustration": "p2-2018-right-triangle"
  },
  "7a": {
    "prompt": "A railing has nine vertical cylindrical bars A–I, each topped by a sphere. From A to E each sphere’s volume is 1.75 times the previous one. Sphere A has radius 3 cm. Find the sum of the volumes of spheres A–E, to the nearest cm³.",
    "answer": "2324 cm³",
    "solution": "Sphere A volume is (4/3)π3³ = 36π. The five volumes form a geometric series with ratio 1.75. Their sum is 36π(1.75⁵ − 1)/(1.75 − 1) ≈ 2324.2386 cm³, rounding to 2324 cm³. The multiplier 1.75 applies to volumes, not radii.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 2324,
      "placeholder": "e.g. 2324",
      "hint": "Enter the total volume to the nearest cubic centimetre."
    },
    "illustration": "p2-2018-railing"
  },
  "7bi": {
    "prompt": "A railing has nine vertical cylindrical bars A–I, each topped by a sphere. From A to E each sphere’s volume is 1.75 times the previous one. The surface area of sphere E can be taken as 503 cm². The combined height of bar E and its sphere is 1.2 m. Find the bar height in cm to 1 decimal place.",
    "answer": "107.3 cm",
    "solution": "Use 4πr² = 503, giving r ≈ 6.3267265 cm. The sphere contributes its diameter, about 12.653453 cm, to the total height of 120 cm. Thus the bar is 120 − 2r ≈ 107.346547 cm, rounding to 107.3 cm.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 107.3,
      "placeholder": "e.g. 107.3",
      "hint": "Enter the cylindrical bar height in centimetres to 1 decimal place."
    },
    "illustration": "p2-2018-railing"
  },
  "7bii": {
    "prompt": "Each railing bar has radius 1 cm. Bar A has volume 71.3π cm³, and bar E has height 107.3 cm from the previous calculation. The heights A–E form an arithmetic sequence. Find all five heights in cm.",
    "answer": "71.3, 80.3, 89.3, 98.3, 107.3 cm",
    "solution": "For bar A, V = πr²h gives 71.3π = π(1)²h, so hA = 71.3 cm. There are four equal steps from A to E, so the common difference is (107.3 − 71.3)/4 = 9 cm. Add 9 repeatedly to obtain the five listed heights. Retaining the unrounded E height and rounding each result to one decimal place gives the same list.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        71.3,
        80.3,
        89.3,
        98.3,
        107.3
      ],
      "placeholder": "e.g. 71.3, 80.3, 89.3, 98.3, 107.3",
      "hint": "Enter heights A,B,C,D,E in centimetres to 1 decimal place, in that order."
    },
    "illustration": "p2-2018-railing"
  },
  "7c": {
    "prompt": "Nine railing bars A–I of radius 1 cm stand between walls 1.5 m apart. There is a clear 20 cm gap from each wall to the nearest bar surface, and equal clear gaps between neighbouring bars. Find each inter-bar gap.",
    "answer": "11.5 cm",
    "solution": "The total width is 150 cm. The two wall gaps use 40 cm and the nine bar diameters use 9 × 2 = 18 cm. The remaining 150 − 40 − 18 = 92 cm is shared by eight gaps, so each is 92/8 = 11.5 cm. Adjacent bar centres are 13.5 cm apart.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 11.5,
      "placeholder": "e.g. 11.5",
      "hint": "Enter the clear gap between bar surfaces in centimetres."
    },
    "illustration": "p2-2018-railing"
  },
  "7d": {
    "prompt": "Adjacent railing bars A,B have heights 71.3 and 80.3 cm, radius 1 cm and a clear gap 11.5 cm. Sphere A has radius 3 cm; sphere B has 1.75 times its volume. Each sphere sits on top of its bar with its centre over the bar axis. Find the shortest straight rod joining the two sphere surfaces, in cm to 1 decimal place.",
    "answer": "10.0 cm",
    "solution": "The radius of B is rB = 3∛1.75 ≈ 3.6152134 cm. The horizontal centre separation is 11.5 + 2 = 13.5 cm. The vertical centre separation is (80.3 + rB) − (71.3 + 3) = 9 + rB − 3 ≈ 9.6152134 cm. Pythagoras gives the centre distance ≈ 16.5741464 cm. The shortest surface-to-surface segment lies on their centre line: length = centre distance − 3 − rB ≈ 9.958933 cm, rounding to 10.0 cm.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 10,
      "placeholder": "e.g. 10",
      "hint": "Enter the shortest rod length in centimetres to 1 decimal place."
    },
    "illustration": "p2-2018-rod"
  },
  "8ai": {
    "prompt": "Chocolate Crunch bar weights are normal with mean 4.64 g and standard deviation 0.12 g. A random sample of 10 independent bars is selected. Find P(4.6 < sample mean < 4.7).",
    "answer": "About 0.7972; normal-table rounded z values give about 0.7961.",
    "solution": "The sample mean has standard deviation 0.12/√10 ≈ 0.0379473 g. The bounds standardise to zL ≈ −1.05409 and zU ≈ 1.58114. Thus probability = Φ(1.58114) − Φ(−1.05409) ≈ 0.7971566. Rounding z to −1.05 and 1.58 before using the normal table gives 0.9429 − 0.1469 = 0.7960 (about 0.7961 using precise CDF values at those rounded cutoffs). Use the standard error of the mean, not 0.12 itself.",
    "answerCheck": {
      "kind": "numeric-alternatives",
      "expected": [
        0.7972,
        0.796,
        0.7961
      ],
      "tolerance": 0.0001,
      "placeholder": "e.g. 0.7972",
      "hint": "Enter a probability to 4 decimal places. Calculator 0.7972 and rounded-table values about 0.7960–0.7961 are accepted."
    }
  },
  "8aii": {
    "prompt": "Of 400 randomly surveyed people who had bought Chocolate Crunch, 324 liked it. Form a 95% confidence interval for the population proportion who like it, to 2 decimal places.",
    "answer": "[0.77,0.85]",
    "solution": "p̂ = 324/400 = 0.81. The approximate interval is p̂ ± 1.96√[p̂(1 − p̂)/400] = 0.81 ± 0.03844549, giving bounds 0.77155451 and 0.84844549. To two decimal places these are 0.77 and 0.85. The population is buyers of the bar, matching the sampling frame.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        0.77,
        0.85
      ],
      "placeholder": "e.g. 0.77, 0.85",
      "hint": "Enter lower, upper as proportions to 2 decimal places."
    }
  },
  "8bi": {
    "prompt": "Classify each confidence-interval statement as Always, Sometimes or Never true: (1) for fixed n,p̂, higher confidence gives a wider interval; (2) for fixed n, increasing p̂ increases its estimated standard error; (3) for fixed n, increasing p̂(1 − p̂) increases the estimated standard error; (4) for fixed p̂, increasing n increases the estimated standard error.",
    "answer": "Always, Sometimes, Always, Never",
    "solution": "For the usual nondegenerate normal-approximation interval, radius = z√[p̂(1 − p̂)/n]. (1) Higher confidence requires a larger z, so the interval widens. (2) p̂(1 − p̂) rises up to p̂ = 1/2 then falls, so increasing p̂ only sometimes raises the standard error. (3) With fixed n, taking the square root of a larger p̂(1 − p̂) gives a larger standard error. (4) Increasing n increases the denominator and reduces the standard error, so it never increases it. At degenerate p̂ = 0 or 1 the estimated standard error is zero; statement (1)’s usual strict-width comparison assumes a nonzero standard error.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use standard error √[p̂(1 − p̂)/n] and radius z times that error.",
        "Classify in order: Always, Sometimes, Always, Never.",
        "Explain the turning point at p̂ = 1/2 and the effect of n."
      ]
    },
    "illustration": "p2-2018-statements"
  },
  "8bii": {
    "prompt": "Find the maximum of p̂(1 − p̂) for 0 ≤ p̂ ≤ 1, using calculus or otherwise.",
    "answer": "1/4 at p̂ = 1/2",
    "solution": "Complete the square: p̂(1 − p̂) = 1/4 − (p̂ − 1/2)² ≤ 1/4. Equality holds at p̂ = 1/2. Alternatively the derivative 1 − 2p̂ vanishes there and the second derivative −2 confirms a maximum.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.25,
      "placeholder": "e.g. 0.25",
      "hint": "Enter the maximum value, as a fraction or decimal. Show why it is a maximum."
    }
  },
  "8biii": {
    "prompt": "Find the largest possible radius (margin of error) of an approximate 95% confidence interval for a population proportion with random sample size 800. Give the proportion to 5 decimal places.",
    "answer": "0.03465 (about 3.465 percentage points)",
    "solution": "Radius = 1.96√[p̂(1 − p̂)/800]. The product p̂(1 − p̂) is at most 1/4, attained at p̂ = 1/2. Thus maximum radius = 1.96√[(1/4)/800] ≈ 0.0346482323, or 0.03465 to five decimal places. This is the radius, not the full width.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.03465,
      "placeholder": "e.g. 0.03465",
      "hint": "Enter the radius as a proportion to 5 decimal places, not the full interval width."
    }
  },
  "8c": {
    "prompt": "In this exam model, a pension pays €20,000 immediately on retirement, then pays annually on that date for the next 25 years. Each payment is 1% larger than the preceding payment. Assuming annual interest 2.4%, find the fund required on retirement day, to the nearest cent.",
    "answer": "€440,132.40",
    "solution": "There are 26 payments in total, at times 0,1,…,25 years. The payment at year j is 20000(1.01)ʲ, with retirement-day value 20000(1.01/1.024)ʲ. These present values form a geometric series with first term 20000 and ratio q = 1.01/1.024. Sum j = 0 to 25: PV = 20000(1 − q²⁶)/(1 − q) ≈ 440132.401544. The fund required, including the immediate first payment, is €440132.40.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 440132.4,
      "placeholder": "e.g. 440132.4",
      "hint": "Enter the retirement-day fund to the nearest cent, without a currency symbol or thousands separator."
    }
  },
  "9a": {
    "prompt": "A crank OD of length 10 cm rotates about O, and a rod CD of length 30 cm connects it to a slider C on the horizontal line through O. In the depicted position D is above-left of O and ∠DCO = 15°. Find the acute ∠COD, to the nearest degree.",
    "answer": "51°",
    "solution": "By the sine rule in CDO, sin∠COD/30 = sin15°/10. Thus sin∠COD = 3sin15° ≈ 0.7764571. The depicted acute angle is arcsin(0.7764571) ≈ 50.9373°, rounding to 51°. The supplementary angle would describe a different configuration, excluded by the supplied drawing.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 51,
      "placeholder": "e.g. 51",
      "hint": "Enter the angle in degrees to the nearest whole number."
    },
    "illustration": "p2-2018-crank-angle"
  },
  "9bi": {
    "prompt": "A crank OD of length 10 cm rotates about O, and a rod CD of length 30 cm connects it to a slider C on the horizontal line through O. X is the fixed leftmost point of the crank circle on the horizontal line. Angle α is measured from OX to OD, starting with D at X (α = 0°), and f(α) = CX. State the period and range of f.",
    "answer": "Period 360°; range [10,30] cm",
    "solution": "One full revolution restores the mechanism to its initial position, so the period is 360°. When D is at the leftmost point X, CO = 40 and CX = 30. When D is at the rightmost point, CO = 20 and CX = 10. Intermediate positions vary continuously between these extremes. X is fixed, so f is not CO.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use a complete crank revolution for period 360°.",
        "Calculate both extreme distances from C to the fixed X.",
        "State the closed range [10,30] cm."
      ]
    },
    "illustration": "p2-2018-crank"
  },
  "9bii": {
    "prompt": "A crank OD of length 10 cm rotates about O, and a rod CD of length 30 cm connects it to a slider C on the horizontal line through O. X is the fixed leftmost point of the crank circle on the horizontal line. Angle α is measured from OX to OD, starting with D at X (α = 0°), and f(α) = CX. The table gives f(0°) = 30 cm. Complete the values at 90°,180°,270°,360°, to 2 decimal places where needed.",
    "answer": "18.28, 10, 18.28, 30 cm",
    "solution": "At 90° and 270°, OD is vertical. Right triangle CDO gives CO = √(30² − 10²) = √800, so CX = √800 − 10 ≈ 18.28427 cm. At 180°, D is the rightmost point, so CO = 30 − 10 = 20 and CX = 10. At 360° the starting position returns, giving 30.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        18.28,
        10,
        18.28,
        30
      ],
      "placeholder": "e.g. 18.28, 10, 18.28, 30",
      "hint": "Enter f(90°),f(180°),f(270°),f(360°), in centimetres."
    },
    "illustration": "p2-2018-crank-table"
  },
  "9biii": {
    "prompt": "A crank OD of length 10 cm rotates about O, and a rod CD of length 30 cm connects it to a slider C on the horizontal line through O. X is the fixed leftmost point of the crank circle on the horizontal line. Angle α is measured from OX to OD, starting with D at X (α = 0°), and f(α) = CX. Use the completed table to sketch f over 0° ≤ α ≤ 360° on paper.",
    "answer": "A smooth curve through (0,30),(90,18.28),(180,10),(270,18.28),(360,30).",
    "solution": "Plot the five table points. The distance decreases smoothly to its minimum at 180° and then increases symmetrically to 30 at 360°. The curve is symmetric about α = 180° with horizontal tangents at 0°,180°,360°. It is not exactly a cosine: in radians u = πα/180, f(α) = 10cosu + √(900 − 100sin²u) − 10.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Plot all five table points with angles in degrees.",
        "Draw a smooth trough-shaped curve, symmetric about 180°.",
        "Keep values between 10 and 30 cm."
      ]
    },
    "illustration": "p2-2018-crank-axes"
  },
  "9biv": {
    "prompt": "A crank OD of length 10 cm rotates about O, and a rod CD of length 30 cm connects it to a slider C on the horizontal line through O. X is the fixed leftmost point of the crank circle on the horizontal line. Angle α is measured from OX to OD, starting with D at X (α = 0°), and f(α) = CX. Compare the three supplied positions: Diagram 1 has C,D,O aligned with D at X; Diagram 2 has D above-left of O; Diagram 3 has D below-right of O. Which shows the greatest slider displacement for a 1° increase in α? Explain.",
    "answer": "Diagram 2, where the distance-versus-angle graph is steepest in magnitude among the illustrated positions.",
    "solution": "A fixed small angle change gives a displacement approximately equal to the magnitude of the graph gradient times that angle change. Diagram 1 is at an extreme slider position, where the curve has zero gradient. Diagram 2 lies on the steep descending section; Diagram 3 is on a less steep rising section. Thus the depicted position in Diagram 2 produces the largest movement of C. The comparison is between these depicted positions, not a claim that every point above the horizontal moves faster than every point below it.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Choose Diagram 2 from the three illustrated positions.",
        "Relate the small angle change to the magnitude of the distance graph’s slope.",
        "Explain why the aligned extreme in Diagram 1 gives very little displacement."
      ]
    },
    "illustration": "p2-2018-crank-positions"
  },
  "9c": {
    "prompt": "A different crank has radius OB = OX = r, with X its leftmost point on the horizontal line AO. AB = 36 cm, AX = 31 cm and ∠BAO = 10°. B lies on the crank circle above-left of O; ∠OBA is not a right angle. Find r to the nearest centimetre.",
    "answer": "7 cm",
    "solution": "AO = AX + XO = 31 + r. In triangle ABO, the cosine rule at A gives r² = 36² + (31 + r)² − 2(36)(31 + r)cos10°. Expanding cancels r² on both sides. Thus r[72cos10° − 62] = 2257 − 2232cos10°, giving r ≈ 6.61442272 cm. To the nearest centimetre r = 7. Do not apply Pythagoras to ABO: its angle at B is not 90°.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 7,
      "placeholder": "e.g. 7",
      "hint": "Enter the crank radius rounded to the nearest centimetre."
    },
    "illustration": "p2-2018-crank-new"
  }
};

export const realPaper2018p2: StudyPaper = {
  id: paperId, year: 2018, level: "Higher", paperNumber: 2, kind: "real", estimatedMinutes: 150,
  title: "2018 Higher Level Paper 2",
  description: "All nine questions ready onscreen with worked solutions and answer checks or guided self-checks.",
  questions: bookPaper.parts.map((part) => {
    const code = part.id.slice(paperId.length + 1);
    if (!content[code]) throw new Error(`Missing reviewed content for ${part.id}`);
    return { id: part.id, number: part.label.replace(/^Q/, "").replace("(", " ("), marks: null,
      topic: part.topicIds.includes("p2-circle") ? "Coordinate geometry · The circle" : part.topicIds.includes("p2-line") ? "Coordinate geometry · The line" : part.topicIds.includes("p2-probability") ? "Probability" : part.topicIds.includes("p2-statistics") ? "Statistics" : part.topicIds.includes("p2-trigonometry") ? "Trigonometry" : "Geometry, area and volume",
      ...content[code] };
  }),
};
