import { Paper2021Diagram, Paper2021Graph, Paper2021Table } from "./Paper2021Visuals";

export function Paper2020P1Visuals({ kind }: { kind: string }) {
  const mode = kind.replace("p1-2020-", "");
  if (mode === "cubic-line") return <Paper2021Graph id="cubicline2020" title="Cubic f and line g through its turning points" description="The supplied cubic rises to a turning point, falls to another turning point, then rises. The downward-sloping straight line g passes through both turning points. Axes are schematic."
    xMin={-1} xMax={8} yMin={-25} yMax={25} xTicks={[]} yTicks={[]}
    curves={[{ fn: (x) => x ** 3 - 9 * x * x + 15 * x + 8 }, { fn: (x) => -8 * x + 23, color: "#79644b" }]} />;
  if (mode === "log-area") {
    const points = Array.from({ length: 101 }, (_, i) => `${65 + 3 * i} ${270 - 600 / (2 * 0.12 * i + 3)}`);
    const curve = `M ${points[0]} ${points.slice(1).map((p) => `L ${p}`).join(" ")}`;
    return <Paper2021Diagram id="logarea2020" title="Shaded area under h′" description="The positive decreasing curve h′(x) = 1/(2x + 3) bounds a shaded region above the x-axis from 0 to an unknown A. The shaded area is ln 3 square units.">
      <path d={`${curve} L 365 270 H 65 Z`} fill="#d0e2de" />
      <path d="M 45 270 H 425 M 65 290 V 40 M 365 270 V 235" stroke="#253b38" fill="none" />
      <path d={curve} fill="none" stroke="#245c50" strokeWidth="2" />
      <text x="52" y="294">0</text><text x="360" y="295">A</text><text x="429" y="266">x</text><text x="75" y="42">y</text>
      <text x="120" y="110">h′(x)</text><text x="215" y="242">Area = ln 3</text>
    </Paper2021Diagram>;
  }
  if (mode === "triangular-table") return <>
    <Paper2021Diagram id="triangular2020" title="The first three triangular dot patterns" description="Pattern 1 has one dot; pattern 2 has rows of one and two; pattern 3 has rows of one, two and three. Each next triangular number adds a new row.">
      {[1, 2, 3].map((n, i) => <g key={n} transform={`translate(${i * 150 + 80},65)`}>
        {Array.from({ length: n }, (_, row) => Array.from({ length: row + 1 }, (_, j) => <circle key={`${row}-${j}`} cx={(j - row / 2) * 25} cy={row * 25 + 65} r="7" />))}
        <text x="0" y="180" textAnchor="middle">T{n} = {n * (n + 1) / 2}</text>
      </g>)}
    </Paper2021Diagram>
    <Paper2021Table caption="Complete the next five triangular numbers" headings={["Term", "T₁", "T₂", "T₃", "T₄", "T₅", "T₆", "T₇", "T₈"]} rows={[["Number", 1, 3, 6, "?", "?", "?", "?", "?"]]} />
  </>;
  if (mode === "rectangle-circle") return <Paper2021Diagram id="rectanglecircle2020" title="Rectangle inscribed in a radius-five circle" description="The circle is centred at O. The rectangle sides are parallel to the coordinate axes. Its first-quadrant corner is R(x,y), and OR makes angle theta with the positive x-axis. The supplied rectangle is not a square.">
    <circle cx="235" cy="175" r="125" fill="none" stroke="#253b38" />
    <path d="M 160 75 H 310 V 275 H 160 Z" fill="#edf4f0" stroke="#253b38" />
    <path d="M 80 175 H 395 M 235 325 V 30 M 235 175 L 310 75" fill="none" stroke="#253b38" />
    <text x="316" y="68">R(x,y)</text><text x="216" y="197">O</text><text x="270" y="117">5</text><text x="251" y="161">θ</text>
    <text x="400" y="172">x</text><text x="244" y="34">y</text>
  </Paper2021Diagram>;
  if (mode === "shadow") return <Paper2021Diagram id="shadow2020" title="Streetlight, approaching person and shadow" description="A vertical streetlight is 5 m high. A 2 m person walks toward it at 1.5 m/s. The horizontal light-to-person distance is l and the shadow extends x beyond the person.">
    <path d="M 70 270 V 70 L 420 270 M 280 270 V 190 M 55 270 H 440" fill="none" stroke="#253b38" strokeWidth="2" />
    <path d="M 280 174 H 220 L 229 169 M 70 292 H 280 M 280 292 H 420" stroke="#788e85" fill="none" />
    <text x="30" y="170">5 m</text><text x="289" y="233">2 m</text><text x="214" y="158">1.5 m/s</text>
    <text x="173" y="316">l</text><text x="345" y="316">x</text>
  </Paper2021Diagram>;
  return null;
}

export function Paper2020P2Visuals({ kind }: { kind: string }) {
  const mode = kind.replace("p2-2020-", "");
  if (mode === "line-angle") return <Paper2021Diagram id="lineangle2020" title="Acute angle between two lines" description="Line a has equation x − 2y + 1 = 0. The steeper line b makes 60 degrees with the positive horizontal axis. Theta marks the acute difference between their inclinations.">
    <path d="M 35 270 H 445 M 80 305 V 40 M 30 275 L 440 70 M 245 296 L 400 28" fill="none" stroke="#253b38" strokeWidth="1.8" />
    <text x="417" y="67">a</text><text x="400" y="25">b</text><text x="353" y="99">θ</text><text x="276" y="252">60°</text>
    <text x="448" y="265">x</text><text x="90" y="43">y</text>
  </Paper2021Diagram>;
  if (mode === "tangent-circle") return <Paper2021Diagram id="tangentcircle2020" title="Tangent segment from an external point" description="The circle has centre A. The line through B(5,8) touches it at T. Radius AT is perpendicular to the tangent BT. Schematic.">
    <circle cx="250" cy="230" r="60" fill="none" stroke="#253b38" />
    <path d="M 148 266 L 310 50" fill="none" stroke="#253b38" strokeWidth="2" />
    <path d="M 250 230 L 202 194" fill="none" stroke="#788e85" strokeDasharray="4 4" />
    <circle cx="250" cy="230" r="3.5" /><circle cx="202" cy="194" r="3.5" /><circle cx="310" cy="50" r="3.5" />
    <text x="260" y="247">A</text><text x="177" y="192">T</text><text x="321" y="54">B(5,8)</text><text x="300" y="279">c</text>
  </Paper2021Diagram>;
  if (mode === "inclined-pole") return <Paper2021Diagram id="inclinedpole2020" title="Flagpole on five-degree inclined ground" description="E,F,G lie uphill on a five-degree incline, with EF 6 m. GH is vertical. The sight lines EH and FH have elevations of 35 and 52 degrees from the horizontal, not from the slope. Schematic.">
    <path d="M 50 290 L 382 261 V 58 Z M 211.4 275.9 L 382 58" fill="none" stroke="#253b38" strokeWidth="1.8" />
    <path d="M 50 290 H 405 M 211.4 275.9 H 340" stroke="#9aaa9f" strokeDasharray="4 4" />
    <text x="31" y="310">E</text><text x="204" y="302">F</text><text x="389" y="271">G</text><text x="382" y="47">H</text>
    <text x="122" y="264">6 m</text><text x="85" y="269">35°</text><text x="239" y="252">52°</text><text x="315" y="308">Incline 5°</text>
  </Paper2021Diagram>;
  if (mode === "nested-circles") return <Paper2021Diagram id="nestedcircles2020" title="Internally tangent circles and two tangent rays" description="The large circle is centred at O. Its rays OA and OB form 60 degrees and are tangent to a smaller circle of centre D and radius r. The circles touch internally at C, on the ray OD.">
    <circle cx="240" cy="175" r="125" fill="none" stroke="#253b38" />
    <circle cx={240 + 125 * Math.sqrt(3) / 3} cy={175 - 125 / 3} r={125 / 3} fill="none" stroke="#245c50" />
    <path d="M 365 175 H 240 L 302.5 66.75 M 240 175 L 348.25 112.5 M 312.17 133.33 V 175" fill="none" stroke="#253b38" />
    <text x="220" y="195">O</text><text x="374" y="181">A</text><text x="307" y="57">B</text><text x="354" y="109">C</text><text x="298" y="128">D</text>
    <text x="262" y="163">60°</text><text x="321" y="159">r</text>
  </Paper2021Diagram>;
  if (mode === "shaded-sector") return <Paper2021Diagram id="shadedsector2020" title="Sector minus an unshaded triangle" description="OAB is a radius-seven sector with angle BOA 1.2 radians. C lies on OB. The shaded region bounded by arc BA, line AC and segment CB has area 21 square cm. AC is not assumed perpendicular to OB.">
    <path d="M 170 275 A 200 200 0 0 1 297.528 88.592 L 296.429 275 Z" fill="#d0e2de" stroke="#253b38" />
    <path d="M 170 275 H 370 L 297.528 88.592" fill="none" stroke="#253b38" strokeWidth="1.8" />
    <text x="298" y="78">A</text><text x="151" y="294">B</text><text x="290" y="297">C</text><text x="377" y="296">O</text>
    <text x="208" y="202">21 cm²</text><text x="327" y="259">1.2</text><text x="239" y="320">7 cm</text><text x="347" y="181">7 cm</text>
  </Paper2021Diagram>;
  if (mode === "spinner") return <Paper2021Diagram id="spinner2020" title="Four equally likely sectors labelled one, one, three, two" description="A circular spinner has four equal quadrants. Both top quadrants are labelled 1; the bottom left is 3 and bottom right is 2. Each sector has probability one quarter.">
    <circle cx="240" cy="175" r="115" fill="none" stroke="#253b38" />
    <path d="M 125 175 H 355 M 240 60 V 290 M 240 175 L 319 223 L 305 222 M 319 223 L 311 211" stroke="#253b38" fill="none" strokeWidth="2" />
    <circle cx="240" cy="175" r="4" /><text x="183" y="126">1</text><text x="291" y="126">1</text><text x="183" y="240">3</text><text x="291" y="240">2</text>
  </Paper2021Diagram>;
  if (mode === "car-table") return <Paper2021Table caption="Fuel groups and Volkswagen shares within each group" headings={["Fuel type", "Share of all cars", "VW within group"]} rows={[["Diesel", "30%", "70%"], ["Petrol", "60%", "25%"], ["Hybrid/electric", "10%", "9%"]]} />;
  if (mode === "cup" || mode === "cup-fill" || mode === "cup-new-fill") {
    const fill = mode !== "cup";
    const newFill = mode === "cup-new-fill";
    const level = newFill ? 111.5 : 106.3;
    const radius = 86.7 * (300 - level) / 220;
    return <Paper2021Diagram id={`cup2020-${mode}`} title="Right circular conical cup" description={fill ? `The cup points downward, with top radius 3.3 cm and full vertical height about 8.37 cm. Fill line F is ${newFill ? "an unknown vertical distance x" : "one centimetre"} below the rim. The radius at the water surface is smaller than the rim radius.` : "The open conical cup has top radius 3.3 cm and slant height 9 cm. Its vertical axis runs from the rim centre to the tip."}>
      {fill && <path d={`M ${240 - radius} ${level} L 240 300 L ${240 + radius} ${level} Z`} fill="#e0eeeb" />}
      <path d="M 153.3 80 L 240 300 L 326.7 80" fill="none" stroke="#253b38" strokeWidth="2" />
      <ellipse cx="240" cy="80" rx="86.7" ry="14" fill="none" stroke="#253b38" />
      <path d="M 240 80 H 326.7 M 240 80 V 300" stroke="#788e85" fill="none" strokeDasharray="4 4" />
      <text x="258" y="65">3.3 cm</text><text x="318" y="192">9 cm</text>
      {fill && <><ellipse cx="240" cy={level} rx={radius} ry="12" fill="none" stroke="#788e85" strokeDasharray="4 4" /><text x={250 + radius} y={level + 6}>F</text><text x="104" y="104">{newFill ? "x" : "1 cm"}</text><path d={`M 145 80 H 128 V ${level} H 145`} fill="none" stroke="#788e85" /></>}
    </Paper2021Diagram>;
  }
  if (mode === "cup-net") return <Paper2021Diagram id="cupnet2020" title="Sector-shaped net of the cup" description="The net is a circular sector of radius 9 cm. Its curved arc becomes the cup rim of circumference 2π times 3.3 cm. Theta is the sector angle to be found.">
    <path d="M 160 170 L 160 310 A 140 140 0 0 0 264.04 76.32 Z" fill="#e0eeeb" stroke="#253b38" strokeWidth="2" />
    <text x="134" y="250">9 cm</text><text x="186" y="189">θ</text>
  </Paper2021Diagram>;
  if (mode === "normal-95") {
    const point = (z: number) => `${240 + z * 60} ${270 - 180 * Math.exp(-z * z / 2)}`;
    const path = (a: number, b: number) => Array.from({ length: 121 }, (_, i) => `${i === 0 ? "M" : "L"} ${point(a + (b - a) * i / 120)}`).join(" ");
    return <Paper2021Diagram id="normalbounds2020" title="Standard normal curve with marked z cutoffs" description="The standard normal curve is centred at zero. Vertical boundaries mark z = −1.96 and z = 1.96. Interpret the central shaded probability and the two remaining tail probabilities.">
      <path d={`${path(-1.96, 1.96)} L ${240 + 1.96 * 60} 270 H ${240 - 1.96 * 60} Z`} fill="#d0e2de" />
      <path d={path(-3.3, 3.3)} fill="none" stroke="#245c50" strokeWidth="2" />
      <path d="M 35 270 H 445" stroke="#253b38" />
      {[-1.96, 0, 1.96].map((z) => <text key={z} x={240 + z * 60} y="300" textAnchor="middle">{z}</text>)}
      <text x="450" y="271">z</text>
    </Paper2021Diagram>;
  }
  if (mode === "ordered-table") return <Paper2021Table caption="Find the eight ordered whole numbers" headings={["Position", "A", "B", "C", "D", "E", "F", "G", "H"]} rows={[["Number", "?", "?", "?", "?", "?", "?", 23, "?"]]} />;
  if (mode === "ships") return <Paper2021Diagram id="ships2020" title="Ships departing perpendicular routes" description="Port A lies 90 km west of Port B. Ship A sails east at 15 km/h, while Ship B sails south at 30 km/h. Both leave simultaneously.">
    <path d="M 70 90 H 390 M 70 112 H 155 L 146 107 M 155 112 L 146 117 M 390 90 V 280 L 385 270 M 390 280 L 395 270" fill="none" stroke="#253b38" strokeWidth="2" />
    <circle cx="70" cy="90" r="3.5" /><circle cx="390" cy="90" r="3.5" />
    <text x="51" y="76">A</text><text x="385" y="76">B</text><text x="207" y="73">90 km</text>
    <text x="82" y="143">15 km/h east</text><text x="275" y="200">30 km/h south</text>
  </Paper2021Diagram>;
  return null;
}
