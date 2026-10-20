"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState, useSyncExternalStore } from "react";
import tutorPhoto from "../../pic_of_me.png";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function shareWithParent() {
    const url = new URL(window.location.href);
    url.searchParams.set("shared", "student");
    const text = "I found the €3.14 Leaving Cert Maths Masterplan from Easy Maths. It’s a 45-minute at-home session with three printed study tools. Could we look at it?";

    try {
      if (navigator.share) {
        await navigator.share({ title: "The €3.14 Leaving Cert Maths Masterplan", text, url: url.href });
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

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const attribution = getAttribution();
    data.set(
      "attribution",
      attribution.length
        ? attribution.map(([key, value]) => `${key}: ${value}`).join(" | ")
        : "Direct / not recorded",
    );

    const encoded = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      if (typeof value === "string") encoded.append(key, value);
    }

    setIsSubmitting(true);
    setFormState("Sending your enquiry…");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded.toString(),
      });

      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);

      form.reset();
      setFormState("Thanks — I’ll contact you to talk through the session and see if it is a good fit.");
    } catch {
      setFormState("That didn’t send. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grinds-v2">
      <header className="grinds-nav">
        <Link href="/">← Maths challenge</Link>
        <span>Easy Maths</span>
        <a href="#enquiry">Ask about the offer</a>
      </header>

      {sharedByStudent && (
        <aside className="shared-intro" aria-label="Shared by a student">
          <span>Sent by a student</span>
          <p>They shared this page because they would like to try the Leaving Cert Maths Masterplan.</p>
        </aside>
      )}

      <section className="starter-hero" aria-labelledby="offer-title">
        <div className="starter-hero-heading">
          <p className="section-label">Only 10 introductory places · North County Dublin</p>
          <h1 id="offer-title">The €3.14 Leaving Cert Maths Masterplan.</h1>
        </div>
        <div className="starter-hero-offer">
          <p className="starter-lede">
            In 45 minutes, I’ll show your child a practical way to study Leaving Cert maths with real exam questions, then leave them with three printed tools to keep using.
          </p>
          <div className="starter-price" aria-label="Introductory price of three euro and fourteen cent">
            <strong>€3.14</strong>
            <span>One 45-minute<br />at-home session</span>
          </div>
          <div className="availability-line">
            <strong>Only 10 students can get this €3.14 session.</strong>
            <span>Once those introductory places are taken, the offer ends. They could fill within weeks.</span>
          </div>
          <div className="grinds-hero-actions">
            <a className="primary-button" href="#enquiry">Ask about the Maths Masterplan <span>↓</span></a>
            <button className="secondary-button" type="button" onClick={shareWithParent}>Send this to a parent</button>
            {shareState && <p className="share-state" role="status">{shareState}</p>}
          </div>
          <p className="hero-minor-note">
            Higher or Ordinary Level. A parent or guardian arranges the visit. No commitment to weekly tuition.
          </p>
        </div>
      </section>

      <section className="study-toolkit" aria-labelledby="toolkit-title">
        <div className="toolkit-heading">
          <p className="section-label dark-label">Included · printed and theirs to keep</p>
          <h2 id="toolkit-title">The session ends. The system stays.</h2>
          <p>
            We set each sheet up together and use it on real exam questions. The student leaves knowing where to start, what to do when stuck, and how to see progress.
          </p>
        </div>
        <div className="toolkit-list">
          <article>
            <div className="toolkit-preview toolkit-preview-system" aria-hidden="true">
              <span>01</span>
              <div className="resource-sheet">
                <div className="resource-sheet-brand"><b>EASYMATHS.IE</b><i>LEAVING CERT MATHS</i></div>
                <p>YOUR STUDY SYSTEM</p>
                <strong>A CLEAR WAY<br />FORWARD.</strong>
                <div className="system-glimpse">
                  <i /><i /><i /><i /><i />
                </div>
                <small>EXPLAINED AND SET UP IN THE SESSION</small>
              </div>
            </div>
            <div className="toolkit-copy">
              <div className="toolkit-facts" aria-label="Two-page guide with five support levels">
                <span>2-page guide</span>
                <span>5 support levels</span>
              </div>
              <p className="tool-type">The Easy Maths Study System</p>
              <h3>Know what to do when you get stuck.</h3>
              <p>A clear five-stage method for getting unstuck and working towards confident, timed answers. Students learn how to use the right amount of help without giving up or becoming reliant on solutions.</p>
            </div>
          </article>
          <article>
            <div className="toolkit-preview toolkit-preview-priorities" aria-hidden="true">
              <span>02</span>
              <div className="resource-sheet">
                <div className="resource-sheet-brand"><b>EASYMATHS.IE</b><i>LEAVING CERT MATHS</i></div>
                <p>YOUR REVISION PRIORITIES</p>
                <strong>WHERE THE<br />MARKS ARE.</strong>
                <div className="priority-glimpse">
                  <i /><i /><i /><i /><i /><i />
                </div>
                <small>YOUR PRIORITIES, MADE CLEAR</small>
              </div>
            </div>
            <div className="toolkit-copy">
              <div className="toolkit-facts" aria-label="One-page priorities map based on papers from 2018 to 2025">
                <span>1-page priorities map</span>
                <span>2018–2025 papers</span>
              </div>
              <p className="tool-type">Where the Marks Are</p>
              <h3>Put revision time where it counts.</h3>
              <p>A marks-weighted view of the biggest Higher Level topic areas on Paper 1 and Paper 2. It turns “revise maths” into a clearer decision about what deserves regular practice.</p>
            </div>
          </article>
          <article>
            <div className="toolkit-preview toolkit-preview-tracker" aria-hidden="true">
              <span>03</span>
              <div className="resource-sheet">
                <div className="resource-sheet-brand"><b>EASYMATHS.IE</b><i>LEAVING CERT MATHS</i></div>
                <p>YOUR STUDY TRACKER</p>
                <strong>TRACK.<br />IMPROVE.</strong>
                <div className="tracker-glimpse">
                  {Array.from({ length: 24 }, (_, index) => <i key={index} />)}
                </div>
                <small>KEEP EVERY ATTEMPT VISIBLE</small>
              </div>
            </div>
            <div className="toolkit-copy">
              <div className="toolkit-facts" aria-label="Eight paper trackers covering 2023 to 2026">
                <span>8 paper trackers</span>
                <span>2023–2026</span>
              </div>
              <p className="tool-type">Past-Paper Study Trackers</p>
              <h3>Make every attempt visible.</h3>
              <p>Separate Paper 1 and Paper 2 sheets list every question part across four exam years. The student records up to three attempts and the level of help used, so improvement is easy to spot.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="session-outline" aria-labelledby="session-title">
        <div className="session-outline-heading">
          <p className="section-label">The 45-minute visit</p>
          <h2 id="session-title">A practical start—not another lecture.</h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            <div><h3>Talk about studying</h3><p>We briefly look at how the student approaches maths now and what tends to get in the way.</p></div>
          </li>
          <li>
            <span>02</span>
            <div><h3>Set up the three sheets</h3><p>I introduce the printed resources and show how they work together.</p></div>
          </li>
          <li>
            <span>03</span>
            <div><h3>Use real exam questions</h3><p>We work step by step through questions so the student practises the study approach rather than only hearing about it.</p></div>
          </li>
        </ol>
      </section>

      <section className="intro-reason" aria-labelledby="price-reason-title">
        <div>
          <p className="section-label dark-label">Why is it €3.14?</p>
          <h2 id="price-reason-title">I’m getting started.</h2>
        </div>
        <div className="intro-reason-copy">
          <p>
            I’m starting Easy Maths with my first 10 students, and I want local families to see how I teach. That’s why this first session is just €3.14. You get a practical way to study and three printed tools to keep, with no commitment to weekly tuition.
          </p>
          <div className="scarcity-note">
            <strong>10 introductory places, then the offer ends</strong>
            <p>I’m making this price available to only my first 10 students in North County Dublin. Once those places are taken, the €3.14 session is no longer available. That could be within a few weeks.</p>
          </div>
          <a className="primary-button" href="#enquiry">Ask while places are available <span>↓</span></a>
        </div>
      </section>

      <section className="home-trust" aria-labelledby="tutor-title">
        <div className="home-trust-photo">
          <Image
            src={tutorPhoto}
            alt="Cian, the Easy Maths tutor"
            sizes="(max-width: 760px) 100vw, 42vw"
            unoptimized
          />
        </div>
        <div className="home-trust-copy">
          <p className="section-label">Your tutor</p>
          <h2 id="tutor-title">Meet the tutor behind Easy Maths.</h2>
          <p>
            I’m Cian. I help Leaving Cert students break difficult maths into clear steps they can understand and use on their own. The aim is simple: give each student a practical way to study between lessons—not make them dependent on one.
          </p>
          <dl className="credentials-list compact-credentials">
            <div><dt>Master’s</dt><dd><span>Financial Mathematics</span><span className="credential-place">UCD</span></dd></div>
            <div><dt>Bachelor’s</dt><dd><span>Mathematical Sciences</span><span className="credential-place">TUD</span></dd></div>
            <div><dt>Current work</dt><dd><span>Quantitative Analyst</span><span className="credential-place">Forvis Mazars</span></dd></div>
          </dl>
        </div>
      </section>

      <section className="enquiry-section starter-enquiry" id="enquiry" aria-labelledby="enquiry-title">
        <div className="enquiry-heading">
          <p className="section-label">Only 10 introductory places</p>
          <h2 id="enquiry-title">Ask about the Maths Masterplan.</h2>
          <p>
            Leave your details and I’ll contact you by your preferred method. We’ll talk about what you’re looking for and whether the at-home session is a good fit before anything is arranged.
          </p>
        </div>

        <form
          className="enquiry-form enquiry-form-v2"
          name="session-enquiry"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={submitEnquiry}
        >
          <input type="hidden" name="form-name" value="session-enquiry" />
          <input type="hidden" name="subject" value="New €3.14 Leaving Cert Maths Masterplan enquiry" />
          <input type="hidden" name="attribution" value="" />
          <div className="netlify-honeypot" aria-hidden="true">
            <label>Leave this field empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
          </div>

          <label>
            <span>Parent or guardian name</span>
            <input type="text" name="name" autoComplete="name" required />
          </label>
          <label>
            <span>Mobile</span>
            <input type="tel" name="mobile" autoComplete="tel" required />
          </label>
          <label>
            <span>Preferred contact</span>
            <select name="contactMethod" defaultValue="Text message" required>
              <option>Text message</option>
              <option>WhatsApp</option>
              <option>Phone call</option>
              <option>No preference</option>
            </select>
          </label>
          <label>
            <span>Email <em>Optional</em></span>
            <input type="email" name="email" autoComplete="email" />
          </label>
          <label>
            <span>Student level</span>
            <select name="studentLevel" defaultValue="Leaving Cert — Higher Level" required>
              <option value="Leaving Cert — Higher Level">Leaving Cert Higher</option>
              <option value="Leaving Cert — Ordinary Level">Leaving Cert Ordinary</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label>
            <span>Town or area</span>
            <input type="text" name="area" autoComplete="address-level2" placeholder="For example, Donabate" required />
          </label>
          <label className="enquiry-wide">
            <span>Anything useful to know? <em>Optional</em></span>
            <textarea name="helpWanted" rows={4} placeholder="A difficult topic, recent test or anything you would like to discuss…" />
          </label>
          <label className="privacy-check enquiry-wide">
            <input type="checkbox" name="consent" value="Confirmed" required />
            <span>I’m happy for Cian to contact me about this enquiry. I understand that nothing is booked and no payment is due yet.</span>
          </label>
          <button className="primary-button wide-button enquiry-wide" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Ask about the Maths Masterplan"}<span>→</span>
          </button>
          {formState && <p className="form-status enquiry-wide" role="status">{formState}</p>}
        </form>
      </section>
    </main>
  );
}
