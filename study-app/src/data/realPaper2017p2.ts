import bookPaper from "./book2017p2.json";
import type { StudyPaper, StudyQuestion } from "../types";

const paperId = "lc-hl-2017-normal-p2";
type Content = Pick<StudyQuestion, "prompt" | "answer" | "solution"> & Partial<Pick<StudyQuestion, "expression" | "illustration" | "answerCheck" | "selfCheck">>;

// Authored study explanations, reviewed against printed source pages 3–17.
// No individual leaf marks or official marking-scheme allocations are claimed.
const content: Record<string, Content> = {
  "1a": {
    "prompt": "Conor calls Ciara once per day. On each independent call she answers with probability 1/5. Find the probability she answers on days 2,4,6 but not on days 1,3,5,7.",
    "answer": "256/78125 = 0.0032768",
    "solution": "This is one specified sequence with three answers and four non-answers. Its probability is (1/5)³(4/5)⁴ = 256/78125. Do not multiply by a binomial coefficient, since the successful days are fixed.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.0032768,
      "placeholder": "e.g. 0.0032768",
      "hint": "Enter the probability as a fraction or decimal to at least 7 decimal places.",
      "tolerance": 6e-08
    }
  },
  "1b": {
    "prompt": "Conor calls Ciara once per day. On each independent call she answers with probability 1/5. Find the probability her fourth answer occurs on day 7.",
    "answer": "256/15625 = 0.016384",
    "solution": "There must be exactly three answers in the first six days, in any order, followed by an answer on day 7. Thus probability = C(6,3)(1/5)³(4/5)³(1/5) = 20(1/5)⁴(4/5)³ = 256/15625.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.016384,
      "placeholder": "e.g. 0.016384",
      "hint": "Enter the probability as a fraction or decimal to at least 6 decimal places.",
      "tolerance": 6e-07
    }
  },
  "1c": {
    "prompt": "Conor calls Ciara once per day. On each independent call she answers with probability 1/5. Write in terms of n the probability of at least one answer in n days.",
    "answer": "1 − (4/5)ⁿ",
    "solution": "The complementary event is no answers on all n independent days, which has probability (4/5)ⁿ. Subtract from 1 to get the probability of one or more answers.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Identify the complement as no answers.",
        "Use independence and subtract (4/5)ⁿ from 1."
      ]
    }
  },
  "1d": {
    "prompt": "Conor calls Ciara once per day. On each independent call she answers with probability 1/5. Find the least number of days n for which the probability of at least one answer is greater than 99%.",
    "answer": "n = 21",
    "solution": "Require 1 − 0.8ⁿ > 0.99, or 0.8ⁿ < 0.01. Taking logs and dividing by negative ln0.8 reverses the inequality: n > ln0.01/ln0.8 ≈ 20.6377. Thus the least integer is 21; n = 20 is insufficient.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 21,
      "placeholder": "e.g. 21",
      "hint": "Enter the least integer n satisfying the strict probability threshold."
    }
  },
  "2a": {
    "prompt": "The car data pairs (speed in km/h, efficiency in km/litre) are (40,21),(48,16),(56,18),(64,16),(88,13),(96,11),(112,9). Find the Pearson correlation coefficient to 3 decimal places.",
    "answer": "−0.957",
    "solution": "Compute r = Σ[(x − x̄)(y − ȳ)]/√[Σ(x − x̄)²Σ(y − ȳ)²] with all seven pairs, or use paired-data statistics on a calculator. The result is approximately −0.956573405, rounding to −0.957. The sign reflects decreasing km per litre as speed rises.",
    "answerCheck": {
      "kind": "numeric",
      "expected": -0.957,
      "placeholder": "e.g. -0.957",
      "hint": "Enter the correlation coefficient to 3 decimal places."
    },
    "illustration": "p2-2017-fuel-table"
  },
  "2b": {
    "prompt": "The car data pairs (speed in km/h, efficiency in km/litre) are (40,21),(48,16),(56,18),(64,16),(88,13),(96,11),(112,9). Plot all seven points on the supplied axes and draw a line of best fit by eye, on paper.",
    "answer": "A downward-sloping line through the centre of the seven plotted points.",
    "solution": "Plot each speed horizontally and its corresponding efficiency vertically. The point at (56,18) lies above the general downward trend; do not omit it. Draw a straight line through the centre of the cloud, balancing points above and below. A numerical regression line, for comparison rather than a required exact drawing, is approximately y = 25.445 − 0.14706x.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Plot all seven ordered data pairs accurately.",
        "Draw a straight descending line through the centre of the scatter.",
        "Balance deviations rather than joining consecutive points."
      ]
    },
    "illustration": "p2-2017-fuel-axes"
  },
  "2c": {
    "prompt": "For car efficiency y measured in km/litre against speed x in km/h, the fitted line has slope −0.15. Interpret this value in context.",
    "answer": "Each extra 1 km/h is associated with about 0.15 fewer km travelled per litre.",
    "solution": "Slope is change in the vertical variable per unit horizontal change. Here an increase of 1 km/h in speed predicts a decrease of 0.15 km/litre in efficiency over the data’s relevant range. This is not a decrease of 0.15 litres used; km per litre and litres per kilometre are different quantities.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Describe a 1 km/h increase in speed.",
        "State a predicted 0.15 km/litre decrease in efficiency, with units."
      ]
    }
  },
  "2di": {
    "prompt": "Mary and Jane each drive 260 km at average speeds of 96 and 112 km/h respectively. How much longer does Mary take, to the nearest minute?",
    "answer": "23 minutes",
    "solution": "Time = distance/speed. The difference is 260/96 − 260/112 hours ≈ 0.38690476 hours. Multiply by 60 to get 23.2142857 minutes, rounding to 23.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 23,
      "placeholder": "e.g. 23",
      "hint": "Enter the extra travel time in whole minutes."
    }
  },
  "2dii": {
    "prompt": "Mary and Jane each drive 260 km in this car model. At Mary’s speed of 96 km/h the efficiency is 11 km/litre; at Jane’s 112 km/h it is 9 km/litre. Fuel costs 132.9 cents/litre. How much more does Jane spend, to the nearest cent?",
    "answer": "€6.98",
    "solution": "Mary uses 260/11 litres and Jane uses 260/9 litres. The extra fuel is 260(1/9 − 1/11) litres. Convert 132.9 cents to €1.329 and multiply: difference ≈ €6.980606, or €6.98. Use the supplied efficiency data rather than the fitted-line estimates.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 6.98,
      "placeholder": "e.g. 6.98",
      "hint": "Enter the extra cost in euro to 2 decimal places."
    }
  },
  "3a": {
    "prompt": "Triangle ABC has A(0,6), C(4,2) and centroid G(2/3,4/3). Median AG meets BC at P, with AG:GP = 2:1. Find P.",
    "answer": "P = (1,−1)",
    "solution": "G lies two thirds of the way from A to P, so P = A + (3/2)(G − A). Compute G − A = (2/3,−14/3), multiply by 3/2 to get (1,−7), then add A = (0,6). Thus P = (1,−1).",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        1,
        -1
      ],
      "placeholder": "e.g. 1, -1",
      "hint": "Enter Px, Py."
    },
    "illustration": "p2-2017-centroid"
  },
  "3b": {
    "prompt": "Triangle ABC has A(0,6), C(4,2) and centroid G(2/3,4/3). Median AG meets BC at P, with AG:GP = 2:1. Find B.",
    "answer": "B = (−2,−4)",
    "solution": "P is the midpoint of BC. From the median ratio P = (1,−1), so B = 2P − C = (2,−2) − (4,2) = (−2,−4). Equivalently, the centroid coordinate formula gives B = 3G − A − C.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        -2,
        -4
      ],
      "placeholder": "e.g. -2, -4",
      "hint": "Enter Bx, By."
    },
    "illustration": "p2-2017-centroid"
  },
  "3c": {
    "prompt": "Triangle ABC has A(0,6), B(−2,−4) and C(4,2). Prove C is its orthocentre.",
    "answer": "AC ⟂ BC, so the right-angle vertex C is the orthocentre.",
    "solution": "Slope AC = (2 − 6)/(4 − 0) = −1; slope BC = (2 + 4)/(4 + 2) = 1. Their product is −1, so AC is perpendicular to BC. The altitude from A lies along AC and the altitude from B lies along BC, meeting at C. Thus C is the orthocentre of this right triangle.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Calculate slopes −1 and 1 and prove perpendicularity.",
        "Identify AC and BC as two altitudes meeting at C."
      ]
    },
    "illustration": "p2-2017-centroid"
  },
  "4a": {
    "prompt": "A(0,0), B(6.5,0) and C(10,7) lie on a circle. Find its equation.",
    "answer": "(x − 13/4)² + (y − 6)² = 745/16",
    "solution": "Use x² + y² + Dx + Ey + F = 0. A gives F = 0. B gives 42.25 + 6.5D = 0, so D = −6.5. C gives 149 − 65 + 7E = 0, so E = −12. Thus x² + y² − 6.5x − 12y = 0. Completing squares gives centre (13/4,6) and squared radius (13/4)² + 36 = 745/16.",
    "answerCheck": {
      "kind": "circle-equation",
      "centreX": 3.25,
      "centreY": 6,
      "radiusSquared": 46.5625,
      "placeholder": "e.g. (x-13/4)^2+(y-6)^2=745/16",
      "hint": "Enter the circle in centre-radius form with both squared brackets."
    }
  },
  "4b": {
    "prompt": "For A(0,0), B(6.5,0) and C(10,7), find ∠BCA in degrees to 2 decimal places.",
    "answer": "28.44°",
    "solution": "Vectors from C are CB = (−3.5,−7), CA = (−10,−7). Their dot product is 84, and their lengths are √61.25 and √149. Hence cosθ = 84/√(61.25 × 149). This gives θ ≈ 28.44292862°, rounding to 28.44°. The requested angle is at C.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 28.44,
      "placeholder": "e.g. 28.44",
      "hint": "Enter the angle at C in degrees to 2 decimal places."
    }
  },
  "5a": {
    "prompt": "ABCD is a rectangle, F lies on AB and G on BC. Segments FD and AG meet perpendicularly at E. AE = 12 cm, EG = 27 cm and FE = 5 cm. Prove triangles AFE and DAE are equiangular.",
    "answer": "The right angles at E agree, and ∠AFE = ∠DAE; hence the third angles also agree.",
    "solution": "Both triangles have a right angle at E because FD ⟂ AG. Also AF ⟂ AD (rectangle) and FE ⟂ AE, so the angle between AF and FE equals the angle between AD and AE: ∠AFE = ∠DAE. Their remaining angles are equal because each triangle’s angles sum to 180°. Thus the triangles are equiangular and similar.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Identify the common right-angle size at E.",
        "Use the two pairs of perpendicular lines to match a second angle.",
        "State the matching third angles and conclude similarity."
      ]
    },
    "illustration": "p2-2017-rectangle"
  },
  "5b": {
    "prompt": "ABCD is a rectangle, F lies on AB and G on BC. Segments FD and AG meet perpendicularly at E. AE = 12 cm, EG = 27 cm and FE = 5 cm. Find AD.",
    "answer": "31.2 cm",
    "solution": "In right triangle AFE, AF = √(12² + 5²) = 13 cm. Similarity AFE ~ DAE matches FE to AE and AF to AD, so AD/13 = 12/5. Hence AD = 13(12/5) = 31.2 cm.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 31.2,
      "placeholder": "e.g. 31.2",
      "hint": "Enter AD in centimetres."
    },
    "illustration": "p2-2017-rectangle"
  },
  "5c": {
    "prompt": "ABCD is a rectangle, F lies on AB and G on BC. Segments FD and AG meet perpendicularly at E. AE = 12 cm, EG = 27 cm and FE = 5 cm. Triangles AFE and AGB are similar. Show AB = 36 cm.",
    "answer": "AB = 36 cm",
    "solution": "AG = AE + EG = 12 + 27 = 39 cm. Triangle AFE has hypotenuse AF = 13. Under similarity AFE ~ AGB, AF corresponds to AG and AE to AB. The scale factor is AG/AF = 39/13 = 3, so AB = 3 × 12 = 36 cm.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Find AG = 39 and AF = 13.",
        "Apply the similarity scale 3 to AE = 12 to derive AB = 36."
      ]
    },
    "illustration": "p2-2017-rectangle"
  },
  "5d": {
    "prompt": "ABCD is a rectangle, F lies on AB and G on BC. Segments FD and AG meet perpendicularly at E. AE = 12 cm, EG = 27 cm and FE = 5 cm. Find the area of quadrilateral GCDE.",
    "answer": "680.4 cm²",
    "solution": "From the earlier similar triangles, AD = 31.2, AB = 36 and DE = 12(12/5) = 28.8. Right triangle AGB has AG = 39 and AB = 36, so BG = √(39² − 36²) = 15. The rectangle area is 31.2 × 36 = 1123.2. Remove triangle AGB of area (1/2)(36)(15) = 270 and triangle ADE of area (1/2)(12)(28.8) = 172.8. The remaining quadrilateral GCDE has area 1123.2 − 270 − 172.8 = 680.4 cm².",
    "answerCheck": {
      "kind": "numeric",
      "expected": 680.4,
      "placeholder": "e.g. 680.4",
      "hint": "Enter the quadrilateral area in square centimetres."
    },
    "illustration": "p2-2017-rectangle"
  },
  "6a": {
    "prompt": "Model Earth as a sphere of radius 6371 km. Jack is 214 m above sea level at J, and H is his horizon point, where JH is tangent to Earth. Find JH to the nearest kilometre.",
    "answer": "52 km",
    "solution": "Let A be Earth’s centre. The radius AH is perpendicular to tangent JH, so JH² = AJ² − AH². Convert 214 m to 0.214 km: AJ = 6371.214. Thus JH = √(6371.214² − 6371²) ≈ 52.2191 km, rounding to 52 km. This is the straight sight-line distance, not a surface arc.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 52,
      "placeholder": "e.g. 52",
      "hint": "Enter the horizon sight-line distance to the nearest kilometre."
    },
    "illustration": "p2-2017-horizon"
  },
  "6b": {
    "prompt": "Earth has radius 6371 km. Find the circumference of the latitude circle at 53° north, to the nearest kilometre.",
    "answer": "24,091 km",
    "solution": "The radius of the latitude circle is the horizontal component of the Earth radius: r = 6371cos53°. Its circumference is 2πr = 2π(6371)cos53° ≈ 24090.75985 km, rounding to 24091 km. The 53° angle is measured from the equatorial plane.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 24091,
      "placeholder": "e.g. 24091",
      "hint": "Enter the circumference in whole kilometres, without thousands separators."
    },
    "illustration": "p2-2017-latitude"
  },
  "7a": {
    "prompt": "Two solid cones, each with radius R and height R, meet at their vertices inside the smallest enclosing cylinder, whose radius is R and height 2R. Show the cylinder’s empty volume equals the volume of a sphere of radius R.",
    "answer": "Empty volume = 2πR³ − 2πR³/3 = 4πR³/3",
    "solution": "The cylinder volume is πR²(2R) = 2πR³. Each cone occupies πR²R/3 = πR³/3. Subtract both cones: 2πR³ − 2πR³/3 = 4πR³/3, exactly the sphere volume.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use cylinder height 2R.",
        "Subtract the volumes of both solid cones.",
        "Match the result to the sphere formula 4πR³/3."
      ]
    },
    "illustration": "p2-2017-cones"
  },
  "7bi": {
    "prompt": "The cone-and-cylinder arrangement has R = 12 cm. A separate sphere also has radius 12 cm. Water reaches depth 6 cm from the bottom in both containers. Find AB, the radius of the circular water surface in the sphere, in simplest surd form.",
    "answer": "6√3 cm",
    "solution": "The sphere centre is 12 cm above its bottom, so the water plane at depth 6 is 6 cm below the centre. A right triangle from the centre to the water-surface edge gives AB² + 6² = 12². Hence AB = √108 = 6√3 cm.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Find the centre-to-water-plane distance 6 cm.",
        "Use Pythagoras and simplify √108 to 6√3."
      ]
    },
    "illustration": "p2-2017-water"
  },
  "7bii": {
    "prompt": "The cone-and-cylinder arrangement has R = 12 cm. A separate sphere also has radius 12 cm. Water reaches depth 6 cm from the bottom in both containers. Find CD, the radius of the lower solid cone where it meets the water surface.",
    "answer": "6 cm",
    "solution": "The lower cone runs from radius 12 at the bottom to radius zero at its vertex 12 cm above the bottom. At water height 6, the small cone above the water has height 6, half the full cone’s height, so its radius is 12 × 6/12 = 6 cm.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 6,
      "placeholder": "e.g. 6",
      "hint": "Enter the cone radius at the water surface in centimetres."
    },
    "illustration": "p2-2017-water"
  },
  "7biii": {
    "prompt": "The cone-and-cylinder arrangement has R = 12 cm. A separate sphere also has radius 12 cm. Water reaches depth 6 cm from the bottom in both containers. Verify that the exposed water-surface areas in the sphere and cylinder are equal.",
    "answer": "Both surface areas are 108π cm².",
    "solution": "The sphere water surface is a disc of radius 6√3, with area π(6√3)² = 108π. In the cylinder the solid cone blocks the middle: the water surface is an annulus with outer radius 12 and inner radius 6. Its area is π12² − π6² = 144π − 36π = 108π. Thus the two exposed areas agree.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Calculate the sphere’s circular surface area.",
        "Subtract the blocked inner disc from the cylinder’s surface.",
        "Show both areas are 108π cm²."
      ]
    },
    "illustration": "p2-2017-water"
  },
  "7c": {
    "prompt": "The cone-and-cylinder arrangement has R = 12 cm. A separate sphere also has radius 12 cm. Water reaches depth 6 cm from the bottom in both containers. Use Cavalieri’s equal-volume result for this arrangement to find the water volume in the sphere, in terms of π.",
    "answer": "360π cm³",
    "solution": "The cylinder slab of depth 6 has volume π12²(6) = 864π. The submerged solid part of the lower cone is a frustum: full lower cone volume is π12²(12)/3 = 576π, and the small dry tip of height 6 and radius 6 has volume π6²(6)/3 = 72π. Thus submerged solid volume is 504π. Available water volume is 864π − 504π = 360π cm³. Cavalieri’s result gives the same volume in the sphere.",
    "answerCheck": {
      "kind": "pi-multiple",
      "expected": 360,
      "placeholder": "e.g. 360pi",
      "hint": "Enter the exact volume as a multiple of pi."
    },
    "illustration": "p2-2017-water"
  },
  "8ai": {
    "prompt": "In 2015, weights of 15-year-olds in the exam’s population were normally distributed with mean 63.5 kg and standard deviation 10 kg. Mariska weighed 50 kg. Find the percentage who weighed more than her, to 2 decimal places.",
    "answer": "91.15%",
    "solution": "Standardise: z = (50 − 63.5)/10 = −1.35. The required upper-tail probability is P(Z > −1.35) = Φ(1.35) ≈ 0.911492, or 91.15%. Use the upper tail rather than the smaller left tail.",
    "answerCheck": {
      "kind": "percentage",
      "expected": 91.15,
      "tolerance": 0.006,
      "placeholder": "e.g. 91.15%",
      "hint": "Enter the percentage heavier than 50 kg to 2 decimal places."
    }
  },
  "8aii": {
    "prompt": "In 2015, weights of 15-year-olds in the exam’s population were normally distributed with mean 63.5 kg and standard deviation 10 kg. Only 1.5% weighed more than Kamal. Find his weight to 1 decimal place.",
    "answer": "85.2 kg",
    "solution": "The proportion below Kamal is 0.985, giving z ≈ 2.17009 (about 2.17 from tables). His weight is 63.5 + 10z ≈ 85.2009 kg, which rounds to 85.2 kg.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 85.2,
      "placeholder": "e.g. 85.2",
      "hint": "Enter the estimated weight in kilograms to 1 decimal place."
    }
  },
  "8aiii": {
    "prompt": "In 2015, weights of 15-year-olds in the exam’s population were normally distributed with mean 63.5 kg and standard deviation 10 kg. In 2016, a random sample of 150 had mean 62 kg and standard deviation 10 kg. At 5% significance, test whether the population mean changed. State both hypotheses and a conclusion in context.",
    "answer": "H₀: μ = 63.5; H₁: μ ≠ 63.5. Do not reject H₀ at 5%.",
    "solution": "Use the large-sample normal test with standard error 10/√150 ≈ 0.81650. The test statistic is z = (62 − 63.5)/(10/√150) ≈ −1.83712. For a two-sided 5% test, the rejection cutoffs are ±1.96; the statistic lies between them (p ≈ 0.066). There is insufficient evidence that the population mean changed between 2015 and 2016. This does not prove that the mean stayed exactly equal.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "State H₀: μ = 63.5 and two-sided H₁: μ ≠ 63.5.",
        "Calculate z ≈ −1.837 using the sample-mean standard error.",
        "Compare with ±1.96 and conclude insufficient evidence of a change."
      ]
    }
  },
  "8bi": {
    "prompt": "For a random Galway school day, P(rain R) = 1/3. Heavy traffic T has probability 1/2 given rain and 1/4 without rain. The probability of lateness L is 1/2 for rain with heavy traffic, 1/8 for no rain with no heavy traffic, and 1/5 for either other combination. Complete the tree’s branch probabilities and all eight outcome probabilities as fractions.",
    "answer": "Outcomes RTL,RT¬L,R¬TL,R¬T¬L,¬RTL,¬RT¬L,¬R¬TL,¬R¬T¬L: 1/12,1/12,1/30,2/15,1/30,2/15,1/16,7/16",
    "solution": "Complementary rain branches are 1/3,2/3. Given rain, traffic branches are 1/2,1/2; without rain they are 1/4,3/4. Final L,¬L branches are respectively (1/2,1/2),(1/5,4/5),(1/5,4/5),(1/8,7/8). Multiply along each complete path: RTL = (1/3)(1/2)(1/2) = 1/12; RT¬L = 1/12; R¬TL = 1/30; R¬T¬L = 2/15; ¬RTL = 1/30; ¬RT¬L = 2/15; ¬R¬TL = 1/16; ¬R¬T¬L = 7/16. All eight outcomes sum to 1.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use complements for every missing branch probability.",
        "Multiply the three conditional branches along each path.",
        "Complete all eight outcomes in the diagram order and check their sum is 1."
      ]
    },
    "illustration": "p2-2017-rain-tree"
  },
  "8bii": {
    "prompt": "For a random Galway school day, P(rain R) = 1/3. Heavy traffic T has probability 1/2 given rain and 1/4 without rain. The probability of lateness L is 1/2 for rain with heavy traffic, 1/8 for no rain with no heavy traffic, and 1/5 for either other combination. Find P(L), the probability of being late.",
    "answer": "17/80",
    "solution": "Add the four disjoint late paths: P(L) = 1/12 + 1/30 + 1/30 + 1/16 = 17/80 = 0.2125. Do not add conditional lateness probabilities without weighting by their rain and traffic paths.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.2125,
      "placeholder": "e.g. 0.2125",
      "hint": "Enter the probability as a fraction or decimal."
    }
  },
  "8biii": {
    "prompt": "For a random Galway school day, P(rain R) = 1/3. Heavy traffic T has probability 1/2 given rain and 1/4 without rain. The probability of lateness L is 1/2 for rain with heavy traffic, 1/8 for no rain with no heavy traffic, and 1/5 for either other combination. Find P(R|L), the probability it rained given that you were late.",
    "answer": "28/51",
    "solution": "Rain and lateness occur on paths RTL and R¬TL, giving P(R ∩ L) = 1/12 + 1/30 = 7/60. Total lateness probability is 17/80. Thus P(R|L) = (7/60)/(17/80) = 28/51. The denominator is lateness, because that is the given information.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.5490196078431373,
      "placeholder": "e.g. 28/51",
      "hint": "Enter the conditional probability as a fraction or decimal to at least 6 decimal places.",
      "tolerance": 6e-07
    }
  },
  "9a": {
    "prompt": "A tree has base T across a river and vertical top E. The near bank is a straight north–south line. C on that bank is due west of T, and D is 15 m due north of C. Elevation angles to E are 60° from C and 30° from D; ground on both sides is level. Use triangle ECT to express TE in the form √a × CT.",
    "answer": "TE = √3 × CT",
    "solution": "In right triangle ECT, tan60° = TE/CT. Since tan60° = √3, TE = √3 CT.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use the right triangle at T and tan60°.",
        "Obtain TE = √3 CT."
      ]
    },
    "illustration": "p2-2017-river"
  },
  "9b": {
    "prompt": "A tree has base T across a river and vertical top E. The near bank is a straight north–south line. C on that bank is due west of T, and D is 15 m due north of C. Elevation angles to E are 60° from C and 30° from D; ground on both sides is level. Show TE = √[(225 + CT²)/3].",
    "answer": "TE = √[(225 + CT²)/3]",
    "solution": "In the horizontal right triangle DCT, DT² = DC² + CT² = 225 + CT². In vertical right triangle EDT, tan30° = TE/DT = 1/√3. Thus TE = DT/√3 = √[(225 + CT²)/3], taking the positive length.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use DT² = 225 + CT² on the ground.",
        "Use tan30° = TE/DT and simplify the positive square root."
      ]
    },
    "illustration": "p2-2017-river"
  },
  "9c": {
    "prompt": "A tree has base T across a river and vertical top E. The near bank is a straight north–south line. C on that bank is due west of T, and D is 15 m due north of C. Elevation angles to E are 60° from C and 30° from D; ground on both sides is level. Find CT, the shortest distance from the tree base to the near bank, to 1 decimal place.",
    "answer": "5.3 m",
    "solution": "The two height expressions give √3 CT = √[(225 + CT²)/3]. Square and multiply by 3: 9CT² = 225 + CT². Hence 8CT² = 225, so CT = 15/√8 ≈ 5.30330086 m, giving 5.3 m.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 5.3,
      "placeholder": "e.g. 5.3",
      "hint": "Enter CT in metres to 1 decimal place."
    },
    "illustration": "p2-2017-river"
  },
  "9d": {
    "prompt": "A tree has base T across a river and vertical top E. The near bank is a straight north–south line. C on that bank is due west of T, and D is 15 m due north of C. Elevation angles to E are 60° from C and 30° from D; ground on both sides is level. Find TE, the tree height, to 1 decimal place.",
    "answer": "9.2 m",
    "solution": "Use TE = √3 CT with CT = 15/√8 retained at full precision. This gives TE = 15√(3/8) ≈ 9.18558654 m, rounding to 9.2 m.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 9.2,
      "placeholder": "e.g. 9.2",
      "hint": "Enter the tree height in metres to 1 decimal place."
    },
    "illustration": "p2-2017-river"
  },
  "9e": {
    "prompt": "A tree has base T across a river and vertical top E. The near bank is a straight north–south line. C on that bank is due west of T, and D is 15 m due north of C. Elevation angles to E are 60° from C and 30° from D; ground on both sides is level. The falling tree just reaches the near bank at F. Find the maximum angle FTC in degrees to 1 decimal place.",
    "answer": "54.7° using unrounded lengths; about 54.8° if 5.3 m and 9.2 m are carried forward.",
    "solution": "At the furthest bank-reaching direction, TF equals the full tree length TE. Right triangle TCF has adjacent side CT, hypotenuse TF = TE, so cos∠FTC = CT/TE = 1/√3. Thus the maximum angle is arccos(1/√3) ≈ 54.73561°, rounding to 54.7°. If earlier rounded lengths 5.3 and 9.2 are used instead, arccos(5.3/9.2) ≈ 54.8°. State the lengths used; there are symmetric bank-reaching directions north and south of due west.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use TF = TE at the limiting direction and the right angle at C.",
        "Calculate arccos(CT/TE), preserving full precision where possible.",
        "Explain the carried-forward rounding if your answer is about 54.8°."
      ]
    },
    "illustration": "p2-2017-fallen-tree"
  },
  "9f": {
    "prompt": "A tree has base T across a river and vertical top E. The near bank is a straight north–south line. C on that bank is due west of T, and D is 15 m due north of C. Elevation angles to E are 60° from C and 30° from D; ground on both sides is level. Assuming equally likely fall directions, find the probability that the tree reaches the near bank, as a percentage to 1 decimal place.",
    "answer": "30.4%",
    "solution": "The maximum deviation from due west that still reaches the bank is θ = arccos(1/√3) ≈ 54.73561°. The successful directions span 2θ, symmetrically north and south of west. With all 360° equally likely, probability = (2θ/360) × 100% ≈ 30.40867%, rounding to 30.4%. Using the earlier rounded angle gives the same one-decimal percentage.",
    "answerCheck": {
      "kind": "percentage",
      "expected": 30.4,
      "placeholder": "e.g. 30.4%",
      "hint": "Enter the percentage of all fall directions to 1 decimal place."
    },
    "illustration": "p2-2017-fallen-tree"
  }
};

export const realPaper2017p2: StudyPaper = {
  id: paperId, year: 2017, level: "Higher", paperNumber: 2, kind: "real", estimatedMinutes: 150,
  title: "2017 Higher Level Paper 2",
  description: "All nine questions ready onscreen with worked solutions and answer checks or guided self-checks.",
  questions: bookPaper.parts.map((part) => {
    const code = part.id.slice(paperId.length + 1);
    if (!content[code]) throw new Error(`Missing reviewed content for ${part.id}`);
    return { id: part.id, number: part.label.replace(/^Q/, "").replace("(", " ("), marks: null,
      topic: part.topicIds.includes("p2-circle") ? "Coordinate geometry · The circle" : part.topicIds.includes("p2-line") ? "Coordinate geometry · The line" : part.topicIds.includes("p2-probability") ? "Probability" : part.topicIds.includes("p2-statistics") ? "Statistics" : part.topicIds.includes("p2-trigonometry") ? "Trigonometry" : "Geometry, area and volume",
      ...content[code] };
  }),
};
