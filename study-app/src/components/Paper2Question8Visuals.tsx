import { useState, type PointerEvent } from "react";

export function PyramidDiagram() {
  return <figure className="geometry-visual q8-visual">
    <svg viewBox="0 0 500 310" role="img" aria-labelledby="pyramid-title pyramid-desc">
      <title id="pyramid-title">Square-based roof pyramid</title>
      <desc id="pyramid-desc">ABCD is a square of side 6 metres. O is its centre, P is directly above O, and AP and BP are 11 metres.</desc>
      <polygon points="65,235 285,235 425,165 205,165" fill="#eef5ee" stroke="#173a2b" strokeWidth="2" />
      <line className="geometry-guide" x1="65" y1="235" x2="425" y2="165" />
      <line className="geometry-guide" x1="205" y1="165" x2="285" y2="235" />
      <line className="geometry-guide" x1="245" y1="50" x2="245" y2="200" />
      <polyline points="65,235 245,50 285,235 425,165 245,50 205,165" />
      <text x="232" y="42">P</text><text x="46" y="254">A</text><text x="286" y="255">B</text>
      <text x="426" y="166">C</text><text x="188" y="160">D</text><text x="235" y="218">O</text>
      <text x="331" y="91">11 m</text><text x="173" y="265">6 m</text>
    </svg>
    <figcaption>The square base has side 6 m. P is vertically above its centre O; AP = BP = 11 m. The drawing is schematic.</figcaption>
  </figure>;
}

type Point = { x: number; y: number };

export function PyramidNetPad() {
  const [left, setLeft] = useState<Point | null>(null);
  const [bottom, setBottom] = useState<Point | null>(null);
  const [target, setTarget] = useState<"left" | "bottom">("left");
  const [guides, setGuides] = useState(false);
  function placePoint(event: PointerEvent<SVGSVGElement>) {
    const svg = event.currentTarget;
    const transform = svg.getScreenCTM();
    if (!transform) return;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const position = point.matrixTransform(transform.inverse());
    if (target === "left") {
      setLeft({ x: position.x, y: position.y });
      setTarget("bottom");
    } else {
      setBottom({ x: position.x, y: position.y });
      setTarget("left");
    }
  }
  return <figure className="geometry-visual q8-visual net-pad">
    <svg viewBox="0 0 550 560" role="img" aria-labelledby="net-title net-desc" onPointerDown={placePoint}>
      <title id="net-title">Complete the square pyramid net</title>
      <desc id="net-desc">A square and its top and right triangular faces are given. Tap to add the missing apex to the left of the square, then the missing apex below it. Optional compass arcs show equal side lengths.</desc>
      <rect x="0" y="0" width="550" height="560" fill="#fff" />
      {guides && <g className="net-guides">
        <circle cx="230" cy="235" r="137.5" /><circle cx="230" cy="310" r="137.5" />
        <circle cx="305" cy="310" r="137.5" />
      </g>}
      <rect x="230" y="235" width="75" height="75" fill="#edf4ee" stroke="#173a2b" strokeWidth="2" />
      <polyline points="230,235 267.5,102.7 305,235 437.3,272.5 305,310" />
      {left && <g className="net-student">
        <polyline points={`230,235 ${left.x},${left.y} 230,310`} />
        <circle cx={left.x} cy={left.y} r="5" />
      </g>}
      {bottom && <g className="net-student">
        <polyline points={`230,310 ${bottom.x},${bottom.y} 305,310`} />
        <circle cx={bottom.x} cy={bottom.y} r="5" />
      </g>}
      <text x="248" y="273">6 m</text>
    </svg>
    <figcaption>Tap to place the {target === "left" ? "left" : "bottom"} apex. Each sloping edge should represent 11 m while each square edge represents 6 m. This drawing is for practice; use the guided self-check to compare your construction.</figcaption>
    <div className="net-controls">
      <button type="button" onClick={() => setTarget("left")}>Place left apex</button>
      <button type="button" onClick={() => setTarget("bottom")}>Place bottom apex</button>
      <button type="button" onClick={() => setGuides((value) => !value)}>{guides ? "Hide" : "Show"} compass arcs</button>
      <button type="button" onClick={() => { setLeft(null); setBottom(null); setTarget("left"); }}>Clear drawing</button>
    </div>
  </figure>;
}

export function FlagpoleDiagram() {
  return <figure className="geometry-visual q8-visual">
    <svg viewBox="0 0 450 260" role="img" aria-labelledby="flag-title flag-desc">
      <title id="flag-title">Flagpole angle of elevation</title>
      <desc id="flag-desc">AB is horizontal and 15 metres long. BC is vertical and 17.5 metres high. Angle CAB is the angle of elevation; Ally recorded 52 degrees.</desc>
      <polyline points="55,210 305,210 305,35 55,210" />
      <polyline className="geometry-guide" points="287,210 287,192 305,192" />
      <text x="38" y="229">A</text><text x="306" y="229">B</text><text x="307" y="33">C</text>
      <text x="162" y="235">15 m</text><text x="314" y="128">17.5 m</text>
    </svg>
    <figcaption>The true angle is ∠CAB. Ally recorded 52°.</figcaption>
  </figure>;
}

export function TowerDiagram() {
  return <figure className="geometry-visual q8-visual">
    <svg viewBox="0 0 570 300" role="img" aria-labelledby="tower-title tower-desc">
      <title id="tower-title">Two measurements of a tower's height</title>
      <desc id="tower-desc">Two eye-level observation points are 10 metres apart. The farther angle of elevation is 22 degrees and the nearer angle is 35 degrees. Both are 1.25 metres above ground. The farther sloping sight line is x and the full tower height is h.</desc>
      <line x1="25" y1="260" x2="545" y2="260" />
      <line className="geometry-guide" x1="25" y1="230" x2="545" y2="230" />
      <line x1="50" y1="230" x2="470" y2="62" />
      <line x1="190" y1="230" x2="470" y2="62" />
      <line x1="470" y1="260" x2="470" y2="62" />
      <circle cx="50" cy="230" r="4" /><circle cx="190" cy="230" r="4" />
      <text x="91" y="215">22°</text><text x="222" y="211">35°</text>
      <text x="270" y="120">x</text><text x="493" y="160">h</text>
      <text x="98" y="251">10 m</text><text x="295" y="280">1.25 m above ground</text>
    </svg>
    <figcaption>The farther sight line is x. The vertical rise from eye level is x sin 22°; add 1.25 m for the full height.</figcaption>
  </figure>;
}
