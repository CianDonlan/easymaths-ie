"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Stage =
  | "challenge"
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

const challengeAnswers = ["5", "7", "9", "11"];

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

function PosterEquation() {
  return (
    <div className="problem" aria-label="If x plus one over x equals three, what is x squared plus one over x squared?">
      <div className="equation">
        <i>x</i><span>+</span>
        <span className="fraction"><span>1</span><span><i>x</i></span></span>
        <span>=</span><span>3</span>
      </div>
      <div className="equation equation-question">
        <span><i>x</i><sup>2</sup></span><span>+</span>
        <span className="fraction"><span>1</span><span><i>x</i><sup>2</sup></span></span>
        <span>=</span><span>?</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("challenge");
  const [seconds, setSeconds] = useState(20);
  const [answer, setAnswer] = useState<string | null>(null);
  const [posterLabel, setPosterLabel] = useState("Poster scan");
  const [course, setCourse] = useState("Leaving Cert");
  const [level, setLevel] = useState("Higher Level");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionChoice, setQuestionChoice] = useState<string | null>(null);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, string>>({});
  const [shareState, setShareState] = useState("");
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");
  const startedAt = useRef(Date.now());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawPoster = params.get("poster_id") || params.get("creative");
    if (rawPoster) {
      const safePoster = rawPoster.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 32);
      if (safePoster) setPosterLabel(safePoster.replace(/[-_]/g, " "));
    }
  }, []);

  useEffect(() => {
    if (stage !== "challenge") return;
    const interval = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt.current) / 1000);
      setSeconds(Math.max(20 - elapsed, 0));
    }, 250);
    return () => window.clearInterval(interval);
  }, [stage]);

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

  function lockChallengeAnswer() {
    if (answer) goTo("result");
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
          <span>North Dublin maths challenge</span>
          <span>{posterLabel}</span>
        </header>

        <section className="challenge-card" aria-labelledby="challenge-title">
          <p className="eyebrow">You’re already being timed.</p>
          <h1 id="challenge-title" className="timer" aria-label={`${seconds} seconds remaining`}>
            00:{String(seconds).padStart(2, "0")}
          </h1>
          <div className="rule" />
          <PosterEquation />

          <fieldset className="answers">
            <legend>Choose your answer</legend>
            <div className="answer-grid">
              {challengeAnswers.map((option) => (
                <label key={option} className={`answer-option ${answer === option ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="challenge-answer"
                    value={option}
                    checked={answer === option}
                    onChange={() => setAnswer(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button className="lock-button" type="button" onClick={lockChallengeAnswer} disabled={!answer}>
            <span>Lock in your answer</span><span aria-hidden="true">→</span>
          </button>
        </section>

        <footer className="challenge-footer">
          <p>No calculator. No sign-up. Just have a go.</p>
          <button className="text-link" type="button" onClick={() => goTo("grinds")}>
            Already looking for grinds? <span>See availability</span>
          </button>
        </footer>
      </main>
    );
  }

  if (stage === "result") {
    const correct = answer === "7";
    return (
      <main className="light-page result-page">
        <header className="brand-bar">
          <button type="button" onClick={() => goTo("challenge")}>← Challenge 01</button>
          <span>North Dublin maths</span>
        </header>
        <section className="result-hero">
          <p className="section-label">Your result</p>
          <h1>{correct ? "Correct — the answer is 7." : "The answer is 7."}</h1>
          <p className="result-note">
            {correct ? "Nicely spotted. Here’s the cleanest way through it." : "Easy trap. The missing step is the middle +2 term."}
          </p>
        </section>
        <section className="worked-solution" aria-labelledby="solution-title">
          <div>
            <p className="section-label dark-label">The worked solution</p>
            <h2 id="solution-title">Square the whole expression.</h2>
          </div>
          <ol>
            <li><span>(x + 1/x)²</span><strong>= 9</strong></li>
            <li><span>x² + 2 + 1/x²</span><strong>= 9</strong></li>
            <li><span>x² + 1/x²</span><strong>= 7</strong></li>
          </ol>
        </section>
        <section className="next-step-panel">
          <div>
            <p className="section-label">One question down</p>
            <h2>Which topics are worth revisiting next?</h2>
            <p>Try five quick questions. No email, no predicted grade, no judgement.</p>
          </div>
          <div className="action-stack">
            <button className="primary-button" type="button" onClick={() => goTo("checkup-intro")}>Find my priority topics <span>5 mins →</span></button>
            <button className="secondary-button" type="button" onClick={() => goTo("grinds")}>See maths grind availability</button>
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
        <header className="brand-bar"><button type="button" onClick={() => goTo(answer ? "result" : "challenge")}>← Back</button><span>North Dublin maths</span></header>
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
        <p className="section-label">Request received</p>
        <h1>Thanks.<br />That’s the hard bit done.</h1>
        <p>The next step is a quick reply with the available options. Nothing is booked until you choose one.</p>
        <button className="dark-button" type="button" onClick={() => goTo("challenge")}>Back to the challenge <span>↗</span></button>
      </section>
    </main>
  );
}
