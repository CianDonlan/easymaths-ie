import type { ReactNode } from "react";

function Diagram({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
  return <figure className="geometry-visual paper2022-visual">
    <svg viewBox="0 0 460 350" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>{title}</title><desc id={`${id}-desc`}>{description}</desc>
      <rect width="460" height="350" fill="white" />{children}
    </svg><figcaption>{description}</figcaption>
  </figure>;
}

function DataTable({ caption, headings, rows }: { caption: string; headings: string[]; rows: (string | number)[][] }) {
  return <div className="paper2022-table-wrap"><table className="paper2022-table">
    <caption>{caption}</caption><thead><tr>{headings.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
    <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody>
  </table></div>;
}

const cars = [[22, 34], [27, 38], [24, 34], [16, 27], [15, 24], [21, 30], [30, 40], [17, 30]];

export function Paper2022P2Visuals({ kind }: { kind: string }) {
  const mode = kind.replace("p2-2022-", "");
  if (mode === "university") return <DataTable caption="University students by age and course — complete the missing entries" headings={["Course", "23 or younger", "24 or older", "Total"]} rows={[
    ["Undergraduate", "12,785", "2922", "15,707"], ["Postgraduate", "1353", "?", "?"], ["Total", "?", "8576", "22,714"],
  ]} />;
  if (mode === "marathons") return <DataTable caption="Normally distributed marathon finishing times" headings={["Marathon", "Mean (min)", "SD (min)", "Runners", "Position"]} rows={[
    ["Windy", 254, 38, 6000, "5265th"], ["Sunny", 247, 29, 2000, "?"],
  ]} />;
  if (mode === "cars-incomplete" || mode === "cars-complete") {
    const complete = mode === "cars-complete";
    const x = (n: number) => 60 + n * 5.5;
    const y = (n: number) => 280 - n * 3.3;
    return <>
      <DataTable caption="Miles per gallon for cars A–H" headings={["Car", "City (m/g)", "Motorway (m/g)"]} rows={cars.map((row, i) => [String.fromCharCode(65 + i), ...row])} />
      <Diagram id={`cars2022-${complete ? "all" : "six"}`} title="City and motorway consumption scatterplot" description={`City miles per gallon is horizontal, from 0 to 60. Motorway miles per gallon is vertical, from 0 to 70. ${complete ? "All eight cars A–H are plotted. Draw your line of best fit on paper." : "Six cars A–F are plotted; add G and H on paper using the table."}`}>
        <g stroke="#dce4e0">{Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${x(i * 10)} ${y(70)} V 280 M 60 ${y(i * 10)} H 390`} />)}</g>
        <path d="M 60 293 V 38 M 45 280 H 410" stroke="#253b38" fill="none" />
        {cars.slice(0, complete ? 8 : 6).map(([a, b], i) => <g key={i}><circle cx={x(a)} cy={y(b)} r="4" fill="#245c50" />{i >= 6 && <text x={x(a) + 7} y={y(b) + (i === 7 ? 17 : -7)}>{String.fromCharCode(65 + i)}</text>}</g>)}
        {Array.from({ length: 7 }, (_, i) => <g key={i}><text x={x(i * 10)} y="302" textAnchor="middle">{i * 10}</text><text x="48" y={y(i * 10) + 5} textAnchor="end">{i * 10}</text></g>)}
        <text x="48" y={y(70) + 5} textAnchor="end">70</text>
        <text x="210" y="333" textAnchor="middle">City (m/g)</text><text x="63" y="27">Motorway (m/g)</text>
      </Diagram>
    </>;
  }
  if (mode === "intercept") return <Diagram id="intercept2022" title="Line l through (q,r)" description="A rising straight line l passes through (q,r) and crosses the y-axis. The diagram is schematic.">
    <path d="M 70 285 H 410 M 110 310 V 35 M 75 255 L 385 73" fill="none" stroke="#253b38" strokeWidth="2" />
    <circle cx="300" cy="123" r="4" fill="#245c50" /><circle cx="110" cy="234" r="4" fill="#245c50" />
    <text x="272" y="110">(q,r)</text><text x="388" y="65">l</text><text x="414" y="281">x</text><text x="120" y="39">y</text>
  </Diagram>;
  if (mode === "axis-circles") return <Diagram id="axiscircles2022" title="Two circles tangent to both axes" description="Both circles lie in the fourth quadrant, touch both coordinate axes, and pass through the marked point (1,−8). Schematic, not a scale drawing.">
    <path d="M 45 45 H 420 M 95 20 V 325" fill="none" stroke="#253b38" />
    <circle cx="140" cy="90" r="45" fill="none" stroke="#245c50" strokeWidth="2" />
    <circle cx="212" cy="162" r="117" fill="none" stroke="#245c50" strokeWidth="2" />
    <circle cx="104" cy="117" r="4" fill="#253b38" /><text x="12" y="123">(1,−8)</text><text x="421" y="40">x</text><text x="105" y="24">y</text>
  </Diagram>;
  if (mode === "isosceles") return <Diagram id="isosceles2022" title="Isosceles triangle with apex angle 45 degrees" description="AC equals BC. The angle at C is 45 degrees and AB is 10 times the square root of (2 minus square root of 2).">
    <path d="M 139 275 L 230 55 L 321 275 Z" fill="none" stroke="#253b38" strokeWidth="2" />
    <text x="121" y="290">A</text><text x="329" y="290">B</text><text x="225" y="44">C</text><text x="230" y="109" textAnchor="middle">45°</text>
    <text x="230" y="315" textAnchor="middle">10√(2 − √2)</text><text x="110" y="164">AC = BC</text>
  </Diagram>;
  if (mode === "circumcentre") return <Diagram id="circumcentre2022" title="Triangle XYZ for a compass and straightedge construction" description="X is at the lower left, Y at the right, and Z above them. Reproduce the triangle on paper and construct its perpendicular side bisectors.">
    <path d="M 55 260 L 400 195 L 280 100 Z" fill="none" stroke="#253b38" strokeWidth="2" />
    <text x="37" y="278">X</text><text x="407" y="200">Y</text><text x="276" y="88">Z</text>
  </Diagram>;
  if (mode === "cyclic-angles") {
    const point = (angle: number) => [230 + 125 * Math.cos(angle * Math.PI / 180), 175 - 125 * Math.sin(angle * Math.PI / 180)];
    const a = point(165), b = point(-15), c = point(-5), d = point(75);
    return <Diagram id="cyclic2022" title="Cyclic quadrilateral ABCD with diameter AB" description="A is on the left, B at the lower right, C just above B and D at the top. AB is a diameter, triangle ABD is isosceles and angle DAC is 40 degrees.">
      <circle cx="230" cy="175" r="125" fill="none" stroke="#253b38" />
      <path d={`M ${a} L ${b} L ${c} L ${d} Z M ${a} L ${c} M ${b} L ${d}`} fill="none" stroke="#253b38" strokeWidth="1.5" />
      {[["A", a], ["B", b], ["C", c], ["D", d]].map(([label, pt]) => { const [x, y] = pt as number[]; return <text key={label as string} x={x + (label === "A" ? -20 : 8)} y={y - 8}>{label as string}</text>; })}
      <text x="145" y="151">40°</text>
    </Diagram>;
  }
  if (mode === "obtuse-circle") return <Diagram id="obtuse2022" title="Obtuse triangle PQR and its circumcircle" description="P is on the left of the circle, Q at the lower right and R near the top. Angle PRQ is obtuse. The circumcentre is deliberately not marked.">
    <circle cx="230" cy="178" r="125" fill="none" stroke="#253b38" />
    <path d="M 107 156 L 353 200 L 280 63 Z" fill="none" stroke="#253b38" strokeWidth="2" />
    <text x="88" y="155">P</text><text x="360" y="207">Q</text><text x="280" y="53">R</text><text x="135" y="292">k</text>
  </Diagram>;
  if (mode === "cone-net") return <Diagram id="conenet2022" title="216-degree cloth sector forming a cone" description="The cloth is the major sector with radius OA equal to 8 cm and reflex angle BOA equal to 216 degrees. Its arc forms the cone’s base circumference.">
    <path d="M 230 145 L 350 145 A 120 120 0 1 1 133 74.5 Z" fill="#e0eeeb" stroke="#253b38" strokeWidth="2" />
    <text x="234" y="136">O</text><text x="357" y="149">A</text><text x="114" y="67">B</text>
    <text x="279" y="136">8 cm</text><text x="215" y="195">216°</text>
  </Diagram>;
  if (mode === "cut-sphere") return <Diagram id="cutsphere2022" title="Sphere with a small slice removed from its base" description="The original sphere has radius 2.7 cm. A horizontal cut below its centre leaves a circular base of area 5.4 square cm. Length l runs vertically from the top to the cut and exceeds 2.7 cm.">
    <path d="M 168 279 A 125 125 0 1 1 292 279 Z" fill="#e0eeeb" stroke="#253b38" strokeWidth="2" />
    <path d="M 230 45 V 279" stroke="#253b38" strokeDasharray="5 4" />
    <text x="239" y="165">l</text><text x="230" y="311" textAnchor="middle">Base area 5.4 cm²</text>
  </Diagram>;
  if (mode === "square-logo") return <Diagram id="squarelogo2022" title="Square ABCD with intersecting lines EC and FB" description="The square has side 30 cm. E is the midpoint of left side AB and F the midpoint of top side AD. EC and FB intersect perpendicularly at O. Triangle EBO is shaded.">
    <path d="M 110 55 H 350 V 295 H 110 Z" fill="none" stroke="#253b38" strokeWidth="2" />
    <path d="M 110 175 L 110 295 L 158 199 Z" fill="#d0e2de" />
    <path d="M 110 175 L 350 295 M 230 55 L 110 295" fill="none" stroke="#253b38" strokeWidth="2" />
    <text x="91" y="46">A</text><text x="91" y="316">B</text><text x="354" y="316">C</text><text x="355" y="46">D</text>
    <text x="90" y="177">E</text><text x="226" y="45">F</text><text x="167" y="195">O</text>
    <text x="361" y="180">30 cm</text><text x="230" y="325" textAnchor="middle">30 cm</text>
  </Diagram>;
  if (mode === "quadratic-scatter") return <Diagram id="quadraticscatter2022" title="Fuel consumption versus engine speed in a U-shaped pattern" description="The plotted values fall as engine speed rises, then rise again. They follow a curved pattern rather than a straight-line trend.">
    <path d="M 60 280 H 420 M 75 295 V 40" stroke="#253b38" fill="none" />
    {[[100, 120], [145, 165], [190, 205], [235, 220], [280, 210], [325, 175], [370, 120]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="4" fill="#245c50" />)}
    <text x="421" y="275">S</text><text x="85" y="42">F</text>
  </Diagram>;
  if (mode === "fields") return <Diagram id="fields2022" title="Two adjacent triangular fields" description="A,B,D lie on one line, with AB 30 m and BD 10 m. C is above the line, AC is 35 m and angle CAD is 50 degrees. ABC is not right-angled.">
    <path d="M 55 275 L 245 70 L 325 275 Z" fill="#e0eeeb" stroke="#253b38" />
    <path d="M 325 275 L 245 70 L 415 275 Z" fill="#d0e2de" stroke="#253b38" />
    <text x="38" y="292">A</text><text x="320" y="297">B</text><text x="419" y="292">D</text><text x="240" y="58">C</text>
    <text x="180" y="314">30 m</text><text x="357" y="314">10 m</text><text x="114" y="157">35 m</text><text x="90" y="261">50°</text>
    <text x="195" y="222">Field 1</text><text x="319" y="232">Field 2</text>
  </Diagram>;
  if (mode === "airplane" || mode === "airplane-symmetric") {
    const symmetric = mode === "airplane-symmetric";
    return <Diagram id={symmetric ? "planesymmetric2022" : "plane2022"} title="Airplane and Oscar’s lines of sight" description={symmetric ? "The airplane travels from P3 to P4 at height 10 km, crossing the vertical axis. Both points are d km from that axis. Sound travels directly from P3 to Oscar at the origin O." : "P1 is 10 km above ground and 10 km left of Oscar. Its line of sight is at 45 degrees to the vertical. P2 is slightly right of the vertical at the same height. Angle theta is measured from the positive horizontal axis to OP2. Schematic, not to scale."}>
      <path d="M 45 285 H 420 M 230 310 V 35 M 60 95 H 405" fill="none" stroke="#253b38" />
      <path d={`M 95 95 L 230 285 L ${symmetric ? 365 : 255} 95`} fill="none" stroke="#245c50" strokeWidth="2" />
      <text x="230" y="331">O</text><text x="242" y="38">y</text><text x="425" y="283">x</text>
      <circle cx="95" cy="95" r="4" fill="#253b38" /><circle cx={symmetric ? 365 : 255} cy="95" r="4" fill="#253b38" />
      <text x="74" y="78">{symmetric ? "P₃" : "P₁"}</text><text x={symmetric ? 355 : 255} y="78">{symmetric ? "P₄" : "P₂"}</text>
      {symmetric ? <><text x="159" y="86">d</text><text x="295" y="86">d</text><text x="241" y="185">10 km</text></> : <><text x="157" y="250">45°</text><text x="278" y="260">θ</text><text x="240" y="180">10 km</text></>}
    </Diagram>;
  }
  return null;
}
