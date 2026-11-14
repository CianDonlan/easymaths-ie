export function SineGraph() {
  const points = Array.from({ length: 201 }, (_, index) => {
    const x = -Math.PI + (index * 3 * Math.PI) / 200;
    return `${40 + (index * 460) / 200},${105 - (Math.abs(4 * Math.sin(x)) - 1) * 24}`;
  }).join(" ");
  return <figure className="geometry-visual paper2-visual">
    <svg viewBox="0 0 540 165" role="img" aria-labelledby="sine-title sine-desc">
      <title id="sine-title">Graph of f(x) = |4 sin x| − 1</title>
      <desc id="sine-desc">Repeated arches reach 3 at their peaks and −1 at x values that are multiples of pi. Adjacent low points are pi apart.</desc>
      <line className="geometry-guide" x1="40" y1="105" x2="505" y2="105" />
      <line className="geometry-guide" x1="193" y1="15" x2="193" y2="135" />
      <polyline className="geometry-original" points={points} />
      <text x="187" y="153">0</text><text x="38" y="153">−π</text><text x="340" y="153">π</text><text x="489" y="153">2π</text>
      <text x="202" y="38">3</text><text x="202" y="132">−1</text>
    </svg>
    <figcaption>Graph of y = |4 sin x| − 1, with x in radians.</figcaption>
  </figure>;
}

export function CosineTriangle() {
  return <figure className="geometry-visual paper2-visual">
    <svg viewBox="0 0 480 230" role="img" aria-labelledby="cosine-title cosine-desc">
      <title id="cosine-title">Triangle ABC</title>
      <desc id="cosine-desc">AB has length 4, AC has length 2, and BC has length 3. Angle CBA is at B.</desc>
      <polyline className="geometry-original" points="50,190 420,190 177,38 50,190" />
      <text x="31" y="210">A</text><text x="424" y="210">B</text><text x="171" y="28">C</text>
      <text x="231" y="215">4</text><text x="85" y="105">2</text><text x="321" y="101">3</text>
    </svg>
    <figcaption>Use the Cosine Rule at B; the opposite side is AC = 2.</figcaption>
  </figure>;
}

export function SubmarineDiagram({ algebra = false }: { algebra?: boolean }) {
  return <figure className="geometry-visual paper2-visual">
    <svg viewBox="0 0 550 220" role="img" aria-labelledby="sub-title sub-desc">
      <title id="sub-title">Submarine made from a hemisphere, cylinder and cone</title>
      <desc id="sub-desc">The left hemisphere, middle cylinder and right cone have axial lengths {algebra ? "x, 7x and 4x" : "1, 10 and 3 diagram centimetres"} respectively.</desc>
      <path d="M65 55 A35 35 0 0 0 65 125 L415 125 L520 90 L415 55 Z" fill="#dcece3" stroke="#173a2b" strokeWidth="2" />
      <line x1="65" y1="55" x2="65" y2="125" /><line x1="415" y1="55" x2="415" y2="125" />
      <text x="45" y="152">{algebra ? "x" : "r"}</text>
      <text x="238" y="152">{algebra ? "7x" : "d"}</text>
      <text x="458" y="152">{algebra ? "4x" : "h"}</text>
      {!algebra && <>
        <line className="geometry-guide" x1="30" y1="180" x2="520" y2="180" />
        {Array.from({ length: 15 }, (_, index) => <g key={index}>
          <line x1={30 + index * 35} y1="174" x2={30 + index * 35} y2="186" />
          <text x={25 + index * 35} y="207">{index}</text>
        </g>)}
      </>}
    </svg>
    <figcaption>{algebra ? "All three solids have radius x; their axial lengths are x, 7x and 4x." : "Digital diagram ruler: each numbered interval represents 1 cm on the paper. Read the boundaries at 0, 1, 11 and 14 cm; screen size does not affect the scale."}</figcaption>
  </figure>;
}

export function OverlappingCircles() {
  return <figure className="geometry-visual paper2-visual">
    <svg viewBox="0 0 540 260" role="img" aria-labelledby="circles-title circles-desc">
      <title id="circles-title">Two intersecting circles around A and B</title>
      <desc id="circles-desc">A is at (0,0), B at (20,0), C at (7,3), and D at (7,-3). Circle k has radius square root 58 and circle s radius square root 178. The narrow lens between C and D is inside both.</desc>
      <defs><clipPath id="circle-k-clip"><circle cx="40" cy="130" r={Math.sqrt(58) * 22} /></clipPath></defs>
      <circle cx="480" cy="130" r={Math.sqrt(178) * 22} fill="#dbefdf" clipPath="url(#circle-k-clip)" />
      <circle className="circle-outline" cx="40" cy="130" r={Math.sqrt(58) * 22} />
      <circle className="circle-outline" cx="480" cy="130" r={Math.sqrt(178) * 22} />
      <line className="geometry-guide" x1="40" y1="130" x2="480" y2="130" />
      <line className="geometry-guide" x1="194" y1="64" x2="194" y2="196" />
      <text x="25" y="154">A</text><text x="483" y="154">B</text>
      <text x="198" y="63">C</text><text x="198" y="202">D</text>
      <text x="185" y="122">R</text><text x="116" y="42">k</text><text x="308" y="42">s</text>
    </svg>
    <figcaption>A(0, 0), B(20, 0), C(7, 3), D(7, −3). Region R is inside both circles. Distances are in km.</figcaption>
  </figure>;
}
