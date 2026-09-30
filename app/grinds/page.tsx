"use client";

import Link from "next/link";
import { FormEvent, useState, useSyncExternalStore } from "react";

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
    const text = "I tried this Easy Maths challenge and liked how it explained the problem. Could we ask about grinds?";

    try {
      if (navigator.share) {
        await navigator.share({ title: "Easy Maths grinds", text, url: url.href });
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
      "Hello, I’d like to ask about maths grinds.",
      "",
      `Name: ${cleanValue(data.get("name"))}`,
      `I am: ${cleanValue(data.get("role"))}`,
      `Reply email: ${cleanValue(data.get("replyEmail"))}`,
      `Student stage: ${cleanValue(data.get("studentStage"))}`,
      `Level: ${cleanValue(data.get("level"))}`,
      `Preferred format: ${cleanValue(data.get("lessonFormat"))}`,
      `General location: ${cleanValue(data.get("location")) || "Not provided"}`,
      `Help wanted: ${cleanValue(data.get("helpWanted")) || "Not provided"}`,
      `Suitable days or times: ${cleanValue(data.get("availability")) || "Not provided"}`,
      "",
      "I understand this is an enquiry and that no lesson is booked until we have spoken and agreed the details.",
    ].join("\n") + sourceLines;

    setPreparedEnquiry(body);

    if (enquiryEmail) {
      const subject = encodeURIComponent(`Maths grind enquiry — ${cleanValue(data.get("studentStage"))}`);
      window.location.href = `mailto:${enquiryEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;
      setFormState("Your email app should open with the enquiry ready. Review it, then press send there.");
      return;
    }

    try {
      await navigator.clipboard.writeText(body);
      setFormState("Preview enquiry copied. The business email address still needs to be connected before launch.");
    } catch {
      setFormState("Your preview enquiry is ready below. The business email address still needs to be connected before launch.");
    }
  }

  return (
    <main className="grinds-v1">
      <header className="grinds-nav">
        <Link href="/">← Maths challenge</Link>
        <span>Easy Maths</span>
        <a href="#enquiry">Ask about a grind</a>
      </header>

      {sharedByStudent && (
        <aside className="shared-intro" aria-label="Shared by a student">
          <span>Sent from the maths challenge</span>
          <p>A student shared this page with you because they would like to talk about maths grinds.</p>
        </aside>
      )}

      <section className="grinds-v1-hero">
        <div>
          <p className="section-label">Junior Cycle + Leaving Cert maths</p>
          <h1>Make the difficult step feel clear.</h1>
        </div>
        <div className="grinds-hero-copy">
          <p>
            Focused maths grinds built around the questions, topics and exam steps that are getting in the student’s way.
          </p>
          <div className="grinds-hero-actions">
            <a className="primary-button" href="#enquiry">Ask about a grind <span>↓</span></a>
            <button className="secondary-button" type="button" onClick={shareWithParent}>Send this to a parent</button>
            {shareState && <p className="share-state" role="status">{shareState}</p>}
          </div>
        </div>
      </section>

      <section className="lesson-options" aria-labelledby="lesson-options-title">
        <div className="lesson-options-heading">
          <p className="section-label dark-label">Flexible by design</p>
          <h2 id="lesson-options-title">Start with what would work for the student.</h2>
        </div>
        <div className="lesson-option-list">
          <article>
            <span>01</span>
            <h3>Online</h3>
            <p>Work through questions and methods together from wherever suits.</p>
          </article>
          <article>
            <span>02</span>
            <h3>In person</h3>
            <p>Ask about an in-person arrangement at a practical local location.</p>
          </article>
          <article>
            <span>03</span>
            <h3>At home</h3>
            <p>Home visits are welcome where the location and timing make them practical.</p>
          </article>
        </div>
        <p className="lesson-options-note">Format, location, timing and cost are discussed before anyone commits.</p>
      </section>

      <section className="tutor-profile" aria-labelledby="tutor-title">
        <div>
          <p className="section-label">Your tutor</p>
          <h2 id="tutor-title">Maths is not just something I studied. It’s my day job.</h2>
        </div>
        <div className="tutor-profile-copy">
          <p>
            I work as a quantitative analyst at a large financial consulting firm, using mathematics to solve problems for major financial companies.
          </p>
          <dl className="credentials-list">
            <div><dt>Master’s</dt><dd>Financial Mathematics</dd></div>
            <div><dt>Bachelor’s</dt><dd>Mathematical Sciences</dd></div>
            <div><dt>Current work</dt><dd>Quantitative analysis</dd></div>
          </dl>
          <p className="profile-note">
            My aim is to turn a difficult-looking problem into a sequence of steps the student can understand and use again.
          </p>
        </div>
      </section>

      <section className="conversation-steps" aria-labelledby="conversation-title">
        <p className="section-label">How it works</p>
        <h2 id="conversation-title">A conversation first. A booking when the details are right.</h2>
        <ol>
          <li><span>01</span><div><h3>Send a short enquiry</h3><p>Tell me the student’s stage, what is proving difficult and which format might suit.</p></div></li>
          <li><span>02</span><div><h3>Talk through the options</h3><p>We discuss goals, location, availability, lesson format and cost.</p></div></li>
          <li><span>03</span><div><h3>Agree the arrangement</h3><p>A lesson is only booked when we have spoken and both agreed the details.</p></div></li>
        </ol>
      </section>

      <section className="offer-foundation">
        <div>
          <p className="section-label dark-label">The starting point</p>
          <h2>Bring the problem that matters now.</h2>
        </div>
        <p>
          It could be a recent test, a topic that will not click, an upcoming exam or a wider loss of confidence. The first conversation is used to work out what kind of help would be genuinely useful. A more specific lesson offer and pricing will be added once they are finalised.
        </p>
      </section>

      <section className="enquiry-section" id="enquiry" aria-labelledby="enquiry-title">
        <div className="enquiry-heading">
          <p className="section-label">Start the conversation</p>
          <h2 id="enquiry-title">What would help?</h2>
          <p>
            This is an enquiry, not a confirmed booking. Complete the details below and you can review the message before sending it.
          </p>
        </div>

        <form className="enquiry-form enquiry-form-v1" onSubmit={prepareEnquiry}>
          {!enquiryEmail && (
            <p className="preview-notice">
              Local preview: the business email has not been connected yet. Submitting will copy a ready-to-send enquiry for review; it will not contact anyone.
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
            <span>Your email</span>
            <input type="email" name="replyEmail" autoComplete="email" required />
          </label>
          <label>
            <span>Student stage</span>
            <select name="studentStage" defaultValue="Leaving Cert" required>
              <option>Leaving Cert</option>
              <option>Junior Cycle</option>
              <option>Other / not sure</option>
            </select>
          </label>
          <label>
            <span>Level</span>
            <select name="level" defaultValue="Not sure yet" required>
              <option>Higher Level</option>
              <option>Ordinary Level</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label>
            <span>Preferred format</span>
            <select name="lessonFormat" defaultValue="Open to either" required>
              <option>Open to either</option>
              <option>Online</option>
              <option>In person</option>
              <option>Home visit, if possible</option>
            </select>
          </label>
          <label>
            <span>General location <em>Optional</em></span>
            <input type="text" name="location" autoComplete="address-level2" placeholder="Town or area is enough" />
          </label>
          <label>
            <span>Suitable days or times <em>Optional</em></span>
            <input type="text" name="availability" placeholder="For example, weekday evenings" />
          </label>
          <label className="enquiry-wide">
            <span>What would you like help with? <em>Optional</em></span>
            <textarea name="helpWanted" rows={5} placeholder="A difficult topic, recent test, upcoming exam or anything else useful…" />
          </label>
          <p className="minor-note enquiry-wide">For a student under 18, a parent or guardian will be involved before any lessons are arranged.</p>
          <label className="privacy-check enquiry-wide">
            <input type="checkbox" required />
            <span>I understand that these details are only being prepared for a grind enquiry and that no lesson is booked yet.</span>
          </label>
          <button className="primary-button wide-button enquiry-wide" type="submit">
            {enquiryEmail ? "Prepare enquiry email" : "Copy preview enquiry"}<span>→</span>
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
