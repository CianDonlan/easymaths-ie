import { useEffect, useRef, useState } from "react";
import { isInversePath, type GraphPoint } from "../utils/inverseGraph";

type DraftPoint = { x: number | null; y: number | null };
const emptyPoints: DraftPoint[] = [{ x: null, y: null }, { x: null, y: null }, { x: null, y: null }];
const storageKey = "lc-maths-2025-p1-q2-inverse-graph";
const originX = 45;
const originY = 315;
const unit = 70;
const toSvg = ({ x, y }: GraphPoint) => `${originX + x * unit},${originY - y * unit}`;

function readPoints(): DraftPoint[] {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
    if (Array.isArray(saved) && saved.length === 3 && saved.every((point) =>
      point && [point.x, point.y].every((value) => value === null || (Number.isInteger(value) && value >= 0 && value <= 4)))) {
      return saved as DraftPoint[];
    }
  } catch { /* Browser storage may be unavailable. */ }
  return emptyPoints;
}

export function InverseGraphPad() {
  const [points, setPoints] = useState(readPoints);
  const [result, setResult] = useState<"correct" | "incorrect" | "incomplete" | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(points)); } catch { /* Keep the in-memory draft. */ }
  }, [points]);

  const changePoint = (index: number, axis: "x" | "y", raw: string) => {
    const value = raw === "" ? null : Number(raw);
    setPoints((current) => current.map((point, position) => position === index ? { ...point, [axis]: value } : point));
    setResult(null);
  };
  const placePoint = (event: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = Math.round(((event.clientX - rect.left) * 400 / rect.width - originX) / unit);
    const y = Math.round((originY - (event.clientY - rect.top) * 360 / rect.height) / unit);
    if (x < 0 || x > 4 || y < 0 || y > 4) return;
    setPoints((current) => {
      const next = current.map((point) => ({ ...point }));
      const slot = next.findIndex((point) => point.x === null || point.y === null);
      if (slot >= 0) next[slot] = { x, y };
      return next;
    });
    setResult(null);
  };
  const validPoints = points.filter((point): point is GraphPoint => point.x !== null && point.y !== null && Number.isInteger(point.x) && Number.isInteger(point.y) && point.x >= 0 && point.x <= 4 && point.y >= 0 && point.y <= 4);
  const plotLine = validPoints.length >= 2 ? validPoints.map(toSvg).join(" ") : "";
  const check = () => setResult(validPoints.length !== 3 ? "incomplete" : isInversePath(validPoints) ? "correct" : "incorrect");

  return <div className="inverse-graph-pad">
    <p>Plot three vertices in order to draw the inverse as two straight segments. Tap the grid intersections or use the coordinate fields below. The green graph is g(x).</p>
    <svg ref={svgRef} viewBox="0 0 400 360" role="img" aria-label="Coordinate graph showing g of x and your inverse graph points" onPointerDown={placePoint}>
      {[0, 1, 2, 3, 4].map((tick) => <g key={tick}>
        <line className="inverse-grid" x1={originX + tick * unit} y1="35" x2={originX + tick * unit} y2={originY} />
        <line className="inverse-grid" x1={originX} y1={originY - tick * unit} x2={originX + 4 * unit} y2={originY - tick * unit} />
        <text x={originX + tick * unit} y="338" textAnchor="middle">{tick}</text>
        <text x="30" y={originY - tick * unit + 5} textAnchor="end">{tick}</text>
      </g>)}
      <line className="inverse-axis" x1="35" y1={originY} x2="365" y2={originY} />
      <line className="inverse-axis" x1={originX} y1="325" x2={originX} y2="15" />
      <line className="inverse-reflection" x1={originX} y1={originY} x2={originX + 4 * unit} y2={originY - 4 * unit} />
      <polyline className="inverse-original" points={`${originX},${originY} ${originX + 3 * unit},${originY - unit} ${originX + 4 * unit},${originY - 4 * unit}`} />
      {plotLine && <polyline className="inverse-student" points={plotLine} />}
      {validPoints.map((point, index) => <circle className="inverse-student-point" key={index} cx={originX + point.x * unit} cy={originY - point.y * unit} r="5" />)}
      <text x="353" y="41">g(x)</text><text x="330" y="84">y = x</text>
      {validPoints.length >= 2 && <text className="inverse-student-label" x="130" y="105">g⁻¹(x)</text>}
      <text x="372" y="317">x</text><text x="49" y="19">y</text>
    </svg>
    <div className="inverse-point-fields">{points.map((point, index) => <div key={index}><strong>Vertex {index + 1}</strong><label>x <input type="number" min="0" max="4" step="1" value={point.x ?? ""} onChange={(event) => changePoint(index, "x", event.target.value)} aria-label={`Vertex ${index + 1} x coordinate`} /></label><label>y <input type="number" min="0" max="4" step="1" value={point.y ?? ""} onChange={(event) => changePoint(index, "y", event.target.value)} aria-label={`Vertex ${index + 1} y coordinate`} /></label></div>)}</div>
    <div className="inverse-check-row"><button type="button" className="button button-primary" onClick={check}>Check graph</button><button type="button" className="button button-secondary" onClick={() => { setPoints(emptyPoints.map((point) => ({ ...point }))); setResult(null); }}>Clear graph</button></div>
    <p className={`inverse-feedback${result === "correct" ? " is-correct" : ""}`} aria-live="polite">{result === "correct" ? "That's correct. The inverse has the right vertices and two segments." : result === "incorrect" ? "Check the reflected vertices and the order in which you joined them." : result === "incomplete" ? "Place all three vertices before checking." : ""}</p>
  </div>;
}
