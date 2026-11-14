const ages = [11, 12, 12, 14, 15, "x", 18, 18, 19, 22, 25, 30];
const intervals = ["24–30", "30–36", "36–42", "42–48", "48–54", "54–60"];
const frequencies = [4, 5, 9, "k", 4, 2];

export function AgeList() {
  return <div className="study-table-wrap"><table className="study-data-table"><caption>Twelve ages in ascending order</caption><tbody><tr>{ages.map((age, index) => <td key={index}>{age}</td>)}</tr></tbody></table></div>;
}

export function AgeFrequencyTable() {
  return <div className="study-table-wrap"><table className="study-data-table"><caption>Ages grouped into six-year intervals</caption><thead><tr><th scope="col">Age</th>{intervals.map((interval) => <th scope="col" key={interval}>{interval}</th>)}</tr></thead><tbody><tr><th scope="row">People</th>{frequencies.map((frequency, index) => <td key={index}>{frequency}</td>)}</tr></tbody></table><p>Each interval includes its lower endpoint and excludes its upper endpoint.</p></div>;
}

export function ScoreDistribution() {
  const curve = Array.from({ length: 201 }, (_, index) => {
    const z = -3.3 + (index * 6.6) / 200;
    return `${300 + z * 78.8},${184 - 145 * Math.exp(-z * z / 2)}`;
  }).join(" ");
  const shaded = Array.from({ length: 101 }, (_, index) => {
    const z = -1 + index / 50;
    return `${300 + z * 78.8},${184 - 145 * Math.exp(-z * z / 2)}`;
  }).join(" ");
  const ticks = [142.4, 221.2, 300, 378.8, 457.6];
  return <figure className="geometry-visual score-distribution">
    <svg viewBox="0 0 600 265" role="img" aria-labelledby="score-title score-desc">
      <title id="score-title">Normal score distribution with four missing axis values</title>
      <desc id="score-desc">The mean is 400 and standard deviation is 60. The central 68 percent spans one standard deviation either side of the mean. Five evenly spaced axis ticks are shown; the rightmost is labelled 520, and the other four are blank.</desc>
      <polygon points={`221.2,184 ${shaded} 378.8,184`} fill="#dcece3" />
      <polyline className="geometry-original" points={curve} />
      <line x1="40" y1="184" x2="560" y2="184" />
      <line className="geometry-guide" x1="221.2" y1="96" x2="221.2" y2="184" />
      <line className="geometry-guide" x1="378.8" y1="96" x2="378.8" y2="184" />
      <text x="283" y="104">68%</text>
      {ticks.map((tick, index) => <g key={index}>
        <line x1={tick} y1="180" x2={tick} y2="189" />
        <text x={tick - (index === 4 ? 16 : 4)} y="216">{index === 4 ? "520" : "?"}</text>
      </g>)}
      <text x="240" y="253">Score on test</text>
    </svg>
    <figcaption>Normal distribution, mean 400 and standard deviation 60. Fill the four ? values from left to right.</figcaption>
  </figure>;
}

export function CountrySampleTable() {
  return <div className="study-table-wrap"><table className="study-data-table"><caption>Maths test samples by country</caption><thead><tr><th scope="col">Country</th><th scope="col">Mean score</th><th scope="col">Sample standard deviation</th><th scope="col">Sample size</th></tr></thead><tbody>
    <tr><th scope="row">X</th><td>387</td><td>66.2</td><td>2161</td></tr>
    <tr><th scope="row">Y</th><td>403</td><td>70.6</td><td>2724</td></tr>
    <tr><th scope="row">Z</th><td>396</td><td>53.7</td><td>2520</td></tr>
  </tbody></table></div>;
}

export function MarkProportionTable() {
  return <div className="study-table-wrap"><table className="study-data-table"><caption>Proportion receiving each mark</caption><thead><tr><th scope="col">Mark</th><th scope="col">0</th><th scope="col">1</th><th scope="col">2</th><th scope="col">3</th></tr></thead><tbody><tr><th scope="row">Proportion</th><td>0.19</td><td>p</td><td>2r</td><td>r</td></tr></tbody></table><p>p ≥ 0, r ≥ 0, and the four proportions sum to 1.</p></div>;
}
