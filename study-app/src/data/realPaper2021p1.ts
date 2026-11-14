import bookPaper from "./book2021p1.json";
import type { AnswerCheck, StudyPaper, StudyQuestion } from "../types";

const paperId = "lc-hl-2021-normal-p1";
type Content = Pick<StudyQuestion, "prompt" | "answer" | "solution"> & Partial<Pick<StudyQuestion, "expression" | "illustration" | "answerCheck" | "selfCheck">>;
const numeric = (expected: number, hint: string, tolerance?: number): AnswerCheck => ({ kind: "numeric", expected, tolerance, placeholder: `e.g. ${expected}`, hint });
const guided = (placeholder: string, checks: string[]) => ({ placeholder, checks });

// Authored study explanations. Prompts checked against printed pages 4–29;
// individual marks and official marking-scheme allocations have not been verified.
const content: Record<string, Content> = {
  "1a": {
    prompt: "Given (4 − 2i)/(2 + 4i) = 0 + ki, where k is an integer and i² = −1, find k.",
    expression: "(4 − 2i)/(2 + 4i) = ki",
    answer: "k = −1",
    solution: "Multiply numerator and denominator by 2 − 4i. The numerator is (4 − 2i)(2 − 4i) = 8 − 20i + 8i² = −20i. The denominator is 2² + 4² = 20. Thus the quotient is −i and k = −1. Alternatively, observe that −i(2 + 4i) = 4 − 2i.",
    answerCheck: numeric(-1, "Enter the coefficient k of i."),
  },
  "1b": {
    prompt: "Find both square roots of −5 + 12i. Give both in a + bi form, where a,b are real.",
    expression: "w² = −5 + 12i",
    answer: "2 + 3i and −2 − 3i",
    solution: "Let w = a + bi. Squaring and equating real and imaginary parts gives a² − b² = −5 and 2ab = 12. Also a² + b² = |−5 + 12i| = 13. Adding the first and third relations gives 2a² = 8, so a = ±2. Since ab = 6, the corresponding b values are 3 and −3. Thus the roots are 2 + 3i and −2 − 3i; squaring either gives −5 + 12i.",
    answerCheck: { kind: "complex-pair-set", expected: [{ real: 2, imaginary: 3 }, { real: -2, imaginary: -3 }], placeholder: "e.g. 2+3i; -2-3i", hint: "Enter both roots separated by a semicolon. Either order works." },
  },
  "1c": {
    prompt: "Use de Moivre’s theorem to find all three roots of z³ = −8, in a + bi form.",
    answer: "−2, 1 + √3i, 1 − √3i",
    solution: "Write −8 = 8[cos(π + 2kπ) + i sin(π + 2kπ)]. The cube roots have modulus 2 and arguments (π + 2kπ)/3 for k = 0,1,2. These are π/3, π and 5π/3. Converting 2(cos θ + i sin θ) to rectangular form gives 1 + √3i, −2 and 1 − √3i. Distinct arguments are needed to obtain all three roots.",
    selfCheck: guided("Show the polar form and de Moivre calculation for all three roots.", ["Use modulus 2 for the roots.", "Use arguments π/3, π, 5π/3.", "Give all three roots in rectangular form, including −2."]),
  },
  "2a": {
    prompt: "Given that x = −3 solves |x + p| = 5, find both integer values of p.",
    answer: "p = −2 or p = 8",
    solution: "Substitute x = −3 to get |p − 3| = 5. Thus p − 3 = 5 or p − 3 = −5, giving p = 8 or −2. Both produce an absolute value of 5.",
    answerCheck: { kind: "number-set", expected: [-2, 8], placeholder: "e.g. -2, 8", hint: "Enter both values of p in either order." },
  },
  "2b": {
    prompt: "x + 4 is a factor of f(x) = x³ + qx² − 22x + 56, where q is an integer. Show that q = −5 and find all three roots of f.",
    answer: "q = −5; roots −4, 2 and 7",
    solution: "The factor theorem gives f(−4) = 0. Hence −64 + 16q + 88 + 56 = 0, so 16q + 80 = 0 and q = −5. Divide x³ − 5x² − 22x + 56 by x + 4 to get x² − 9x + 14 = (x − 2)(x − 7). Therefore f(x) = (x + 4)(x − 2)(x − 7), and the roots are −4,2,7.",
    selfCheck: guided("Show the factor-theorem calculation, then factorise fully.", ["Use f(−4) = 0 to derive q = −5.", "Obtain quotient x² − 9x + 14.", "Give all three roots: −4, 2, 7."]),
  },
  "3a": {
    prompt: "A cuboid has edges x,y,z cm and three adjacent face areas 2√2, 4√3 and 8√6 cm², as shown. Find its volume in a√b form.",
    illustration: "p1-2021-cuboid",
    answer: "8√6 cm³",
    solution: "The three face areas are xz, xy and yz. Their product is x²y²z² = V². Multiply: (2√2)(4√3)(8√6) = 64√36 = 384. Volume is positive, so V = √384 = √(64 × 6) = 8√6 cm³. Multiplying the face areas gives the square of the volume, not the volume itself.",
    selfCheck: guided("Multiply the three areas and take the positive square root.", ["Recognise (xy)(xz)(yz) = V².", "Calculate the product as 384.", "Simplify √384 to 8√6 cm³."]),
  },
  "3bi": {
    prompt: "Find the two roots of 3x² + 8x − 35 = 0.",
    answer: "x = 7/3 or x = −5",
    solution: "Factor 3x² + 8x − 35 = (3x − 7)(x + 5). Equating each factor to zero gives x = 7/3 or −5.",
    answerCheck: { kind: "number-set", expected: [7 / 3, -5], placeholder: "e.g. 7/3, -5", hint: "Enter both roots in either order; fractions are accepted." },
  },
  "3bii": {
    prompt: "Solve 3^(2m+1) = 35 − 8(3ᵐ), for real m. Give your answer as m = log₃p − q with natural-number p,q.",
    answer: "m = log₃7 − 1",
    solution: "Let x = 3ᵐ > 0. Then 3^(2m+1) = 3x², so the equation becomes 3x² + 8x − 35 = 0. Its roots are 7/3 and −5. Reject −5 because 3ᵐ is positive. Thus 3ᵐ = 7/3 and m = log₃(7/3) = log₃7 − log₃3 = log₃7 − 1.",
    selfCheck: guided("Substitute x = 3ᵐ, select the admissible root and use logarithm laws.", ["Obtain 3x² + 8x − 35 = 0.", "Reject x = −5 because 3ᵐ > 0.", "Give m = log₃7 − 1."]),
  },
  "4a": {
    prompt: "Prove by induction that 2^(3n−1) + 3 is divisible by 7 for every positive integer n.",
    answer: "Base case 7; inductive step 2^(3(k+1)−1) + 3 = 8[2^(3k−1) + 3] − 21, divisible by 7.",
    solution: "For n = 1, 2² + 3 = 7, divisible by 7. Assume 2^(3k−1) + 3 = 7r for an integer r. Then 2^(3(k+1)−1) + 3 = 8·2^(3k−1) + 3 = 8[2^(3k−1) + 3] − 21 = 56r − 21 = 7(8r − 3). Thus the assertion for k implies it for k + 1. By induction it holds for every positive integer n.",
    selfCheck: guided("Write a complete induction proof.", ["Check n = 1.", "State the divisibility assumption for k.", "Express the next term as eight times the assumed expression minus 21.", "Conclude divisibility by 7 and state the induction conclusion."]),
  },
  "4bi": {
    prompt: "The arithmetic sequence is p, p + 7, p + 14, p + 21, …, with p a natural number. Find its nth term in n and p.",
    answer: "Tₙ = p + 7(n − 1)",
    solution: "An arithmetic sequence with first term p and common difference 7 has Tₙ = p + (n − 1)7. This gives p when n = 1 and increases by 7 at each step.",
    selfCheck: guided("Write the nth-term formula and check its first term.", ["Use first term p and difference 7.", "Give p + 7(n − 1), equivalently 7n + p − 7."]),
  },
  "4bii": {
    prompt: "For the arithmetic sequence p, p + 7, p + 14, …, find the smallest natural-number p for which 2021 is a term.",
    answer: "p = 5",
    solution: "If 2021 = p + 7(n − 1), then p must have the same remainder as 2021 on division by 7. Since 2021 = 7 × 288 + 5, the smallest natural-number choice is p = 5. It works with n − 1 = 288, or n = 289.",
    answerCheck: numeric(5, "Enter the smallest starting value p."),
  },
  "5ai": {
    prompt: "For f(x) = 2x³ + 6x² − 12x + 3, write its derivative as a(x + b)² + c. Find the integers a,b,c.",
    answer: "a = 6, b = 1, c = −18",
    solution: "Differentiate to get f′(x) = 6x² + 12x − 12. Complete the square: 6(x² + 2x) − 12 = 6[(x + 1)² − 1] − 12 = 6(x + 1)² − 18. Thus a = 6,b = 1,c = −18.",
    answerCheck: { kind: "ordered-values", expected: [6, 1, -18], placeholder: "e.g. 6, 1, -18", hint: "Enter a, b, c in that order." },
  },
  "5aii": {
    prompt: "For f(x) = 2x³ + 6x² − 12x + 3 and g(x) = 36x + 5, find the real x for which f′(x) > g′(x).",
    answer: "x < −4 or x > 2",
    solution: "f′(x) = 6x² + 12x − 12 and g′(x) = 36. Thus 6x² + 12x − 48 > 0, or (x + 4)(x − 2) > 0. The product is positive outside its roots, giving x < −4 or x > 2. The strict inequality excludes both endpoints.",
    selfCheck: guided("Differentiate both functions and solve the strict quadratic inequality.", ["Compare f′ with 36, not with 36x + 5.", "Factor to (x + 4)(x − 2) > 0.", "Give the two outside intervals, excluding −4 and 2."]),
  },
  "5b": {
    prompt: "The tangent to h(x) = 2sin(2x), for 0 ≤ x ≤ π, at x = π/6 meets the y-axis at A(0,k). Find k correct to 2 decimal places. Angles are in radians.",
    illustration: "p1-2021-tangent",
    answer: "k = 0.68",
    solution: "At x = π/6, h(x) = 2sin(π/3) = √3. Differentiate: h′(x) = 4cos(2x), so the tangent slope is 4cos(π/3) = 2. The tangent equation is y − √3 = 2(x − π/6). Setting x = 0 gives k = √3 − π/3 ≈ 0.684853, or 0.68 to two decimal places.",
    answerCheck: numeric(0.68, "Enter the y-intercept k to 2 decimal places."),
  },
  "6a": {
    prompt: "The supplied graph is h′, the derivative of a cubic h. It has roots −1 and 3 and y-intercept 6. Show that h′(x) = −2x² + 4x + 6.",
    illustration: "p1-2021-derivative",
    answer: "h′(x) = −2(x + 1)(x − 3) = −2x² + 4x + 6",
    solution: "The quadratic with roots −1 and 3 has the form a(x + 1)(x − 3). Its value at x = 0 is 6, so −3a = 6 and a = −2. Expand −2(x² − 2x − 3) to obtain −2x² + 4x + 6.",
    selfCheck: guided("Use the graph’s intercepts to determine the quadratic.", ["Use factors (x + 1)(x − 3).", "Use h′(0) = 6 to obtain multiplier −2.", "Expand to the required expression."]),
  },
  "6b": {
    prompt: "Given h′(x) = −2x² + 4x + 6, find the maximum positive slope of a tangent to h.",
    illustration: "p1-2021-derivative",
    answer: "8",
    solution: "The slope of h is h′. Complete the square: h′(x) = −2(x − 1)² + 8. Since the squared term is non-negative and has a negative multiplier, the greatest value of h′ is 8, attained when x = 1. This is the maximum slope, not a maximum value of h itself.",
    answerCheck: numeric(8, "Enter the greatest tangent slope."),
  },
  "6c": {
    prompt: "h′(x) = −2x² + 4x + 6 and the graph of h passes through (0,−2). Find h(x).",
    answer: "h(x) = −(2/3)x³ + 2x² + 6x − 2",
    solution: "Integrate term by term: h(x) = −(2/3)x³ + 2x² + 6x + C. Use h(0) = −2 to get C = −2. Differentiating the resulting cubic recovers h′.",
    selfCheck: guided("Integrate h′ and use the supplied point to determine the constant.", ["Integrate to −(2/3)x³ + 2x² + 6x + C.", "Use h(0) = −2 to set C = −2."]),
  },
  "7ai": {
    prompt: "A pendulum’s first swing has arc length 45 cm. Each next swing is 90% of the previous one. Complete the first-five-swing table; swings 1 and 3 are given as 45 and 729/20 cm.",
    illustration: "p1-2021-pendulum-table",
    answer: "45, 40.5, 36.45, 32.805, 29.5245 cm",
    solution: "Multiply by 0.9 each time: 45 × 0.9 = 40.5, then 36.45 = 729/20, then 32.805 and 29.5245. The ratio is 0.9, not a decrease of 0.9 cm.",
    answerCheck: { kind: "ordered-values", expected: [45, 40.5, 36.45, 32.805, 29.5245], placeholder: "e.g. 45, 40.5, 36.45, …", hint: "Enter all five lengths in order, including the given entries. Do not round." },
  },
  "7aii": {
    prompt: "The nth pendulum swing has arc length Tₙ = 45(0.9)ⁿ⁻¹ cm. Find the length of swing 25, to 1 decimal place.",
    answer: "3.6 cm",
    solution: "T₂₅ = 45(0.9)²⁴ ≈ 3.589490 cm. Round to one decimal place to get 3.6 cm. The exponent is 24 because the first swing has exponent zero.",
    answerCheck: numeric(3.6, "Enter the length in cm to 1 decimal place."),
  },
  "7aiii": {
    prompt: "For pendulum swing lengths 45(0.9)ⁿ⁻¹ cm, find the total tip distance after completing swing 40, to the nearest whole cm.",
    answer: "443 cm",
    solution: "Sum the first 40 terms: S₄₀ = 45(1 − 0.9⁴⁰)/(1 − 0.9) = 450(1 − 0.9⁴⁰) ≈ 443.348603 cm. The nearest whole cm is 443. This is a finite sum, not the limiting 450 cm.",
    answerCheck: numeric(443, "Enter the total distance in whole cm."),
  },
  "7aiv": {
    prompt: "Swing p is the first pendulum swing with arc length less than 2 cm. Given Tₙ = 45(0.9)ⁿ⁻¹ cm, find p.",
    answer: "p = 31",
    solution: "Solve 45(0.9)^(p−1) < 2. Taking logarithms and dividing by ln0.9, which is negative, reverses the inequality: p − 1 > ln(2/45)/ln0.9 ≈ 29.551064. Thus p > 30.551064 and the first integer is 31. Check: T₃₀ ≈ 2.119558 cm, while T₃₁ ≈ 1.907602 cm.",
    answerCheck: numeric(31, "Enter the first swing number. Check the preceding swing too."),
  },
  "7bi": {
    prompt: "A pendulum has length 1 m and its first swing covers a 45 cm arc. Show that the angle of the first swing is 26°, to the nearest degree.",
    illustration: "p1-2021-pendulum",
    answer: "θ = 0.45 radians ≈ 25.7831°, rounding to 26°",
    solution: "Use s = rθ with consistent units: r = 100 cm, s = 45 cm. Thus θ = 45/100 = 0.45 radians. Convert to degrees: 0.45 × 180/π ≈ 25.7831°, which rounds to 26°.",
    selfCheck: guided("Use arc length in radians, then convert to degrees.", ["Use r = 100 cm to match s = 45 cm.", "Find 0.45 radians.", "Convert and round to 26°."]),
  },
  "7bii": {
    prompt: "The pendulum’s angles form a geometric sequence with ratio 0.9. Its first angle is 0.45 radians, approximately 26°. Find the total accumulated angle in the model, to the nearest degree.",
    answer: "258° using unrounded first angle; 260° if carrying forward the rounded 26°",
    solution: "Sum to infinity: 0.45/(1 − 0.9) = 4.5 radians. Converting to degrees gives 4.5 × 180/π ≈ 257.831°, so retaining precision gives 258°. If the preceding rounded 26° is carried forward, the sum is 26/0.1 = 260°. These are different rounding paths; compare the geometric-sum method and keep intermediate precision when possible. The infinite sum describes the limiting accumulated angle.",
    selfCheck: guided("Sum the geometric series and state which first-angle precision you used.", ["Use common ratio 0.9 and a sum to infinity.", "Obtain 4.5 radians and about 258° when retaining precision.", "If using 26° from the previous part, identify the rounded-path result 260°."]),
  },
  "7biii": {
    prompt: "Find the total pendulum-tip distance when it has moved through half its total accumulated angle. The pendulum length is 100 cm and its arc lengths start at 45 cm with ratio 0.9. Give the distance to the nearest cm.",
    answer: "225 cm using the original lengths; about 227 cm if carrying forward 260° as the total angle",
    solution: "At a fixed radius, arc length is proportional to accumulated angle. The total limiting distance is 45/(1 − 0.9) = 450 cm, so half the total angle corresponds to 225 cm. Equivalently, half of the unrounded 4.5-radian total is 2.25 radians and s = 100 × 2.25 = 225 cm. If a rounded 260° total was carried forward, half gives 130° and s = 100(130π/180) ≈ 226.893 cm, or 227 cm. This discrepancy comes from earlier angle rounding.",
    selfCheck: guided("Use proportional arc length and angle, identifying any carried-forward rounding.", ["Use the fixed 100 cm radius.", "From the original geometric lengths, halve 450 cm to obtain 225 cm.", "Explain any different result caused by earlier rounded angles rather than mixing the precision paths."]),
  },
  "8ai": {
    prompt: "For h(x) = 0.001x³ − 0.12x² + px + 5 on 0 ≤ x ≤ 75, use h(10) = 30 to show that p = 3.6.",
    answer: "p = 3.6",
    solution: "Substitute x = 10: 0.001(1000) − 0.12(100) + 10p + 5 = 30. Hence 1 − 12 + 10p + 5 = 30, or 10p − 6 = 30. Thus 10p = 36 and p = 3.6.",
    selfCheck: guided("Substitute the given point and solve for p.", ["Obtain 1 − 12 + 10p + 5 = 30.", "Rearrange to 10p = 36 and conclude p = 3.6."]),
  },
  "8aii": {
    prompt: "Complete the table for h(x) = 0.001x³ − 0.12x² + 3.6x + 5 and draw its graph on paper for 0 ≤ x ≤ 75. Use the given table values and blank axes.",
    illustration: "p1-2021-coaster-table",
    answer: "At x = 0,10,20,30,40,50,60,70,75: h(x) = 5,30,37,32,21,10,5,12,21.875",
    solution: "Substitute each x into the cubic. The nine heights are 5,30,37,32,21,10,5,12,21.875. Plot these points and join with a smooth curve, not straight segments. It rises to (20,37), falls to (60,5), then rises again, ending at (75,21.875). Keep the domain [0,75] and the vertical scale 0 to 40.",
    selfCheck: guided("Complete the table and draw a smooth curve on paper.", ["Use all nine table values in the answer.", "Plot a maximum at (20,37) and minimum at (60,5).", "Use a smooth cubic curve on the stated domain."]),
  },
  "8bi": {
    prompt: "The rollercoaster height is h(x) = 0.001x³ − 0.12x² + 3.6x + 5 metres, for horizontal distance 0 ≤ x ≤ 75. Find h′(x).",
    answer: "h′(x) = 0.003x² − 0.24x + 3.6",
    solution: "Differentiate each term using the power rule. The cubic gives 0.003x², the quadratic gives −0.24x, the linear term gives 3.6 and the constant gives zero.",
    answerCheck: { kind: "quadratic-expression", quadratic: 0.003, linear: -0.24, constant: 3.6, placeholder: "e.g. 0.003x² - 0.24x + 3.6", hint: "Enter the expanded derivative." },
  },
  "8bii": {
    prompt: "Use calculus to show that h(x) = 0.001x³ − 0.12x² + 3.6x + 5 reaches its maximum height on [0,75] at x = 20.",
    answer: "Maximum at x = 20, height 37 m",
    solution: "Factor h′(x) = 0.003(x − 20)(x − 60), so stationary points occur at x = 20,60. Also h″(x) = 0.006x − 0.24, which is negative at 20 and positive at 60. Thus 20 is a local maximum and 60 a local minimum. To establish the overall maximum on [0,75], compare h(0) = 5, h(20) = 37, h(60) = 5 and h(75) = 21.875. The greatest is 37 at x = 20.",
    selfCheck: guided("Find and classify stationary points, then compare the endpoints.", ["Solve h′ = 0 to get 20 and 60.", "Use h″ or a sign change to classify x = 20 as a maximum.", "Compare endpoint heights to confirm the global maximum is at 20."]),
  },
  "8biii": {
    prompt: "Use calculus to find the rollercoaster height at its inflection point for h(x) = 0.001x³ − 0.12x² + 3.6x + 5 on [0,75].",
    answer: "21 m, at x = 40",
    solution: "The second derivative is h″(x) = 0.006x − 0.24. It vanishes at x = 40 and changes from negative to positive there, establishing an inflection point. Evaluate h(40) = 64 − 192 + 144 + 5 = 21 m. The question asks for height, not just the horizontal coordinate.",
    answerCheck: numeric(21, "Enter the height in metres. Show the second-derivative sign change in your workings."),
  },
  "8c": {
    prompt: "Find the average height of h(x) = 0.001x³ − 0.12x² + 3.6x + 5 from x = 0 to 75. Give metres to 2 decimal places.",
    expression: "Average = (1/75)∫₀⁷⁵ h(x) dx",
    answer: "20.47 m",
    solution: "Integrate to get 0.00025x⁴ − 0.04x³ + 1.8x² + 5x. Evaluate from 0 to 75, then divide by 75. The result is 20.46875 m, which rounds to 20.47 m. Averaging just the table entries would not be the continuous mean requested.",
    answerCheck: numeric(20.47, "Enter the average height in metres to 2 decimal places. Show the integral divided by 75."),
  },
  "9ai": {
    prompt: "Fresh coffee starts at 95°C. Its temperature after t minutes is T(t) = Ae^(−0.081t) + 20. Show that A = 75.",
    answer: "A = 75",
    solution: "At t = 0, e⁰ = 1 and T(0) = 95. Therefore 95 = A + 20, giving A = 75.",
    selfCheck: guided("Use the initial temperature at t = 0.", ["Use e⁰ = 1.", "Obtain 95 = A + 20 and conclude A = 75."]),
  },
  "9aii": {
    prompt: "In the coffee model T(t) = 75e^(−0.081t) + 20, explain what the constant 20 represents.",
    answer: "The surrounding temperature, 20°C, which the coffee approaches as it cools.",
    solution: "As t grows, e^(−0.081t) approaches zero. Thus the modelled temperature approaches 20°C, the ambient or room temperature. It is not a cooling rate, and the model does not reach 20°C at a finite time.",
    selfCheck: guided("Interpret the constant in the cooling context.", ["Identify ambient or room temperature as 20°C.", "Explain that the coffee approaches that temperature as time passes."]),
  },
  "9aiii": {
    prompt: "Coffee cools from 95°C according to T(t) = 75e^(−0.081t) + 20, with t in minutes. Find the decrease in its temperature over the first 10 minutes, to the nearest whole degree.",
    answer: "42°C decrease",
    solution: "T(10) = 75e^(−0.81) + 20 ≈ 53.364355°C. The decrease is initial minus final temperature: 95 − 53.364355 ≈ 41.635645°C, rounding to 42°C. The temperature remaining is different from the decrease.",
    answerCheck: numeric(42, "Enter the positive temperature decrease, to the nearest whole degree."),
  },
  "9b": {
    prompt: "For T(t) = 75e^(−0.081t) + 20, where t is minutes, find when the coffee first reaches 82°C. Give the time to the nearest second.",
    answer: "141 seconds (2 minutes 21 seconds)",
    solution: "Set 75e^(−0.081t) + 20 = 82. Then e^(−0.081t) = 62/75, so t = ln(75/62)/0.081 ≈ 2.350046 minutes. Multiply by 60 to get approximately 141.002762 seconds, rounding to 141 seconds.",
    answerCheck: numeric(141, "Enter the total number of seconds, rounded to the nearest second."),
  },
  "9c": {
    prompt: "For the coffee model T(t) = 75e^(−0.081t) + 20, find the temperature to the nearest °C when T′(t) = −4.05°C per minute.",
    answer: "70°C",
    solution: "Differentiate: T′(t) = −6.075e^(−0.081t). Set this equal to −4.05 to get e^(−0.081t) = 4.05/6.075 = 2/3. Substitute directly into T: 75(2/3) + 20 = 70°C. There is no need to find t separately.",
    answerCheck: numeric(70, "Enter the temperature in whole degrees Celsius."),
  },
  "9d": {
    prompt: "A dissolving sugar cube retains its shape. Its volume decreases at 1/20 cm³ per second. Find the signed rate of change of side length x when its volume is 1/64 cm³.",
    expression: "V = x³;   dV/dt = −1/20",
    answer: "dx/dt = −4/15 cm/s",
    solution: "Differentiate V = x³ with respect to time: dV/dt = 3x² dx/dt. At V = 1/64, the positive side length is x = 1/4 cm. Therefore −1/20 = 3(1/16)dx/dt, giving dx/dt = (−1/20)(16/3) = −4/15 cm/s. The negative sign records shrinkage.",
    answerCheck: numeric(-4 / 15, "Enter the signed rate in cm/s as an exact fraction, such as -4/15."),
  },
  "10ai": {
    prompt: "A tank’s volume is V(t) = 60 + 41t − 3t² litres from day 0, while V ≥ 0. Find when it empties.",
    answer: "t = 15 days",
    solution: "Set 60 + 41t − 3t² = 0, or 3t² − 41t − 60 = 0. Factor (3t + 4)(t − 15) = 0. The roots are −4/3 and 15. Time starts at zero, so reject the negative root and use t = 15 days.",
    answerCheck: numeric(15, "Enter the non-negative emptying time in days."),
  },
  "10aii": {
    prompt: "For tank volume V(t) = 60 + 41t − 3t² litres, find its rate of change at t = 5 days.",
    answer: "11 litres per day",
    solution: "V′(t) = 41 − 6t. Hence V′(5) = 41 − 30 = 11 litres per day. The positive sign means volume is increasing at that instant.",
    answerCheck: numeric(11, "Enter the signed rate in litres per day."),
  },
  "10aiii": {
    prompt: "For tank volume V(t) = 60 + 41t − 3t² litres, find the time when its volume is greatest.",
    answer: "t = 41/6 days",
    solution: "Set V′(t) = 41 − 6t = 0 to get t = 41/6 days. Since V″(t) = −6 < 0, this is a maximum. It lies within the physical interval 0 ≤ t ≤ 15.",
    answerCheck: numeric(41 / 6, "Enter the exact time in days, for example 41/6."),
  },
  "10aiv": {
    prompt: "Find the maximum volume of V(t) = 60 + 41t − 3t² litres, correct to the nearest litre.",
    answer: "200 litres",
    solution: "The maximum occurs at t = 41/6. Substitute to get V = 60 + 41(41/6) − 3(41/6)² = 2401/12 ≈ 200.083333 litres. To the nearest litre the maximum is 200 litres.",
    answerCheck: numeric(200, "Enter the maximum volume in whole litres."),
  },
  "10bi": {
    prompt: "A tree’s yearly radius increment is I(t) = 1.5 + sin(πt/5) cm for integer years 1–10. The recurrence is r(t+1) = r(t) + I(t+1). Show that the radius increases every year.",
    answer: "I(t) ≥ 0.5 > 0, so each new radius exceeds the preceding one.",
    solution: "For every real angle, −1 ≤ sin θ ≤ 1. Therefore 0.5 ≤ 1.5 + sin(πt/5) ≤ 2.5. Each yearly increment is strictly positive. Since the recurrence adds this positive increment, the radius increases year on year throughout the model's ten years.",
    selfCheck: guided("Bound the increment and connect it to the recurrence.", ["Use sin θ ≥ −1 to get I(t) ≥ 0.5.", "Conclude each increment is positive.", "Explain that r therefore increases each year."]),
  },
  "10bii": {
    prompt: "For I(t) = 1.5 + sin(πt/5), show I(6) < I(5) and explain what this means for the tree’s radius growth.",
    answer: "I(6) ≈ 0.9122 cm < I(5) = 1.5 cm; the radius still grows, but by less in year 6.",
    solution: "I(5) = 1.5 + sinπ = 1.5. I(6) = 1.5 + sin(6π/5) ≈ 0.912215, which is smaller but still positive. The radius increase in year 6 is less than in year 5; the tree's radius itself does not decrease.",
    selfCheck: guided("Compare the two increments and interpret the difference.", ["Calculate I(5) = 1.5 and I(6) ≈ 0.9122.", "Explain that growth slows, while radius continues to increase."]),
  },
  "10biii": {
    prompt: "A tree begins with r(0) = 10 cm and grows by I(t) = 1.5 + sin(πt/5) each year. Find r(2) in the form a + sin(bπ/5) + sin(cπ/5), with natural-number a,b,c.",
    illustration: "p1-2021-trunks",
    answer: "r(2) = 13 + sin(π/5) + sin(2π/5) cm",
    solution: "Use the recurrence twice: r(2) = r(0) + I(1) + I(2). Substitute to obtain 10 + [1.5 + sin(π/5)] + [1.5 + sin(2π/5)] = 13 + sin(π/5) + sin(2π/5). Thus a = 13,b = 1,c = 2, with the two sine terms interchangeable.",
    selfCheck: guided("Add the first two increments to the starting radius and retain exact sine terms.", ["Use r(0) + I(1) + I(2), not just I(2).", "Combine constants to 13.", "Give both sine terms in the requested form."]),
  },
  "10biv": {
    prompt: "Identical trees start with radius 10 cm. One is cut immediately; the other after 10 years with increments I(t) = 1.5 + sin(πt/5). Cylindrical trunk sections have the same length h and volumes V₁,V₂. Find k if V₂ = kV₁.",
    illustration: "p1-2021-trunks",
    answer: "k = 6.25",
    solution: "Over t = 1,…,10 the sine terms sum to zero: terms with arguments π/5 and 6π/5 cancel, and similarly for the other pairs; sinπ and sin2π are zero. Thus r(10) = 10 + 10(1.5) = 25 cm. Cylinder volume is πr²h, so V₂/V₁ = (25/10)² = 6.25. The common length cancels; the volume ratio is the square of the radius ratio, not its cube.",
    answerCheck: numeric(6.25, "Enter the volume multiplier k."),
  },
};

export const realPaper2021p1: StudyPaper = {
  id: paperId, year: 2021, level: "Higher", paperNumber: 1, kind: "real",
  title: "2021 Higher Level Paper 1", estimatedMinutes: 150,
  description: "All ten questions ready onscreen with worked solutions and answer checks or guided self-checks.",
  questions: bookPaper.parts.map((part) => {
    const code = part.id.slice(paperId.length + 1);
    if (!content[code]) throw new Error(`Missing reviewed content for ${part.id}`);
    return { id: part.id, number: part.label.replace(/^Q/, "").replace("(", " ("), marks: null,
      topic: part.topicIds.includes("p1-complex") ? "Complex numbers" : part.topicIds.includes("p1-calculus") ? "Functions and calculus" : part.topicIds.includes("p1-sequences") ? "Sequences and series" : part.topicIds.includes("p1-graphs") ? "Functions and graphs" : part.topicIds.includes("p1-number") ? "Number and arithmetic" : "Algebra",
      ...content[code] };
  }),
};
