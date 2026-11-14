export function WiperDiagram({ adjusted = false }: { adjusted?: boolean }) {
  const originY = adjusted ? 343.6 : 360;
  const outerRadius = adjusted ? 283.6 : 300;
  const edgeY = originY - Math.sqrt(outerRadius ** 2 - 225 ** 2);
  const innerOffset = 225 * (originY - 310) / (originY - edgeY);
  const innerRadius = Math.hypot(innerOffset, originY - 310);
  const leftInner = 300 - innerOffset;
  const rightInner = 300 + innerOffset;
  const leftLabel = adjusted ? "E′" : "B′";
  const rightLabel = adjusted ? "E" : "B";
  const leftBase = adjusted ? "D′" : "A′";
  const rightBase = adjusted ? "D" : "A";
  return <figure className="geometry-visual paper2024-p2-wiper">
    <svg viewBox="0 0 600 405" role="img" aria-labelledby={adjusted ? "wiper-adjusted-title wiper-adjusted-desc" : "wiper-original-title wiper-original-desc"}>
      <title id={adjusted ? "wiper-adjusted-title" : "wiper-original-title"}>{adjusted ? "Adjusted wiper sweep in the windscreen" : "Original wiper sweep in the windscreen"}</title>
      <desc id={adjusted ? "wiper-adjusted-desc" : "wiper-original-desc"}>{adjusted
        ? "The windscreen is 180 centimetres wide and 100 high. E prime and E sit on its left and right edges, with O below the bottom centre. OE prime and OE are equal radii. The angle E prime O E is 105 degrees."
        : "The windscreen is 180 centimetres wide and 100 high. M and N mark its bottom and top midpoints. O is 20 centimetres below M. The blade rotates about O between B prime on the left and B on the right; its cleaned area lies between two circular arcs."}</desc>
      <rect width="600" height="405" fill="white" />
      <rect x="75" y="60" width="450" height="250" fill="#fff" stroke="#1d2b27" strokeWidth="2" />
      <path className="wiper-cleaned" d={`M 75 ${edgeY} A ${outerRadius} ${outerRadius} 0 0 1 525 ${edgeY} L ${rightInner} 310 A ${innerRadius} ${innerRadius} 0 0 0 ${leftInner} 310 Z`} />
      <line className="wiper-radius" x1="300" y1={originY} x2="75" y2={edgeY} />
      <line className="wiper-radius" x1="300" y1={originY} x2="525" y2={edgeY} />
      <line className="geometry-guide" x1="300" y1="60" x2="300" y2={originY} />
      {adjusted && <line className="wiper-chord" x1="75" y1={edgeY} x2="525" y2={edgeY} />}
      {!adjusted && <><line className="geometry-guide" x1="525" y1="310" x2="525" y2="360" /><line className="wiper-radius" x1="300" y1="360" x2="525" y2="360" /></>}
      <circle cx="300" cy="60" r="3.5" /><circle cx="300" cy="310" r="3.5" /><circle cx="300" cy={originY} r="3.5" />
      <text x="62" y="325">P</text><text x="530" y="325">Q</text><text x="62" y="55">S</text><text x="530" y="55">R</text>
      <text x="304" y="53">N</text><text x="304" y="304">M</text><text x="289" y="385">O</text>
      <text x="49" y={edgeY + 7}>{leftLabel}</text><text x="530" y={edgeY + 7}>{rightLabel}</text>
      <text x={leftInner - 20} y="330">{leftBase}</text><text x={rightInner + 5} y="330">{rightBase}</text>
      <text x="268" y="42">180 cm</text><text x="533" y="193">100 cm</text>
      {adjusted ? <text x="275" y="326">105°</text> : <><text x="530" y="358">20 cm</text><text x="530" y="386">T</text></>}
    </svg>
    <figcaption>{adjusted
      ? "The two outer blade positions OE and OE′ have equal length. Use triangle OE′E, whose base is 180 cm and angle at O is 105°."
      : "The cleaned region is the shaded outer sector with the small inner sector removed. N is on the outer arc, and O is 20 cm below the windscreen."}</figcaption>
  </figure>;
}
