import { Paper2021Diagram as Diagram, Paper2021Graph as Graph, Paper2021Table as Table } from "./Paper2021Visuals";

export function Paper2017P1Visuals({ kind }: { kind: string }) {
  const mode = kind.replace("p1-2017-", "");
  if (mode === "decay") return <Table caption="Percentage remaining at the same time each day" headings={["Day", "1", "2", "3", "4"]} rows={[["Percentage (%)", 95, 42.75, 19.2375, 8.6569]]} />;
  if (mode === "squares") return <Diagram id="squares2017" title="Squares formed by joining side midpoints" description="The outer square has side 2 cm. Joining its side midpoints gives a tilted square, and joining those midpoints gives the next upright square. The process continues indefinitely.">
    <path d="M 120 55 H 360 V 295 H 120 Z M 240 55 L 360 175 L 240 295 L 120 175 Z M 180 115 H 300 V 235 H 180 Z" fill="none" stroke="#253b38" strokeWidth="2" />
    <text x="218" y="38">2 cm</text>
  </Diagram>;
  if (mode === "exponential") return <Graph id="exponential2017" title="Supplied graph g(x) = eˣ" description="Only the supplied increasing exponential is drawn. Add h(x) = e^(−x) on paper over the same domain from zero to one."
    xMin={0} xMax={1} yMin={0} yMax={3} xTicks={[0, .2, .4, .6, .8, 1]} yTicks={[0, 1, 2, 3]} curves={[{ fn: Math.exp }]} />;
  if (mode === "loan-table") return <Table caption="Complete the fixed-payment balance table (€); use 1.65% per month" headings={["Month", "Payment", "Interest", "Debt reduction", "New balance"]} rows={[[0, "—", "—", "—", "5000.00"], [1, "?", "?", "42.50", "4957.50"], [2, "?", "?", "?", "?"], [3, "?", "?", "?", "?"]]} />;
  if (mode === "tide") {
    const path = Array.from({ length: 241 }, (_, i) => { const t = -3 + 23.2 * i / 240; return `${i ? "L" : "M"} ${45 + 17 * (t + 3)} ${180 - 65 * Math.cos(.5 * t)}`; }).join(" ");
    return <Diagram id="tide2017" title="Supplied tide curve awaiting labelled axes" description="Add labelled, scaled axes on paper. P is the first morning high tide. The curve repeats through two highs and two lows; axis positions and numerical labels are intentionally left for the task.">
      <g stroke="#e0e7e3">{Array.from({ length: 21 }, (_, i) => <path key={`v${i}`} d={`M ${40 + i * 20} 45 V 305`} />)}{Array.from({ length: 14 }, (_, i) => <path key={`h${i}`} d={`M 40 ${45 + i * 20} H 440`} />)}</g>
      <path d={path} fill="none" stroke="#253b38" strokeWidth="2" /><circle cx="96" cy="115" r="3.5" /><text x="104" y="107">P</text>
    </Diagram>;
  }
  return null;
}

export function Paper2017P2Visuals({ kind }: { kind: string }) {
  const mode = kind.replace("p2-2017-", "");
  if (mode === "fuel-table" || mode === "fuel-axes") return <>
    <Table caption="Speed and fuel-efficiency data" headings={["Speed (km/h)", "40", "48", "56", "64", "88", "96", "112"]} rows={[["Efficiency (km/litre)", 21, 16, 18, 16, 13, 11, 9]]} />
    {mode === "fuel-axes" && <Graph id="fuelaxes2017" title="Blank plotting axes for the scatter and fitted line" description="Plot all seven points on paper, then draw a straight line of best fit by eye. The speed axis starts at 40 km/h; it does not start at zero."
      xMin={40} xMax={112} yMin={0} yMax={25} xTicks={[40, 48, 56, 64, 72, 80, 88, 96, 104, 112]} yTicks={[0, 5, 10, 15, 20, 25]} xLabel="Speed (km/h)" yLabel="Efficiency (km/litre)" />}
  </>;
  if (mode === "centroid") return <Diagram id="centroid2017" title="Triangle ABC and its centroid G" description="A is (0,6), C is (4,2), and G is (2/3,4/3). The median from A through G meets BC at P. B and P are deliberately not given numerical coordinate labels.">
    <path d="M 170 40 L 110 340 L 290 160 Z M 170 40 L 200 250" fill="none" stroke="#253b38" strokeWidth="2" />
    <circle cx="190" cy="180" r="3.5" /><text x="176" y="31">A(0,6)</text><text x="299" y="161">C(4,2)</text><text x="78" y="340">B</text><text x="201" y="183">G(2/3,4/3)</text><text x="208" y="260">P</text>
  </Diagram>;
  if (mode === "rectangle") return <Diagram id="rectangle2017" title="Rectangle with perpendicular segments FD and AG" description="F lies on AB and G on BC. FD and AG intersect at a right angle at E. AE = 12 cm, EG = 27 cm and FE = 5 cm. Labels show lengths of segments, not rectangle side lengths.">
    <path d="M 120 40 H 338.4 V 292 H 120 Z M 120 131 L 338.4 40 M 120 40 L 225 292" fill="none" stroke="#253b38" strokeWidth="2" />
    <path d="M 152.31 117.54 L 156.93 115.62 L 155.01 111" fill="none" stroke="#788e85" />
    <text x="99" y="34">A</text><text x="98" y="315">B</text><text x="345" y="315">C</text><text x="345" y="34">D</text><text x="99" y="137">F</text><text x="222" y="315">G</text><text x="161" y="112">E</text>
    <text x="141" y="71">12</text><text x="126" y="120">5</text><text x="185" y="212">27</text>
  </Diagram>;
  if (mode === "horizon") return <Diagram id="horizon2017" title="Tangent sight line from an elevated observer" description="A is Earth’s centre. AH is a 6371 km radius. J is 214 m above sea level along AJ, and JH is tangent to the Earth at H, hence perpendicular to AH. Height is exaggerated in the sketch.">
    <circle cx="210" cy="195" r="110" fill="none" stroke="#253b38" />
    <path d="M 210 195 H 390 L 277.22 107.93 Z" fill="none" stroke="#253b38" strokeWidth="1.8" />
    <text x="192" y="218">A</text><text x="272" y="95">H</text><text x="397" y="198">J</text><text x="167" y="129">6371 km</text><text x="323" y="226">214 m</text>
  </Diagram>;
  if (mode === "latitude") return <Diagram id="latitude2017" title="Earth’s equator and latitude circle" description="The equator lies in a plane through the centre A. The 53-degree north latitude circle lies in a parallel plane above it. Its radius is the horizontal projection of the 6371 km Earth radius.">
    <circle cx="240" cy="180" r="125" fill="none" stroke="#253b38" /><ellipse cx="240" cy="180" rx="125" ry="23" fill="none" stroke="#788e85" /><ellipse cx="240" cy="80.17" rx="75.23" ry="14" fill="none" stroke="#253b38" />
    <path d="M 240 180 H 365 M 240 180 L 315.23 80.17 H 240 V 180" fill="none" stroke="#788e85" />
    <text x="220" y="204">A</text><text x="321" y="77">C</text><text x="262" y="163">53°</text><text x="157" y="62">s₁</text><text x="125" y="173">s₂</text><text x="303" y="248">6371 km</text>
  </Diagram>;
  if (mode === "cones" || mode === "water") {
    const wet = mode === "water";
    return <Diagram id={`cones2017-${mode}`} title={wet ? "Water at depth six in cylinder and sphere" : "Two solid cones inside a cylinder, beside a sphere"} description={wet ? "Both shapes have radius 12 cm. The cylinder height is 24 cm, with the solid cones meeting halfway up. Water depth is 6 cm; its surface is an annulus around the lower cone. The sphere water surface is a disc of radius AB." : "Each cone has height R and base radius R. They meet at the cylinder midpoint, so the cylinder height is 2R. The separate hollow sphere also has radius R. Schematic cross-sections."}>
      {wet && <><path d="M 65 240 H 215 V 285 H 65 Z" fill="#d0e2de" /><path d="M 301.94 235 A 90 90 0 0 0 458.06 235 Z" fill="#d0e2de" /></>}
      <path d="M 65 105 H 215 V 285 H 65 Z" fill="none" stroke="#253b38" />
      <path d="M 65 105 L 140 195 L 215 105 Z M 65 285 L 140 195 L 215 285 Z" fill="#e2e5e2" stroke="#253b38" />
      <ellipse cx="140" cy="105" rx="75" ry="13" fill="none" stroke="#253b38" /><ellipse cx="140" cy="285" rx="75" ry="13" fill="none" stroke="#253b38" />
      <circle cx="380" cy="190" r="90" fill="none" stroke="#253b38" />
      {wet ? <><path d="M 65 240 H 215 M 140 240 H 177.5 M 301.94 235 H 458.06 M 380 190 V 280 M 380 190 L 458.06 235" fill="none" stroke="#788e85" />
        <text x="129" y="233">C</text><text x="178" y="234">D</text><text x="370" y="230">A</text><text x="455" y="228">B</text><text x="21" y="266">6 cm</text><text x="139" y="88">12 cm</text><text x="405" y="205">12</text><text x="385" y="268">6</text>
      </> : <><text x="30" y="155">R</text><text x="30" y="245">R</text><text x="170" y="90">R</text><path d="M 380 190 V 280" stroke="#788e85" /><text x="388" y="240">R</text></>}
    </Diagram>;
  }
  if (mode === "rain-tree") return <><Diagram id="rain2017" title="Rain, traffic and lateness probability tree" description="Read branches from left to right: rain R or no rain ¬R, heavy traffic T or no heavy traffic ¬T, then late L or not late ¬L. The given probabilities are shown; complete question marks and calculate all eight path probabilities on paper.">
    <path d="M 30 175 L 140 95 L 265 55 L 390 35 M 265 55 L 390 75 M 140 95 L 265 135 L 390 115 M 265 135 L 390 155 M 30 175 L 140 255 L 265 215 L 390 195 M 265 215 L 390 235 M 140 255 L 265 295 L 390 275 M 265 295 L 390 315" fill="none" stroke="#788e85" />
    <text x="120" y="87">R</text><text x="117" y="277">¬R</text><text x="260" y="47">T</text><text x="250" y="149">¬T</text><text x="260" y="207">T</text><text x="250" y="310">¬T</text>
    {[35, 75, 115, 155, 195, 235, 275, 315].map((y, i) => <text key={y} x="400" y={y + 5}>{i % 2 ? "¬L" : "L"}</text>)}
    <text x="65" y="120">1/3</text><text x="65" y="237">?</text><text x="190" y="60">1/2</text><text x="190" y="143">?</text><text x="190" y="221">1/4</text><text x="190" y="303">?</text>
    {["1/2", "?", "1/5", "?", "?", "?", "1/8", "?"].map((v, i) => <text key={i} x="320" y={30 + i * 40}>{v}</text>)}
  </Diagram><Table caption="Complete the eight full-path probabilities" headings={["Path", "Probability"]} rows={[["RTL", "?"], ["RT¬L", "?"], ["R¬TL", "?"], ["R¬T¬L", "?"], ["¬RTL", "?"], ["¬RT¬L", "?"], ["¬R¬TL", "?"], ["¬R¬T¬L", "?"]]} /></>;
  if (mode === "river") return <Diagram id="river2017" title="River bank, two observation points and vertical tree" description="C and D are on the straight near bank, with D 15 m north of C. C is due west of tree base T. E is directly above T. The angle of elevation to E is 60 degrees at C and 30 degrees at D. Perspective schematic.">
    <path d="M 85 80 V 305 M 85 265 L 370 220 V 45 L 85 265 M 85 135 L 370 220 M 85 135 L 370 45" fill="none" stroke="#253b38" strokeWidth="1.8" />
    <path d="M 95 263 L 95 253 L 85 255" stroke="#788e85" fill="none" />
    <text x="60" y="282">C</text><text x="60" y="131">D</text><text x="377" y="231">T</text><text x="378" y="42">E</text><text x="30" y="203">15 m</text><text x="115" y="244">60°</text><text x="119" y="131">30°</text><text x="391" y="139">TE</text>
  </Diagram>;
  if (mode === "fallen-tree") return <Diagram id="fallen2017" title="Limiting directions in which the tree reaches the near bank" description="Plan view: the bank is the vertical line through C. T is the fixed tree base east of C. A fallen tree of length TE can reach any bank point within the circle centred at T of radius TE. F marks a limiting contact direction; successful directions are symmetric north and south of TC.">
    <circle cx="285" cy="175" r="125" fill="none" stroke="#788e85" />
    <path d="M 212.83 35 V 320 M 285 175 H 212.83 M 285 175 L 212.83 277.06 M 285 175 L 212.83 72.94" fill="none" stroke="#253b38" strokeWidth="2" />
    <circle cx="285" cy="175" r="3" /><text x="294" y="181">T</text><text x="188" y="181">C</text><text x="188" y="291">F</text><text x="246" y="210">θ</text><text x="142" y="30">Near bank</text><text x="300" y="290">TF = TE</text>
  </Diagram>;
  return null;
}
