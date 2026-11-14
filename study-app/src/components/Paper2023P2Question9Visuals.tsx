export function SquareHexTiles2023Diagram() {
  const vertices = Array.from({ length: 6 }, (_, index) => {
    const angle = Math.PI * index / 3;
    return [358 + 82 * Math.cos(angle), 123 + 82 * Math.sin(angle)];
  });
  return <figure className="geometry-visual square-hex-tiles-2023">
    <svg viewBox="0 0 500 245" role="img" aria-labelledby="square-hex-2023-title square-hex-2023-desc">
      <title id="square-hex-2023-title">Square and regular hexagon tiles of equal area</title>
      <desc id="square-hex-2023-desc">A square and a regular hexagon each have area 140 square centimetres. The hexagon is divided into six congruent equilateral triangles, each with side x and central angle 60 degrees.</desc>
      <rect width="500" height="245" fill="white" />
      <rect x="65" y="41" width="155" height="155" fill="#e8f2e9" stroke="#263c34" strokeWidth="2" />
      <text x="142" y="116" textAnchor="middle">140 cm²</text>
      <text x="142" y="223" textAnchor="middle">Square</text>
      <polygon points={vertices.map(([x, y]) => `${x},${y}`).join(" ")} fill="#f4efd9" stroke="#263c34" strokeWidth="2" />
      {vertices.map(([x, y], index) => <line key={index} x1="358" y1="123" x2={x} y2={y} stroke="#9b8f65" strokeWidth="1.2" />)}
      <text x="358" y="119" textAnchor="middle">140 cm²</text>
      <text x="358" y="226" textAnchor="middle">Regular hexagon</text>
      <text x="430" y="83">x</text><text x="390" y="145">60°</text>
    </svg>
    <figcaption>Each tile has area 140 cm². Split the regular hexagon into six equal equilateral triangles.</figcaption>
  </figure>;
}

export function ArrowheadTile2023Diagram() {
  return <figure className="geometry-visual arrowhead-tile-2023">
    <svg viewBox="0 0 500 330" role="img" aria-labelledby="arrowhead-2023-title arrowhead-2023-desc">
      <title id="arrowhead-2023-title">Symmetric arrowhead and quadrilateral</title>
      <desc id="arrowhead-2023-desc">A, E and C lie on a horizontal symmetry line, with D above and B below. AD is eight centimetres, AE six centimetres and ED four centimetres. Alpha is angle DAE. Angle ADC and angle ABC are right angles in part two.</desc>
      <rect width="500" height="330" fill="white" />
      <path d="M 66 166 L 370 29 L 430 166 L 370 303 Z" fill="#edf5ed" stroke="#263c34" strokeWidth="2" />
      <path d="M 66 166 L 286 166 L 370 29 M 286 166 L 370 303 M 66 166 L 370 303" fill="none" stroke="#263c34" strokeWidth="2" />
      <line x1="66" y1="166" x2="445" y2="166" stroke="#8b988b" strokeDasharray="5 4" />
      <text x="45" y="171">A</text><text x="278" y="186">E</text><text x="437" y="170">C</text><text x="374" y="26">D</text><text x="374" y="317">B</text>
      <text x="166" y="87">8 cm</text><text x="180" y="186">6 cm</text><text x="314" y="105">4 cm</text><text x="115" y="154">α</text>
    </svg>
    <figcaption>The shapes are symmetric about AC. Given AD = 8 cm, AE = 6 cm and ED = 4 cm; for part (ii), angles ADC and ABC are right angles. Sketch not to scale.</figcaption>
  </figure>;
}

export function UnitCirclePair2023Diagram() {
  return <figure className="geometry-visual unit-circle-pair-2023">
    <svg viewBox="0 0 500 365" role="img" aria-labelledby="unit-circle-pair-2023-title unit-circle-pair-2023-desc">
      <title id="unit-circle-pair-2023-title">Two circles meeting at P and Q</title>
      <desc id="unit-circle-pair-2023-desc">The unit circle c is centred at O, the origin. P is at its leftmost point on the x-axis, and Q is in the second quadrant. The smaller circle s passes through P and Q. Angle QOP is 45 degrees.</desc>
      <rect width="500" height="365" fill="white" />
      <line x1="34" y1="190" x2="477" y2="190" stroke="#263c34" strokeWidth="1.5" />
      <line x1="300" y1="340" x2="300" y2="23" stroke="#263c34" strokeWidth="1.5" />
      <circle cx="300" cy="190" r="140" fill="none" stroke="#263c34" strokeWidth="2" />
      <circle cx="160" cy="132" r="58" fill="none" stroke="#207e4c" strokeWidth="2" strokeDasharray="5 4" />
      <path d="M 300 190 L 160 190 M 300 190 L 201 91" fill="none" stroke="#8b988b" strokeWidth="1.5" />
      <circle cx="160" cy="190" r="4" fill="#263c34" /><circle cx="201" cy="91" r="4" fill="#263c34" /><circle cx="300" cy="190" r="4" fill="#263c34" />
      <text x="138" y="208">P</text><text x="207" y="85">Q</text><text x="307" y="210">O</text>
      <text x="449" y="194">x</text><text x="306" y="31">y</text><text x="346" y="72">c: x² + y² = 1</text><text x="101" y="66">s</text><text x="254" y="169">45°</text>
    </svg>
    <figcaption>P and Q lie on the unit circle c and circle s. P is on the negative x-axis and ∠QOP = 45°. Diagram is schematic; the tangent lines in part (ii) are not shown.</figcaption>
  </figure>;
}
