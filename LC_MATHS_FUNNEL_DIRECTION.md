# LC Maths poster funnel — current direction

This is a short product direction note for Codex, not a complete implementation specification. It supersedes the earlier poster-funnel build plan wherever they conflict. Inspect the existing website before changing it, and keep product details open to iteration with the owner.

## Objective

Turn a poster scan into a small experience of **what helpful maths tuition feels like**, then give the student and parent a clear route towards booking maths grinds. The success measure is eventually qualified enquiries and confirmed students, not quiz scores or scan counts alone.

## Keep the original challenge

The problem on the existing yellow and orange posters remains:

\[
x+\frac{1}{x}=3,\qquad x^2+\frac{1}{x^2}=\,?
\]

The answer is **7**. It looks short and approachable, but most people will need the expansion insight. That contrast is intentional: the student should first feel curious about the challenge and then experience how simple each part becomes with clear guidance.

The printed posters currently use a **60-second** theme. We will discuss and revise their exact wording and visuals separately. The intended small adjustment is to keep the question as the main visual hook while making it obvious that a scan can provide an immediate hint or guided help. Do not decide or redesign the final posters from this document alone.

## The essential first-scan experience

1. The QR opens straight onto the same problem, on a phone-friendly page that visually connects to the poster.
2. The main action is **get the first hint / work through it**. A visitor who already has an answer can instead type a number into an answer box and check it directly. The initial answer entry is free text or numeric input, **not multiple choice**. This direct-answer route should stay available without becoming a decision screen everyone must pass through.
3. The guided route **shows the next useful move first**, then asks a very easy multiple-choice question about one detail of that move. After a response, show why it works and move to the next small step. Repeat until the student reaches the answer.
4. Never turn a wrong tap or an expired timer into a failure state. Give a short explanation and continue guiding. The 60-second idea adds energy; it is not a deadline that ends access to help.
5. After the solution, let the student see the full chain of reasoning. An optional very similar follow-up question could let them use the idea independently, but it must not block the tutoring route.

An illustrative sequence, subject to UX refinement:

| Guided move shown | Easy detail the student chooses |
| --- | --- |
| “We need squared terms, so square both sides.” | What is \(3^2\)? **9**. |
| “Expanding the left introduces \(2\cdot x\cdot(1/x)\).” | What is \(x\cdot(1/x)\)? **1**. |
| “So \(9=x^2+2+1/x^2\).” | What is \(x^2+1/x^2\)? **7**. |

This is an example of the teaching pattern, not a locked script. The small decisions must feel like genuine participation rather than arbitrary button tapping. A visitor who submits 7 directly should still be able to view the short worked explanation. A visitor who submits a different answer should be invited into the same guided route without a harsh incorrect-result screen.

## Owner review of the local prototype — 18 September 2026

These notes led to a local scrolling-chain prototype. The owner approved trying the structure, with a short and intuitive first cue about squaring to make the given equation look more like the target. The exact teaching moves, questions, explanations and visual transitions still need review with the owner before settling the journey. The intended feeling is that the work becomes easy to follow and that the student can recognise what they accomplished.

- Keep the website's timer clear of other text. “Come and see” and “A little light for the next step” belong to the printed poster and should be removed from the website.
- Keep the original problem visibly present throughout the guided solution, in a compact form suitable for a phone. At the first step, make the connection between the given equation, the squared terms being sought, and the move to square both sides almost self-evident.
- Show a visible trace of the reasoning as it develops. In particular, the second step should show how it follows from the first, so the student sees the transformation rather than merely answering a separate question. Keep earlier work and the current target legible without crowding the mobile screen.
- Typeset all instructional maths consistently with proper stacked fractions. The current guide's `1/x` slash notation is unsuitable for the lesson text.
- Reconsider the bordered text box used to deliver each move. It currently makes the guidance feel detached from the problem; explore a more integrated equation-and-explanation layout.
- Keep the small decisions genuinely connected to the visible working. Explain each response and make the final recap show the steps the student helped complete. Avoid generic praise or a score-like ending.

## Conversion after the maths

Once the student has experienced the guided solution, transition naturally to the tutoring offer: **“Want more maths to feel this clear?”** Provide an immediate route to real grind information and a parent/guardian enquiry or booking request. The exact sales page, pricing presentation, parent handoff and follow-up process are still to be designed with the owner.

The earlier five-minute diagnostic is **optional and deferred**. It must not sit between this guided win and the opportunity to enquire about grinds. Keep the direct path for a parent or high-intent visitor to view grinds at any stage.

## What Codex should do with this note

Use this as the current design priority when discussing or implementing the funnel. Start with a working prototype of the challenge, direct answer entry and step-by-step guided experience; then work through the lead-generation flow with the owner. Reuse the site's existing stack and patterns. Preserve poster-source attribution through the funnel so eventual enquiries can be traced to a poster variant or location.
