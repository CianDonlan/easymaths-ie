import { useEffect, useState } from "react";

type Point = [number, number];
const pointKey = (x: number, y: number) => `${x},${y}`;
const patternPoints = (n: number): Point[] => {
  const points: Point[] = [];
  for (let y = -n; y <= n; y++) for (let x = -n; x <= n; x++) {
    if (Math.abs(x) + Math.abs(y) <= n && (x + y - n) % 2 === 0) points.push([x, y]);
  }
  return points;
};
const patternFour = new Set(patternPoints(4).map(([x, y]) => pointKey(x, y)));
const fixedPoints = new Set([
  "-4,0", "-3,1", "-2,2", "-1,3", "0,4", "-2,0", "-1,1", "0,2", "0,0",
]);
const storageKey = "lc-maths-2025-p1-q10-pattern-four";

function readSelected() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
    if (Array.isArray(saved) && saved.every((key) => typeof key === "string" && /^-?[0-4],-?[0-4]$/.test(key))) return new Set<string>(saved);
  } catch { /* Browser storage may be unavailable. */ }
  return new Set<string>();
}

function PatternPreview({ n }: { n: number }) {
  const dots = patternPoints(n);
  return <div className="dot-preview"><svg viewBox="0 0 100 100" role="img" aria-label={`Pattern ${n} with ${dots.length} dots`}>
    <line x1="10" y1="50" x2="90" y2="50" /><line x1="50" y1="10" x2="50" y2="90" />
    {dots.map(([x, y]) => <circle key={pointKey(x, y)} cx={50 + x * 10} cy={50 - y * 10} r="2.8" />)}
  </svg><strong>Pattern {n}</strong></div>;
}

export function DotPatternGrid() {
  const [selected, setSelected] = useState(readSelected);
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify([...selected])); } catch { /* Keep the in-memory draft. */ }
  }, [selected]);
  const toggle = (key: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    setResult(null);
  };
  const check = () => {
    const all = new Set([...fixedPoints, ...selected]);
    setResult(all.size === patternFour.size && [...all].every((key) => patternFour.has(key)) ? "correct" : "incorrect");
  };

  return <div className="dot-pattern-activity">
    <div className="dot-previews"><PatternPreview n={1} /><PatternPreview n={2} /><PatternPreview n={3} /></div>
    <p>Nine dots are already placed as on the paper. Tap or click the other squares to complete Pattern 4.</p>
    <div className="dot-grid-wrap"><table className="dot-grid" aria-label="Pattern 4 coordinate grid"><thead><tr><th scope="col">y \ x</th>{[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((x) => <th scope="col" key={x}>{x}</th>)}</tr></thead><tbody>{[4, 3, 2, 1, 0, -1, -2, -3, -4].map((y) => <tr key={y}><th scope="row">{y}</th>{[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((x) => {
      const key = pointKey(x, y);
      const fixed = fixedPoints.has(key);
      const active = fixed || selected.has(key);
      return <td key={x}><button type="button" className={`dot-cell${active ? " dot-cell-active" : ""}${fixed ? " dot-cell-fixed" : ""}`} disabled={fixed} aria-label={`Point (${x}, ${y})${fixed ? ", given dot" : ""}`} aria-pressed={active} onClick={() => toggle(key)}><span aria-hidden="true" /></button></td>;
    })}</tr>)}</tbody></table></div>
    <div className="dot-check-row"><button type="button" className="button button-primary" onClick={check}>Check pattern</button><span>{fixedPoints.size + selected.size} dots placed</span></div>
    <p className={`dot-check-feedback${result === "correct" ? " is-correct" : ""}`} aria-live="polite">{result === "correct" ? "That's correct: all 25 dots are in place." : result === "incorrect" ? "Not quite yet. Check for missing dots and any extra dots." : ""}</p>
  </div>;
}
