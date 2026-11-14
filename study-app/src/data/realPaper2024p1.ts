import bookPaper from "./book2024p1.json";
import type { AnswerCheck, StudyPaper, StudyQuestion } from "../types";

const paperId = "lc-hl-2024-normal-p1";

const content: Record<string, {
  prompt: string;
  expression: string;
  answer: string;
  solution: string;
  answerCheck?: AnswerCheck;
  selfCheck?: StudyQuestion["selfCheck"];
  illustration?: StudyQuestion["illustration"];
}> = {
  "1a": {
    prompt: "Solve n − 3 = √(3n + 1) for n ∈ ℕ. Check your solutions in the original equation.",
    expression: "n − 3 = √(3n + 1)",
    answer: "n = 8",
    solution: "The square root is non-negative, so n − 3 must be non-negative. Squaring both sides gives (n − 3)² = 3n + 1, or n² − 9n + 8 = 0. Factor: (n − 1)(n − 8) = 0, giving candidates 1 and 8. Check the original equation: n = 1 gives −2 = 2, which is false; n = 8 gives 5 = √25, which is true. Hence n = 8 only.",
    answerCheck: { kind: "numeric", expected: 8, placeholder: "e.g. n = 8", hint: "Enter the value that satisfies the original equation. Squaring also produces a value that must be rejected." },
  },
  "1b": {
    prompt: "Write 4/(2t + 1) − 7/(12t) as one fraction in terms of t.",
    expression: "4/(2t + 1) − 7/(12t)",
    answer: "(34t − 7) / [12t(2t + 1)]",
    solution: "Use 12t(2t + 1) as a common denominator, with t ≠ 0 and t ≠ −1/2. Then 4/(2t + 1) = 48t/[12t(2t + 1)] and 7/(12t) = 7(2t + 1)/[12t(2t + 1)]. Subtract the numerators: 48t − 7(2t + 1) = 34t − 7. The single fraction is (34t − 7)/[12t(2t + 1)].",
    selfCheck: { placeholder: "Write your combined fraction and show the common denominator you used.", checks: ["Use 12t(2t + 1) or an equivalent common denominator.", "Expand the numerator as 48t − 7(2t + 1).", "Simplify the numerator to 34t − 7.", "Keep the expression as a single fraction."] },
  },
  "1c": {
    prompt: "Solve the simultaneous equations x + 2y = 143, y + 3w = −74, and 4x + 5w = 4, where x, y and w are integers.",
    expression: "x + 2y = 143;   y + 3w = −74;   4x + 5w = 4",
    answer: "x = 51, y = 46, w = −40",
    solution: "From the first two equations, x = 143 − 2y and w = (−74 − y)/3. Substitute into 4x + 5w = 4 and multiply by 3: 12(143 − 2y) + 5(−74 − y) = 12. This simplifies to 1346 − 29y = 12, so y = 46. Then x = 143 − 92 = 51 and w = (−74 − 46)/3 = −40. Check: 51 + 2(46) = 143, 46 + 3(−40) = −74, and 4(51) + 5(−40) = 4.",
    answerCheck: { kind: "ordered-values", expected: [51, 46, -40], placeholder: "e.g. 51, 46, -40", hint: "Enter x, y, w in that order, separated by commas." },
  },
  "2a": {
    prompt: "Find both complex solutions of z² + 12z + 261 = 0, giving each in a + bi form.",
    expression: "z² + 12z + 261 = 0",
    answer: "z = −6 + 15i or z = −6 − 15i",
    solution: "The discriminant is 12² − 4(261) = −900, so √(−900) = 30i. The quadratic formula gives z = (−12 ± 30i)/2 = −6 ± 15i. Both roots have real part −6 and opposite imaginary parts.",
    answerCheck: { kind: "complex-pair-set", expected: [{ real: -6, imaginary: 15 }, { real: -6, imaginary: -15 }], placeholder: "e.g. -6+15i; -6-15i", hint: "Enter both complex roots, separated by a semicolon or ‘and’. Either order works." },
  },
  "2b": {
    prompt: "Use de Moivre’s theorem to express (1 − √3 i)⁹ in a + bi form.",
    expression: "(1 − √3 i)⁹",
    answer: "−512 + 0i",
    solution: "The number 1 − √3 i has modulus 2 and argument −π/3. Thus 1 − √3 i = 2[cos(−π/3) + i sin(−π/3)]. By de Moivre’s theorem, its ninth power is 2⁹[cos(−3π) + i sin(−3π)] = 512(−1 + 0i) = −512 + 0i.",
    answerCheck: { kind: "complex-pair", real: -512, imaginary: 0, placeholder: "e.g. -512+0i", hint: "Enter the answer in a + bi form. The check reads the final complex value; show de Moivre’s steps in your workings." },
  },
  "2ci": {
    prompt: "On the Argand diagram with w = −2 + 2i already shown, plot and label u = 4[cos(π/6) + i sin(π/6)] as accurately as possible.",
    expression: "u = 4[cos(π/6) + i sin(π/6)]",
    illustration: "argand-2024",
    answer: "u = 2√3 + 2i, plotted near (3.46, 2) and labelled u",
    solution: "Convert to rectangular form: Re(u) = 4 cos(π/6) = 4(√3/2) = 2√3 ≈ 3.464, while Im(u) = 4 sin(π/6) = 4(1/2) = 2. Place a point near (3.46, 2) on the Argand plane and label it u. The diagram pad is for practice and does not grade placement.",
    answerCheck: { kind: "complex-pair", real: 2 * Math.sqrt(3), imaginary: 2, tolerance: 0.005, placeholder: "e.g. 3.464+2i", hint: "Enter a decimal a + bi value to check the coordinates. The diagram placement itself is ungraded; compare it with the solution." },
  },
  "2cii": {
    prompt: "The origin is o = 0 + 0i. Using w = −2 + 2i and u from part (i), find the angle ∠wou in exact radians.",
    expression: "arg(w) = 3π/4;   arg(u) = π/6",
    illustration: "argand-2024",
    answer: "7π/12 radians",
    solution: "The point w = −2 + 2i lies in quadrant II with argument 3π/4. The number u has argument π/6. Their smaller angular difference is 3π/4 − π/6 = 9π/12 − 2π/12 = 7π/12 radians.",
    answerCheck: { kind: "pi-multiple", expected: 7 / 12, placeholder: "e.g. 7π/12", hint: "Enter an exact multiple of π in radians, such as 7π/12 or 7pi/12." },
  },
  "3a": {
    prompt: "Find the indefinite integral of cos(6x) with respect to x.",
    expression: "∫ cos(6x) dx",
    answer: "(1/6)sin(6x) + C",
    solution: "Because d[sin(6x)]/dx = 6cos(6x), divide by 6 when integrating. Thus ∫ cos(6x) dx = (1/6)sin(6x) + C. Include the constant of integration for an indefinite integral.",
    selfCheck: { placeholder: "Write your antiderivative and check it by differentiating.", checks: ["Differentiate sin(6x) and account for the factor of 6.", "Use coefficient 1/6 before sin(6x).", "Include + C."] },
  },
  "3bi": {
    prompt: "For f(x) = 2x³ − 9x² + 5x − 11, find the equation of the tangent at x = 2. You may leave it unsimplified.",
    expression: "f(x) = 2x³ − 9x² + 5x − 11",
    answer: "y + 21 = −7(x − 2), or y = −7x − 7",
    solution: "First find the point: f(2) = 16 − 36 + 10 − 11 = −21. Differentiate to get f′(x) = 6x² − 18x + 5, then f′(2) = 24 − 36 + 5 = −7. The tangent through (2, −21) with slope −7 is y + 21 = −7(x − 2), or y = −7x − 7.",
    answerCheck: { kind: "line-equation", xCoefficient: 7, yCoefficient: 1, constant: 7, placeholder: "e.g. y+21=-7(x-2)", hint: "Enter the tangent in point-slope or simplified line form. Equivalent equations are accepted." },
  },
  "3bii": {
    prompt: "For f(x) = 2x³ − 9x² + 5x − 11, find the x-coordinate of its point of inflection.",
    expression: "f′′(x) = 12x − 18",
    answer: "x = 3/2 = 1.5",
    solution: "Differentiate twice: f′(x) = 6x² − 18x + 5 and f′′(x) = 12x − 18. At an inflection point f′′(x) = 0, so 12x − 18 = 0 and x = 18/12 = 3/2. Since the second derivative changes sign at 3/2, this is an inflection point.",
    answerCheck: { kind: "numeric", expected: 1.5, placeholder: "e.g. x = 1.5", hint: "Enter the x-coordinate as a fraction or decimal." },
  },
  "3c": {
    prompt: "The graph shows a curve p(x) and line l(x) for 0 ≤ x ≤ 10. Estimate the two x-values where p′(x) = l′(x). Show on the diagram where tangents to p are parallel to l.",
    expression: "l rises from (0, −3) to (10, 2), so l′(x) = 1/2",
    illustration: "tangent-graph-2024",
    answer: "Approximately x = 2.2 and x = 6.8",
    solution: "The line l has slope [2 − (−3)]/(10 − 0) = 1/2. Look for places on the curve p where a tangent would rise one unit for every two units to the right, matching that slope. One is on the early rising section near x = 2.2; the other is on the later flattening section near x = 6.8. These are estimates from a diagram, so compare the tangent directions rather than treating the x-values as exact algebraic roots.",
    selfCheck: { placeholder: "Estimate two x-values and describe the tangents you drew on p(x).", checks: ["Find the line’s slope as 1/2.", "Draw or identify two tangent lines to p parallel to l.", "Estimate one x-value near 2.2 and another near 6.8.", "Treat the values as graphical estimates, not exact roots."] },
  },
  "4a": {
    prompt: "Differentiate f(x) = x² − 7x − 10 from first principles with respect to x. Show the difference quotient and limit.",
    expression: "f′(x) = limₕ→₀ [f(x + h) − f(x)]/h",
    answer: "f′(x) = 2x − 7",
    solution: "Expand f(x + h) = (x + h)² − 7(x + h) − 10 = x² + 2xh + h² − 7x − 7h − 10. Subtract f(x) to get f(x + h) − f(x) = 2xh + h² − 7h. For h ≠ 0, divide by h to obtain 2x + h − 7. Taking the limit as h → 0 gives f′(x) = 2x − 7. The first-principles steps are essential here; the final derivative alone does not satisfy the question.",
    selfCheck: { placeholder: "Show f(x+h), simplify the difference quotient, then take the limit as h approaches zero.", checks: ["Expand f(x + h) correctly.", "Subtract f(x) to get 2xh + h² − 7h.", "Divide by h to obtain 2x + h − 7.", "Take the limit h → 0 and state f′(x) = 2x − 7."] },
  },
  "4b": {
    prompt: "For g(x) = (6x + 1)/(x⁴ + 3), find the value of g′(−2). Give the exact fraction.",
    expression: "g(x) = (6x + 1)/(x⁴ + 3)",
    answer: "g′(−2) = −238/361",
    solution: "Let u = 6x + 1 and v = x⁴ + 3. Then u′ = 6 and v′ = 4x³. By the quotient rule, g′(x) = [6(x⁴ + 3) − (6x + 1)(4x³)]/(x⁴ + 3)². At x = −2, u = −11, v = 19 and v′ = −32. Therefore g′(−2) = [6(19) − (−11)(−32)]/19² = (114 − 352)/361 = −238/361.",
    answerCheck: { kind: "numeric", expected: -238 / 361, placeholder: "e.g. -238/361", hint: "Enter the exact fraction −238/361. The checker compares its value; the paper prefers an exact fraction." },
  },
  "4c": {
    prompt: "A continuous function h has a local minimum at (0, 5). Is it true that h(x) must be at least 5 for every real x? Justify your answer.",
    expression: "Local minimum at (0, 5)",
    answer: "False. A local minimum only compares nearby values; values farther away can be below 5.",
    solution: "A local minimum at x = 0 means that h(x) ≥ 5 for all x sufficiently close to 0. It does not say that 5 is the lowest value over the whole real line. For a concrete continuous example, h(x) = 5 + x² − x⁴ has a local minimum of 5 at x = 0, but h(2) = 5 + 4 − 16 = −7 < 5. Thus the statement is false.",
    selfCheck: { placeholder: "State true or false and explain what 'local' tells you about values away from x = 0.", checks: ["State that the claim is false.", "Explain that a local minimum applies only near x = 0.", "Allow for a value less than 5 farther from x = 0, or give a valid continuous counterexample."] },
  },
  "5a": {
    prompt: "The first three terms of an arithmetic sequence are T₁ = 2p + 1, T₂ = 5p − 3, and T₃ = 6p + 7. Find p.",
    expression: "T₂ − T₁ = T₃ − T₂",
    answer: "p = 7",
    solution: "In an arithmetic sequence, consecutive differences are equal. Here T₂ − T₁ = (5p − 3) − (2p + 1) = 3p − 4, and T₃ − T₂ = (6p + 7) − (5p − 3) = p + 10. Set 3p − 4 = p + 10 to get 2p = 14, so p = 7.",
    answerCheck: { kind: "numeric", expected: 7, placeholder: "e.g. p = 7", hint: "Enter the value of p." },
  },
  "5b": {
    prompt: "A geometric sequence has G₇ = 6 and G₁₁ = 3/8. Find both real values of its common ratio r.",
    expression: "G₁₁ = G₇r⁴",
    answer: "r = −1/2 or r = 1/2",
    solution: "There are four ratio steps from the seventh to the eleventh term, so 6r⁴ = 3/8. Divide by 6: r⁴ = 1/16. Both r = 1/2 and r = −1/2 have fourth power 1/16. Include both real solutions.",
    answerCheck: { kind: "number-set", expected: [-0.5, 0.5], placeholder: "e.g. -1/2, 1/2", hint: "Enter both real common ratios, separated by a comma or 'or'. Either order works." },
  },
  "5ci": {
    prompt: "Let F₀(x) = x²⁰²⁴, and for n ≥ 1 let Fₙ be the derivative of Fₙ₋₁. Write F₁(x) and F₂(x).",
    expression: "F₀(x) = x²⁰²⁴;   Fₙ = dFₙ₋₁/dx",
    answer: "F₁(x) = 2024x²⁰²³; F₂(x) = 2024 × 2023x²⁰²²",
    solution: "Use the power rule once: F₁(x) = d(x²⁰²⁴)/dx = 2024x²⁰²³. Differentiate again: F₂(x) = 2024 × 2023x²⁰²². The coefficient in F₂ is the product 2024 × 2023, not a sum.",
    selfCheck: { placeholder: "Write both derivatives, keeping their coefficients and exponents clear.", checks: ["F₁ has coefficient 2024 and exponent 2023.", "F₂ has coefficient 2024 × 2023 and exponent 2022.", "Apply the power rule separately at each step."] },
  },
  "5cii": {
    prompt: "Starting from F₀(x) = x²⁰²⁴ and differentiating once to obtain each successive Fₙ, find the first n for which Fₙ(x) = 0.",
    expression: "Fₙ = dFₙ₋₁/dx",
    answer: "n = 2025",
    solution: "Each differentiation lowers the exponent by one until F₂₀₂₄ is the non-zero constant 2024!. The next derivative is zero. Therefore the first n with Fₙ(x) = 0 is n = 2025.",
    answerCheck: { kind: "numeric", expected: 2025, placeholder: "e.g. 2025", hint: "Enter the first index n for which the derivative is zero." },
  },
  "6a": {
    prompt: "For h(x) = x² + bx − 12, find b if x − 4 is a factor of h(x).",
    expression: "h(4) = 0",
    answer: "b = −1",
    solution: "By the Factor Theorem, x − 4 is a factor exactly when h(4) = 0. Substitute x = 4: 4² + 4b − 12 = 0, so 4 + 4b = 0 and b = −1. This gives h(x) = x² − x − 12 = (x − 4)(x + 3).",
    answerCheck: { kind: "numeric", expected: -1, placeholder: "e.g. b = -1", hint: "Enter the value of b." },
  },
  "6bi": {
    prompt: "For f(x) = e^(9x), find f(1.2) in the form a × 10ⁿ, where 1 ≤ a < 10 and a is correct to 1 decimal place.",
    expression: "f(1.2) = e^(9 × 1.2)",
    answer: "4.9 × 10⁴",
    solution: "Substitute x = 1.2: f(1.2) = e^(10.8) ≈ 49020.8. In scientific notation this is 4.90208… × 10⁴, so a = 4.9 to 1 decimal place and the required answer is 4.9 × 10⁴.",
    answerCheck: { kind: "scientific-notation", expected: [{ coefficient: 4.9, exponent: 4 }], placeholder: "e.g. 4.9 × 10^4", hint: "Enter scientific notation with a coefficient to 1 decimal place, such as 4.9 × 10^4." },
  },
  "6bii": {
    prompt: "For g(x) = ln(√x), x > 0, solve g(x) = 3.5. Give the answer in the form e^p.",
    expression: "ln(√x) = 3.5",
    answer: "x = e⁷",
    solution: "Use ln(√x) = ln(x^(1/2)) = (1/2)ln x. Therefore (1/2)ln x = 3.5, so ln x = 7. Exponentiate to get x = e⁷, which is in the requested form.",
    answerCheck: { kind: "exp-power", exponent: 7, placeholder: "e.g. e^7", hint: "Enter the exact exponential form e^7 or exp(7), not a decimal approximation." },
  },
  "6biii": {
    prompt: "For f(x) = e^(9x) and g(x) = ln(√x), simplify g(f(x)) as an expression in x.",
    expression: "g(f(x)) = ln(√(e^(9x)))",
    answer: "9x/2, or 4.5x",
    solution: "Substitute f(x) into g: g(f(x)) = ln(√(e^(9x))). Since e^(9x) is positive, its square root is e^(9x/2). The logarithm cancels the exponential, leaving g(f(x)) = 9x/2 = 4.5x.",
    answerCheck: { kind: "linear-expression", variable: "x", slope: 4.5, intercept: 0, placeholder: "e.g. 9x/2", hint: "Enter 9x/2 or 4.5x. This checks the simplified expression, not the algebra in your workings." },
  },
  "7a": {
    prompt: "Fiadh earns €54,000 gross annually. She pays 20% income tax on the first €40,000 and 40% on the remainder, with a €1,775 annual tax credit. With no other deductions, find her net annual pay.",
    expression: "Net pay = gross pay − gross tax + tax credit",
    answer: "€42,175",
    solution: "Tax on the first €40,000 is 0.20 × 40,000 = €8,000. Tax on the remaining €14,000 is 0.40 × 14,000 = €5,600, so gross tax is €13,600. The tax credit reduces this to €11,825. Net pay is €54,000 − €11,825 = €42,175.",
    answerCheck: { kind: "numeric", expected: 42175, placeholder: "e.g. 42175", hint: "Enter the net annual pay in euro, without the € sign or thousands separator." },
  },
  "7bi": {
    prompt: "A 25-year mortgage has monthly interest 0.279% and end-of-month repayments of €1,647.75. Write the present value of each of the first three repayments as a fraction, without multiplying out powers.",
    expression: "Monthly growth factor = 1 + 0.00279 = 1.00279",
    answer: "1647.75/1.00279, 1647.75/(1.00279)², 1647.75/(1.00279)³",
    solution: "A repayment one month from now is discounted by one monthly growth factor, 1.00279. The first present value is 1647.75/1.00279. The second is 1647.75/(1.00279)², and the third is 1647.75/(1.00279)³. Each payment occurs at the end of its month, so the powers are 1, 2 and 3.",
    selfCheck: { placeholder: "Write the first three present-value fractions and explain their powers.", checks: ["Convert 0.279% to 0.00279, giving growth factor 1.00279.", "Use 1647.75 as the numerator of each fraction.", "Use powers 1, 2 and 3 in the denominators, in that order.", "Leave the powers unmultiplied, as requested."] },
  },
  "7bii": {
    prompt: "Using the same 25-year mortgage, monthly rate 0.279% and end-of-month payment €1,647.75, find the amount borrowed to the nearest euro.",
    expression: "Present value of 300 monthly payments",
    answer: "€334,563",
    solution: "There are 25 × 12 = 300 monthly repayments. With i = 0.00279 and M = €1,647.75, the present value is M[1 − (1 + i)^(-300)]/i. Substitute to get 1647.75[1 − (1.00279)^(-300)]/0.00279 ≈ €334,562.61. The amount borrowed is €334,563 to the nearest euro.",
    answerCheck: { kind: "numeric", expected: 334563, placeholder: "e.g. 334563", hint: "Enter the amount borrowed to the nearest euro, without symbols or separators." },
  },
  "7ci": {
    prompt: "Savings follow F(t) = 5000e^(0.04t) euro. Use differentiation to find the rate of increase after 3.5 years, to the nearest euro per year.",
    expression: "F(t) = 5000e^(0.04t)",
    answer: "€230 per year",
    solution: "Differentiate with the chain rule: F′(t) = 5000(0.04)e^(0.04t) = 200e^(0.04t). At t = 3.5, F′(3.5) = 200e^0.14 ≈ €230.05 per year, so the rate is €230 per year to the nearest euro.",
    answerCheck: { kind: "numeric", expected: 230, placeholder: "e.g. 230", hint: "Enter the rate in euro per year, rounded to the nearest whole euro." },
  },
  "7cii": {
    prompt: "For F(t) = 5000e^(0.04t) euro, use integration to find the average amount in the account over the first five years. Give the answer to the nearest euro.",
    expression: "Average = (1/5) ∫₀⁵ F(t) dt",
    answer: "€5,535",
    solution: "The average value over 0 ≤ t ≤ 5 is (1/5)∫₀⁵ 5000e^(0.04t)dt. An antiderivative is (5000/0.04)e^(0.04t). Evaluating and dividing by 5 gives [5000/(5 × 0.04)](e^0.2 − 1) = 25,000(e^0.2 − 1) ≈ €5,535.07, so the average is €5,535. The checker reads only the final amount; include the integral in your workings.",
    answerCheck: { kind: "numeric", expected: 5535, placeholder: "e.g. 5535", hint: "Enter the average amount to the nearest euro. Show the integral in your workings." },
  },
  "7ciii": {
    prompt: "For F(t) = 5000e^(0.04t), find the annual effective rate of interest: the percentage increase over one year. Give it to 2 decimal places.",
    expression: "AER = [F(1)/F(0) − 1] × 100%",
    answer: "4.08%",
    solution: "The one-year growth factor is F(1)/F(0) = e^0.04 ≈ 1.0408108. Therefore the percentage increase is (e^0.04 − 1) × 100 ≈ 4.08108%, which is 4.08% to 2 decimal places.",
    answerCheck: { kind: "numeric", expected: 4.08, placeholder: "e.g. 4.08", hint: "Enter the percentage number to 2 decimal places, without the % sign." },
  },
  "8ai": {
    prompt: "A clothing company models daily t-shirt sales over 0 ≤ x ≤ 360 days by T(x) = ((x − 240)/60)³ + 70. Complete the table for x = 0, 60, 120, 180, 240, 300, 360, giving each value to the nearest whole number. The paper supplies T(60) = 43 and T(360) = 78. Find the five missing values in x order.",
    expression: "T(x) = ((x − 240)/60)³ + 70",
    answer: "T(0) = 6, T(120) = 62, T(180) = 69, T(240) = 70, T(300) = 71",
    solution: "Substitute each x into T(x). At x = 0, the bracket is −4, so T(0) = −64 + 70 = 6. At x = 120 it is −2, so T(120) = 62. At x = 180 it is −1, so T(180) = 69. At x = 240 it is 0, so T(240) = 70. At x = 300 it is 1, so T(300) = 71. The full table in x order is 6, 43, 62, 69, 70, 71, 78.",
    answerCheck: { kind: "ordered-values", expected: [6, 62, 69, 70, 71], placeholder: "e.g. 6, 62, 69, 70, 71", hint: "Enter only the five missing whole-number values, in order for x = 0, 120, 180, 240, 300." },
  },
  "8aii": {
    prompt: "Draw the graph of y = T(x) = ((x − 240)/60)³ + 70 for 0 ≤ x ≤ 360. Use the table values at x = 0, 60, 120, 180, 240, 300, 360, then join the points with a smooth curve.",
    expression: "x: 0, 60, 120, 180, 240, 300, 360;   T(x): 6, 43, 62, 69, 70, 71, 78",
    illustration: "tshirt-graph-2024",
    answer: "A smooth increasing cubic through (0, 6), (60, 43), (120, 62), (180, 69), (240, 70), (300, 71), (360, 78)",
    solution: "Plot all seven table points: (0, 6), (60, 43), (120, 62), (180, 69), (240, 70), (300, 71), and (360, 78). Join them with a smooth increasing cubic curve. The curve becomes almost flat near (240, 70), then rises again; do not join points with straight line segments. The graph pad is for practice and does not assess the drawing.",
    selfCheck: { placeholder: "Describe the seven points you plotted and how the curve passes through them.", checks: ["Plot all seven points at the table coordinates.", "Keep the graph increasing throughout the domain.", "Make the curve nearly flat around (240, 70).", "Join points smoothly, not with straight line segments."] },
  },
  "8b": {
    prompt: "Daily scarf sales are modelled by S(t) = 21 + 19 cos(2πt/365), where t ≥ 0 is days from 1 January 2024 and the angle is in radians. Find the maximum and minimum daily sales. You do not need differentiation.",
    expression: "S(t) = 21 + 19 cos(2πt/365)",
    answer: "Maximum = 40; minimum = 2",
    solution: "Cosine ranges from −1 to 1. The largest value of S is 21 + 19(1) = 40 and the smallest is 21 + 19(−1) = 2. These are the model's daily sales, with maximum first and minimum second.",
    answerCheck: { kind: "ordered-values", expected: [40, 2], placeholder: "e.g. 40, 2", hint: "Enter maximum, minimum in that order, separated by a comma." },
  },
  "8c": {
    prompt: "A second scarf-sales model is C(t) = S(t) − 2.4 + 0.03t. Find the value of t for which S(t) and C(t) predict the same daily sales.",
    expression: "C(t) = S(t) − 2.4 + 0.03t",
    answer: "t = 80 days",
    solution: "Set S(t) = C(t). The S(t) terms cancel, leaving −2.4 + 0.03t = 0. Therefore 0.03t = 2.4 and t = 2.4/0.03 = 80 days.",
    answerCheck: { kind: "numeric", expected: 80, placeholder: "e.g. 80", hint: "Enter the number of days t." },
  },
  "8d": {
    prompt: "Three candidate graphs J, K and L are shown for C(t) = S(t) − 2.4 + 0.03t over several years. Choose the correct graph and justify your choice using the function's shape and overall trend.",
    expression: "S(t) = 21 + 19 cos(2πt/365);   C(t) = S(t) − 2.4 + 0.03t",
    illustration: "scarf-choices-2024",
    answer: "Graph L: it oscillates because of the cosine term and rises overall because of +0.03t.",
    solution: "Graph L is the wavy graph whose peaks and troughs rise over time. The cosine part S(t) makes C(t) oscillate with a 365-day period. Adding the positive linear term 0.03t shifts that oscillation upward as t increases; subtracting 2.4 only shifts it down. J rises but has no oscillation, and K oscillates without the upward trend. Both features are needed for a complete justification.",
    selfCheck: { placeholder: "Write J, K or L and explain both the wave shape and the overall trend.", checks: ["Choose graph L.", "Connect the repeating wave to the cosine term in S(t).", "Explain that +0.03t gives a positive overall trend.", "Recognise that −2.4 is a fixed vertical shift."] },
  },
  "8e": {
    prompt: "The derivative of C is C′(t) = 0.03 − (38π/365)sin(2πt/365). Find the first t ≥ 0 for which C′(t) = 0, giving the first local maximum of C to the nearest day.",
    expression: "C′(t) = 0.03 − (38π/365)sin(2πt/365)",
    answer: "t = 5 days",
    solution: "Set 0.03 − (38π/365)sin(2πt/365) = 0, so sin(2πt/365) = 0.03(365)/(38π) ≈ 0.09185. The first positive solution is 2πt/365 = arcsin(0.09185) ≈ 0.09198 radians. Hence t ≈ 365(0.09198)/(2π) ≈ 5.34 days, which is 5 days to the nearest day. C′ starts positive at t = 0 and becomes negative after this root, so it is a local maximum.",
    answerCheck: { kind: "numeric", expected: 5, placeholder: "e.g. 5", hint: "Enter the first time to the nearest whole day. Use radians when applying inverse sine." },
  },
  "9a": {
    prompt: "A sphere of radius R has a cap of height k, where 0 < k ≤ R. Its volume is C = (πk²/3)(3R − k). Find C when R = 13 and k = 4, giving your answer in terms of π.",
    expression: "C = (πk²/3)(3R − k)",
    illustration: "sphere-cap-2024",
    answer: "560π/3 cubic units",
    solution: "Substitute R = 13 and k = 4 into the given formula: C = (π × 4²/3)[3(13) − 4] = (16π/3)(35) = 560π/3 cubic units. Keep π in the final answer, as requested.",
    answerCheck: { kind: "pi-multiple", expected: 560 / 3, placeholder: "e.g. 560π/3", hint: "Enter the exact volume as a multiple of π, such as 560π/3." },
  },
  "9bi": {
    prompt: "A different sphere has radius 8 units and a cap of height y units, with 0 < y ≤ 8. Its cap volume is 36πy cubic units. Use C = (πk²/3)(3R − k) to show that (y/3)(24 − y) = 36.",
    expression: "(πy²/3)(24 − y) = 36πy",
    answer: "(y/3)(24 − y) = 36",
    solution: "Set R = 8 and k = y in the cap formula: C = (πy²/3)(3 × 8 − y) = (πy²/3)(24 − y). The question gives C = 36πy, so (πy²/3)(24 − y) = 36πy. Since y > 0, divide both sides by πy to obtain (y/3)(24 − y) = 36. The substitution and division are needed to show the result.",
    selfCheck: { placeholder: "Show your substitution and the cancellation that gives the required equation.", checks: ["Substitute R = 8 and k = y in the cap formula.", "Set the result equal to 36πy.", "Use y > 0 to divide both sides by πy.", "Arrive at (y/3)(24 − y) = 36."] },
  },
  "9bii": {
    prompt: "Multiply out and solve (y/3)(24 − y) = 36 to find the height of the cap. Remember that 0 < y ≤ 8.",
    expression: "(y/3)(24 − y) = 36",
    answer: "y = 6 units",
    solution: "Multiply by 3: 24y − y² = 108. Rearrange to y² − 24y + 108 = 0 and factor as (y − 6)(y − 18) = 0. The algebra gives y = 6 or y = 18, but a cap height must satisfy 0 < y ≤ 8. Reject 18, so the height is 6 units.",
    answerCheck: { kind: "numeric", expected: 6, placeholder: "e.g. 6", hint: "Enter the valid cap height. The other quadratic root is outside 0 < y ≤ 8." },
  },
  "9c": {
    prompt: "The volume V(x) of a hemisphere with diameter x cm is V(x) = (π/12)x³ cm³. Find x when the volume is 3 litres, correct to 1 decimal place.",
    expression: "V(x) = (π/12)x³;   3 litres = 3000 cm³",
    answer: "x = 22.5 cm",
    solution: "Convert 3 litres to 3000 cm³. Then (π/12)x³ = 3000, so x³ = 36,000/π. Taking the positive cube root gives x = ∛(36,000/π) ≈ 22.5465 cm, which rounds to 22.5 cm to 1 decimal place.",
    answerCheck: { kind: "numeric", expected: 22.5, placeholder: "e.g. 22.5", hint: "Enter the diameter in cm to 1 decimal place." },
  },
  "9d": {
    prompt: "A hemisphere has volume V(x) = (π/12)x³ cm³, where x is its diameter in cm. Its volume increases at a constant rate of 450 cm³ per second. Find the rate at which x is increasing when x = 20 cm, in cm per second to 1 decimal place.",
    expression: "dV/dt = 450;   V(x) = (π/12)x³",
    answer: "dx/dt = 1.4 cm per second",
    solution: "Differentiate with respect to x: dV/dx = (π/4)x². By the chain rule, dV/dt = (dV/dx)(dx/dt), so dx/dt = 450/[(π/4)x²] = 1800/(πx²). At x = 20, dx/dt = 1800/(400π) = 4.5/π ≈ 1.432 cm per second. To 1 decimal place this is 1.4 cm per second.",
    answerCheck: { kind: "numeric", expected: 1.4, placeholder: "e.g. 1.4", hint: "Enter the rate in cm per second to 1 decimal place. Show the chain-rule step in your workings." },
  },
  "9e": {
    prompt: "The curved surface area S of a cone of radius r and height h is S = πr√(r² + h²). Rearrange to express h in terms of S, r and π, in the form √(S² − arⁿ)/(br), where a, b and n are constants.",
    expression: "S = πr√(r² + h²)",
    answer: "h = √(S² − π²r⁴)/(πr), where a = π², b = π, n = 4",
    solution: "Divide by πr: S/(πr) = √(r² + h²). Square both sides: S²/(π²r²) = r² + h². Subtract r² and put over a common denominator: h² = [S² − π²r⁴]/(π²r²). Since h is a non-negative height and r > 0, h = √(S² − π²r⁴)/(πr). Thus a = π², b = π and n = 4.",
    selfCheck: { placeholder: "Write the rearranged formula for h and show the main algebra steps.", checks: ["Divide by πr before squaring.", "Obtain S²/(π²r²) = r² + h².", "Rearrange to h² = [S² − π²r⁴]/(π²r²).", "Take the positive root and identify a = π², b = π, n = 4."] },
  },
  "10ai": {
    prompt: "A water spinach plant's height in mm during its first 35 days is modelled by W(x) = 0.667x + 1.5x² − 0.025x³, where x is days since growth began. Estimate its height after 15 days, to the nearest mm.",
    expression: "W(x) = 0.667x + 1.5x² − 0.025x³",
    answer: "263 mm",
    solution: "Substitute x = 15: W(15) = 0.667(15) + 1.5(15²) − 0.025(15³) = 10.005 + 337.5 − 84.375 = 263.13 mm. To the nearest millimetre, the estimated height is 263 mm.",
    answerCheck: { kind: "numeric", expected: 263, placeholder: "e.g. 263", hint: "Enter the height in millimetres, rounded to the nearest whole number." },
  },
  "10aii": {
    prompt: "For W(x) = 0.667x + 1.5x² − 0.025x³, write down W′(x).",
    expression: "W(x) = 0.667x + 1.5x² − 0.025x³",
    answer: "W′(x) = 0.667 + 3x − 0.075x²",
    solution: "Differentiate each term using the power rule: d(0.667x)/dx = 0.667, d(1.5x²)/dx = 3x, and d(−0.025x³)/dx = −0.075x². Therefore W′(x) = 0.667 + 3x − 0.075x².",
    answerCheck: { kind: "quadratic-expression", quadratic: -0.075, linear: 3, constant: 0.667, placeholder: "e.g. 0.667 + 3x - 0.075x^2", hint: "Enter the derivative as a quadratic expression in x. Terms may be in any order." },
  },
  "10b": {
    prompt: "A different plant's rate of growth is P′(x) = 1.1 + 2.73x − 0.078x², where x is days after growth began. Find the range of x for which P′(x) > 24, giving each boundary to the nearest whole number.",
    expression: "1.1 + 2.73x − 0.078x² > 24",
    answer: "14 ≤ x ≤ 21 days (boundaries rounded to whole numbers)",
    solution: "Rearrange the inequality to 0.078x² − 2.73x + 22.9 < 0. The quadratic roots are about 13.94 and 21.06. Because the quadratic is below zero between its roots, the exact real interval is approximately 13.94 < x < 21.06. The paper asks for whole-number boundaries; these give 14 ≤ x ≤ 21. The integer days 14 through 21 all satisfy P′(x) > 24.",
    answerCheck: { kind: "interval", minimum: 14, maximum: 21, placeholder: "e.g. 14 ≤ x ≤ 21", hint: "Enter the whole-number boundary interval as 14 ≤ x ≤ 21. The exact real roots are about 13.94 and 21.06." },
  },
  "10ci": {
    prompt: "A logo is the region between c(x) = x² for −1 ≤ x ≤ 1, s(x) = 2x − x² for 0 ≤ x ≤ 1, and k(x), the reflection of s in the y-axis. Use integration to find the area of the logo. Hint: find the area in the first quadrant, then double it.",
    expression: "Area = 2∫₀¹ [s(x) − c(x)] dx",
    illustration: "plant-logo-2024",
    answer: "2/3 square units",
    solution: "By symmetry, find the right-hand lobe and double it. On 0 ≤ x ≤ 1, the upper curve is s(x) = 2x − x² and the lower curve is c(x) = x². Area = 2∫₀¹[(2x − x²) − x²]dx = 2∫₀¹(2x − 2x²)dx = 2[x² − (2/3)x³]₀¹ = 2(1 − 2/3) = 2/3 square units. The final value alone does not show the requested integration method.",
    answerCheck: { kind: "numeric", expected: 2 / 3, placeholder: "e.g. 2/3", hint: "Enter the total area. This checks only the final value; show the integral and the symmetry step in your workings." },
  },
  "10cii": {
    prompt: "The logo's left upper curve k is the image of s(x) = 2x − x² under reflection in the y-axis. If k(x) = −x² + bx + c, find b and c.",
    expression: "k(x) = s(−x)",
    illustration: "plant-logo-2024",
    answer: "b = −2, c = 0",
    solution: "Reflection in the y-axis replaces x by −x. Thus k(x) = s(−x) = 2(−x) − (−x)² = −2x − x². Comparing this with −x² + bx + c gives b = −2 and c = 0. The reflected curve is defined on −1 ≤ x ≤ 0.",
    answerCheck: { kind: "ordered-values", expected: [-2, 0], placeholder: "e.g. -2, 0", hint: "Enter b, c in that order, separated by a comma." },
  },
  "10d": {
    prompt: "A bag of plant food normally costs €p. Let 0 < r < 0.9p. Option 1 reduces the usual price by 10%, then subtracts €r. Option 2 subtracts €r first, then reduces that price by 10%. Which option is cheaper? Write each option's price in terms of p and r to support your answer.",
    expression: "Option 1: 10% off, then subtract r;   Option 2: subtract r, then 10% off",
    answer: "Option 1; price 0.9p − r, compared with Option 2 price 0.9(p − r) = 0.9p − 0.9r",
    solution: "Option 1 costs 0.9p − r. Option 2 costs 0.9(p − r) = 0.9p − 0.9r. Subtracting Option 1's price from Option 2's gives 0.1r, which is positive because r > 0. Therefore Option 1 is always cheaper by €0.1r. The condition r < 0.9p keeps the resulting prices positive; the comparison depends only on r > 0.",
    selfCheck: { placeholder: "Name the cheaper option and write both prices algebraically.", checks: ["Write Option 1 as 0.9p − r.", "Write Option 2 as 0.9(p − r) = 0.9p − 0.9r.", "Compare the prices using r > 0.", "Conclude that Option 1 is cheaper by 0.1r."] },
  },
};

export const realPaper2024p1: StudyPaper = {
  id: paperId,
  year: 2024,
  level: "Higher",
  paperNumber: 1,
  title: "2024 Higher Level Paper 1",
  description: "All ten questions reviewed onscreen.",
  estimatedMinutes: 165,
  kind: "real",
  questions: (["1a", "1b", "1c", "2a", "2b", "2ci", "2cii", "3a", "3bi", "3bii", "3c", "4a", "4b", "4c", "5a", "5b", "5ci", "5cii", "6a", "6bi", "6bii", "6biii", "7a", "7bi", "7bii", "7ci", "7cii", "7ciii", "8ai", "8aii", "8b", "8c", "8d", "8e", "9a", "9bi", "9bii", "9c", "9d", "9e", "10ai", "10aii", "10b", "10ci", "10cii", "10d"] as const).map((code) => {
    const id = `${paperId}-${code}`;
    const metadata = bookPaper.parts.find((part) => part.id === id);
    if (!metadata) throw new Error(`Missing tracker part ${id}`);
    return {
      id,
      number: metadata.label.replace(/^Q/, "").replace("(", " ("),
      topic: metadata.topicIds.includes("p1-complex") ? "Complex numbers"
        : metadata.topicIds.includes("p1-calculus") ? "Calculus"
          : metadata.topicIds.includes("p1-sequences") ? "Sequences and series"
            : metadata.topicIds.includes("p1-number") ? "Number and financial maths"
              : metadata.topicIds.includes("p1-graphs") ? "Functions and graphs" : "Algebra",
      marks: null,
      ...content[code],
    };
  }),
};
