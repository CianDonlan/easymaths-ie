import bookPaper from "./book2019p1.json";
import type { StudyPaper, StudyQuestion } from "../types";

const paperId = "lc-hl-2019-normal-p1";
type Content = Pick<StudyQuestion, "prompt" | "answer" | "solution"> & Partial<Pick<StudyQuestion, "expression" | "illustration" | "answerCheck" | "selfCheck">>;

// Source prompts and figures checked on printed pages 4–25. Solutions are
// authored explanations; individual marks and official scheme allocations are unverified.
const content: Record<string, Content> = {
  "1a": {
    "prompt": "In (2x + 1)(x² + px + 4), p is a natural number. The coefficient of x is twice the coefficient of x². Find p.",
    "answer": "p = 2",
    "solution": "The expansion is 2x³ + (2p + 1)x² + (p + 8)x + 4. Hence p + 8 = 2(2p + 1), so 6 = 3p and p = 2.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 2,
      "placeholder": "e.g. 2",
      "hint": "Enter p."
    }
  },
  "1b": {
    "prompt": "Solve 3/(2x + 1) + 2/5 = 2/(3x − 1), for real x ≠ −1/2, 1/3.",
    "answer": "x = −3 or 3/4",
    "solution": "Multiply by 5(2x + 1)(3x − 1): 15(3x − 1) + 2(2x + 1)(3x − 1) = 10(2x + 1). Simplify to 12x² + 27x − 27 = 0, or 3(4x − 3)(x + 3) = 0. Both roots −3 and 3/4 satisfy the domain restrictions.",
    "answerCheck": {
      "kind": "number-set",
      "expected": [
        -3,
        0.75
      ],
      "placeholder": "e.g. -3, 3/4",
      "hint": "Enter both roots, in either order."
    }
  },
  "2ai": {
    "prompt": "The supplied graph is f(x) = 3ˣ. On the same axes draw g(x) = 4x + 1. Draw on paper, retaining the scale shown.",
    "answer": "A straight line through (0,1), (1,5) and (2,9).",
    "solution": "The y-intercept of g is 1 and its slope is 4. Plot two or more points such as (0,1), (1,5) and (2,9), then join with a straight line. Keep the existing exponential curve f.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use intercept (0,1) and slope 4.",
        "Draw a straight line through the plotted points on the supplied scale."
      ]
    },
    "illustration": "p1-2019-exponential"
  },
  "2aii": {
    "prompt": "For f(x) = 3ˣ and g(x) = 4x + 1, use substitution to verify f(1.9) < g(1.9).",
    "answer": "3^1.9 ≈ 8.0636 < 8.6",
    "solution": "f(1.9) = 3^1.9 ≈ 8.0636, while g(1.9) = 4(1.9) + 1 = 8.6. Comparing these values verifies the strict inequality.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Evaluate f(1.9) ≈ 8.0636.",
        "Evaluate g(1.9) = 8.6 and state the comparison."
      ]
    }
  },
  "2b": {
    "prompt": "Prove by induction that 3ⁿ ≥ 4n + 1 for every natural number n ≥ 2.",
    "answer": "Base n = 2: 9 = 9. The inductive step follows from 3(4k + 1) ≥ 4(k + 1) + 1.",
    "solution": "At n = 2 both sides equal 9. Assume 3ᵏ ≥ 4k + 1 for some k ≥ 2. Then 3ᵏ⁺¹ ≥ 12k + 3. Subtracting the desired bound 4(k + 1) + 1 = 4k + 5 gives 8k − 2 > 0 for k ≥ 2. Hence 3ᵏ⁺¹ ≥ 4(k + 1) + 1. By induction the result holds for all natural n ≥ 2.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Verify the base case n = 2.",
        "State the assumption at k and multiply by positive 3.",
        "Compare 12k + 3 with 4k + 5, then conclude by induction."
      ]
    }
  },
  "3a": {
    "prompt": "Factorise fully 3xy − 9x + 4y − 12.",
    "answer": "(3x + 4)(y − 3)",
    "solution": "Group terms: 3x(y − 3) + 4(y − 3). Factor out y − 3 to obtain (3x + 4)(y − 3). Expanding checks all four terms.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Group the first two and last two terms.",
        "Obtain the product (3x + 4)(y − 3)."
      ]
    }
  },
  "3b": {
    "prompt": "For g(x) = 3x ln x − 9x + 4 ln x − 12, solve g(x) = 0 over its real domain.",
    "answer": "x = e³",
    "solution": "The logarithm requires x > 0. Factor as (3x + 4)(ln x − 3) = 0. The first factor gives x = −4/3, outside the domain. The valid root is ln x = 3, so x = e³.",
    "answerCheck": {
      "kind": "exp-power",
      "exponent": 3,
      "placeholder": "e.g. e^3",
      "hint": "Enter the exact exponential answer, e^3. Exclude roots outside the logarithm domain."
    }
  },
  "3c": {
    "prompt": "For g(x) = 3x ln x − 9x + 4 ln x − 12, evaluate g′(e) to 2 decimal places.",
    "answer": "−1.53",
    "solution": "Differentiate using the product rule: g′(x) = 3ln x + 3 − 9 + 4/x = 3ln x − 6 + 4/x. Thus g′(e) = −3 + 4/e ≈ −1.528482, rounding to −1.53.",
    "answerCheck": {
      "kind": "numeric",
      "expected": -1.53,
      "placeholder": "e.g. -1.53",
      "hint": "Enter g′(e) to 2 decimal places."
    }
  },
  "4a": {
    "prompt": "Find ∫(4x³ − 6x + 10) dx.",
    "answer": "x⁴ − 3x² + 10x + C",
    "solution": "Integrate term by term, increasing each power by one and dividing by the new power. This gives x⁴ − 3x² + 10x + C, where C is any real constant. Differentiating recovers the integrand.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Integrate all three terms correctly.",
        "Include the arbitrary constant C."
      ]
    }
  },
  "4bi": {
    "prompt": "A cubic f has derivative f′(x) = 6x² − 54x + 109 and passes through A(2,0). Show f(x) = 2x³ − 27x² + 109x − 126.",
    "answer": "f(x) = 2x³ − 27x² + 109x − 126",
    "solution": "Integration gives f(x) = 2x³ − 27x² + 109x + C. Since f(2) = 0, 16 − 108 + 218 + C = 0, so C = −126.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Integrate f′ and include C.",
        "Use f(2) = 0 to obtain C = −126."
      ]
    },
    "illustration": "p1-2019-cubic"
  },
  "4bii": {
    "prompt": "The cubic f(x) = 2x³ − 27x² + 109x − 126 cuts the x-axis at A(2,0), B and C in increasing x order. Find B and C.",
    "answer": "B = (9/2,0), C = (7,0)",
    "solution": "Since x − 2 is a factor, divide to get f(x) = (x − 2)(2x² − 23x + 63) = (x − 2)(2x − 9)(x − 7). The other roots are 9/2 and 7, giving the two stated coordinates.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        4.5,
        0,
        7,
        0
      ],
      "placeholder": "e.g. 4.5, 0, 7, 0",
      "hint": "Enter Bx, By, Cx, Cy, in that order. Fractions are accepted."
    },
    "illustration": "p1-2019-cubic"
  },
  "5a": {
    "prompt": "3 + 2i is a root of z² + pz + q = 0 with real p,q and i² = −1. Find p and q.",
    "answer": "p = −6, q = 13",
    "solution": "Real coefficients imply the conjugate root 3 − 2i. Their sum is 6 = −p, and product is (3 + 2i)(3 − 2i) = 9 + 4 = 13 = q. Thus the polynomial is z² − 6z + 13.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        -6,
        13
      ],
      "placeholder": "e.g. -6, 13",
      "hint": "Enter p, q in that order."
    }
  },
  "5bi": {
    "prompt": "Write v = 2 − 2√3 i in polar form r(cos θ + i sin θ), with 0 ≤ θ ≤ 2π.",
    "answer": "4(cos(5π/3) + i sin(5π/3))",
    "solution": "The modulus is √(4 + 12) = 4. The real part is positive and imaginary part negative, so v is in quadrant IV. Its reference angle is π/3, hence θ = 5π/3. Check 4cos(5π/3) = 2 and 4sin(5π/3) = −2√3.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Find modulus 4.",
        "Use quadrant IV to choose θ = 5π/3 in the specified range."
      ]
    }
  },
  "5bii": {
    "prompt": "Use the polar form of v = 2 − 2√3 i to find both w satisfying w² = v. Give answers in a + ib form.",
    "answer": "w = √3 − i or −√3 + i",
    "solution": "Write v = 4cis(5π/3). A square root has modulus 2 and argument 5π/6 or 11π/6 (the two arguments differ by π). Thus w = 2cis(5π/6) = −√3 + i or 2cis(11π/6) = √3 − i. Squaring either gives 2 − 2√3 i.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use root modulus √4 = 2.",
        "Take both half-arguments, separated by π.",
        "Convert to −√3 + i and √3 − i."
      ]
    }
  },
  "6ai": {
    "prompt": "Given x − √32 = √128 − 5x, find x in the form a√2, where a is a natural number.",
    "answer": "x = 2√2",
    "solution": "Simplify √32 = 4√2 and √128 = 8√2. Rearranging gives 6x = 12√2, so x = 2√2.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Simplify both surds.",
        "Collect 6x = 12√2 and divide to obtain 2√2."
      ]
    }
  },
  "6aii": {
    "prompt": "A = {√(32k²), √(50k²), √(128k²), √(98k²)}, where k is a natural number. Show the mean equals the median.",
    "answer": "Both mean and median are 6k√2.",
    "solution": "For nonnegative k the values simplify to 4k√2, 5k√2, 8k√2 and 7k√2. Their mean is (4 + 5 + 8 + 7)k√2/4 = 6k√2. Sort them as 4k√2, 5k√2, 7k√2, 8k√2; the median is (5 + 7)k√2/2 = 6k√2. Thus they agree.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Simplify the four surds and calculate the mean.",
        "Sort the values before averaging the middle two.",
        "Show both statistics equal 6k√2."
      ]
    }
  },
  "6b": {
    "prompt": "Prove by contradiction that √2 is irrational.",
    "answer": "A reduced rational representation would force both numerator and denominator to be even.",
    "solution": "Suppose √2 = a/b for coprime positive integers a,b. Squaring gives a² = 2b², so a², and therefore a, is even. Write a = 2c. Then 4c² = 2b² implies b² = 2c², so b is also even. This contradicts a and b being coprime. Therefore √2 is irrational.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Assume a rational representation in lowest terms.",
        "Show a is even, substitute a = 2c, and show b is even.",
        "State the contradiction and conclusion."
      ]
    }
  },
  "7ai": {
    "prompt": "To construct the Cantor set, start with [0,1] and repeatedly remove the open middle third of every remaining closed segment. Total lengths removed at steps 1 and 2 are 1/3 and 2/9. Complete steps 3,4,5 as fractions.",
    "answer": "4/27, 8/81, 16/243",
    "solution": "At step j, 2^(j − 1) segments are removed, each of length 1/3ʲ. The total lengths form a geometric sequence with ratio 2/3. Hence the next three are 4/27, 8/81 and 16/243.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        0.14814814814814814,
        0.09876543209876543,
        0.06584362139917696
      ],
      "placeholder": "e.g. 4/27, 8/81, 16/243",
      "hint": "Enter the missing lengths for steps 3,4,5, in order, as fractions."
    },
    "illustration": "p1-2019-cantor"
  },
  "7aii": {
    "prompt": "In the Cantor construction, the total length removed at successive steps is 1/3, 2/9, 4/27, … . Find the total length removed after n steps.",
    "answer": "1 − (2/3)ⁿ",
    "solution": "Sum the first n terms of the geometric sequence with a = 1/3 and r = 2/3: Sₙ = (1/3)[1 − (2/3)ⁿ]/(1 − 2/3) = 1 − (2/3)ⁿ. This is removed length; remaining length is (2/3)ⁿ.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Identify first term 1/3 and ratio 2/3.",
        "Apply the finite geometric sum and simplify to 1 − (2/3)ⁿ."
      ]
    }
  },
  "7aiii": {
    "prompt": "Find the total length removed from [0,1] after infinitely many steps of the Cantor middle-third construction.",
    "answer": "1 unit",
    "solution": "The removed total after n steps is 1 − (2/3)ⁿ. Since |2/3| < 1, its limit is 1. This does not mean that every point has been removed: endpoints and many other points remain, but the remaining set has length zero.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 1,
      "placeholder": "e.g. 1",
      "hint": "Enter the limiting removed length in units."
    }
  },
  "7bi": {
    "prompt": "In the Cantor diagram, identify the endpoints A,B,C,D,E,F as fractions. A is the left endpoint of the right segment at step 1; B,C,D are the remaining unknown endpoints at step 2; E,F are marked at step 3.",
    "answer": "A = 2/3, B = 2/9, C = 7/9, D = 8/9, E = 7/27, F = 25/27",
    "solution": "Each step divides every surviving interval into three equal parts and deletes the open middle one. Step 1 gives A = 2/3. Step 2 gives B = 2/9, C = 2/3 + 1/9 = 7/9 and D = 8/9. Step 3 gives E = 2/9 + 1/27 = 7/27 and F = 8/9 + 1/27 = 25/27. All endpoints remain.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        0.6666666666666666,
        0.2222222222222222,
        0.7777777777777778,
        0.8888888888888888,
        0.25925925925925924,
        0.9259259259259259
      ],
      "placeholder": "e.g. 2/3, 2/9, 7/9, 8/9, 7/27, 25/27",
      "hint": "Enter A,B,C,D,E,F, in that order, as fractions."
    },
    "illustration": "p1-2019-cantor"
  },
  "7bii": {
    "prompt": "Give a reason why 1/3 − 1/9 + 1/27 − 1/81 belongs to the Cantor set formed by removing open middle thirds of [0,1].",
    "answer": "It is 20/81, an endpoint at step 4, so it is never removed.",
    "solution": "The expression equals (27 − 9 + 3 − 1)/81 = 20/81. At step 3 the surviving interval [2/9,7/27] is [18/81,21/81]. At step 4 its open middle third (19/81,20/81) is removed. The right endpoint 20/81 remains, and later deletions never remove an existing endpoint.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Evaluate the expression as 20/81.",
        "Identify it as an endpoint retained at step 4 and at every later step."
      ]
    }
  },
  "7biii": {
    "prompt": "The limit of 1/3 − 1/9 + 1/27 − ⋯ is a point in the Cantor set. Find this point as a simplified fraction.",
    "answer": "1/4",
    "solution": "This is a geometric series with first term 1/3 and ratio −1/3. Its sum is (1/3)/(1 + 1/3) = 1/4.",
    "answerCheck": {
      "kind": "simplest-fraction",
      "numerator": 1,
      "denominator": 4,
      "placeholder": "e.g. 1/4",
      "hint": "Enter the point as a fraction in lowest terms."
    }
  },
  "8a": {
    "prompt": "Weekly revenue is modelled by r(t) = 22500cos(πt/26) + 37500 euro, with t ≥ 0 measured in weeks from the beginning of July. Find r(20) to the nearest euro. Use radians.",
    "answer": "€20,659",
    "solution": "Substitute t = 20 with the calculator in radian mode: r(20) = 22500cos(20π/26) + 37500 ≈ 20658.508. Thus the predicted weekly revenue is €20,659.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 20659,
      "placeholder": "e.g. 20659",
      "hint": "Enter euro to the nearest whole number, without a currency symbol or thousands separator."
    }
  },
  "8b": {
    "prompt": "For r(t) = 22500cos(πt/26) + 37500, find both t in the first 52 weeks when revenue is €26,250. Give weeks as fractions or decimals to at least 3 decimal places.",
    "answer": "t = 52/3 and 104/3 weeks (about 17.333 and 34.667)",
    "solution": "Rearrange to cos(πt/26) = (26250 − 37500)/22500 = −1/2. Over 0 ≤ πt/26 ≤ 2π, the angles are 2π/3 and 4π/3. Therefore t = 52/3 and 104/3 weeks.",
    "answerCheck": {
      "kind": "number-set",
      "expected": [
        17.333333333333332,
        34.666666666666664
      ],
      "tolerance": 0.0006,
      "placeholder": "e.g. 52/3, 104/3",
      "hint": "Enter both times in weeks, as fractions or decimals to at least 3 decimal places."
    }
  },
  "8c": {
    "prompt": "Find r′(t) for r(t) = 22500cos(πt/26) + 37500, using radians.",
    "answer": "r′(t) = −(22500π/26)sin(πt/26)",
    "solution": "The derivative of cos u is −sin u times u′. Here u′ = π/26, and the constant 37500 differentiates to zero. Thus r′(t) = −(22500π/26)sin(πt/26).",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Differentiate cosine with the negative sign.",
        "Include the chain-rule factor π/26."
      ]
    }
  },
  "8d": {
    "prompt": "Use calculus to show that revenue r(t) = 22500cos(πt/26) + 37500 is increasing 30 weeks after the beginning of July.",
    "answer": "r′(30) ≈ 1263.44 > 0, so revenue is increasing.",
    "solution": "Use r′(t) = −(22500π/26)sin(πt/26). At t = 30, sin(15π/13) is negative, giving r′(30) ≈ 1263.436 euro per week of elapsed time. A positive derivative shows the weekly revenue is increasing at that time.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Calculate r′(30) using radians.",
        "Explain that its positive sign implies increasing revenue."
      ]
    }
  },
  "8e": {
    "prompt": "For r(t) = 22500cos(πt/26) + 37500, find when revenue is minimum within the first 52 weeks. Verify using r″(t).",
    "answer": "t = 26 weeks; r″(26) > 0",
    "solution": "Stationary points satisfy sin(πt/26) = 0, giving t = 0,26,52. The second derivative is r″(t) = −22500(π/26)²cos(πt/26). At 26, cosπ = −1 so r″(26) > 0. Also r(26) = 15000 while the endpoints give 60000, confirming the global minimum within the year.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Find t = 26 from the stationary-point equation.",
        "Evaluate the positive second derivative there.",
        "Confirm the endpoint revenues are larger."
      ]
    }
  },
  "9ai": {
    "prompt": "A Norman window is a rectangle of height y metres and width 2x metres, topped by a semicircle of radius x metres. Write its outer perimeter P in terms of x,y and π.",
    "answer": "P = 2y + 2x + πx",
    "solution": "The boundary consists of two vertical sides y, the bottom width 2x, and a semicircular arc of length πx. Their sum is 2y + (2 + π)x. The rectangle’s top edge is internal and is not part of the outer perimeter.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Count two vertical sides and the bottom width 2x.",
        "Add semicircular arc πx, without counting the internal diameter."
      ]
    },
    "illustration": "p1-2019-window"
  },
  "9aii": {
    "prompt": "A Norman window has semicircle radius x, rectangular height y and perimeter 12 m. Show y = [12 − (2 + π)x]/2, with 0 ≤ x ≤ 12/(2 + π).",
    "answer": "y = [12 − (2 + π)x]/2",
    "solution": "The perimeter relation is 12 = 2y + (2 + π)x. Solve for y. Nonnegative radius requires x ≥ 0, and y ≥ 0 gives (2 + π)x ≤ 12, so x ≤ 12/(2 + π). Endpoints are degenerate limiting shapes.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Rearrange the perimeter equation for y.",
        "Derive the domain from x ≥ 0 and y ≥ 0."
      ]
    },
    "illustration": "p1-2019-window"
  },
  "9bi": {
    "prompt": "For the window relation y = [12 − (2 + π)x]/2, complete the table: find y at x = 0 and at x = 12/(2 + π).",
    "answer": "6, 0",
    "solution": "At x = 0, y = 12/2 = 6. At x = 12/(2 + π), the numerator is 12 − 12 = 0, giving y = 0.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        6,
        0
      ],
      "placeholder": "e.g. 6, 0",
      "hint": "Enter the two y values in the table order."
    },
    "illustration": "p1-2019-window-table"
  },
  "9bii": {
    "prompt": "Draw y = [12 − (2 + π)x]/2 for 0 ≤ x ≤ 12/(2 + π). The axes show radius x and rectangular height y, in metres. Draw on paper.",
    "answer": "A decreasing line segment from (0,6) to (12/(2 + π),0) ≈ (2.334,0).",
    "solution": "The function is linear with y-intercept 6 and x-intercept 12/(2 + π) ≈ 2.334. Plot the intercepts and join them with a straight segment restricted to the specified domain.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Plot the intercepts (0,6) and approximately (2.334,0).",
        "Draw only the segment in the stated domain."
      ]
    },
    "illustration": "p1-2019-window-axes"
  },
  "9biii": {
    "prompt": "For y = [12 − (2 + π)x]/2, find the slope to 2 decimal places and interpret it for a perimeter-12 m Norman window.",
    "answer": "Slope −2.57; rectangular height decreases by about 2.57 m per 1 m increase in radius.",
    "solution": "Rewrite as y = 6 − [(2 + π)/2]x. The slope is −(2 + π)/2 ≈ −2.570796. It represents the change in rectangle height per unit change in semicircle radius, while the perimeter stays 12 m. For example a 0.1 m radius increase requires about 0.257 m less rectangular height within the valid domain.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Find slope −(2 + π)/2, rounding to −2.57.",
        "Interpret its negative sign and height-per-radius units with perimeter fixed."
      ]
    }
  },
  "9ci": {
    "prompt": "A perimeter-12 m Norman window has rectangle width 2x, height y = [12 − (2 + π)x]/2 and a semicircle of radius x. Show its area is a(x) = [24x − (π + 4)x²]/2.",
    "answer": "a(x) = 12x − (π + 4)x²/2",
    "solution": "Area = rectangle + semicircle = 2xy + πx²/2. Substitute y to obtain x[12 − (2 + π)x] + πx²/2 = 12x − (2 + π/2)x² = [24x − (π + 4)x²]/2.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Add 2xy and πx²/2.",
        "Substitute y and simplify the x² coefficient."
      ]
    },
    "illustration": "p1-2019-window"
  },
  "9cii": {
    "prompt": "Find a′(x) for a(x) = [24x − (π + 4)x²]/2.",
    "answer": "a′(x) = 12 − (π + 4)x",
    "solution": "Rewrite a(x) = 12x − [(π + 4)/2]x². Differentiate term by term to obtain a′(x) = 12 − (π + 4)x.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Treat π + 4 as a constant.",
        "Differentiate to 12 − (π + 4)x."
      ]
    }
  },
  "9ciii": {
    "prompt": "For a perimeter-12 m Norman window, a(x) = 12x − (π + 4)x²/2 and y = [12 − (2 + π)x]/2. Find the relationship between x and y when area is maximum.",
    "answer": "x = y = 12/(π + 4)",
    "solution": "Set a′(x) = 12 − (π + 4)x = 0 to get x = 12/(π + 4). Since a″(x) = −(π + 4) < 0, this is the maximum of the concave quadratic and lies in the permitted domain. Substitution gives y = [12 − (2 + π)12/(π + 4)]/2 = 12/(π + 4) = x. Thus the rectangle height equals the semicircle radius, half the rectangle’s width.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Find the stationary radius and verify a maximum.",
        "Substitute into the height formula to establish y = x."
      ]
    },
    "illustration": "p1-2019-window"
  }
};

export const realPaper2019p1: StudyPaper = {
  id: paperId, year: 2019, level: "Higher", paperNumber: 1, kind: "real", estimatedMinutes: 150,
  title: "2019 Higher Level Paper 1",
  description: "All nine questions ready onscreen with worked solutions and answer checks or guided self-checks.",
  questions: bookPaper.parts.map((part) => {
    const code = part.id.slice(paperId.length + 1);
    if (!content[code]) throw new Error(`Missing reviewed content for ${part.id}`);
    return { id: part.id, number: part.label.replace(/^Q/, "").replace("(", " ("), marks: null,
      topic: part.topicIds.includes("p1-complex") ? "Complex numbers" : part.topicIds.includes("p1-calculus") ? "Functions and calculus" : part.topicIds.includes("p1-sequences") ? "Sequences and series" : part.topicIds.includes("p1-number") ? "Number and arithmetic" : part.topicIds.includes("p1-graphs") ? "Functions and graphs" : "Algebra",
      ...content[code] };
  }),
};
