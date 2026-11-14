import { useState } from "react";

const heights = [2, 1.5, 1, 0.5];

function CoverSketch({ count, x, y, scale }: { count: number; x: number; y: number; scale: number }) {
  const width = 2 * scale;
  const height = 8 * scale;
  return <g>
    {Array.from({ length: count }, (_, index) => {
      const bandHeight = height / count;
      const bandWidth = width * (count - index) / count;
      return <rect key={index} x={x + (width - bandWidth) / 2} y={y + height - (index + 1) * bandHeight}
        width={bandWidth} height={bandHeight} fill="#e3f0e8" stroke="#207e4c" strokeWidth="1.4" />;
    })}
    <path d={`M ${x} ${y + height} L ${x + width / 2} ${y} L ${x + width} ${y + height}`} fill="none" stroke="#263c34" strokeWidth="1.8" />
  </g>;
}

export function RectangleCover2023Diagram({ interactive = false }: { interactive?: boolean }) {
  const [widths, setWidths] = useState<(number | null)[]>([null, null, null, null]);
  return <figure className="geometry-visual rectangle-cover-2023">
    <svg viewBox="0 0 520 180" role="img" aria-label="The first three rectangle covers T1, T2 and T3 of a triangle with base 2 and height 8">
      <rect width="520" height="180" fill="white" />
      {[1, 2, 3].map((count, index) => <g key={count}>
        <CoverSketch count={count} x={75 + index * 160} y={19} scale={14} />
        <text x={89 + index * 160} y="156" textAnchor="middle">T{count}</text>
      </g>)}
    </svg>
    <figcaption>Each shape uses equal-height rectangles that just cover the triangle. The triangle has base 2 units and height 8 units.</figcaption>
    {interactive && <div className="rectangle-cover-pad">
      <p>Build T4: choose a width for each of its four equal-height bands, starting at the bottom. This sketch is ungraded.</p>
      <svg viewBox="0 0 400 325" role="img" aria-label="Your T4 rectangle cover on the triangle">
        <rect width="400" height="325" fill="white" />
        {[0, 1, 2, 3].map((index) => {
          const bandWidth = widths[index];
          const y = 260 - index * 60;
          return <g key={index}>
            <line x1="65" x2="335" y1={y} y2={y} stroke="#d9dfd8" strokeDasharray="3 4" />
            {bandWidth !== null && <rect x={200 - bandWidth * 50} y={y - 60} width={bandWidth * 100} height="60" fill="#e3f0e8" stroke="#207e4c" strokeWidth="2" />}
          </g>;
        })}
        <path d="M 100 260 L 200 20 L 300 260 Z" fill="none" stroke="#263c34" strokeWidth="2" />
        <text x="202" y="297" textAnchor="middle">base 2</text>
        <text x="53" y="144">8</text>
        <text x="202" y="317" textAnchor="middle">T4</text>
      </svg>
      <div className="rectangle-cover-controls">
        {widths.map((width, index) => <label key={index}>Band {index + 1} (bottom to top)
          <select value={width ?? ""} onChange={(event) => setWidths((current) => current.map((value, position) => position === index ? (event.target.value ? Number(event.target.value) : null) : value))}>
            <option value="">Choose width</option>
            {heights.map((option) => <option key={option} value={option}>{option} units</option>)}
          </select>
        </label>)}
      </div>
    </div>}
  </figure>;
}

export function PyramidSection2023Diagram() {
  return <figure className="geometry-visual pyramid-section-2023">
    <svg viewBox="0 0 440 310" role="img" aria-labelledby="pyramid-section-2023-title pyramid-section-2023-desc">
      <title id="pyramid-section-2023-title">Square based pyramid with a horizontal cross section</title>
      <desc id="pyramid-section-2023-desc">The pyramid has height h and square base side c. A horizontal square lies x units down from the apex.</desc>
      <rect width="440" height="310" fill="white" />
      <path d="M 220 28 L 80 230 L 220 275 L 360 230 Z" fill="#f4f7ee" stroke="#263c34" strokeWidth="2" />
      <path d="M 220 28 L 220 190 M 220 28 L 220 275" stroke="#7e8e85" strokeDasharray="5 5" />
      <path d="M 80 230 L 220 190 L 360 230" fill="none" stroke="#263c34" strokeWidth="2" />
      <path d="M 166 106 L 220 88 L 274 106 L 220 124 Z" fill="#b9ddc5" stroke="#207e4c" strokeWidth="2" />
      <line x1="220" y1="28" x2="220" y2="106" stroke="#207e4c" strokeWidth="2" />
      <text x="229" y="70">x</text><text x="227" y="183">h</text><text x="135" y="270">c</text><text x="303" y="272">c</text>
    </svg>
    <figcaption>The horizontal square is x units below the apex. The pyramid has perpendicular height h and square base side c. Sketch not to scale.</figcaption>
  </figure>;
}
