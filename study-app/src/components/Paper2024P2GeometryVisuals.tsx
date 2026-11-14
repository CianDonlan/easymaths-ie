import { useState, type PointerEvent } from "react";

function positionInSvg(event: PointerEvent<SVGSVGElement>) {
  const svg = event.currentTarget;
  const transform = svg.getScreenCTM();
  if (!transform) return null;
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(transform.inverse());
}

export function CentroidConstructionPad() {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  return <figure className="geometry-visual centroid-2024-pad">
    <svg viewBox="0 0 540 355" role="img" aria-labelledby="centroid-2024-title centroid-2024-desc" onPointerDown={(event) => {
      const point = positionInSvg(event);
      if (!point || point.x < 24 || point.x > 516 || point.y < 22 || point.y > 335) return;
      setPoints((current) => [...current.slice(-5), { x: point.x, y: point.y }]);
    }}>
      <title id="centroid-2024-title">Triangle PQR construction pad</title>
      <desc id="centroid-2024-desc">P is at the upper left, R at the upper right and Q below them. Tap one vertex and the midpoint of its opposite side to draw a median; repeat with a second vertex. The drawing is not automatically graded.</desc>
      <rect width="540" height="355" fill="white" />
      <path className="geometry-original" d="M90 65 L265 300 L465 95 Z" fill="none" strokeWidth="2.5" />
      <text x="72" y="59">P</text><text x="260" y="325">Q</text><text x="474" y="94">R</text>
      {Array.from({ length: Math.floor(points.length / 2) }, (_, index) => {
        const start = points[index * 2];
        const end = points[index * 2 + 1];
        return <line className="construction-median" key={index} x1={start.x} y1={start.y} x2={end.x} y2={end.y} />;
      })}
      {points.map((point, index) => <circle className="construction-point" key={index} cx={point.x} cy={point.y} r="4" />)}
    </svg>
    <figcaption>Tap a vertex, then the midpoint of its opposite side to draw a median. Repeat for a second median and mark their intersection. This drawing is ungraded; show midpoint construction or measurements in your workings.</figcaption>
    <button type="button" className="paper2024-clear" onClick={() => setPoints((current) => current.slice(0, -1))}>Undo point</button>{" "}
    <button type="button" className="paper2024-clear" onClick={() => setPoints([])}>Clear drawing</button>
  </figure>;
}

export function ParallelTransversalsDiagram() {
  return <figure className="geometry-visual paper2024-p2-geometry">
    <svg viewBox="0 0 550 285" role="img" aria-labelledby="parallel-title parallel-desc">
      <title id="parallel-title">Three parallel lines cut by two transversals</title>
      <desc id="parallel-desc">The top parallel has points D and A, the middle has E and B, and the bottom has F and C. D, E, F lie on one transversal; A, B, C lie on the other. Segments AB and BC are equal.</desc>
      <rect width="550" height="285" fill="white" />
      <line x1="45" y1="50" x2="510" y2="50" /><line x1="45" y1="140" x2="510" y2="140" /><line x1="45" y1="230" x2="510" y2="230" />
      <line className="geometry-original" x1="95" y1="50" x2="195" y2="230" /><line className="geometry-original" x1="400" y1="50" x2="300" y2="230" />
      <text x="83" y="40">D</text><text x="400" y="40">A</text>
      <text x="126" y="160">E</text><text x="350" y="160">B</text>
      <text x="185" y="256">F</text><text x="295" y="256">C</text>
      <text x="485" y="44">→</text><text x="485" y="134">→</text><text x="485" y="224">→</text>
    </svg>
    <figcaption>AD, BE and CF are parallel; A–B–C and D–E–F each lie on a transversal. Add any auxiliary line you use in your own proof.</figcaption>
  </figure>;
}

export function NestedCirclesDiagram() {
  return <figure className="geometry-visual paper2024-p2-geometry">
    <svg viewBox="0 0 450 270" role="img" aria-labelledby="nested-title nested-desc">
      <title id="nested-title">Circle s inside circle c</title>
      <desc id="nested-desc">A smaller circle s sits inside the larger circle c and touches its circumference at one point. The diagram illustrates internal tangency; the calculation must prove it.</desc>
      <rect width="450" height="270" fill="white" />
      <circle cx="230" cy="135" r="105" fill="#f8fbf7" stroke="#1d2b27" strokeWidth="2" />
      <circle cx="180.5" cy="85.5" r="35" fill="#e4f0e8" stroke="#1d2b27" strokeWidth="2" />
      <circle cx="230" cy="135" r="3" /><circle cx="180.5" cy="85.5" r="3" />
      <text x="220" y="80">c</text><text x="164" y="96">s</text>
    </svg>
    <figcaption>The diagram suggests internal tangency. Prove it by comparing centre distance with the difference in radii.</figcaption>
  </figure>;
}

export function CircleLocusDiagram() {
  const x = (value: number) => 80 + value * 21;
  const y = (value: number) => 300 - value * 21;
  return <figure className="geometry-visual paper2024-p2-geometry">
    <svg viewBox="0 0 480 340" role="img" aria-labelledby="locus-title locus-desc">
      <title id="locus-title">Circle through two points with its centre on a vertical line</title>
      <desc id="locus-desc">The circle passes through points seven comma ten and twelve comma eight. Its centre lies somewhere on the vertical line through nine comma zero.</desc>
      <rect width="480" height="340" fill="white" />
      <line x1="80" y1="300" x2="445" y2="300" /><line x1="80" y1="300" x2="80" y2="25" />
      <line className="geometry-guide" x1={x(9)} y1="45" x2={x(9)} y2="300" />
      <circle className="locus-circle" cx={x(9)} cy={y(31 / 4)} r={Math.sqrt(145) * 21 / 4} />
      <circle cx={x(7)} cy={y(10)} r="4" /><circle cx={x(12)} cy={y(8)} r="4" /><circle cx={x(9)} cy="300" r="4" />
      <text x={x(7) - 58} y={y(10) - 9}>(7, 10)</text>
      <text x={x(12) + 9} y={y(8) + 5}>(12, 8)</text>
      <text x={x(9) - 16} y="326">(9, 0)</text>
      <text x="445" y="301">x</text><text x="87" y="27">y</text>
    </svg>
    <figcaption>The dashed line fixes the centre's x-coordinate at 9. Its y-coordinate must be found from equal distances to the two given points.</figcaption>
  </figure>;
}

export function LatticePointsDiagram() {
  const values = [1, 2, 3, 4];
  const x = (value: number) => 46 + value * 53;
  const y = (value: number) => 279 - value * 53;
  return <figure className="geometry-visual paper2024-p2-geometry lattice-points-2024">
    <svg viewBox="0 0 345 330" role="img" aria-labelledby="lattice-title lattice-desc">
      <title id="lattice-title">Four by four grid of sixteen selectable points</title>
      <desc id="lattice-desc">There is a dot at every coordinate (m, n) where both m and n are one, two, three or four. A horizontal line connects two dots in the same row.</desc>
      <rect width="345" height="330" fill="white" />
      {values.map((value) => <g key={`grid${value}`}>
        <line className="geometry-guide" x1={x(value)} y1={y(4)} x2={x(value)} y2={y(0)} />
        <line className="geometry-guide" x1={x(0)} y1={y(value)} x2={x(4)} y2={y(value)} />
        <text x={x(value) - 5} y="303">{value}</text>
        <text x="22" y={y(value) + 6}>{value}</text>
      </g>)}
      <line x1={x(0)} y1={y(0)} x2="315" y2={y(0)} />
      <line x1={x(0)} y1={y(0)} x2={x(0)} y2="38" />
      <text x="22" y="303">0</text><text x="310" y="273">x</text><text x="53" y="37">y</text>
      {values.flatMap((column) => values.map((row) => <circle key={`${column}-${row}`} cx={x(column)} cy={y(row)} r="4.5" />))}
    </svg>
    <figcaption>There are 16 points in four rows and four columns. A horizontal pair comes from one row.</figcaption>
  </figure>;
}
