function curvePath(fn: (x: number) => number, from: number, to: number, x: (n: number) => number, y: (n: number) => number) {
  return Array.from({ length: 101 }, (_, i) => {
    const t = from + (to - from) * i / 100;
    return `${i === 0 ? "M" : "L"} ${x(t)} ${y(fn(t))}`;
  }).join(" ");
}

export function IntegralRegions2022Diagram() {
  const x = (n: number) => 95 + n * 43;
  const y = (n: number) => 280 - n * 0.57;
  const f = (n: number) => -12 * n * n + 60 * n + 225;
  return <figure className="geometry-visual paper2022-visual">
    <svg viewBox="0 0 470 330" role="img" aria-labelledby="regions-2022-title regions-2022-desc">
      <title id="regions-2022-title">Regions K, L and N under a quadratic graph</title>
      <desc id="regions-2022-desc">The graph is above the x-axis from x zero to six. Region K is between zero and two, L between two and four, and N between four and six. Vertical lines bound each region.</desc>
      <rect width="470" height="330" fill="white" />
      {[0, 2, 4].map((a, i) => <g key={a}>
        <path d={`${curvePath(f, a, a + 2, x, y)} L ${x(a + 2)} 280 L ${x(a)} 280 Z`} fill={["#e0eeeb", "#d0e2de", "#e0eeeb"][i]} />
        <text x={x(a + 1)} y="240" textAnchor="middle">{["K", "L", "N"][i]}</text>
      </g>)}
      <g stroke="#253b38" strokeWidth="1.5" fill="none">
        <path d="M 30 280 H 433 M 95 306 V 35" />
        {[2, 4, 6].map((a) => <path key={a} d={`M ${x(a)} 280 V ${y(f(a))}`} />)}
        <path d={curvePath(f, -1.4, 7.1, x, y)} strokeWidth="2.5" />
      </g>
      {[0, 2, 4, 6].map((a) => <text key={a} x={x(a) - (a === 0 ? 12 : 0)} y="302" textAnchor="middle">{a}</text>)}
      <text x="435" y="273">x</text><text x="105" y="40">y</text>
      <text x="310" y="105">y = f(x)</text>
    </svg>
    <figcaption>K spans 0 ≤ x ≤ 2, L spans 2 ≤ x ≤ 4, and N spans 4 ≤ x ≤ 6. The graph is schematic.</figcaption>
  </figure>;
}

export function ComplexCircle2022Diagram() {
  const x = (n: number) => 160 + n * 28;
  const y = (n: number) => 300 - n * 28;
  return <figure className="geometry-visual paper2022-visual">
    <svg viewBox="0 0 450 350" role="img" aria-labelledby="circle-2022-title circle-2022-desc">
      <title id="circle-2022-title">Circle with diameter from z to iz</title>
      <desc id="circle-2022-desc">On an Argand diagram, z is six plus two i and iz is minus two plus six i. The circle passes through the origin and both points. The segment from z to iz is a diameter. The triangle joins these three points.</desc>
      <rect width="450" height="350" fill="white" />
      <g stroke="#253b38" fill="none" strokeWidth="1.5">
        <path d="M 32 300 H 420 M 160 330 V 30" />
        <circle cx={x(2)} cy={y(4)} r={Math.sqrt(20) * 28} strokeWidth="2" />
        <path d={`M ${x(0)} ${y(0)} L ${x(-2)} ${y(6)} L ${x(6)} ${y(2)} Z`} />
      </g>
      {[[0, 0], [-2, 6], [6, 2]].map(([a, b]) => <circle key={a} cx={x(a)} cy={y(b)} r="4" fill="#245c50" />)}
      <text x={x(-2) - 24} y={y(6) - 8}>iz</text><text x={x(6) + 10} y={y(2) + 3}>z</text>
      <text x="143" y="321">0</text><text x="395" y="322">Re</text><text x="170" y="34">Im</text>
      <text x="320" y="74">c</text>
    </svg>
    <figcaption>The circle passes through 0, z and iz. The line joining z to iz is a diameter.</figcaption>
  </figure>;
}

export function DerivativeGraph2022Diagram() {
  const x = (n: number) => 75 + n * 76;
  const pY = (n: number) => 130 - n * 48;
  const dY = (n: number) => 355 - n * 32;
  // An additive constant positions the supplied cubic without changing its derivative.
  const p = (n: number) => -(n ** 3) / 3 + 2 * n * n - 3 * n + 1;
  return <figure className="geometry-visual paper2022-visual">
    <svg viewBox="0 0 450 490" role="img" aria-labelledby="derivative-2022-title derivative-2022-desc">
      <title id="derivative-2022-title">Cubic graph and blank derivative axes</title>
      <desc id="derivative-2022-desc">The supplied cubic decreases to a local minimum at x one, increases to a local maximum at x three, then decreases to x four. Below it are blank axes for the derivative, with x from zero to four and y from minus three to one. Draw the derivative on paper.</desc>
      <rect width="450" height="490" fill="white" />
      <text x="225" y="26" textAnchor="middle">Supplied graph y = p(x)</text>
      <text x="225" y="284" textAnchor="middle">Draw y = p′(x) on paper</text>
      <g stroke="#dce4e0" strokeWidth="1">
        {[0, 1, 2, 3, 4].map((a) => <g key={a}><path d={`M ${x(a)} 45 V 228 M ${x(a)} 312 V 451`} /></g>)}
        {[-3, -2, -1, 0, 1].map((b) => <path key={b} d={`M 75 ${dY(b)} H 379`} />)}
      </g>
      <g stroke="#253b38" strokeWidth="1.5" fill="none">
        <path d="M 75 235 V 43 M 58 130 H 399 M 75 458 V 307 M 58 355 H 399" />
        <path d={curvePath(p, 0, 4, x, pY)} strokeWidth="2.5" />
      </g>
      {[0, 1, 2, 3, 4].map((a) => <g key={a}>
        <text x={x(a) - (a === 0 ? 13 : 0)} y="151" textAnchor="middle">{a}</text>
        <text x={x(a) - (a === 0 ? 13 : 0)} y="375" textAnchor="middle">{a}</text>
      </g>)}
      {[-3, -2, -1, 1].map((b) => <text key={b} x="62" y={dY(b) + 5} textAnchor="end">{b}</text>)}
      <text x="404" y="125">x</text><text x="404" y="350">x</text>
      <text x="60" y="43">y</text><text x="60" y="307">y</text>
    </svg>
    <figcaption>Use the turning points of p and the given values of p′. This drawing task uses guided self-checking.</figcaption>
  </figure>;
}

export function HeartRate2022Graph() {
  const x = (n: number) => 65 + n * 43;
  const y = (n: number) => 275 - n * 1.1;
  return <figure className="geometry-visual paper2022-visual">
    <svg viewBox="0 0 460 325" role="img" aria-labelledby="heart-2022-title heart-2022-desc">
      <title id="heart-2022-title">Hannah’s heart-rate during the first eight minutes</title>
      <desc id="heart-2022-desc">A smooth cubic starts at 70 BPM, rises to a local maximum, falls to a local minimum, and rises again before minute eight. Use calculus to find the extreme values including the interval endpoints.</desc>
      <rect width="460" height="325" fill="white" />
      <g stroke="#dce4e0">{[40, 80, 120, 160, 200].map((a) => <path key={a} d={`M 65 ${y(a)} H 409`} />)}</g>
      <path d="M 65 290 V 30 M 45 275 H 425" stroke="#253b38" fill="none" />
      <path d={curvePath((n) => 2 * n ** 3 - 28.5 * n ** 2 + 105 * n + 70, 0, 8, x, y)} stroke="#245c50" strokeWidth="2.5" fill="none" />
      <text x="48" y="295">0</text><text x="404" y="295">8</text>
      <text x="225" y="318" textAnchor="middle">Time x (minutes)</text>
      <text x="70" y="24">Heart-rate (BPM)</text><text x="180" y="57">y = h(x)</text>
    </svg>
    <figcaption>Supplied heart-rate graph on 0 ≤ x ≤ 8. Compare stationary points and endpoints.</figcaption>
  </figure>;
}

export function FerrisWheel2022Diagram({ table = false }: { table?: boolean }) {
  return <figure className="geometry-visual paper2022-visual">
    <svg viewBox="0 0 450 330" role="img" aria-labelledby="ferris-2022-title ferris-2022-desc">
      <title id="ferris-2022-title">Ferris wheel before it starts turning</title>
      <desc id="ferris-2022-desc">The wheel has diameter 120 metres. Point A starts at the bottom of its circumference, 12 metres above ground. It makes ten complete rotations in one hour.</desc>
      <rect width="450" height="330" fill="white" />
      <g stroke="#526f67" fill="none" strokeWidth="1.5">
        <circle cx="210" cy="139" r="110" />
        {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M 210 139 L ${210 + 110 * Math.cos(i * Math.PI / 6)} ${139 + 110 * Math.sin(i * Math.PI / 6)}`} />)}
        <path d="M 210 139 L 153 285 H 267 Z M 90 285 H 345" />
        <path d="M 339 29 V 249 M 332 29 H 346 M 332 249 H 346" />
      </g>
      <path d="M 210 253 V 282" stroke="#253b38" strokeDasharray="3 3" />
      <circle cx="210" cy="249" r="4" fill="#245c50" />
      <text x="221" y="246">A</text><text x="220" y="273">12 m</text>
      <text x="350" y="145">120 m</text>
      <text x="225" y="316" textAnchor="middle">h(t) = 72 − 60cos(πt/3)</text>
    </svg>
    {table && <div style={{ overflowX: "auto", maxWidth: "100%" }}>
      <table style={{ width: "100%", minWidth: 400, textAlign: "center" }}>
        <caption>Complete the heights in metres (h(1) is given)</caption>
        <thead><tr><th scope="col">t (min)</th>{Array.from({ length: 9 }, (_, i) => <th key={i} scope="col">{i}</th>)}</tr></thead>
        <tbody><tr><th scope="row">h(t)</th>{Array.from({ length: 9 }, (_, i) => <td key={i}>{i === 1 ? "42" : "?"}</td>)}</tr></tbody>
      </table>
    </div>}
    <figcaption>Diameter 120 m; lowest point 12 m above ground; 10 rotations per hour. Angles in the model are in radians.</figcaption>
  </figure>;
}

export function FerrisAxes2022Diagram() {
  const x = (n: number) => 60 + n * 44;
  const y = (n: number) => 280 - n * 1.65;
  return <figure className="geometry-visual paper2022-visual">
    <svg viewBox="0 0 470 340" role="img" aria-labelledby="ferris-axes-2022-title ferris-axes-2022-desc">
      <title id="ferris-axes-2022-title">Blank axes for the Ferris wheel height graph</title>
      <desc id="ferris-axes-2022-desc">The horizontal axis runs from zero to eight minutes and the vertical axis from zero to 140 metres. Plot the table values and draw a smooth curve on paper.</desc>
      <rect width="470" height="340" fill="white" />
      <g stroke="#dce4e0">
        {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${x(i)} ${y(140)} V 280`} />)}
        {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M 60 ${y(i * 20)} H 412`} />)}
      </g>
      <path d="M 60 295 V 35 M 45 280 H 430" stroke="#253b38" fill="none" />
      {Array.from({ length: 9 }, (_, i) => <text key={i} x={x(i)} y="301" textAnchor="middle">{i}</text>)}
      {Array.from({ length: 8 }, (_, i) => <text key={i} x="48" y={y(i * 20) + 5} textAnchor="end">{i * 20}</text>)}
      <text x="65" y="26">Height (m)</text><text x="225" y="329" textAnchor="middle">Time (minutes)</text>
    </svg>
    <figcaption>Draw the graph on paper using these scales. The drawing is not automatically graded.</figcaption>
  </figure>;
}
