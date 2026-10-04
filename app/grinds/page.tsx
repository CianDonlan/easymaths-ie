"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState, useSyncExternalStore } from "react";
import tutorPhoto from "../../pic_of_me.png";

const enquiryEmail = process.env.NEXT_PUBLIC_ENQUIRY_EMAIL?.trim() ?? "";

const attributionKeys = [
  "source",
  "poster_id",
  "location",
  "creative",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

function cleanValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim().slice(0, 500) : "";
}

function getAttribution() {
  const current = new URLSearchParams(window.location.search);
  return attributionKeys
    .map((key) => [key, current.get(key)?.trim().slice(0, 100)] as const)
    .filter((entry): entry is readonly [typeof attributionKeys[number], string] => Boolean(entry[1]));
}

function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function getSharedByStudent() {
  return new URLSearchParams(window.location.search).get("shared") === "student";
}

export default function GrindsPage() {
  const sharedByStudent = useSyncExternalStore(subscribeToUrl, getSharedByStudent, () => false);
  const [shareState, setShareState] = useState("");
  const [formState, setFormState] = useState("");
  const [preparedEnquiry, setPreparedEnquiry] = useState("");

  async function shareWithParent() {
    const url = new URL(window.location.href);
    url.searchParams.set("shared", "student");
    const text = "I tried this Easy Maths challenge and liked how it explained the problem. Could we look at the €25 Clarity Session?";

    try {
      if (navigator.share) {
        await navigator.share({ title: "Easy Maths Clarity Session", text, url: url.href });
        setShareState("Shared");
      } else {
        await navigator.clipboard.writeText(`${text} ${url.href}`);
        setShareState("Message and link copied");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareState("Sharing wasn’t available. You can copy this page’s link from your browser.");
    }
  }

  async function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const attribution = getAttribution();
    const sourceLines = attribution.length
      ? `\n\nHow this enquiry reached Easy Maths:\n${attribution.map(([key, value]) => `${key}: ${value}`).join("\n")}`
      : "";
    const body = [
      "Hello, I’d like to ask about the €25 Maths Clarity Session.",
      "",
      `Name: ${cleanValue(data.get("name"))}`,
      `I am: ${cleanValue(data.get("role"))}`,
      `Email: ${cleanValue(data.get("replyEmail"))}`,
      `Mobile: ${cleanValue(data.get("mobile")) || "Not provided"}`,
      `Student stage: ${cleanValue(data.get("studentStage"))}`,
      `Preferred format: ${cleanValue(data.get("lessonFormat"))}`,
      `Topic or difficulty: ${cleanValue(data.get("helpWanted")) || "Not provided"}`,
      "",
      "I understand this is an enquiry. A session is only arranged after the time, format and payment details have been confirmed.",
    ].join("\n") + sourceLines;

    setPreparedEnquiry(body);

    if (enquiryEmail) {
      const subject = encodeURIComponent(`€25 Maths Clarity Session enquiry — ${cleanValue(data.get("studentStage"))}`);
      window.location.href = `mailto:${enquiryEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;
      setFormState("Your email app should open with the enquiry ready. Review it, then press send there.");
      return;
    }

    try {
      await navigator.clipboard.writeText(body);
      setFormState("Preview enquiry copied. The business contact address still needs to be connected before launch.");
    } catch {
      setFormState("Your preview enquiry is ready below. The business contact address still needs to be connected before launch.");
    }
  }

  return (
    <main className="grinds-v1">
      <header className="grinds-nav">
        <Link href="/">← Maths challenge</Link>
        <span>Easy Maths</span>
        <a href="#enquiry">Ask about a session</a>
      </header>

      {sharedByStudent && (
        <aside className="shared-intro" aria-label="Shared by a student">
          <span>Sent from the maths challenge</span>
          <p>A student shared this page because they would like to talk about one-to-one maths help.</p>
        </aside>
      )}

      <section className="grinds-v1-hero">
        <div>
          <p className="section-label">Leaving Cert Higher Level focus</p>
          <h1>Maths, made clear one step at a time.</h1>
        </div>
        <div className="grinds-hero-copy">
          <p>
            Bring the topic, test or exam question that is causing difficulty. We’ll find the sticking point,
            work through it clearly and decide what to tackle next.
          </p>
          <div className="intro-price" aria-label="Introductory price">
            <strong>€25</strong>
            <span>60-minute Clarity Session<br />First five students</span>
          </div>
          <div className="grinds-hero-actions">
            <a className="primary-button" href="#enquiry">Ask about a €25 session <span>↓</span></a>
            <button className="secondary-button" type="button" onClick={shareWithParent}>Send this to a parent</button>
            {shareState && <p className="share-state" role="status">{shareState}</p>}
          </div>
          <p className="hero-minor-note">No commitment to continue. No payment is taken until a time and format are agreed.</p>
        </div>
      </section>

      <section className="lesson-options" aria-labelledby="session-includes-title">
        <div className="lesson-options-heading">
          <p className="section-label dark-label">The Clarity Session</p>
          <h2 id="session-includes-title">One useful session. A clear next step.</h2>
        </div>
        <div className="lesson-option-list">
          <article>
            <span>01 · Before</span>
            <h3>Bring the real problem</h3>
            <p>Share a difficult topic, recent test or exam question so the session begins with what matters now.</p>
          </article>
          <article>
            <span>02 · During</span>
            <h3>Work until it clicks</h3>
            <p>We identify the sticking point, explain the method clearly and use a similar question to check understanding.</p>
          </article>
          <article>
            <span>03 · After</span>
            <h3>Know what comes next</h3>
            <p>Leave with priority areas, a seven-day direction and relevant practice—not another vague instruction to study more.</p>
          </article>
        </div>
        <p className="lesson-options-note">
          Each session includes a concise personalised Maths Clarity Map: priority areas, a seven-day direction and relevant practice.
        </p>
      </section>

      <section className="tutor-profile" aria-labelledby="tutor-title">
        <div className="tutor-profile-intro">
          <p className="section-label">Your tutor</p>
          <h2 id="tutor-title">Complex maths should not need a complicated explanation.</h2>
          <Image
            className="tutor-photo"
            src={tutorPhoto}
            alt="Easy Maths tutor"
            sizes="(max-width: 760px) 100vw, 48vw"
            unoptimized
          />
        </div>
        <div className="tutor-profile-copy">
          <p>
            I’m Cian. I help students turn difficult questions into clear steps they can use again. The goal isn’t to watch me do maths—it’s to leave knowing how to make the next move yourself.
          </p>
          <dl className="credentials-list">
            <div><dt>Master’s</dt><dd><span>Financial Mathematics</span><span className="credential-place">UCD</span></dd></div>
            <div><dt>Bachelor’s</dt><dd><span>Mathematical Sciences</span><span className="credential-place">TUD</span></dd></div>
            <div><dt>Current work</dt><dd><span>Quantitative Analyst</span><span className="credential-place">Forvis Mazars</span></dd></div>
          </dl>
        </div>
      </section>

      <section className="conversation-steps" aria-labelledby="conversation-title">
        <p className="section-label">Booking without the back-and-forth</p>
        <h2 id="conversation-title">Enquire now. Pay only when the session is agreed.</h2>
        <ol>
          <li><span>01</span><div><h3>Send the short form</h3><p>Tell me who the session is for, their stage and the topic that is causing difficulty.</p></div></li>
          <li><span>02</span><div><h3>I contact you</h3><p>We agree a suitable time and whether the session will be online or in person around North Fingal.</p></div></li>
          <li><span>03</span><div><h3>Confirm and pay</h3><p>Once the details are right, payment confirms the session. Sending the form alone does not commit you.</p></div></li>
        </ol>
      </section>

      <section className="offer-foundation" aria-labelledby="continuing-title">
        <div>
          <p className="section-label dark-label">If it is a good fit</p>
          <h2 id="continuing-title">The first session can become week one.</h2>
        </div>
        <div className="continuing-offer">
          <p>
            There is no hard sell after the Clarity Session. If weekly tuition would help, the session can become the first week of a four-week plan and the €25 already paid counts toward the total.
          </p>
          <dl className="price-options">
            <div><dt>Online</dt><dd>€195 for four weeks</dd></div>
            <div><dt>In person</dt><dd>€230 for four weeks</dd></div>
          </dl>
          <p className="service-area">Online throughout Ireland. Limited in-person availability in Donabate and selected North Fingal areas.</p>
        </div>
      </section>

      <section className="enquiry-section" id="enquiry" aria-labelledby="enquiry-title">
        <div className="enquiry-heading">
          <p className="section-label">First five students · €25</p>
          <h2 id="enquiry-title">Ask about a session.</h2>
          <p>
            Send the essentials now. I’ll contact you to agree the time, format and payment details. This form does not make a booking or take payment.
          </p>
        </div>

        <form className="enquiry-form enquiry-form-v1" onSubmit={prepareEnquiry}>
          {!enquiryEmail && (
            <p className="preview-notice">
              Local preview: enquiry delivery has not been connected yet. Submitting will copy a ready-to-send message for review; it will not contact anyone.
            </p>
          )}

          <label>
            <span>Your name</span>
            <input type="text" name="name" autoComplete="name" required />
          </label>
          <label>
            <span>I am a…</span>
            <select name="role" defaultValue="Parent or guardian" required>
              <option>Parent or guardian</option>
              <option>Student aged 18 or over</option>
              <option>Student under 18</option>
            </select>
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="replyEmail" autoComplete="email" required />
          </label>
          <label>
            <span>Mobile <em>Optional</em></span>
            <input type="tel" name="mobile" autoComplete="tel" />
          </label>
          <label>
            <span>Student stage</span>
            <select name="studentStage" defaultValue="6th Year — Higher Level" required>
              <option>6th Year — Higher Level</option>
              <option>5th Year — Higher Level</option>
              <option>Leaving Cert — Ordinary Level</option>
              <option>Junior Cycle</option>
              <option>Other / not sure</option>
            </select>
          </label>
          <label>
            <span>Preferred format</span>
            <select name="lessonFormat" defaultValue="Open to either" required>
              <option>Open to either</option>
              <option>Online</option>
              <option>In person</option>
            </select>
          </label>
          <label className="enquiry-wide">
            <span>What is causing difficulty? <em>Optional</em></span>
            <textarea name="helpWanted" rows={4} placeholder="A topic, recent test, exam question or anything else useful…" />
          </label>
          <p className="minor-note enquiry-wide">For a student under 18, a parent or guardian will be involved before a session is arranged.</p>
          <label className="privacy-check enquiry-wide">
            <input type="checkbox" required />
            <span>I understand that this is an enquiry and that the session is only booked after the details and payment are confirmed.</span>
          </label>
          <button className="primary-button wide-button enquiry-wide" type="submit">
            {enquiryEmail ? "Prepare session enquiry" : "Copy preview enquiry"}<span>→</span>
          </button>
          {formState && <p className="form-status enquiry-wide" role="status">{formState}</p>}
          {preparedEnquiry && !enquiryEmail && (
            <label className="prepared-enquiry enquiry-wide">
              <span>Prepared message</span>
              <textarea readOnly rows={12} value={preparedEnquiry} onFocus={(event) => event.currentTarget.select()} />
            </label>
          )}
        </form>
      </section>
    </main>
  );
}
