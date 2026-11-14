import bookPaper from "./book2021p2.json";
import type { AnswerCheck, StudyPaper, StudyQuestion } from "../types";

const paperId = "lc-hl-2021-normal-p2";
type Content = Pick<StudyQuestion, "prompt" | "answer" | "solution"> & Partial<Pick<StudyQuestion, "expression" | "illustration" | "answerCheck" | "selfCheck">>;
const numeric = (expected: number, hint: string, tolerance?: number): AnswerCheck => ({ kind: "numeric", expected, tolerance, placeholder: `e.g. ${expected}`, hint });
const guided = (placeholder: string, checks: string[]) => ({ placeholder, checks });

// Prompts and diagrams reviewed against printed pages 4–27. These are authored
// study solutions, without verified individual marks or official scheme claims.
const content: Record<string, Content> = {
  "1a": {
    prompt: "In a population, 15% are left-footed. An 11-player soccer team including a goalkeeper is chosen randomly. Using independent player selections, find the probability of exactly one left-footed player, to 3 decimal places.",
    answer: "0.325",
    solution: "Let X count left-footed players, so X has a binomial model with n = 11,p = 0.15. Exactly one can occupy any of the 11 positions: P(X = 1) = C(11,1)(0.15)(0.85)¹⁰ ≈ 0.324842767. This rounds to 0.325.",
    answerCheck: numeric(0.325, "Enter the probability rounded to 3 decimal places."),
  },
  "1b": {
    prompt: "For the random 11-player team with independent left-foot probability 0.15, find the probability fewer than three players are left-footed, to 2 decimal places.",
    answer: "0.78",
    solution: "Fewer than three means X = 0,1,2. Sum 0.85¹¹ + 11(0.15)(0.85)¹⁰ + C(11,2)(0.15)²(0.85)⁹ ≈ 0.778811982. To two decimal places this is 0.78. Do not include X = 3.",
    answerCheck: numeric(0.78, "Enter the probability to 2 decimal places."),
  },
  "1c": {
    prompt: "The goalkeeper is known to be left-footed. Of the other ten independently selected players, each has right-foot probability 0.85. Find the probability at least eight of those ten are right-footed, to 2 decimal places.",
    answer: "0.82",
    solution: "Only the ten other players remain random. At least eight right-footed is equivalent to at most two left-footed among ten. Thus the probability is 0.85¹⁰ + 10(0.15)(0.85)⁹ + C(10,2)(0.15)²(0.85)⁸ ≈ 0.820196480, rounding to 0.82. Do not multiply by the goalkeeper's probability, since that information is already given.",
    answerCheck: numeric(0.82, "Enter the conditional probability to 2 decimal places."),
  },
  "2a": {
    prompt: "The point (k,(2k + 2)/3) lies on 3x − 6y + 2 = 0. Find k.",
    answer: "k = −2",
    solution: "Substitute x = k,y = (2k + 2)/3: 3k − 6(2k + 2)/3 + 2 = 0. Simplify to 3k − 4k − 4 + 2 = 0, so −k − 2 = 0 and k = −2. The point is (−2,−2/3), which satisfies the line equation.",
    answerCheck: numeric(-2, "Enter k."),
  },
  "2b": {
    prompt: "P(s,t) lies on x − 2y − 8 = 0 and is one unit from the line 4x + 3y + 6 = 0. Find one possible point P.",
    answer: "P = (2,−3) or P = (2/11,−43/11); one is sufficient",
    solution: "The first line gives s = 2t + 8. The distance formula gives |4s + 3t + 6|/√(4² + 3²) = 1, so |11t + 38| = 5. Thus t = −3 or −43/11, with s = 2 or 2/11 respectively. Either point meets both conditions. For (2,−3), the first line gives 2 + 6 − 8 = 0 and the distance is |8 − 9 + 6|/5 = 1.",
    selfCheck: guided("Use the point-to-line distance formula and show one valid coordinate pair.", ["Use s = 2t + 8.", "Set |4s + 3t + 6| = 5, accounting for the absolute value.", "Give either (2,−3) or (2/11,−43/11) and check both conditions."]),
  },
  "2ci": {
    prompt: "A(4,2) and C(16,11) are vertices of ABC. D lies on AC with AD:DC = 2:1. Find AD.",
    illustration: "p2-2021-section-triangle",
    answer: "10 units",
    solution: "AC = √[(16 − 4)² + (11 − 2)²] = √225 = 15. The ratio gives AD = (2/3)AC = 10 units.",
    answerCheck: numeric(10, "Enter the length AD."),
  },
  "2cii": {
    prompt: "In the supplied triangle A(4,2), C(16,11), B lies to the right of A. AB and DE are horizontal, AB = 33, and D lies on AC with AD:DC = 2:1. E lies on CB. Find B and E.",
    illustration: "p2-2021-section-triangle",
    answer: "B = (37,2), E = (23,8)",
    solution: "AB is horizontal and extends right by 33, so B = (4 + 33,2) = (37,2). D = A + (2/3)(C − A) = (12,8). Since DE is horizontal, E has y-coordinate 8. This is one third of the way down from C to B, so E = C + (1/3)(B − C) = (23,8).",
    answerCheck: { kind: "ordered-values", expected: [37, 2, 23, 8], placeholder: "e.g. 37, 2, 23, 8", hint: "Enter Bx, By, Ex, Ey in that order." },
  },
  "3a": {
    prompt: "A circle has centre C(1,−2). Chord AB has length 4√3 and midpoint D(3,2). Find the radius in a√b form.",
    illustration: "p2-2021-chord",
    answer: "4√2 units",
    solution: "The line from the centre to a chord's midpoint is perpendicular to the chord. CD² = (3 − 1)² + (2 + 2)² = 20. Half the chord is 2√3, whose square is 12. By Pythagoras in CDA, radius² = 20 + 12 = 32. The positive radius is √32 = 4√2.",
    selfCheck: guided("Use the perpendicular bisector of the chord and Pythagoras.", ["Find CD² = 20.", "Use half-chord length 2√3.", "Obtain radius √32 = 4√2."]),
  },
  "3bi": {
    prompt: "Show that c: x² + y² + 4x − 2y − 95 = 0 and s: (x − 7)² + (y − 13)² = 25 touch externally.",
    answer: "Centres (−2,1),(7,13), radii 10,5; centre distance 15 equals the sum of radii.",
    solution: "Complete the square for c: (x + 2)² + (y − 1)² = 100. Thus its centre is (−2,1) and radius 10. Circle s has centre (7,13) and radius 5. The centre distance is √(9² + 12²) = 15 = 10 + 5. Equality with the sum of positive radii establishes external tangency.",
    selfCheck: guided("Find both centres and radii, then compare their distance.", ["Complete the square to obtain radius 10 for c.", "Compute centre distance 15.", "Explain that 15 = 10 + 5 means external tangency."]),
  },
  "3bii": {
    prompt: "Circles c: (x + 2)² + (y − 1)² = 100 and s: (x − 7)² + (y − 13)² = 25 touch externally. Find the centre of another circle, distinct from s, that touches c externally at the same point.",
    answer: "One example is (10,17), with radius 10",
    solution: "From C = (−2,1) toward S = (7,13), the unit direction is (3/5,4/5). The contact point is T = C + 10(3/5,4/5) = (4,9). A new external circle must have centre on the ray from T continuing away from C. For example choose radius 10 and centre T + 10(3/5,4/5) = (10,17). Its centre is 20 units from C and 10 from T, confirming external tangency there. More generally T + ρ(3/5,4/5), with ρ > 0 and ρ ≠ 5, supplies a valid centre.",
    selfCheck: guided("Find the contact point and choose a different centre on the outward normal ray.", ["Find T = (4,9).", "Place the new centre beyond T away from (−2,1).", "Check that distance between centres is 10 plus the new radius.", "Exclude the original centre (7,13); other valid examples are possible."]),
  },
  "4ai": {
    prompt: "Prove cos(2A) = cos²A − sin²A.",
    answer: "Use the cosine addition formula with both angles equal to A.",
    solution: "Start from cos(A + B) = cos A cos B − sin A sin B. Set B = A. Then cos(2A) = cos A cos A − sin A sin A = cos²A − sin²A, as required.",
    selfCheck: guided("State the addition identity and specialise it to equal angles.", ["Use the minus sign in the cosine addition formula.", "Set B = A and simplify to the stated identity."]),
  },
  "4aii": {
    prompt: "sin(θ/2) = 1/√5, with 0 ≤ θ ≤ π. Use cos(2A) = cos²A − sin²A to find cos θ.",
    answer: "3/5",
    solution: "sin²(θ/2) = 1/5, so cos²(θ/2) = 1 − 1/5 = 4/5. With A = θ/2, the identity gives cos θ = 4/5 − 1/5 = 3/5.",
    answerCheck: numeric(3 / 5, "Enter the exact value or its decimal equivalent."),
  },
  "4b": {
    prompt: "Solve tan(B + 150°) = −√3 for 0° ≤ B ≤ 360°.",
    answer: "B = 150° or B = 330°",
    solution: "tan θ = −√3 when θ = 120° + 180°k. Therefore B = −30° + 180°k. Within [0°,360°] the possibilities are 150° and 330°. Substituting gives angles 300° and 480°, both with tangent −√3.",
    answerCheck: { kind: "number-set", expected: [150, 330], placeholder: "e.g. 150, 330", hint: "Enter both angle values in degrees, without degree signs, in either order." },
  },
  "5ai": {
    prompt: "Two identical right circular cones meet at their bases and fit exactly inside a sphere as shown: the common base is an equatorial circle and the cone tips are the opposite poles. Prove the remaining space is half the sphere’s volume.",
    illustration: "p2-2021-double-cone",
    answer: "The cones occupy (2/3)πR³, half the sphere’s (4/3)πR³, leaving half.",
    solution: "Let the sphere radius be R. Each cone has base radius R and perpendicular height R. Their total volume is 2 × (1/3)πR²R = (2/3)πR³. The sphere volume is (4/3)πR³. Subtracting the cone volume leaves (2/3)πR³, exactly one half of the sphere volume.",
    selfCheck: guided("Express both volumes using the same radius R and subtract.", ["Identify each cone’s radius and height as R.", "Find combined cone volume (2/3)πR³.", "Subtract from (4/3)πR³ and establish the half-volume result."]),
  },
  "5aii": {
    prompt: "The two identical cones fitting pole-to-pole inside a sphere have combined volume (686/3)π cm³. Find the base radius of either cone.",
    illustration: "p2-2021-double-cone",
    answer: "7 cm",
    solution: "For sphere radius R, each cone has base radius and height R, so combined volume is (2/3)πR³. Equate this to (686/3)π: 2R³ = 686, so R³ = 343 and R = 7 cm.",
    answerCheck: numeric(7, "Enter the cone’s base radius in cm."),
  },
  "5b": {
    prompt: "A van leaves at 09:00 and travels at 60 km/h. A second leaves the same factory on the same route at 10:45 and travels at 95 km/h. They arrive at the destination together. Find the arrival time.",
    answer: "13:45 (1:45 p.m.)",
    solution: "Let t be hours after 09:00. The second van has t − 1.75 hours of travel. Equal distances give 60t = 95(t − 1.75), so 35t = 166.25 and t = 4.75 hours. Add 4 hours 45 minutes to 09:00 to get 13:45. Both travel 285 km.",
    answerCheck: { kind: "ordered-values", expected: [13, 45], placeholder: "e.g. 13, 45", hint: "Enter the 24-hour clock hour, minute separated by a comma." },
  },
  "6a": {
    prompt: "Prove that triangles ABC and A′B′C′ with equal corresponding angles have proportional corresponding sides: AB/A′B′ = BC/B′C′ = CA/C′A′. Include a labelled construction and reasons.",
    illustration: "p2-2021-similar-triangles",
    answer: "A congruent copy of the smaller triangle inside the larger one, together with parallel-line intercept ratios, gives the three equal side ratios.",
    solution: "Relabel the two triangles if necessary so AB ≥ A′B′; equality gives congruence by ASA. Otherwise mark D on AB with AD = A′B′ and draw DE parallel to BC, meeting AC at E. Corresponding angles show triangle ADE is congruent to A′B′C′ by ASA, so AE = A′C′ and DE = B′C′. The parallel-line intercept theorem gives AD/AB = AE/AC. To get the third ratio without assuming the result being proved, draw DF parallel to AC, meeting BC at F. In triangle BAC, the intercept theorem gives BD/BA = BF/BC. Also DECF is a parallelogram, so FC = DE. Therefore AD/AB = 1 − BD/BA = 1 − BF/BC = FC/BC = DE/BC. Combining the ratios and substituting the congruent sides gives A′B′/AB = A′C′/AC = B′C′/BC. Taking reciprocals proves the required statement. The intercept theorem used here follows from the areas of triangles on the same altitude and between parallel lines.",
    selfCheck: guided("Draw the construction and give a reason for each equality.", ["Match corresponding vertices and angles.", "Construct D,E so ADE is congruent to A′B′C′ by ASA.", "Use parallel-line intercept ratios, with the auxiliary parallel through D if needed.", "Conclude all three corresponding side ratios agree; do not simply assume the theorem as your proof."]),
  },
  "6b": {
    prompt: "In the supplied diagram PA, HK and BR are parallel. A,H,B are collinear and P,H,Q are collinear. Prove AH × QB = AP × HB, giving reasons for the geometrical statements.",
    illustration: "p2-2021-parallel-proof",
    answer: "Triangles AHP and BHQ are similar, so AH/HB = AP/BQ; cross-multiply.",
    solution: "Angle AHP equals BHQ because they are vertically opposite angles where AB and PQ meet. Angle APH equals BQH because PA is parallel to BQ (BQ lies on BR) and PQ is a transversal. Hence triangles AHP and BHQ are similar by AA. Corresponding sides give AH/HB = AP/BQ. Cross-multiplying yields AH × QB = AP × HB. The remaining points and parallel HK do not need to be used for this particular equality.",
    selfCheck: guided("Identify the two triangles, justify their matching angles and use a side ratio.", ["Use AHP and BHQ with vertically opposite angles at H.", "Use PA parallel to BQ to justify the other matching angles.", "State the correct corresponding-side ratio and cross-multiply."]),
  },
  "7a": {
    prompt: "A level triangular triathlon course consists of a 4 km swim from C to B, cycling B to A at 25 km/h for 1 h 12 min, and a 28 km run A to C. Show its total length is 62 km.",
    illustration: "p2-2021-triathlon",
    answer: "Cycling distance 30 km; total 4 + 30 + 28 = 62 km",
    solution: "Convert 1 h 12 min to 1 + 12/60 = 1.2 hours. Cycling distance is speed × time = 25 × 1.2 = 30 km. Add the three legs: 4 + 30 + 28 = 62 km.",
    selfCheck: guided("Convert the cycling time, calculate that leg and add the three distances.", ["Use 1.2 hours, not 1.12 hours.", "Find cycling distance 30 km.", "Add to get 62 km."]),
  },
  "7b": {
    prompt: "Mary swims 4 km, cycles for 1.2 hours and runs 28 km. Her running speed is 5.6 times her swimming speed. The total time is 4.8 hours. Find her average swimming speed.",
    answer: "2.5 km/h",
    solution: "Let swimming speed be v km/h, so running speed is 5.6v. The time equation is 4/v + 1.2 + 28/(5.6v) = 4.8. Since 28/5.6 = 5, this becomes 9/v = 3.6 and v = 2.5 km/h. The run speed is 14 km/h, giving times 1.6 + 1.2 + 2 = 4.8 hours.",
    answerCheck: numeric(2.5, "Enter the swimming speed in km/h."),
  },
  "7c": {
    prompt: "The triathlon triangle has AC = 28 km, BC = 4 km and AB = 30 km. Show that angle ACB is 116.5°, to 1 decimal place.",
    illustration: "p2-2021-triathlon",
    answer: "cos C = −25/56, giving C ≈ 116.5148° → 116.5°",
    solution: "The cosine rule gives cos C = (28² + 4² − 30²)/(2 × 28 × 4) = −100/224 = −25/56. Taking arccos gives C ≈ 116.514775°, which rounds to 116.5°. Its cosine is negative, consistent with an obtuse angle.",
    selfCheck: guided("Use the cosine rule with AB opposite C.", ["Obtain cos C = −25/56.", "Use the obtuse arccos value.", "Round to 116.5°."]),
  },
  "7d": {
    prompt: "Find the area inside the triathlon triangle with sides AC = 28 km, BC = 4 km and AB = 30 km. Give km² to 1 decimal place.",
    illustration: "p2-2021-triathlon",
    answer: "50.1 km²",
    solution: "Using the unrounded angle C = arccos(−25/56), area = (1/2)(28)(4)sin C ≈ 50.109879 km². This rounds to 50.1 km². Heron's formula with semiperimeter 31 gives the same result: √[31(31 − 28)(31 − 4)(31 − 30)] = √2511.",
    answerCheck: numeric(50.1, "Enter the area in km² to 1 decimal place."),
  },
  "7e": {
    prompt: "For the triathlon triangle AB = 30 km, AC = 28 km and BC = 4 km, find the shortest distance from C to the side AB, in km to 1 decimal place.",
    illustration: "p2-2021-triathlon",
    answer: "3.3 km",
    solution: "The shortest distance is the perpendicular height to AB. With area √2511 ≈ 50.109879 km², use area = (1/2)(30)h. Thus h = 2√2511/30 ≈ 3.340659 km, rounding to 3.3 km. The perpendicular foot lies on segment AB for this triangle.",
    answerCheck: numeric(3.3, "Enter the perpendicular distance in km to 1 decimal place."),
  },
  "7f": {
    prompt: "A camera tower rises vertically from A on the level triathlon course. Its top is T. AB = 30 km and the elevation of T from B is 0.05°. Find tower height AT to the nearest metre.",
    illustration: "p2-2021-tower",
    answer: "26 m",
    solution: "In the right triangle BAT, tan0.05° = AT/AB. Convert AB = 30 km to 30,000 m, then AT = 30,000tan0.05° ≈ 26.179945 m. The nearest metre is 26 m. Use degree mode and do not confuse 0.05° with 5°.",
    answerCheck: numeric(26, "Enter tower height in whole metres."),
  },
  "8ai": {
    prompt: "Exam marks are approximately normal with mean 176 and standard deviation 36. Only the top 10% progress to a competition. Find the minimum integer mark above the modelled 90th-percentile cutoff.",
    answer: "223 marks",
    solution: "The lower cumulative probability is 0.90, so z ≈ 1.28155. The cutoff is 176 + 36(1.28155) ≈ 222.13586 marks. Marks are integers, so the least integer exceeding this cutoff is 223. Using table z = 1.28 gives 222.08 and the same integer threshold. This asks for a minimum qualifying integer, not rounding a time or measurement to the nearest integer.",
    answerCheck: numeric(223, "Enter the minimum whole-number mark meeting the upper-10% cutoff."),
  },
  "8aii": {
    prompt: "For approximately normal exam marks with mean 176 and standard deviation 36, find the percentage between 165 and 210 marks. Explain your normal approximation and any table rounding.",
    answer: "About 44.76% using unrounded z-scores, or about 44.81% with z rounded to −0.31 and 0.94",
    solution: "Standardise the bounds: z₁ = (165 − 176)/36 ≈ −0.30556 and z₂ = (210 − 176)/36 ≈ 0.94444. The probability is Φ(z₂) − Φ(z₁) ≈ 0.447557, or 44.76%. Rounding z first to −0.31 and 0.94 and using normal tables gives about 44.81%. Since the source describes integer marks using a continuous normal model, a continuity-corrected approximation can differ; state the convention you use and compare the interval/tail method rather than forcing one exact percentage.",
    selfCheck: guided("Standardise both bounds and subtract cumulative probabilities.", ["Use z ≈ −0.3056 and 0.9444, or consistent table-rounded values.", "Subtract the lower cumulative probability from the upper.", "Get about 44.8% without continuity correction; identify any different approximation convention."]),
  },
  "8bi": {
    prompt: "A report claims a population mean study time of 21 h/week. A random sample of 60 students has mean 19.8 and standard deviation 5.2 hours. Find the test statistic z.",
    answer: "z ≈ −1.7875 (about −1.79)",
    solution: "The estimated standard error of the sample mean is 5.2/√60 ≈ 0.671317. Thus z = (19.8 − 21)/(5.2/√60) ≈ −1.787531. The negative sign means the observed sample mean is below the claimed population mean.",
    answerCheck: numeric(-1.787530775172653, "Enter the signed test statistic. Values rounded to -1.79 are accepted.", 0.005),
  },
  "8bii": {
    prompt: "For the sample study-time statistic z ≈ −1.7875, find the two-sided p-value and assess the claim μ = 21 h/week at the 5% level. The sample has n = 60, mean 19.8 and standard deviation 5.2 hours.",
    answer: "p ≈ 0.074 > 0.05; do not reject the claim of mean 21 hours",
    solution: "For H₀: μ = 21 against H₁: μ ≠ 21, the p-value is twice the lower tail at −1.7875: p = 2Φ(−1.7875) ≈ 0.07385. Using rounded z = −1.79 gives about 0.0734. Both exceed 0.05, so there is insufficient evidence to reject H₀ at the 5% level. This does not prove that the reported population mean is correct; the sample difference is not statistically significant at this level.",
    selfCheck: guided("Calculate a two-sided p-value and justify the contextual conclusion.", ["Double the one-tail probability.", "Compare about 0.074 with 0.05.", "Do not reject H₀; distinguish insufficient evidence from proof of the claim."]),
  },
  "8ci": {
    prompt: "A box contains 23 keys: 12 classroom, 6 science lab and 5 office keys. Four are drawn without replacement. Find the probability the fourth is the first office key, to 4 decimal places.",
    answer: "0.1152",
    solution: "There are 18 non-office keys. The required ordered pattern is non-office, non-office, non-office, office. Its probability is (18/23)(17/22)(16/21)(5/20) ≈ 0.115189159, rounding to 0.1152. The number of office keys stays 5 until the fourth draw.",
    answerCheck: numeric(0.1152, "Enter the probability to 4 decimal places."),
  },
  "8cii": {
    prompt: "All 23 keys are in the box again: 12 classroom, 6 lab, 5 office. Three are drawn without replacement. Find the probability of one key of each type in any order, to 4 decimal places.",
    answer: "0.2033",
    solution: "For a fixed order classroom,lab,office, the probability is (12/23)(6/22)(5/21). There are 3! = 6 possible type orders with the same probability, so multiply by 6 to get about 0.203274986, or 0.2033. Equivalently, favourable unordered sets number 12 × 6 × 5 out of C(23,3).",
    answerCheck: numeric(0.2033, "Enter the probability to 4 decimal places; include all six type orders."),
  },
  "9ai": {
    prompt: "A plane flies east from A to B for 2 hours at 420 km/h, then turns 20° south of east toward C at the same speed. AC = 1450 km and angle BAC = 8.57°. Find the flight time from B to C, to the nearest minute.",
    illustration: "p2-2021-flight",
    answer: "90 minutes",
    solution: "The interior angle at B is 180° − 20° = 160°. By the sine rule, BC/sin8.57° = 1450/sin160°, giving BC ≈ 631.762604 km. Divide by 420 km/h and multiply by 60: time ≈ 90.251801 minutes. To the nearest minute this is 90 minutes. The 20° turn is an exterior angle.",
    answerCheck: numeric(90, "Enter total minutes for the B-to-C leg, rounded to the nearest minute."),
  },
  "9aii": {
    prompt: "The plane flies A–B–C–A at 420 km/h, with AB = 840 km, AC = 1450 km and BC ≈ 631.76 km. It burns 3.8 L/s and holds 100,000 L. Show that it can complete the trip without refuelling.",
    illustration: "p2-2021-flight",
    answer: "About 95,166 litres needed, below 100,000 litres",
    solution: "The total distance is about 840 + 631.762604 + 1450 = 2921.762604 km. Time at 420 km/h is about 6.956578 hours, or 25,043.679 seconds. At 3.8 L/s this requires about 95,165.982 L. Since this is less than 100,000 L, the stated capacity suffices in this constant-speed, constant-consumption model. Carrying forward the rounded 90-minute leg gives about 95,108.57 L and the same conclusion.",
    selfCheck: guided("Add all three legs, convert travel time to seconds and compare fuel with capacity.", ["Include the return leg CA.", "Convert hours to seconds before multiplying by 3.8 L/s.", "Obtain roughly 95,000–95,200 L, depending on intermediate rounding.", "Explicitly compare with 100,000 L."]),
  },
  "9bi": {
    prompt: "An alternating voltage is V(t) = 110√2 sin(120πt), with t in seconds and angles in radians. Find its period and range.",
    answer: "Period 1/60 s; range [−110√2, 110√2] volts",
    solution: "The sine repeats after an angle increase of 2π, so 120πp = 2π and p = 1/60 s. Its amplitude is 110√2 and sine takes every value from −1 to 1. Thus the voltage range is the closed interval [−110√2,110√2].",
    selfCheck: guided("Find one full angular cycle and use the amplitude to state the range.", ["Use p = 2π/(120π) = 1/60 s.", "Include both negative and positive extrema ±110√2.", "Use a closed range because both extrema are attained."]),
  },
  "9bii": {
    prompt: "Sketch V(t) = 110√2 sin(120πt) over one period 0 ≤ t ≤ p. Label its period and range on your paper graph.",
    illustration: "p2-2021-voltage-axes",
    answer: "A sine wave through (0,0), (1/240,110√2), (1/120,0), (1/80,−110√2), (1/60,0).",
    solution: "The period is p = 1/60 s. Start at zero and rise to the positive maximum at p/4 = 1/240, cross zero at p/2 = 1/120, reach the negative minimum at 3p/4 = 1/80, and return to zero at p = 1/60. Join with a smooth sine curve and label extrema ±110√2 V and period 1/60 s.",
    selfCheck: guided("Sketch on paper and label the five quarter-period points.", ["Start at zero rising.", "Use the correct quarter-period times and extrema.", "Label period 1/60 s and the range ±110√2 V."]),
  },
  "9biii": {
    prompt: "For V(t) = 110√2 sin(120πt), find V(6.67) in volts to 2 decimal places. Angles are in radians.",
    answer: "147.95 V",
    solution: "Substitute the given time exactly: V(6.67) = 110√2 sin(800.4π). Removing 400 full cycles leaves sin(0.4π), so the value is about 147.949673 V, or 147.95 V. Do not round the time to 20/3: this rapidly oscillating function is sensitive to that change.",
    answerCheck: numeric(147.95, "Enter volts to 2 decimal places. Use t = 6.67 exactly and radian mode."),
  },
  "9biv": {
    prompt: "Find one positive time t for which V(t) = 110√2 sin(120πt) equals 110 V. Give t as a fraction a/b of a second with positive integer a,b.",
    answer: "For example, t = 1/480 s; t = 1/160 s also works",
    solution: "Divide by 110√2 to get sin(120πt) = 1/√2. One solution is 120πt = π/4, giving t = 1/480 s. Another within the first period is 120πt = 3π/4, giving 1/160 s. Adding any whole number of periods 1/60 s to either gives further positive solutions. The question asks for just one valid fraction.",
    selfCheck: guided("Choose a valid sine angle and express the resulting positive time as a fraction.", ["Use sin(120πt) = 1/√2.", "Use π/4 or 3π/4, with periodic additions also valid.", "Verify your time gives 110 V."]),
  },
  "9bv": {
    prompt: "For V(t) = 110√2 sin(120πt), find the rate of change of voltage at t = 2 seconds, to the nearest whole unit.",
    answer: "58,646 V/s",
    solution: "Differentiate using the chain rule: V′(t) = 13,200π√2 cos(120πt). At t = 2, cos240π = 1. Therefore V′(2) = 13,200π√2 ≈ 58,646.054784 V/s, rounding to 58,646 V/s. This is a derivative, not the voltage value.",
    answerCheck: numeric(58646, "Enter the signed rate in whole volts per second, without a thousands separator."),
  },
  "10ai": {
    prompt: "In the exam’s probability model, 8% of donors have O-negative blood type, independently. Find the probability that the tenth donor is the third O-negative donor, to 4 decimal places.",
    answer: "0.0103",
    solution: "The first nine donors must contain exactly two O-negative donors and the tenth must be O-negative. Thus the probability is C(9,2)(0.08)²(0.92)⁷ × 0.08 ≈ 0.010282229, rounding to 0.0103. Choosing three positions from ten would not enforce that the tenth is the third such donor.",
    answerCheck: numeric(0.0103, "Enter the probability to 4 decimal places."),
  },
  "10aii": {
    prompt: "With independent O-negative probability 0.08 per donor, find the chance at least one of five donors is O-negative, to 4 decimal places.",
    answer: "0.3409",
    solution: "The probability none is O-negative is 0.92⁵. Take the complement: 1 − 0.92⁵ = 0.3409184768, rounding to 0.3409.",
    answerCheck: numeric(0.3409, "Enter the probability to 4 decimal places."),
  },
  "10aiii": {
    prompt: "Each donor independently has probability 0.08 of being O-negative. Find the minimum number of donors so that the probability of at least one O-negative donor is greater than 0.97.",
    answer: "43 donors",
    solution: "Require 1 − 0.92ⁿ > 0.97, or 0.92ⁿ < 0.03. Take logarithms: n ln0.92 < ln0.03. Since ln0.92 is negative, dividing reverses the inequality: n > ln0.03/ln0.92 ≈ 42.054332. The least whole number is 43. Check the strict threshold with n = 42 and 43.",
    answerCheck: numeric(43, "Enter the minimum whole number of donors. The probability must exceed 0.97."),
  },
  "10b": {
    prompt: "A heating-system repair costs €70 and succeeds with probability 0.8. If it fails, a new part costs €150 plus €80 extra labour. Find the expected total fixing cost when the repair is attempted first.",
    answer: "€116",
    solution: "The €70 repair is paid in every case. With probability 0.2 it fails and adds €150 + €80 = €230. Expected cost is therefore €70 + 0.2(€230) = €116. Equivalently, 0.8(70) + 0.2(300) = 116. The unsuccessful repair cost is still included.",
    answerCheck: numeric(116, "Enter the expected total cost in euro, without a currency symbol."),
  },
  "10c": {
    prompt: "An insurance model pays €120,000 on death with annual probability 0.0001 and €40,000 on disability with annual probability 0.002. There are 18,000 equal-premium policies and the target expected annual profit is €900,000. Find the annual premium, using only these modelled payouts and profit.",
    answer: "€142 per policy",
    solution: "Expected annual payout per policy is 120,000(0.0001) + 40,000(0.002) = 12 + 80 = €92. The target expected profit per policy is 900,000/18,000 = €50. Therefore the premium is 92 + 50 = €142. Across all policies, expected receipts €2,556,000 minus expected payouts €1,656,000 give the target €900,000.",
    answerCheck: numeric(142, "Enter the annual premium per policy in euro, without a currency symbol."),
  },
};

export const realPaper2021p2: StudyPaper = {
  id: paperId, year: 2021, level: "Higher", paperNumber: 2, kind: "real",
  title: "2021 Higher Level Paper 2", estimatedMinutes: 150,
  description: "All ten questions ready onscreen with worked solutions and answer checks or guided self-checks.",
  questions: bookPaper.parts.map((part) => {
    const code = part.id.slice(paperId.length + 1);
    if (!content[code]) throw new Error(`Missing reviewed content for ${part.id}`);
    return { id: part.id, number: part.label.replace(/^Q/, "").replace("(", " ("), marks: null,
      topic: part.topicIds.includes("p2-circle") ? "Coordinate geometry · The circle" : part.topicIds.includes("p2-line") ? "Coordinate geometry · The line" : part.topicIds.includes("p2-probability") ? "Probability" : part.topicIds.includes("p2-statistics") ? "Statistics" : part.topicIds.includes("p2-trigonometry") ? "Trigonometry" : "Geometry, area and volume",
      ...content[code] };
  }),
};
