# Project status

Updated: 18 September 2026

## Local prototype (not published)

- Matched the opening challenge to the selected yellow poster and its 60-second theme.
- Made guided hints the main route, with a direct numeric answer field alongside it.
- Added three guided algebra steps; every choice receives an explanation and can continue.
- Replaced slash-form algebra in the challenge, guide and worked solution with stacked MathML fractions and a bundled STIX Two Math font for the variable shapes.
- Changed the guided route to a growing chain: the given equation and target stay visible, each choice completes the current line, and the final answer remains on the same page. The exact copy and decision points are still subject to owner review.
- Moved the grind offer directly after the worked solution. The existing sample diagnostic is no longer linked from that path.
- The enquiry confirmation now says clearly that a local preview request was not sent.
- The local build, rendered HTML test, and lint pass. Interaction and mobile visual checks still need a browser review.
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

- The enquiry form is a demo and does not send or save submissions.
- All course and level choices currently use the same five diagnostic questions.
- Funnel stages share one URL; refreshing returns the visitor to the opening challenge.
- Poster IDs are read from the URL but are not yet stored or reported in analytics.

## Next steps

1. Work with the owner on the post-solution offer, parent or guardian handoff, and booking or enquiry path.
2. Choose and implement enquiry delivery, validation, confirmation, and tutor follow-up.
3. Add suitable privacy and consent information before live data collection.
4. Replace the stale social preview image and the placeholder grind details with current campaign material.
5. Preserve poster attribution through enquiry or booking and measure campaign outcomes.
6. Check the full flow on mobile and decide whether stages need shareable URLs or refresh persistence.
7. Revisit the optional diagnostic later with question sets tailored to LC/JC and Higher/Ordinary levels.
