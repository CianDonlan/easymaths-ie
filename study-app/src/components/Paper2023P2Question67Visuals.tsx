export function RectangleAngles2023Diagram() {
  return <figure className="geometry-visual rectangle-angles-2023">
    <svg viewBox="0 0 540 370" role="img" aria-labelledby="rectangle-angles-2023-title rectangle-angles-2023-desc">
      <title id="rectangle-angles-2023-title">Rectangle ACEG with internal and extended lines</title>
      <desc id="rectangle-angles-2023-desc">A is the bottom left corner, C bottom right, E top right and G top left. B lies on AC, D on CE, and F on GE. The extension of BD meets the extension of GE at H. The marked angles GFA, EFD and DBC all equal theta.</desc>
      <rect width="540" height="370" fill="white" />
      <rect x="80" y="45" width="330" height="275" fill="#f8fbf7" stroke="#263c34" strokeWidth="2" />
      <path d="M 80 320 L 338 45 M 338 45 L 410 115 M 218 320 L 470 45 M 410 45 L 470 45" fill="none" stroke="#263c34" strokeWidth="2" />
      <path d="M 80 320 L 218 320 M 218 320 L 410 320" fill="none" stroke="#207e4c" strokeWidth="3" />
      <text x="62" y="338">A</text><text x="207" y="343">B</text><text x="414" y="339">C</text>
      <text x="63" y="39">G</text><text x="332" y="35">F</text><text x="405" y="35">E</text><text x="476" y="51">H</text><text x="417" y="119">D</text>
      <text x="114" y="351">20 cm</text><text x="279" y="351">30 cm</text><text x="20" y="190">90 cm</text>
      <text x="297" y="67">θ</text><text x="359" y="69">θ</text><text x="243" y="306">θ</text>
    </svg>
    <figcaption>Diagram B: GE and BD are extended to meet at H. The three marked angles are equal to θ. Sketch not to scale.</figcaption>
  </figure>;
}

export function RoadGradient2023Diagram() {
  return <figure className="geometry-visual road-gradient-2023">
    <svg viewBox="0 0 420 235" role="img" aria-labelledby="road-gradient-2023-title road-gradient-2023-desc">
      <title id="road-gradient-2023-title">Road gradient right triangle</title>
      <desc id="road-gradient-2023-desc">Road AB is the hypotenuse of length 70 metres. AC is horizontal and BC is vertical, 9 metres high.</desc>
      <rect width="420" height="235" fill="white" />
      <path d="M 45 187 L 340 105 L 340 187 Z" fill="#f4f9f5" stroke="#263c34" strokeWidth="2" />
      <path d="M 327 187 L 327 174 L 340 174" fill="none" stroke="#263c34" />
      <text x="27" y="206">A</text><text x="345" y="103">B</text><text x="345" y="205">C</text>
      <text x="158" y="125">70 m</text><text x="347" y="155">9 m</text>
    </svg>
    <figcaption>The road AB is 70 m long, and its vertical rise BC is 9 m. Find the horizontal run AC before calculating the percentage gradient.</figcaption>
  </figure>;
}

export function HillHeight2023Diagram() {
  return <figure className="geometry-visual hill-height-2023">
    <svg viewBox="0 0 490 340" role="img" aria-labelledby="hill-height-2023-title hill-height-2023-desc">
      <title id="hill-height-2023-title">Hill height measured from two ground points</title>
      <desc id="hill-height-2023-desc">R and P are 20 metres apart on horizontal ground. The angle ORP is 88 degrees, OPR is 87 degrees, and the angle of elevation from R to H is 17 degrees. H is vertically above O.</desc>
      <rect width="490" height="340" fill="white" />
      <path d="M 58 235 L 152 307 L 394 214 L 58 235 M 58 235 L 394 39 L 394 214" fill="none" stroke="#263c34" strokeWidth="2" />
      <path d="M 382 214 L 382 202 L 394 202" fill="none" stroke="#263c34" />
      <text x="38" y="244">R</text><text x="150" y="326">P</text><text x="399" y="221">O</text><text x="399" y="38">H</text>
      <text x="70" y="289">20 m</text><text x="110" y="237">88°</text><text x="166" y="286">87°</text><text x="127" y="212">17°</text>
    </svg>
    <figcaption>Use triangle RPO to find RO, then right triangle ROH to find the vertical height OH. Sketch not to scale.</figcaption>
  </figure>;
}

export function Breathing2023Graph() {
  const plotX = (t: number) => 53 + t * 43;
  const plotY = (value: number) => 255 - (value - 1) * 105;
  const path = Array.from({ length: 181 }, (_, index) => {
    const t = index / 20;
    const y = 2 - 0.4 * Math.cos(Math.PI * t / 2);
    return `${index === 0 ? "M" : "L"} ${plotX(t).toFixed(2)} ${plotY(y).toFixed(2)}`;
  }).join(" ");
  return <figure className="geometry-visual breathing-2023-graph">
    <svg viewBox="0 0 480 300" role="img" aria-labelledby="breathing-2023-title breathing-2023-desc">
      <title id="breathing-2023-title">Lung volume during nine seconds of rest</title>
      <desc id="breathing-2023-desc">A smooth wave starts at minimum a at time zero, peaks at maximum b after two seconds, and repeats with a four-second period. The model is V of t equals two minus zero point four cosine of pi t over two.</desc>
      <rect width="480" height="300" fill="white" />
      <line x1="53" y1="255" x2="457" y2="255" stroke="#263c34" strokeWidth="2" />
      <line x1="53" y1="270" x2="53" y2="28" stroke="#263c34" strokeWidth="2" />
      <line x1="53" y1={plotY(1.6)} x2="457" y2={plotY(1.6)} stroke="#aeb9b0" strokeDasharray="4 4" />
      <line x1="53" y1={plotY(2.4)} x2="457" y2={plotY(2.4)} stroke="#aeb9b0" strokeDasharray="4 4" />
      <path d={path} fill="none" stroke="#207e4c" strokeWidth="3" />
      {Array.from({ length: 10 }, (_, index) => <text key={index} x={plotX(index)} y="277" textAnchor="middle">{index}</text>)}
      <text x="27" y={plotY(1.6) + 5}>a</text><text x="27" y={plotY(2.4) + 5}>b</text>
      <text x="386" y="295">Time (s)</text><text x="61" y="29">Volume (L)</text>
    </svg>
    <figcaption>Resting model: V(t) = 2 − 0.4 cos(πt/2) litres, with t in seconds. The graph marks its minimum a and maximum b.</figcaption>
  </figure>;
}
