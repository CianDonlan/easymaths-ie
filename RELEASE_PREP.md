# Poster challenge release checkpoint

Recorded: 18 September 2026. This checkpoint is on the local `work/poster-guided-chain` branch. It has not been pushed or published.

Updated 20 September 2026: the branch now also contains a first local version of the post-solution contact journey. It has not been published.

Owner checkpoint: the first post-solution/grinds version was reviewed on 20 September and accepted as good enough to preserve for the next work session. Remaining launch inputs and tasks are recorded in `NEXT_STEP_POST_SOLUTION.md`.

## What is ready for review

- The first scan opens on the poster's yellow and black 60-second challenge, with the original equation, a prominent first hint, and optional direct answer entry.
- The guided solution stays on one scrolling page. The given equation and target remain visible, each small choice adds to the worked chain, and the completed reasoning remains in view.
- Lesson equations use stacked MathML fractions and the bundled STIX Two Math font. Wrong choices and an expired timer still lead to help.
- The solution leads directly to grind options. The sample diagnostic is deferred from this main path. The enquiry screen explicitly identifies its local preview confirmation as unsent.
- The owner has reviewed the local experience and is happy with this teaching-flow checkpoint. The exact step copy and decisions may still receive small edits.
- The solution now leads to a stable, shareable `/grinds` page with student-to-parent sharing, flexible online/in-person/home-visit information, confirmed tutor credentials and a conversation-first enquiry form.
- Without a configured business email, the form copies a preview enquiry and clearly states that it has not contacted anyone.

## Verification completed

- `NEXT_PUBLIC_SITE_URL=https://easymaths.ie npx vinext build --prerender-all` passed locally. The prerendered home page has the 60-second metadata and stacked fraction markup; the font is in the client artifact.
- The rendered HTML test, ESLint, and `git diff --check` passed.
- A standalone `tsc --noEmit --incremental false` check still reports three existing Cloudflare starter-type errors in `db/index.ts` and `worker/index.ts`. The GitHub Pages build does not use those files; resolve or exclude them if standalone type checking becomes a release gate.
- The owner reviewed the local experience. A full browser pass on small screens and across every interaction is still needed before publication.

## Work before campaign publication

1. Review and refine the local conversation-first journey, particularly the mobile layout, share action, tutor story and enquiry questions. See `NEXT_STEP_POST_SOLUTION.md`.
2. Add the real business email, fuller tutor details and photograph, service area, response time, and the final offer and pricing.
3. Make enquiries deliver reliably, with a clear confirmation and appropriate privacy and consent text, before treating the form as a live lead channel.
4. Replace `public/og.png`, which still advertises the old orange 20-second challenge, with a 60-second card that matches the selected poster.
5. Carry `poster_id` through to the eventual enquiry or booking record and decide how campaign outcomes will be measured.
6. Check the complete flow on mobile: direct correct and incorrect answers, guided choices, timer expiry, parent sharing, direct `/grinds` visits, form preparation, and return navigation.

The curriculum-specific diagnostic remains a later product decision. It does not block the direct path from the guided solution to grind information.

## Publishing path

GitHub Actions deploys the site to GitHub Pages when `main` is pushed. Once the items above are resolved and the finished changes are reviewed, merge this local work into `main` and push with explicit approval. Until then, the live site is unchanged.
