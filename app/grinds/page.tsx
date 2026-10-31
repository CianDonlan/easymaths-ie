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
          <p className="section-label">Free introductory session · At home or remote</p>
          <h1 id="offer-title">A free start to studying Leaving Cert maths.</h1>
        </div>
        <div className="starter-hero-offer">
          <p className="starter-lede">
            In 45 minutes, we’ll use real exam questions to give your child a clearer way to study. They’ll leave with three free tools to keep using between sessions.
          </p>
          <div className="starter-price" aria-label="Free 45-minute introductory session">
            <strong>FREE</strong>
            <span>One 45-minute<br />introductory session</span>
          </div>
          <div className="availability-line">
            <strong>Available for a limited introductory period.</strong>
            <span>I’m offering free first sessions while welcoming my first students. Ask about one while the offer is available.</span>
          </div>
          <div className="grinds-hero-actions">
            <a className="primary-button" href="#enquiry">Ask about the Maths Masterplan <span>↓</span></a>
            <button className="secondary-button" type="button" onClick={shareWithParent}>Send this to a parent</button>
            {shareState && <p className="share-state" role="status">{shareState}</p>}
          </div>
          <p className="hero-minor-note">
            Higher or Ordinary Level. At-home sessions in North County Dublin or remote sessions. A parent or guardian arranges the session. No commitment to weekly tuition.
          </p>
        </div>
      </section>

      <section className="study-toolkit" aria-labelledby="toolkit-title">
        <div className="toolkit-heading">
          <p className="section-label dark-label">Three free gifts to keep</p>
          <h2 id="toolkit-title">Three tools for three study problems.</h2>
          <p>
            We set them up together during the session. At-home students get printed copies; remote students receive PDFs. Each tool gives your child something practical to use when studying alone.
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
              <p className="toolkit-problem">The problem: “I don’t know how to study maths.”</p>
              <h3>Follow a clear study structure.</h3>
              <p>A five-stage method to follow during practice. It shows students what to do when stuck and how to use less help over time, so each study session has a purpose.</p>
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
              <p className="tool-type">The Priorities Roadmap</p>
              <p className="toolkit-problem">The problem: “There’s so much to study. Where do I start?”</p>
              <h3>Know what deserves your time.</h3>
              <p>A marks-weighted map of Higher Level topics on Paper 1 and Paper 2. It helps students choose where to focus first, instead of feeling overwhelmed by everything at once.</p>
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
              <p className="toolkit-problem">The problem: “I’m practising, but am I getting better?”</p>
              <h3>See your progress build.</h3>
              <p>These trackers work with the Study System. Students record the help they needed on each attempt, then see how their level changes as they practise. Their work becomes visible progress.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="session-outline" aria-labelledby="session-title">
        <div className="session-outline-heading">
          <p className="section-label">The 45-minute session</p>
          <h2 id="session-title">A practical start—not another lecture.</h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            <div><h3>Talk about studying</h3><p>We briefly look at how the student approaches maths now and what tends to get in the way.</p></div>
          </li>
          <li>
            <span>02</span>
            <div><h3>Set up the three tools</h3><p>I introduce the study tools and show how they work together. You’ll get printed copies at home or PDFs for a remote session.</p></div>
          </li>
          <li>
            <span>03</span>
            <div><h3>Use real exam questions</h3><p>We work step by step through questions so the student practises the study approach rather than only hearing about it.</p></div>
          </li>
        </ol>
      </section>

      <section className="intro-reason" aria-labelledby="price-reason-title">
        <div>
          <p className="section-label dark-label">Why is the first session free?</p>
          <h2 id="price-reason-title">See how I teach.</h2>
        </div>
        <div className="intro-reason-copy">
          <p>
            I’m welcoming my first students and want families to experience a practical way to study maths before deciding on further tuition. The introductory session and the three tools are free, with no commitment to weekly lessons.
          </p>
          <div className="scarcity-note">
            <strong>A limited introductory offer</strong>
            <p>I’m offering these free first sessions for a limited time while getting Easy Maths started. At-home and remote tutoring are available now; sessions at third-party locations may be offered later.</p>
          </div>
          <a className="primary-button" href="#enquiry">Ask about a free session <span>↓</span></a>
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
          <p className="section-label">Free for a limited introductory period</p>
          <h2 id="enquiry-title">Ask about a free first session.</h2>
          <p>
            Leave your details and I’ll contact you by your preferred method. We’ll talk about what you’re looking for and whether an at-home or remote session suits you before arranging anything.
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
