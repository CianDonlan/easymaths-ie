export function GGraph() {
  const ticks = [1, 2, 3, 4];
  return <div className="study-graph">
    <svg viewBox="0 0 400 360" role="img" aria-labelledby="g-graph-title g-graph-description">
      <title id="g-graph-title">Graph of g of x</title>
      <desc id="g-graph-description">Two straight segments connect the points (0, 0), (3, 1), and (4, 4), for x from 0 to 4.</desc>
      <defs><marker id="axis-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="none" stroke="currentColor" strokeWidth="1.4" /></marker></defs>
      {ticks.map((tick) => <g key={`x-${tick}`}><line className="graph-grid" x1={45 + tick * 75} y1="35" x2={45 + tick * 75} y2="315" /><text x={45 + tick * 75} y="339" textAnchor="middle">{tick}</text></g>)}
      {ticks.map((tick) => <g key={`y-${tick}`}><line className="graph-grid" x1="45" y1={315 - tick * 70} x2="345" y2={315 - tick * 70} /><text x="31" y={320 - tick * 70} textAnchor="end">{tick}</text></g>)}
      <line className="graph-axis" x1="35" y1="315" x2="372" y2="315" markerEnd="url(#axis-arrow)" />
      <line className="graph-axis" x1="45" y1="324" x2="45" y2="15" markerEnd="url(#axis-arrow)" />
      <polyline className="graph-function" points="45,315 270,245 345,35" />
      <text x="376" y="308">x</text><text x="54" y="24">y</text><text x="352" y="46">g(x)</text>
    </svg>
    <p>Graph points: (0, 0), (3, 1), and (4, 4). The segments are straight.</p>
  </div>;
}
