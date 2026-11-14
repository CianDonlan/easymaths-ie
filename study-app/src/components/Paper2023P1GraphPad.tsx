import { useState, type PointerEvent } from "react";

type Point = { x: number; y: number };
const plotX = (x: number) => 230 + x * 36;
const plotY = (y: number) => 300 - y * 36;

function svgPosition(event: PointerEvent<SVGSVGElement>): Point | null {
  const svg = event.currentTarget;
  const matrix = svg.getScreenCTM();
  if (!matrix) return null;
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  const local = point.matrixTransform(matrix.inverse());
  return { x: local.x, y: local.y };
}

export function Paper2023P1GraphPad({ shift }: { shift: "down" | "left" }) {
  const [points, setPoints] = useState<Point[]>([]);
  const studentPath = points.length === 3
    ? `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} C ${points[1].x + (points[2].x - points[1].x) * 0.2} ${points[1].y + (points[2].y - points[1].y) * 0.85}, ${points[2].x - (points[2].x - points[1].x) * 0.25} ${points[2].y}, ${points[2].x} ${points[2].y}`
    : points.length === 2 ? `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}` : "";
  const titleId = `graph-2023-${shift}-title`;
  const descId = `graph-2023-${shift}-desc`;
  return <figure className="geometry-visual graph-2023-pad">
    <svg viewBox="0 0 470 405" role="img" aria-labelledby={`${titleId} ${descId}`} onPointerDown={(event) => {
      const point = svgPosition(event);
      if (!point || point.x < plotX(-5) || point.x > plotX(5) || point.y < plotY(7) || point.y > plotY(-2)) return;
      setPoints((current) => current.length < 3 ? [...current, point] : current);
    }}>
      <title id={titleId}>Plot {shift === "down" ? "g(x) minus 2" : "g(x plus 3)"} beside the original graph</title>
      <desc id={descId}>The original g runs from the point negative 2 comma 4 down to negative 1 comma 1, then curves upward to 2 comma 3. Tap the transformed starting point, corner and endpoint in that order. Your graph is not automatically marked.</desc>
      <rect width="470" height="405" fill="white" />
      {Array.from({ length: 11 }, (_, index) => <line className="graph-2023-grid" key={`x${index}`} x1={plotX(index - 5)} y1={plotY(7)} x2={plotX(index - 5)} y2={plotY(-2)} />)}
      {Array.from({ length: 10 }, (_, index) => <line className="graph-2023-grid" key={`y${index}`} x1={plotX(-5)} y1={plotY(index - 2)} x2={plotX(5)} y2={plotY(index - 2)} />)}
      <line className="graph-2023-axis" x1={plotX(-5)} y1={plotY(0)} x2={plotX(5) + 16} y2={plotY(0)} />
      <line className="graph-2023-axis" x1={plotX(0)} y1={plotY(-2)} x2={plotX(0)} y2={plotY(7) - 14} />
      {Array.from({ length: 11 }, (_, index) => <text key={`xl${index}`} x={plotX(index - 5) - 6} y={plotY(0) + 20}>{index - 5 || ""}</text>)}
      {Array.from({ length: 10 }, (_, index) => <text key={`yl${index}`} x={plotX(0) - 20} y={plotY(index - 2) + 5}>{index - 2 || ""}</text>)}
      <text x="432" y="291">x</text><text x="238" y="28">y</text>
      <path className="graph-2023-original" d={`M ${plotX(-2)} ${plotY(4)} L ${plotX(-1)} ${plotY(1)} C ${plotX(-0.6)} ${plotY(2.55)}, ${plotX(0.9)} ${plotY(3)}, ${plotX(2)} ${plotY(3)}`} />
      <text x={plotX(2) + 9} y={plotY(3) - 3}>g(x)</text>
      {studentPath && <path className="graph-2023-student" d={studentPath} />}
      {points.map((point, index) => <circle className="graph-2023-point" key={index} cx={point.x} cy={point.y} r="5" />)}
    </svg>
    <figcaption>The green curve is the original g. Tap the transformed start, corner and end in that order. Your drawing is ungraded; compare its position and shape with the worked solution.</figcaption>
    <div className="graph-2023-actions"><button type="button" className="paper2024-clear" onClick={() => setPoints((current) => current.slice(0, -1))}>Undo point</button><button type="button" className="paper2024-clear" onClick={() => setPoints([])}>Clear graph</button></div>
  </figure>;
}
