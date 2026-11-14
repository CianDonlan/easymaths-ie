import bookPaper from "./book2019p2.json";
import type { StudyPaper, StudyQuestion } from "../types";

const paperId = "lc-hl-2019-normal-p2";
type Content = Pick<StudyQuestion, "prompt" | "answer" | "solution"> & Partial<Pick<StudyQuestion, "expression" | "illustration" | "answerCheck" | "selfCheck">>;

// Authored study explanations, reviewed against printed source pages 4–24.
// No individual leaf marks or official marking-scheme allocations are claimed.
const content: Record<string, Content> = {
  "1ai": {
    "prompt": "A class has 12 boys and 8 girls. Two students are selected at random without replacement. Find the probability of one boy and one girl in either order.",
    "answer": "48/95",
    "solution": "Add the two disjoint orders: (12/20)(8/19) + (8/20)(12/19) = 192/380 = 48/95. Equivalently choose one from each group and divide by the number of unordered pairs.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.5052631578947369,
      "placeholder": "e.g. 48/95",
      "hint": "Enter a fraction or decimal probability to at least 6 decimal places.",
      "tolerance": 6e-07
    }
  },
  "1aii": {
    "prompt": "A class has 12 boys and 8 girls. Four students are chosen one at a time, without replacement. Find the probability that the first three are boys and the fourth is a girl.",
    "answer": "88/969",
    "solution": "The required order is fixed, so multiply (12/20)(11/19)(10/18)(8/17) = 10560/116280 = 88/969. No factor for other orders is required.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.09081527347781218,
      "placeholder": "e.g. 88/969",
      "hint": "Enter the probability as a fraction or decimal to at least 6 decimal places.",
      "tolerance": 6e-07
    }
  },
  "1b": {
    "prompt": "Section A of an exam has 7 questions and Section B has 8. A candidate must answer A question 1 and any three other A questions, plus any four B questions. How many different combinations may be answered?",
    "answer": "1400",
    "solution": "Question A1 is compulsory, so choose the remaining three from the other six: C(6,3) = 20. Choose four of the eight B questions: C(8,4) = 70. Multiply the independent choices: 20 × 70 = 1400.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 1400,
      "placeholder": "e.g. 1400",
      "hint": "Enter the number of combinations."
    }
  },
  "2a": {
    "prompt": "A line p has intercepts (a,0) and (0,b), with a,b ≠ 0. Show its equation is x/a + y/b = 1.",
    "answer": "x/a + y/b = 1",
    "solution": "Its slope is (0 − b)/(a − 0) = −b/a. Through (0,b), y = −(b/a)x + b. Divide by nonzero b and rearrange to get x/a + y/b = 1.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Find slope −b/a and use an intercept.",
        "Divide by b and rearrange to the required equation."
      ]
    },
    "illustration": "p2-2019-intercepts"
  },
  "2bi": {
    "prompt": "Line l has slope m and passes through A(6,0). Write its equation in terms of m.",
    "answer": "y = m(x − 6)",
    "solution": "Use point-slope form y − y₁ = m(x − x₁). Substituting (6,0) gives y = m(x − 6), equivalently mx − y − 6m = 0.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use point-slope form through (6,0).",
        "Obtain y = m(x − 6), or an equivalent equation."
      ]
    }
  },
  "2bii": {
    "prompt": "Line l is y = m(x − 6) and intersects k: 4x + 3y = 25 at P. Find both coordinates of P as simplified fractions in m.",
    "answer": "P = ((25 + 18m)/(4 + 3m), m/(4 + 3m)), m ≠ −4/3",
    "solution": "Substitute y = mx − 6m: 4x + 3mx − 18m = 25, hence x = (25 + 18m)/(4 + 3m). Then y = m[(25 + 18m)/(4 + 3m) − 6] = m/(4 + 3m). If m = −4/3, the lines are distinct and parallel, so no intersection exists; the stated intersection excludes that case.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Substitute l into k and isolate x.",
        "Simplify y to m/(4 + 3m).",
        "Require 4 + 3m ≠ 0 for a unique intersection."
      ]
    }
  },
  "3a": {
    "prompt": "The point (−2,k) lies on (x − 2)² + (y − 3)² = 65. Find both integer values of k.",
    "answer": "k = −4 or 10",
    "solution": "Substitute x = −2: (−4)² + (k − 3)² = 65. Therefore (k − 3)² = 49, giving k − 3 = ±7, so k = 10 or −4.",
    "answerCheck": {
      "kind": "number-set",
      "expected": [
        -4,
        10
      ],
      "placeholder": "e.g. -4, 10",
      "hint": "Enter both k values, in either order."
    }
  },
  "3b": {
    "prompt": "Circle s is in the first quadrant, touching both coordinate axes. Line t: 3x − 4y + 6 = 0 is tangent to it. Find the equation of s.",
    "answer": "(x − 1)² + (y − 1)² = 1",
    "solution": "If the positive radius is r, tangency to both axes puts the centre at (r,r). The centre-to-tangent distance equals r: |3r − 4r + 6|/5 = r, so |6 − r| = 5r. Squaring gives (6 − r)² = 25r², or 2r² + r − 3 = 0 = (2r + 3)(r − 1). Only r = 1 is positive. The centre is (1,1), so the equation is (x − 1)² + (y − 1)² = 1.",
    "answerCheck": {
      "kind": "circle-equation",
      "centreX": 1,
      "centreY": 1,
      "radiusSquared": 1,
      "placeholder": "e.g. (x-1)^2+(y-1)^2=1",
      "hint": "Enter a circle equation in standard centre-radius form."
    },
    "illustration": "p2-2019-tangent-circle"
  },
  "4a": {
    "prompt": "Show that cos(2θ) = 1 − 2sin²θ.",
    "answer": "cos(2θ) = cos²θ − sin²θ = 1 − 2sin²θ",
    "solution": "From the cosine addition formula, cos(θ + θ) = cos²θ − sin²θ. Substitute cos²θ = 1 − sin²θ to obtain cos(2θ) = 1 − 2sin²θ.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Apply the cosine addition formula to θ + θ.",
        "Use sin²θ + cos²θ = 1 to eliminate cos²θ."
      ]
    }
  },
  "4b": {
    "prompt": "Find the cosine of the acute angle between two body diagonals of a cube.",
    "answer": "1/3",
    "solution": "Take a cube of side a and centre O. Choose adjacent vertices U,V on a face. Then OU = OV = a√3/2 and UV = a. These radii lie on two body diagonals. By the cosine rule, cos∠UOV = [(3a²/4) + (3a²/4) − a²]/[2(3a²/4)] = 1/3. This is positive and gives the acute angle (about 70.53°).",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.3333333333333333,
      "placeholder": "e.g. 1/3",
      "hint": "Enter the cosine, ideally as an exact fraction, rather than the angle.",
      "tolerance": 6e-07
    },
    "illustration": "p2-2019-cube"
  },
  "5a": {
    "prompt": "Construct and label the orthocentre of the supplied triangle ABC. Show construction lines or arcs clearly. Reproduce the triangle on paper and extend sides where needed.",
    "answer": "The orthocentre is the intersection of two altitudes; for this obtuse triangle it lies outside.",
    "solution": "Construct the perpendicular from A to BC. Construct the perpendicular from B to the line AC, extending AC beyond A as needed. To construct a perpendicular from a vertex, draw a circle centred at that vertex cutting the opposite side line twice, then construct the perpendicular bisector of the segment between the two cuts using equal arcs. The resulting line passes through the vertex and is perpendicular to the side. The two altitudes meet at H, the orthocentre. A third altitude from C should also pass through H.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Construct two vertex-to-opposite-side perpendiculars using visible arcs.",
        "Extend the sides and altitudes to locate their intersection outside the obtuse triangle.",
        "Label the intersection H and verify the third altitude is concurrent."
      ]
    },
    "illustration": "p2-2019-orthocentre"
  },
  "5b": {
    "prompt": "In circle s with centre O, AB is a diameter, BE is tangent at B, and chord CD is parallel to AB with CD = AB/2. A,D,E are collinear in that order, and D,C are above and below the horizontal through O as shown. Find ∠BEA with justification.",
    "answer": "30°",
    "solution": "Let the radius be R, so CD = R. The perpendicular from O to CD bisects it; each half has length R/2. In the right triangle from O to D and the chord midpoint, sin of the angle between OD and the horizontal is (R/2)/R = 1/2, hence this angle is 30°. Thus ∠AOD = 60°. Since OA = OD, triangle AOD is equilateral, giving ∠OAD = 60°. As AB is collinear with AO and AE with AD, ∠BAE = 60°. Radius OB is perpendicular to tangent BE, so ∠ABE = 90°. Therefore ∠BEA = 180° − 90° − 60° = 30°.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use the perpendicular-bisector property of a chord.",
        "Derive ∠AOD = 60° and hence ∠BAE = 60°.",
        "Use the right angle at the tangent point B to obtain 30°."
      ]
    },
    "illustration": "p2-2019-chord"
  },
  "6a": {
    "prompt": "Independent events F,S have P(F only) = 1/4, P(F ∩ S) = 1/5, P(S only) = x and P(neither) = y. Find x,y.",
    "answer": "x = 11/45, y = 11/36",
    "solution": "P(F) = 1/4 + 1/5 = 9/20. Independence gives (9/20)(x + 1/5) = 1/5. Thus P(S) = 4/9 and x = 4/9 − 1/5 = 11/45. The four regions sum to 1, so y = 1 − 1/4 − 1/5 − 11/45 = 11/36.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        0.24444444444444444,
        0.3055555555555556
      ],
      "placeholder": "e.g. 11/45, 11/36",
      "hint": "Enter x, y in that order, as fractions."
    },
    "illustration": "p2-2019-venn"
  },
  "6b": {
    "prompt": "A club has German, Irish and Spanish children only: 10 Spanish and twice as many Irish as German. Two children are chosen in sequence without replacement. P(first German and second not German) = 1/6. Find the total number of children.",
    "answer": "25 children",
    "solution": "Let the German count be g, so the Irish count is 2g and total 3g + 10. The given probability is [g/(3g + 10)][(2g + 10)/(3g + 9)] = 1/6. Multiplying gives 6g(2g + 10) = (3g + 10)(3g + 9), hence 3g² + 3g − 90 = 0. Thus (g + 6)(g − 5) = 0. Only g = 5 is possible, so total = 3(5) + 10 = 25.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 25,
      "placeholder": "e.g. 25",
      "hint": "Enter the total, not the German count."
    }
  },
  "7ai": {
    "prompt": "A trough is 2.5 m long with uniform circular-segment cross-section ABC. Its circle has centre O and radius 90 cm. D is the midpoint of the top chord AC, OB is perpendicular to AC, and DB = 30 cm. Find AD in the form a√b cm, with integers a,b.",
    "answer": "30√5 cm",
    "solution": "OD = OB − DB = 90 − 30 = 60 cm. In right triangle ODA, AD² = 90² − 60² = 4500, so AD = √4500 = 30√5 cm.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Find OD = 60 cm.",
        "Use Pythagoras and simplify √4500 to 30√5."
      ]
    },
    "illustration": "p2-2019-trough"
  },
  "7aii": {
    "prompt": "A trough is 2.5 m long with uniform circular-segment cross-section ABC. Its circle has centre O and radius 90 cm. D is the midpoint of the top chord AC, OB is perpendicular to AC, and DB = 30 cm. Find ∠DOA in radians to 2 decimal places.",
    "answer": "0.84 radians",
    "solution": "In right triangle ODA, cos∠DOA = OD/OA = 60/90 = 2/3. Hence ∠DOA = arccos(2/3) ≈ 0.84106867 radians, rounding to 0.84. This is half the angle of the full segment sector.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.84,
      "placeholder": "e.g. 0.84",
      "hint": "Enter the angle in radians to 2 decimal places."
    },
    "illustration": "p2-2019-trough"
  },
  "7aiii": {
    "prompt": "A trough is 2.5 m long with uniform circular-segment cross-section ABC. Its circle has centre O and radius 90 cm. D is the midpoint of the top chord AC, OB is perpendicular to AC, and DB = 30 cm. Find the segment area ABC in m² to 2 decimal places.",
    "answer": "0.28 m²",
    "solution": "Use metres and retain θ = arccos(2/3) without rounding. The full central angle is 2θ, so segment area = sector − triangle = (0.9²/2)(2θ − sin2θ) ≈ 0.278773387 m², rounding to 0.28 m². Use the smaller circular segment below chord AC.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.28,
      "placeholder": "e.g. 0.28",
      "hint": "Enter the segment area in square metres to 2 decimal places."
    },
    "illustration": "p2-2019-trough"
  },
  "7aiv": {
    "prompt": "A trough is 2.5 m long with uniform circular-segment cross-section ABC. Its circle has centre O and radius 90 cm. D is the midpoint of the top chord AC, OB is perpendicular to AC, and DB = 30 cm. Find the trough capacity in m³ to 2 decimal places.",
    "answer": "0.70 m³",
    "solution": "Capacity is cross-sectional area times length. Using the unrounded area 0.278773387 m² gives V = 0.278773387 × 2.5 ≈ 0.696933468 m³, or 0.70 m³.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.7,
      "placeholder": "e.g. 0.7",
      "hint": "Enter the volume in cubic metres to 2 decimal places."
    },
    "illustration": "p2-2019-trough"
  },
  "7bi": {
    "prompt": "Each half of a sand timer consists of a hemisphere, a cylinder of height 3.5 cm and a cone of height 1.5 cm, all of radius 1.25 cm. The upper half is full of sand. Find its volume in cm³ to 2 decimal places.",
    "answer": "23.73 cm³",
    "solution": "Add the three volumes: V = (2/3)π(1.25)³ + π(1.25)²(3.5) + (1/3)π(1.25)²(1.5) ≈ 23.7255695 cm³. Round at the end to 23.73 cm³.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 23.73,
      "placeholder": "e.g. 23.73",
      "hint": "Enter the sand volume in cubic centimetres to 2 decimal places."
    },
    "illustration": "p2-2019-timer"
  },
  "7bii": {
    "prompt": "Each half of a sand timer consists of a hemisphere, a cylinder of height 3.5 cm and a cone of height 1.5 cm, all of radius 1.25 cm. After 98% of the original sand has flowed down, the remainder occupies a small cone of height h at the tip of the upper cone. Find h in cm to 2 decimal places.",
    "answer": "0.87 cm",
    "solution": "Only 2% remains: Vsmall = 0.02 × 23.7255695 ≈ 0.47451139 cm³. Similar cones give r/h = 1.25/1.5 = 5/6. Therefore Vsmall = (1/3)π(5h/6)²h = 25πh³/108. Solving gives h ≈ 0.86734825 cm, or 0.87 cm. Volume is proportional to the cube of the height, not directly to height.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.87,
      "placeholder": "e.g. 0.87",
      "hint": "Enter the remaining vertical sand height in centimetres to 2 decimal places."
    },
    "illustration": "p2-2019-timer-cone"
  },
  "8ai": {
    "prompt": "Of 800 cars observed, 174 were new (less than a year old). Find a 95% confidence interval for the population proportion of new cars, giving endpoints to 4 significant figures.",
    "answer": "[0.1889, 0.2461]",
    "solution": "The sample proportion is p̂ = 174/800 = 0.2175. The approximate 95% interval is p̂ ± 1.96√[p̂(1 − p̂)/800]. Its margin is about 0.02858794, giving (0.18891206,0.24608794). To 4 significant figures the bounds are 0.1889 and 0.2461, or 18.89% and 24.61%.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        0.1889,
        0.2461
      ],
      "placeholder": "e.g. 0.1889, 0.2461",
      "hint": "Enter lower, upper as proportions to 4 significant figures (not percentage points)."
    }
  },
  "8aii": {
    "prompt": "Car speeds are normally distributed with mean 87.3 km/h and standard deviation 12 km/h. What proportion travel faster than 95 km/h?",
    "answer": "About 0.2605 (26.05%); a z = 0.64 table lookup gives 0.2611.",
    "solution": "Standardise: z = (95 − 87.3)/12 = 0.6416667. The required upper tail is 1 − Φ(0.6416667) ≈ 0.2605448. With z rounded to 0.64, the table gives Φ(0.64) = 0.7389, so the upper tail is 0.2611. Both approaches approximate the same probability.",
    "answerCheck": {
      "kind": "numeric-alternatives",
      "expected": [
        0.2605,
        0.2611
      ],
      "tolerance": 0.0001,
      "placeholder": "e.g. 0.2605",
      "hint": "Enter a proportion or percentage. Calculator 0.2605 or table 0.2611 is accepted."
    }
  },
  "8aiii": {
    "prompt": "Car speeds are normal with mean 87.3 km/h and standard deviation 12 km/h. Seventy per cent of recorded speeds were higher than one driver’s speed. Find that speed to the nearest whole km/h.",
    "answer": "81 km/h",
    "solution": "Seventy per cent above means 30% below. The 30th-percentile z value is about −0.5244 (or −0.52 from tables). Thus speed = 87.3 + 12(−0.5244) ≈ 81.007 km/h, rounding to 81. Use the lower tail, not the 70th percentile.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 81,
      "placeholder": "e.g. 81",
      "hint": "Enter the speed to the nearest whole kilometre per hour."
    }
  },
  "8bi": {
    "prompt": "After a road-safety programme, a magazine tests whether mean car speed has changed from 87.3 km/h, at 5% significance. The test p-value is 0.024. State the conclusion and a reason.",
    "answer": "Reject H₀; there is evidence the population mean speed has changed.",
    "solution": "H₀ is μ = 87.3 and H₁ is μ ≠ 87.3. Since p = 0.024 < 0.05, reject H₀ at the 5% significance level. There is statistically significant evidence of a change in population mean speed. This p-value alone does not specify the direction or establish that the programme caused the change.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Compare 0.024 with significance level 0.05.",
        "Reject H₀ and state evidence of a changed population mean, rather than certainty."
      ]
    }
  },
  "8bii": {
    "prompt": "A two-sided normal test of mean car speed uses H₀: μ = 87.3 km/h, population standard deviation 12 km/h and sample size 100. Its p-value is 0.024, and the sample mean is lower than 87.3. Find the sample mean to 1 decimal place.",
    "answer": "84.6 km/h",
    "solution": "For a two-sided p-value 0.024, the lower tail beyond the observed negative z is 0.012. Thus z ≈ −2.2571 (about −2.26 from tables). The standard error is 12/√100 = 1.2, so x̄ = 87.3 + z(1.2) ≈ 84.5914, rounding to 84.6 km/h. Halve the p-value before the normal lookup.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 84.6,
      "placeholder": "e.g. 84.6",
      "hint": "Enter the sample mean in km/h to 1 decimal place."
    }
  },
  "9a": {
    "prompt": "A triangular patch SGH has SH = 58 m, GH = 30 m and ∠GHS = 68°. Its incircle is a helicopter pad of radius r and centre P. Find SG in metres to 1 decimal place.",
    "answer": "54.4 m",
    "solution": "By the cosine rule, SG² = 58² + 30² − 2(58)(30)cos68°. Hence SG ≈ 54.40927361 m, rounding to 54.4 m. Retain the unrounded length for later calculations.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 54.4,
      "placeholder": "e.g. 54.4",
      "hint": "Enter SG in metres to 1 decimal place."
    },
    "illustration": "p2-2019-helipad"
  },
  "9b": {
    "prompt": "A triangular patch SGH has SH = 58 m, GH = 30 m and ∠GHS = 68°. Its incircle is a helicopter pad of radius r and centre P. Find ∠HSG in degrees to 2 decimal places.",
    "answer": "30.75°",
    "solution": "First find SG ≈ 54.40927361 by the cosine rule. The sine rule gives sin∠HSG = 30sin68°/SG, so ∠HSG ≈ 30.74562596°, or 30.75°. The supplementary possibility is impossible with the existing 68° angle (their sum would exceed 180°). Using SG = 54.4 also rounds to 30.75°.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 30.75,
      "placeholder": "e.g. 30.75",
      "hint": "Enter the angle at S in degrees to 2 decimal places, without a degree sign."
    },
    "illustration": "p2-2019-helipad"
  },
  "9c": {
    "prompt": "A triangular patch SGH has SH = 58 m, GH = 30 m and ∠GHS = 68°. Its incircle is a helicopter pad of radius r and centre P. Find the triangle’s area in m² to 2 decimal places.",
    "answer": "806.65 m²",
    "solution": "Use the two sides surrounding the given angle: area = (1/2)(58)(30)sin68° ≈ 806.6499535 m², giving 806.65 m².",
    "answerCheck": {
      "kind": "numeric",
      "expected": 806.65,
      "placeholder": "e.g. 806.65",
      "hint": "Enter the triangle area in square metres to 2 decimal places."
    },
    "illustration": "p2-2019-helipad"
  },
  "9di": {
    "prompt": "A triangular patch SGH has SH = 58 m, GH = 30 m and ∠GHS = 68°. Its incircle is a helicopter pad of radius r and centre P. Find the area of triangle HSP in terms of r.",
    "answer": "29r m²",
    "solution": "The perpendicular distance from incircle centre P to side HS is r. With base HS = 58, area HSP = (1/2)(58)r = 29r m².",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use base HS = 58 and perpendicular height r.",
        "Obtain area 29r m²."
      ]
    },
    "illustration": "p2-2019-helipad"
  },
  "9dii": {
    "prompt": "A triangular patch SGH has SH = 58 m, GH = 30 m and ∠GHS = 68°. Its incircle is a helicopter pad of radius r and centre P. Using SG ≈ 54.4 m, show that the area of SGH can be written as 71.2r m².",
    "answer": "Area = (58 + 30 + 54.4)r/2 = 71.2r m²",
    "solution": "Join P to the three vertices. Each of the resulting triangles has height r to its corresponding side. Their total area is (1/2)(SH + GH + SG)r. With SG rounded to 54.4, this is (1/2)(58 + 30 + 54.4)r = 71.2r. The coefficient is the semiperimeter, rounded as in the requested expression.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Split the triangle into three triangles with common perpendicular height r.",
        "Sum half the side lengths to get 71.2."
      ]
    },
    "illustration": "p2-2019-helipad"
  },
  "9diii": {
    "prompt": "A triangular patch SGH has SH = 58 m, GH = 30 m and ∠GHS = 68°. Its incircle is a helicopter pad of radius r and centre P. Find the incircle radius in metres to 1 decimal place.",
    "answer": "11.3 m",
    "solution": "Triangle area is (1/2)(58)(30)sin68° ≈ 806.6499535. Divide by the semiperimeter (58 + 30 + 54.40927361)/2 ≈ 71.20463681 to obtain r ≈ 11.32861552 m. Thus r = 11.3 m to one decimal place. Using the earlier rounded coefficient 71.2 gives the same requested rounding.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 11.3,
      "placeholder": "e.g. 11.3",
      "hint": "Enter the radius in metres to 1 decimal place."
    },
    "illustration": "p2-2019-helipad"
  },
  "9e": {
    "prompt": "A triangular patch SGH has SH = 58 m, GH = 30 m and ∠GHS = 68°. Its incircle is a helicopter pad of radius r and centre P. A vertical pole ST stands at S. The angle of elevation of T from P is 14°. Find the pole height to 1 decimal place.",
    "answer": "About 10.7 m with full precision; carrying r = 11.3 m forward gives about 10.6 m.",
    "solution": "The incenter P lies on the bisector at S. Thus ∠HSP is half ∠HSG ≈ 15.372813°. Drop a perpendicular of length r from P to HS: SP = r/sin(∠HSG/2). With unrounded r ≈ 11.32861552, SP ≈ 42.73 m. In right triangle SPT, ST = SP tan14° ≈ 10.65468 m, rounding to 10.7 m. Carrying the earlier rounded r = 11.3 and angle 30.75° gives about 10.627 m, rounding to 10.6 m. Compare the method and rounding used rather than forcing a single final digit.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use the angle-bisector property to halve the angle at S.",
        "Calculate SP = r/sin(∠HSG/2).",
        "Use ST = SP tan14° and state the rounding carried through."
      ]
    },
    "illustration": "p2-2019-pole"
  }
};

export const realPaper2019p2: StudyPaper = {
  id: paperId, year: 2019, level: "Higher", paperNumber: 2, kind: "real", estimatedMinutes: 150,
  title: "2019 Higher Level Paper 2",
  description: "All nine questions ready onscreen with worked solutions and answer checks or guided self-checks.",
  questions: bookPaper.parts.map((part) => {
    const code = part.id.slice(paperId.length + 1);
    if (!content[code]) throw new Error(`Missing reviewed content for ${part.id}`);
    return { id: part.id, number: part.label.replace(/^Q/, "").replace("(", " ("), marks: null,
      topic: part.topicIds.includes("p2-circle") ? "Coordinate geometry · The circle" : part.topicIds.includes("p2-line") ? "Coordinate geometry · The line" : part.topicIds.includes("p2-probability") ? "Probability" : part.topicIds.includes("p2-statistics") ? "Statistics" : part.topicIds.includes("p2-trigonometry") ? "Trigonometry" : "Geometry, area and volume",
      ...content[code] };
  }),
};
