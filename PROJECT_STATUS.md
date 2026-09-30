# Project status

Updated: 20 September 2026

## Session close — 20 September 2026

- Built and owner-reviewed the first local post-solution conversion path. It is good enough to preserve as the baseline; nothing was published.
- Added a stable `/grinds` page, student-to-parent sharing, online/in-person/home-visit information, confirmed tutor credentials, and a conversation-first enquiry preview.
- Confirmed the static production build, both prerendered routes, rendered-page tests and lint pass.
- Reviewed the owner's `founder-playbook`, `hormozi-skills`, and `ai-marketing-skills` forks. None are installed in this project yet; the audit copies were temporary only.
- Recommended a small project-scoped skill set from `founder-playbook`: `mom-test`, `100m-offers`, `storybrand`, `made-to-stick`, and `monetizing-innovation`.
- Recommended creating an `EASY_MATHS_BUSINESS_CONTEXT.md` file alongside those skills so future offer and marketing work stays grounded in confirmed facts.

Start next session by deciding whether to sync/install that curated skill set. Then use `mom-test` to plan parent/student research before finalising the offer, pricing, service area and production enquiry delivery.

## Local prototype (not published)

- Owner review on 20 September: the first post-solution/grinds version is good enough to keep as the baseline for later work.
- Added a stable `/grinds` page that can be opened directly or shared with a parent without restarting the challenge.
- Added `Ask about maths grinds` and `Send this to a parent` actions after the worked solution. Poster attribution is carried into the grinds link and prepared enquiry.
- Replaced the placeholder grinds presentation with a conversation-first page covering online, in-person and practical home-visit options.
- Added the tutor's confirmed background: quantitative analyst at a large financial consulting firm, Master's in Financial Mathematics and Bachelor's in Mathematical Sciences.
- Added a short enquiry form for the eventual contact flow. Until a business email is configured it copies a clearly labelled preview message and does not claim to send anything.
- Matched the opening challenge to the selected yellow poster and its 60-second theme.
- Made guided hints the main route, with a direct numeric answer field alongside it.
- Added three guided algebra steps; every choice receives an explanation and can continue.
- Replaced slash-form algebra in the challenge, guide and worked solution with stacked MathML fractions and a bundled STIX Two Math font for the variable shapes.
- Changed the guided route to a growing chain: the given equation and target stay visible, each choice completes the current line, and the final answer remains on the same page. The exact copy and decision points are still subject to owner review.
- Moved the grind offer directly after the worked solution. The existing sample diagnostic is no longer linked from that path.
- The enquiry confirmation now says clearly that a local preview request was not sent.
- The local build, prerender of both routes, rendered HTML tests, and lint pass. Interaction and mobile visual checks still need a browser review.
- The social preview image still shows the earlier orange 20-second design and needs updating when the campaign copy is settled.
- This local checkpoint and the remaining publication work are recorded in `RELEASE_PREP.md`.

## Completed

- Replaced the old `easymaths-ie` GitHub repository contents with the current maths challenge funnel.
- Added automatic GitHub Pages deployment from `main`.
- Connected `https://easymaths.ie`, enabled HTTPS, and confirmed the live site and `www` redirect work.
- Added the timed challenge, worked solution, short diagnostic, priority result, grind information, and enquiry screens.
- Generated verified QR codes for `poster-01` and `poster-02` in the workspace `qr-codes/` folder.
- Recorded the future curriculum-aware diagnostic idea in `PRODUCT_NOTES.md`.
- Confirmed the build and rendered-page tests pass.

## Current limitations

- The enquiry form prepares a reviewable message but does not send or save submissions until a business email or delivery service is connected.
- The final offer, pricing, service area, tutor photograph and fuller tutor story have not been supplied yet.
- All course and level choices currently use the same five diagnostic questions.
- Funnel stages share one URL; refreshing returns the visitor to the opening challenge.
- Poster IDs are read from the URL but are not yet stored or reported in analytics.

## Next steps

1. Review the new post-solution and `/grinds` experience on mobile and refine the copy, emphasis and form fields.
2. Supply the business email, tutor photograph, fuller background, practical service area and response time.
3. Define the first grind offer and pricing, then replace the explicitly provisional offer paragraph.
4. Choose and implement permanent enquiry delivery, confirmation, privacy information and tutor follow-up.
5. Replace the stale social preview image and finish campaign attribution measurement.
6. Revisit the optional diagnostic later with question sets tailored to LC/JC and Higher/Ordinary levels.
