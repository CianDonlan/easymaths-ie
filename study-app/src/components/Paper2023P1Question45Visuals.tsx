import { useState, type PointerEvent } from "react";

type Point = { x: number; y: number };

function svgPosition(event: PointerEvent<SVGSVGElement>): Point | null {
  const matrix = event.currentTarget.getScreenCTM();
  if (!matrix) return null;
  const point = event.currentTarget.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  const local = point.matrixTransform(matrix.inverse());
  return { x: local.x, y: local.y };
}

export function Argand2023Diagram({ interactive = false }: { interactive?: boolean }) {
  const [points, setPoints] = useState<Point[]>([]);
  const titleId = interactive ? "argand-2023-pad-title" : "argand-2023-title";
  const descId = interactive ? "argand-2023-pad-desc" : "argand-2023-desc";
  return <figure className={`geometry-visual argand-2023${interactive ? " argand-2023-pad" : ""}`}>
    <svg viewBox="0 0 480 355" role="img" aria-labelledby={`${titleId} ${descId}`} onPointerDown={interactive ? (event) => {
      const point = svgPosition(event);
      if (!point || point.x < 30 || point.x > 430 || point.y < 35 || point.y > 325) return;
      setPoints((current) => current.length < 2 ? [...current, point] : current);
    } : undefined}>
      <title id={titleId}>Argand diagram showing u in the first quadrant</title>
      <desc id={descId}>The real axis is horizontal and the imaginary axis is vertical. The point u equals a plus b i is in the first quadrant, slightly right of the imaginary axis and well above the real axis. {interactive ? "Tap to place i u, then its conjugate. The positions are ungraded." : ""}</desc>
      <rect width="480" height="355" fill="white" />
      <line className="argand-2023-axis" x1="35" y1="180" x2="432" y2="180" />
      <line className="argand-2023-axis" x1="230" y1="325" x2="230" y2="35" />
      <text x="437" y="185">Re</text><text x="238" y="33">Im</text>
      <circle className="argand-2023-given" cx="258" cy="67" r="5" />
      <text x="269" y="61">u = a + bi</text>
      {points.map((point, index) => <g key={index} className="argand-2023-student"><circle cx={point.x} cy={point.y} r="5" /><text x={point.x + 8} y={point.y - 8}>{index === 0 ? "iu" : "conj(iu)"}</text></g>)}
    </svg>
    <figcaption>{interactive ? "Tap to place iu, then its conjugate. Compare each point's position with the worked solution; the diagram is ungraded." : "The given u = a + bi lies in the first quadrant. Its horizontal and vertical distances from the axes represent a and b."}</figcaption>
    {interactive && <div className="graph-2023-actions"><button type="button" className="paper2024-clear" onClick={() => setPoints((current) => current.slice(0, -1))}>Undo point</button><button type="button" className="paper2024-clear" onClick={() => setPoints([])}>Clear diagram</button></div>}
  </figure>;
}

export function FunctionMaps2023Diagram() {
  const left = ["1", "2", "3", "4"];
  const middle = ["star", "circle", "cloud"];
  const right = ["x", "w", "y", "z"];
  return <figure className="geometry-visual function-maps-2023">
    <svg viewBox="0 0 690 350" role="img" aria-labelledby="maps-2023-title maps-2023-desc">
      <title id="maps-2023-title">Functions f from A to B and g from B to C</title>
      <desc id="maps-2023-desc">Set A has 1, 2, 3, 4. Under f, 1 maps to star, both 2 and 3 map to circle, and 4 maps to cloud. Under g, star maps to x, circle maps to w, and cloud maps to z. Element y in C has no preimage.</desc>
      <defs><marker id="maps-2023-arrowhead" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#176b44" /></marker></defs>
      <rect width="690" height="350" fill="white" />
      <ellipse cx="95" cy="175" rx="76" ry="142" className="function-maps-oval" />
      <ellipse cx="345" cy="175" rx="76" ry="142" className="function-maps-oval" />
      <ellipse cx="595" cy="175" rx="76" ry="142" className="function-maps-oval" />
      <g className="function-maps-arrow">
        <path d="M126 75 C205 55 265 61 315 79" /><path d="M126 139 C205 130 260 137 315 163" />
        <path d="M126 211 C205 185 265 170 315 163" /><path d="M126 277 C200 252 262 268 315 270" />
        <path d="M375 79 C445 46 505 52 565 79" /><path d="M375 163 C445 130 507 137 565 145" />
        <path d="M375 270 C445 246 508 252 565 277" />
      </g>
      {left.map((label, index) => <g key={label}><circle cx="95" cy={75 + index * 67} r="4" /><text x="108" y={81 + index * 67}>{label}</text></g>)}
      {middle.map((label, index) => <g key={label}><circle cx="345" cy={index === 0 ? 79 : index === 1 ? 163 : 270} r="4" /><text x="355" y={index === 0 ? 85 : index === 1 ? 169 : 276}>{label}</text></g>)}
      {right.map((label, index) => <g key={label}><circle cx="595" cy={79 + index * 66} r="4" /><text x="608" y={85 + index * 66}>{label}</text></g>)}
      <text x="84" y="340">A</text><text x="335" y="340">B</text><text x="585" y="340">C</text>
      <text x="215" y="46">f</text><text x="465" y="46">g</text>
    </svg>
    <figcaption>Follow f from A to B, then g from B to C. The three distinct elements of B map to x, w and z; y is not reached.</figcaption>
  </figure>;
}
