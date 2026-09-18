"use client";

import { FormEvent, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

type Stage =
  | "challenge"
  | "guide"
  | "result"
  | "checkup-intro"
  | "checkup"
  | "checkup-result"
  | "grinds"
  | "enquire"
  | "thanks";

type DiagnosticQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correct: string;
  skill: string;
};

type MathKind =
  | "given"
  | "target"
  | "square"
  | "squareResolved"
  | "expanded"
  | "simplified"
  | "final"
  | "threeSquared"
  | "product"
  | "nineMinusTwo"
  | "xSquared";

const guideSteps = [
  {
    move: "Square both sides.",
    moveMath: "square",
    resolvedMath: "squareResolved",
    questionMath: "threeSquared",
    options: ["6", "9", "12"],
    correct: "9",
    explanation: "3 × 3 is 9. Now the equation has the squared expression we need.",
  },
  {
    move: "Open the brackets. The squared terms appear.",
    moveMath: "expanded",
    resolvedMath: "simplified",
    questionMath: "product",
    options: ["0", "1", "x²"],
    correct: "1",
    explanation: "A value times its reciprocal is 1, so the middle term becomes 2.",
  },
  {
    move: "The expression we want is here. Remove the extra 2.",
    moveMath: "simplified",
    resolvedMath: "final",
    questionMath: "nineMinusTwo",
    options: ["7", "9", "11"],
    correct: "7",
    explanation: "9 − 2 is 7. That's the value of the expression we were looking for.",
  },
] satisfies { move: string; moveMath: MathKind; resolvedMath: MathKind; questionMath: MathKind; options: readonly string[]; correct: string; explanation: string }[];

const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: "equations",
    prompt: "Solve 3(2x − 1) = 15",
    options: ["x = 2", "x = 3", "x = 4", "x = 6"],
    correct: "x = 3",
    skill: "Equations",
  },
  {
    id: "fractions",
    prompt: "What is ⅔ − ¼?",
    options: ["⅒", "⁵⁄₁₂", "¹⁄₂", "⁷⁄₁₂"],
    correct: "⁵⁄₁₂",
    skill: "Fractions & signs",
  },
  {
    id: "quadratics",
    prompt: "The roots of x² − 5x + 6 = 0 are…",
    options: ["1 and 6", "−2 and −3", "2 and 3", "−1 and −6"],
    correct: "2 and 3",
    skill: "Quadratics",
  },
  {
    id: "graphs",
    prompt: "What is the gradient from (1, 2) to (4, 8)?",
    options: ["½", "2", "3", "6"],
    correct: "2",
    skill: "Functions & graphs",
  },
  {
    id: "probability",
    prompt: "A fair die is rolled. P(number greater than 4) = ?",
    options: ["⅙", "⅓", "½", "⅔"],
    correct: "⅓",
    skill: "Probability",
  },
];

function MathX() {
  return <mi>𝑥</mi>;
}

function XSquared({ className = "" }: { className?: string }) {
  return <msup className={className || undefined}><MathX /><mn>2</mn></msup>;
}

function Reciprocal({ squared = false, className = "" }: { squared?: boolean; className?: string }) {
  return <mfrac className={className || undefined}><mn>1</mn>{squared ? <XSquared /> : <MathX />}</mfrac>;
}

const mathLabels: Record<MathKind, string> = {
  given: "x plus one over x equals three",
  target: "x squared plus one over x squared equals what",
  square: "the quantity x plus one over x, squared, equals three squared",
  squareResolved: "the quantity x plus one over x, squared, equals nine",
  expanded: "x squared plus two times x times one over x plus one over x squared equals nine",
  simplified: "nine equals x squared plus two plus one over x squared",
  final: "x squared plus one over x squared equals seven",
  threeSquared: "three squared",
  product: "x times one over x",
  nineMinusTwo: "nine minus two",
  xSquared: "x squared",
};

function MathExpression({ kind, className = "" }: { kind: MathKind; className?: string }) {
  return (
    <math className={`math-expression ${className}`} aria-label={mathLabels[kind]}>
      {kind === "given" && <><MathX /><mo>+</mo><Reciprocal /><mo>=</mo><mn>3</mn></>}
      {kind === "target" && <><XSquared className="goal-term" /><mo>+</mo><Reciprocal squared className="goal-term" /><mo>=</mo><mo>?</mo></>}
      {(kind === "square" || kind === "squareResolved") && <>
        <msup className="goal-term"><mrow><mo>(</mo><MathX /><mo>+</mo><Reciprocal /><mo>)</mo></mrow><mn>2</mn></msup>
        <mo>=</mo>{kind === "square" ? <msup><mn>3</mn><mn>2</mn></msup> : <mn>9</mn>}
      </>}
      {kind === "expanded" && <>
        <XSquared className="goal-term" /><mo>+</mo><mn>2</mn><mo>·</mo><MathX /><mo>·</mo><mo>(</mo><Reciprocal /><mo>)</mo>
        <mo>+</mo><Reciprocal squared className="goal-term" /><mo>=</mo><mn>9</mn>
      </>}
      {kind === "simplified" && <><mn>9</mn><mo>=</mo><XSquared className="goal-term" /><mo>+</mo><mn>2</mn><mo>+</mo><Reciprocal squared className="goal-term" /></>}
      {kind === "final" && <><XSquared className="goal-term" /><mo>+</mo><Reciprocal squared className="goal-term" /><mo>=</mo><mn>7</mn></>}
      {kind === "threeSquared" && <msup><mn>3</mn><mn>2</mn></msup>}
      {kind === "product" && <><MathX /><mo>·</mo><Reciprocal /></>}
      {kind === "nineMinusTwo" && <><mn>9</mn><mo>−</mo><mn>2</mn></>}
      {kind === "xSquared" && <XSquared />}
    </math>
  );
}

function PosterEquation() {
  return (
    <div className="problem">
      <MathExpression kind="given" className="poster-equation" />
      <MathExpression kind="target" className="poster-equation equation-question" />
    </div>
  );
}

function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function getPosterLabel() {
  const params = new URLSearchParams(window.location.search);
  const rawPoster = params.get("poster_id") || params.get("creative") || "";
  const safePoster = rawPoster.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 32);
  return safePoster ? safePoster.replace(/[-_]/g, " ") : "Poster scan";
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("challenge");
  const [seconds, setSeconds] = useState(60);
  const [directAnswer, setDirectAnswer] = useState("");
  const [solutionPath, setSolutionPath] = useState<"direct" | "guided">("guided");
  const [solutionSeen, setSolutionSeen] = useState(false);
  const [guideIndex, setGuideIndex] = useState(0);
  const [guideChoice, setGuideChoice] = useState<string | null>(null);
  const posterLabel = useSyncExternalStore(subscribeToUrl, getPosterLabel, () => "Poster scan");
  const [course, setCourse] = useState("Leaving Cert");
  const [level, setLevel] = useState("Higher Level");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionChoice, setQuestionChoice] = useState<string | null>(null);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, string>>({});
  const [shareState, setShareState] = useState("");
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");
  const startedAt = useRef<number | null>(null);
  const activeGuideStep = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (stage !== "challenge") return;
    if (startedAt.current === null) startedAt.current = Date.now();
    const interval = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - (startedAt.current ?? Date.now())) / 1000);
      setSeconds(Math.max(60 - elapsed, 0));
    }, 250);
    return () => window.clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    if (stage !== "guide" || guideIndex === 0) return;
    const target = activeGuideStep.current;
    if (!target) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }, [stage, guideIndex]);

  const prioritySkills = useMemo(() => {
    const missed = diagnosticQuestions
      .filter((question) => diagnosticAnswers[question.id] !== question.correct)
      .map((question) => question.skill);
    return Array.from(new Set(missed)).slice(0, 3);
  }, [diagnosticAnswers]);

  const score = useMemo(
    () => diagnosticQuestions.filter((question) => diagnosticAnswers[question.id] === question.correct).length,
    [diagnosticAnswers],
  );

  function goTo(nextStage: Stage) {
    setStage(nextStage);
    window.scrollTo(0, 0);
  }

  function startGuide() {
    setSolutionPath("guided");
    setGuideIndex(0);
    setGuideChoice(null);
    goTo("guide");
  }

  function checkDirectAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!directAnswer.trim()) return;
    if (Number(directAnswer.trim()) === 7) {
      setSolutionPath("direct");
      setSolutionSeen(true);
      goTo("result");
      return;
    }
    startGuide();
  }

  function continueGuide() {
    if (!guideChoice) return;
    if (guideIndex === guideSteps.length - 1) {
      setSolutionSeen(true);
    }
    setGuideIndex((current) => current + 1);
    setGuideChoice(null);
  }

  function startCheckup() {
    setQuestionIndex(0);
    setQuestionChoice(null);
    setDiagnosticAnswers({});
    goTo("checkup");
  }

  function saveDiagnosticAnswer() {
    if (!questionChoice) return;
    const question = diagnosticQuestions[questionIndex];
    const nextAnswers = { ...diagnosticAnswers, [question.id]: questionChoice };
    setDiagnosticAnswers(nextAnswers);

    if (questionIndex === diagnosticQuestions.length - 1) {
      goTo("checkup-result");
      return;
    }

    setQuestionIndex((current) => current + 1);
    setQuestionChoice(null);
    window.scrollTo(0, 0);
  }

  async function shareResult() {
    const topicCopy = prioritySkills.length
      ? prioritySkills.join(", ")
      : "a strong start across the sample topics";
    const text = `I tried a short maths check-up and got ${score}/5. It suggested: ${topicCopy}. Could we look at the available grinds?`;

    try {
      if (navigator.share) {
        await navigator.share({ title: "My maths check-up", text, url: window.location.href });
        setShareState("Shared");
      } else {
        await navigator.clipboard.writeText(`${text} ${window.location.href}`);
        setShareState("Link copied");
      }
    } catch {
      setShareState("Ready when you are");
    }
  }

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    goTo("thanks");
  }

  if (stage === "challenge") {
    return (
      <main className="challenge-shell">
        <div className="paper-noise" aria-hidden="true" />
        <header className="challenge-kicker">
          <span>60 seconds. No calculator.</span>
          <span>{posterLabel}</span>
        </header>

        <section className="challenge-card" aria-labelledby="challenge-title">
          <h1 id="challenge-title" className="timer" aria-label={`${seconds} seconds remaining`}>
            {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
          </h1>
          <div className="rule" />
          <PosterEquation />

          <button className="lock-button" type="button" onClick={startGuide}>
            <span>Get the first hint</span><span aria-hidden="true">→</span>
          </button>
          <form className="direct-answer" onSubmit={checkDirectAnswer}>
            <label htmlFor="direct-answer">Already got an answer? Type it here.</label>
            <div className="direct-answer-row">
              <input
                id="direct-answer"
                name="answer"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={directAnswer}
                onChange={(event) => setDirectAnswer(event.target.value)}
                aria-label="Your numerical answer"
              />
              <button type="submit" disabled={!directAnswer.trim()}>Check answer</button>
            </div>
          </form>
        </section>

        <footer className="challenge-footer">
          <p>No sign-up. Help at your pace.</p>
          <button className="text-link" type="button" onClick={() => goTo("grinds")}>
            Already looking for grinds? <span>See options</span>
          </button>
        </footer>
      </main>
    );
  }

  if (stage === "guide") {
    return (
      <main className="guide-page">
        <header className="guide-topline">
          <button className="text-link" type="button" onClick={() => goTo("challenge")}>← The question</button>
          <span>{guideIndex === guideSteps.length ? "Solution complete" : `Move ${guideIndex + 1} of ${guideSteps.length}`}</span>
        </header>
        <section className="guide-goal" aria-label="The question we are solving">
          <div className="guide-goal-inner">
            <div className="guide-goal-item">
              <span>Given</span>
              <MathExpression kind="given" className="goal-math" />
            </div>
            <div className="guide-goal-item">
              <span>Find</span>
              <MathExpression kind="target" className="goal-math" />
            </div>
          </div>
        </section>

        <section className="guide-content" aria-labelledby="guide-title">
          <h1 id="guide-title">Make it look like the question.</h1>
          <div className="guide-chain">
            {guideSteps.map((step, index) => {
              if (index > guideIndex) return null;
              const current = index === guideIndex;
              const resolved = !current || guideChoice !== null;
              return (
                <section key={index} ref={current ? activeGuideStep : undefined} className={`chain-step ${current ? "active" : "complete"}`}>
                  <p className="chain-cue"><span aria-hidden="true">0{index + 1}</span>{step.move}</p>
                  <div className="math-line">
                    <MathExpression kind={resolved ? step.resolvedMath : step.moveMath} className="chain-math" />
                  </div>
                  {current && (
                    <fieldset className="guide-options">
                      <legend>What is <MathExpression kind={step.questionMath} className="question-math" />?</legend>
                      <div className="guide-option-grid">
                        {step.options.map((option) => (
                          <label key={option} className={guideChoice === option ? "selected" : ""}>
                            <input type="radio" name={`guide-step-${index}`} value={option} checked={guideChoice === option} onChange={() => setGuideChoice(option)} />
                            <span>{option === "x²" ? <MathExpression kind="xSquared" className="choice-math" /> : option}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )}
                  {current && guideChoice && (
                    <div className="guide-feedback" role="status">
                      <p><strong>{guideChoice === step.correct ? "That fits." : "Here’s the useful bit:"}</strong> {step.explanation}</p>
                      <button className="lock-button" type="button" onClick={continueGuide}>
                        <span>{index === guideSteps.length - 1 ? "See the finished chain" : "Next move"}</span><span aria-hidden="true">→</span>
                      </button>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
          {guideIndex === guideSteps.length && (
            <section ref={activeGuideStep} className="chain-complete">
              <p className="guide-eyebrow">You reached the answer</p>
              <h2>That’s 7.</h2>
              <p>Squaring made the equation look like the question. The only extra part was 2, so the answer is 9 − 2.</p>
              <div className="action-stack">
                <button className="primary-button" type="button" onClick={() => goTo("grinds")}>See maths grind options <span>→</span></button>
                <button className="secondary-button" type="button" onClick={() => goTo("challenge")}>Try the question again</button>
              </div>
            </section>
          )}
        </section>
        <footer className="challenge-footer">
          <p>Take your time. Every step counts.</p>
          <button className="text-link" type="button" onClick={() => goTo("grinds")}>Looking for grinds? <span>See options</span></button>
        </footer>
      </main>
    );
  }

  if (stage === "result") {
    return (
      <main className="light-page result-page">
        <header className="brand-bar">
          <button type="button" onClick={() => goTo("challenge")}>← Challenge 01</button>
          <span>North Dublin maths</span>
        </header>
        <section className="result-hero">
          <p className="section-label">The solution</p>
          <h1>The answer is 7.</h1>
          <p className="result-note">
            {solutionPath === "direct" ? "Nicely spotted. Here’s the short explanation." : "One clear move at a time. Here’s how it all fits together."}
          </p>
        </section>
        <section className="worked-solution" aria-labelledby="solution-title">
          <div>
            <p className="section-label dark-label">The worked solution</p>
            <h2 id="solution-title">Square the whole expression.</h2>
          </div>
          <ol>
            <li><MathExpression kind="squareResolved" className="solution-math" /></li>
            <li><MathExpression kind="simplified" className="solution-math" /></li>
            <li><MathExpression kind="final" className="solution-math" /></li>
          </ol>
        </section>
        <section className="next-step-panel">
          <div>
            <p className="section-label">Keep the clarity going</p>
            <h2>Want more maths to feel this clear?</h2>
            <p>See how maths grinds can help with the steps that get in your way.</p>
          </div>
          <div className="action-stack">
            <button className="primary-button" type="button" onClick={() => goTo("grinds")}>See maths grind options <span>→</span></button>
            <button className="secondary-button" type="button" onClick={() => goTo("challenge")}>Try the question again</button>
          </div>
        </section>
      </main>
    );
  }

  if (stage === "checkup-intro") {
    return (
      <main className="light-page checkup-page">
        <header className="brand-bar"><button type="button" onClick={() => goTo("result")}>← Your answer</button><span>5-minute check-up</span></header>
        <section className="checkup-intro">
          <p className="section-label">First, the basics</p>
          <h1>Make the questions fit you.</h1>
          <p>This context stays anonymous and only shapes your result.</p>

          <div className="choice-block">
            <span className="choice-label">Course</span>
            <div className="segmented-control">
              {["Leaving Cert", "Junior Cycle"].map((option) => (
                <button key={option} type="button" className={course === option ? "active" : ""} onClick={() => setCourse(option)}>{option}</button>
              ))}
            </div>
          </div>
          <div className="choice-block">
            <span className="choice-label">Level</span>
            <div className="segmented-control">
              {["Higher Level", "Ordinary Level"].map((option) => (
                <button key={option} type="button" className={level === option ? "active" : ""} onClick={() => setLevel(option)}>{option}</button>
              ))}
            </div>
          </div>
          <button className="primary-button wide-button" type="button" onClick={startCheckup}>Start the check-up <span>5 questions →</span></button>
        </section>
      </main>
    );
  }

  if (stage === "checkup") {
    const question = diagnosticQuestions[questionIndex];
    return (
      <main className="quiz-page">
        <div className="quiz-topline">
          <span>{course} · {level}</span>
          <span>Question {questionIndex + 1} of {diagnosticQuestions.length}</span>
        </div>
        <div className="progress-track"><span style={{ width: `${((questionIndex + 1) / diagnosticQuestions.length) * 100}%` }} /></div>
        <section className="quiz-card">
          <p className="section-label">{question.skill}</p>
          <h1>{question.prompt}</h1>
          <fieldset className="quiz-options">
            <legend>Choose one answer</legend>
            {question.options.map((option, index) => (
              <label key={option} className={questionChoice === option ? "selected" : ""}>
                <input type="radio" name={question.id} value={option} checked={questionChoice === option} onChange={() => setQuestionChoice(option)} />
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span>{option}</span>
              </label>
            ))}
          </fieldset>
          <button className="primary-button wide-button" type="button" onClick={saveDiagnosticAnswer} disabled={!questionChoice}>
            {questionIndex === diagnosticQuestions.length - 1 ? "See my result" : "Next question"}<span>→</span>
          </button>
        </section>
      </main>
    );
  }

  if (stage === "checkup-result") {
    const strongStart = prioritySkills.length === 0;
    return (
      <main className="light-page priorities-page">
        <header className="brand-bar"><span>Maths check-up</span><span>{score} / 5</span></header>
        <section className="priorities-hero">
          <p className="section-label">Your result</p>
          <h1>{strongStart ? "Strong start." : "Your first priorities."}</h1>
          <p>{strongStart ? "You handled this short sample confidently. Harder mixed questions and exam technique are the natural next step." : "This is a quick signal, not a grade prediction. Start with the areas below."}</p>
        </section>

        <section className="priority-list">
          {strongStart ? (
            <div className="priority-item"><span>01</span><h2>Mixed exam questions</h2><p>Build speed and confidence when several topics appear together.</p></div>
          ) : prioritySkills.map((skill, index) => (
            <div className="priority-item" key={skill}><span>0{index + 1}</span><h2>{skill}</h2><p>Revisit the core method, then practise it inside a mixed question.</p></div>
          ))}
        </section>

        <section className="result-actions">
          <button className="primary-button" type="button" onClick={() => goTo("grinds")}>See grind options <span>→</span></button>
          <button className="secondary-button" type="button" onClick={shareResult}>Send this to a parent</button>
          {shareState && <p className="share-state" role="status">{shareState}</p>}
        </section>
      </main>
    );
  }

  if (stage === "grinds") {
    return (
      <main className="light-page grinds-page" id="grinds">
        <header className="brand-bar"><button type="button" onClick={() => goTo(solutionSeen ? solutionPath === "guided" ? "guide" : "result" : "challenge")}>← Back</button><span>North Dublin maths</span></header>
        <section className="grinds-hero">
          <p className="section-label">Leaving Cert + Junior Cycle</p>
          <h1>Maths grinds that find the step you’re missing.</h1>
          <p>Clear explanations, focused practice and a practical plan for what to work on next.</p>
          <button className="primary-button" type="button" onClick={() => goTo("enquire")}>Request a grind <span>→</span></button>
        </section>

        <section className="approach-grid">
          <article><span>01</span><h2>Start with the evidence</h2><p>Bring a recent test, a problem topic or your check-up result. We begin where the marks are being lost.</p></article>
          <article><span>02</span><h2>Make the method click</h2><p>Work through the exact step clearly, then practise it until it feels repeatable.</p></article>
          <article><span>03</span><h2>Leave with a plan</h2><p>Finish knowing what to revise, what to practise and what to ask about next time.</p></article>
        </section>

        <section className="setup-panel">
          <p className="section-label dark-label">Before the QR goes live</p>
          <h2>Add your real formats, prices, locations and current slots here.</h2>
          <p>The page deliberately does not invent qualifications, availability or testimonials.</p>
        </section>

        <section className="bottom-cta">
          <div><p className="section-label">No commitment</p><h2>Ask about the right option.</h2></div>
          <button className="primary-button" type="button" onClick={() => goTo("enquire")}>Request a grind <span>→</span></button>
        </section>
      </main>
    );
  }

  if (stage === "enquire") {
    return (
      <main className="light-page enquiry-page">
        <header className="brand-bar"><button type="button" onClick={() => goTo("grinds")}>← Grind options</button><span>Enquiry</span></header>
        <section className="form-heading">
          <p className="section-label">Parent or guardian</p>
          <h1>Tell me what would help.</h1>
          <p>This is a request, not a confirmed booking. You’ll receive the available options before deciding.</p>
        </section>

        <form className="enquiry-form" onSubmit={submitEnquiry}>
          <label><span>Your name</span><input type="text" name="guardianName" autoComplete="name" required placeholder="Parent or guardian name" /></label>
          <fieldset>
            <legend>Preferred contact</legend>
            <div className="contact-tabs">
              <button type="button" className={contactMethod === "email" ? "active" : ""} onClick={() => setContactMethod("email")}>Email</button>
              <button type="button" className={contactMethod === "phone" ? "active" : ""} onClick={() => setContactMethod("phone")}>Phone</button>
            </div>
          </fieldset>
          <label>
            <span>{contactMethod === "email" ? "Email address" : "Phone number"}</span>
            <input type={contactMethod === "email" ? "email" : "tel"} name="contact" autoComplete={contactMethod === "email" ? "email" : "tel"} required placeholder={contactMethod === "email" ? "you@example.com" : "08x xxx xxxx"} />
          </label>
          <label><span>Student stage</span><select name="studentStage" defaultValue={course}><option>Leaving Cert</option><option>Junior Cycle</option></select></label>
          <label><span>What would you like help with? <em>Optional</em></span><textarea name="message" rows={4} placeholder="A topic, upcoming exam, or suitable days…" /></label>
          <label className="privacy-check"><input type="checkbox" required /><span>I understand these details will be used to respond to this grind enquiry.</span></label>
          <button className="primary-button wide-button" type="submit">Send request <span>→</span></button>
          <p className="form-note">Demo note: connect this form to your email and database before publishing the QR.</p>
        </form>
      </main>
    );
  }

  return (
    <main className="thanks-page">
      <div className="paper-noise" aria-hidden="true" />
      <section>
        <p className="section-label">Local preview only</p>
        <h1>Form preview.</h1>
        <p>This request wasn’t sent. Enquiries will work after the contact service is connected.</p>
        <button className="dark-button" type="button" onClick={() => goTo("challenge")}>Back to the challenge <span>↗</span></button>
      </section>
    </main>
  );
}
