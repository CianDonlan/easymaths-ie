import { Paper2021Diagram as Diagram, Paper2021Graph as Graph, Paper2021Table as Table } from "./Paper2021Visuals";

export function Paper2018P1Visuals({ kind }: { kind: string }) {
  const mode = kind.replace("p1-2018-", "");
  if (mode === "sundaram") return <Table caption="First four rows and columns of the Sieve of Sundaram" headings={["Row / column", "1", "2", "3", "4"]} rows={[[1, 4, 7, 10, 13], [2, 7, 12, 17, 22], [3, 10, 17, 24, 31], [4, 13, 22, 31, 40]]} />;
  if (mode === "cubic") return <Graph id="cubic2018" title="Supplied graphs h(x) = x and k(x) = x³" description="The rising line h and cubic k meet at three points. For the inverse drawing task, reflect the cubic in the line h on paper. The inverse curve is not supplied."
    xMin={-1.4} xMax={1.4} yMin={-1.4} yMax={1.4} xTicks={[]} yTicks={[]} curves={[{ fn: (x) => x, color: "#79644b" }, { fn: (x) => x ** 3 }]} />;
  if (mode === "typing-table" || mode === "typing-axes") return <>
    {mode === "typing-table" && <Table caption="Complete the practice times to the nearest day" headings={["Speed (wpm)", "0", "10", "20", "30", "40", "50", "60", "70"]} rows={[["Time (days)", "?", "?", "?", "?", "?", "?", "?", "?"]]} />}
    <Graph id={`typing2018-${mode}`} title="Blank axes for the two typing models" description="Plot the logarithmic practice-time curve and the straight-line model on paper. Horizontal axis: words per minute; vertical axis: days of practice."
      xMin={0} xMax={70} yMin={0} yMax={140} xTicks={[0, 10, 20, 30, 40, 50, 60, 70]} yTicks={[0, 20, 40, 60, 80, 100, 120, 140]} xLabel="Speed (wpm)" yLabel="Time (days)" />
  </>;
  if (mode === "bell") {
    const f = (x: number) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
    const path = Array.from({ length: 201 }, (_, i) => { const x = -3.3 + i * 6.6 / 200; return `${i ? "L" : "M"} ${240 + 60 * x} ${270 - 450 * f(x)}`; }).join(" ");
    const height = 450 * f(1);
    return <Diagram id="bell2018" title="Symmetric bell curve and inscribed rectangle" description="A is the y-intercept. B has x-coordinate −1; C is its reflection in the y-axis. The shaded rectangle has upper corners B,C and lower corners on the x-axis.">
      <rect x="180" y={270 - height} width="120" height={height} fill="#d0e2de" stroke="#788e85" />
      <path d="M 30 270 H 450 M 240 295 V 45" fill="none" stroke="#253b38" /><path d={path} fill="none" stroke="#245c50" strokeWidth="2" />
      <circle cx="240" cy={270 - 450 * f(0)} r="3.5" /><circle cx="180" cy={270 - height} r="3.5" /><circle cx="300" cy={270 - height} r="3.5" />
      <text x="250" y="82">A</text><text x="157" y={260 - height}>B</text><text x="309" y={260 - height}>C</text><text x="452" y="266">x</text><text x="248" y="45">y</text>
    </Diagram>;
  }
  if (mode === "sierpinski") {
    type Point = [number, number];
    const midpoint = (a: Point, b: Point): Point => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const leaves = (a: Point, b: Point, c: Point, depth: number): Point[][] => {
      if (!depth) return [[a, b, c]];
      const ab = midpoint(a, b), ac = midpoint(a, c), bc = midpoint(b, c);
      return [...leaves(a, ab, ac, depth - 1), ...leaves(ab, b, bc, depth - 1), ...leaves(ac, bc, c, depth - 1)];
    };
    return <><Diagram id="sierpinski2018" title="Sierpinski pattern, steps zero to three" description="Step zero is a filled equilateral triangle. Each following step removes the middle quarter of every filled triangle, retaining the three corner triangles. The four patterns are arranged in two rows for readability.">
      {[0, 1, 2, 3].map((n) => { const x = 55 + (n % 2) * 235, y = 25 + Math.floor(n / 2) * 165; return <g key={n}>
        {leaves([x + 72, y], [x, y + 125], [x + 144, y + 125], n).map((points, i) => <polygon key={i} points={points.map((p) => p.join(",")).join(" ")} fill="#253b38" />)}
        <text x={x + 72} y={y + 147} textAnchor="middle">Step {n}</text>
      </g>; })}
    </Diagram><Table caption="Complete the Sierpinski count and area table" headings={["Step", "0", "1", "2", "3"]} rows={[["Filled triangles", 1, "?", "?", "?"], ["Remaining area fraction", 1, "?", "9/16", "?"]]} /></>;
  }
  if (mode === "perimeter-table") return <Table caption="Total perimeter of filled triangles; original side is one unit" headings={["Step", "0", "1", "2", "3", "4"]} rows={[["Perimeter", 3, "?", "27/4", "?", "?"]]} />;
  return null;
}

function Crank({ mode }: { mode: string }) {
  if (mode === "crank-axes") return <Graph id="crankaxes2018" title="Blank axes for slider distance" description="Sketch the distance CX in centimetres against crank angle in degrees, using your completed table. No solution curve is drawn."
    xMin={0} xMax={360} yMin={0} yMax={35} xTicks={[0, 90, 180, 270, 360]} yTicks={[0, 10, 20, 30]} xLabel="α (degrees)" yLabel="CX (cm)" />;
  if (mode === "crank-positions") return <Diagram id="crankpositions2018" title="Three supplied positions of the crank and slider" description="Diagram 1 starts with C,D,O aligned and D at the leftmost circle point. Diagram 2 places D above-left of O. Diagram 3 places D below-right. Compare the small slider displacements produced by an equal one-degree rotation.">
    {[0, 60, 225].map((a, i) => {
      const ox = 125 + i * 150, oy = 180, scale = 2.7, angle = a * Math.PI / 180;
      const dx = ox - 10 * scale * Math.cos(angle), dy = oy - 10 * scale * Math.sin(angle);
      const cx = dx - scale * Math.sqrt(900 - 100 * Math.sin(angle) ** 2);
      return <g key={a}><circle cx={ox} cy={oy} r={10 * scale} fill="none" stroke="#788e85" />
        <path d={`M ${cx} ${oy} L ${dx} ${dy} L ${ox} ${oy} M ${cx} ${oy} H ${ox}`} fill="none" stroke="#253b38" />
        <circle cx={cx} cy={oy} r="2.5" /><circle cx={dx} cy={dy} r="2.5" /><circle cx={ox} cy={oy} r="2.5" />
        <text x={cx - 8} y={oy + 23}>C</text><text x={dx - 7} y={dy - 12}>D</text><text x={ox + 5} y={oy + 23}>O</text><text x={60 + 150 * i} y="265" textAnchor="middle">Diagram {i + 1}</text>
      </g>;
    })}
  </Diagram>;
  const newCrank = mode === "crank-new", angleTask = mode === "crank-angle";
  const theta = (angleTask ? 50.9373289 : newCrank ? 70 : 45) * Math.PI / 180;
  // Source-proportioned geometry for the given triangles, with X always fixed at the circle's left edge.
  const radius = newCrank ? 6.614422722 : 10, rod = newCrank ? 36 : 30;
  const ox = 360, oy = 215, scale = newCrank ? 7.5 : 7;
  const bx = newCrank ? (36 * Math.cos(10 * Math.PI / 180) - (31 + radius)) : -radius * Math.cos(theta);
  const by = newCrank ? -36 * Math.sin(10 * Math.PI / 180) : -radius * Math.sin(theta);
  const dx = ox + bx * scale, dy = oy + by * scale;
  const cx = newCrank ? ox - (31 + radius) * scale : dx - scale * Math.sqrt(rod ** 2 - (by ** 2));
  return <><Diagram id={`crank2018-${mode}`} title={newCrank ? "Crank with unknown radius" : "Crank, connecting rod and fixed reference X"} description={newCrank ? "AB is 36 cm; AX is 31 cm; angle BAO is 10 degrees. X is the leftmost circle point, and OB = OX = r. Triangle ABO is not right-angled." : angleTask ? "CD = 30 cm, OD = 10 cm, and angle DCO is 15 degrees. D lies above-left of O, selecting the acute angle COD shown." : "OD = 10 cm and CD = 30 cm. C slides on the horizontal line through O. X is the fixed leftmost circle point. Alpha is measured at O from OX to OD; the requested distance is CX."}>
    <circle cx={ox} cy={oy} r={radius * scale} fill="none" stroke="#788e85" />
    <path d={`M ${cx} ${oy} L ${dx} ${dy} L ${ox} ${oy} M ${cx} ${oy} H ${ox}`} fill="none" stroke="#253b38" strokeWidth="2" />
    <circle cx={cx} cy={oy} r="3" /><circle cx={dx} cy={dy} r="3" /><circle cx={ox} cy={oy} r="3" />
    <text x={cx - 15} y={oy + 24}>{newCrank ? "A" : "C"}</text><text x={dx - 14} y={dy - 12}>{newCrank ? "B" : "D"}</text><text x={ox + 7} y={oy + 24}>O</text>
    {!angleTask && <><circle cx={ox - radius * scale} cy={oy} r="3" /><text x={ox - radius * scale - 9} y={oy + 24}>X</text></>}
    <text x={(cx + dx) / 2 - 25} y={(oy + dy) / 2 - 13}>{newCrank ? "36 cm" : "30 cm"}</text><text x={dx + 30} y={dy + 20}>{newCrank ? "r" : "10 cm"}</text>
    <text x={angleTask || newCrank ? cx + 49 : ox - 42} y={oy - 9}>{newCrank ? "10°" : angleTask ? "15°" : "α"}</text>
    {newCrank && <><path d={`M ${cx} 260 H ${ox - radius * scale}`} stroke="#788e85" /><text x={(cx + ox - radius * scale) / 2 - 24} y="283">31 cm</text></>}
  </Diagram>
    {mode === "crank-table" && <Table caption="Complete the slider-distance table" headings={["α", "0°", "90°", "180°", "270°", "360°"]} rows={[["CX (cm)", 30, "?", "?", "?", "?"]]} />}
  </>;
}

export function Paper2018P2Visuals({ kind }: { kind: string }) {
  const mode = kind.replace("p2-2018-", "");
  if (mode.startsWith("crank")) return <Crank mode={mode} />;
  if (mode === "normal") {
    const point = (z: number) => `${240 + 60 * z} ${275 - 180 * Math.exp(-z * z / 2)}`;
    const curve = (a: number, b: number) => Array.from({ length: 121 }, (_, i) => `${i ? "L" : "M"} ${point(a + (b - a) * i / 120)}`).join(" ");
    return <Diagram id="normal2018" title="Left cumulative area is 67 per cent" description="A standard normal curve is shaded from its left tail up to positive z₁. The entire shaded area is 0.67; the mean is zero.">
      <path d={`${curve(-3.3, .44)} L 266.4 275 H 42 Z`} fill="#d0e2de" />
      <path d={curve(-3.3, 3.3)} fill="none" stroke="#245c50" strokeWidth="2" /><path d="M 30 275 H 450 M 240 275 V 95 M 266.4 275 V 112" fill="none" stroke="#788e85" />
      <text x="232" y="301">0</text><text x="268" y="301">z₁</text><text x="145" y="245">67%</text>
    </Diagram>;
  }
  if (mode === "parallel-lines" || mode === "touching-circles") {
    // AB is a normal to both lines. Small and large radii split AB in the ratio 1:4:3.
    const a = [100, 245], b = [340, 85], r = Math.hypot(b[0] - a[0], b[1] - a[1]) / 8;
    return <Diagram id={`parallel2018-${mode}`} title={mode === "touching-circles" ? "Two externally touching circles between parallel tangents" : "Perpendicular distance between parallel lines"} description={mode === "touching-circles" ? "Line m touches small circle s at A; parallel line n touches large circle t at B. AB is perpendicular to both tangents. The radii are in ratio 1:3." : "A(−2,1) lies on m. B on parallel line n is the closest point to A, so AB meets n at a right angle. Schematic."}>
      <path d="M 30 140 L 160 335 M 275 -12.5 L 450 250" fill="none" stroke="#253b38" />
      <path d="M 100 245 L 340 85" fill="none" stroke="#788e85" strokeDasharray="5 4" />
      {mode === "touching-circles" && <><circle cx="130" cy="225" r={r} fill="none" stroke="#253b38" /><circle cx="250" cy="145" r={3 * r} fill="none" stroke="#253b38" /><text x="143" y="255">s</text><text x="295" y="165">t</text></>}
      <circle cx="100" cy="245" r="3" /><circle cx="340" cy="85" r="3" /><text x="73" y="270">A</text><text x="348" y="77">B</text><text x="38" y="135">m</text><text x="290" y="32">n</text>
    </Diagram>;
  }
  if (mode === "parallel-proof") return <Diagram id="parallelproof2018" title="Parallel line through two sides of a triangle" description="D lies on AB, E lies on AC, and DE is parallel to BC. Draw the labelled diagram and the extra construction for your proof on paper.">
    <path d="M 220 45 L 65 295 H 425 Z M 158 145 H 302" fill="none" stroke="#253b38" strokeWidth="2" />
    <text x="213" y="33">A</text><text x="42" y="314">B</text><text x="432" y="314">C</text><text x="130" y="144">D</text><text x="311" y="144">E</text><text x="223" y="132">l</text><text x="90" y="202">s : t</text>
  </Diagram>;
  if (mode === "right-triangle") return <Diagram id="righttriangle2018" title="Right triangle with two parallel segments" description="A is the right-angle vertex, AX = 4 cm and AY = 3 cm. AX:XB = 1:2. XY is parallel to BC and XZ is parallel to AC.">
    <path d="M 260 60 L 44 222 H 381.5 Z M 188 114 H 300.5 M 188 114 L 269 222 M 248 69 L 257 81 L 269 72" fill="none" stroke="#253b38" strokeWidth="2" />
    <text x="254" y="45">A</text><text x="24" y="244">B</text><text x="387" y="244">C</text><text x="164" y="113">X</text><text x="309" y="114">Y</text><text x="262" y="245">Z</text><text x="190" y="72">4 cm</text><text x="298" y="77">3 cm</text>
  </Diagram>;
  if (mode === "railing") return <Diagram id="railing2018" title="Nine bars and spheres between garden walls" description="Bars A to I are equally spaced, with spheres on top. A to E increase in height; the drawing is symmetric as in the supplied sketch. The walls are 150 cm apart with clear 20 cm end gaps. Schematic, not to scale.">
    <path d="M 25 80 V 300 H 455 V 80" fill="none" stroke="#788e85" strokeWidth="8" />
    {Array.from({ length: 9 }, (_, i) => { const n = Math.min(i, 8 - i), x = 80 + i * 40, r = 9 * 1.75 ** (n / 3), y = 245 - n * 32; return <g key={i}>
      <path d={`M ${x} 300 V ${y + r}`} stroke="#788e85" strokeWidth="5" /><circle cx={x} cy={y} r={r} fill="none" stroke="#253b38" /><text x={x} y="328" textAnchor="middle">{String.fromCharCode(65 + i)}</text>
    </g>; })}
    <text x="189" y="48">150 cm</text><text x="30" y="285">20</text><text x="418" y="285">20</text>
  </Diagram>;
  if (mode === "rod") return <Diagram id="rod2018" title="Shortest rod between two sphere surfaces" description="Sphere centres lie over the bar axes. The rod is the shortest surface-to-surface segment on the centre line. Horizontal and vertical differences of the centres must both be found.">
    <path d="M 150 300 V 245 M 315 300 V 128" stroke="#788e85" strokeWidth="8" />
    <circle cx="150" cy="215" r="30" fill="none" stroke="#253b38" /><circle cx="315" cy="92" r="36.152" fill="none" stroke="#253b38" />
    <path d="M 150 215 H 315 V 92 M 150 215 L 315 92" fill="none" stroke="#788e85" strokeDasharray="5 4" />
    <path d="M 174.05 197.08 L 286.01 113.61" stroke="#253b38" strokeWidth="4" />
    <text x="141" y="328">A</text><text x="307" y="328">B</text><text x="205" y="138">Rod</text>
  </Diagram>;
  if (mode === "statements") return <Table caption="Classify each statement: Always, Sometimes or Never true" headings={["Statement", "Your classification"]} rows={[["1. Higher confidence → wider interval (fixed n,p̂)", "?"], ["2. Higher p̂ → higher standard error (fixed n)", "?"], ["3. Higher p̂(1−p̂) → higher standard error (fixed n)", "?"], ["4. Larger n → higher standard error (fixed p̂)", "?"]]} />;
  return null;
}
