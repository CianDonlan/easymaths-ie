import type { ReactNode } from "react";

export function Paper2021Diagram({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
  return <figure className="geometry-visual paper2021-visual">
    <svg viewBox="0 0 480 350" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>{title}</title><desc id={`${id}-desc`}>{description}</desc>
      <rect width="480" height="350" fill="white" />{children}
    </svg><figcaption>{description}</figcaption>
  </figure>;
}

export function Paper2021Table({ caption, headings, rows }: { caption: string; headings: string[]; rows: (string | number)[][] }) {
  return <div className="study-table-wrap"><table className="study-data-table">
    <caption>{caption}</caption><thead><tr>{headings.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
    <tbody>{rows.map((row, i) => <tr key={i}>{row.map((value, j) => j === 0 ? <th key={j} scope="row">{value}</th> : <td key={j}>{value}</td>)}</tr>)}</tbody>
  </table></div>;
}

export function Paper2021Graph({ id, title, description, xMin, xMax, yMin, yMax, xTicks, yTicks, xLabel = "x", yLabel = "y", curves = [], points = [] }: {
  id: string; title: string; description: string; xMin: number; xMax: number; yMin: number; yMax: number;
  xTicks: number[]; yTicks: number[]; xLabel?: string; yLabel?: string;
  curves?: { fn: (x: number) => number; color?: string }[]; points?: { x: number; y: number; label?: string }[];
}) {
  const x = (n: number) => 65 + (n - xMin) * 345 / (xMax - xMin);
  const y = (n: number) => 275 - (n - yMin) * 220 / (yMax - yMin);
  const axisX = x(Math.max(xMin, Math.min(xMax, 0)));
  const axisY = y(Math.max(yMin, Math.min(yMax, 0)));
  return <Paper2021Diagram id={id} title={title} description={description}>
    <defs><clipPath id={`${id}-clip`}><rect x="65" y="55" width="345" height="220" /></clipPath></defs>
    <g stroke="#dce4e0" strokeWidth="1">
      {xTicks.map((t) => <path key={`x${t}`} d={`M ${x(t)} 55 V 275`} />)}
      {yTicks.map((t) => <path key={`y${t}`} d={`M 65 ${y(t)} H 410`} />)}
    </g>
    <path d={`M 65 ${axisY} H 424 M ${axisX} 289 V 42`} stroke="#253b38" fill="none" />
    <g clipPath={`url(#${id}-clip)`}>{curves.map(({ fn, color }, index) => <path key={index} d={Array.from({ length: 201 }, (_, i) => {
      const t = xMin + (xMax - xMin) * i / 200;
      return `${i === 0 ? "M" : "L"} ${x(t)} ${y(fn(t))}`;
    }).join(" ")} fill="none" stroke={color ?? "#245c50"} strokeWidth="2.2" />)}</g>
    {xTicks.map((t) => <text key={`xl${t}`} x={x(t)} y={axisY + 22} textAnchor="middle">{t}</text>)}
    {yTicks.filter((t) => t !== 0).map((t) => <text key={`yl${t}`} x={axisX - 9} y={y(t) + 5} textAnchor="end">{t}</text>)}
    {points.map((p, i) => <g key={i}><circle cx={x(p.x)} cy={y(p.y)} r="3.5" /><text x={x(p.x) + 9} y={y(p.y) - 9}>{p.label}</text></g>)}
    <text x="240" y="332" textAnchor="middle">{xLabel}</text><text x="70" y="29">{yLabel}</text>
  </Paper2021Diagram>;
}

export function Paper2021P1Visuals({ kind }: { kind: string }) {
  const mode = kind.replace("p1-2021-", "");
  if (mode === "cuboid") return <Paper2021Diagram id="cuboid2021" title="Cuboid with three adjacent face areas" description="The cuboid has width x, depth y and height z. The front xz face has area 2√2, the top xy face 4√3, and the side yz face 8√6 square cm. Schematic.">
    <path d="M 130 150 H 235 V 295 H 130 Z" fill="#edf4f0" stroke="#253b38" />
    <path d="M 130 150 L 255 55 H 360 L 235 150 Z" fill="#e0eeeb" stroke="#253b38" />
    <path d="M 235 150 L 360 55 V 200 L 235 295 Z" fill="#d0e2de" stroke="#253b38" />
    <text x="160" y="235">2√2</text><text x="235" y="111">4√3</text><text x="280" y="193">8√6</text>
    <text x="180" y="320">x</text><text x="306" y="265">y</text><text x="373" y="135">z</text>
  </Paper2021Diagram>;
  if (mode === "tangent") return <Paper2021Graph id="tangent2021" title="Sine curve and tangent at x = π/6" description="The curve h(x) = 2sin(2x) is drawn from 0 to π. A rising tangent at x = π/6 meets the vertical axis at A(0,k). All angles are in radians."
    xMin={0} xMax={Math.PI} yMin={-2.5} yMax={2.6} xTicks={[]} yTicks={[-2, 0, 2]} xLabel="x (radians)"
    curves={[{ fn: (x) => 2 * Math.sin(2 * x) }, { fn: (x) => 2 * x + Math.sqrt(3) - Math.PI / 3, color: "#79644b" }]}
    points={[{ x: Math.PI / 6, y: Math.sqrt(3), label: "x = π/6" }, { x: 0, y: Math.sqrt(3) - Math.PI / 3, label: "A(0,k)" }, { x: Math.PI, y: 0, label: "π" }]} />;
  if (mode === "derivative") return <Paper2021Graph id="derivative2021" title="Supplied derivative graph h′" description="The downward-opening quadratic h′ crosses the x-axis at −1 and 3, and the y-axis at 6. The original function h is cubic."
    xMin={-1.5} xMax={3.5} yMin={-4} yMax={9} xTicks={[-1, 0, 1, 2, 3]} yTicks={[0, 6]} curves={[{ fn: (x) => -2 * x * x + 4 * x + 6 }]} />;
  if (mode === "pendulum" || mode === "pendulum-table") return <>
    <Paper2021Diagram id="pendulum2021" title="Successive pendulum swings" description="Swing 1 covers an arc of 45 cm. Swing 2 covers 45 times 0.9 cm. The length of the pendulum is fixed; its successive swing angles decrease in the same ratio.">
      {[0, 1].map((i) => <g key={i} transform={`translate(${i * 225},0)`}>
        <path d={i === 0 ? "M 60 240 L 120 60 L 180 240 A 190 190 0 0 1 60 240" : "M 65 243 L 120 60 L 175 243 A 191 191 0 0 1 65 243"} fill="none" stroke="#253b38" strokeWidth="2" />
        <text x="120" y="115" textAnchor="middle">θ{i === 1 ? " × 0.9" : ""}</text>
        <text x="120" y="290" textAnchor="middle">Swing {i + 1}</text><text x="120" y="317" textAnchor="middle">{i === 0 ? "45 cm" : "45(0.9) cm"}</text>
      </g>)}
    </Paper2021Diagram>
    {mode === "pendulum-table" && <Paper2021Table caption="Complete the arc lengths" headings={["Swing", "1", "2", "3", "4", "5"]} rows={[["Length (cm)", 45, "?", "729/20", "?", "?"]]} />}
  </>;
  if (mode === "coaster-table") return <>
    <Paper2021Table caption="Complete the rollercoaster height table" headings={["x", "0", "10", "20", "30", "40", "50", "60", "70", "75"]} rows={[["h(x)", "?", 30, "?", "?", 21, "?", 5, "?", 21.875]]} />
    <Paper2021Graph id="coaster2021" title="Blank axes for the rollercoaster graph" description="Draw the graph on paper over x from 0 to 75 and height from 0 to 40, using your completed table." xMin={0} xMax={75} yMin={0} yMax={40} xTicks={[0, 10, 20, 30, 40, 50, 60, 70]} yTicks={[0, 10, 20, 30, 40]} xLabel="Horizontal distance (m)" yLabel="Height (m)" />
  </>;
  if (mode === "trunks") return <Paper2021Diagram id="trunks2021" title="Equal-length cylindrical trunk sections" description="The first trunk has radius 10 cm and the second radius r(10). Both sections have the same length h; compare their squared radii to compare volumes.">
    {[0, 1].map((i) => <g key={i} transform={`translate(${i * 230},0)`}>
      <path d="M 70 90 V 260 A 65 20 0 0 0 200 260 V 90" fill="#e0eeeb" stroke="#253b38" />
      <ellipse cx="135" cy="90" rx="65" ry="20" fill="#edf4f0" stroke="#253b38" />
      <path d="M 135 90 H 200 M 50 95 V 260" stroke="#253b38" fill="none" />
      <text x="142" y="79">{i === 0 ? "10 cm" : "r(10)"}</text><text x="30" y="185">h</text><text x="135" y="309" textAnchor="middle">{i === 0 ? "Initial section" : "Later section"}</text>
    </g>)}
  </Paper2021Diagram>;
  return null;
}
