import { useEffect, useState } from "react";

const times = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const givenSpeeds = ["0", "", "9.8", "", "31.6", "", "", "70.6", "79.6"];
const graphStorageKey = "lc-maths-2025-p1-q9-speed-graph";

function readGraphSpeeds() {
  try {
    const saved = JSON.parse(localStorage.getItem(graphStorageKey) ?? "null");
    if (Array.isArray(saved) && saved.length === 9 && saved.every((item) => typeof item === "string")) return saved as string[];
  } catch { /* Browser storage may be unavailable. */ }
  return givenSpeeds;
}

export function SpeedTable() {
  return <div className="speed-table-wrap"><table className="speed-table"><caption>Speed table from the paper, in km/h</caption><thead><tr><th scope="col">t (s)</th>{times.map((t) => <th scope="col" key={t}>{t}</th>)}</tr></thead><tbody><tr><th scope="row">v(t)</th>{givenSpeeds.map((speed, index) => <td key={index}>{speed || "?"}</td>)}</tr></tbody></table></div>;
}

export function SpeedGraphPad() {
  const [speeds, setSpeeds] = useState(readGraphSpeeds);
  useEffect(() => {
    try { localStorage.setItem(graphStorageKey, JSON.stringify(speeds)); } catch { /* Keep the in-memory draft. */ }
  }, [speeds]);
  const updateSpeed = (time: number, value: string) => setSpeeds((current) => current.map((speed, index) => index === time ? value : speed));
  const plotWidth = 400;
  const plotHeight = 240;
  const x0 = 48;
  const y0 = 266;
  const points = speeds.map((raw, index) => {
    const value = Number(raw);
    return raw.trim() !== "" && Number.isFinite(value) && value >= 0 && value <= 80
      ? { x: x0 + index * (plotWidth / 8), y: y0 - value * (plotHeight / 80) }
      : null;
  });
  const hasAllPoints = points.every((point) => point !== null);
  const line = hasAllPoints ? points.map((point) => `${point!.x},${point!.y}`).join(" ") : "";

  return <div className="speed-graph-pad">
    <p>Enter a speed for each second to plot your graph. The line appears when all nine points are entered.</p>
    <svg viewBox="0 0 490 305" role="img" aria-label="Speed against time graph preview, with horizontal time axis 0 to 8 seconds and vertical speed axis 0 to 80 kilometres per hour">
      {times.map((t) => <g key={`x-${t}`}><line className="speed-grid" x1={x0 + t * 50} y1="26" x2={x0 + t * 50} y2={y0} /><text x={x0 + t * 50} y="284" textAnchor="middle">{t}</text></g>)}
      {[0, 10, 20, 30, 40, 50, 60, 70, 80].map((v) => <g key={`y-${v}`}><line className="speed-grid" x1={x0} y1={y0 - v * 3} x2={x0 + plotWidth} y2={y0 - v * 3} /><text x="35" y={y0 - v * 3 + 4} textAnchor="end">{v}</text></g>)}
      <line className="speed-axis" x1={x0} y1="26" x2={x0} y2={y0} /><line className="speed-axis" x1={x0} y1={y0} x2={x0 + plotWidth} y2={y0} />
      {hasAllPoints && <polyline className="speed-line" points={line} />}
      {points.map((point, index) => point && <circle className="speed-point" key={index} cx={point.x} cy={point.y} r="4" />)}
      <text x="248" y="302" textAnchor="middle">Time (seconds)</text>
      <text x="5" y="19">Speed (km/h)</text>
    </svg>
    <div className="speed-point-inputs">
      {times.map((t) => <label key={t}>t = {t}<input type="number" min="0" max="80" step="0.1" value={speeds[t]} onChange={(event) => updateSpeed(t, event.target.value)} aria-label={`Speed at ${t} seconds in kilometres per hour`} /></label>)}
    </div>
    <small>The preview joins entered points with straight segments. Sketch a smooth curve through them for the paper question.</small>
  </div>;
}
