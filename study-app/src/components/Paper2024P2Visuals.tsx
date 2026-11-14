const stemRows = [
  { stem: 2, leaves: ["b", "2", "7"] },
  { stem: 3, leaves: ["a", "4", "4", "5", "8"] },
  { stem: 4, leaves: ["0", "1", "d", "5", "6", "9"] },
  { stem: 5, leaves: ["2", "3", "7", "7", "8"] },
  { stem: 6, leaves: ["1", "8", "c"] },
];

const swimPairs: [number, number][] = [
  [22, 25], [34, 40], [38, 65], [45, 96], [49, 142], [57, 262], [61, 350],
];

export function SwimStemLeafPlot() {
  return <div className="study-table-wrap swim-stem-leaf">
    <table className="study-data-table">
      <caption>Ordered stem-and-leaf plot · swimming distance in metres</caption>
      <thead><tr><th scope="col">Stem</th><th scope="col" colSpan={6}>Leaves</th></tr></thead>
      <tbody>{stemRows.map(({ stem, leaves }) => <tr key={stem}>
        <th scope="row">{stem}</th>
        {Array.from({ length: 6 }, (_, index) => <td key={index}>{leaves[index] ?? ""}</td>)}
      </tr>)}</tbody>
    </table>
    <p>Key: 2|7 = 27 metres. The letters are missing leaf digits.</p>
  </div>;
}

export function SwimRetestData() {
  const xPosition = (x: number) => 47 + x * 5;
  const yPosition = (y: number) => 260 - y * 0.55;
  return <div className="swim-retest-layout">
    <div className="study-table-wrap">
      <table className="study-data-table">
        <caption>Seven students' distances before and after swimming lessons</caption>
        <thead><tr><th scope="col">Initial (m)</th><th scope="col">Re-test (m)</th></tr></thead>
        <tbody>{swimPairs.map(([initial, retest]) => <tr key={initial}><td>{initial}</td><td>{retest}</td></tr>)}</tbody>
      </table>
    </div>
    <figure className="geometry-visual swim-scatter">
      <svg viewBox="0 0 490 320" role="img" aria-labelledby="swim-scatter-title swim-scatter-desc">
        <title id="swim-scatter-title">Initial swimming distance against re-test distance</title>
        <desc id="swim-scatter-desc">The seven points rise from 22 metres initially and 25 metres on re-test to 61 metres initially and 350 metres on re-test, with larger gains for stronger initial swimmers.</desc>
        <rect width="490" height="320" fill="white" />
        {[0, 20, 40, 60, 80].map((value) => <g key={`x${value}`}>
          <line className="geometry-guide" x1={xPosition(value)} y1="40" x2={xPosition(value)} y2="260" />
          <text x={xPosition(value) - 7} y="281">{value}</text>
        </g>)}
        {[0, 100, 200, 300, 400].map((value) => <g key={`y${value}`}>
          <line className="geometry-guide" x1="47" y1={yPosition(value)} x2="447" y2={yPosition(value)} />
          <text x="5" y={yPosition(value) + 5}>{value}</text>
        </g>)}
        <line x1="47" y1="260" x2="447" y2="260" /><line x1="47" y1="260" x2="47" y2="40" />
        {swimPairs.map(([initial, retest]) => <circle key={initial} cx={xPosition(initial)} cy={yPosition(retest)} r="4" />)}
        <text x="120" y="312">Initial distance (m)</text>
        <text x="55" y="28">Re-test distance (m)</text>
      </svg>
      <figcaption>Each point represents one student, paired with their own result after lessons.</figcaption>
    </figure>
  </div>;
}

export function PrizeProbabilityTable() {
  return <div className="study-table-wrap">
    <table className="study-data-table">
      <caption>Possible prizes and probabilities for one play</caption>
      <thead><tr><th scope="col">Prize (€)</th><th scope="col">None (€0)</th><th scope="col">€2</th><th scope="col">€(x − 10)</th><th scope="col">€x</th></tr></thead>
      <tbody><tr><th scope="row">Probability</th><td>30%</td><td>40%</td><td>28%</td><td>2%</td></tr></tbody>
    </table>
    <p>One prize at most is paid per play. Playing costs €10.</p>
  </div>;
}
