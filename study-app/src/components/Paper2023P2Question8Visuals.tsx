import { useState } from "react";

export function WordScoreNormal2023Diagram() {
  const x = (score: number) => 45 + (score - 2.7) * 185;
  const density = (score: number) => Math.exp(-0.5 * ((score - 3.87) / 0.36) ** 2);
  const y = (score: number) => 235 - density(score) * 170;
  const curve = Array.from({ length: 201 }, (_, index) => {
    const score = 2.7 + index * 0.012;
    return `${index ? "L" : "M"} ${x(score).toFixed(1)} ${y(score).toFixed(1)}`;
  }).join(" ");
  const leftArea = Array.from({ length: 68 }, (_, index) => {
    const score = 2.7 + index * (3.5 - 2.7) / 67;
    return `L ${x(score).toFixed(1)} ${y(score).toFixed(1)}`;
  }).join(" ");
  return <figure className="geometry-visual word-score-normal-2023">
    <svg viewBox="0 0 520 295" role="img" aria-labelledby="word-score-normal-2023-title word-score-normal-2023-desc">
      <title id="word-score-normal-2023-title">Normal distribution of word-game scores</title>
      <desc id="word-score-normal-2023-desc">The distribution has mean 3.87 and standard deviation 0.36. The area below score 3.5 is shaded on the left.</desc>
      <rect width="520" height="295" fill="white" />
      <path d={`M ${x(2.7)} 235 ${leftArea} L ${x(3.5)} 235 Z`} fill="#d7eade" />
      <path d={curve} fill="none" stroke="#207e4c" strokeWidth="3" />
      <line x1="34" x2="500" y1="235" y2="235" stroke="#263c34" strokeWidth="1.5" />
      <line x1={x(3.5)} x2={x(3.5)} y1={y(3.5)} y2="235" stroke="#7d8b80" strokeDasharray="4 4" />
      <line x1={x(3.87)} x2={x(3.87)} y1="56" y2="235" stroke="#7d8b80" strokeDasharray="4 4" />
      <text x={x(3.5)} y="258" textAnchor="middle">3.5</text><text x={x(3.87)} y="258" textAnchor="middle">μ = 3.87</text>
      <text x="154" y="197" textAnchor="middle">P(S &lt; 3.5)</text>
      <text x="322" y="284" textAnchor="middle">Score</text>
    </svg>
    <figcaption>Shaded area is the probability of a score below 3.5. The standard deviation is 0.36.</figcaption>
  </figure>;
}

type EntryKey = "firstWinProbability" | "firstWinCount" | "firstLoseProbability" | "firstLoseCount"
  | "secondWinPlayCount" | "secondLosePlayCount" | "secondWinWinProbability" | "secondWinWinCount"
  | "secondWinLoseProbability" | "secondLoseWinProbability" | "secondLoseWinCount" | "secondLoseLoseCount"
  | "thirdWWProbability" | "thirdWWCount" | "thirdWLProbability" | "thirdWLCount"
  | "thirdLWProbability" | "thirdLWCount" | "thirdLLProbability" | "thirdLLCount";

const solutions: Record<EntryKey, string> = {
  firstWinProbability: "0.8", firstWinCount: "288000", firstLoseProbability: "0.2", firstLoseCount: "72000",
  secondWinPlayCount: "259200", secondLosePlayCount: "18000", secondWinWinProbability: "0.8",
  secondWinWinCount: "207360", secondWinLoseProbability: "0.2", secondLoseWinProbability: "0.8",
  secondLoseWinCount: "14400", secondLoseLoseCount: "3600",
  thirdWWProbability: "0.9", thirdWWCount: "186624", thirdWLProbability: "0.25", thirdWLCount: "12960",
  thirdLWProbability: "0.9", thirdLWCount: "12960", thirdLLProbability: "0.25", thirdLLCount: "900",
};

export function WordGameTree2023Pad({ completed = false }: { completed?: boolean }) {
  const [entries, setEntries] = useState<Partial<Record<EntryKey, string>>>({});
  const cell = (key: EntryKey, label: string, given = false) => {
    if (completed || given) return <span>{Number(solutions[key]).toLocaleString("en-IE")}</span>;
    return <input aria-label={label} inputMode="decimal" placeholder="?" value={entries[key] ?? ""}
      onChange={(event) => setEntries((current) => ({ ...current, [key]: event.target.value }))} />;
  };
  return <div className="word-game-tree-2023">
    <p className="word-game-tree-intro">Start with <strong>360,000</strong> players on 1 June. Each day, 80% win. Of those who win, 90% play again; of those who lose, 25% play again.</p>
    <div className="study-table-wrap"><table className="study-data-table">
      <caption>1 June: split by result</caption>
      <thead><tr><th scope="col">Result</th><th scope="col">Proportion</th><th scope="col">Players</th></tr></thead>
      <tbody>
        <tr><th scope="row">Win</th><td>{cell("firstWinProbability", "1 June probability of a win", true)}</td><td>{cell("firstWinCount", "1 June winners")}</td></tr>
        <tr><th scope="row">Lose</th><td>{cell("firstLoseProbability", "1 June probability of a loss")}</td><td>{cell("firstLoseCount", "1 June losers")}</td></tr>
      </tbody>
    </table></div>
    <div className="study-table-wrap"><table className="study-data-table">
      <caption>2 June: only returning players continue</caption>
      <thead><tr><th scope="col">1 June result</th><th scope="col">P(play again)</th><th scope="col">Play</th><th scope="col">2 June result</th><th scope="col">P(result)</th><th scope="col">Players</th></tr></thead>
      <tbody>
        <tr><th scope="row">Win</th><td>0.9</td><td>{cell("secondWinPlayCount", "1 June winners who played on 2 June")}</td><td>Win</td><td>{cell("secondWinWinProbability", "2 June win probability after a 1 June win")}</td><td>{cell("secondWinWinCount", "Won on 1 and 2 June")}</td></tr>
        <tr><th scope="row">Win</th><td>0.9</td><td>same group</td><td>Lose</td><td>{cell("secondWinLoseProbability", "2 June loss probability after a 1 June win")}</td><td>51,840</td></tr>
        <tr><th scope="row">Lose</th><td>0.25</td><td>{cell("secondLosePlayCount", "1 June losers who played on 2 June")}</td><td>Win</td><td>{cell("secondLoseWinProbability", "2 June win probability after a 1 June loss")}</td><td>{cell("secondLoseWinCount", "Lost on 1 June and won on 2 June")}</td></tr>
        <tr><th scope="row">Lose</th><td>0.25</td><td>same group</td><td>Lose</td><td>0.2</td><td>{cell("secondLoseLoseCount", "Lost on both 1 and 2 June")}</td></tr>
      </tbody>
    </table></div>
    <div className="study-table-wrap"><table className="study-data-table">
      <caption>3 June: calculate who plays again from each path</caption>
      <thead><tr><th scope="col">1–2 June path</th><th scope="col">P(play again)</th><th scope="col">3 June players</th></tr></thead>
      <tbody>
        <tr><th scope="row">Win → win</th><td>{cell("thirdWWProbability", "3 June play probability after win then win")}</td><td>{cell("thirdWWCount", "3 June players after win then win")}</td></tr>
        <tr><th scope="row">Win → lose</th><td>{cell("thirdWLProbability", "3 June play probability after win then lose")}</td><td>{cell("thirdWLCount", "3 June players after win then lose")}</td></tr>
        <tr><th scope="row">Lose → win</th><td>{cell("thirdLWProbability", "3 June play probability after lose then win")}</td><td>{cell("thirdLWCount", "3 June players after lose then win")}</td></tr>
        <tr><th scope="row">Lose → lose</th><td>{cell("thirdLLProbability", "3 June play probability after lose then lose")}</td><td>{cell("thirdLLCount", "3 June players after lose then lose")}</td></tr>
      </tbody>
    </table></div>
    <p className="word-game-tree-note">{completed ? "The completed counts from part (i) are shown so you can answer part (ii)." : "Fill the blank cells. This pad is ungraded; compare your entries with the worked solution. Use the workings pad to save your method."}</p>
  </div>;
}
