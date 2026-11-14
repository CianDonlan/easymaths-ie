import { Paper2021Diagram } from "./Paper2021Visuals";

export function Paper2021P2Visuals({ kind }: { kind: string }) {
  const mode = kind.replace("p2-2021-", "");
  if (mode === "section-triangle") return <Paper2021Diagram id="sectiontriangle2021" title="Triangle ABC with a horizontal section DE" description="A is (4,2), C is (16,11), and B is to the right on a horizontal base of length 33. D lies on AC with AD:DC = 2:1. The horizontal through D meets CB at E.">
    <path d="M 65 270 L 185 90 L 395 270 Z M 145 150 H 255" fill="none" stroke="#253b38" strokeWidth="2" />
    <text x="32" y="297">A(4,2)</text><text x="140" y="73">C(16,11)</text><text x="400" y="289">B</text>
    <text x="125" y="144">D</text><text x="258" y="144">E</text><text x="230" y="312">AB = 33</text>
  </Paper2021Diagram>;
  if (mode === "chord") {
    const x = (a: number) => 212 + 18 * a;
    const y = (b: number) => 169 - 18 * b;
    const a = [3 - 4 * Math.sqrt(3 / 5), 2 + 2 * Math.sqrt(3 / 5)];
    const b = [3 + 4 * Math.sqrt(3 / 5), 2 - 2 * Math.sqrt(3 / 5)];
    return <Paper2021Diagram id="chord2021" title="Circle centre and chord midpoint" description="The circle centre is C(1,−2) and the midpoint of chord AB is D(3,2). AB has length 4√3. CD is drawn to the chord midpoint.">
      <circle cx={x(1)} cy={y(-2)} r={18 * Math.sqrt(32)} fill="none" stroke="#253b38" />
      <path d={`M ${x(a[0])} ${y(a[1])} L ${x(b[0])} ${y(b[1])} M ${x(1)} ${y(-2)} L ${x(3)} ${y(2)}`} fill="none" stroke="#253b38" />
      <circle cx={x(1)} cy={y(-2)} r="3" /><circle cx={x(3)} cy={y(2)} r="3" />
      <text x={x(a[0]) - 20} y={y(a[1]) - 4}>A</text><text x={x(b[0]) + 8} y={y(b[1])}>B</text>
      <text x={x(1) - 70} y={y(-2) + 25}>C(1,−2)</text><text x={x(3) + 8} y={y(2) - 8}>D(3,2)</text>
      <text x="255" y="92">AB = 4√3</text>
    </Paper2021Diagram>;
  }
  if (mode === "double-cone") return <Paper2021Diagram id="doublecone2021" title="Two cones inside a sphere" description="Identical cones meet along a common equatorial base. Their vertices are the top and bottom poles of the sphere. The sphere radius is both the cone base radius and each cone’s height.">
    <circle cx="240" cy="175" r="125" fill="none" stroke="#253b38" />
    <path d="M 115 175 L 240 50 L 365 175 L 240 300 Z" fill="#e0eeeb" fillOpacity="0.6" stroke="#253b38" />
    <ellipse cx="240" cy="175" rx="125" ry="17" fill="none" stroke="#253b38" strokeDasharray="4 4" />
    <path d="M 240 50 V 300 M 240 175 H 365" fill="none" stroke="#788e85" strokeDasharray="4 4" />
    <text x="250" y="110">R</text><text x="300" y="168">R</text><text x="250" y="245">R</text>
  </Paper2021Diagram>;
  if (mode === "similar-triangles") return <Paper2021Diagram id="similartriangles2021" title="Corresponding vertices in two similar triangles" description="Triangles ABC and A′B′C′ have equal corresponding angles. Draw your auxiliary points and parallel lines on paper to prove the side ratios.">
    <path d="M 70 70 L 205 270 H 45 Z M 300 150 L 381 270 H 285 Z" fill="none" stroke="#253b38" strokeWidth="2" />
    <text x="62" y="55">A</text><text x="210" y="288">B</text><text x="23" y="288">C</text>
    <text x="295" y="136">A′</text><text x="385" y="288">B′</text><text x="263" y="288">C′</text>
  </Paper2021Diagram>;
  if (mode === "parallel-proof") return <Paper2021Diagram id="parallelproof2021" title="Three parallel lines crossed by transversals" description="P and A lie on the top parallel, H and K on the middle, and B,Q,C,R on the bottom in that order. A,H,B are collinear; P,H,Q are collinear; P,K,R and A,K,C are also collinear. All three horizontal lines are parallel.">
    <path d="M 70 80 H 385 M 65 231 H 425 M 35 290 H 460 M 50 290 L 290 80 L 395 290 M 105 290 L 150 80 L 450 290" fill="none" stroke="#253b38" strokeWidth="1.7" />
    <text x="140" y="68">P</text><text x="286" y="68">A</text><text x="98" y="225">H</text><text x="371" y="225">K</text>
    <text x="38" y="312">B</text><text x="98" y="312">Q</text><text x="389" y="312">C</text><text x="448" y="312">R</text>
  </Paper2021Diagram>;
  if (mode === "triathlon" || mode === "tower") {
    const tower = mode === "tower";
    const offset = tower ? 60 : 0;
    return <Paper2021Diagram id={tower ? "triathlontower2021" : "triathlon2021"} title={tower ? "Camera tower above the triathlon course" : "Triangular triathlon course"} description={tower ? "A tower AT rises vertically from A. B is 30 km from A along level ground. The angle of elevation of T from B is 0.05 degrees. Schematic, not to scale." : "The course runs from C to B by swimming, B to A by cycling, and A to C by running. CB is 4 km, CA is 28 km, and the cycling leg takes 1.2 hours at 25 km/h. The angle at C is obtuse."}>
      <path d={`M 50 ${50 + offset} L 430 ${240 + offset} L 423 ${184 + offset} Z`} fill="#e0eeeb" stroke="#253b38" strokeWidth="1.5" />
      <text x="30" y={45 + offset}>A</text><text x="438" y={256 + offset}>B</text><text x="438" y={179 + offset}>C</text>
      {tower ? <><path d="M 50 110 V 40 L 430 300" fill="none" stroke="#253b38" /><text x="30" y="36">T</text><text x="15" y="83">AT</text><text x="310" y="273">0.05°</text></> : <><text x="246" y="105">28 km run</text><text x="330" y="215">4 km swim</text><text x="120" y="210">Cycle: 25 km/h for 1.2 h</text></>}
    </Paper2021Diagram>;
  }
  if (mode === "flight") return <Paper2021Diagram id="flight2021" title="Plane route turning south of east" description="A to B is due east. At B the plane turns 20 degrees south of east toward C. The direct A-to-C distance is 1450 km and angle BAC is 8.57 degrees. The marked 20 degrees is outside triangle ABC.">
    <path d="M 50 100 H 270 L 425 157 Z" fill="none" stroke="#253b38" strokeWidth="2" />
    <path d="M 270 100 H 440" stroke="#788e85" strokeDasharray="5 4" />
    <text x="34" y="91">A</text><text x="264" y="90">B</text><text x="432" y="178">C</text>
    <text x="120" y="120">8.57°</text><text x="310" y="121">20°</text><text x="202" y="169">1450 km</text><text x="115" y="70">East →</text>
  </Paper2021Diagram>;
  if (mode === "voltage-axes") return <Paper2021Diagram id="voltageaxes2021" title="Blank axes for one voltage cycle" description="Sketch one period on paper. Use p = 1/60 second horizontally and extrema ±110√2 volts vertically. Quarter-period guide lines are shown; the answer curve is not supplied.">
    <g stroke="#dce4e0">{[90, 170, 250, 330, 410].map((x) => <path key={x} d={`M ${x} 55 V 275`} />)}<path d="M 90 65 H 410 M 90 265 H 410" /></g>
    <path d="M 75 165 H 430 M 90 287 V 40" stroke="#253b38" fill="none" />
    {["0", "p/4", "p/2", "3p/4", "p"].map((label, i) => <text key={label} x={90 + i * 80} y="189" textAnchor="middle">{label}</text>)}
    <text x="80" y="68" textAnchor="end">110√2</text><text x="80" y="270" textAnchor="end">−110√2</text>
    <text x="95" y="28">Voltage (V)</text><text x="250" y="323" textAnchor="middle">Time (s); p = 1/60 s</text>
  </Paper2021Diagram>;
  return null;
}
