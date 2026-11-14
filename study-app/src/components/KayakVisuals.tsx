export function KayakRoute() {
  return <figure className="kayak-visual">
    <svg viewBox="0 0 440 180" role="img" aria-labelledby="kayak-route-title kayak-route-desc">
      <title id="kayak-route-title">Kayak and run route</title>
      <desc id="kayak-route-desc">S is 2 km above A. A, B and F lie on the straight coastline in that order. AF is 8 km and AB is x km. The triangle SAF has a right angle at A. Jacob can kayak from S to B and run from B to F.</desc>
      <line className="coast" x1="38" y1="127" x2="406" y2="127" />
      <line className="height" x1="68" y1="33" x2="68" y2="127" />
      <line className="kayak-leg" x1="68" y1="33" x2="161" y2="127" />
      <line className="full-route" x1="68" y1="33" x2="386" y2="127" />
      <path className="right-angle" d="M68 114h13v13" />
      <circle cx="68" cy="33" r="4" /><circle cx="68" cy="127" r="4" /><circle cx="161" cy="127" r="4" /><circle cx="386" cy="127" r="4" />
      <text x="55" y="23">S</text><text x="50" y="148">A</text><text x="151" y="148">B</text><text x="378" y="148">F</text>
      <text x="4" y="86">2 km</text><text x="105" y="167">AB = x</text><text x="260" y="167">AF = 8 km</text>
    </svg>
    <figcaption>Route schematic. Kayak 6 km/h; run 12 km/h. B may be anywhere on AF.</figcaption>
  </figure>;
}

const graphPaths = [
  { label: "A", path: "M12 20 C28 74 50 65 73 48 S108 32 132 43" },
  { label: "B", path: "M12 43 C36 80 54 57 80 37 S112 7 132 25" },
  { label: "C", path: "M12 18 C24 60 38 53 56 51 S100 46 132 43" },
  { label: "D", path: "M12 43 C26 56 39 47 55 45 S100 34 132 25" },
];

export function KayakGraphChoices() {
  return <figure className="kayak-visual kayak-graphs">
    <figcaption>Four graph sketches from the paper, recreated for comparison. The vertical axis is T(x); the horizontal axis is x from 0 to 8.</figcaption>
    <div className="kayak-graph-grid">
      {graphPaths.map(({ label, path }) => <div className="kayak-graph-choice" key={label}>
        <svg viewBox="0 0 146 89" role="img" aria-label={`Graph ${label} sketch`}>
          <path className="graph-axis" d="M12 8V76H137" />
          <path className="graph-curve" d={path} />
          <text x="2" y="10">T</text><text x="137" y="83">x</text>
        </svg>
        <strong>Graph {label}</strong>
      </div>)}
    </div>
  </figure>;
}
