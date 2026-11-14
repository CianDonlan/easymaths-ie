import { Paper2021Diagram as Diagram, Paper2021Graph as Graph, Paper2021Table as Table } from "./Paper2021Visuals";

export function Paper2019P1Visuals({ kind }: { kind: string }) {
  const mode = kind.replace("p1-2019-", "");
  if (mode === "exponential") return <Graph id="exponential2019" title="Supplied graph f(x) = 3ˣ" description="Add the straight line g on paper using the same axes. Only the supplied exponential curve is drawn here."
    xMin={-0.5} xMax={2.5} yMin={0} yMax={16} xTicks={[-0.5, 0, 0.5, 1, 1.5, 2, 2.5]} yTicks={[0, 2, 4, 6, 8, 10, 12, 14, 16]} curves={[{ fn: (x) => 3 ** x }]} />;
  if (mode === "cubic") return <Graph id="cubic2019" title="Three x-intercepts of a cubic" description="The supplied cubic crosses at A(2,0), B and C in increasing x order. Axes are schematic and have no numerical tick labels."
    xMin={0} xMax={8} yMin={-35} yMax={45} xTicks={[]} yTicks={[]} curves={[{ fn: (x) => 2 * x ** 3 - 27 * x ** 2 + 109 * x - 126 }]} points={[{ x: 2, y: 0, label: "A(2,0)" }, { x: 4.5, y: 0, label: "B" }, { x: 7, y: 0, label: "C" }]} />;
  if (mode === "cantor") {
    const intervals = (step: number): [number, number][] => {
      let list: [number, number][] = [[0, 1]];
      for (let i = 0; i < step; i++) list = list.flatMap(([a, b]) => [[a, a + (b - a) / 3], [b - (b - a) / 3, b]] as [number, number][]);
      return list;
    };
    const labels: [number, string][][] = [[[0, "0"], [1, "1"]], [[0, "0"], [1 / 3, "1/3"], [2 / 3, "A"], [1, "1"]], [[0, "0"], [1 / 9, "1/9"], [2 / 9, "B"], [1 / 3, "1/3"], [2 / 3, "2/3"], [7 / 9, "C"], [8 / 9, "D"], [1, "1"]], [[0, "0"], [1 / 27, "1/27"], [1 / 9, "1/9"], [7 / 27, "E"], [1 / 3, "1/3"], [2 / 3, "2/3"], [25 / 27, "F"], [1, "1"]]];
    return <><Diagram id="cantor2019" title="First three steps of the Cantor construction" description="Each row retains the closed left and right thirds of every previous interval. Dots show retained endpoints; A to F identify endpoints requested in part (b).">
      {[0, 1, 2, 3].map((step) => <g key={step}>
        <text x="12" y={65 + step * 75}>{step === 0 ? "Start" : `Step ${step}`}</text>
        {intervals(step).map(([a, b]) => <g key={a}><path d={`M ${90 + 350 * a} ${60 + step * 75} H ${90 + 350 * b}`} stroke="#245c50" strokeWidth="3" /><circle cx={90 + 350 * a} cy={60 + step * 75} r="2.5" /><circle cx={90 + 350 * b} cy={60 + step * 75} r="2.5" /></g>)}
        {labels[step].map(([x, label], i) => <text key={i} x={90 + 350 * x} y={45 + step * 75 - (step === 3 && i === 1 ? 19 : 0)} textAnchor="middle">{label}</text>)}
      </g>)}
    </Diagram><Table caption="Total length removed at each step" headings={["Step", "1", "2", "3", "4", "5"]} rows={[["Removed", "1/3", "2/9", "?", "?", "?"]]} /></>;
  }
  if (mode === "window") return <Diagram id="window2019" title="Norman window: rectangle topped by a semicircle" description="The rectangle has width 2x and height y. Its top edge is the diameter of a semicircle of radius x. The dashed diameter is inside the window.">
    <path d="M 140 295 V 165 A 100 100 0 0 1 340 165 V 295 Z" fill="#edf4f0" stroke="#253b38" strokeWidth="2" />
    <path d="M 140 165 H 340 M 240 295 H 340" fill="none" stroke="#788e85" strokeDasharray="5 4" />
    <path d="M 125 165 H 110 V 295 H 125 M 240 309 V 320 H 340 V 309" fill="none" stroke="#788e85" />
    <text x="87" y="237">y</text><text x="282" y="342">x</text><text x="242" y="150">x</text><path d="M 240 165 L 311 94" stroke="#788e85" strokeDasharray="4 4" />
  </Diagram>;
  if (mode === "window-table") return <Table caption="Complete the rectangle heights" headings={["Radius x (m)", "0", "12/(2 + π)"]} rows={[["Height y (m)", "?", "?"]]} />;
  if (mode === "window-axes") return <Graph id="windowaxes2019" title="Axes for radius and rectangle height" description="Draw the required line segment on paper. The plotting axes are blank so the answer is not supplied before the attempt."
    xMin={0} xMax={2.5} yMin={0} yMax={6} xTicks={[0, 0.5, 1, 1.5, 2, 2.5]} yTicks={[0, 1, 2, 3, 4, 5, 6]} xLabel="x (m)" yLabel="y (m)" />;
  return null;
}

export function Paper2019P2Visuals({ kind }: { kind: string }) {
  const mode = kind.replace("p2-2019-", "");
  if (mode === "intercepts") return <Diagram id="intercepts2019" title="Line through two nonzero intercepts" description="The supplied schematic shows line p crossing the axes at (a,0) and (0,b). The intercept equation also applies to negative nonzero intercepts.">
    <path d="M 60 270 H 435 M 100 305 V 45 M 60 95 L 415 290" fill="none" stroke="#253b38" strokeWidth="2" />
    <text x="108" y="108">(0,b)</text><text x="350" y="296">(a,0)</text><text x="250" y="175">p</text><text x="443" y="266">x</text><text x="110" y="45">y</text>
  </Diagram>;
  if (mode === "tangent-circle") return <Diagram id="tangent2019" title="Circle tangent to both axes and line t" description="Circle s lies in the first quadrant, touching both coordinate axes. The rising line t, 3x − 4y + 6 = 0, touches the upper-left part of the circle. The centre and radius are unknown.">
    <circle cx="240" cy="180" r="100" fill="none" stroke="#253b38" />
    <path d="M 110 280 H 410 M 140 305 V 35 M 100 160 L 260 40" fill="none" stroke="#253b38" strokeWidth="2" />
    <circle cx="240" cy="180" r="3" /><text x="337" y="110">s</text><text x="105" y="142">t</text><text x="414" y="276">x</text><text x="149" y="40">y</text>
  </Diagram>;
  if (mode === "cube") return <Diagram id="cube2019" title="Two body diagonals of a cube" description="The dashed diagonals join opposite vertices through the cube centre. Find the cosine of the acute angle where they intersect; this is not a face diagonal angle.">
    <path d="M 135 105 L 275 135 L 355 80 L 215 50 Z M 135 105 V 265 L 275 295 L 355 240 V 80 M 275 135 V 305" fill="none" stroke="#253b38" strokeWidth="2" />
    <path d="M 135 105 L 355 240 M 135 265 L 355 80 M 135 265 L 215 210 L 355 240 M 215 50 V 210" fill="none" stroke="#788e85" strokeDasharray="5 4" />
    <text x="235" y="177">θ</text>
  </Diagram>;
  if (mode === "orthocentre") return <Diagram id="orthocentre2019" title="Triangle ABC for orthocentre construction" description="The triangle is obtuse at A. Reproduce it on paper and construct the altitudes, extending sides as needed. The orthocentre and construction lines are intentionally not supplied.">
    <path d="M 65 70 L 425 140 L 210 245 Z" fill="none" stroke="#253b38" strokeWidth="2" />
    <text x="47" y="63">C</text><text x="432" y="141">B</text><text x="209" y="270">A</text>
  </Diagram>;
  if (mode === "chord") return <Diagram id="chord2019" title="Diameter, parallel chord and tangent" description="AB is a vertical diameter. CD is parallel to AB and has half its length. BE is tangent at B; A,D,E are collinear. O is the centre.">
    <circle cx="155" cy="155" r="80" fill="none" stroke="#253b38" />
    <path d="M 155 75 V 235 H 432.13 M 224.28 115 V 195 M 155 155 L 224.28 115 M 155 155 L 224.28 195 M 155 75 L 432.13 235" fill="none" stroke="#253b38" strokeWidth="1.5" />
    <text x="145" y="65">A</text><text x="140" y="260">B</text><text x="130" y="160">O</text><text x="233" y="112">D</text><text x="233" y="208">C</text><text x="433" y="260">E</text><text x="72" y="95">s</text>
  </Diagram>;
  if (mode === "venn") return <Diagram id="venn2019" title="Independent events F and S" description="Inside F only is probability 1/4; the overlap is 1/5; S only is x; neither is y. The four regions together have probability one.">
    <rect x="40" y="45" width="400" height="265" fill="none" stroke="#253b38" />
    <circle cx="180" cy="170" r="100" fill="none" stroke="#253b38" /><circle cx="300" cy="170" r="100" fill="none" stroke="#253b38" />
    <text x="110" y="65">F</text><text x="355" y="65">S</text><text x="132" y="180">1/4</text><text x="225" y="180">1/5</text><text x="337" y="180">x</text><text x="405" y="287">y</text>
  </Diagram>;
  if (mode === "trough") return <Diagram id="trough2019" title="Circular-segment cross-section of the trough" description="OA = OC = OB = 90 cm. The chord AC is perpendicular to OB at D, and DB = 30 cm. The uniform trough extends 2.5 m perpendicular to this cross-section.">
    <path d="M 113.3 230 A 170 170 0 0 0 366.7 230 Z" fill="#d0e2de" stroke="#253b38" strokeWidth="2" />
    <path d="M 113.3 230 L 240 116.7 L 366.7 230 M 240 116.7 V 286.7" fill="none" stroke="#788e85" strokeDasharray="5 4" />
    <path d="M 240 220 H 250 V 230" fill="none" stroke="#253b38" />
    <text x="232" y="104">O</text><text x="91" y="232">A</text><text x="376" y="232">C</text><text x="218" y="220">D</text><text x="233" y="312">B</text><text x="133" y="158">90 cm</text><text x="258" y="263">30 cm</text><text x="305" y="325">Length 2.5 m</text>
  </Diagram>;
  if (mode === "timer") return <Diagram id="timer2019" title="Two matching halves of a sand timer" description="Each half consists of a hemisphere of radius 1.25 cm, a cylinder of height 3.5 cm, and a cone of height 1.5 cm. The upper half is initially full of sand. Cross-section schematic.">
    <path d="M 210 55 A 30 30 0 0 1 270 55 V 139 L 240 175 L 210 139 Z" fill="#d0e2de" stroke="#253b38" strokeWidth="2" />
    <path d="M 240 175 L 270 211 V 295 A 30 30 0 0 1 210 295 V 211 Z M 210 55 H 270 M 210 139 H 270 M 210 211 H 270 M 210 295 H 270" fill="none" stroke="#253b38" />
    <text x="290" y="45">r = 1.25 cm</text><text x="290" y="105">3.5 cm</text><text x="290" y="165">1.5 cm</text>
  </Diagram>;
  if (mode === "timer-cone") return <Diagram id="timercone2019" title="Small remaining cone of sand" description="The full upper cone has height 1.5 cm and top radius 1.25 cm. Its remaining sand forms a similar cone with height h and surface radius r. Two per cent of the original total sand remains.">
    <path d="M 180 195 H 300 L 240 285 Z" fill="#d0e2de" />
    <path d="M 140 135 L 240 285 L 340 135 M 240 135 V 285" fill="none" stroke="#253b38" />
    <ellipse cx="240" cy="135" rx="100" ry="16" fill="none" stroke="#253b38" /><ellipse cx="240" cy="195" rx="60" ry="10" fill="none" stroke="#788e85" />
    <path d="M 240 135 H 340 M 240 195 H 300 M 123 135 H 110 V 285 H 123 M 315 195 H 327 V 285 H 315" fill="none" stroke="#788e85" />
    <text x="255" y="118">1.25 cm</text><text x="265" y="187">r</text><text x="36" y="217">1.5 cm</text><text x="339" y="248">h</text>
  </Diagram>;
  if (mode === "helipad") {
    // Similarity-scaled coordinates from the given sides and included angle.
    const h = [125, 290], s = [415, 290], g = [125 + 150 * Math.cos(68 * Math.PI / 180), 290 - 150 * Math.sin(68 * Math.PI / 180)];
    const side = Math.hypot(g[0] - s[0], g[1] - s[1]) / 5;
    const px = (side * h[0] + 30 * s[0] + 58 * g[0]) / (side + 88);
    const py = (side * h[1] + 30 * s[1] + 58 * g[1]) / (side + 88);
    const radius = 5 * (0.5 * 58 * 30 * Math.sin(68 * Math.PI / 180)) / ((side + 88) / 2);
    return <Diagram id="helipad2019" title="Triangular ground and its incircle" description="SH = 58 m, GH = 30 m and angle GHS = 68 degrees. The helicopter pad touches all three sides and is centred at P. Radius r is perpendicular to SH.">
      <path d={`M ${h.join(" ")} L ${s.join(" ")} L ${g.join(" ")} Z`} fill="none" stroke="#253b38" strokeWidth="2" />
      <circle cx={px} cy={py} r={radius} fill="none" stroke="#245c50" /><circle cx={px} cy={py} r="3" />
      <path d={`M ${px} ${py} V 290`} stroke="#788e85" /><text x={px - 20} y={py - 10}>P</text><text x={px + 8} y={py + radius / 2}>r</text>
      <text x="105" y="315">H</text><text x="418" y="315">S</text><text x={g[0] - 10} y={g[1] - 15}>G</text><text x="250" y="320">58 m</text><text x="109" y="217">30 m</text><text x="145" y="277">68°</text>
    </Diagram>;
  }
  if (mode === "pole") return <Diagram id="pole2019" title="Vertical pole viewed from the incircle centre" description="P and S lie on the horizontal ground. ST is vertical. The angle of elevation SPT is 14 degrees. Find the ground distance PS using the incircle and angle-bisector geometry before calculating ST.">
    <path d="M 80 285 H 395 V 206.46 Z M 380 285 V 270 H 395" fill="none" stroke="#253b38" strokeWidth="2" />
    <text x="60" y="307">P</text><text x="396" y="308">S</text><text x="399" y="197">T</text><text x="125" y="276">14°</text><text x="215" y="312">PS</text>
  </Diagram>;
  return null;
}
