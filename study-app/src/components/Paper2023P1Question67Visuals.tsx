const xToSvg = (x: number) => 215 + x * 54;
const yToSvg = (y: number) => 253 - y * 34;
const line = (x: number) => x + 4;
const curve = (x: number) => x * x - 2;

function sampledPath(start: number, end: number, step: number, fn: (x: number) => number) {
  const points: string[] = [];
  for (let x = start; step > 0 ? x < end : x > end; x += step) points.push(`${xToSvg(x)} ${yToSvg(fn(x))}`);
  points.push(`${xToSvg(end)} ${yToSvg(fn(end))}`);
  return points;
}

export function BetweenCurves2023Diagram() {
  const upper = sampledPath(-1, 2, 0.1, line);
  const lower = sampledPath(2, -1, -0.1, curve);
  const parabola = sampledPath(-2.5, 2.8, 0.1, curve);
  const shaded = `M ${upper[0]} ${upper.slice(1).map((point) => `L ${point}`).join(" ")} ${lower.map((point) => `L ${point}`).join(" ")} Z`;
  return <figure className="geometry-visual between-curves-2023">
    <svg viewBox="0 0 470 355" role="img" aria-labelledby="between-curves-2023-title between-curves-2023-desc">
      <title id="between-curves-2023-title">Area between a line and a parabola from x minus one to x two</title>
      <desc id="between-curves-2023-desc">The line f of x equals x plus four is above the parabola g of x equals x squared minus two between the vertical boundaries x equals minus one and x equals two. The region between them is shaded.</desc>
      <rect width="470" height="355" fill="white" />
      <line className="between-curves-axis" x1="30" y1={yToSvg(0)} x2="448" y2={yToSvg(0)} />
      <line className="between-curves-axis" x1={xToSvg(0)} y1="20" x2={xToSvg(0)} y2="335" />
      <path className="between-curves-shade" d={shaded} />
      <path className="between-curves-line" d={`M ${xToSvg(-2.5)} ${yToSvg(line(-2.5))} L ${xToSvg(2.7)} ${yToSvg(line(2.7))}`} />
      <path className="between-curves-parabola" d={`M ${parabola[0]} ${parabola.slice(1).map((point) => `L ${point}`).join(" ")}`} />
      <line className="between-curves-boundary" x1={xToSvg(-1)} y1={yToSvg(line(-1))} x2={xToSvg(-1)} y2={yToSvg(curve(-1))} />
      <line className="between-curves-boundary" x1={xToSvg(2)} y1={yToSvg(line(2))} x2={xToSvg(2)} y2={yToSvg(curve(2))} />
      <text x="448" y={yToSvg(0) - 7}>x</text><text x={xToSvg(0) + 8} y="25">y</text>
      <text x={xToSvg(-1) - 10} y={yToSvg(0) + 20}>−1</text><text x={xToSvg(2) - 5} y={yToSvg(0) + 20}>2</text>
      <text x="345" y="43">f(x) = x + 4</text><text x="347" y="180">g(x) = x² − 2</text>
    </svg>
    <figcaption>Find the area of the shaded region from x = −1 to x = 2. The line is above the parabola on this interval.</figcaption>
  </figure>;
}

const graphShapes = [
  { label: "A", path: "M 42 52 C 68 52, 91 69, 112 112", dotY: 66 },
  { label: "B", path: "M 42 112 C 63 70, 88 52, 112 52", dotY: 66 },
  { label: "C", path: "M 42 52 C 62 94, 88 112, 112 112", dotY: 98 },
  { label: "D", path: "M 42 112 C 66 112, 91 94, 112 52", dotY: 98 },
] as const;

export function CurvatureChoices2023Diagram() {
  return <figure className="geometry-visual curvature-choices-2023">
    <svg viewBox="0 0 660 190" role="img" aria-labelledby="curvature-2023-title curvature-2023-desc">
      <title id="curvature-2023-title">Four possible graph shapes near t equals one</title>
      <desc id="curvature-2023-desc">Graph A decreases and bends downward. Graph B increases and bends downward. Graph C decreases and bends upward. Graph D increases and bends upward. A dot marks t equals one on each graph.</desc>
      <rect width="660" height="190" fill="white" />
      {graphShapes.map(({ label, path, dotY }, index) => <g key={label} transform={`translate(${index * 160},0)`}>
        <line className="curvature-axis" x1="25" y1="145" x2="135" y2="145" />
        <line className="curvature-axis" x1="25" y1="145" x2="25" y2="30" />
        <path className="curvature-curve" d={path} />
        <line className="curvature-guide" x1="77" y1={dotY} x2="77" y2="145" />
        <circle className="curvature-point" cx="77" cy={dotY} r="3.5" />
        <text x="72" y="163">1</text><text x="114" y="183">Graph {label}</text>
      </g>)}
    </svg>
    <figcaption>Choose the graph whose slope is positive and whose slope is decreasing at t = 1. Use both derivatives to justify the choice.</figcaption>
  </figure>;
}
