import bookPaper from "./book2020p1.json";
import type { AnswerCheck, StudyPaper, StudyQuestion } from "../types";

const paperId = "lc-hl-2020-normal-p1";
type Content = Pick<StudyQuestion, "prompt" | "answer" | "solution"> & Partial<Pick<StudyQuestion, "expression" | "illustration" | "answerCheck" | "selfCheck">>;
const numeric = (expected: number, hint: string, tolerance?: number): AnswerCheck => ({ kind: "numeric", expected, tolerance, placeholder: `e.g. ${expected}`, hint });
const guided = (placeholder: string, checks: string[]) => ({ placeholder, checks });

// Source prompts and figures checked on printed pages 4–25. Solutions are
// authored explanations; individual marks and official scheme allocations are unverified.
const content: Record<string, Content> = {
  "1ai": {
    prompt: "f(x) = x² + 5x + p, where p is an integer with −3 ≤ p ≤ 8. Find p if x + 3 is a factor.",
    answer: "p = 6",
    solution: "By the factor theorem f(−3) = 0. Hence 9 − 15 + p = 0 and p = 6. This lies within the specified integer range, and f(x) = (x + 3)(x + 2).",
    answerCheck: numeric(6, "Enter p."),
  },
  "1aii": {
    prompt: "For f(x) = x² + 5x + p, with integer −3 ≤ p ≤ 8, find p when the two roots differ by 3.",
    answer: "p = 4",
    solution: "Let the roots be r and r + 3. Their sum is −5, so 2r + 3 = −5 and r = −4. The other root is −1, and their product p = (−4)(−1) = 4. Equivalently, the quadratic-formula root difference is √(25 − 4p) = 3, giving p = 4.",
    answerCheck: numeric(4, "Enter p, not either of the roots."),
  },
  "1aiii": {
    prompt: "Find both integer values p in −3 ≤ p ≤ 8 for which the graph of x² + 5x + p does not cross the x-axis.",
    answer: "p = 7 or p = 8",
    solution: "The discriminant is 25 − 4p. No crossing requires 25 − 4p ≤ 0; equality would mean touching the axis. Thus p ≥ 25/4 = 6.25. Since p is an integer no greater than 8, the two possibilities are 7 and 8. Neither gives equality, so both graphs actually stay strictly above the axis.",
    answerCheck: { kind: "number-set", expected: [7, 8], placeholder: "e.g. 7, 8", hint: "Enter both permitted integer values, in either order." },
  },
  "1b": {
    prompt: "Solve |2x + 5| − 1 ≤ 0 for real x.",
    answer: "−3 ≤ x ≤ −2",
    solution: "Rearrange to |2x + 5| ≤ 1. Thus −1 ≤ 2x + 5 ≤ 1. Subtract 5 and divide by positive 2 to obtain −3 ≤ x ≤ −2. Both boundary values are included.",
    answerCheck: { kind: "interval", minimum: -3, maximum: -2, placeholder: "e.g. [-3, -2]", hint: "Enter the closed interval or an equivalent chained inequality." },
  },
  "2a": {
    prompt: "Find z₁ and z₂ satisfying iz₁ = −4 + 3i and 3z₁ − z₂ = 11 + 17i, with i² = −1. Give each in a + bi form.",
    answer: "z₁ = 3 + 4i, z₂ = −2 − 5i",
    solution: "Multiply the first equation by −i: z₁ = (−i)(−4 + 3i) = 3 + 4i. Rearrange the second equation to z₂ = 3z₁ − 11 − 17i = 9 + 12i − 11 − 17i = −2 − 5i. Check by substituting both into the original equations.",
    answerCheck: { kind: "ordered-values", expected: [3, 4, -2, -5], placeholder: "e.g. 3, 4, -2, -5", hint: "Enter real(z₁), imaginary(z₁), real(z₂), imaginary(z₂), in that order. Write both complex numbers in full in your workings." },
  },
  "2bi": {
    prompt: "The first two terms of a geometric sequence are 3 + 2i and 5 − i. Find the common ratio r in a + bi form.",
    answer: "r = 1 − i",
    solution: "Divide the second term by the first: r = (5 − i)/(3 + 2i). Multiply top and bottom by 3 − 2i to get (13 − 13i)/13 = 1 − i. Indeed (3 + 2i)(1 − i) = 5 − i.",
    answerCheck: { kind: "complex-pair", real: 1, imaginary: -1, placeholder: "e.g. 1-i", hint: "Enter the ratio as one complex number." },
  },
  "2bii": {
    prompt: "For the geometric sequence beginning 3 + 2i, 5 − i, use de Moivre’s theorem to find T₉ in a + bi form.",
    answer: "T₉ = 48 + 32i",
    solution: "The common ratio is 1 − i = √2[cos(−π/4) + i sin(−π/4)]. By de Moivre, r⁸ = (√2)⁸[cos(−2π) + i sin(−2π)] = 16. The ninth term is T₉ = (3 + 2i)r⁸ = 48 + 32i. Use exponent 8 because the first term has exponent zero.",
    selfCheck: guided("Show the polar ratio, its eighth power by de Moivre, and the ninth term.", ["Use modulus √2 and argument −π/4 for r.", "Apply de Moivre to obtain r⁸ = 16.", "Multiply the first term by r⁸, giving 48 + 32i."]),
  },
  "3a": {
    prompt: "For f(x) = 6x − 5 and g(x) = (x + 5)/6, investigate whether f(g(x)) = g(f(x)).",
    answer: "Yes: both compositions equal x for every real x.",
    solution: "f(g(x)) = 6[(x + 5)/6] − 5 = x. In the other order, g(f(x)) = [(6x − 5) + 5]/6 = x. Hence the compositions are equal on ℝ; these functions are inverses of one another.",
    selfCheck: guided("Calculate both compositions separately and state your conclusion.", ["Show f(g(x)) = x.", "Show g(f(x)) = x.", "Conclude equality for all real x."]),
  },
  "3bi": {
    prompt: "The real variables satisfy y = 5x². For x > 0, rewrite this as log₅y = a + b log₅x and find a,b.",
    answer: "a = 1, b = 2",
    solution: "Take logarithms: log₅y = log₅5 + log₅(x²) = 1 + 2log₅x. Thus a = 1 and b = 2. The expression log₅x requires x > 0; this restriction matters even though the polynomial relation itself also permits negative x.",
    answerCheck: { kind: "ordered-values", expected: [1, 2], placeholder: "e.g. 1, 2", hint: "Enter a, b in that order." },
  },
  "3bii": {
    prompt: "Given y = 5x², find the real values of y for which log₅y = 2 + log₅((126/25)x − 1). All logarithm arguments must be positive.",
    answer: "y = 3125 or y = 1/5",
    solution: "Use 2 = log₅25 and combine the logarithms: y = 25[(126/25)x − 1] = 126x − 25. Together with y = 5x², this gives 5x² − 126x + 25 = 0 = (5x − 1)(x − 25). Thus x = 1/5 or 25. Their y values are 1/5 and 3125. At x = 1/5 the logarithm argument is 1/125 > 0; at x = 25 it is 125 > 0. Both are valid.",
    answerCheck: { kind: "number-set", expected: [3125, 1 / 5], placeholder: "e.g. 3125, 1/5", hint: "Enter both y values, not the corresponding x values." },
  },
  "4a": {
    prompt: "f(x) = x³ + kx² + 15x + 8. Given f′(3) = −12, show that k = −9.",
    illustration: "p1-2020-cubic-line",
    answer: "k = −9",
    solution: "Differentiate: f′(x) = 3x² + 2kx + 15. At x = 3 this is 27 + 6k + 15 = 42 + 6k. Set equal to −12: 6k = −54, so k = −9.",
    selfCheck: guided("Differentiate and use the given gradient.", ["Obtain f′(x) = 3x² + 2kx + 15.", "Use 42 + 6k = −12 to derive k = −9."]),
  },
  "4b": {
    prompt: "g is the line through both turning points of f(x) = x³ − 9x² + 15x + 8. Find the equation of g.",
    illustration: "p1-2020-cubic-line",
    answer: "g(x) = −8x + 23",
    solution: "Set f′(x) = 3x² − 18x + 15 = 3(x − 1)(x − 5) equal to zero. The turning points are (1,f(1)) = (1,15) and (5,f(5)) = (5,−17). Their joining line has slope (−17 − 15)/(5 − 1) = −8. Using (1,15) gives y − 15 = −8(x − 1), or y = −8x + 23.",
    answerCheck: { kind: "line-equation", xCoefficient: 8, yCoefficient: 1, constant: -23, placeholder: "e.g. y=-8x+23", hint: "Enter an equation of the line. Show how you find both turning points." },
  },
  "4c": {
    prompt: "Show that g(x) = −8x + 23 contains the point of inflection of f(x) = x³ − 9x² + 15x + 8.",
    illustration: "p1-2020-cubic-line",
    answer: "The inflection point is (3,−1), and g(3) = −1.",
    solution: "f″(x) = 6x − 18, which changes sign at x = 3. Thus f has an inflection point there, with f(3) = 27 − 81 + 45 + 8 = −1. Since g(3) = −24 + 23 = −1, the line passes through the inflection point (3,−1).",
    selfCheck: guided("Locate and verify the inflection point, then test it in g.", ["Use f″ = 6x − 18 and its sign change at 3.", "Find f(3) = −1.", "Show g(3) also equals −1."]),
  },
  "5a": {
    prompt: "In this exam model, a €250,000 mortgage is repaid monthly over 25 years, with payments at each month’s end. The monthly interest rate is 0.287%. Find the fixed monthly repayment to the nearest cent.",
    expression: "R = Pi/[1 − (1 + i)^(−n)]",
    answer: "€1244.06 per month",
    solution: "Use principal P = 250,000, monthly rate i = 0.00287 and n = 25 × 12 = 300 payments. The amortisation formula gives R = 250,000(0.00287)/[1 − (1.00287)⁻³⁰⁰] ≈ 1244.063099. Round only at the end: €1244.06 per month. The supplied rate is already monthly, so do not divide it by 12 again.",
    answerCheck: numeric(1244.06, "Enter the monthly repayment in euro to 2 decimal places, without a currency symbol or thousands separator."),
  },
  "5b": {
    prompt: "A second mortgage has monthly repayments €1771 and monthly interest 0.3%. Immediately after the 132nd payment (11 years), 14 years remain. Write the first two and last two terms of the series of present values of all remaining payments, then find the payoff balance to the nearest cent.",
    answer: "1771/1.003 + 1771/1.003² + ⋯ + 1771/1.003¹⁶⁷ + 1771/1.003¹⁶⁸; balance €233,438.25",
    solution: "There are 14 × 12 = 168 payments left. The next is one month away and must be discounted once; the final one is 168 months away. Thus the series is 1771(1.003)⁻¹ + 1771(1.003)⁻² + ⋯ + 1771(1.003)⁻¹⁶⁷ + 1771(1.003)⁻¹⁶⁸. It is geometric, with first term 1771/1.003 and ratio 1/1.003. Its sum is 1771[1 − (1.003)⁻¹⁶⁸]/0.003 ≈ €233,438.254946, or €233,438.25. Use the stated remaining repayments; do not replace them with a newly calculated payment from the original principal.",
    selfCheck: guided("Write the discounted series and evaluate its geometric sum.", ["Include 168 future payments, with exponents 1,2,…,167,168.", "Discount the next payment once, not zero times.", "Obtain a payoff balance of €233,438.25."]),
  },
  "6a": {
    prompt: "Differentiate (3x − 5)(2x + 4) with respect to x from first principles.",
    answer: "12x + 2",
    solution: "First expand F(x) = 6x² + 2x − 20. From first principles, F′(x) = limₕ→₀ [F(x + h) − F(x)]/h. Expanding and subtracting gives numerator 12xh + 6h² + 2h. For h ≠ 0 divide by h to get 12x + 6h + 2. Taking h → 0 gives F′(x) = 12x + 2. Using only a differentiation rule would not show the requested first-principles argument.",
    selfCheck: guided("Show the difference quotient and the limit, not just the derivative.", ["Expand to 6x² + 2x − 20.", "Simplify the difference quotient to 12x + 6h + 2.", "Take h → 0 to obtain 12x + 2."]),
  },
  "6bi": {
    prompt: "For h(x) = (1/2)ln(2x + 3) + C, with constant C and x > −3/2, find h′(x).",
    answer: "h′(x) = 1/(2x + 3)",
    solution: "The chain rule gives h′(x) = (1/2)[2/(2x + 3)] + 0 = 1/(2x + 3). The constant differentiates to zero. The real logarithm requires 2x + 3 > 0.",
    selfCheck: guided("Differentiate the logarithm using the chain rule.", ["Include the inner derivative 2.", "Cancel the factor 1/2 to give 1/(2x + 3)."]),
  },
  "6bii": {
    prompt: "The area under h′(x) = 1/(2x + 3), above the x-axis from x = 0 to x = A > 0, is ln 3 square units. Find A.",
    illustration: "p1-2020-log-area",
    answer: "A = 12",
    solution: "The area is ∫₀ᴬ 1/(2x + 3) dx = (1/2)[ln(2A + 3) − ln3]. Set this equal to ln3. Multiply by 2 and combine logs: ln[(2A + 3)/3] = 2ln3 = ln9. Thus (2A + 3)/3 = 9, giving 2A + 3 = 27 and A = 12.",
    answerCheck: numeric(12, "Enter the positive upper limit A. Show the definite integral in your workings."),
  },
  "7ai": {
    prompt: "Triangular numbers are Tₙ = 1 + 2 + ⋯ + n. The first three are 1,3,6. Complete the table by giving the next five triangular numbers T₄ through T₈.",
    illustration: "p1-2020-triangular-table",
    answer: "10, 15, 21, 28, 36",
    solution: "Add the next integer at each stage: T₄ = 6 + 4 = 10, T₅ = 10 + 5 = 15, T₆ = 15 + 6 = 21, T₇ = 21 + 7 = 28 and T₈ = 28 + 8 = 36.",
    answerCheck: { kind: "ordered-values", expected: [10, 15, 21, 28, 36], placeholder: "e.g. 10, 15, 21, 28, 36", hint: "Enter only the five missing terms T₄,T₅,T₆,T₇,T₈, in order." },
  },
  "7aii": {
    prompt: "Using Tₙ = n(n + 1)/2, decide whether 1275 is a triangular number and justify your answer.",
    answer: "Yes: T₅₀ = 50 × 51 / 2 = 1275",
    solution: "Set n(n + 1)/2 = 1275, giving n² + n − 2550 = 0 = (n − 50)(n + 51). The positive integer solution n = 50 proves 1275 is triangular. Checking T₅₀ = 1275 provides the required reason.",
    selfCheck: guided("Find a positive integer n satisfying the triangular-number formula.", ["Solve n(n + 1)/2 = 1275.", "Give n = 50 and explicitly verify the value."]),
  },
  "7bi": {
    prompt: "Write n(n + 1)/2 + (n + 1) as a single fraction in simplest form.",
    answer: "(n + 1)(n + 2)/2",
    solution: "Use denominator 2: [n(n + 1) + 2(n + 1)]/2. Factor the numerator to get (n + 1)(n + 2)/2, which is Tₙ₊₁.",
    selfCheck: guided("Put both terms over denominator 2 and factor.", ["Use numerator n(n + 1) + 2(n + 1).", "Simplify to (n + 1)(n + 2)/2."]),
  },
  "7bii": {
    prompt: "Prove that the sum of any two consecutive triangular numbers is a square number.",
    answer: "Tₙ + Tₙ₊₁ = (n + 1)²",
    solution: "Use the two formulae: Tₙ + Tₙ₊₁ = n(n + 1)/2 + (n + 1)(n + 2)/2. Factor to get (n + 1)(2n + 2)/2 = (n + 1)². Since n + 1 is a natural number, the sum is a square number.",
    selfCheck: guided("Use the general formula rather than checking only examples.", ["Substitute the formulae for both consecutive terms.", "Simplify to (n + 1)².", "Explain why this is a square of a natural number."]),
  },
  "7biii": {
    prompt: "Two consecutive triangular numbers sum to 12,544. Find the smaller triangular number.",
    answer: "6216",
    solution: "For consecutive terms Tₙ,Tₙ₊₁, their sum is (n + 1)². Since √12544 = 112, we have n = 111. The smaller term is T₁₁₁ = 111 × 112/2 = 6216. The next is 6328, and their sum is 12544.",
    answerCheck: numeric(6216, "Enter the smaller triangular number, without a thousands separator."),
  },
  "7c": {
    prompt: "Numbers that are both triangular and square are given by Nₖ = [((3 + 2√2)ᵏ − (3 − 2√2)ᵏ)/(4√2)]². Use this formula to find N₃.",
    expression: "N₃ = [((3 + 2√2)³ − (3 − 2√2)³)/(4√2)]²",
    answer: "1225",
    solution: "Expand the cubes: (3 + 2√2)³ = 99 + 70√2 and (3 − 2√2)³ = 99 − 70√2. Their difference is 140√2. Divide by 4√2 to get 35, then square: N₃ = 35² = 1225. As a check, 1225 = 49 × 50/2, so it is also triangular.",
    answerCheck: numeric(1225, "Enter N₃. Remember the outer square in the formula."),
  },
  "7d": {
    prompt: "Prove by induction that 1² + 2² + ⋯ + n² = n(n + 1)(2n + 1)/6 for every positive integer n.",
    answer: "Base case n = 1; adding (k + 1)² to the assumed sum yields (k + 1)(k + 2)(2k + 3)/6.",
    solution: "For n = 1, both sides equal 1. Assume the formula holds for n = k. Add (k + 1)²: Sₖ₊₁ = k(k + 1)(2k + 1)/6 + (k + 1)² = (k + 1)[k(2k + 1) + 6(k + 1)]/6. The bracket is 2k² + 7k + 6 = (k + 2)(2k + 3). Thus Sₖ₊₁ = (k + 1)(k + 2)(2k + 3)/6, the required formula with n = k + 1. The base case and inductive step establish the result for all positive integers.",
    selfCheck: guided("Write the base case, assumption, inductive step and conclusion.", ["Verify n = 1.", "Add (k + 1)² to the assumed formula.", "Factor 2k² + 7k + 6 as (k + 2)(2k + 3).", "Identify the formula for k + 1 and state the induction conclusion."]),
  },
  "8ai": {
    prompt: "A rectangle centred at O(0,0) is inscribed in a circle of radius 5. Its first-quadrant vertex R makes angle θ with the positive x-axis, 0 ≤ θ ≤ π/2. Write R = (a cos θ,b sin θ) and find a,b.",
    illustration: "p1-2020-rectangle-circle",
    answer: "a = 5, b = 5",
    solution: "The radius OR is 5. Its horizontal component is x = 5cos θ and vertical component y = 5sin θ. Thus a = b = 5.",
    answerCheck: { kind: "ordered-values", expected: [5, 5], placeholder: "e.g. 5, 5", hint: "Enter a, b in that order." },
  },
  "8aii": {
    prompt: "For the rectangle inscribed in the radius-5 circle with R = (5cos θ,5sin θ), show its area is A(θ) = 50sin(2θ).",
    illustration: "p1-2020-rectangle-circle",
    answer: "A = (10cos θ)(10sin θ) = 50sin(2θ)",
    solution: "The full width is twice R's x-coordinate, 10cos θ, and the full height is 10sin θ. Their product is 100sin θ cos θ. Apply sin(2θ) = 2sin θ cos θ to get A(θ) = 50sin(2θ). Using just xy would give one quarter of the rectangle's area.",
    selfCheck: guided("Use the full width and height and apply the double-angle identity.", ["Double both coordinates to obtain the side lengths.", "Multiply to 100sin θ cos θ.", "Rewrite as 50sin(2θ)."]),
  },
  "8aiii": {
    prompt: "Use calculus to show that the rectangle of maximum area inscribed in the radius-5 circle is a square. Its area is A(θ) = 50sin(2θ) for 0 ≤ θ ≤ π/2.",
    illustration: "p1-2020-rectangle-circle",
    answer: "The maximum occurs at θ = π/4, where both side lengths equal 5√2.",
    solution: "A′(θ) = 100cos(2θ). In the interior of [0,π/2], A′ = 0 gives θ = π/4. A″(θ) = −200sin(2θ) is negative there, establishing a local maximum. The endpoint areas are zero, so this is also the global maximum. At π/4 the width and height are both 10/√2 = 5√2, so the rectangle is a square.",
    selfCheck: guided("Find and classify the stationary point and compare the side lengths there.", ["Use A′ = 100cos(2θ) to get θ = π/4.", "Verify a maximum and check the endpoint areas.", "Show both rectangle sides have the same length."]),
  },
  "8aiv": {
    prompt: "Find the greatest area of a rectangle inscribed in a circle of radius 5. Its area is A(θ) = 50sin(2θ).",
    answer: "50 square units",
    solution: "At the maximum θ = π/4, sin(2θ) = sin(π/2) = 1. Thus Amax = 50 square units. Equivalently the maximum-area square has side 5√2, whose square is 50.",
    answerCheck: numeric(50, "Enter the maximum area in square units."),
  },
  "8b": {
    prompt: "A 2 m tall person walks towards a 5 m streetlight at 1.5 m/s. Find the signed rate of change of the length x of their shadow on level ground.",
    illustration: "p1-2020-shadow",
    answer: "dx/dt = −1 m/s: the shadow shortens at 1 m/s",
    solution: "Let l be the distance from the light to the person. Similar triangles give 5/(l + x) = 2/x. Therefore 5x = 2l + 2x, so x = (2/3)l. Since the person approaches the light, dl/dt = −1.5 m/s. Differentiate: dx/dt = (2/3)(−1.5) = −1 m/s. This is the shadow's length change, not the speed of its far endpoint.",
    answerCheck: numeric(-1, "Enter the signed rate dx/dt in m/s. A shortening length has a negative derivative."),
  },
  "9ai": {
    prompt: "A bacterial colony is modelled by N(t) = 450e^(0.065t), with t in hours. Find the population after 4.5 hours, to the nearest whole bacterium.",
    answer: "603 bacteria",
    solution: "Substitute t = 4.5: N(4.5) = 450e^0.2925 ≈ 602.897731. The nearest whole number is 603.",
    answerCheck: numeric(603, "Enter the population rounded to the nearest whole number."),
  },
  "9aii": {
    prompt: "For N(t) = 450e^(0.065t), find how long the colony takes to reach 790 bacteria. Give hours to 1 decimal place.",
    answer: "8.7 hours",
    solution: "Set 450e^(0.065t) = 790. Taking logarithms gives 0.065t = ln(790/450), so t ≈ 8.658236 hours. To one decimal place this is 8.7 hours.",
    answerCheck: numeric(8.7, "Enter time in hours to 1 decimal place."),
  },
  "9b": {
    prompt: "Find the average population for N(t) = 450e^(0.065t) over 3 ≤ t ≤ 12 hours, to the nearest whole bacterium.",
    expression: "Average = (1/9)∫₃¹² 450e^(0.065t) dt",
    answer: "743 bacteria",
    solution: "Use the mean-value integral over the nine-hour interval: (1/9)(450/0.065)[e^(0.065t)]₃¹². This is 450[e^0.78 − e^0.195]/(9 × 0.065) ≈ 743.200984, rounding to 743. Averaging only the two endpoint populations would be a different calculation.",
    answerCheck: numeric(743, "Enter the average population as a whole number. Show the integral divided by 9."),
  },
  "9c": {
    prompt: "For N(t) = 450e^(0.065t), find its rate of change at t = 12, to 1 decimal place, and interpret it in context.",
    answer: "N′(12) ≈ 63.8 bacteria per hour; the population is increasing at that instantaneous rate.",
    solution: "Differentiate: N′(t) = 29.25e^(0.065t). At t = 12 this is 29.25e^0.78 ≈ 63.808064, or 63.8 bacteria per hour. After 12 hours, the model predicts the population is increasing at about 63.8 bacteria per hour at that instant. It is not the total population or a fixed increase over every future hour.",
    selfCheck: guided("Calculate the derivative value and explain its sign and units.", ["Obtain N′(t) = 29.25e^(0.065t).", "Calculate N′(12) ≈ 63.8.", "Interpret positive growth in bacteria per hour at 12 hours."]),
  },
  "9d": {
    prompt: "For N(t) = 450e^(0.065t), find the least natural-number hour k for which the growth rate N′(k) exceeds 90 bacteria per hour.",
    answer: "k = 18",
    solution: "Solve 29.25e^(0.065k) > 90. Taking logs gives k > ln(90/29.25)/0.065 ≈ 17.291232. The smallest integer satisfying the strict inequality is 18. Using N itself instead of N′ would test population rather than growth rate.",
    answerCheck: numeric(18, "Enter the least whole-number hour k."),
  },
  "9e": {
    prompt: "Two colonies start at the same time with models N(t) = 450e^(0.065t) and P(t) = 220e^(0.17t). When do their populations become equal? Give hours to the nearest whole hour.",
    answer: "7 hours",
    solution: "Equate the models and divide to get e^(0.105t) = 450/220. Thus t = ln(450/220)/0.105 ≈ 6.815429 hours, which rounds to 7 hours. The smaller initial colony catches up because its exponential growth constant is greater.",
    answerCheck: numeric(7, "Enter the equality time rounded to the nearest hour."),
  },
};

export const realPaper2020p1: StudyPaper = {
  id: paperId, year: 2020, level: "Higher", paperNumber: 1, kind: "real", estimatedMinutes: 150,
  title: "2020 Higher Level Paper 1",
  description: "All nine questions ready onscreen with worked solutions and answer checks or guided self-checks.",
  questions: bookPaper.parts.map((part) => {
    const code = part.id.slice(paperId.length + 1);
    if (!content[code]) throw new Error(`Missing reviewed content for ${part.id}`);
    return { id: part.id, number: part.label.replace(/^Q/, "").replace("(", " ("), marks: null,
      topic: part.topicIds.includes("p1-complex") ? "Complex numbers" : part.topicIds.includes("p1-calculus") ? "Functions and calculus" : part.topicIds.includes("p1-sequences") ? "Sequences and series" : part.topicIds.includes("p1-number") ? "Number and arithmetic" : part.topicIds.includes("p1-graphs") ? "Functions and graphs" : "Algebra",
      ...content[code] };
  }),
};
