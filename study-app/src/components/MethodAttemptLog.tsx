import { useState } from "react";
import {
  latestByPart,
  methodLevels,
  METHOD_SCALE_VERSION,
  readMethodAttempts,
  saveMethodAttempts,
} from "../utils/methodAttempts";
import type { LocalMethodAttempt } from "../utils/methodAttempts";

function displayDate(iso: string) {
  return new Date(iso).toLocaleString("en-IE", { dateStyle: "medium", timeStyle: "short" });
}

export function MethodAttemptLog({ partId }: { partId: string }) {
  const [attempts, setAttempts] = useState(readMethodAttempts);
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const latest = latestByPart(attempts).get(partId)?.latest;
  const partAttempts = attempts.filter((item) => item.partId === partId).sort((a, b) =>
    b.attemptedAt.localeCompare(a.attemptedAt) || b.createdAt.localeCompare(a.createdAt));

  function saveAttempt() {
    if (!selectedLevel) return;
    const now = new Date().toISOString();
    const attempt: LocalMethodAttempt = {
      id: crypto.randomUUID(), partId, attemptedAt: now,
      methodScore: selectedLevel, scaleVersion: METHOD_SCALE_VERSION,
      earnedMarks: null, maximumMarks: null, note: note.trim() || null,
      createdAt: now, updatedAt: now,
    };
    const next = [...attempts, attempt];
    if (!saveMethodAttempts(next)) {
      setMessage("Could not save on this device. Check that browser storage is available.");
      return;
    }
    setAttempts(next);
    setSelectedLevel(0);
    setNote("");
    setMessage("Attempt saved on this device. Every honest level counts.");
  }

  return <section className="book-log-panel method-log-panel">
    <span className="eyebrow">Your practice</span>
    <h2>Log this attempt</h2>
    <p>Choose how much help you used this time. You can come back and log another attempt later.</p>
    {latest && <div className="book-last-level">Last: Level {latest.methodScore} · {methodLevels[latest.methodScore - 1].label} <small>{partAttempts.length} {partAttempts.length === 1 ? "attempt" : "attempts"} here</small></div>}
    <fieldset className="book-levels"><legend>Study method level</legend>{methodLevels.map((level) => <label key={level.value} className={selectedLevel === level.value ? "selected" : ""}><input type="radio" name="method-level" value={level.value} checked={selectedLevel === level.value} onChange={() => { setSelectedLevel(level.value); setMessage(""); }} /><span><strong>Level {level.value} · {level.label}</strong><small>{level.detail}</small></span></label>)}</fieldset>
    <label className="book-note-label" htmlFor="book-note">Note (optional)</label>
    <textarea id="book-note" maxLength={500} rows={3} placeholder="What helped? What will you try next time?" value={note} onChange={(event) => setNote(event.target.value)} />
    <button className="button button-primary book-save" type="button" onClick={saveAttempt} disabled={!selectedLevel}>Save attempt</button>
    {message && <p className="book-save-message" role="status">{message}</p>}
    {partAttempts.length > 0 && <details className="book-history"><summary>Attempt history ({partAttempts.length})</summary><ol>{partAttempts.map((attempt) => <li key={attempt.id}><strong>Level {attempt.methodScore} · {methodLevels[attempt.methodScore - 1].label}</strong><time dateTime={attempt.attemptedAt}>{displayDate(attempt.attemptedAt)}</time>{attempt.note && <p>{attempt.note}</p>}</li>)}</ol></details>}
    <p className="book-storage-note">Saved on this device only. Method levels are separate from answer checks and exam marks.</p>
  </section>;
}
