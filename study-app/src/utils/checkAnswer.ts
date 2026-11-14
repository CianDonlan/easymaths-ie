import type { AnswerCheck, AnswerCheckOutcome } from "../types";

function parseNumericToken(rawValue: string) {
  const normalised = rawValue
    .trim()
    .replace(/[−–—]/g, "-")
    .replace(/÷/g, "/")
    .replace(/\s+/g, "");
  const match = normalised.match(
    /^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(?:\/([+-]?(?:\d+(?:\.\d*)?|\.\d+)))?(%)?$/,
  );

  if (!match) return null;

  const numerator = Number(match[1]);
  const denominator = match[2] === undefined ? 1 : Number(match[2]);
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
    return null;
  }

  const value = numerator / denominator;
  return match[3] ? value / 100 : value;
}

function parseSingleValue(answer: string) {
  const candidate = answer.split("=").at(-1) ?? answer;
  return parseNumericToken(candidate);
}

function parsePositiveFraction(answer: string) {
  const value = (answer.split("=").at(-1) ?? answer).trim();
  const match = value.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (!match) return null;
  const numerator = Number(match[1]);
  const denominator = Number(match[2]);
  if (!Number.isSafeInteger(numerator) || !Number.isSafeInteger(denominator) || numerator <= 0 || denominator <= 0) return null;
  return numerator / denominator;
}

function parseCircleCentreRadius(answer: string) {
  const match = answer.trim().replace(/[−–—]/g, "-").match(/^\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*\)\s*[;,]\s*(.+)$/i);
  if (!match) return null;
  const radiusText = match[3].trim().toLowerCase().replace(/\s+/g, "");
  const radical = radiusText.match(/^(\d*(?:\.\d+)?)?(?:sqrt\(?([0-9]+)\)?|√\(?([0-9]+)\)?)$/);
  const radius = radical
    ? Number(radical[1] || 1) * Math.sqrt(Number(radical[2] ?? radical[3]))
    : parseNumericToken(radiusText);
  return radius === null ? null : { x: Number(match[1]), y: Number(match[2]), radius };
}

function parseNumberSet(answer: string) {
  const parts = answer
    .replace(/[−–—]/g, "-")
    .replace(/[{}()[\]]/g, " ")
    .replace(/\bsolutions?\s+(?:are|is)\b/gi, " ")
    .split(/\b(?:or|and)\b|[,;]/gi)
    .map((part) => part.trim())
    .filter(Boolean);
  if (!parts.length) return null;

  const values = parts.map((part) => parseSingleValue(part));
  return values.every((value): value is number => value !== null) ? values : null;
}

function valuesMatch(actual: number, expected: number, tolerance: number) {
  return Math.abs(actual - expected) <= tolerance;
}

function parseInterval(answer: string) {
  const value = answer.trim().replace(/[−–—]/g, "-").replace(/\s+/g, "")
    .replace(/<=/g, "≤");
  const chain = value.match(/^(.+?)(≤|<)x(≤|<)(.+)$/i);
  const bracket = value.match(/^(?:x∈)?(\[|\()([^,]+),([^\])]+)(\]|\))$/i);
  if (!chain && !bracket) return null;
  const minimum = parseNumericToken(chain ? chain[1] : bracket![2]);
  const maximum = parseNumericToken(chain ? chain[4] : bracket![3]);
  return minimum === null || maximum === null ? null : {
    minimum, maximum,
    includeMinimum: chain ? chain[2] === "≤" : bracket![1] === "[",
    includeMaximum: chain ? chain[3] === "≤" : bracket![4] === "]",
  };
}

function parseLinearCos(answer: string, frequency: number) {
  const expression = (answer.split("=").at(-1) ?? answer).trim()
    .replace(/[−–—]/g, "-").replace(/\s+/g, "")
    .replace(/[×·*]/g, "").toLowerCase();
  const terms = expression.match(/[+-]?[^+-]+/g) ?? [];
  if (!terms.length) return null;
  let linear = 0;
  let cosine = 0;
  for (const term of terms) {
    const match = term.match(/^([+-]?)(\d*(?:\.\d+)?)?(x|cos\((\d+)x\))$/);
    if (!match) return null;
    const value = (match[1] === "-" ? -1 : 1) * (match[2] ? Number(match[2]) : 1);
    if (match[3] === "x") linear += value;
    else if (Number(match[4]) === frequency) cosine += value;
    else return null;
  }
  return { linear, cosine };
}

function parseLinearForm(value: string) {
  const terms = value.replace(/^-/, "0-").split(/(?=[+-])/).filter(Boolean);
  if (!terms.length) return null;
  const result = { x: 0, y: 0, constant: 0 };
  for (const term of terms) {
    const match = term.match(/^([+-]?)(\d*(?:\.\d+)?)?(x|y)?$/);
    if (!match || (!match[2] && !match[3])) return null;
    const signed = (match[1] === "-" ? -1 : 1) * (match[2] ? Number(match[2]) : 1);
    if (match[3] === "x") result.x += signed;
    else if (match[3] === "y") result.y += signed;
    else result.constant += signed;
  }
  return result;
}

function parseLineEquation(answer: string) {
  const value = answer.trim().replace(/[−–—]/g, "-").replace(/\s+/g, "")
    .replace(/[×·*]/g, "").toLowerCase()
    .replace(/([+-]?\d+(?:\.\d+)?)\(([xy])([+-]\d+(?:\.\d+)?)\)/g, (_, coefficient: string, variable: string, offset: string) => {
      const constant = Number(coefficient) * Number(offset);
      return `${coefficient}${variable}${constant >= 0 ? "+" : ""}${constant}`;
    });
  const sides = value.split("=");
  if (sides.length !== 2) return null;
  const left = parseLinearForm(sides[0]);
  const right = parseLinearForm(sides[1]);
  if (!left || !right) return null;
  return { x: left.x - right.x, y: left.y - right.y, constant: left.constant - right.constant };
}

const superscripts: Record<string, string> = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9" };
function normalisePowers(value: string) {
  return value.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (digits) => `^${[...digits].map((digit) => superscripts[digit]).join("")}`);
}

function parsePowerChain(answer: string) {
  const expression = normalisePowers((answer.split("=").at(-1) ?? answer).trim()
    .replace(/[−–—]/g, "-").replace(/\s+/g, "")
    .replace(/[×·*]/g, ""));
  const simplified = expression.match(/^([+-]?\d+(?:\.\d+)?)x\^4\(3x\^5-4\)\^27$/);
  if (simplified) return Number(simplified[1]);
  const chain = expression.match(/^([+-]?\d+(?:\.\d+)?)\(3x\^5-4\)\^27\(?([+-]?\d+(?:\.\d+)?)x\^4\)?$/);
  return chain ? Number(chain[1]) * Number(chain[2]) : null;
}

function parseComplexPair(answer: string) {
  const expression = (answer.split("=").at(-1) ?? answer).trim()
    .replace(/[−–—]/g, "-").replace(/\s+/g, "")
    .replace(/\(([+-]?\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?)\)/g, "$1");
  if (!expression.endsWith("i")) return null;
  const body = expression.slice(0, -1);
  for (let index = 1; index < body.length; index++) {
    if (body[index] !== "+" && body[index] !== "-") continue;
    const real = parseNumericToken(body.slice(0, index));
    const imaginaryText = body.slice(index);
    const imaginary = imaginaryText === "+" ? 1 : imaginaryText === "-" ? -1 : parseNumericToken(imaginaryText);
    if (real !== null && imaginary !== null) return { real, imaginary };
  }
  return null;
}

function parseVertexForm(answer: string) {
  const expression = normalisePowers((answer.split("=").at(-1) ?? answer).trim()
    .replace(/[−–—]/g, "-").replace(/\s+/g, "")
    .replace(/[×·*]/g, ""));
  const match = expression.match(/^([+-]?\d+(?:\.\d+)?)\(x([+-]\d+(?:\.\d+)?)\)\^2([+-]\d+(?:\.\d+)?)$/);
  return match ? { a: Number(match[1]), h: Number(match[2]), k: Number(match[3]) } : null;
}

function parseConstantLog(answer: string) {
  const expression = (answer.split("=").at(-1) ?? answer).trim()
    .replace(/[−–—]/g, "-").replace(/\s+/g, "")
    .replace(/[×·*]/g, "").replace(/ln\(p\)/gi, "lnp").toLowerCase();
  const terms = expression.match(/[+-]?[^+-]+/g) ?? [];
  if (!terms.length) return null;
  let constant = 0;
  let logCoefficient = 0;
  for (const term of terms) {
    const match = term.match(/^([+-]?)(\d*(?:\.\d+)?)?(lnp)?$/);
    if (!match || (!match[2] && !match[3])) return null;
    const value = (match[1] === "-" ? -1 : 1) * (match[2] ? Number(match[2]) : 1);
    if (match[3]) logCoefficient += value;
    else constant += value;
  }
  return { constant, logCoefficient };
}

function parsePolynomialPowers(answer: string, variable: string) {
  const expression = normalisePowers((answer.split("=").at(-1) ?? answer).trim()
    .replace(/[−–—]/g, "-").replace(/\s+/g, "")
    .replace(/[×·*]/g, ""));
  const terms = expression.match(/[+-]?[^+-]+/g) ?? [];
  if (!terms.length) return null;
  const coefficients: Record<number, number> = {};
  for (const term of terms) {
    const match = term.match(/^([+-]?)(\d+(?:\.\d+)?)([a-z])\^(\d+)$/i);
    if (!match || match[3].toLowerCase() !== variable) return null;
    const power = Number(match[4]);
    coefficients[power] = (coefficients[power] ?? 0) + (match[1] === "-" ? -1 : 1) * Number(match[2]);
  }
  return coefficients;
}

function parseLinearSequence(answer: string, variable = "n") {
  const expression = (answer.split("=").at(-1) ?? answer).trim()
    .replace(/[−–—]/g, "-").replace(/\s+/g, "")
    .replace(/[×·*]/g, "").toLowerCase()
    .replace(new RegExp(`(\\d*(?:\\.\\d+)?)${variable}/(\\d+(?:\\.\\d+)?)`, "g"), (_, numerator: string, denominator: string) => `${numerator || "1"}/${denominator}${variable}`);
  const terms = expression.match(/[+-]?[^+-]+/g) ?? [];
  if (!terms.length) return null;
  let slope = 0;
  let intercept = 0;
  for (const term of terms) {
    const match = term.match(new RegExp(`^([+-]?)(\\d*(?:\\.\\d+)?(?:/\\d+(?:\\.\\d+)?)?)?(${variable})?$`));
    if (!match || (!match[2] && !match[3])) return null;
    const coefficient = match[2] ? parseNumericToken(match[2]) : 1;
    if (coefficient === null) return null;
    const value = (match[1] === "-" ? -1 : 1) * coefficient;
    if (match[3]) slope += value;
    else intercept += value;
  }
  return { slope, intercept };
}

function parseLogQuotient(answer: string) {
  const expression = (answer.split("=").at(-1) ?? answer).trim().replace(/\s+/g, "").toLowerCase();
  const direct = expression.match(/^ln\((\d+)\)\/(\d+)$/)
    ?? expression.match(/^ln(\d+)\/(\d+)$/)
    ?? expression.match(/^\(ln\((\d+)\)\)\/(\d+)$/);
  if (direct) return { argument: Number(direct[1]), denominator: Number(direct[2]) };
  const multiplied = expression.match(/^1\/(\d+)ln\((\d+)\)$/);
  return multiplied ? { argument: Number(multiplied[2]), denominator: Number(multiplied[1]) } : null;
}

function parseRadicalPolynomial(answer: string) {
  const expression = (answer.split("=").at(-1) ?? answer).trim()
    .replace(/[−–—]/g, "-")
    .replace(/\s+/g, "")
    .replace(/x\^2/g, "x²")
    .replace(/(?:sqrt\(x\)|√\(x\))/gi, "√x")
    .replace(/[×·*]/g, "");
  if (!expression || /[^0-9.+\-x²√]/.test(expression)) return null;
  const terms = expression.replace(/^-/, "0-").split(/(?=[+-])/).filter(Boolean);
  const result = { quadratic: 0, linear: 0, radical: 0, constant: 0 };
  for (const term of terms) {
    const match = term.match(/^([+-]?)(\d*(?:\.\d+)?)?(x²|x|√x)?$/);
    if (!match || (!match[2] && !match[3])) return null;
    const coefficient = match[2] ? Number(match[2]) : 1;
    const signed = (match[1] === "-" ? -1 : 1) * coefficient;
    if (!Number.isFinite(signed)) return null;
    const key = match[3] === "x²" ? "quadratic" : match[3] === "x" ? "linear" : match[3] === "√x" ? "radical" : "constant";
    result[key] += signed;
  }
  return result;
}

export function checkAnswer(answer: string, config: AnswerCheck): AnswerCheckOutcome {
  const tolerance = ("tolerance" in config ? config.tolerance : undefined) ?? 1e-9;

  if (config.kind === "line-equation-pair") {
    const parts = answer.split(/[;\n]+/).map((part) => part.trim()).filter(Boolean);
    if (parts.length !== 2) return "unreadable";
    const outcomes = parts.map((part) => config.constants.map((constant) => checkAnswer(part, {
      kind: "line-equation", xCoefficient: config.xCoefficient,
      yCoefficient: config.yCoefficient, constant, placeholder: "", hint: "",
    })));
    if (outcomes.some((options) => options.every((outcome) => outcome === "unreadable"))) return "unreadable";
    return (outcomes[0][0] === "correct" && outcomes[1][1] === "correct")
      || (outcomes[0][1] === "correct" && outcomes[1][0] === "correct") ? "correct" : "incorrect";
  }

  if (config.kind === "numeric") {
    const actual = parseSingleValue(answer);
    if (actual === null) return "unreadable";
    return valuesMatch(actual, config.expected, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "numeric-alternatives") {
    const actual = parseSingleValue(answer);
    if (actual === null) return "unreadable";
    return config.expected.some((expected) => valuesMatch(actual, expected, tolerance)) ? "correct" : "incorrect";
  }

  if (config.kind === "percentage") {
    const value = (answer.split("=").at(-1) ?? answer).trim().replace(/%$/, "");
    const actual = parseNumericToken(value);
    if (actual === null) return "unreadable";
    return valuesMatch(actual, config.expected, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "complex-pair-set") {
    const parts = answer.split(/[;\n]|\b(?:and|or)\b/i).map((part) => part.trim()).filter(Boolean);
    if (parts.length !== config.expected.length) return "unreadable";
    const actual = parts.map(parseComplexPair);
    if (actual.some((value) => value === null)) return "unreadable";
    const remaining = [...config.expected];
    for (const value of actual) {
      const index = remaining.findIndex((expected) => valuesMatch(value!.real, expected.real, tolerance) && valuesMatch(value!.imaginary, expected.imaginary, tolerance));
      if (index < 0) return "incorrect";
      remaining.splice(index, 1);
    }
    return "correct";
  }

  if (config.kind === "pi-multiple") {
    const value = (answer.split("=").at(-1) ?? answer).trim().replace(/[−–—]/g, "-").replace(/[×*\s]/g, "");
    const match = value.match(/^([+-]?(?:\d+(?:\.\d+)?(?:\/\d+)?|))?(?:π|pi)(?:\/([+-]?\d+))?$/i);
    if (!match) return "unreadable";
    const coefficient = match[1] && match[1] !== "+" && match[1] !== "-" ? parseNumericToken(match[1]) : match[1] === "-" ? -1 : 1;
    const denominator = match[2] === undefined ? 1 : Number(match[2]);
    if (coefficient === null || denominator === 0) return "unreadable";
    return valuesMatch(coefficient / denominator, config.expected, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "scientific-notation") {
    const value = normalisePowers((answer.split("=").at(-1) ?? answer).trim())
      .replace(/\s+/g, "").replace(/[·×*]/g, "x");
    const match = value.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(?:x10\^|e)([+-]?\d+)$/i);
    if (!match) return "unreadable";
    const coefficient = Number(match[1]);
    const exponent = Number(match[2]);
    if (coefficient < 1 || coefficient >= 10 || !Number.isSafeInteger(exponent)) return "unreadable";
    return config.expected.some((expected) => expected.exponent === exponent && valuesMatch(coefficient, expected.coefficient, tolerance)) ? "correct" : "incorrect";
  }

  if (config.kind === "exp-power") {
    const value = normalisePowers((answer.split("=").at(-1) ?? answer).trim()).replace(/\s+/g, "").toLowerCase();
    const match = value.match(/^e\^([+-]?\d+(?:\.\d+)?)$/) ?? value.match(/^exp\(([+-]?\d+(?:\.\d+)?)\)$/);
    if (!match) return "unreadable";
    return valuesMatch(Number(match[1]), config.exponent, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "ordered-values") {
    const parts = answer.split(/[,;]+/).map((part) => part.trim());
    if (parts.length !== config.expected.length) return "unreadable";
    const actual = parts.map(parseNumericToken);
    if (actual.some((value) => value === null)) return "unreadable";
    return actual.every((value, index) => valuesMatch(value as number, config.expected[index], tolerance)) ? "correct" : "incorrect";
  }

  if (config.kind === "coordinate-set") {
    const pairPattern = /\(\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)/g;
    const pairs = [...answer.matchAll(pairPattern)].map((match) => [Number(match[1]), Number(match[2])] as [number, number]);
    const leftover = answer.replace(pairPattern, "").replace(/[\s,;{}]/g, "");
    if (leftover || pairs.length !== config.expected.length) return "unreadable";
    const actual = pairs.map(([x, y]) => `${x},${y}`).sort();
    const expected = config.expected.map(([x, y]) => `${x},${y}`).sort();
    return actual.every((pair, index) => pair === expected[index]) ? "correct" : "incorrect";
  }

  if (config.kind === "linear-expression") {
    const actual = parseLinearSequence(answer, config.variable);
    if (!actual) return "unreadable";
    return valuesMatch(actual.slope, config.slope, tolerance) && valuesMatch(actual.intercept, config.intercept, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "fraction") {
    const actual = parsePositiveFraction(answer);
    if (actual === null) return "unreadable";
    return valuesMatch(actual, config.expected, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "simplest-fraction") {
    const value = (answer.split("=").at(-1) ?? answer).trim();
    const match = value.match(/^(\d+)\s*\/\s*(\d+)$/);
    if (!match || Number(match[2]) === 0) return "unreadable";
    const numerator = Number(match[1]);
    const denominator = Number(match[2]);
    if (!Number.isSafeInteger(numerator) || !Number.isSafeInteger(denominator)) return "unreadable";
    return numerator === config.numerator && denominator === config.denominator ? "correct" : "incorrect";
  }

  if (config.kind === "circle-centre-radius") {
    const actual = parseCircleCentreRadius(answer);
    if (!actual) return "unreadable";
    return actual.x === config.centreX && actual.y === config.centreY
      && valuesMatch(actual.radius, config.radius, 0.0005) ? "correct" : "incorrect";
  }

  if (config.kind === "circle-equation") {
    const value = normalisePowers(answer.trim())
      .replace(/[−–—]/g, "-").replace(/\s+/g, "");
    const match = value.match(/^\(x([+-])(\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?)\)\^2\+\(y([+-])(\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?)\)\^2=([+-]?\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?)$/i);
    if (!match) return "unreadable";
    const x = parseNumericToken(match[2]);
    const y = parseNumericToken(match[4]);
    const radiusSquared = parseNumericToken(match[5]);
    if (x === null || y === null || radiusSquared === null) return "unreadable";
    const centreX = match[1] === "-" ? x : -x;
    const centreY = match[3] === "-" ? y : -y;
    return valuesMatch(centreX, config.centreX, tolerance)
      && valuesMatch(centreY, config.centreY, tolerance)
      && valuesMatch(radiusSquared, config.radiusSquared, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "constant-radical") {
    const value = (answer.split("=").at(-1) ?? answer).trim()
      .replace(/[−–—]/g, "-").replace(/\s+/g, "");
    const match = value.match(/^([+-]?\d+(?:\.\d+)?)([+-])(?:(\d+(?:\.\d+)?)\*?)?(?:√(\d+)|sqrt\((\d+)\))$/i);
    if (!match) return "unreadable";
    const constant = Number(match[1]);
    const radical = (match[2] === "-" ? -1 : 1) * Number(match[3] ?? 1) * Math.sqrt(Number(match[4] ?? match[5]));
    return valuesMatch(constant, config.constant, tolerance)
      && valuesMatch(radical, config.radicalValue, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "power-chain") {
    const actual = parsePowerChain(answer);
    if (actual === null || !Number.isFinite(actual)) return "unreadable";
    return valuesMatch(actual, config.expectedCoefficient, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "log-quotient") {
    const actual = parseLogQuotient(answer);
    if (!actual || !Number.isSafeInteger(actual.argument) || !Number.isSafeInteger(actual.denominator)
      || actual.argument <= 0 || actual.denominator <= 0) return "unreadable";
    return actual.argument === config.argument && actual.denominator === config.denominator
      ? "correct" : "incorrect";
  }

  if (config.kind === "complex-pair") {
    const actual = parseComplexPair(answer);
    if (!actual) return "unreadable";
    return valuesMatch(actual.real, config.real, tolerance)
      && valuesMatch(actual.imaginary, config.imaginary, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "vertex-form") {
    const actual = parseVertexForm(answer);
    if (!actual) return "unreadable";
    return valuesMatch(actual.a, config.a, tolerance)
      && valuesMatch(actual.h, config.h, tolerance)
      && valuesMatch(actual.k, config.k, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "constant-log") {
    const actual = parseConstantLog(answer);
    if (!actual) return "unreadable";
    return valuesMatch(actual.constant, config.constant, tolerance)
      && valuesMatch(actual.logCoefficient, config.logCoefficient, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "polynomial-powers") {
    const actual = parsePolynomialPowers(answer, config.variable);
    if (!actual) return "unreadable";
    const expected = Object.entries(config.coefficients);
    return Object.keys(actual).length === expected.length
      && expected.every(([power, coefficient]) => valuesMatch(actual[Number(power)] ?? NaN, coefficient, tolerance))
      ? "correct" : "incorrect";
  }

  if (config.kind === "quadratic-expression") {
    const actual = parseRadicalPolynomial(answer);
    if (!actual) return "unreadable";
    return valuesMatch(actual.quadratic, config.quadratic, tolerance)
      && valuesMatch(actual.linear, config.linear, tolerance)
      && valuesMatch(actual.constant, config.constant, tolerance)
      && valuesMatch(actual.radical, 0, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "linear-sequence") {
    const actual = parseLinearSequence(answer);
    if (!actual) return "unreadable";
    return valuesMatch(actual.slope, config.slope, tolerance)
      && valuesMatch(actual.intercept, config.intercept, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "interval") {
    const actual = parseInterval(answer);
    if (!actual) return "unreadable";
    return valuesMatch(actual.minimum, config.minimum, tolerance)
      && valuesMatch(actual.maximum, config.maximum, tolerance)
      && actual.includeMinimum === (config.includeMinimum ?? true)
      && actual.includeMaximum === (config.includeMaximum ?? true) ? "correct" : "incorrect";
  }

  if (config.kind === "linear-cos") {
    const actual = parseLinearCos(answer, config.frequency);
    if (!actual) return "unreadable";
    return valuesMatch(actual.linear, config.linear, tolerance)
      && valuesMatch(actual.cosine, config.cosine, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "line-equation") {
    const actual = parseLineEquation(answer);
    if (!actual) return "unreadable";
    const factor = actual.x / config.xCoefficient;
    if (!Number.isFinite(factor) || Math.abs(factor) <= tolerance) return "incorrect";
    return valuesMatch(actual.y, factor * config.yCoefficient, tolerance)
      && valuesMatch(actual.constant, factor * config.constant, tolerance) ? "correct" : "incorrect";
  }

  if (config.kind === "radical-polynomial") {
    const actual = parseRadicalPolynomial(answer);
    if (!actual) return "unreadable";
    return valuesMatch(actual.quadratic, config.quadratic, tolerance)
      && valuesMatch(actual.linear, config.linear, tolerance)
      && valuesMatch(actual.radical, config.radical, tolerance)
      && valuesMatch(actual.constant, 0, tolerance) ? "correct" : "incorrect";
  }

  const actualValues = parseNumberSet(answer);
  if (!actualValues || actualValues.length !== config.expected.length) return "unreadable";

  const actual = [...actualValues].sort((a, b) => a - b);
  const expected = [...config.expected].sort((a, b) => a - b);
  return actual.every((value, index) => valuesMatch(value, expected[index], tolerance))
    ? "correct"
    : "incorrect";
}
