import bookPaper from "./book2020p2.json";
import type { AnswerCheck, StudyPaper, StudyQuestion } from "../types";

const paperId = "lc-hl-2020-normal-p2";
type Content = Pick<StudyQuestion, "prompt" | "answer" | "solution"> & Partial<Pick<StudyQuestion, "expression" | "illustration" | "answerCheck" | "selfCheck">>;
const numeric = (expected: number, hint: string, tolerance?: number): AnswerCheck => ({ kind: "numeric", expected, tolerance, placeholder: `e.g. ${expected}`, hint });
const guided = (placeholder: string, checks: string[]) => ({ placeholder, checks });

// Authored study explanations, reviewed against printed source pages 4–25.
// No individual leaf marks or official marking-scheme allocations are claimed.
const content: Record<string, Content> = {
  "1a": {
    prompt: "A(2,−6), B(6,−12) and C(−4,3) are three points. Find the perpendicular distance from A to line BC, then state what this implies about the three points.",
    answer: "Distance 0; A,B,C are collinear",
    solution: "The slope of BC is (3 + 12)/(−4 − 6) = −3/2. Its equation is y + 12 = (−3/2)(x − 6), or 3x + 2y + 6 = 0. The distance from A is |3(2) + 2(−6) + 6|/√(3² + 2²) = 0. Therefore A lies on BC and all three points are collinear.",
    selfCheck: guided("Find the line BC, calculate the distance and interpret a zero result.", ["Obtain line 3x + 2y + 6 = 0.", "Use the point-to-line formula to get distance 0.", "Conclude that the points are collinear."]),
  },
  "1b": {
    prompt: "Line a is x − 2y + 1 = 0. Line b makes an angle of 60° with the positive x-axis. Find the acute angle θ between the lines, to 3 decimal places.",
    illustration: "p2-2020-line-angle",
    answer: "33.435°",
    solution: "Rewrite a as y = x/2 + 1/2, with slope 1/2. Its angle to the positive x-axis is arctan(1/2) ≈ 26.565051°. Both inclinations are acute, so their acute difference is 60° − 26.565051° ≈ 33.434949°, rounding to 33.435°.",
    answerCheck: numeric(33.435, "Enter the acute angle in degrees to 3 decimal places, without a degree sign."),
  },
  "2a": {
    prompt: "Circle c has equation x² + y² − 4x + 2y − 4 = 0 and centre A. A tangent at T passes through B(5,8). Find BT.",
    illustration: "p2-2020-tangent-circle",
    answer: "9 units",
    solution: "Complete the square: (x − 2)² + (y + 1)² = 9, so A = (2,−1) and radius AT = 3. AB² = (5 − 2)² + (8 + 1)² = 90. The radius is perpendicular to the tangent at T, so Pythagoras gives BT² = AB² − AT² = 90 − 9 = 81. The positive length is BT = 9.",
    answerCheck: numeric(9, "Enter the tangent length BT, not the centre-to-B distance."),
  },
  "2b": {
    prompt: "Two circles have their centres on the x-axis and radius 5. Each contains (1,4). Find both circle equations.",
    answer: "(x + 2)² + y² = 25 and (x − 4)² + y² = 25",
    solution: "Write a centre as (h,0). Since (1,4) lies on the circle, (1 − h)² + 16 = 25, so 1 − h = ±3. Thus h = −2 or 4. Substituting these centres and radius 5 into the standard circle equation gives both stated equations.",
    selfCheck: guided("Find both permitted centre positions and write both equations.", ["Use centre (h,0) and (1 − h)² + 4² = 25.", "Obtain h = −2 and 4.", "Give both equations with squared radius 25."]),
  },
  "3a": {
    prompt: "A vertical flagpole GH stands on ground inclined 5° above the horizontal. E,F,G lie in that uphill order, EF = 6 m, and the elevation angles to H from E and F are 35° and 52°. Find FG along the incline, in metres to 2 decimal places.",
    illustration: "p2-2020-inclined-pole",
    answer: "6.34 m",
    solution: "Elevation angles are measured from the horizontal. In triangle EFH, angle HEF = 35° − 5° = 30°, angle EFH = 180° − (52° − 5°) = 133°, and angle EHF = 17°. By the sine rule, FH = 6sin30°/sin17°. In triangle FGH, angle HFG = 47° and angle FGH = 95° because GH is vertical and FG slopes at 5°. Thus angle FHG = 38°. Apply the sine rule again: FG = FH sin38°/sin95° ≈ 6.341378 m, rounding to 6.34 m. Do not treat the inclined ground as horizontal.",
    answerCheck: numeric(6.34, "Enter FG measured along the incline, in metres to 2 decimal places."),
  },
  "3b": {
    prompt: "A small circle of radius r and centre D touches a larger circle internally at C. The large circle has centre O, and rays OA,OB are tangents to the small circle with angle AOB = 60°. Find k if the large-to-small circle area ratio is k:1.",
    illustration: "p2-2020-nested-circles",
    answer: "k = 9",
    solution: "The line OD bisects the angle between the two tangents. Let T be the perpendicular foot from D to OA. In right triangle ODT, angle DOT = 30° and DT = r. Therefore sin30° = r/OD, so OD = 2r. Internal tangency places O,D,C on a line with OC = OD + DC = 3r. Hence the large radius is 3r and its area is 9 times the small area: k = 9.",
    answerCheck: numeric(9, "Enter the area multiplier k. Square the radius ratio."),
  },
  "4a": {
    prompt: "Find both θ satisfying tan(θ/2) = −1/√3 for 0 ≤ θ ≤ 4π. Give exact values in radians.",
    answer: "θ = 5π/3 or θ = 11π/3",
    solution: "Let u = θ/2, so 0 ≤ u ≤ 2π. Tangent is negative in quadrants II and IV, with reference angle π/6. Thus u = 5π/6 or 11π/6. Doubling both gives θ = 5π/3 or 11π/3, both in the original interval.",
    selfCheck: guided("Solve for the half-angle on its correct domain, then double.", ["Use 0 ≤ θ/2 ≤ 2π.", "Find half-angles 5π/6 and 11π/6.", "Give θ = 5π/3 and 11π/3 in radians."]),
  },
  "4b": {
    prompt: "Sector OAB has radius 7 cm and angle BOA = 1.2 radians. C lies on OB; the region between arc BA and AC is shaded with area 21 cm². Find BC to 1 decimal place.",
    illustration: "p2-2020-shaded-sector",
    answer: "4.4 cm",
    solution: "Sector area is (1/2)r²θ = (1/2)(49)(1.2) = 29.4 cm². The unshaded triangle OAC therefore has area 29.4 − 21 = 8.4 cm². Using its included angle, 8.4 = (1/2)(7)(OC)sin1.2. Thus OC = 16.8/(7sin1.2) ≈ 2.574999 cm and BC = 7 − OC ≈ 4.425001 cm. To one decimal place, BC = 4.4 cm. Use radians, and do not assume AC is perpendicular to OB.",
    answerCheck: numeric(4.4, "Enter BC in cm to 1 decimal place, using radian mode."),
  },
  "5ai": {
    prompt: "P(A) = 3/4 and P(A ∩ B) = 1/2. Find P(B | A) as a fraction in simplest form.",
    answer: "2/3",
    solution: "The conditional probability is P(B | A) = P(A ∩ B)/P(A) = (1/2)/(3/4) = 2/3.",
    answerCheck: { kind: "simplest-fraction", numerator: 2, denominator: 3, placeholder: "e.g. 2/3", hint: "Enter a fraction in lowest terms." },
  },
  "5aii": {
    prompt: "P(A) = 3/4, P(A ∩ B) = 1/2 and P(A ∪ B) = 11/12. Investigate whether A and B are independent.",
    answer: "Yes: P(B) = 2/3 and P(A)P(B) = 1/2 = P(A ∩ B).",
    solution: "By inclusion-exclusion, 11/12 = 3/4 + P(B) − 1/2, so P(B) = 2/3. Then P(A)P(B) = (3/4)(2/3) = 1/2, equal to the supplied intersection probability. This is exactly the independence condition, so the events are independent.",
    selfCheck: guided("Find P(B), then test the independence condition.", ["Use inclusion-exclusion to find P(B) = 2/3.", "Calculate P(A)P(B) = 1/2.", "Compare with P(A ∩ B) and conclude independence."]),
  },
  "5b": {
    prompt: "A fair four-sector spinner has labels 1,1,2,3. Spin twice, add the results and divide by 3. Remainder 0 means Liam wins, 1 Sorcha and 2 Lee. Is the game fair? Justify with winning probabilities.",
    illustration: "p2-2020-spinner",
    answer: "No: Liam and Sorcha each win with probability 5/16; Lee wins with 6/16 = 3/8.",
    solution: "Treat the two sectors labelled 1 as distinct equally likely outcomes. There are 4 × 4 = 16 ordered sector pairs. Sum 3 or 6 gives remainder 0, with four 1-and-2 pairs and one 3-and-3 pair, total 5. Sum 4 gives remainder 1, with four 1-and-3 pairs and one 2-and-2 pair, total 5. Sum 2 or 5 gives remainder 2, with four 1-and-1 pairs and two 2-and-3 pairs, total 6. The probabilities differ, so the game is not fair and favours Lee.",
    selfCheck: guided("Count the 16 equally likely sector pairs and group by remainder.", ["Account for the repeated label 1 having probability 1/2.", "Count remainders 0,1,2 as 5,5,6 outcomes.", "Conclude that the winning probabilities are unequal."]),
  },
  "6a": {
    prompt: "In a carpark, 30% of cars are diesel, 60% petrol and 10% hybrid/electric. Within those groups, respectively 70%,25%,9% are Volkswagen. Find the chance a randomly selected car is Volkswagen.",
    illustration: "p2-2020-car-table",
    answer: "0.369 (36.9%)",
    solution: "The fuel groups partition the carpark. Apply total probability: P(VW) = 0.30(0.70) + 0.60(0.25) + 0.10(0.09) = 0.21 + 0.15 + 0.009 = 0.369. The group-specific percentages must be weighted by the group sizes.",
    answerCheck: numeric(0.369, "Enter the probability as a decimal or percentage, for example 0.369 or 36.9%."),
  },
  "6bi": {
    prompt: "Six people, including Joe, independently take a driving test, each with pass probability 1/4. Find the probability Joe passes along with exactly two of the other five.",
    answer: "135/2048 ≈ 0.06591796875",
    solution: "Joe must pass, with probability 1/4. Among the other five, exactly two must pass: C(5,2)(1/4)²(3/4)³. Multiply to get 10(1/4)³(3/4)³ = 270/4096 = 135/2048. This differs from the event that any three of the six pass, because Joe is specifically required to be one of them.",
    answerCheck: numeric(135 / 2048, "Enter the exact fraction 135/2048 or a decimal with at least 6 decimal places.", 0.0000005),
  },
  "6bii": {
    prompt: "At another test centre, each of n drivers independently passes with probability 1/2. The chance that at most two pass can be written (an² + bn + c)/2^(n+1). Find a,b,c.",
    answer: "a = 1, b = 1, c = 2",
    solution: "For a binomial count, P(X ≤ 2) = [C(n,0) + C(n,1) + C(n,2)]/2ⁿ. The numerator is 1 + n + n(n − 1)/2 = (n² + n + 2)/2. Hence the probability is (n² + n + 2)/2^(n+1), giving a = 1,b = 1,c = 2.",
    answerCheck: { kind: "ordered-values", expected: [1, 1, 2], placeholder: "e.g. 1, 1, 2", hint: "Enter a, b, c in that order. Show the binomial sum in your workings." },
  },
  "7ai": {
    prompt: "A right circular conical cup has top radius 3.3 cm and slant height 9 cm. Show that its vertical height is 8.37 cm, to 2 decimal places.",
    illustration: "p2-2020-cup",
    answer: "h = √(9² − 3.3²) ≈ 8.37 cm",
    solution: "The radius, vertical height and slant height form a right triangle. Pythagoras gives h² = 81 − 10.89 = 70.11. Thus h = √70.11 ≈ 8.373171 cm, or 8.37 cm to two decimal places.",
    selfCheck: guided("Use the right triangle containing the vertical and slant heights.", ["Use the slant height 9 as the hypotenuse.", "Obtain h² = 70.11.", "Take the positive root and round to 8.37 cm."]),
  },
  "7aii": {
    prompt: "Find the curved surface area of a conical cup with radius 3.3 cm and slant height 9 cm, correct to 2 decimal places.",
    illustration: "p2-2020-cup",
    answer: "93.31 cm²",
    solution: "The curved surface area is πrl, where l is slant height. Substitute r = 3.3,l = 9: area = 29.7π ≈ 93.305302 cm², rounding to 93.31 cm². The open cup has no circular lid to include.",
    answerCheck: numeric(93.31, "Enter the curved area in cm² to 2 decimal places."),
  },
  "7aiii": {
    prompt: "The conical cup has radius 3.3 cm and slant height 9 cm. Its net is a sector of radius 9 cm. Find that sector’s central angle θ in degrees.",
    illustration: "p2-2020-cup-net",
    answer: "132°",
    solution: "The net's arc becomes the cup rim, with length 2π(3.3). A full circle of radius 9 has circumference 2π(9). The sector therefore occupies fraction 3.3/9 of a full circle, giving θ = 360(3.3/9) = 132°. The sector radius is the slant height, not the cup base radius.",
    answerCheck: numeric(132, "Enter the sector angle in degrees, without a degree sign."),
  },
  "7b": {
    prompt: "A conical cup has full height 8.37 cm and top radius 3.3 cm. A fill line F is 1 cm vertically below the rim, giving water height 7.37 cm. Find the water volume at F, correct to 1 decimal place.",
    illustration: "p2-2020-cup-fill",
    answer: "65.2 cm³",
    solution: "By similarity, the water-surface radius is r = 3.3(7.37/8.37) ≈ 2.905735 cm. The water forms a smaller cone of height 7.37, so its volume is (1/3)πr²(7.37) ≈ 65.164047 cm³, rounding to 65.2 cm³. Retaining the original unrounded height √70.11 gives about 65.198789 cm³, which rounds to the same result. Do not use the full radius 3.3 at the lower fill line.",
    answerCheck: numeric(65.2, "Enter the water volume in cm³ to 1 decimal place."),
  },
  "7c": {
    prompt: "Water flows into the cup through a pipe of radius 0.8 cm, at speed 2.5 cm/s. The cup volume up to fill line F is about 65.2 cm³. Find the filling time to the nearest second.",
    illustration: "p2-2020-cup-fill",
    answer: "13 seconds",
    solution: "The volumetric flow rate is pipe cross-sectional area times linear speed: Q = π(0.8)²(2.5) = 1.6π cm³/s. Time is volume divided by Q, approximately 65.2/(1.6π) ≈ 12.97 s. To the nearest second, the time is 13 s. Using an unrounded volume from the previous part gives the same rounded answer.",
    answerCheck: numeric(13, "Enter filling time in whole seconds."),
  },
  "7d": {
    prompt: "For the cup of radius 3.3 cm and full height 8.37 cm, move fill line F so the water capacity is 60 cm³. How far vertically below the rim should F be? Give cm to 1 decimal place.",
    illustration: "p2-2020-cup-new-fill",
    answer: "1.2 cm below the rim",
    solution: "Let y be water height from the cone tip. Similarity gives water radius r = 3.3y/8.37. Thus 60 = (1/3)π(3.3y/8.37)²y. Rearrange: y³ = 180(8.37)²/(π(3.3)²), giving y ≈ 7.169935 cm. The requested distance below the rim is 8.37 − y ≈ 1.200065 cm, or 1.2 cm. The original unrounded full height also gives 1.2 cm after rounding.",
    answerCheck: numeric(1.2, "Enter the vertical distance below the rim in cm to 1 decimal place, not the water depth."),
  },
  "8ai": {
    prompt: "A pilot aptitude test has approximately normal marks with mean 280 and standard deviation 90. The top 25% are invited for interview. Find the minimum whole-number mark above the 75th-percentile cutoff.",
    answer: "341 marks (continuous cutoff approximately 340.7)",
    solution: "The lower cumulative probability at the cutoff is 0.75, so z ≈ 0.67449. Hence the cutoff is 280 + 90(0.67449) ≈ 340.70408 marks. The least whole mark above it is 341. Using the table-rounded z = 0.67 gives 340.3 and the same least whole-number threshold.",
    answerCheck: numeric(341, "Enter the minimum whole-number qualifying mark."),
  },
  "8aii": {
    prompt: "On the normal aptitude test with mean 280 and standard deviation 90, anyone above the 40th percentile may re-sit. Eileen scores 260. Decide whether she qualifies and justify your answer.",
    answer: "Yes: the 40th-percentile threshold is about 257.2 marks, below 260.",
    solution: "The standard-normal 40th percentile is about −0.25335. Transform back: 280 + 90(−0.25335) ≈ 257.20. Since Eileen's 260 exceeds this, she is eligible to re-sit. Alternatively, her z-score is (260 − 280)/90 ≈ −0.22222, which has cumulative probability about 0.4121, above 0.40.",
    selfCheck: guided("Compare Eileen’s score or percentile with the 40th-percentile threshold.", ["Use a lower-tail cumulative probability of 0.40.", "Obtain a threshold near 257.2 or Eileen’s percentile near 41.2%.", "Conclude she is eligible because she is above the threshold."]),
  },
  "8bi": {
    prompt: "Explain the relevance of z = −1.96 and z = 1.96 in the standard normal distribution.",
    illustration: "p2-2020-normal-95",
    answer: "Approximately 95% lies between them, leaving about 2.5% in each tail.",
    solution: "For a standard normal Z, P(−1.96 ≤ Z ≤ 1.96) ≈ 0.95. Each tail outside that central interval has probability about 0.025. These cutoffs are used in approximate 95% confidence intervals and two-sided 5% significance tests. They are values of the standardised variable, not probabilities themselves.",
    selfCheck: guided("Explain the central area and the two tail areas.", ["State that the central probability is approximately 0.95.", "Give approximately 0.025 in each tail.", "Relate them to 95% intervals or a two-sided 5% test."]),
  },
  "8bii": {
    prompt: "A survey of n = 2500 passengers gives sample proportion p̂. The radius of its approximate 95% confidence interval is 0.01568. Using margin 1.96√[p̂(1 − p̂)/n], find p̂ given 0.5 < p̂ ≤ 1.",
    answer: "p̂ = 0.8",
    solution: "Set 1.96√[p̂(1 − p̂)/2500] = 0.01568. Divide by 1.96 to get the square root equal to 0.008. Squaring and multiplying by 2500 gives p̂(1 − p̂) = 0.16. Thus p̂² − p̂ + 0.16 = 0, with roots 0.2 and 0.8. The restriction p̂ > 0.5 selects 0.8. The given radius is the half-width, not the full interval width.",
    answerCheck: numeric(0.8, "Enter the proportion p̂ greater than 0.5; 80% is also accepted."),
  },
  "8c": {
    prompt: "The claimed mean carry-on luggage weight is 12 kg. After a fee change, a random sample of 80 has mean 13.1 kg and standard deviation 4.5 kg. Test for a change in the population mean at the 5% level; state both hypotheses and a contextual conclusion.",
    answer: "z ≈ 2.19 > 1.96; reject H₀. Evidence supports a change in mean carry-on weight.",
    solution: "Use H₀: μ = 12 and H₁: μ ≠ 12 because the question asks whether the mean changed. The estimated standard error is 4.5/√80. Thus z = (13.1 − 12)/(4.5/√80) ≈ 2.18638. Since |z| > 1.96, reject H₀ in a two-sided 5% test. There is statistically significant evidence that the mean carry-on weight changed; the sample suggests an increase. This does not by itself establish that the fee caused the change.",
    selfCheck: guided("State hypotheses, calculate the test statistic and justify the decision.", ["Use the two-sided alternative μ ≠ 12.", "Obtain z ≈ 2.19 using standard error 4.5/√80.", "Reject H₀ because |z| exceeds 1.96.", "Conclude evidence of a population mean change in context."]),
  },
  "8d": {
    prompt: "A bus allows at most 3000 kg of passengers. In the model, 40 independent passenger weights are normal with mean 73 kg and standard deviation 12 kg each. Find the probability their total exceeds 3000 kg, as a percentage to 2 decimal places.",
    answer: "About 14.59%; a table-rounded z = 1.05 gives about 14.69%",
    solution: "The total weight has mean 40 × 73 = 2920 kg and standard deviation √(40 × 12²) = 12√40 ≈ 75.89466 kg. Standardise the limit: z = (3000 − 2920)/(12√40) ≈ 1.05409. The upper-tail probability is about 0.1459203, or 14.59%. Rounding z to 1.05 before a table lookup gives 1 − 0.8531 = 0.1469, or 14.69%. Variances add under independence; standard deviations do not add directly.",
    answerCheck: { kind: "numeric-alternatives", expected: [0.1459, 0.1469], placeholder: "e.g. 14.59%", hint: "Enter 14.59% from a calculator or 14.69% from a z = 1.05 table lookup. Equivalent proportions 0.1459 and 0.1469 are accepted." },
  },
  "8e": {
    prompt: "Eight positive whole numbers A–H are ordered with every adjacent gap at least 2. Their median is 12.5, lower quartile 7.5, interquartile range 12, second largest G = 23, range 21 and mean 13.5. Find all eight numbers.",
    illustration: "p2-2020-ordered-table",
    answer: "4, 6, 9, 11, 14, 16, 23, 25",
    solution: "The median gives D + E = 25; the lower quartile gives B + C = 15. The upper quartile is 7.5 + 12 = 19.5, so F + G = 39 and F = 16. The total is 8 × 13.5 = 108. Subtract (B + C) + (D + E) + F + G = 79 to get A + H = 29. Since H − A = 21, A = 4,H = 25. Gaps imply B ≥ 6, while C ≥ B + 2 and B + C = 15 imply B ≤ 6.5. Thus B = 6,C = 9. Similarly D ≥ 11 and D + E = 25 with E ≥ D + 2 force D = 11,E = 14. All gaps, quartiles, range and mean then check.",
    answerCheck: { kind: "ordered-values", expected: [4, 6, 9, 11, 14, 16, 23, 25], placeholder: "e.g. 4, 6, 9, 11, 14, 16, 23, 25", hint: "Enter all eight numbers A through H in order, including the given G = 23." },
  },
  "9a": {
    prompt: "Port A is 90 km west of Port B. Ship A heads east from A at 15 km/h while Ship B heads south from B at 30 km/h, starting together. Find their separation after 30 minutes, in km to 2 decimal places.",
    illustration: "p2-2020-ships",
    answer: "83.85 km",
    solution: "Thirty minutes is 0.5 hours. Ship A has moved 7.5 km east, leaving horizontal separation 90 − 7.5 = 82.5 km. Ship B has moved 15 km south. By Pythagoras, separation = √(82.5² + 15²) ≈ 83.852549 km, rounding to 83.85 km.",
    answerCheck: numeric(83.85, "Enter the separation in km to 2 decimal places."),
  },
  "9b": {
    prompt: "For ships starting 90 km apart, A moving east at 15 km/h and B south at 30 km/h, show their separation is s(t) = √(1125t² − 2700t + 8100), for 0 ≤ t ≤ 6 hours.",
    illustration: "p2-2020-ships",
    answer: "s² = (90 − 15t)² + (30t)² = 1125t² − 2700t + 8100",
    solution: "At time t hours, the horizontal separation is 90 − 15t and vertical separation is 30t. Since the directions are perpendicular, s² = (90 − 15t)² + (30t)². Expanding gives 8100 − 2700t + 225t² + 900t² = 1125t² − 2700t + 8100. Taking the positive square root gives the required distance function.",
    selfCheck: guided("Write the two perpendicular separations and apply Pythagoras.", ["Use 90 − 15t horizontally and 30t vertically.", "Expand their squared sum correctly.", "Take the non-negative square root to represent distance."]),
  },
  "9c": {
    prompt: "Use calculus to find when s(t) = √(1125t² − 2700t + 8100) is smallest on 0 ≤ t ≤ 6, and find that distance in km to 1 decimal place.",
    illustration: "p2-2020-ships",
    answer: "t = 1.2 hours; minimum distance 80.5 km",
    solution: "Differentiate: s′(t) = (2250t − 2700)/[2√(1125t² − 2700t + 8100)]. The denominator is positive, so the derivative vanishes at t = 2700/2250 = 1.2. It is negative before 1.2 and positive afterwards, establishing the minimum on [0,6]. Substitute to get s(1.2) = √6480 ≈ 80.498447 km, or 80.5 km. Equivalently, minimise the squared distance by calculus, since the square root is increasing for positive inputs.",
    answerCheck: { kind: "ordered-values", expected: [1.2, 80.5], placeholder: "e.g. 1.2, 80.5", hint: "Enter time in hours, minimum distance in km. Round only the distance to 1 decimal place and show the calculus in your workings." },
  },
};

export const realPaper2020p2: StudyPaper = {
  id: paperId, year: 2020, level: "Higher", paperNumber: 2, kind: "real", estimatedMinutes: 150,
  title: "2020 Higher Level Paper 2",
  description: "All nine questions ready onscreen with worked solutions and answer checks or guided self-checks.",
  questions: bookPaper.parts.map((part) => {
    const code = part.id.slice(paperId.length + 1);
    if (!content[code]) throw new Error(`Missing reviewed content for ${part.id}`);
    return { id: part.id, number: part.label.replace(/^Q/, "").replace("(", " ("), marks: null,
      topic: part.topicIds.includes("p2-circle") ? "Coordinate geometry · The circle" : part.topicIds.includes("p2-line") ? "Coordinate geometry · The line" : part.topicIds.includes("p2-probability") ? "Probability" : part.topicIds.includes("p2-statistics") ? "Statistics" : part.topicIds.includes("p2-trigonometry") ? "Trigonometry" : "Geometry, area and volume",
      ...content[code] };
  }),
};
