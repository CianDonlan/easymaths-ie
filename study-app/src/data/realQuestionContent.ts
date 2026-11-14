// Reviewed against the official 2025 Higher Level Paper 1 PDF, pages 4–29.
// These are authored study solutions, not official marking-scheme allocations.
export interface RealPartContent {
  intro: string;
  expression: string;
  answer: string;
  solution: string[];
  illustration?: "g-graph" | "web-table" | "web-orbitals" | "kayak-route" | "kayak-graphs" | "speed-table" | "speed-plot" | "dot-pattern" | "inverse-graph";
  selfCheck?: { placeholder: string; checks: string[] };
}

export const realPartContent: Record<string, RealPartContent> = {
  "lc-hl-2025-normal-p1-1a": {
    intro: "Solve the following inequality for x ∈ ℝ:",
    expression: "|x − 3| ≤ 12",
    answer: "−9 ≤ x ≤ 15",
    solution: [
      "An absolute value of at most 12 means −12 ≤ x − 3 ≤ 12.",
      "Add 3 to each part: −9 ≤ x ≤ 15.",
      "Both endpoints are included because the inequality uses ≤.",
    ],
  },
  "lc-hl-2025-normal-p1-1b": {
    intro: "Multiply out and simplify:",
    expression: "(4x − 10√x)(2x + 5√x − 7)",
    answer: "8x² − 78x + 70√x",
    solution: [
      "Multiply 4x by each term: 8x² + 20x√x − 28x.",
      "Multiply −10√x by each term: −20x√x − 50x + 70√x.",
      "The +20x√x and −20x√x terms cancel. Combine −28x and −50x to get 8x² − 78x + 70√x.",
    ],
  },
  "lc-hl-2025-normal-p1-1c": {
    intro: "(2x + 3) is a factor of 4x³ − 12x² − 7x + 30. Use this to find the three solutions to:",
    expression: "4x³ − 12x² − 7x + 30 = 0",
    answer: "x = −3/2, x = 2, x = 5/2 (in any order)",
    solution: [
      "Divide the cubic by its given factor (2x + 3). The quotient is 2x² − 9x + 10.",
      "Factor the quotient: 2x² − 9x + 10 = (2x − 5)(x − 2).",
      "So (2x + 3)(2x − 5)(x − 2) = 0. Set each factor to zero to get x = −3/2, 5/2, or 2.",
    ],
  },
  "lc-hl-2025-normal-p1-2ai": {
    intro: "For x ∈ ℝ, f(x) = 6 + x² + sin(4x). Find f′(x).",
    expression: "f(x) = 6 + x² + sin(4x)",
    answer: "f′(x) = 2x + 4cos(4x)",
    solution: [
      "The derivative of 6 is 0, and the derivative of x² is 2x.",
      "Use the chain rule: the derivative of sin(4x) is cos(4x) × 4.",
      "Therefore f′(x) = 2x + 4cos(4x).",
    ],
  },
  "lc-hl-2025-normal-p1-2aii": {
    intro: "For f(x) = 6 + x² + sin(4x), find the tangent to y = f(x) where x = 0. Give your answer in the form ax + by + c = 0, with integer coefficients.",
    expression: "f(x) = 6 + x² + sin(4x)",
    answer: "4x − y + 6 = 0",
    solution: [
      "At x = 0, f(0) = 6, so the point of contact is (0, 6).",
      "From part (i), f′(x) = 2x + 4cos(4x), so the gradient at x = 0 is f′(0) = 4.",
      "Use y − 6 = 4(x − 0). Rearranging gives 4x − y + 6 = 0.",
    ],
  },
  "lc-hl-2025-normal-p1-2bi": {
    intro: "The graph of g(x), defined for 0 ≤ x ≤ 4, is made of two line segments as shown. State the range of x for which g′(x) > 2.",
    expression: "g′(x) > 2",
    illustration: "g-graph",
    answer: "3 < x < 4",
    solution: [
      "From (0, 0) to (3, 1), the slope is (1 − 0)/(3 − 0) = 1/3.",
      "From (3, 1) to (4, 4), the slope is (4 − 1)/(4 − 3) = 3, which is greater than 2.",
      "The derivative is not defined at the corner x = 3 or at the endpoint x = 4, so the range is 3 < x < 4.",
    ],
  },
  "lc-hl-2025-normal-p1-2bii": {
    intro: "Using the same graph of g(x), find g(g(3)). Give your answer as a fraction.",
    expression: "g(g(3))",
    illustration: "g-graph",
    answer: "1/3",
    solution: [
      "The graph passes through (3, 1), so g(3) = 1.",
      "On the first line segment, from (0, 0) to (3, 1), g(x) = x/3. Therefore g(1) = 1/3.",
      "Hence g(g(3)) = g(1) = 1/3.",
    ],
  },
  "lc-hl-2025-normal-p1-2biii": {
    intro: "On the same axes as g(x), draw and label the inverse graph y = g⁻¹(x) for 0 ≤ x ≤ 4. Reflect g in the line y = x. Use the graph pad to place the three vertices and join its two straight segments.",
    expression: "g passes through (0, 0), (3, 1), and (4, 4)",
    illustration: "inverse-graph",
    answer: "g⁻¹ joins (0, 0) to (1, 3) to (4, 4) with straight segments, and is labelled g⁻¹(x).",
    solution: [
      "An inverse graph reflects the original graph in y = x, which swaps the x- and y-coordinates of every point.",
      "The original vertices (0, 0), (3, 1), and (4, 4) become (0, 0), (1, 3), and (4, 4).",
      "Join the reflected vertices with straight segments in that order and label the result g⁻¹(x). The graph pad checks the three vertices and their order; it does not assign an exam mark for drawing quality.",
    ],
  },
  "lc-hl-2025-normal-p1-3a": {
    intro: "For x ∈ ℝ, find f′(x). You do not need to simplify your answer.",
    expression: "f(x) = (3x⁵ − 4)²⁸",
    answer: "f′(x) = 420x⁴(3x⁵ − 4)²⁷",
    solution: [
      "Use the chain rule with outer function u²⁸ and inner function u = 3x⁵ − 4.",
      "The outer derivative is 28u²⁷ and the inner derivative is 15x⁴.",
      "Multiply them: f′(x) = 28(3x⁵ − 4)²⁷(15x⁴) = 420x⁴(3x⁵ − 4)²⁷.",
    ],
  },
  "lc-hl-2025-normal-p1-3b": {
    intro: "For x ∈ ℝ with x ≠ 3.5, find g′(x) and show that g has no local maximum or minimum points.",
    expression: "g(x) = 3/(2x − 7)",
    selfCheck: { placeholder: "Find the derivative, then explain why there are no local maximum or minimum points.", checks: ["Differentiate g(x).", "Explain the sign of g′(x) on the domain.", "Account for the excluded point x = 3.5."] },
    answer: "g′(x) = −6/(2x − 7)² < 0 everywhere in its domain, so g has no local maximum or minimum points.",
    solution: [
      "Write g(x) = 3(2x − 7)⁻¹. By the chain rule, g′(x) = −3(2x − 7)⁻² × 2 = −6/(2x − 7)².",
      "For every x in the domain, (2x − 7)² > 0. Hence g′(x) < 0 on both intervals of its domain and is never zero.",
      "The excluded value x = 3.5 is not a point on the graph. There are no stationary points or other points in the domain where a local maximum or minimum can occur.",
    ],
  },
  "lc-hl-2025-normal-p1-3c": {
    intro: "For constant k ∈ ℝ, use the integral to find k. Give your answer in the form ln(a)/b, where a and b are natural numbers.",
    expression: "∫₀ᵏ e^(5x) dx = 9",
    answer: "k = ln(46)/5",
    solution: [
      "An antiderivative of e^(5x) is e^(5x)/5.",
      "Evaluate the bounds: (e^(5k) − 1)/5 = 9, so e^(5k) − 1 = 45 and e^(5k) = 46.",
      "Take natural logarithms: 5k = ln(46), giving k = ln(46)/5.",
    ],
  },
  "lc-hl-2025-normal-p1-4a": {
    intro: "Write the complex number in the form a + bi, where a and b are real and i² = −1.",
    expression: "(2 + 3i)/(4 − 5i)",
    answer: "−7/41 + (22/41)i",
    solution: [
      "Multiply the numerator and denominator by the conjugate 4 + 5i.",
      "The denominator becomes (4 − 5i)(4 + 5i) = 16 + 25 = 41.",
      "The numerator is (2 + 3i)(4 + 5i) = 8 + 22i + 15i² = −7 + 22i. Divide by 41 to get −7/41 + (22/41)i.",
    ],
  },
  "lc-hl-2025-normal-p1-4b": {
    intro: "Use de Moivre’s theorem and the square of (cos θ + i sin θ) to prove the identity for any angle θ.",
    expression: "cos(2θ) = cos²θ − sin²θ",
    selfCheck: { placeholder: "Write the de Moivre expression, expand the square, then compare real parts.", checks: ["State de Moivre’s result for the square.", "Expand (cos θ + i sin θ)² using i² = −1.", "Equate the real parts to obtain the identity."] },
    answer: "The real parts of (cos θ + i sin θ)² = cos(2θ) + i sin(2θ) give cos(2θ) = cos²θ − sin²θ.",
    solution: [
      "By de Moivre’s theorem, (cos θ + i sin θ)² = cos(2θ) + i sin(2θ).",
      "Expanding the left side gives cos²θ + 2i sinθ cosθ + i²sin²θ = (cos²θ − sin²θ) + 2i sinθ cosθ.",
      "Equate real parts of the two expressions: cos(2θ) = cos²θ − sin²θ.",
    ],
  },
  "lc-hl-2025-normal-p1-4c": {
    intro: "Use de Moivre’s theorem to find two values of z satisfying the equation. Give each in c + di form with surds.",
    expression: "z⁶ = −64i",
    selfCheck: { placeholder: "Find two sixth roots in surd form and show why each works.", checks: ["Use modulus 2 for each sixth root.", "Choose two arguments whose sixth multiples give −π/2 modulo 2π.", "Write both answers in c + di form and verify their sixth powers."] },
    answer: "Two valid values are z = √2 + √2i and z = −√2 − √2i. Other pairs of distinct sixth roots can also be correct.",
    solution: [
      "Write −64i = 64(cos(−π/2) + i sin(−π/2)). A sixth root has modulus 64^(1/6) = 2 and argument −π/12 + kπ/3.",
      "Choose k = 1: the angle is π/4, giving z = 2(cos π/4 + i sin π/4) = √2 + √2i.",
      "Choose k = 4: the angle is 5π/4, giving z = −√2 − √2i. Both raise to −64i; any two distinct valid sixth roots meet the question.",
    ],
  },
  "lc-hl-2025-normal-p1-5a": {
    intro: "Write g(x) in the form a(x + h)² + k, where a, h and k are integers.",
    expression: "g(x) = 5x² + 20x − 12",
    answer: "g(x) = 5(x + 2)² − 32",
    solution: [
      "Factor 5 from the quadratic and linear terms: g(x) = 5(x² + 4x) − 12.",
      "Complete the square: x² + 4x = (x + 2)² − 4.",
      "So g(x) = 5[(x + 2)² − 4] − 12 = 5(x + 2)² − 32.",
    ],
  },
  "lc-hl-2025-normal-p1-5b": {
    intro: "For positive p, use log laws to write the expression in the form c + d ln p, where c and d are integers.",
    expression: "ln[(e³p)⁵]",
    answer: "15 + 5 ln p",
    solution: [
      "Use the power law: ln[(e³p)⁵] = 5ln(e³p).",
      "Use the product law: 5ln(e³p) = 5[ln(e³) + ln p].",
      "Since ln(e³) = 3, the result is 15 + 5 ln p.",
    ],
  },
  "lc-hl-2025-normal-p1-5c": {
    intro: "One solution of the simultaneous equations lies on the y-axis. Use this to find n.",
    expression: "2x − y = 7;   x² + y + 2y² = n",
    answer: "n = 91",
    solution: [
      "A point on the y-axis has x = 0. Substitute into 2x − y = 7 to obtain y = −7.",
      "Now substitute x = 0 and y = −7 into the second equation: n = 0² − 7 + 2(−7)².",
      "Therefore n = −7 + 98 = 91.",
    ],
  },
  "lc-hl-2025-normal-p1-6a": {
    intro: "Write the first three terms of the binomial expansion in descending powers of p, with each term simplified.",
    expression: "(2p + 3)⁷",
    answer: "128p⁷ + 1344p⁶ + 6048p⁵",
    solution: [
      "The first term is (2p)⁷ = 128p⁷.",
      "The second is C(7,1)(2p)⁶(3) = 7 × 64 × 3 p⁶ = 1344p⁶.",
      "The third is C(7,2)(2p)⁵(3²) = 21 × 32 × 9 p⁵ = 6048p⁵.",
    ],
  },
  "lc-hl-2025-normal-p1-6bi": {
    intro: "For positive constants m and r, the equation h(x) = 0 has exactly one solution. Use this to show that r = 9m.",
    expression: "h(x) = 6mx² − 4rx + 54m",
    selfCheck: { placeholder: "Use the discriminant condition for one repeated root, then apply positivity.", checks: ["Set the quadratic discriminant to zero.", "Simplify to r² = 81m².", "Use r > 0 and m > 0 to choose r = 9m."] },
    answer: "r = 9m",
    solution: [
      "For exactly one real solution, the discriminant must be zero: (−4r)² − 4(6m)(54m) = 0.",
      "This gives 16r² − 1296m² = 0, so r² = 81m².",
      "Because r and m are positive, take the positive square root: r = 9m.",
    ],
  },
  "lc-hl-2025-normal-p1-6bii": {
    intro: "Using r = 9m, find the single solution of h(x) = 0.",
    expression: "h(x) = 6mx² − 4rx + 54m",
    answer: "x = 3",
    solution: [
      "Substitute r = 9m: h(x) = 6mx² − 36mx + 54m.",
      "Factor: h(x) = 6m(x² − 6x + 9) = 6m(x − 3)².",
      "Since m > 0, h(x) = 0 exactly when x − 3 = 0, so x = 3.",
    ],
  },
  "lc-hl-2025-normal-p1-7ai": {
    intro: "A spider builds a web in stages. S(n) is the total length of silk in centimetres at Stage n; A(n) is the extra silk added at that stage. Use the table to show A(2) = 22 and find A(3).",
    expression: "A(2) = S(2) − S(1);   A(3) = S(3) − S(2)",
    illustration: "web-table",
    answer: "A(2) = 22 cm and A(3) = 28.2 cm",
    solution: [
      "A(2) = S(2) − S(1) = 37.8 − 15.8 = 22 cm.",
      "A(3) = S(3) − S(2) = 66 − 37.8 = 28.2 cm.",
      "The extra-silk row is therefore 15.8, 22, 28.2.",
    ],
  },
  "lc-hl-2025-normal-p1-7aii": {
    intro: "In the staged web model, A(1), A(2), A(3), … form an arithmetic sequence. Find an expression for A(n), where n is a natural number.",
    expression: "A(1) = 15.8,   A(2) = 22,   A(3) = 28.2",
    illustration: "web-table",
    answer: "A(n) = 6.2n + 9.6 cm",
    solution: [
      "The common difference is 22 − 15.8 = 6.2 cm; the next difference 28.2 − 22 confirms it.",
      "For an arithmetic sequence, A(n) = A(1) + (n − 1)d = 15.8 + 6.2(n − 1).",
      "Simplify to A(n) = 6.2n + 9.6 cm.",
    ],
  },
  "lc-hl-2025-normal-p1-7aiii": {
    intro: "Using the staged web model, find the extra length of silk at Stage 100.",
    expression: "A(n) = 6.2n + 9.6",
    answer: "A(100) = 629.6 cm",
    solution: [
      "Substitute n = 100 into A(n) = 6.2n + 9.6.",
      "A(100) = 6.2(100) + 9.6 = 620 + 9.6 = 629.6 cm.",
    ],
  },
  "lc-hl-2025-normal-p1-7aiv": {
    intro: "S(n) is the total silk needed at Stage n. Use the arithmetic-series sum, or another method, to show the formula.",
    expression: "S(n) = 3.1n² + 12.7n",
    selfCheck: { placeholder: "Sum A(1) through A(n) and simplify to the stated formula.", checks: ["Use A(1) = 15.8 and common difference 6.2.", "Apply S(n) = n[2a + (n−1)d]/2.", "Simplify to 3.1n² + 12.7n."] },
    answer: "S(n) = n[2(15.8) + (n−1)(6.2)]/2 = 3.1n² + 12.7n cm.",
    solution: [
      "The total silk at Stage n is the sum A(1) + A(2) + … + A(n).",
      "For an arithmetic sequence with first term 15.8 and difference 6.2, S(n) = n[2(15.8) + (n−1)(6.2)]/2.",
      "Inside the bracket, 31.6 + 6.2n − 6.2 = 6.2n + 25.4. Multiply by n/2 to get 3.1n² + 12.7n.",
    ],
  },
  "lc-hl-2025-normal-p1-7av": {
    intro: "Stage k is the first stage for which the total silk is more than 10 m. S(n) is in centimetres. Solve the boundary equation and find k.",
    expression: "S(n) = 3.1n² + 12.7n",
    answer: "k = 17",
    solution: [
      "Convert 10 m to 1000 cm and solve 3.1n² + 12.7n = 1000. The positive root is about 16.03.",
      "Stages are whole numbers, so check the adjacent stages: S(16) = 996.8 cm and S(17) = 1111.8 cm.",
      "Stage 17 is the first stage above 1000 cm, so k = 17.",
    ],
  },
  "lc-hl-2025-normal-p1-7bi": {
    intro: "In the second web model, the orbital lengths form a geometric sequence. O₁ is 0.5 cm and O₂ is 0.53 cm. Find O₃.",
    expression: "O₁ = 0.5 cm,   O₂ = 0.53 cm",
    illustration: "web-orbitals",
    answer: "O₃ = 0.5618 cm",
    solution: [
      "The common ratio is 0.53/0.5 = 1.06.",
      "Multiply the second term by the ratio: O₃ = 0.53 × 1.06 = 0.5618 cm.",
    ],
  },
  "lc-hl-2025-normal-p1-7bii": {
    intro: "The orbital lengths form a geometric sequence starting 0.5 cm, 0.53 cm, … . Write an expression for the total length of the first n orbitals.",
    expression: "O₁ = 0.5 cm,   common ratio = 1.06",
    illustration: "web-orbitals",
    selfCheck: { placeholder: "Use the finite geometric-series sum with first term 0.5 and ratio 1.06.", checks: ["Identify first term 0.5 and ratio 1.06.", "Use the finite geometric sum formula.", "Check that n = 1 gives 0.5 cm."] },
    answer: "T(n) = 0.5(1.06ⁿ − 1)/0.06 cm",
    solution: [
      "The first orbital is 0.5 cm and each following orbital is 1.06 times the previous one.",
      "The sum of the first n terms is T(n) = a(rⁿ − 1)/(r − 1).",
      "Substitute a = 0.5 and r = 1.06 to get T(n) = 0.5(1.06ⁿ − 1)/0.06 cm.",
    ],
  },
  "lc-hl-2025-normal-p1-7biii": {
    intro: "There are exactly 18 orbitals in each lap. Write an expression for the total length of the first k laps, where k is a natural number.",
    expression: "T(n) = 0.5(1.06ⁿ − 1)/0.06",
    illustration: "web-orbitals",
    selfCheck: { placeholder: "Work out how many orbitals are in k laps, then use T(n).", checks: ["There are 18k orbitals in k laps.", "Substitute n = 18k into the geometric sum.", "Keep the exponent 18k, not 18 + k."] },
    answer: "L(k) = 0.5(1.06^(18k) − 1)/0.06 cm",
    solution: [
      "Each lap contains 18 orbitals, so the first k laps contain 18k orbitals.",
      "Use the expression for the sum of the first n orbitals with n = 18k.",
      "Therefore L(k) = 0.5(1.06^(18k) − 1)/0.06 cm.",
    ],
  },
  "lc-hl-2025-normal-p1-8a": {
    intro: "A kayak normally costs €870. Its price is reduced by 15% in a sale, then Jacob gets a further 10% off the reduced price. What does he pay?",
    expression: "€870 → 15% off → another 10% off",
    answer: "€665.55",
    solution: [
      "After the sale reduction, the price is 870 × 0.85 = €739.50.",
      "The loyalty reduction is applied to this reduced price: 739.50 × 0.90 = €665.55.",
      "The two reductions are successive; adding 15% and 10% would give the wrong price.",
    ],
  },
  "lc-hl-2025-normal-p1-8b": {
    intro: "A paddle costs $95. Jacob expects €1 = $1.183, but the actual rate is €1 = $d. The paddle costs €1.02 more than he expected. Find d to three decimal places.",
    expression: "Expected euro cost = 95/1.183",
    answer: "d = 1.168",
    solution: [
      "At Jacob's expected rate, the euro cost is 95/1.183 ≈ €80.3043.",
      "At the actual rate, the euro cost is 95/d = 95/1.183 + 1.02 ≈ €81.3243.",
      "Rearrange: d = 95/(95/1.183 + 1.02) ≈ 1.168162, so d = 1.168 to three decimal places.",
    ],
  },
  "lc-hl-2025-normal-p1-8c": {
    intro: "Jacob kayaks from S to A, then runs from A to F. SA = 2 km, AF = 8 km; his kayak speed is 6 km/h and run speed is 12 km/h. Find the total time.",
    expression: "time = distance ÷ speed",
    illustration: "kayak-route",
    answer: "1 hour (60 minutes)",
    solution: [
      "Kayaking 2 km at 6 km/h takes 2/6 = 1/3 hour.",
      "Running 8 km at 12 km/h takes 8/12 = 2/3 hour.",
      "The total is 1/3 + 2/3 = 1 hour.",
    ],
  },
  "lc-hl-2025-normal-p1-8d": {
    intro: "Jacob kayaks directly from S to F at 6 km/h. SA = 2 km and AF = 8 km meet at a right angle. Find his time to the nearest minute.",
    expression: "SF² = SA² + AF²",
    illustration: "kayak-route",
    answer: "82 minutes (1 hour 22 minutes)",
    solution: [
      "By Pythagoras, SF = √(2² + 8²) = √68 km.",
      "At 6 km/h, the time is √68/6 hours, or 60√68/6 = 10√68 ≈ 82.462 minutes.",
      "To the nearest minute, this is 82 minutes, which is 1 hour 22 minutes.",
    ],
  },
  "lc-hl-2025-normal-p1-8ei": {
    intro: "B lies on AF with AB = x km, where 0 ≤ x ≤ 8. Jacob kayaks S to B at 6 km/h, then runs B to F at 12 km/h. Find an expression for the total time T in hours.",
    expression: "SA = 2 km; AF = 8 km; AB = x km",
    illustration: "kayak-route",
    selfCheck: { placeholder: "Write T(x) in hours and explain both distance terms.", checks: ["Find SB with Pythagoras.", "Express BF in terms of x.", "Divide each distance by the correct speed and add the times."] },
    answer: "T(x) = √(x² + 4)/6 + (8 − x)/12 hours, for 0 ≤ x ≤ 8.",
    solution: [
      "Triangle SAB is right-angled, so the kayaking distance is SB = √(x² + 2²) = √(x² + 4) km.",
      "The running distance is BF = AF − AB = 8 − x km.",
      "Add kayak time and run time: T(x) = √(x² + 4)/6 + (8 − x)/12 hours.",
    ],
  },
  "lc-hl-2025-normal-p1-8eii": {
    intro: "The minimum total time occurs at the one value of x in [0, 8] satisfying the given equation. Solve it for x to three decimal places.",
    expression: "T′(x) = x/[6√(x² + 4)] − 1/12 = 0",
    illustration: "kayak-route",
    answer: "x = 1.155 km",
    solution: [
      "Set x/[6√(x² + 4)] = 1/12 and multiply through to get 2x = √(x² + 4).",
      "Both sides are non-negative for x ∈ [0, 8], so squaring gives 4x² = x² + 4, then 3x² = 4.",
      "Use the positive root in the allowed interval: x = 2/√3 ≈ 1.154701, which is 1.155 km to three decimal places.",
    ],
  },
  "lc-hl-2025-normal-p1-8eiii": {
    intro: "Which of the four graph sketches could represent T(x) for 0 ≤ x ≤ 8? Justify your choice using the unique minimum and your answers for the two end routes.",
    expression: "T(0) = time via A;   T(8) = time directly to F",
    illustration: "kayak-graphs",
    selfCheck: { placeholder: "Choose A, B, C or D, then justify using the minimum and both endpoint times.", checks: ["Use T(0) = 1 hour from part (c).", "Use T(8) ≈ 1.374 hours from part (d).", "Allow exactly one stationary point, a minimum near x = 1.155."] },
    answer: "Graph D. It has one minimum, and its right endpoint is higher than its left endpoint.",
    solution: [
      "At x = 0, B = A, so T(0) = 1 hour from part (c). At x = 8, B = F, so T(8) = √68/6 ≈ 1.374 hours from part (d). Thus the graph ends higher than it starts.",
      "The only stationary point in [0, 8] is the minimum at x ≈ 1.155, near the left of the interval.",
      "Graph A has another turning point; B also has another turning point; C ends at about its starting height. Graph D shows one early minimum and a higher right endpoint.",
    ],
  },
  "lc-hl-2025-normal-p1-9ai": {
    intro: "For 40 ≤ c ≤ 120, fuel consumption F is modelled in litres per 10,000 km. Show that consumption is the same at 60 km/h and 110 km/h.",
    expression: "F(c) = 0.05c² − 8.5c + 800",
    selfCheck: { placeholder: "Calculate F(60) and F(110), showing both substitutions.", checks: ["Substitute c = 60 into F(c).", "Substitute c = 110 into F(c).", "State the common value and its units."] },
    answer: "F(60) = F(110) = 470 litres per 10,000 km.",
    solution: [
      "F(60) = 0.05(60²) − 8.5(60) + 800 = 180 − 510 + 800 = 470.",
      "F(110) = 0.05(110²) − 8.5(110) + 800 = 605 − 935 + 800 = 470.",
      "Both speeds give 470 litres per 10,000 km in this model.",
    ],
  },
  "lc-hl-2025-normal-p1-9aii": {
    intro: "Find the rate of change of fuel consumption with respect to speed.",
    expression: "F(c) = 0.05c² − 8.5c + 800;   find dF/dc",
    answer: "dF/dc = 0.1c − 8.5",
    solution: [
      "Differentiate each term with respect to c.",
      "The derivative of 0.05c² is 0.1c; the derivative of −8.5c is −8.5; the constant 800 differentiates to zero.",
      "Therefore dF/dc = 0.1c − 8.5.",
    ],
  },
  "lc-hl-2025-normal-p1-9aiii": {
    intro: "During part of the journey, c = 78 + 9ln(t²), where t is in minutes and 1 ≤ t ≤ 10. Use dF/dc from the previous part to find its value at t = 7, to one decimal place.",
    expression: "dF/dc = 0.1c − 8.5",
    answer: "dF/dc = 2.8 at t = 7",
    solution: [
      "At t = 7, c = 78 + 9ln(7²) = 78 + 9ln(49) ≈ 113.0264 km/h.",
      "Substitute into dF/dc = 0.1c − 8.5: 0.1(113.0264) − 8.5 ≈ 2.80264.",
      "To one decimal place, dF/dc = 2.8.",
    ],
  },
  "lc-hl-2025-normal-p1-9aiv": {
    intro: "Show that the rate of change of the car's speed with respect to time is dc/dt = 18/t for 1 ≤ t ≤ 10.",
    expression: "c = 78 + 9ln(t²)",
    selfCheck: { placeholder: "Differentiate c with respect to t, showing the logarithm step.", checks: ["Differentiate the constant 78.", "Use the chain rule on ln(t²), or rewrite it as 2ln t since t > 0.", "Simplify to 18/t."] },
    answer: "dc/dt = 18/t",
    solution: [
      "Because t ≥ 1, ln(t²) = 2ln t.",
      "So c = 78 + 18ln t. Differentiate: dc/dt = 0 + 18/t.",
      "Equivalently, the chain rule gives 9 × (2t/t²) = 18/t.",
    ],
  },
  "lc-hl-2025-normal-p1-9av": {
    intro: "Use the previous two results to find the rate of change of fuel consumption with respect to time at t = 7 minutes. Give units of (litres per 10,000 km) per minute.",
    expression: "dF/dt = (dF/dc)(dc/dt)",
    answer: "Approximately 7.2 (litres per 10,000 km) per minute",
    solution: [
      "By the chain rule, dF/dt = (dF/dc)(dc/dt).",
      "At t = 7, dF/dc ≈ 2.80264 and dc/dt = 18/7 ≈ 2.57143 km/h per minute.",
      "Multiply: dF/dt ≈ 2.80264 × 18/7 ≈ 7.2068, or about 7.2 (litres per 10,000 km) per minute. Using 2.8 from part (iii) also gives 7.2 to one decimal place.",
    ],
  },
  "lc-hl-2025-normal-p1-9bi": {
    intro: "For the first eight seconds, speed v(t) follows the piecewise model below. Find the four missing table values at t = 1, 3, 5 and 6 seconds, in that order, to one decimal place.",
    expression: "v(t) = 8e^(0.4t) − 8 for 0 ≤ t ≤ 4;   v(t) = −t² + 24t − 48.4 for 4 < t ≤ 8",
    illustration: "speed-table",
    answer: "v(1) = 3.9, v(3) = 18.6, v(5) = 46.6, v(6) = 59.6 km/h",
    solution: [
      "Use 8e^(0.4t) − 8 for t = 1 and 3: v(1) ≈ 3.9346 → 3.9; v(3) ≈ 18.5609 → 18.6.",
      "Use −t² + 24t − 48.4 for t = 5 and 6: v(5) = 46.6; v(6) = 59.6.",
      "The completed row for t = 0, 1, …, 8 is 0, 3.9, 9.8, 18.6, 31.6, 46.6, 59.6, 70.6, 79.6 km/h.",
    ],
  },
  "lc-hl-2025-normal-p1-9bii": {
    intro: "Draw the graph of speed v(t) against time t for 0 ≤ t ≤ 8 seconds using the values from your table.",
    expression: "Time: 0–8 seconds;   speed: 0–80 km/h",
    illustration: "speed-plot",
    selfCheck: { placeholder: "Describe your plotted graph, then compare it with the worked solution.", checks: ["Plot each table pair with time on the horizontal axis and speed on the vertical axis.", "Show a rising curve from (0, 0) to approximately (8, 79.6).", "Include the intermediate points; the graph becomes less steep near t = 8."] },
    answer: "A rising speed–time curve through (0, 0), (1, 3.9), (2, 9.8), (3, 18.6), (4, 31.6), (5, 46.6), (6, 59.6), (7, 70.6), (8, 79.6).",
    solution: [
      "Complete the table first, then plot its nine points on axes with t from 0 to 8 seconds and v from 0 to 80 km/h.",
      "Join the points with a smooth increasing curve. Near t = 4, the second formula gives 31.6 km/h, close to the first formula's 31.624… km/h.",
      "Use the graph pad above to preview your points. Compare the point positions and overall shape with your own sketch; the pad does not grade a drawn curve.",
    ],
  },
  "lc-hl-2025-normal-p1-9biii": {
    intro: "Use integration of the second speed formula to find Dani's average speed over 4 < t ≤ 8 seconds. Give your answer in km/h to one decimal place.",
    expression: "v(t) = −t² + 24t − 48.4",
    answer: "58.3 km/h",
    solution: [
      "The average value over [4, 8] is (1/(8 − 4))∫₄⁸ (−t² + 24t − 48.4) dt.",
      "An antiderivative is −t³/3 + 12t² − 48.4t. Evaluating from 4 to 8 gives 233.0667.",
      "Divide by 4 seconds: 58.2667 km/h, or 58.3 km/h to one decimal place.",
    ],
  },
  "lc-hl-2025-normal-p1-10a": {
    intro: "Pattern 1 contains the integer-coordinate points one unit from the origin. Each next pattern contains every integer-coordinate point one unit from a point in the previous pattern. Nine dots of Pattern 4 are given. Add exactly the missing dots.",
    expression: "Complete Pattern 4 on the coordinate grid.",
    illustration: "dot-pattern",
    answer: "Pattern 4 has 25 dots: every integer point with |x| + |y| ≤ 4 and x + y even. Sixteen dots must be added to the nine shown.",
    solution: [
      "At each step, move one unit horizontally or vertically from each point in the previous pattern; duplicate destinations make only one dot.",
      "Pattern 4 contains the 16 points with |x| + |y| = 4, the 8 points with |x| + |y| = 2, and the origin. That is 25 dots in total.",
      "The grid above begins with the same nine dots as the paper. Add the other sixteen and use Check pattern; extra points are counted as incorrect.",
    ],
  },
  "lc-hl-2025-normal-p1-10b": {
    intro: "Pattern 2000 contains four points exactly 2000 units from the origin. Write their coordinates.",
    expression: "Distance from (0, 0) = 2000",
    answer: "(2000, 0), (−2000, 0), (0, 2000), (0, −2000), in any order",
    solution: [
      "The farthest points on the horizontal axis are reached by moving 2000 steps right or left: (2000, 0) and (−2000, 0).",
      "Likewise, 2000 steps up or down give (0, 2000) and (0, −2000).",
      "These are the only four axis points at that distance in Pattern 2000.",
    ],
  },
  "lc-hl-2025-normal-p1-10c": {
    intro: "What is the smallest natural number n for which (4, 4) belongs to Pattern n? Do not rely on the Pattern 4 diagram.",
    expression: "Target point: (4, 4)",
    answer: "n = 8",
    solution: [
      "Each step changes one coordinate by one, so at least |4| + |4| = 8 steps are needed from (0, 0).",
      "Eight steps suffice: move four units right and four units up, in any order.",
      "The point first appears in Pattern 8, so n = 8.",
    ],
  },
  "lc-hl-2025-normal-p1-10di": {
    intro: "Rearrange the equation to write n in terms of t.",
    expression: "t = 2n + 1",
    selfCheck: { placeholder: "Write n in terms of t, then check by substituting it back.", checks: ["Subtract 1 from both sides.", "Divide both sides by 2.", "Substitute your expression into 2n + 1 to check that it gives t."] },
    answer: "n = (t − 1)/2",
    solution: [
      "Start with t = 2n + 1 and subtract 1: t − 1 = 2n.",
      "Divide by 2 to get n = (t − 1)/2.",
    ],
  },
  "lc-hl-2025-normal-p1-10dii": {
    intro: "Given Q(n) = (n + 1)²/(2n + 1)², substitute n = (t − 1)/2 and show that Q(n) = (t² + 2t + 1)/(4t²).",
    expression: "Q(n) = (n + 1)²/(2n + 1)²",
    selfCheck: { placeholder: "Show the substitution and simplify numerator and denominator.", checks: ["Use n + 1 = (t + 1)/2.", "Use 2n + 1 = t.", "Expand (t + 1)² after simplifying the fraction."] },
    answer: "Q(n) = (t + 1)²/(4t²) = (t² + 2t + 1)/(4t²)",
    solution: [
      "Substituting n = (t − 1)/2 gives n + 1 = (t + 1)/2 and 2n + 1 = t.",
      "Therefore Q(n) = [((t + 1)/2)²]/t² = (t + 1)²/(4t²).",
      "Expand the numerator: Q(n) = (t² + 2t + 1)/(4t²).",
    ],
  },
  "lc-hl-2025-normal-p1-10diii": {
    intro: "Find the limiting proportion Q∞ as t tends to infinity.",
    expression: "Q∞ = lim (t² + 2t + 1)/(4t²) as t → ∞",
    answer: "Q∞ = 1/4 = 0.25",
    solution: [
      "Divide numerator and denominator by t²: Q∞ = lim [1 + 2/t + 1/t²]/4.",
      "As t → ∞, both 2/t and 1/t² tend to zero.",
      "The limiting proportion is 1/4, or 0.25.",
    ],
  },
  "lc-hl-2025-normal-p1-10ei": {
    intro: "H(n) is the number of dots in Pattern n. How many dots are in Pattern 1?",
    expression: "H(1) = ?",
    answer: "H(1) = 4",
    solution: [
      "Pattern 1 has one dot at each point one unit from the origin: (1, 0), (−1, 0), (0, 1), and (0, −1).",
      "That is four dots, so H(1) = 4.",
    ],
  },
  "lc-hl-2025-normal-p1-10eii": {
    intro: "Use proof by induction to show H(n) = (n + 1)² for every natural number n, given the recurrence H(n + 1) = H(n) + 2n + 3.",
    expression: "H(1) = 4;   H(n + 1) = H(n) + 2n + 3",
    selfCheck: { placeholder: "Write a complete induction proof: base case, assumption, step, conclusion.", checks: ["Check the base case n = 1 using H(1) = 4.", "Assume H(k) = (k + 1)² for an arbitrary k ∈ ℕ.", "Use the recurrence to obtain H(k + 1) = (k + 2)².", "State the conclusion for all natural numbers."] },
    answer: "Base case H(1) = 4 = (1 + 1)²; induction step H(k + 1) = (k + 1)² + 2k + 3 = (k + 2)².",
    solution: [
      "Base case: H(1) = 4, and (1 + 1)² = 4, so the claim holds for n = 1.",
      "Inductive assumption: for an arbitrary k ∈ ℕ, suppose H(k) = (k + 1)².",
      "Using the recurrence, H(k + 1) = H(k) + 2k + 3 = (k + 1)² + 2k + 3 = k² + 4k + 4 = (k + 2)². This is the required form with n = k + 1.",
      "The base case and step prove H(n) = (n + 1)² for every n ∈ ℕ.",
    ],
  },
};
