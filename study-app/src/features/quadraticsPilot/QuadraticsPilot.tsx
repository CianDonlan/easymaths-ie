import { useRef, useState } from "react";
import { checkAnswer } from "../../utils/checkAnswer";
import { methodLevels } from "../../utils/methodAttempts";
import { pilotExamples, pilotTasks, type HelpSection } from "./content";
import { emptyDraft, emptyPilot, parsePilot, recordAttempt, restartTask, PILOT_STORAGE_KEY, type TaskDraft, type PilotState } from "./state";
import "./pilot.css";

const helpChoices: { id: HelpSection; title: string; detail: string }[] = [
  { id: "square", title: "Complete the square", detail: "Read the method" },
  { id: "turning", title: "Find the turning point", detail: "Read the method" },
  { id: "positive-example", title: "Positive linear term", detail: "Work through an example" },
  { id: "negative-example", title: "Negative linear term", detail: "Work through an example" },
  { id: "hint", title: "A starting hint", detail: "For this question" },
];

function readSavedPilot() {
  try { return parsePilot(localStorage.getItem(PILOT_STORAGE_KEY)); }
  catch { return emptyPilot(); }
}

function TurningPointPicture() {
  const path = Array.from({ length: 101 }, (_, i) => { const x = -4.3 + i * .046; return `${i ? "L" : "M"} ${55 + (x + 4.3) * 70} ${235 - (3 * (x + 2) ** 2 - 7 + 7) * 12}`; }).join(" ");
  return <figure className="pilot-figure"><svg viewBox="0 0 430 290" role="img" aria-labelledby="pilot-graph-title pilot-graph-desc">
    <title id="pilot-graph-title">Example minimum of 3(x + 2)² − 7</title>
    <desc id="pilot-graph-desc">An upward-opening parabola with minimum at negative two, negative seven. The square is zero there; every other x adds a positive amount to negative seven.</desc>
    <defs><clipPath id="pilot-graph-clip"><rect x="35" y="15" width="365" height="250" /></clipPath></defs>
    <path d="M 35 151 H 400 M 356 265 V 20" stroke="#a7b8ae" fill="none" />
    <path d={path} stroke="#207e4c" strokeWidth="3" fill="none" clipPath="url(#pilot-graph-clip)" />
    <path d="M 216 151 V 235 H 356" stroke="#a7b8ae" strokeDasharray="4 5" fill="none" />
    <circle cx="216" cy="235" r="5" fill="#207e4c" /><text x="135" y="268">Minimum (−2, −7)</text><text x="205" y="141">−2</text><text x="365" y="240">−7</text><text x="401" y="148">x</text><text x="365" y="25">y</text>
  </svg><figcaption>Example graph: 3(x + 2)² − 7</figcaption></figure>;
}

function MethodNote({ turning }: { turning: boolean }) {
  if (turning) return <article className="pilot-note">
    <span className="eyebrow">Method note · 2</span><h3>Read a turning point</h3>
    <p>Completing the square turns a quadratic into <span className="pilot-inline-maths">a(x − r)² + s</span>. Its turning point is <strong>(r, s)</strong>.</p>
    <div className="pilot-formula">a(x − r)² + s → (r, s)</div>
    <p>A real square is at least zero. If <strong>a is positive</strong>, the smallest value occurs when the bracket is zero, leaving y = s. This is the minimum.</p>
    <p>For 3(x + 2)² − 7, solve x + 2 = 0. The minimum is <strong>(−2, −7)</strong>.</p>
    <TurningPointPicture />
    <div className="pilot-callout"><strong>Check the sign inside the bracket.</strong><p>(x + 2)² is zero at x = −2. Work it out instead of copying the sign.</p></div>
    <p>If a is negative, the turning point is a <strong>maximum</strong>. And if the question asks for the minimum <em>value</em>, give s; if it asks for the minimum <em>point</em>, give both coordinates.</p>
    <h4>Working backwards</h4><p>If the minimum is (r, s) and the coefficient of x² is 1, start with (x − r)² + s, then expand to find the original coefficients.</p>
  </article>;
  return <article className="pilot-note">
    <span className="eyebrow">Method note · 1</span><h3>Complete the square</h3>
    <p>Rewrite a quadratic as one squared bracket plus a constant. This makes its turning point easier to see.</p>
    <div className="pilot-formula">(x + h)² = x² + 2hx + h²</div>
    <ol className="pilot-method-list">
      <li><strong>Take out the coefficient of x².</strong><p>For example, 3x² + 12x + 5 becomes 3(x² + 4x) + 5. Leave the constant outside.</p></li>
      <li><strong>Halve the coefficient of x inside.</strong><p>Half of 4 is 2, so try (x + 2)².</p></li>
      <li><strong>Compensate for the extra constant.</strong><p>(x + 2)² expands to x² + 4x + 4. We only wanted x² + 4x, so write (x + 2)² − 4.</p></li>
      <li><strong>Multiply out the correction, then tidy up.</strong><p>3[(x + 2)² − 4] + 5 = 3(x + 2)² − 12 + 5 = 3(x + 2)² − 7.</p></li>
    </ol>
    <div className="pilot-callout"><strong>The outside coefficient multiplies the correction too.</strong><p>In 3[(x + 2)² − 4], the correction is 3 × (−4), giving −12.</p></div>
    <h4>Negative or fractional coefficients?</h4><p>The same steps apply. Half of −3 is −3/2. Squaring it gives +9/4, so the compensation is −9/4.</p>
    <p><strong>Final check:</strong> expand your completed-square form. You should recover the original x² term, x term and constant.</p>
  </article>;
}

export default function QuadraticsPilot() {
  const [state, setState] = useState(readSavedPilot);
  const [storageError, setStorageError] = useState(false);
  const [level, setLevel] = useState(0);
  const [message, setMessage] = useState("");
  const [confirmReset, setConfirmReset] = useState<"task" | "all" | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const helpHeading = useRef<HTMLHeadingElement>(null);
  const helpButton = useRef<HTMLButtonElement>(null);
  const index = pilotTasks.findIndex((t) => t.id === state.active);
  const task = pilotTasks[index];
  const answerConfig = task.answerCheck;
  const draft = state.drafts[task.id] ?? emptyDraft();
  const attempts = state.attempts.filter((a) => a.taskId === task.id);
  const exampleIndex = draft.section === "negative-example" ? 1 : 0;
  const example = pilotExamples[exampleIndex];
  const stepCount = draft.steps[exampleIndex];

  function commit(next: PilotState) {
    try { localStorage.setItem(PILOT_STORAGE_KEY, JSON.stringify(next)); setStorageError(false); }
    catch { setStorageError(true); }
    setState(next);
  }

  function updateDraft(update: Partial<TaskDraft>) {
    commit({ ...state, drafts: { ...state.drafts, [task.id]: { ...draft, ...update } } });
  }
  function chooseTask(id: string) {
    commit({ ...state, active: id }); setLevel(0); setMessage(""); setConfirmReset(null);
    requestAnimationFrame(() => heading.current?.focus());
  }
  function chooseHelp(section: HelpSection) {
    updateDraft({ section, helpUsed: [...new Set([...draft.helpUsed, section])] });
  }
  function openHelp() {
    updateDraft({ helpOpen: true, helpUsed: [...new Set([...draft.helpUsed, draft.section])] });
    requestAnimationFrame(() => helpHeading.current?.focus());
  }
  function closeHelp() { updateDraft({ helpOpen: false }); helpButton.current?.focus(); }
  function saveAttempt() {
    if (!level) return;
    commit(recordAttempt(state, task.id, level, new Date().toISOString(), crypto.randomUUID()));
    setMessage(`Level ${level} recorded for this pilot attempt. You can try again whenever you like.`); setLevel(0);
  }
  function reset() {
    if (confirmReset === "all") commit(emptyPilot());
    else commit(restartTask(state, task.id));
    setConfirmReset(null); setLevel(0); setMessage("");
  }
  function download() {
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), ...state }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob), link = document.createElement("a");
    link.href = url; link.download = "quadratics-pilot-notes.json"; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <div className="pilot-page page-width">
    <a className="back-link" href="#/">← Home</a>
    <header className="pilot-heading"><div><span className="eyebrow">Level 3 · Standalone pilot</span><h1>Get unstuck. Then try again.</h1><p>Completing the square & finding a minimum. Try a question, borrow a method, then return to your own work.</p></div><span className="pilot-count">{new Set(state.attempts.map((a) => a.taskId)).size} / {pilotTasks.length}<small>questions logged</small></span></header>
    <details className="pilot-testing"><summary>Testing controls & notes</summary><div className="pilot-testing-content">
      <p>Start with Exam 1 to test the help. Type some work, open a note or an example, close it and continue. Try Fresh try afterwards. Switch questions or refresh to check that drafts stay put.</p>
      <p>This pilot saves only on this device. Its drafts and attempt records are separate from normal paper practice. Restarting a question clears its draft and help history; existing pilot attempt records remain.</p>
      <label htmlFor="pilot-feedback">Your testing notes</label><textarea id="pilot-feedback" rows={3} value={state.feedback} maxLength={15000} onChange={(e) => commit({ ...state, feedback: e.target.value })} placeholder="What felt helpful, confusing or too revealing?" />
      <div className="pilot-button-row"><button className="button button-secondary" onClick={download}>Download test notes</button><button className="button button-secondary" onClick={() => setConfirmReset("task")}>Restart this question</button><button className="button button-secondary" onClick={() => setConfirmReset("all")}>Reset entire pilot</button></div>
      {confirmReset && <div className="pilot-confirm" role="alert"><p>{confirmReset === "all" ? "Clear all pilot drafts, help history, attempt records and testing notes? Normal paper practice stays saved." : "Clear this question’s draft and help history? Saved attempt records stay available."}</p><button className="button button-primary" onClick={reset}>Confirm reset</button> <button className="button button-secondary" onClick={() => setConfirmReset(null)}>Cancel</button></div>}
    </div></details>
    {storageError && <p className="pilot-storage-error" role="alert">This browser could not save the pilot. You can keep testing, but refreshing may lose your changes. Download your test notes before leaving.</p>}
    <nav className="pilot-task-nav" aria-label="Pilot questions">{pilotTasks.map((t, i) => <button key={t.id} aria-current={t.id === task.id ? "step" : undefined} onClick={() => chooseTask(t.id)}><span>{i + 1}</span><strong>{t.label}</strong>{state.attempts.some((a) => a.taskId === t.id) && <small>Logged</small>}</button>)}</nav>
    <div className={`pilot-workspace${draft.helpOpen ? " help-is-open" : ""}`}>
      <section className="pilot-question" aria-labelledby="pilot-question-title">
        <div className="pilot-question-top"><span className="eyebrow">Question {index + 1} of {pilotTasks.length} · {task.label}</span><span className="topic-chip">Quadratics</span></div>
        <h2 id="pilot-question-title" ref={heading} tabIndex={-1}>{task.title}</h2>
        {task.source && <p className="pilot-source">{task.source.label} · adapted for this pilot</p>}
        <p className="pilot-prompt">{task.prompt}</p>
        <button ref={helpButton} className="button button-primary pilot-help-button" aria-expanded={draft.helpOpen} aria-controls="pilot-help" onClick={draft.helpOpen ? closeHelp : openHelp}>{draft.helpOpen ? "Close notes & help" : "Notes & help"}<span aria-hidden="true">{draft.helpOpen ? "−" : "+"}</span></button>
        <label className="pilot-field-label" htmlFor="pilot-workings">Your working <small>Optional · you can also work on paper</small></label>
        <textarea id="pilot-workings" className="pilot-workings" value={draft.workings} maxLength={15000} rows={7} onChange={(e) => updateDraft({ workings: e.target.value })} placeholder="Try a first step here. Your work stays here while you read the help." />
        <label className="pilot-field-label" htmlFor="pilot-answer">Your answer</label>
        <input id="pilot-answer" value={draft.answer} maxLength={1000} onChange={(e) => updateDraft({ answer: e.target.value, outcome: undefined })} placeholder={answerConfig?.placeholder ?? "Write your completed-square expression"} />
        {answerConfig ? <><p className="pilot-format">{answerConfig.hint}</p><button className="button button-secondary" disabled={!draft.answer.trim()} onClick={() => updateDraft({ outcome: checkAnswer(draft.answer, answerConfig) })}>Check final answer</button>
          {draft.outcome && <p role="status" className={`pilot-feedback ${draft.outcome}`}>{draft.outcome === "correct" ? "The final values match. Compare your method too." : draft.outcome === "incorrect" ? "Those values don’t match yet. Check the signs and coordinate order, or open the help." : "I couldn’t read that format. Try two numbers separated by a comma; fractions are accepted."}</p>}
        </> : <p className="pilot-format">This expression uses a guided self-check. Expand your answer to check it, then compare with the solution when you’re ready.</p>}
        <div className="pilot-solution"><button className="pilot-reveal" aria-expanded={draft.solutionOpen} aria-controls="pilot-solution" onClick={() => updateDraft({ solutionOpen: !draft.solutionOpen, solutionSeen: true })}>{draft.solutionOpen ? "Hide" : "Compare with"} this question’s solution <span aria-hidden="true">{draft.solutionOpen ? "−" : "+"}</span></button>
          {draft.solutionOpen && <div id="pilot-solution"><p className="pilot-solution-notice">You’re now viewing the solution to your own question. Using it to build your answer usually fits Level 2; copying it fits Level 1.</p><h3>{task.answer}</h3><ol>{task.solution.map((s) => <li key={s}>{s}</li>)}</ol><h4>Compare your work</h4><ul>{task.comparison.map((s) => <li key={s}>{s}</li>)}</ul></div>}
        </div>
        <section className="pilot-log" aria-label="Log a pilot attempt"><h3>How did you work through it?</h3><p>Notes or a similar example usually fit Level 3. Opening help doesn’t choose a level for you.</p>
          {draft.solutionSeen && <p className="pilot-use-note">You opened this question’s solution since the last question restart. Choose the level that describes how you actually used it.</p>}
          <fieldset><legend>Choose your study method</legend>{methodLevels.map((l) => <label key={l.value} className={level === l.value ? "selected" : ""}><input type="radio" name="pilot-level" checked={level === l.value} onChange={() => { setLevel(l.value); setMessage(""); }} /><span><strong>{l.value} · {l.label}</strong><small>{l.detail}</small></span></label>)}</fieldset>
          <button className="button button-primary" onClick={saveAttempt} disabled={!level}>Record pilot attempt</button><p role="status">{message}</p>
          {attempts.length > 0 && <details><summary>Attempt history ({attempts.length})</summary><ol>{attempts.slice().reverse().map((a) => <li key={a.id}>Level {a.level} · <time dateTime={a.at}>{new Date(a.at).toLocaleString("en-IE")}</time>{a.helpUsed.length > 0 ? " · Help opened" : " · No notes or hints opened"}{a.solutionSeen ? " · Solution opened" : ""}</li>)}</ol></details>}
        </section>
        <div className="pilot-question-footer"><button className="button button-secondary" disabled={index === 0} onClick={() => chooseTask(pilotTasks[index - 1].id)}>← Previous</button><button className="button button-secondary" disabled={index === pilotTasks.length - 1} onClick={() => chooseTask(pilotTasks[index + 1].id)}>Next question →</button></div>
        {task.source && <a className="pilot-source-link" href={`#/book/${task.source.paperId}/parts/${task.source.partId}`}>Open original question in the paper →</a>}
      </section>
      {draft.helpOpen && <aside className="pilot-help" id="pilot-help" aria-labelledby="pilot-help-title"><div className="pilot-help-heading"><div><span className="eyebrow">Borrow a method</span><h2 id="pilot-help-title" ref={helpHeading} tabIndex={-1}>Notes & help</h2></div><button className="pilot-close" onClick={closeHelp} aria-label="Close notes and return to your question">×</button></div>
        <p>Read what you need, then return to your own attempt. Your work stays saved.</p>
        <div className="pilot-help-choices" role="group" aria-label="Choose help">{helpChoices.map((c) => <button key={c.id} aria-pressed={draft.section === c.id} onClick={() => chooseHelp(c.id)}><small>{c.detail}</small><strong>{c.title}</strong></button>)}</div>
        <div className="pilot-help-content">{draft.section === "square" || draft.section === "turning" ? <MethodNote turning={draft.section === "turning"} /> : draft.section === "hint" ? <article className="pilot-note"><span className="eyebrow">A nudge for this question</span><h3>A place to start</h3><p className="pilot-hint">{task.hint}</p><p>Try that step in your own working before opening the full solution.</p></article> : <article className="pilot-note"><span className="eyebrow">Different numbers · same method</span><h3>{example.title}</h3><div className="pilot-formula">{example.expression}</div><p>Try the next step yourself before revealing it.</p><ol className="pilot-example-steps">{example.steps.slice(0, stepCount).map((s, i) => <li key={s.equation}><small>Step {i + 1}</small><div className="pilot-formula">{s.equation}</div><p>{s.explanation}</p></li>)}</ol>{stepCount < example.steps.length ? <button className="button button-primary" onClick={() => { const steps: [number, number] = [...draft.steps]; steps[exampleIndex]++; updateDraft({ steps }); }}>Reveal {stepCount ? "next" : "first"} step</button> : <div className="pilot-callout"><strong>Now return to your own question.</strong><p>Use the method with your question’s numbers.</p></div>}<button className="pilot-text-button" disabled={!stepCount} onClick={() => { const steps: [number, number] = [...draft.steps]; steps[exampleIndex] = 0; updateDraft({ steps }); }}>Start example again</button></article>}</div>
        <button className="button button-secondary pilot-return" onClick={closeHelp}>Return to my question →</button>
      </aside>}
    </div><p className="pilot-device-note">Pilot records and testing notes stay in this browser on this device. Your paper practice records are separate.</p>
  </div>;
}
