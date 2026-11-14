import { useState } from "react";
import { findBookPaper, findRealPaper } from "../data/realCatalogue";
import { MethodAttemptLog } from "./MethodAttemptLog";
import { latestByPart, paperMethodProgress, readMethodAttempts } from "../utils/methodAttempts";

const topicNames: Record<string, string> = {
  "p1-number": "Number and arithmetic",
  "p1-algebra": "Algebra",
  "p1-sequences": "Sequences and series",
  "p1-complex": "Complex numbers",
  "p1-calculus": "Functions and calculus",
  "p1-graphs": "Functions and graphs",
  "p2-line": "Coordinate geometry · The line",
  "p2-circle": "Coordinate geometry · The circle",
  "p2-geometry": "Geometry, area and volume",
  "p2-probability": "Probability",
  "p2-statistics": "Statistics",
  "p2-trigonometry": "Trigonometry",
};

export function BookPaper({ paperId, partId }: { paperId: string; partId?: string }) {
  const [attempts] = useState(readMethodAttempts);
  const bookPaper = findBookPaper(paperId);
  const readyPaper = findRealPaper(paperId);
  if (!bookPaper) return <div className="book-page page-width"><h1>Paper not found</h1><a href="#/papers">Back to papers</a></div>;
  const paperPath = `/book/${paperId}`;
  const partPath = (id: string) => `${paperPath}/parts/${id}`;
  const paperLabel = `${bookPaper.year} Paper ${bookPaper.number}`;
  const part = partId ? bookPaper.parts.find((item) => item.id === partId) : undefined;
  const paperAttempts = attempts.filter((attempt) => bookPaper.parts.some((item) => item.id === attempt.partId));
  const history = latestByPart(paperAttempts);
  const progress = paperMethodProgress(paperAttempts);

  if (partId && !part) {
    return <div className="book-page page-width"><h1>Part not found</h1><a href={`#${paperPath}`}>Back to the paper</a></div>;
  }

  if (!part) {
    return (
      <div className="book-page page-width">
        <a className="back-link" href="#/papers">← All papers</a>
        <div className="book-heading">
          <span className="eyebrow">Real paper · Practice</span>
          <h1>{bookPaper.year} Higher Level · Paper {bookPaper.number}</h1>
          <p>{readyPaper?.questions.length ?? 0} of {bookPaper.parts.length} parts are ready in the study screen with a workings pad and answer feedback.{(readyPaper?.questions.length ?? 0) < bookPaper.parts.length ? " The other parts use the book companion while they are reviewed." : ""}</p>
        </div>
        <p className="book-storage-note">Practice records are saved only in this browser on this device. They are not connected to a tracker account.</p>
        <section className="book-progress" aria-label="Your paper progress">
          <div><strong>{progress.parts}<span> / {bookPaper.parts.length}</span></strong><small>different parts logged</small></div>
          <div><strong>{progress.attempts}</strong><small>attempts, including repeats</small></div>
          <div><strong>{progress.improved}</strong><small>parts improved</small></div>
          <div><strong>{progress.independent}</strong><small>latest at Level 4 or 5</small></div>
        </section>
        <p className="book-scale-note">Levels describe the help you used, not an exam mark or predicted grade. Repeats count as new attempts.</p>
        <div className="book-question-list">
          {bookPaper.questions.map((question) => {
            const parts = bookPaper.parts.filter((item) => item.label.startsWith(`Q${question.number}(`));
            const logged = parts.filter((item) => history.has(item.id)).length;
            return (
              <section className="book-question" key={question.number}>
                <div className="book-question-heading"><div><h2>Question {question.number}</h2><span>{parts.length} parts · starts on printed page {question.sourcePage}</span></div><strong>{logged}/{parts.length} logged</strong></div>
                <div className="book-part-grid">
                  {parts.map((item) => {
                    const row = history.get(item.id);
                    return <a key={item.id} href={`#${partPath(item.id)}`} className="book-part-link"><strong>{item.label}</strong><span>{readyPaper?.questions.some((question) => question.id === item.id) ? "Question in app" : "Use book"}</span><span>{row ? `Level ${row.latest.methodScore} · ${row.count} ${row.count === 1 ? "attempt" : "attempts"}` : "Not attempted"}</span></a>;
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    );
  }

  const index = bookPaper.parts.findIndex((item) => item.id === part.id);
  const previous = bookPaper.parts[index - 1];
  const next = bookPaper.parts[index + 1];

  return (
    <div className="book-page book-part-page page-width">
      <div className="book-part-top"><a className="back-link" href={`#${paperPath}`}>← {paperLabel}</a><span>Part {index + 1} of {bookPaper.parts.length}</span></div>
      <div className="book-part-layout">
        <section className="book-part-panel">
          <div className="book-part-meta"><span className="eyebrow">{bookPaper.year} Higher Level · Paper {bookPaper.number}</span><span>Printed page {part.sourcePage}</span></div>
          <h1>{part.label}</h1>
          <div className="book-topic-row">{part.topicIds.map((id) => <span className="topic-chip" key={id}>{topicNames[id] ?? id}</span>)}</div>
          <div className="book-work-prompt"><h2>Work through this part</h2><p>Find <strong>{part.label}</strong> in your Edco {bookPaper.year} Higher Level Paper {bookPaper.number}. Try it on paper, then check your work with the book, your notes or your tutor before recording the level that fits.</p><p>This part has not yet been reviewed for the onscreen study screen. Individual part marks have not been verified.</p></div>
          <div className="book-nav">{previous ? <a href={`#${partPath(previous.id)}`}>← {previous.label}</a> : <span />}{next ? <a href={`#${partPath(next.id)}`}>{next.label} →</a> : <a href={`#${paperPath}`}>Finish paper →</a>}</div>
        </section>
        <MethodAttemptLog key={part.id} partId={part.id} />
      </div>
    </div>
  );
}
