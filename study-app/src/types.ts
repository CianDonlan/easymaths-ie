export type Level = "Higher" | "Ordinary";
export type PaperNumber = 1 | 2;
export type AnswerCheckOutcome = "correct" | "incorrect" | "unreadable";

export type AnswerCheck =
  | {
      kind: "numeric";
      expected: number;
      tolerance?: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "numeric-alternatives";
      expected: number[];
      tolerance?: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "percentage";
      expected: number;
      tolerance?: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "scientific-notation";
      expected: { coefficient: number; exponent: number }[];
      placeholder: string;
      hint: string;
    }
  | {
      kind: "exp-power";
      exponent: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "number-set";
      expected: number[];
      tolerance?: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "interval";
      minimum: number;
      maximum: number;
      includeMinimum?: boolean;
      includeMaximum?: boolean;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "linear-cos";
      linear: number;
      cosine: number;
      frequency: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "line-equation";
      xCoefficient: number;
      yCoefficient: number;
      constant: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "line-equation-pair";
      xCoefficient: number;
      yCoefficient: number;
      constants: [number, number];
      placeholder: string;
      hint: string;
    }
  | {
      kind: "fraction";
      expected: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "simplest-fraction";
      numerator: number;
      denominator: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "circle-centre-radius";
      centreX: number;
      centreY: number;
      radius: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "circle-equation";
      centreX: number;
      centreY: number;
      radiusSquared: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "constant-radical";
      constant: number;
      radicalValue: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "power-chain";
      expectedCoefficient: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "log-quotient";
      argument: number;
      denominator: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "complex-pair";
      real: number;
      imaginary: number;
      tolerance?: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "complex-pair-set";
      expected: { real: number; imaginary: number }[];
      placeholder: string;
      hint: string;
    }
  | {
      kind: "pi-multiple";
      expected: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "vertex-form";
      a: number;
      h: number;
      k: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "constant-log";
      constant: number;
      logCoefficient: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "polynomial-powers";
      variable: "p";
      coefficients: Record<number, number>;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "quadratic-expression";
      quadratic: number;
      linear: number;
      constant: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "linear-sequence";
      slope: number;
      intercept: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "linear-expression";
      variable: "c" | "x";
      slope: number;
      intercept: number;
      placeholder: string;
      hint: string;
    }
  | {
      kind: "ordered-values";
      expected: number[];
      placeholder: string;
      hint: string;
    }
  | {
      kind: "coordinate-set";
      expected: [number, number][];
      placeholder: string;
      hint: string;
    }
  | {
      kind: "radical-polynomial";
      quadratic: number;
      linear: number;
      radical: number;
      placeholder: string;
      hint: string;
    };

export interface AnswerAttempt {
  answer: string;
  outcome: AnswerCheckOutcome;
}

export interface AnswerAttemptState {
  draft: string;
  outcome?: AnswerCheckOutcome;
  history: AnswerAttempt[];
  totalAttempts: number;
}

export interface StudyQuestion {
  id: string;
  number: string;
  prompt: string;
  marks: number | null;
  topic: string;
  answer: string;
  solution: string;
  expression?: string;
  illustration?: "g-graph" | "web-table" | "web-orbitals" | "kayak-route" | "kayak-graphs" | "speed-table" | "speed-plot" | "dot-pattern" | "inverse-graph" | "survey-venn" | "ages-row" | "age-frequencies" | "congruent-triangles" | "enlargement" | "enlargement-shaded" | "sine-graph" | "cosine-triangle" | "submarine-scale" | "submarine-algebra" | "overlapping-circles" | "pyramid-roof" | "pyramid-net" | "flagpole-angle" | "tower-angles" | "diabetes-tree" | "score-bell" | "country-samples" | "mark-proportions" | "argand-2024" | "tangent-graph-2024" | "tshirt-graph-2024" | "scarf-choices-2024" | "sphere-cap-2024" | "plant-logo-2024" | "swim-stem-leaf-2024" | "swim-retest-2024" | "prize-table-2024" | "centroid-pad-2024" | "parallel-transversals-2024" | "nested-circles-2024" | "circle-locus-2024" | "lattice-points-2024" | "hotel-normal-2024" | "hotel-booking-tree-2024" | "open-cylinder-net-2024" | "cylinder-in-sphere-2024" | "double-cone-sphere-2024" | "adventure-course-2024" | "wiper-original-2024" | "wiper-adjusted-2024" | "graph-down-2023" | "graph-left-2023" | "argand-2023" | "argand-pad-2023" | "function-maps-2023" | "between-curves-2023" | "curvature-choices-2023" | "ticket-prices-2023" | "factor-pairs-table-2023" | "factor-points-2023" | "factor-curve-2023" | "tangent-triangle-2023" | "rectangle-cover-2023" | "rectangle-cover-pad-2023" | "pyramid-section-2023" | "spinner-2023" | "circle-points-2023" | "cube-trials-2023" | "cuboid-2023" | "rectangle-angles-2023" | "road-gradient-2023" | "hill-height-2023" | "breathing-2023-graph" | "word-score-normal-2023" | "word-game-tree-pad-2023" | "word-game-tree-complete-2023" | "square-hex-tiles-2023" | "arrowhead-tile-2023" | "unit-circle-pair-2023" | "basin-2023" | "integral-regions-2022" | "complex-circle-2022" | "derivative-graph-2022" | "heart-rate-2022" | "ferris-table-2022" | "ferris-axes-2022" | "p2-2022-university" | "p2-2022-intercept" | "p2-2022-axis-circles" | "p2-2022-isosceles" | "p2-2022-circumcentre" | "p2-2022-cyclic-angles" | "p2-2022-obtuse-circle" | "p2-2022-cone-net" | "p2-2022-cut-sphere" | "p2-2022-square-logo" | "p2-2022-cars-incomplete" | "p2-2022-cars-complete" | "p2-2022-quadratic-scatter" | "p2-2022-fields" | "p2-2022-airplane" | "p2-2022-airplane-symmetric" | "p2-2022-marathons" | "p1-2021-cuboid" | "p1-2021-tangent" | "p1-2021-derivative" | "p1-2021-pendulum" | "p1-2021-pendulum-table" | "p1-2021-coaster-table" | "p1-2021-trunks" | "p2-2021-section-triangle" | "p2-2021-chord" | "p2-2021-double-cone" | "p2-2021-similar-triangles" | "p2-2021-parallel-proof" | "p2-2021-triathlon" | "p2-2021-tower" | "p2-2021-flight" | "p2-2021-voltage-axes" | "p1-2020-cubic-line" | "p1-2020-log-area" | "p1-2020-triangular-table" | "p1-2020-rectangle-circle" | "p1-2020-shadow" | "p2-2020-line-angle" | "p2-2020-tangent-circle" | "p2-2020-inclined-pole" | "p2-2020-nested-circles" | "p2-2020-shaded-sector" | "p2-2020-spinner" | "p2-2020-car-table" | "p2-2020-cup" | "p2-2020-cup-fill" | "p2-2020-cup-new-fill" | "p2-2020-cup-net" | "p2-2020-normal-95" | "p2-2020-ordered-table" | "p2-2020-ships" | "p1-2019-exponential" | "p1-2019-cubic" | "p1-2019-cantor" | "p1-2019-window" | "p1-2019-window-table" | "p1-2019-window-axes" | "p2-2019-intercepts" | "p2-2019-tangent-circle" | "p2-2019-cube" | "p2-2019-orthocentre" | "p2-2019-chord" | "p2-2019-venn" | "p2-2019-trough" | "p2-2019-timer" | "p2-2019-timer-cone" | "p2-2019-helipad" | "p2-2019-pole" | "p1-2018-sundaram" | "p1-2018-cubic" | "p1-2018-typing-table" | "p1-2018-typing-axes" | "p1-2018-bell" | "p1-2018-sierpinski" | "p1-2018-perimeter-table" | "p2-2018-normal" | "p2-2018-parallel-lines" | "p2-2018-touching-circles" | "p2-2018-parallel-proof" | "p2-2018-right-triangle" | "p2-2018-railing" | "p2-2018-rod" | "p2-2018-statements" | "p2-2018-crank-angle" | "p2-2018-crank" | "p2-2018-crank-table" | "p2-2018-crank-axes" | "p2-2018-crank-positions" | "p2-2018-crank-new" | "p1-2017-decay" | "p1-2017-squares" | "p1-2017-exponential" | "p1-2017-loan-table" | "p1-2017-tide" | "p2-2017-fuel-table" | "p2-2017-fuel-axes" | "p2-2017-centroid" | "p2-2017-rectangle" | "p2-2017-horizon" | "p2-2017-latitude" | "p2-2017-cones" | "p2-2017-water" | "p2-2017-rain-tree" | "p2-2017-river" | "p2-2017-fallen-tree";
  selfCheck?: { placeholder: string; checks: string[] };
  answerCheck?: AnswerCheck;
}

export interface StudyPaper {
  id: string;
  year: number;
  level: Level;
  paperNumber: PaperNumber;
  title: string;
  description: string;
  estimatedMinutes: number;
  questions: StudyQuestion[];
  kind?: "real";
}
