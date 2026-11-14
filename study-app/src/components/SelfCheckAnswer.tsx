import { useState } from "react";

export function SelfCheckAnswer({ answer, placeholder, checks, onAnswerChange, onShowSolution }: {
  answer: string;
  placeholder: string;
  checks: string[];
  onAnswerChange: (value: string) => void;
  onShowSolution: () => void;
}) {
  const [compared, setCompared] = useState(false);
  return <section className="answer-checker" aria-labelledby="self-check-title">
    <div className="answer-checker-heading">
      <div><span className="answer-checker-eyebrow">CHECK YOURSELF</span><h2 id="self-check-title">Explain your reasoning</h2></div>
      <span className="answer-checker-pilot">Guided self-check</span>
    </div>
    <label className="visually-hidden" htmlFor="self-check-response">Your reasoning</label>
    <textarea id="self-check-response" className="self-check-response" rows={5} value={answer} onChange={(event) => { onAnswerChange(event.target.value); setCompared(false); }} placeholder={placeholder} />
    <button className="button button-primary self-check-button" type="button" onClick={() => { setCompared(true); onShowSolution(); }}>Compare with worked solution <span aria-hidden="true">→</span></button>
    {compared && <div className="answer-feedback is-unreadable" role="status"><span className="answer-feedback-icon" aria-hidden="true">↳</span><div><strong>Compare each step</strong><ul>{checks.map((check) => <li key={check}>{check}</li>)}</ul><p>This response is not automatically graded.</p></div></div>}
  </section>;
}
