import { useState, type PointerEvent } from "react";

function svgPosition(event: PointerEvent<SVGSVGElement>) {
  const svg = event.currentTarget;
  const transform = svg.getScreenCTM();
  if (!transform) return null;
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(transform.inverse());
}

export function Argand2024Pad() {
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
  return <figure className="geometry-visual paper2024-pad">
    <svg viewBox="0 0 500 355" role="img" aria-labelledby="argand-title argand-desc" onPointerDown={(event) => {
      const position = svgPosition(event);
      if (position) setPoint({ x: Math.max(30, Math.min(450, position.x)), y: Math.max(80, Math.min(320, position.y)) });
    }}>
      <title id="argand-title">Argand diagram with w and a place to plot u</title>
      <desc id="argand-desc">The real axis runs from minus 3 to 4 and the imaginary axis from minus 1 to 3. The given point w is at minus 2 plus 2i. Tap the graph to place and label u.</desc>
      <rect x="0" y="0" width="500" height="355" fill="white" />
      {Array.from({ length: 8 }, (_, index) => <line className="geometry-guide" key={`x${index}`} x1={30 + index * 60} y1="80" x2={30 + index * 60} y2="320" />)}
      {Array.from({ length: 5 }, (_, index) => <line className="geometry-guide" key={`y${index}`} x1="30" y1={80 + index * 60} x2="450" y2={80 + index * 60} />)}
      <line className="argand-axis" x1="30" y1="260" x2="470" y2="260" />
      <line className="argand-axis" x1="210" y1="320" x2="210" y2="58" />
      {Array.from({ length: 8 }, (_, index) => <text key={`xl${index}`} x={24 + index * 60} y="281">{index - 3 || ""}</text>)}
      {Array.from({ length: 5 }, (_, index) => <text key={`yl${index}`} x="184" y={326 - index * 60}>{index - 1 || ""}</text>)}
      <text x="472" y="251">Re</text><text x="220" y="55">Im</text>
      <circle cx="90" cy="140" r="4" /><text x="73" y="126">w</text>
      {point && <g className="argand-student"><circle cx={point.x} cy={point.y} r="5" /><text x={point.x + 8} y={point.y - 8}>u</text></g>}
    </svg>
    <figcaption>Tap to place u; its plotted position is ungraded. Use your answer and the worked solution to compare the real and imaginary coordinates.</figcaption>
    <button type="button" className="paper2024-clear" onClick={() => setPoint(null)}>Clear point</button>
  </figure>;
}

export function TangentEstimateGraph() {
  const [marks, setMarks] = useState<{ x: number; y: number }[]>([]);
  const start = 45;
  const stepX = 50;
  const stepY = 45;
  return <figure className="geometry-visual paper2024-pad">
    <svg viewBox="0 0 590 390" role="img" aria-labelledby="tangent-title tangent-desc" onPointerDown={(event) => {
      const position = svgPosition(event);
      if (!position) return;
      const x = Math.max(45, Math.min(545, position.x));
      setMarks((current) => [...current.slice(-1), { x, y: Math.max(65, Math.min(335, position.y)) }]);
    }}>
      <title id="tangent-title">Curve p and straight line l for estimating equal slopes</title>
      <desc id="tangent-desc">From x zero to ten, the straight line rises from y minus 3 to y 2, with slope one half. The curve p starts near minus 3, dips slightly, rises to a peak near x 8 and then falls. Tap two points on the curve to add lines parallel to l.</desc>
      <rect x="0" y="0" width="590" height="390" fill="white" />
      {Array.from({ length: 11 }, (_, index) => <line className="geometry-guide" key={`x${index}`} x1={start + index * stepX} y1="65" x2={start + index * stepX} y2="335" />)}
      {Array.from({ length: 7 }, (_, index) => <line className="geometry-guide" key={`y${index}`} x1="45" y1={65 + index * stepY} x2="545" y2={65 + index * stepY} />)}
      <line className="argand-axis" x1="45" y1="200" x2="565" y2="200" />
      <line className="argand-axis" x1="45" y1="335" x2="45" y2="45" />
      {[2, 4, 6, 8, 10].map((value) => <text key={value} x={start + value * stepX - 6} y="218">{value}</text>)}
      <text x="24" y="72">3</text><text x="20" y="338">−3</text>
      <line className="tangent-reference" x1="45" y1="335" x2="545" y2="110" />
      <path className="tangent-curve" d="M45 326 C90 338 117 348 160 321 C210 293 250 220 295 156 C345 85 386 64 420 67 C465 70 510 85 545 100" />
      <text x="470" y="89">y = p(x)</text><text x="485" y="134">y = l(x)</text>
      {marks.map((mark, index) => <g className="tangent-student" key={index}>
        <line x1={Math.max(45, mark.x - 60)} y1={mark.y + (mark.x - Math.max(45, mark.x - 60)) * stepY / (2 * stepX)} x2={Math.min(545, mark.x + 60)} y2={mark.y - (Math.min(545, mark.x + 60) - mark.x) * stepY / (2 * stepX)} />
        <circle cx={mark.x} cy={mark.y} r="4" />
      </g>)}
    </svg>
    <figcaption>Tap two places on p(x) where a tangent could run parallel to l(x). The guide lines are ungraded; estimate each x-value and compare using the guided self-check.</figcaption>
    <button type="button" className="paper2024-clear" onClick={() => setMarks([])}>Clear guides</button>
  </figure>;
}

export function TshirtSalesGraphPad() {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const plot = { left: 54, right: 474, top: 42, bottom: 322 };
  const ordered = [...points].sort((a, b) => a.x - b.x);
  const curve = ordered.length > 1 ? ordered.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const previous = ordered[index - 1];
    const before = ordered[Math.max(0, index - 2)];
    const after = ordered[Math.min(ordered.length - 1, index + 1)];
    const dx = point.x - previous.x;
    const c1x = previous.x + dx / 3;
    const c2x = point.x - dx / 3;
    const c1y = previous.y + (point.y - before.y) * dx / (6 * Math.max(1, point.x - before.x));
    const c2y = point.y - (after.y - previous.y) * dx / (6 * Math.max(1, after.x - previous.x));
    return `${path} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${point.x} ${point.y}`;
  }, "") : "";
  return <figure className="geometry-visual paper2024-pad">
    <svg viewBox="0 0 535 375" role="img" aria-labelledby="tshirt-title tshirt-desc" onPointerDown={(event) => {
      const position = svgPosition(event);
      if (!position || position.x < plot.left || position.x > plot.right || position.y < plot.top || position.y > plot.bottom) return;
      setPoints((current) => [...current, { x: position.x, y: position.y }]);
    }}>
      <title id="tshirt-title">Blank axes for drawing daily t-shirt sales</title>
      <desc id="tshirt-desc">Days from zero to 360 run across the horizontal axis; sales from zero to 80 run up the vertical axis. Tap to add plotted points; a smooth guide joins them in day order.</desc>
      <rect width="535" height="375" fill="white" />
      {Array.from({ length: 7 }, (_, index) => <g key={`x${index}`}>
        <line className="geometry-guide" x1={plot.left + index * 70} y1={plot.top} x2={plot.left + index * 70} y2={plot.bottom} />
        <text x={plot.left + index * 70 - 10} y="345">{index * 60}</text>
      </g>)}
      {Array.from({ length: 9 }, (_, index) => <g key={`y${index}`}>
        <line className="geometry-guide" x1={plot.left} y1={plot.bottom - index * 35} x2={plot.right} y2={plot.bottom - index * 35} />
        <text x="20" y={plot.bottom - index * 35 + 5}>{index * 10}</text>
      </g>)}
      <line className="argand-axis" x1={plot.left} y1={plot.bottom} x2="490" y2={plot.bottom} />
      <line className="argand-axis" x1={plot.left} y1={plot.bottom} x2={plot.left} y2="27" />
      <text x="489" y="346">Day</text><text x="62" y="31">Daily sales</text>
      {curve && <path className="tangent-curve" d={curve} />}
      {points.map((point, index) => <circle className="sales-student-point" key={index} cx={point.x} cy={point.y} r="5" />)}
    </svg>
    <figcaption>Tap to plot seven points. A smooth guide joins them in day order. The drawing is ungraded; compare its shape with the worked solution.</figcaption>
    <button type="button" className="paper2024-clear" onClick={() => setPoints((current) => current.slice(0, -1))}>Undo point</button>{" "}
    <button type="button" className="paper2024-clear" onClick={() => setPoints([])}>Clear graph</button>
  </figure>;
}

export function ScarfGraphChoices() {
  return <figure className="geometry-visual scarf-choices">
    <svg viewBox="0 0 660 175" role="img" aria-labelledby="scarf-title scarf-desc">
      <title id="scarf-title">Three candidate graphs for scarf sales over several years</title>
      <desc id="scarf-desc">Graph J is a rising straight line. Graph K oscillates at a constant level. Graph L oscillates while rising overall.</desc>
      <rect width="660" height="175" fill="white" />
      {[0, 1, 2].map((index) => <g key={index} transform={`translate(${index * 220},0)`}>
        <text x="86" y="23">Graph {"JKL"[index]}</text>
        <line x1="20" y1="148" x2="204" y2="148" /><line x1="20" y1="148" x2="20" y2="38" />
        <text x="198" y="169">t</text>
      </g>)}
      <path className="graph-choice-line" d="M25 142 L188 89" />
      <path className="graph-choice-line" d="M245 67 C255 67 258 139 272 139 S288 67 303 67 S319 139 334 139 S350 67 365 67 S381 139 396 139 S412 67 420 67" />
      <path className="graph-choice-line" d="M465 94 C475 94 478 151 492 151 S508 77 523 77 S539 132 554 132 S570 58 585 58 S601 113 616 113 S632 40 644 40" />
    </svg>
    <figcaption>Choose J, K or L, then explain both the repeating wave and the overall trend.</figcaption>
  </figure>;
}

export function SphereCapDiagram() {
  return <figure className="geometry-visual sphere-cap-2024">
    <svg viewBox="0 0 340 235" role="img" aria-labelledby="sphere-cap-title sphere-cap-desc">
      <title id="sphere-cap-title">Sphere with a cap cut off by a flat surface</title>
      <desc id="sphere-cap-desc">A horizontal plane cuts a small cap from the top of a sphere. R marks the radius from the centre; k marks the vertical height from the cutting plane to the top of the cap.</desc>
      <rect width="340" height="235" fill="white" />
      <circle cx="170" cy="122" r="92" fill="#f8fbf7" stroke="#1d2b27" strokeWidth="2" />
      <path d="M112 52 Q170 8 228 52 L228 61 Q170 72 112 61 Z" fill="#d9e8df" stroke="#1d2b27" strokeWidth="1.5" />
      <ellipse cx="170" cy="61" rx="58" ry="10" fill="#e7f1e9" stroke="#1d2b27" strokeWidth="1.5" />
      <circle cx="170" cy="122" r="3" />
      <line x1="173" y1="122" x2="251" y2="171" stroke="#1d2b27" strokeWidth="1.5" />
      <line x1="170" y1="31" x2="170" y2="59" stroke="#1d2b27" strokeWidth="1.5" />
      <text x="183" y="48">k</text><text x="209" y="128">R</text><text x="234" y="43">Cap</text>
    </svg>
    <figcaption>The cap is the portion above the horizontal cut; k is its height and R is the sphere's radius.</figcaption>
  </figure>;
}

export function PlantLogoDiagram() {
  return <figure className="geometry-visual plant-logo-2024">
    <svg viewBox="0 0 525 300" role="img" aria-labelledby="plant-logo-title plant-logo-desc">
      <title id="plant-logo-title">Plant company logo enclosed by three curves</title>
      <desc id="plant-logo-desc">Two symmetrical leaf-shaped shaded regions meet at the origin. The lower boundary is c of x equals x squared. The right upper boundary is s of x equals 2x minus x squared. The left upper boundary k is the reflection of s in the vertical axis.</desc>
      <rect width="525" height="300" fill="white" />
      <line className="argand-axis" x1="35" y1="250" x2="490" y2="250" />
      <line className="argand-axis" x1="260" y1="270" x2="260" y2="27" />
      <path className="logo-lobe" d="M260 250 Q350 250 440 70 Q350 70 260 250 Z" />
      <path className="logo-lobe" d="M260 250 Q170 250 80 70 Q170 70 260 250 Z" />
      <line x1="80" y1="246" x2="80" y2="254" /><line x1="440" y1="246" x2="440" y2="254" />
      <line x1="256" y1="70" x2="264" y2="70" />
      <text x="71" y="274">−1</text><text x="435" y="274">1</text><text x="267" y="75">1</text>
      <text x="490" y="254">x</text><text x="269" y="31">y</text>
      <text x="109" y="107">k(x)</text><text x="377" y="107">s(x)</text>
      <text x="112" y="211">c(x)</text><text x="386" y="211">c(x)</text>
    </svg>
    <figcaption>The shaded lobes are mirror images. For area, integrate the upper curve minus the lower curve from 0 to 1, then double.</figcaption>
  </figure>;
}
