export function CirclePoints2023Diagram() {
  return <figure className="geometry-visual circle-points-2023">
    <svg viewBox="0 0 360 300" role="img" aria-labelledby="circle-points-2023-title circle-points-2023-desc">
      <title id="circle-points-2023-title">Circle through three labelled points</title>
      <desc id="circle-points-2023-desc">The circle passes through eight comma one, a comma three, and a comma negative five. The two points with x-coordinate a are vertically aligned. The diagram is not to scale.</desc>
      <rect width="360" height="300" fill="white" />
      <line x1="60" y1="170" x2="338" y2="170" stroke="#263c34" strokeWidth="1.5" />
      <line x1="85" y1="278" x2="85" y2="20" stroke="#263c34" strokeWidth="1.5" />
      <text x="340" y="174">x</text><text x="90" y="21">y</text>
      <circle cx="205" cy="151" r="93" fill="#f4f9f5" stroke="#263c34" strokeWidth="2" />
      <circle cx="131" cy="95" r="4" fill="#207e4c" />
      <circle cx="131" cy="207" r="4" fill="#207e4c" />
      <circle cx="286" cy="105" r="4" fill="#207e4c" />
      <text x="95" y="85">(a, 3)</text><text x="95" y="228">(a, −5)</text><text x="276" y="90">(8, 1)</text>
    </svg>
    <figcaption>The two points with x-coordinate a lie on a vertical chord. The circle has radius √20, and 0 &lt; a &lt; 5. Sketch not to scale.</figcaption>
  </figure>;
}

const trials = ["A", "B", "C", "D", "E", "F", "G"];
const red = [0, 3, 2, 2, 4, 5, 1];
const green = [4, 2, 0, 3, 0, 0, 2];
const blue = [1, 0, 3, 0, 1, 0, 2];

export function CubeTrials2023Table() {
  return <div className="study-table-wrap">
    <table className="study-data-table cube-trials-2023-table">
      <caption>Number of cubes of each colour in seven trials of five cubes</caption>
      <thead><tr><th scope="col">Trial</th>{trials.map((trial) => <th scope="col" key={trial}>{trial}</th>)}</tr></thead>
      <tbody>
        <tr><th scope="row">Red</th>{red.map((value, index) => <td key={index}>{value}</td>)}</tr>
        <tr><th scope="row">Green</th>{green.map((value, index) => <td key={index}>{value}</td>)}</tr>
        <tr><th scope="row">Blue</th>{blue.map((value, index) => <td key={index}>{value}</td>)}</tr>
      </tbody>
    </table>
    <p>Each trial contains five different cubes. The five cubes are replaced before the next trial.</p>
  </div>;
}

export function Cuboid2023Diagram() {
  return <figure className="geometry-visual cuboid-2023">
    <svg viewBox="0 0 460 285" role="img" aria-labelledby="cuboid-2023-title cuboid-2023-desc">
      <title id="cuboid-2023-title">Five by three by four cuboid made from unit cubes</title>
      <desc id="cuboid-2023-desc">The front face is five cubes wide and four high. The top and right faces show depth three. One corner cube with three exposed faces is shaded.</desc>
      <rect width="460" height="285" fill="white" />
      <path d="M 80 85 L 150 30 L 350 30 L 280 85 Z" fill="#edf5ed" stroke="#263c34" strokeWidth="2" />
      <path d="M 280 85 L 350 30 L 350 190 L 280 245 Z" fill="#dbeade" stroke="#263c34" strokeWidth="2" />
      <rect x="80" y="85" width="200" height="160" fill="#f8fbf7" stroke="#263c34" strokeWidth="2" />
      {Array.from({ length: 4 }, (_, index) => <line key={`front-v-${index}`} x1={120 + index * 40} y1="85" x2={120 + index * 40} y2="245" stroke="#263c34" />)}
      {Array.from({ length: 3 }, (_, index) => <line key={`front-h-${index}`} x1="80" y1={125 + index * 40} x2="280" y2={125 + index * 40} stroke="#263c34" />)}
      {[1, 2].map((index) => <g key={index}>
        <line x1={80 + index * 70 / 3} y1={85 - index * 55 / 3} x2={280 + index * 70 / 3} y2={85 - index * 55 / 3} stroke="#263c34" />
        <line x1={280 + index * 70 / 3} y1={85 - index * 55 / 3} x2={280 + index * 70 / 3} y2={245 - index * 55 / 3} stroke="#263c34" />
      </g>)}
      {Array.from({ length: 4 }, (_, index) => <line key={`top-${index}`} x1={120 + index * 40} y1="85" x2={190 + index * 40} y2="30" stroke="#263c34" />)}
      {Array.from({ length: 3 }, (_, index) => <line key={`right-${index}`} x1="280" y1={125 + index * 40} x2="350" y2={70 + index * 40} stroke="#263c34" />)}
      <path d="M 240 85 L 280 85 L 280 125 L 240 125 Z" fill="#a8cdb2" stroke="#263c34" />
      <text x="180" y="269">5 units</text><text x="20" y="170">4 units</text><text x="335" y="226">3 units</text>
    </svg>
    <figcaption>The shaded corner cube has three faces on the outside. Count corners, edges, face interiors and the hidden core separately.</figcaption>
    <div className="study-table-wrap">
      <table className="study-data-table cuboid-2023-table">
        <caption>Number of exposed faces per small cube</caption>
        <thead><tr><th scope="col">Faces on the outside</th><th scope="col">Number of cubes</th></tr></thead>
        <tbody><tr><th scope="row">3 faces</th><td>?</td></tr><tr><th scope="row">2 faces</th><td>?</td></tr><tr><th scope="row">1 face</th><td>22</td></tr><tr><th scope="row">No faces</th><td>?</td></tr></tbody>
      </table>
    </div>
  </figure>;
}
