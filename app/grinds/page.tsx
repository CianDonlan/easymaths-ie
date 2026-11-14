"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState, useSyncExternalStore } from "react";
import tutorPhoto from "../../pic_of_me.png";
import "./grinds.css";

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
    const text = "I found a free 45-minute introductory Leaving Cert maths session from Easy Maths. It includes three study tools to keep, and can be at home or remote. Could we look at it?";

    try {
      if (navigator.share) {
        await navigator.share({ title: "Free introductory maths session | Easy Maths", text, url: url.href });
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
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      setFormState("This form saves enquiries only on the live site. To test it, use easymaths.ie/grinds.");
      return;
    }
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
      const response = await fetch(form.action, {
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
        <a href="#enquiry">Enquire <span aria-hidden="true">↓</span></a>
      </header>

      {sharedByStudent && (
        <aside className="shared-intro" aria-label="Shared by a student">
          <span>Sent by a student</span>
          <p>They shared this page because they would like to try the Leaving Cert Maths Masterplan.</p>
        </aside>
      )}

      <section className="starter-hero" aria-labelledby="offer-title">
        <div className="starter-hero-heading">
          <p className="section-label">Leaving Cert maths · Higher & Ordinary</p>
          <h1 id="offer-title">Make maths easier.</h1>
        </div>
        <div className="starter-hero-offer">
          <p className="starter-lede">
            A free 45-minute session using real exam questions, with three study tools your child can keep.
          </p>
          <div className="starter-price" aria-label="Free 45-minute introductory session">
            <strong>FREE</strong>
            <span>One 45-minute<br />introductory session</span>
          </div>
          <div className="grinds-hero-actions">
            <a className="primary-button" href="#enquiry">Ask about a free session <span aria-hidden="true">↓</span></a>
            <button className="secondary-button" type="button" onClick={shareWithParent}>Send this to a parent</button>
            {shareState && <p className="share-state" role="status">{shareState}</p>}
          </div>
          <p className="hero-minor-note">
            At home in North County Dublin or remote. Arranged by a parent or guardian. No commitment to weekly tuition.
          </p>
          <p className="offer-availability">Free for a limited introductory period while I welcome my first students.</p>
        </div>
      </section>

      <section className="study-toolkit" aria-labelledby="toolkit-title">
        <div className="toolkit-heading">
          <p className="section-label dark-label">Included in your session</p>
          <h2 id="toolkit-title">Three tools to make studying easier.</h2>
        </div>
        <div className="toolkit-list">
          <article>
            <div className="toolkit-copy">
              <span className="toolkit-number">01</span>
              <h3>Where do I even start?</h3>
              <p className="toolkit-gift">The Priorities Roadmap</p>
              <p className="toolkit-solution">Choose what to study first with a topic roadmap based on Higher Level papers.</p>
            </div>
            <div className="toolkit-preview toolkit-preview-priorities" aria-hidden="true">
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
          </article>
          <article>
            <div className="toolkit-copy">
              <span className="toolkit-number">02</span>
              <h3>How do I actually study maths?</h3>
              <p className="toolkit-gift">The Study System</p>
              <p className="toolkit-solution">Give each practice session a clear structure with a five-level method I refined through my maths degrees.</p>
            </div>
            <div className="toolkit-preview toolkit-preview-system" aria-hidden="true">
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
          </article>
          <article>
            <div className="toolkit-copy">
              <span className="toolkit-number">03</span>
              <h3>Am I actually improving?</h3>
              <p className="toolkit-gift">The Study Trackers</p>
              <p className="toolkit-solution">Record each attempt and the help you needed. Revisit questions to see how your approach develops.</p>
            </div>
            <div className="toolkit-preview toolkit-preview-tracker" aria-hidden="true">
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
          </article>
        </div>
        <p className="toolkit-delivery">We set up all three together in the session. At-home students get printed copies; remote students receive PDFs.</p>
      </section>

      <section className="session-outline" aria-labelledby="session-title">
        <div className="session-outline-heading">
          <p className="section-label">The 45-minute session</p>
          <h2 id="session-title">What we’ll do together.</h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            <div><h3>Talk about studying</h3><p>Find out how your child studies now and where they get stuck.</p></div>
          </li>
          <li>
            <span>02</span>
            <div><h3>Set up the three tools</h3><p>Show your child how to use the roadmap, study system and trackers.</p></div>
          </li>
          <li>
            <span>03</span>
            <div><h3>Use real exam questions</h3><p>Practise the approach together, step by step, on Leaving Cert questions.</p></div>
          </li>
        </ol>
      </section>

      <section className="home-trust" aria-labelledby="tutor-title">
        <div className="home-trust-photo">
          <Image
            src={tutorPhoto}
            alt="Cian, the Easy Maths tutor"
            sizes="(max-width: 760px) 104px, 42vw"
            unoptimized
          />
        </div>
        <div className="home-trust-copy">
          <p className="section-label">Your tutor</p>
          <h2 id="tutor-title">Hi, I’m Cian.</h2>
          <p>
            I help Leaving Cert students break difficult maths into clear steps, so they can keep studying with confidence between lessons.
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
          <p className="section-label">Get in touch</p>
          <h2 id="enquiry-title">Ask about a free first session.</h2>
          <p>
            Leave your details and I’ll get back to you to discuss a session. Nothing is booked until we’ve spoken.
          </p>
        </div>

        <form
          className="enquiry-form enquiry-form-v2"
          name="session-enquiry"
          method="POST"
          action="/netlify-form.html"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={submitEnquiry}
        >
          <input type="hidden" name="form-name" value="session-enquiry" />
          <input type="hidden" name="subject" value="New free introductory Leaving Cert maths session enquiry" />
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
            <span>Session preference</span>
            <select name="sessionFormat" defaultValue="Not sure yet" required>
              <option>At home</option>
              <option>Remote</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label>
            <span>Town or area <em>For at-home sessions</em></span>
            <input type="text" name="area" autoComplete="address-level2" placeholder="For example, Donabate" />
          </label>
          <label className="enquiry-wide">
            <span>Anything useful to know? <em>Optional</em></span>
            <textarea name="helpWanted" rows={4} placeholder="A difficult topic, recent test or anything you would like to discuss…" />
          </label>
          <label className="privacy-check enquiry-wide">
            <input type="checkbox" name="consent" value="Confirmed" required />
            <span>I’m happy for Cian to contact me about this enquiry. I understand that nothing is booked yet and the introductory session is free.</span>
          </label>
          <button className="primary-button wide-button enquiry-wide" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Ask about a free session"}<span>→</span>
          </button>
          {formState && <p className="form-status enquiry-wide" role="status">{formState}</p>}
        </form>
      </section>
    </main>
  );
}
