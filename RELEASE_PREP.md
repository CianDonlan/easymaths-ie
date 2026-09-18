# Poster challenge release checkpoint

Recorded: 18 September 2026. This checkpoint is on the local `work/poster-guided-chain` branch. It has not been pushed or published.

## What is ready for review

- The first scan opens on the poster's yellow and black 60-second challenge, with the original equation, a prominent first hint, and optional direct answer entry.
- The guided solution stays on one scrolling page. The given equation and target remain visible, each small choice adds to the worked chain, and the completed reasoning remains in view.
- Lesson equations use stacked MathML fractions and the bundled STIX Two Math font. Wrong choices and an expired timer still lead to help.
- The solution leads directly to grind options. The sample diagnostic is deferred from this main path. The enquiry screen explicitly identifies its local preview confirmation as unsent.
- The owner has reviewed the local experience and is happy with this teaching-flow checkpoint. The exact step copy and decisions may still receive small edits.

## Verification completed

- `NEXT_PUBLIC_SITE_URL=https://easymaths.ie npx vinext build --prerender-all` passed locally. The prerendered home page has the 60-second metadata and stacked fraction markup; the font is in the client artifact.
- The rendered HTML test, ESLint, and `git diff --check` passed.
- A standalone `tsc --noEmit --incremental false` check still reports three existing Cloudflare starter-type errors in `db/index.ts` and `worker/index.ts`. The GitHub Pages build does not use those files; resolve or exclude them if standalone type checking becomes a release gate.
- The owner reviewed the local experience. A full browser pass on small screens and across every interaction is still needed before publication.

## Work before campaign publication

1. Review and build the conversation-first journey after the worked solution, including parent sharing and contact. Format, location and price can be agreed with each family rather than fixed now. See `NEXT_STEP_POST_SOLUTION.md`.
2. Make enquiries deliver reliably, with a clear confirmation and appropriate privacy and consent text, before treating the form as a live lead channel.
3. Replace `public/og.png`, which still advertises the old orange 20-second challenge, with a 60-second card that matches the selected poster.
4. Carry `poster_id` through to the eventual enquiry or booking record and decide how campaign outcomes will be measured.
5. Check the complete flow on mobile: direct correct and incorrect answers, guided choices, timer expiry, return navigation, and the final contact action. Decide whether stage URLs or refresh persistence are needed for launch.

The curriculum-specific diagnostic remains a later product decision. It does not block the direct path from the guided solution to grind information.

## Publishing path

GitHub Actions deploys the site to GitHub Pages when `main` is pushed. Once the items above are resolved and the finished changes are reviewed, merge this local work into `main` and push with explicit approval. Until then, the live site is unchanged.
