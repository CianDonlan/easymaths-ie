import { useId } from "react";
import type { FormEvent } from "react";
import type { AnswerAttempt, AnswerCheck, AnswerCheckOutcome } from "../types";
import { checkAnswer } from "../utils/checkAnswer";

interface FinalAnswerCheckProps {
  config: AnswerCheck;
  answer: string;
  outcome?: AnswerCheckOutcome;
  history: AnswerAttempt[];
  totalAttempts: number;
  badge?: string;
  onAnswerChange: (answer: string) => void;
  onCheck: (outcome: AnswerCheckOutcome, answer: string) => void;
}

const feedback = {
  correct: {
    title: "That’s correct",
    message: "Nice work. You can still compare your method with the worked solution below.",
    icon: "✓",
  },
  incorrect: {
    title: "Not quite yet",
    message: "Check your working and try again. The answer and solution are still hidden.",
    icon: "↻",
  },
  unreadable: {
    title: "We couldn’t read that format",
    message: "Try a number, decimal, fraction or percentage—or enter algebraic solutions separated by ‘or’.",
    icon: "?",
  },
} as const;

const outcomeLabels = {
  correct: "Correct",
  incorrect: "Not quite",
  unreadable: "Format not read",
} as const;

export function FinalAnswerCheck({
  config,
  answer,
  outcome,
  history,
  totalAttempts,
  badge = "Checking pilot",
  onAnswerChange,
  onCheck,
}: FinalAnswerCheckProps) {
  const inputId = useId();
  const hintId = `${inputId}-hint`;
  const feedbackId = `${inputId}-feedback`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!answer.trim()) return;
    onCheck(checkAnswer(answer, config), answer);
  };

  const currentFeedback = outcome ? feedback[outcome] : null;

  return (
    <section className="answer-checker" aria-labelledby={`${inputId}-title`}>
      <div className="answer-checker-heading">
        <div>
          <span className="answer-checker-eyebrow">CHECK YOURSELF</span>
          <h2 id={`${inputId}-title`}>Enter your final answer</h2>
        </div>
        <span className="answer-checker-pilot">{badge}</span>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <label className="visually-hidden" htmlFor={inputId}>Your final answer</label>
        <div className="answer-checker-row">
          <input
            id={inputId}
            type="text"
            value={answer}
            placeholder={config.placeholder}
            aria-describedby={`${hintId}${outcome ? ` ${feedbackId}` : ""}`}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            onChange={(event) => onAnswerChange(event.target.value)}
          />
          <button
            className="button button-primary answer-check-button"
            type="submit"
            disabled={!answer.trim()}
          >
            Check answer <span aria-hidden="true">→</span>
          </button>
        </div>
        <p className="answer-checker-hint" id={hintId}>{config.hint}</p>
      </form>

      <div className="answer-feedback-live" aria-live="polite">
        {currentFeedback && (
          <div className={`answer-feedback is-${outcome}`} id={feedbackId}>
            <span className="answer-feedback-icon" aria-hidden="true">{currentFeedback.icon}</span>
            <div>
              <strong>{currentFeedback.title}</strong>
              <p>{outcome === "unreadable" && badge !== "Checking pilot"
                ? "We couldn't check that form. Try the format in the hint above, or compare with the worked answer."
                : currentFeedback.message}</p>
            </div>
          </div>
        )}
      </div>

      {history.length > 0 && (
        <details className="answer-history">
          <summary>
            <span>
              {totalAttempts > history.length
                ? `${history.length} recent of ${totalAttempts} attempts saved on this device`
                : `${totalAttempts} ${totalAttempts === 1 ? "attempt" : "attempts"} saved on this device`}
            </span>
            <span className="answer-history-action" aria-hidden="true" />
          </summary>
          <ol>
            {[...history].reverse().map((attempt, index) => {
              const attemptNumber = totalAttempts - index;
              return (
                <li key={attemptNumber}>
                  <span>Attempt {attemptNumber}</span>
                  <strong>{attempt.answer}</strong>
                  <span className={`history-outcome is-${attempt.outcome}`}>
                    {outcomeLabels[attempt.outcome]}
                  </span>
                </li>
              );
            })}
          </ol>
        </details>
      )}
    </section>
  );
}
