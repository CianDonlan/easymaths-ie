export function DiabetesTestTree() {
  return <figure className="geometry-visual probability-tree">
    <svg viewBox="0 0 650 330" role="img" aria-labelledby="tree-title tree-desc">
      <title id="tree-title">Diabetes test probability tree</title>
      <desc id="tree-desc">The population splits into diabetes, probability 0.067, and no diabetes, probability to find. Each splits into positive and negative tests. The diabetes-positive outcome 0.0663 and false-positive branch 0.078 are given. Fill the other branches and three outcome probabilities.</desc>
      <line x1="75" y1="160" x2="210" y2="73" /><line x1="75" y1="160" x2="210" y2="251" />
      <line x1="264" y1="73" x2="432" y2="36" /><line x1="264" y1="73" x2="432" y2="113" />
      <line x1="264" y1="251" x2="432" y2="211" /><line x1="264" y1="251" x2="432" y2="291" />
      <g className="tree-nodes">
        <rect x="18" y="142" width="110" height="38" rx="5" /><text x="73" y="166">Population</text>
        <rect x="190" y="55" width="98" height="43" rx="5" /><text x="239" y="74">Has</text><text x="239" y="89">diabetes</text>
        <rect x="190" y="230" width="98" height="45" rx="5" /><text x="239" y="248">No</text><text x="239" y="264">diabetes</text>
      </g>
      <text x="128" y="89">0.067</text><text x="128" y="230">?</text>
      <text x="320" y="34">?</text><text x="320" y="110">?</text>
      <text x="320" y="205">0.078</text><text x="320" y="301">?</text>
      <text x="442" y="41">Positive</text><text x="442" y="117">Negative</text>
      <text x="442" y="213">Positive</text><text x="442" y="293">Negative</text>
      <text x="565" y="41">0.0663</text><text x="565" y="117">?</text>
      <text x="565" y="213">?</text><text x="565" y="293">?</text>
    </svg>
    <figcaption>The boxes marked ? are the four missing branch probabilities and three missing outcome probabilities. Use the existing values 0.067, 0.078 and 0.0663.</figcaption>
  </figure>;
}
