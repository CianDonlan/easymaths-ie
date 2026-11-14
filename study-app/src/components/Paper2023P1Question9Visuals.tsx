import { useRef, useState, type PointerEvent } from "react";

type Point = { x: number; y: number };
const plotX = (x: number) => 45 + x * 30;
const plotY = (y: number) => 405 - y * 30;

function svgPosition(event: PointerEvent<SVGSVGElement>): Point | null {
  const matrix = event.currentTarget.getScreenCTM();
  if (!matrix) return null;
  const point = event.currentTarget.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  const local = point.matrixTransform(matrix.inverse());
  if (local.x < plotX(0) || local.x > plotX(12) || local.y < plotY(12) || local.y > plotY(0)) return null;
  return { x: local.x, y: local.y };
}

export function FactorPairs2023Table() {
  return <div className="study-table-wrap">
    <table className="study-data-table factor-pairs-2023-table">
      <caption>Complete the six ordered factor pairs of 12</caption>
      <tbody>
        <tr><th scope="row">x</th><td>1</td><td>2</td><td>3</td><td>?</td><td>6</td><td>?</td></tr>
        <tr><th scope="row">y</th><td>?</td><td>?</td><td>4</td><td>?</td><td>?</td><td>1</td></tr>
      </tbody>
    </table>
    <p>Each column must satisfy xy = 12. Use the answer box for the missing cells.</p>
  </div>;
}

export function FactorCurve2023Pad({ mode }: { mode: "points" | "curve" }) {
  const [points, setPoints] = useState<Point[]>([]);
  const drawing = useRef(false);
  const titleId = `factor-curve-2023-${mode}-title`;
  const descId = `factor-curve-2023-${mode}-desc`;
  const path = points.length > 1 ? `M ${points.map((point) => `${point.x} ${point.y}`).join(" L ")}` : "";
  return <figure className={`geometry-visual factor-curve-2023 factor-curve-2023-${mode}`}>
    <svg viewBox="0 0 445 445" role="img" aria-labelledby={`${titleId} ${descId}`}
      onPointerDown={(event) => {
        const position = svgPosition(event);
        if (!position) return;
        if (mode === "points") {
          const snapped = { x: plotX(Math.round((position.x - plotX(0)) / 30)), y: plotY(Math.round((plotY(0) - position.y) / 30)) };
          setPoints((current) => current.length < 5 ? [...current, snapped] : current);
        } else {
          drawing.current = true;
          setPoints([position]);
          event.currentTarget.setPointerCapture(event.pointerId);
        }
      }}
      onPointerMove={(event) => {
        if (!drawing.current || mode !== "curve") return;
        const position = svgPosition(event);
        if (position) setPoints((current) => [...current, position]);
      }}
      onPointerUp={() => { drawing.current = false; }}
      onPointerCancel={() => { drawing.current = false; }}>
      <title id={titleId}>{mode === "points" ? "Plot ordered factor pairs of twelve" : "Draw the curve y equals twelve divided by x"}</title>
      <desc id={descId}>The x and y axes run from zero to twelve. The point three comma four is already plotted. {mode === "points" ? "Tap to place the other five ordered factor pairs." : "Drag to draw the smooth curve for x from one to twelve."} This drawing is not graded.</desc>
      <rect width="445" height="445" fill="white" />
      {Array.from({ length: 13 }, (_, index) => <g key={index}>
        <line className="factor-curve-grid" x1={plotX(index)} y1={plotY(12)} x2={plotX(index)} y2={plotY(0)} />
        <line className="factor-curve-grid" x1={plotX(0)} y1={plotY(index)} x2={plotX(12)} y2={plotY(index)} />
        <text x={plotX(index) - 5} y="425">{index}</text>
        {index > 0 && <text x="20" y={plotY(index) + 5}>{index}</text>}
      </g>)}
      <line className="factor-curve-axis" x1="45" y1="405" x2="422" y2="405" />
      <line className="factor-curve-axis" x1="45" y1="405" x2="45" y2="23" />
      <text x="426" y="410">x</text><text x="51" y="23">y</text>
      <circle className="factor-curve-given" cx={plotX(3)} cy={plotY(4)} r="5" />
      {mode === "points" ? points.map((point, index) => <circle className="factor-curve-student" key={index} cx={point.x} cy={point.y} r="5" />) : path && <path className="factor-curve-student-line" d={path} />}
    </svg>
    <figcaption>{mode === "points" ? "Tap the five other factor-pair points. The point (3, 4) is given. Your plot is ungraded; compare it with your table and the worked solution." : "Drag one smooth curve through the factor-pair points on 1 ≤ x ≤ 12. Your drawing is ungraded; compare its shape with the worked solution."}</figcaption>
    {mode === "points" && points.length > 0 && <p className="factor-curve-placed">Placed: {points.map((point) => `(${Math.round((point.x - 45) / 30)}, ${Math.round((405 - point.y) / 30)})`).join(", ")}</p>}
    <div className="graph-2023-actions">
      {mode === "points" && <button type="button" className="paper2024-clear" onClick={() => setPoints((current) => current.slice(0, -1))}>Undo point</button>}
      <button type="button" className="paper2024-clear" onClick={() => setPoints([])}>Clear {mode === "points" ? "points" : "curve"}</button>
    </div>
  </figure>;
}

export function TangentTriangle2023Diagram() {
  return <figure className="geometry-visual tangent-triangle-2023">
    <svg viewBox="0 0 460 330" role="img" aria-labelledby="tangent-triangle-2023-title tangent-triangle-2023-desc">
      <title id="tangent-triangle-2023-title">Triangle between a tangent and the coordinate axes</title>
      <desc id="tangent-triangle-2023-desc">A descending tangent crosses the positive y-axis and positive x-axis. The right triangle between the tangent and the axes is shaded. Its equation is y equals negative twelve over p squared times x plus twenty-four over p.</desc>
      <rect width="460" height="330" fill="white" />
      <path d="M 80 265 L 80 65 L 360 265 Z" className="tangent-triangle-shade" />
      <line className="tangent-triangle-axis" x1="55" y1="265" x2="420" y2="265" />
      <line className="tangent-triangle-axis" x1="80" y1="295" x2="80" y2="30" />
      <line className="tangent-triangle-line" x1="55" y1="47" x2="391" y2="287" />
      <text x="426" y="270">x</text><text x="87" y="29">y</text>
      <text x="171" y="48">y = −(12/p²)x + 24/p</text>
    </svg>
    <figcaption>Find both axis intercepts of the tangent, then use the triangle area formula. The sketch is not to scale.</figcaption>
  </figure>;
}
