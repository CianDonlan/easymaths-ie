import bookPaper from "./book2017p1.json";
import type { StudyPaper, StudyQuestion } from "../types";

const paperId = "lc-hl-2017-normal-p1";
type Content = Pick<StudyQuestion, "prompt" | "answer" | "solution"> & Partial<Pick<StudyQuestion, "expression" | "illustration" | "answerCheck" | "selfCheck">>;

// Source prompts and figures checked on printed pages 3–19. Solutions are
// authored explanations; individual marks and official scheme allocations are unverified.
const content: Record<string, Content> = {
  "1a": {
    "prompt": "Write f(x) = 2x² − 7x − 10 as a(x + h)² + k, with rational a,h,k.",
    "answer": "f(x) = 2(x − 7/4)² − 129/8",
    "solution": "Factor out 2 from the quadratic and linear terms: 2[x² − (7/2)x] − 10. Complete the square inside: x² − (7/2)x = (x − 7/4)² − 49/16. Therefore f(x) = 2(x − 7/4)² − 49/8 − 10 = 2(x − 7/4)² − 129/8.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use half of −7/2 inside the square.",
        "Obtain a = 2,h = −7/4,k = −129/8 and write the full expression."
      ]
    }
  },
  "1b": {
    "prompt": "Find the minimum point of f(x) = 2x² − 7x − 10.",
    "answer": "(7/4,−129/8)",
    "solution": "The completed-square form is 2(x − 7/4)² − 129/8. The square is nonnegative and its coefficient is positive, so the minimum occurs at x = 7/4 with f(x) = −129/8.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        1.75,
        -16.125
      ],
      "placeholder": "e.g. 7/4, -129/8",
      "hint": "Enter the minimum point as x, y. Fractions are accepted."
    }
  },
  "1ci": {
    "prompt": "Explain why f(x) = 2x² − 7x − 10 must have two distinct real roots.",
    "answer": "Its discriminant is 129 > 0.",
    "solution": "For a quadratic, discriminant b² − 4ac = (−7)² − 4(2)(−10) = 129. Since this is positive, there are two distinct real roots. Equivalently the upward-opening graph has its minimum below the x-axis.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Calculate the discriminant or use the upward-opening graph’s negative minimum.",
        "Explain why this gives two distinct crossings of the x-axis."
      ]
    }
  },
  "1cii": {
    "prompt": "Write the roots of 2x² − 7x − 10 = 0 in the form p ± √q, where p,q are rational.",
    "answer": "x = 7/4 ± √(129/16)",
    "solution": "The quadratic formula gives x = [7 ± √129]/4. To match p ± √q, move the positive factor 1/4 inside the root: √129/4 = √(129/16). Thus p = 7/4,q = 129/16.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use discriminant 129 and denominator 4.",
        "Write the result as 7/4 ± √(129/16), with rational p and q."
      ]
    }
  },
  "2a": {
    "prompt": "For z = −√3 + i, use de Moivre’s theorem to write z⁴ in the form a + b√c i with integer a,b,c.",
    "answer": "z⁴ = −8 − 8√3 i",
    "solution": "The modulus is 2 and argument is 150° = 5π/6. De Moivre gives z⁴ = 16[cos(10π/3) + i sin(10π/3)]. Reduce the angle to 4π/3, whose cosine is −1/2 and sine −√3/2. Hence z⁴ = −8 − 8√3 i.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Write z as 2cis(5π/6).",
        "Raise both modulus and argument appropriately.",
        "Convert the fourth power to −8 − 8√3 i."
      ]
    }
  },
  "2b": {
    "prompt": "z = −√3 + i. A complex number w has modulus 3 and argument 30° from the positive real axis. Simplify t = zw.",
    "answer": "t = −6",
    "solution": "z has modulus 2 and argument 150°. In a product, multiply moduli and add arguments: t has modulus 6 and argument 180°, so t = 6(cos180° + i sin180°) = −6.",
    "answerCheck": {
      "kind": "numeric",
      "expected": -6,
      "placeholder": "e.g. -6",
      "hint": "Enter the simplified real value of t."
    }
  },
  "3a": {
    "prompt": "Differentiate F(x) = x²/3 − x + 3 from first principles.",
    "answer": "F′(x) = 2x/3 − 1",
    "solution": "Use F′(x) = limₕ→₀[F(x + h) − F(x)]/h. Expanding gives the numerator (2xh + h²)/3 − h. For h ≠ 0 divide by h to get 2x/3 + h/3 − 1. Taking h → 0 yields 2x/3 − 1.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Start with the difference quotient and expand F(x + h).",
        "Cancel h before taking the limit.",
        "Show the limit equals 2x/3 − 1."
      ]
    }
  },
  "3b": {
    "prompt": "f(x) = ln(3x² + 2) and g(x) = x + 5. Find the derivative of f(g(x)) at x = 1/4, to 3 decimal places.",
    "answer": "0.372",
    "solution": "The composition is ln[3(x + 5)² + 2]. Its derivative is 6(x + 5)/[3(x + 5)² + 2]. At x = 1/4, x + 5 = 21/4, giving 31.5/84.6875 ≈ 0.37195572, or 0.372.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.372,
      "placeholder": "e.g. 0.372",
      "hint": "Enter the derivative value to 3 decimal places."
    }
  },
  "4a": {
    "prompt": "The percentage of a substance remaining on days 1,2,3,4 is 95%,42.75%,19.2375%,8.6569%. Assuming exponential decay with the ratio shown, find the first day when less than 0.01% remains.",
    "answer": "Day 13",
    "solution": "The daily multiplier is 42.75/95 = 0.45, consistent with the other values to rounding. At day n the percentage is 95(0.45)^(n − 1). Solve 95(0.45)^(n − 1) < 0.01. Taking logs and dividing by negative ln0.45 gives n > 12.470205, so the first integer day is 13. Day 1 corresponds to exponent zero.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 13,
      "placeholder": "e.g. 13",
      "hint": "Enter the first day number. Compare percentages in the same units."
    },
    "illustration": "p1-2017-decay"
  },
  "4b": {
    "prompt": "A square has side 2 cm. Join its side midpoints to form a new square and repeat indefinitely. Find the sum of all square perimeters, including the original, as a + b√c cm with natural a,b,c.",
    "answer": "16 + 8√2 cm",
    "solution": "The original perimeter is 8. Each new side is √(1² + 1²) = √2 rather than 2, so the side and perimeter ratio is 1/√2. The sum is 8/(1 − 1/√2) = 8(2 + √2) = 16 + 8√2 cm.",
    "answerCheck": {
      "kind": "constant-radical",
      "constant": 16,
      "radicalValue": 11.313708498984761,
      "placeholder": "e.g. 16+8sqrt(2)",
      "hint": "Enter the exact answer as constant plus radical, such as 16+8sqrt(2)."
    },
    "illustration": "p1-2017-squares"
  },
  "5a": {
    "prompt": "For f(x) = 2x³ + 5x² − 4x − 3, show x = −3 is a root and find the other two roots.",
    "answer": "f(−3) = 0; the other roots are −1/2 and 1.",
    "solution": "Substitute −3: −54 + 45 + 12 − 3 = 0. Divide by x + 3 to get 2x² − x − 1 = (2x + 1)(x − 1). Therefore f(x) = (x + 3)(2x + 1)(x − 1) and the other roots are −1/2,1.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Verify f(−3) explicitly.",
        "Factor the quotient and obtain the other two roots −1/2 and 1."
      ]
    }
  },
  "5b": {
    "prompt": "Find the local maximum and minimum points of f(x) = 2x³ + 5x² − 4x − 3.",
    "answer": "Maximum (−2,9); minimum (1/3,−100/27)",
    "solution": "f′(x) = 6x² + 10x − 4 = 2(3x − 1)(x + 2), so stationary x values are −2 and 1/3. f″(x) = 12x + 10 is negative at −2 and positive at 1/3, identifying a local maximum and minimum respectively. Their y values are 9 and −100/27.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        -2,
        9,
        0.3333333333333333,
        -3.7037037037037037
      ],
      "placeholder": "e.g. -2, 9, 1/3, -100/27",
      "hint": "Enter maximum x,y, then minimum x,y. Use exact fractions."
    }
  },
  "5c": {
    "prompt": "For f(x) = 2x³ + 5x² − 4x − 3, find all constants a for which f(x) + a = 0 has only one distinct real root.",
    "answer": "a < −9 or a > 100/27",
    "solution": "Vertical translation by a moves the local maximum from 9 to 9 + a and minimum from −100/27 to −100/27 + a. A cubic of this shape has only one real crossing if both turning points are below the axis (9 + a < 0), or both above (−100/27 + a > 0). Thus a < −9 or a > 100/27. At either equality a turning point touches the axis and another real root remains, so the boundaries are excluded.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Translate both stationary y values by a.",
        "Require both turning points strictly above or strictly below zero.",
        "Give the union a < −9 or a > 100/27 and exclude equality."
      ]
    }
  },
  "6a": {
    "prompt": "The supplied graph is g(x) = eˣ for 0 ≤ x ≤ 1. On the same axes, draw h(x) = e^(−x) over that domain on paper.",
    "answer": "A decreasing curve from (0,1) to (1,e⁻¹) ≈ (1,0.368).",
    "solution": "Evaluate points such as h(0) = 1,h(0.5) ≈ 0.607,h(1) ≈ 0.368. Draw a smooth decreasing convex curve below g for x > 0, meeting it at (0,1). The curve stays positive.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Start at (0,1), the common point.",
        "Draw a positive decreasing curve to about (1,0.368).",
        "Keep the curve bending upwards throughout."
      ]
    },
    "illustration": "p1-2017-exponential"
  },
  "6b": {
    "prompt": "Find the area enclosed by g(x) = eˣ, h(x) = e^(−x) and x = 0.75. Give 4 decimal places.",
    "answer": "0.5894 square unit",
    "solution": "The two curves meet where eˣ = e^(−x), namely x = 0. On [0,0.75], eˣ is above e^(−x). Area = ∫₀^0.75(eˣ − e^(−x)) dx = [eˣ + e^(−x)]₀^0.75 = e^0.75 + e^(−0.75) − 2 ≈ 0.58936657.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 0.5894,
      "placeholder": "e.g. 0.5894",
      "hint": "Enter the area to 4 decimal places."
    }
  },
  "7a": {
    "prompt": "Sapphire City population is p(t) = S e^(0.1t) × 10⁶, with t in years since the beginning of 2010. The initial population is 1,100,000. Find S.",
    "answer": "S = 1.1",
    "solution": "At t = 0, e⁰ = 1, so p(0) = S × 10⁶ = 1100000. Divide by one million to get S = 1.1.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 1.1,
      "placeholder": "e.g. 1.1",
      "hint": "Enter S, remembering that the model already multiplies by 10⁶."
    }
  },
  "7b": {
    "prompt": "Sapphire City population is p(t) = 1.1e^(0.1t) × 10⁶, with t measured from the beginning of 2010. Predict the population at the beginning of 2015, to the nearest person.",
    "answer": "1,813,593 people",
    "solution": "The beginning of 2015 corresponds to t = 5. Hence p(5) = 1.1e^0.5 × 10⁶ ≈ 1813593.3978, giving 1813593 people.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 1813593,
      "placeholder": "e.g. 1813593",
      "hint": "Enter the population rounded to the nearest person, without thousands separators."
    }
  },
  "7c": {
    "prompt": "For Sapphire City, p(t) = 1.1e^(0.1t) × 10⁶, with t measured from the beginning of 2010. Find the predicted population change during 2015, to the nearest person.",
    "answer": "Increase of 190,737 people",
    "solution": "During 2015 runs from t = 5 to t = 6. The change is p(6) − p(5) = 1.1 × 10⁶(e^0.6 − e^0.5) ≈ 190737.2827 people, an increase. This is a one-year difference, rather than an instantaneous derivative.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 190737,
      "placeholder": "e.g. 190737",
      "hint": "Enter the positive increase during 2015, to the nearest person."
    }
  },
  "7d": {
    "prompt": "Avalon population is q(t) = 3.9e^(kt) × 10⁶, with t in years from the beginning of 2010. Its population at the beginning of 2011 is 3,709,795. Write an equation and show k = −0.05 to 2 decimal places.",
    "answer": "3709795 = 3.9eᵏ × 10⁶; k ≈ −0.05",
    "solution": "The beginning of 2011 is t = 1. Thus eᵏ = 3709795/3900000 and k = ln(3709795/3900000) ≈ −0.05. The negative constant models a decreasing population.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Substitute t = 1 and the given population.",
        "Divide by 3.9 × 10⁶ and take natural logs.",
        "Round to k = −0.05."
      ]
    }
  },
  "7e": {
    "prompt": "With t measured from the beginning of 2010, the city populations are p(t) = 1.1e^(0.1t) × 10⁶ and q(t) = 3.9e^(−0.05t) × 10⁶. During which calendar year are they equal?",
    "answer": "2018",
    "solution": "Equate the models and cancel 10⁶: e^(0.15t) = 3.9/1.1. Thus t = ln(3.9/1.1)/0.15 ≈ 8.437776 years after the beginning of 2010. That falls during 2018. Do not round t up before choosing the calendar year.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 2018,
      "placeholder": "e.g. 2018",
      "hint": "Enter the calendar year, rather than elapsed time t."
    }
  },
  "7f": {
    "prompt": "Avalon has q(t) = 3.9e^(−0.05t) × 10⁶ people, with t measured from the beginning of 2010. Find its predicted average population from the beginning of 2010 to the beginning of 2025, to the nearest person.",
    "answer": "2,743,694 people",
    "solution": "Use the continuous mean over 0 ≤ t ≤ 15: (1/15)∫₀¹⁵ 3.9 × 10⁶ e^(−0.05t) dt = [3.9 × 10⁶/(15 × 0.05)](1 − e^(−0.75)) ≈ 2743693.9257. This rounds to 2743694 people. Averaging just the endpoint populations would give a different quantity.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 2743694,
      "placeholder": "e.g. 2743694",
      "hint": "Enter the continuous average population rounded to the nearest person."
    }
  },
  "7g": {
    "prompt": "For Avalon, q(t) = 3.9e^(−0.05t) × 10⁶, with t measured from the beginning of 2010. Find the rate of population change at the beginning of 2018, to the nearest person per year.",
    "answer": "−130,712 people per year",
    "solution": "Differentiate: q′(t) = −195000e^(−0.05t). The beginning of 2018 is t = 8, so q′(8) = −195000e^(−0.4) ≈ −130712.409 people per year. The negative sign indicates a population decrease.",
    "answerCheck": {
      "kind": "numeric",
      "expected": -130712,
      "placeholder": "e.g. -130712",
      "hint": "Enter the signed rate, rounded to the nearest person per year."
    }
  },
  "8a": {
    "prompt": "A loan of P is repaid by t equal end-of-period instalments A, with periodic interest i > 0. Derive A = Pi(1 + i)ᵗ/[(1 + i)ᵗ − 1] using a finite geometric series.",
    "answer": "P = A[(1 − (1 + i)⁻ᵗ)/i], hence the stated formula.",
    "solution": "At the loan date, the present values of the future payments are A/(1 + i), A/(1 + i)²,…,A/(1 + i)ᵗ. Their sum equals P. Summing this geometric series gives P = [A/(1 + i)][1 − (1 + i)⁻ᵗ]/[1 − (1 + i)⁻¹] = A[1 − (1 + i)⁻ᵗ]/i. Solve for A and multiply numerator and denominator by (1 + i)ᵗ to obtain A = Pi(1 + i)ᵗ/[(1 + i)ᵗ − 1]. End-of-period timing makes the first discount exponent one.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Write the present values with exponents 1 through t.",
        "Sum the finite geometric series and set it equal to P.",
        "Rearrange to the required repayment formula."
      ]
    }
  },
  "8bi": {
    "prompt": "Alex owes €5000 on a credit card and pays a fixed 2.5% of the original debt at each month’s end. Find the fixed monthly repayment.",
    "answer": "€125",
    "solution": "The repayment is fixed from the original balance: 0.025 × 5000 = €125. It is not recalculated as a percentage of each month’s reduced balance.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 125,
      "placeholder": "e.g. 125",
      "hint": "Enter the fixed monthly repayment in euro."
    }
  },
  "8bii": {
    "prompt": "The credit-card exam model has equivalent annual compound growth 21.75%. Find the equivalent monthly interest rate as a percentage to 3 significant figures.",
    "answer": "1.65% per month",
    "solution": "Let the monthly decimal rate be i. Then (1 + i)¹² = 1.2175, so i = 1.2175^(1/12) − 1 ≈ 0.0165351823. As a percentage this is 1.65351823%, or 1.65% to three significant figures. Use the equivalent compound rate, not 21.75/12.",
    "answerCheck": {
      "kind": "percentage",
      "expected": 1.65,
      "placeholder": "e.g. 1.65%",
      "hint": "Enter the monthly percentage to 3 significant figures."
    }
  },
  "8biii": {
    "prompt": "Alex begins with €5000, pays €125 at each month’s end and makes no new transactions. Using the rounded monthly rate 1.65%, complete the first three rows of the balance table. The first row already gives debt reduction €42.50 and new balance €4957.50. Round money to cents.",
    "answer": "Rows (payment, interest, reduction, balance): (125,82.50,42.50,4957.50); (125,81.80,43.20,4914.30); (125,81.09,43.91,4870.39)",
    "solution": "Each month, interest = previous balance × 0.0165; reduction = 125 − interest; new balance = previous balance − reduction. Month 1 interest is 82.50. Month 2 interest is 4957.50 × 0.0165 = 81.79875 ≈ 81.80, leaving 4914.30. Month 3 interest is 4914.30 × 0.0165 ≈ 81.09, leaving 4870.39. The supplied first row uses the rounded 1.65% rate, so use that consistently rather than the unrounded rate from the annual conversion.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Use a fixed €125 payment and interest on each previous balance.",
        "Complete interest and reduction columns to cents.",
        "Obtain balances 4957.50,4914.30,4870.39."
      ]
    },
    "illustration": "p1-2017-loan-table"
  },
  "8biv": {
    "prompt": "Alex owes €5000, pays €125 at each month’s end, makes no new transactions and uses monthly interest 1.65%. Find the payoff duration to the nearest month.",
    "answer": "66 months",
    "solution": "From the repayment formula, (1.0165)⁻ⁿ = 1 − 5000(0.0165)/125 = 0.34. Taking logs gives n = −ln0.34/ln1.0165 ≈ 65.920337, rounding to 66 months. An actual final payment can be smaller than the regular instalment.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 66,
      "placeholder": "e.g. 66",
      "hint": "Enter the duration in months to the nearest whole month."
    }
  },
  "8bv": {
    "prompt": "Alex instead borrows €5000 in this exam model at an equivalent annual compound rate of 8.5%, repaying in 156 equal end-of-week payments. Using 52 weeks per year, find the weekly payment to the nearest cent.",
    "answer": "€36.16",
    "solution": "The weekly rate is i = 1.085^(1/52) − 1 ≈ 0.00157007719. With n = 156, use A = 5000i/[1 − (1 + i)⁻¹⁵⁶] ≈ 36.16157892. Thus the weekly repayment rounds to €36.16. Convert to the equivalent weekly compound rate before using weekly periods.",
    "answerCheck": {
      "kind": "numeric",
      "expected": 36.16,
      "placeholder": "e.g. 36.16",
      "hint": "Enter the weekly repayment in euro to 2 decimal places."
    }
  },
  "8bvi": {
    "prompt": "Compare Alex’s repayment totals using the earlier rounded results: 66 monthly card payments of €125 versus 156 weekly credit-union payments of €36.16. How much is saved? Explain the rounding assumption.",
    "answer": "€2609.04 using the rounded instalment comparison.",
    "solution": "The card total using 66 full instalments is 66 × 125 = €8250. The credit-union total using rounded weekly payments is 156 × 36.16 = €5640.96. Their difference is €2609.04. Retaining the unrounded weekly payment gives approximately €2608.79 instead. This is the comparison using the earlier rounded duration: an actual final card instalment adjusted to clear the exact balance would also change the total slightly.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Compare totals across all months and weeks, rather than subtracting unlike individual payments.",
        "Using the rounded values, obtain €8250 − €5640.96 = €2609.04.",
        "State the rounded-duration/instalment assumption rather than claiming an exact final account balance."
      ]
    }
  },
  "9a": {
    "prompt": "A harbour tide is modelled by f(t) = a + b cos(ct), with t in hours since the first high tide and angles in radians. High depth is 5.5 m, low depth 1.7 m, and high tides occur at 02:00 and 14:34 on Saturday. Add labelled, scaled axes to the supplied curve on paper, with P at the first morning high tide.",
    "answer": "P is (0,5.5) using elapsed hours; successive highs are 12 h 34 min apart and lows are 1.7 m.",
    "solution": "Label the vertical axis depth in metres and mark 5.5 at peaks and 1.7 at troughs, with midline 3.6. Put t = 0 at P if using elapsed hours from the first high; the next high is t = 12 h 34 min and the intervening low t = 6 h 17 min. A clearly labelled clock-time axis may instead place the peaks at 02:00 and 14:34. Use a consistent scale and distinguish elapsed time from clock time.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Label depth in metres and place the 5.5 m peaks and 1.7 m troughs.",
        "Place P at elapsed t = 0 (02:00 clock time).",
        "Scale successive peaks 12 h 34 min apart."
      ]
    },
    "illustration": "p1-2017-tide"
  },
  "9bi": {
    "prompt": "A harbour tide is modelled by f(t) = a + b cos(ct), with t in hours since the first high tide and angles in radians. High depth is 5.5 m, low depth 1.7 m, and high tides occur at 02:00 and 14:34 on Saturday. Find a and positive b.",
    "answer": "a = 3.6, b = 1.9",
    "solution": "At t = 0 the cosine is 1, so a + b = 5.5. At low tide a − b = 1.7. Add to obtain 2a = 7.2, giving a = 3.6; subtract to obtain 2b = 3.8, giving b = 1.9.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        3.6,
        1.9
      ],
      "placeholder": "e.g. 3.6, 1.9",
      "hint": "Enter a, b in that order."
    }
  },
  "9bii": {
    "prompt": "A harbour tide is modelled by f(t) = a + b cos(ct), with t in hours since the first high tide and angles in radians. High depth is 5.5 m, low depth 1.7 m, and high tides occur at 02:00 and 14:34 on Saturday. Show c = 0.5 to 1 decimal place.",
    "answer": "c = 2π/(12 + 34/60) ≈ 0.5 radians per hour",
    "solution": "The period is 12 h 34 min = 12 + 34/60 hours, not 12.34 hours. Since c × period = 2π, c = 2π/(12 + 34/60) ≈ 0.49998822, rounding to 0.5.",
    "selfCheck": {
      "placeholder": "Write your answer and supporting work, then compare with the solution.",
      "checks": [
        "Convert 34 minutes to 34/60 hour.",
        "Use c = 2π/period and round to 0.5."
      ]
    }
  },
  "9c": {
    "prompt": "A harbour tide is modelled by f(t) = a + b cos(ct), with t in hours since the first high tide and angles in radians. High depth is 5.5 m, low depth 1.7 m, and high tides occur at 02:00 and 14:34 on Saturday. Using f(t) = 3.6 + 1.9cos(0.5t), find both Saturday-afternoon times when the water depth is 5.2 m, to the nearest minute.",
    "answer": "13:26 and 15:42",
    "solution": "Set cos(0.5t) = (5.2 − 3.6)/1.9 = 16/19. Let θ = arccos(16/19). Around the second high tide, 0.5t = 2π − θ or 2π + θ, giving elapsed times about 11.427128 and 13.705613 hours. Add the 02:00 starting time to get clock times about 13:25:38 and 15:42:20, which round to 13:26 and 15:42. Using the unrounded c from the observed period yields the same rounded minutes.",
    "answerCheck": {
      "kind": "ordered-values",
      "expected": [
        13,
        26,
        15,
        42
      ],
      "placeholder": "e.g. 13, 26, 15, 42",
      "hint": "Enter first hour, minute, then second hour, minute in 24-hour clock format, separated by commas."
    }
  }
};

export const realPaper2017p1: StudyPaper = {
  id: paperId, year: 2017, level: "Higher", paperNumber: 1, kind: "real", estimatedMinutes: 150,
  title: "2017 Higher Level Paper 1",
  description: "All nine questions ready onscreen with worked solutions and answer checks or guided self-checks.",
  questions: bookPaper.parts.map((part) => {
    const code = part.id.slice(paperId.length + 1);
    if (!content[code]) throw new Error(`Missing reviewed content for ${part.id}`);
    return { id: part.id, number: part.label.replace(/^Q/, "").replace("(", " ("), marks: null,
      topic: part.topicIds.includes("p1-complex") ? "Complex numbers" : part.topicIds.includes("p1-calculus") ? "Functions and calculus" : part.topicIds.includes("p1-sequences") ? "Sequences and series" : part.topicIds.includes("p1-number") ? "Number and arithmetic" : part.topicIds.includes("p1-graphs") ? "Functions and graphs" : "Algebra",
      ...content[code] };
  }),
};
