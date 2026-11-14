# Installed migration checkpoint

This copy has been installed locally at `easymaths-ie/study-app/` with the website build integration. The original checkout remains a fallback. Read `../STUDY_APP.md` for commands and next checks. Installation itself did not commit, push or deploy. The preparation notes below describe the earlier restricted session and are historical for this copy.

# LC Maths App — Agent Handoff

Updated: 14 November 2026

## Resume checkpoint — 14 November 2026

The owner authorised moving the app into `easymaths-ie/study-app/` and preparing `/study-preview/` hosting. **The actual destination is still untouched:** this session’s filesystem permissions only allow writes inside `study_app` and `/tmp`. A complete installer and website payload are prepared in `migration/` and verified in a temporary website checkout. The user must run the installer from their terminal or reopen the website directory in a writable session to apply it. Do not claim the move or deployment happened. Preserve this original copy until the installed version and hosted preview are accepted.

## Current handoff — 14 November 2026 (prepared website migration)

- The user explicitly approved copying the app into the real website repo as `study-app/`, preserving the old checkout until verified. Filesystem write access prevents applying changes to `/home/cian/codex-safe/tutoring/easymaths-ie` from this session. Prepared and tested everything possible within the allowed workspace and `/tmp`; **no actual target files, Git branches, commits, pushes or deployments were changed**.
- `migration/install.py` is the application step. From this checkout, the user runs `python3 migration/install.py ../../easymaths-ie`. It checks exact destination-file hashes from `preimages.json`, refuses existing target/generated directories, copies source/docs/tests/all 75 PDF references without `.git`, `node_modules` or `dist`, adjusts metadata-reference paths in copied docs, and applies the website payload. Replaced website files are backed up under an ignored `.study-app-migration-backup-*` directory. Errors roll back applied files and the newly copied app; unrelated files and the original source remain intact.
- `migration/website/` contains concrete changes to root package scripts, TS and ESLint isolation, Git ignores, scoped Netlify routing/noindex/cache rules, the root agent-guide addendum, `STUDY_APP.md`, a static preview build script, and build-output tests. The source app now has `build:preview` (`vite build --base=/study-preview/`). Normal local dev at the old location is unchanged. The target app remains a separate package with its existing React/toolchain versions; root website types/lint exclude it and invoke its own checks separately.
- Target `build:netlify` will run `build:study` first. The study builder performs a nested `npm ci`, builds the app with the nested base path and copies only `study-app/dist/` into ignored `public/study-preview/`. The website then publishes these files through its existing Nitro/Netlify build. Verified the generated server function has `preferStatic: true`, so static study files take precedence. No global SPA rewrite was added; hash routes remain inside the isolated HTML document. The eventual URLs are `/study-preview/` and `/study-preview/#/pilot/quadratics`.
- Verified installation in `/tmp/easymaths-study-migration-e0k3p4e0` (path also recorded in `/tmp/easymaths-study-migration-path`). For offline checks only, copied installed website/app dependencies into that scratch checkout. Passed app checks/tests, website lint/type checks, full existing website test suite, nested-base app build, website Netlify build and static-output tests. Direct built-handler smoke checks returned HTTP 200 for `/`, `/grinds`, `/tracker`, `/tracker/login` and 401 for unauthenticated `/api/tracker`. No authenticated API or database writes were performed. Fresh registry installation, browser review and real Netlify deployment remain unverified.
- `migration/tests/test_install.py` passes four tests covering read-only preflight and changed-file refusal, existing-app refusal, backups/unrelated-file preservation, and rollback on a simulated replacement failure. The destination preflight still matches the actual website’s current files. See `migration/README.md` for user instructions and verification detail. Subsequent work should take place in the website workspace once installation is applied; the old repo remains a fallback.

## Previous handoff — 14 November 2026 (Easy Maths visual refresh)

- The owner requested a complete superficial redesign matching the **current easymaths.ie**. Checked the public home and `/grinds` pages through web access, then read the sibling website’s `app/globals.css`, `app/grinds/grinds.css` and tracker styles as design references. The design uses yellow **#fff000**, red **#bd1b24**, ink **#11100d**, paper **#f4efe3**, Arial body text, heavy display headings and firm borders. The live website repository was only read.
- Added `src/easymaths-theme.css`, imported last in `src/main.tsx`. It themes the header, home hero/preview, pilot launch card, paper cards, catalogue parts, method logging, study/answer/solution panels, maths activities, tables, figures, footer and the complete quadratics pilot. Shared and pilot component styles also use warm neutral backgrounds and Arial instead of the former green/Avenir palette. Legacy `--green*` variables remain compatibility aliases to brand accents; explicit success feedback stays green, distinct from brand red.
- Replaced the app’s old image logo in App with the website-style **EASY MATHS.IE** text wordmark and updated the hero to “Maths. One step at a time.” The homepage has the yellow poster treatment, black calls to action, red accent text and a cream preview with an offset ink shadow. Reading screens use cream and white surfaces; mobile headings use Arial as the live offer page does. The HTML browser theme colour is now yellow.
- Copied the same `STIXTwoMath-Regular.woff2`, font README and SIL Open Font License from the website’s public fonts into this app’s `public/fonts/`. Mathematical question text, expressions and pilot formulas use the local font. The unused legacy PNG remains in the repository; no paper content, IDs, routes, attempts or storage keys were changed.
- Verification: `npm test`, `npm run check`, `npm run build` and `git diff --check` passed. Checked core text contrast numerically: ink/yellow 16.05:1, red/paper 5.47:1, muted/paper 5.26:1, cream/ink 16.58:1, success feedback 6.67:1. This checks the named pairs, not every rendered component. The existing main-JS bundle warning remains (about 1,113 kB, 317 kB gzip).
- Browser/phone visual review is still outstanding: Chromium launch failed with sandbox socket restrictions (`setsockopt: Operation not permitted`, SIGTRAP). Shell DNS also could not fetch the live site, so reference browsing used the web tool and styling used the local website source. The owner has the dev site running and can inspect the updates. No release, deployment, live website/tracker edits or student-data changes were made.

## Previous handoff — 14 November 2026 (Level 3 quadratics pilot)

- The owner approved a **standalone, easy-to-test pilot** for Level 3 support. Built `#/pilot/quadratics`, linked from the top navigation and a homepage card. The existing 18-paper/739-part catalogue is unchanged.
- Feature files live in `src/features/quadraticsPilot/`: `content.ts`, `state.ts`, `QuadraticsPilot.tsx` and scoped `pilot.css`. Route registration is in `src/utils/parseRoute.ts`; screen/navigation links are in App. Six selectable tasks cover two warm-ups, 2017 P1 Q1(a)/(b), 2023 P1 Q2(a) and a new transfer question. Source links resolve to the existing paper parts. Pilot explanations use completing the square; the original 2023 part also supports a calculus method.
- Authored two method notes (completing the square and interpreting/reversing a turning point), two similar examples (positive and negative linear terms, including fractional arithmetic), a labelled example graph and one starting hint per task. Examples reveal one step at a time. Task solutions require a separate explicit reveal and explain Level 1/2 use. Opening notes/hints does not choose or enforce Level 3; the student selects their method level. Numeric pair checks assess final values only; completed-square expressions use guided comparison.
- Draft working, answer, help selection/open state, example steps, solution state and last task persist under `lc-maths-quadratics-pilot-v1`. Pilot attempt history stores self-selected levels and snapshots of opened help/solution, without a ten-record cap. This storage is separate from both normal paper method attempts and ordinary answer-check history. Help exposure accumulates since the task was last restarted; it is not proof of how a student used the help. Storage failures show a warning and allow a test-note download.
- **Testing controls & notes** contains a quick scenario, feedback field, download of the pilot JSON, restart-current-question and reset-entire-pilot with confirmation. Restart clears that draft and help state but retains saved attempts. Reset clears all pilot state, including feedback, without deleting normal paper records. The workspace uses a side panel on larger screens and places help above the question on narrower screens; explicit return buttons move focus back to the question.
- `tests/quadraticsPilot.test.mjs` checks the route/source links, independent algebra and minima, supported/wrong/unsupported answer forms, placeholders that do not disclose answers, persistence/restoration/sanitisation, repeat attempts and reset semantics. A bundled React server-render smoke test covers all help sections, staged examples and saved working, and checks that actual task solutions remain hidden until explicitly revealed. This does not replace browser interaction or visual checks.
- Verification: `npm test`, `npm run check`, `npm run build` and `git diff --check` passed. The existing Vite bundle-size warning remains: main JS is about 1,113 kB (317 kB gzip). A fresh localhost request could not reach port 5173 and the installed Chromium failed to launch in this sandbox, so browser/phone interaction and visual review remain outstanding. The owner’s running dev site is the place to try the pilot. No deployment, account integration, live tracker writes or student-data changes were made.

## Previous handoff — 14 November 2026 (2017 papers)

- Added both **2017 normal Higher Level papers**, each with nine questions: **33 P1 parts and 37 P2 parts**. There are now **eighteen normal papers from 2017–2025**, with **739 leaf parts**, plus two original sample papers. Further earlier papers require the same direct source/catalogue review; the separate 2022–2024 deferred papers remain unfinished.
- **2017 is outside the Edco tracker export.** Authored `src/data/book2017p1.json` and `src/data/book2017p2.json` directly from the printed PDFs. Each records `catalogueOrigin: app-local-source-review`, a dated review note, SHA-256, printed leaf pages, reviewed topic tags and sequential IDs using the existing convention. These IDs are local to this app and have not been registered in the live tracker. Reviewed all source question pages: **P1 3–19, P2 3–17**. Whole-question totals are taken from print and sum to 300 per paper; leaf marks remain null. `ADDING_PAPERS.md` now documents this workflow beyond the export range.
- Content: `src/data/realPaper2017p1.ts` has **19 automatic checks / 14 guided self-checks**; `src/data/realPaper2017p2.ts` has **23 automatic checks / 14 guided self-checks**. All 70 parts use the common study flow and device-local method history. These are authored study explanations; no official marking-scheme review, automatic working assessment or classroom validation is claimed.
- `src/components/Paper2017Visuals.tsx` provides the figures/tables using the shared 2021 helpers and outline CSS. P1: decay table, midpoint squares, supplied exponential, balance table and unlabelled tide curve for the axis task. P2: fuel data/blank axes, centroid, rectangle, horizon and latitude, cone/cylinder/sphere sections, probability tree/outcomes table, river perspective and limiting tree-fall directions. Catalogue, illustration types and App dispatch are updated.
- P1 details: Q1 roots are written in the requested p ± √q form. Q2 uses argument 150° and the fourth power; Q3 preserves first-principles work. Q4 day indexing starts at exponent zero, with first below-0.01% day 13. Q5’s one-real-root shift excludes both boundary values. Q7 distinguishes population, year-to-year change, continuous average and signed derivative; t = 8 is the beginning of 2018 even though this is a 2017 paper. Q8 uses equivalent compound periodic rates: the supplied first balance row uses the **rounded monthly rate 1.65%**, so the table uses that rate throughout. The savings task explicitly compares the earlier rounded duration/instalments (€2609.04), explaining unrounded instalments and adjusted final payments. Q9 converts 12 h 34 min to hours correctly and adds the 02:00 starting clock time; both rounded/full-precision tide frequencies give 13:26 and 15:42.
- P2 details: Q1 has **four parts**, including (d), and distinguishes a fixed answer-day sequence from a fourth success on day seven. Q2 uses km/litre rather than litres/km, and table values for journey costs. Q3 proves a right-angle vertex is the orthocentre. Q5 uses both similarity ratios and quadrilateral area; Q6 converts 214 m to 0.214 km and uses the latitude-circle radius. Q7 uses an annular water surface and subtracts the submerged frustum for volume 360π. Q8 hypotheses use a two-sided sample-mean test and the lateness denominator for the conditional probability 28/51. Q9 uses full-precision width/height for 54.7°; carrying rounded 5.3 m/9.2 m gives about 54.8°, documented with guided comparison. Both give a bank-hit percentage of 30.4% to one decimal place.
- `tests/papers2017.test.mjs` verifies PDF hashes, local provenance, all leaves/routes/order/feedback, topic vocabulary, printed question totals, every automatic check and exact placeholder with correct/wrong/unsupported input, independent phone enumeration, regression, circle/rectangle/volume geometry, normal integration, strict thresholds, population and cash-flow calculations, tide clock conversion and repeated method storage alongside an earlier paper.
- Verification: `npm test`, `npm run check`, `npm run build` and `git diff --check` all passed. The existing Vite bundle-size warning remains: main JS is about 1,086 kB (310 kB gzip). Browser/phone visual review remains outstanding under the previously recorded localhost/Chromium restrictions; the owner has a running dev site. Preserve the existing uncommitted work and expansion-first direction. The live website/tracker and production student data remain unchanged. Accounts, photos and deployment remain deferred.

## Previous handoff — 14 November 2026 (2018 papers)

- Added both **2018 normal Higher Level papers**, each with nine questions and **33 leaf parts**. All **sixteen normal papers from 2018–2025** now have authored content for **669 leaf parts**, plus two original samples. This completes the normal-sitting papers in the Edco 2018–2025 range. The separate **2022–2024 deferred papers** remain unfinished; earlier years would need catalogue/source review beyond this tracker export.
- Imported `src/data/book2018p1.json` and `src/data/book2018p2.json` with the existing importer, verifying source hashes and structure/topic coverage. Visually reviewed printed P1 pages **3–18** and P2 pages **3–20**. Stable IDs, leaf order, topics and source references are preserved; individual marks remain null. These are authored study explanations, without an official marking-scheme review claim.
- Content: `src/data/realPaper2018p1.ts` has **19 automatic checks / 14 guided self-checks**; `src/data/realPaper2018p2.ts` has **24 automatic checks / 9 guided self-checks**. All 66 parts use the common study screen, local drafts and existing device-local method logging. Proofs, drawings, graph estimates, unsupported symbolic forms and interpretations use guided comparison.
- `src/components/Paper2018Visuals.tsx` reuses the shared 2021 SVG/graph/table helpers and outline styling. P1 includes the Sundaram table, supplied cubic and identity line, blank typing axes/table, bell-curve rectangle, recursively generated Sierpinski steps 0–3 and perimeter table. P2 includes left-tail normal area, parallel lines and touching circles, parallel-intercept and right-triangle figures, railing and shortest-rod diagrams, statistical statements, and crank mechanisms/table/blank axes. Catalogue, illustration types and App dispatch are updated.
- P1 details: Q1 preserves the closed −9/open −2 endpoints. Q2 checks the repeated root 8 and ratio 1/2 for convergence. Q3 selects tangent inclination 120°, not the principal arctangent −60°. Q5 recurrence has period six and asks for **a₂₀₁₉** despite the paper year being 2018. Q6 totals unsigned areas, avoiding cancellation. Q7 verifies the maximum against endpoints; graph work stays on paper. Q8 proves inflection by a second-derivative sign change. Q9 begins at step zero and uses strict threshold checks: first count over 10⁹ at 19, first area below 1/100 at 17; perimeter at step 35 is 4,368,329.
- P2 details: Q3’s block count is 300, independently checked by enumerating all million six-digit strings with leading zeros. Q5’s small-circle centre is (−1,5/2), squared radius 13/4. Q6’s parallel-intercept proof uses equal areas, avoiding a circular appeal to the result. Q7’s source bar-A volume is **71.3π cm³** (plain extraction drops π), and the rod uses centre separation then subtracts both sphere radii. Q8 uses sample-mean standard error, documents 0.7972 calculator versus 0.7960–0.7961 table rounding, and includes the usual nondegenerate assumption for the confidence-width statement. The pension has **26 payments at times 0–25**, including the immediate €20,000, giving €440,132.40. Q9 measures **CX**, with X fixed at the left circle edge: range [10,30] cm, quarter-turn value √800 − 10; the last crank triangle is not right-angled.
- `tests/papers2018.test.mjs` covers both PDF hashes, all routes/IDs/order, every automatic check and its actual placeholder with correct/wrong/unsupported inputs, independent source-equation calculations, recurrence and strict-boundary checks, code enumeration, tangent distances, railing geometry, numerical integration of normal probabilities, pension present values and cash-flow depletion, crank coordinates/range and fourteen repeated method records alongside an earlier paper.
- Verification: `npm test`, `npm run check`, `npm run build` and `git diff --check` all passed. The existing Vite bundle-size warning remains: main JS is about 1,016 kB (292 kB gzip). Browser/phone visual review remains outstanding under the previously recorded localhost/Chromium restrictions; the owner has the dev site running. Preserve the owner’s expansion-first direction while recognising that later app/phone polish and student review are needed. No accounts, photo answers, deployment, live tracker or production student data were changed.

## Previous handoff — 14 November 2026 (2019 papers)

- Added both **2019 normal Higher Level papers**, each with nine questions: **36 P1 parts and 32 P2 parts**. All fourteen normal papers from **2019–2025** now have authored content for **603 leaf parts**, plus two original sample papers. The next earlier normal papers are **2018**; deferred sittings remain separate work.
- Imported `src/data/book2019p1.json` and `src/data/book2019p2.json` with the existing importer. Both PDF hashes match the tracker exports; the source prompts and figures were visually reviewed on P1 printed pages **4–25** and P2 **4–24**. Stable tracker IDs, leaf order, source-page references and topic tags are preserved; leaf marks remain null. No official marking-scheme review or student validation is claimed.
- Content: `src/data/realPaper2019p1.ts` (**13 automatic checks / 23 guided self-checks**) and `src/data/realPaper2019p2.ts` (**21 automatic checks / 11 guided self-checks**). Both papers use the common study screen, local drafts and existing separate method-attempt history. Unsupported symbolic forms, proofs, constructions, drawings and interpretations use guided comparison.
- `src/components/Paper2019Visuals.tsx` supplies accessible SVG figures and semantic tables using the existing 2021 helpers and circle-outline styling. Figures cover exponential and cubic graphs, Cantor endpoints/table, Norman window/table/blank axes, intercepts, tangent circle, body diagonals, obtuse triangle for orthocentre construction, chord/tangent proof, independent-event Venn diagram, trough section, sand timer/similar cone, incircle and pole. Types, dispatch and catalogue registration are updated.
- P1 details: Q2 induction starts at n = 2; Q3 excludes the negative logarithm-domain root; Q5 uses quadrant IV and both square roots; Q7 retains open-interval endpoints, with E = 7/27, F = 25/27 and the step-four endpoint 20/81. The infinite removed length is one even though many points remain. Q8 uses radians and both cosine solutions 52/3,104/3 weeks. Q9 excludes the internal diameter from the perimeter and verifies the maximum-area relation x = y.
- P2 details: Q1 selections are without replacement, with the specified BBBG order having probability **88/969** (independent recalculation caught an initial fraction simplification error). Q2 notes the excluded parallel slope −4/3. Q4 uses body diagonals, Q5 retains construction/proof requirements, and Q6 uses independence rather than disjointness. Q7 retains full precision for segment volume and cubes the similar-cone height ratio. Q8 documents calculator/table tails 0.2605/0.2611 and halves the two-sided p-value before finding the lower sample mean. Q9 uses the incenter angle bisector; the pole solution explains **10.7 m** with full precision versus **10.6 m** after carrying the rounded radius 11.3 m, using guided comparison.
- `tests/papers2019.test.mjs` verifies source hashes, catalogue/leaf/route coverage, every automatic check and placeholder with correct/incorrect/unsupported forms, independent calculations, Cantor intervals, probability enumeration, unit/rounding pitfalls and fourteen repeated method records alongside an earlier paper. Existing uncommitted work and the live website/tracker are preserved.
- Verification: `npm test`, `npm run check`, `npm run build` and `git diff --check` passed. The existing Vite size warning remains: main JS is about 946 kB (272 kB gzip). Browser/phone visual review remains outstanding under the previously recorded localhost/Chromium restrictions; the owner has a local dev site running. These additions remain prototype content with a later UX/polish/student review needed. Photos, accounts, hosting and live tracker integration remain deferred.

## Previous handoff — 14 November 2026 (2020 papers)

- Added both **2020 normal Higher Level papers**: **36 P1 parts and 30 P2 parts**. Each has **nine questions**, unlike the later ten-question papers. There are now twelve normal papers from 2020–2025 with **535 leaf parts**, plus the original sample papers. The next earlier normal papers are 2019; deferred sittings remain separate work.
- The owner wants catalogue expansion now and notes that some existing content/flows need more work to feel good in the app. Treat these additions as source-reviewed prototype content, with a later app/phone UX and student review still needed; do not claim classroom validation or finished visual polish.
- Imported `src/data/book2020p1.json` and `src/data/book2020p2.json` using the existing importer. Both source PDF hashes match the tracker exports; no unresolved metadata issues were reported. Visually checked printed pages 4–25 in both PDFs while authoring content. Stable IDs, order, topic tags and source pages are preserved; individual leaf marks remain null.
- Content files: `src/data/realPaper2020p1.ts` and `src/data/realPaper2020p2.ts`. They require content for every imported leaf. P1 has **22 automatic checks / 14 guided self-checks**; P2 has **20 automatic checks / 10 guided self-checks**. Both use the existing study screen and device-local method logging.
- `src/components/Paper2020Visuals.tsx` supplies the illustrations, reusing the SVG/table helpers in `Paper2021Visuals.tsx` and its circle-outline CSS fix. It includes P1 cubic/line, logarithmic area, triangular dots/table, rectangle-in-circle and shadow diagrams, and P2 line-angle, tangent, inclined-pole, nested-circle, sector, spinner, car-data, cup/net/fill, normal-bound, ordered-list and ship-route figures. Registration/type/dispatch is in the usual catalogue, types and App files.
- P1 review details: Q3 logarithm arguments are checked for both solutions; Q4 verifies the line through stationary points and the inflection point. Q5 uses the supplied monthly interest rate and the 168 remaining month-end repayments. Q6 first principles, de Moivre, induction and other required explanations have guided comparison. Q8 distinguishes shadow-length rate from endpoint speed; Q9 distinguishes population, growth rate, and continuous mean over nine hours.
- P2 review details: Q3(a) subtracts the 5° incline from horizontal elevation angles. Q5 spinner enumeration counts the duplicate 1 sector, with remainder counts 5,5,6. Q6(b)(i) requires Joe specifically to pass. Q7 uses slant height for the net and similar-cone dimensions at the fill line; printed and full-precision heights give the same requested rounded answers. Q8(d) adds passenger variances and accepts 14.59% (calculator) or 14.69% (table z = 1.05). Q8(e) checks all list constraints; Q9 finds the global closest approach on [0,6].
- The new P1 complex-ratio check exposed a parser gap: `1-i` was unreadable while `1-1i` was supported. `src/utils/checkAnswer.ts` now treats a bare signed imaginary coefficient as ±1. Regression tests cover both signs, explicit coefficients, wrong signs and malformed strings; no general symbolic evaluation was added.
- `tests/papers2020.test.mjs` checks both PDF hashes, nine-question structure, all routes/leaf ordering, every automatic check with correct/incorrect/unsupported answers, independent financial sums and mathematical calculations, spinner enumeration, constrained-list uniqueness, and repeat-method history alongside an earlier-paper record. Existing uncommitted work is preserved; the live site/tracker and student data were not touched.
- Final verification for the 2020 addition: `npm test`, `npm run check`, `npm run build` and `git diff --check` all passed. The existing Vite bundle warning remains: main JS is about 882 kB, 255 kB gzip.
- Browser/phone review is still outstanding under the previously recorded sandbox restrictions. The owner has a local dev site running for visual inspection. Photo answers, account integration and hosting remain deferred.

## Previous handoff — 14 November 2026 (2021 papers)

- Added both **2021 normal Higher Level papers**, all Q1–Q10: **44 P1 parts and 42 P2 parts**. There are now ten real papers from 2021–2025, with **469 leaf parts**, plus the two original sample papers. The next earlier normal papers are 2020; the separate 2022 deferred papers have not been added.
- Imported `src/data/book2021p1.json` and `src/data/book2021p2.json` with the existing script, verifying both PDF hashes and the absence of unresolved metadata issues. Visually checked the printed source prompts/figures on P1 pages 4–29 and P2 pages 4–27. Stable tracker IDs, order and topic tags are preserved. Individual marks remain `null`; solutions are authored study explanations, without an official marking-scheme review claim.
- Content files are `src/data/realPaper2021p1.ts` and `src/data/realPaper2021p2.ts`. They require content for every catalogue leaf. P1 has **24 automatic answer checks and 20 guided self-checks**; P2 has **26 automatic checks and 16 guided self-checks**. All 86 parts use the common study screen and existing local method logging.
- `src/components/Paper2021Visuals.tsx` provides P1 illustrations and small shared SVG/table helpers. `src/components/Paper2021P2Visuals.tsx` provides P2 illustrations. Registration is in `src/data/realCatalogue.ts`; illustration types and dispatch are in `src/types.ts` and `src/App.tsx`. New circle outlines have a scoped CSS fix for the inherited fill rule. Graph drawing and construction remain on-paper guided tasks, without a drawing evaluator.
- P1 content details: Q1(c) uses de Moivre for all three roots; Q3(b)(ii) rejects the negative exponential substitution root; Q4(a) includes a complete induction proof; Q7 checks the finite-sum exponent and strict first-short-swing threshold. Q7(b)(ii) explains about 258° with unrounded initial angle versus 260° carried from 26°, and Q7(b)(iii) explains 225 cm from original lengths versus about 227 cm carried from 260°. Those rounding-dependent parts use guided comparison. Q8 verifies global extrema against endpoints; Q9 uses minutes for cooling but seconds for the sugar-cube rate; Q10 distinguishes annual increments from accumulated radius and squares the radius ratio for equal-length trunks.
- P2 content details: Q2(b) explains both admissible points; Q3(b)(ii) gives a valid external-tangent circle family; Q6(a) has a construction/congruence/parallel-intercept proof rather than assuming proportionality. Q8(a)(i) uses the least integer above the continuous cutoff (223); Q8(a)(ii) and Q8(b)(ii) guide normal-table/approximation explanations. Q9 uses the exterior turning angle, converts fuel time to seconds, and retains the given voltage time 6.67 exactly. Q9(b)(iv) accepts a family of valid fractional times through guided comparison. Q10(a)(iii) checks the strict minimum donor threshold of 43.
- `tests/papers2021.test.mjs` verifies PDF hashes, full leaf/order coverage, routes, every automatic configuration with correct/incorrect/unsupported examples, independent model calculations, and 12 repeated method attempts across the new paper IDs without truncation. No live browser/phone review has been performed: this session retains the sandbox limitations already recorded below. The owner has a dev site running and can inspect the updates.
- Final verification for the 2021 addition: `npm test`, `npm run check`, `npm run build` and `git diff --check` all passed. The existing Vite size warning remains: main JS is about 817 kB, 236 kB gzip. Browser/phone visual review is still outstanding.
- Existing uncommitted work is preserved. The live website/tracker and production student data were not changed. Photo answers, hosting and account integration remain deferred.

## Previous handoff — 14 November 2026 (2022 papers)

- Added both **2022 normal Higher Level papers**, all Q1–Q10: **48 P1 parts and 47 P2 parts**. There are now eight real papers (383 parts) plus two original sample papers. The next earlier normal papers are 2021; 2022 deferred papers are separate candidates, not part of this addition.
- New files: `src/data/book2022p1.json`, `src/data/book2022p2.json`, `src/data/realPaper2022p1.ts`, `src/data/realPaper2022p2.ts`, `src/components/Paper2022P1Visuals.tsx`, `src/components/Paper2022P2Visuals.tsx`, and `ADDING_PAPERS.md`. Registration is in `src/data/realCatalogue.ts`; illustration dispatch is in `src/App.tsx` and its types in `src/types.ts`.
- Verified both 2022 normal PDF hashes against the tracker exports. Imported both catalogues with `scripts/import_real_paper.py`; visually checked both papers’ printed pages 4–30 while authoring prompts and solutions. IDs, ordering and topics are preserved. Individual leaf marks remain unknown; these are authored study solutions, not official marking-scheme allocations.
- P1 has **26 automatic final-answer checks** and **22 guided self-checks**. Illustrations include Q2 integration regions, Q3 complex circle, Q6 supplied cubic/blank derivative axes, Q7 heart-rate graph and Q8 Ferris wheel/table/blank plotting axes. Drawings are done on paper and use guided comparison; no drawing evaluator was added.
- P2 has **26 automatic final-answer checks** and **21 guided self-checks**. Tables and SVG diagrams are accessible and reuse the study screen. Graphs/constructions are done on paper. The percentage type now allows a per-question tolerance: P2 Q10(a)(i) accepts table/calculator values around 10.56%. Other percentage checks keep their prior default tolerance. Scoped 2022 styles prevent existing global circle-fill rules from obscuring circle outlines.
- P2 content details: Q2(c) gives both possible slopes; Q3(c) gives both tangent circles; Q7(e) requires similarity or trigonometry; Q8 graph estimates are explicitly illustrative; Q9(c)(ii) explains 87.1° with full precision and about 87.4° after carrying forward 41 s (no automatic grading claim); Q10(e) guides the model-based rank estimate rather than forcing an exact rank.
- Important P1 content details: Q7(d) compares endpoints as well as stationary points; Q8(d) allows any 50-minute window (maximum 34 minutes above 42 m); Q8(e) selects the second crossing; Q9 sums post-injection totals; Q10(e)(ii) converts two years to 24 months.
- Route/content/checker coverage and a repeat-method-attempt persistence check were added in `tests/routes.test.mjs`. Rounded model results are recalculated independently in the tests, including confidence intervals, volumes, correlation, field measurements, binomial probabilities and enumeration of the score constraints. This session cannot connect to localhost (EPERM), so no live browser/phone visual review has been performed. The owner has a dev site running and can inspect updates there.
- Final verification: `npm test`, `npm run check`, `npm run build` and `git diff --check` all passed. The existing Vite size warning remains; the main JavaScript bundle is now about 739 kB (213 kB gzip). Live browser/phone review remains outstanding because localhost and Chromium launch are unavailable in this sandbox.
- Existing uncommitted expansion work is preserved. The live website and tracker were not changed. Photo answers, hosting and account integration remain deferred.

## Previous handoff — 2 November 2026

Read `AGENTS.md` and `README.md` for the current product direction and setup. The long notes below describe the original prototype and contain dated recommendations; use this section for the latest implementation state.

- All six normal Higher Level papers from **2023–2025** now have their ten questions and every tracker leaf part in the standard onscreen study flow: 2025 P1 **51**, P2 **49**; 2024 P1 **46**, P2 **46**; 2023 P1 **52**, P2 **44**. The final addition was 2023 P2 Q10 (`10ai` through `10biii`). There are also two original sample papers.
- Real-paper content lives in `src/data/realPaper*.ts`; tracker-matched catalogue snapshots live in `src/data/book*.json`. `src/data/realCatalogue.ts` registers both. `src/App.tsx` renders the common study screen, illustrations and method logging. Preserve the tracker paper and part IDs and ordering when adding a paper.
- Every reviewed part has an onscreen prompt, answer and worked solution. The existing optional workings pad is ungraded. Narrow final-answer checks cover **26** parts of 2023 P2; proofs, drawings and exact symbolic work use guided self-checks. In Q10, the basin area and three PIN counts have numerical checks; the similarity proof and annular-sector net use self-checks. The Q10 net is drawn on paper and compared with the worked solution; there is no onscreen drawing evaluator.
- `src/utils/methodAttempts.ts` records dated five-level study-method attempts in browser localStorage, separate from answer-check history. Method progress is local to this device; there are no accounts, backend or cloud writes in this app. The live tracker in `../` was not edited or deployed.
- `PHOTO_ANSWER_PLAN.md` records the later paper-photo idea: capture, confirm transcription, then give cautious feedback. The owner chose to expand papers first. They have also deferred hosting and mobile testing for now; do not assume either has happened.
- Last verification after completing 2023 P2 Q10: `npm test`, `npm run check`, `npm run build` and `git diff --check` all passed. Vite warned that the main JS bundle exceeds 500 kB. The newly added 2023 P2 Q9–Q10 screens have not had a live visual review on a phone.
- The working tree contains extensive **uncommitted** changes from the paper expansion. Do not discard them. Check `git status` before editing. README's content counts and route tests were updated through 2023 P2 Q10.

Historical next step (superseded by the 14 November update): 2022 was the next catalogue candidate. First verify its source PDF and the sibling tracker's leaf structure, then add reviewed parts to the same screen in batches. If the owner instead wants to improve this set, a live phone-width review of diagrams and answer entry is the most useful check. Ask before touching the live website or publishing.

**Current direction (31 October 2026):** The owner now wants this repository to become the development home for a combined study app and the existing Easy Maths tracker. Read `AGENTS.md` first. The historical experiment notes below remain useful, but older recommendations against accounts/backend no longer describe the intended combined product. Keep the live tracker in the sibling `easymaths-ie` repository undisturbed while developing here.

**Photo-answer update (1 November 2026):** The current small-pilot plan for photographing paper workings, confirming a transcription and receiving cautious feedback is in `PHOTO_ANSWER_PLAN.md`. The photo-workflow discussion below is historical context.

## Read first

Read these files before making changes:

1. `AGENTS.md` — current product direction and repository boundaries.
2. This handoff — current implementation at the top; historical prototype notes below.
3. `README.md` — setup, current scope and content-editing instructions.
4. `lc_maths_app_codex_initial_build.md` — original product and engineering brief.

Nothing in the product or architecture is permanent. Prefer small, reversible changes that help test the student experience.

## Product objective

The primary objective is to help Leaving Certificate students study mathematics effectively and become more confident. User growth is secondary and revenue is a later consideration.

The owner currently wants an experience that feels real enough to evaluate the UX, rather than a complete content or grading platform.

## Current implementation

The repository contains a working React and TypeScript prototype built with Vite.

Implemented screens and behaviour:

- Home screen with a clear start action.
- Paper-selection screen.
- Two short Higher Level practice papers containing original placeholder questions.
- Focused question study screen.
- Pilot final-answer checking on three representative questions, with correct, incorrect and unreadable-format feedback.
- Optional token-based workings pad, with tap-to-add, drag-to-add, drag-to-reorder, removal, backspace and clear controls.
- Pointer interactions that work with a mouse, touch or stylus, plus keyboard controls for adding, removing and rearranging tokens.
- Answers and worked solutions can be revealed independently.
- Previous/next question navigation.
- Desktop question navigator and mobile progress indicator.
- Browser local-storage persistence for viewed questions, reveal state, final-answer drafts, up to ten recent attempts per question and the last question visited.
- Continue-studying actions.
- Graceful handling of invalid paper and question links.
- Responsive desktop and mobile layouts.

The app uses hash-based navigation to remain simple and work as a static frontend without a routing dependency.

Important files:

- `src/App.tsx` — screens, navigation, reveal controls and progress state.
- `src/components/FinalAnswerCheck.tsx` — answer form and retryable feedback states.
- `src/utils/checkAnswer.ts` — deliberately narrow numeric and number-set normalisation.
- `src/utils/progress.ts` — defensive local-progress parsing and saved-attempt limits.
- `src/styles.css` — all visual and responsive styling.
- `src/data/papers.ts` — typed sample papers and questions.
- `src/types.ts` — paper and question types.
- `README.md` — local setup and project scope.

## Running and checking the app

Install and start locally:

```bash
npm install
npm run dev
```

Run lint and TypeScript checks:

```bash
npm run check
```

Create a production build:

```bash
npm run build
```

At the time of this handoff, linting, TypeScript checking and the production build all pass. The original home and study screens were visually reviewed at 1440 × 1000 and a 390 × 844 phone viewport. The newer logo, final-answer checker and optional equation builder have not had a live browser review in the current sandbox because a browser connection was unavailable; visually review them at desktop and phone widths next time the app is run locally.

## Existing paper corpus

The owner's earlier work was found at:

```text
/home/cian/Desktop/lc_app
```

It contains a State Examinations Commission scraper and downloaded Higher Level Mathematics papers. The original directory was not modified.

The 75 downloaded PDFs were copied into:

```text
data/papers/
```

The scraper manifests were copied into:

```text
data/manifests/
```

The PDFs span 1996–2026, with Paper 1 and Paper 2 plus deferred sittings where available. They are currently source material only and are not served or parsed by the frontend.

Do not imply that the prototype questions are official SEC questions. The current questions are original exam-style examples and are labelled as sample content in the interface.

The original scraper remains in `/home/cian/Desktop/lc_app/scraper/`. Do not bulk-download more material unless the user asks.

## Latest implementation experiment: equation building

The first workings-input experiment is implemented as an optional, collapsed pad below the final-answer area. It contains a large, multi-line canvas with digits and a deliberately limited set of common symbols. Inserted notation is styled as a continuous typeset expression rather than as separate UI cards. Students can add explicit line breaks for successive steps. On desktop, the palette sits beside the workings area; on mobile, it becomes a tray below it.

The expression is represented internally as an ordered array of tokens. It is not checked, graded or persisted. This is intentionally an interaction prototype: test whether students find building a linear expression comfortable before adding answer evaluation or more complex notation.

The builder supports simple linear expressions. Superscripts and the square-root sign are currently individual tokens rather than nested mathematical structures. Fractions, roots containing expressions and general equation-editor behaviour remain out of scope.

The owner considers the current builder good enough for now. Do not continue polishing it unless testing reveals a problem or the owner asks. Their latest feedback was that the original small boxed tokens looked janky; this led to the current large, lined workings canvas and lightweight typeset-token treatment.

Important file:

- `src/components/EquationBuilder.tsx` — palette, token state and pointer/keyboard interactions.

## Latest implementation: final-answer checking

A narrow deterministic checker is implemented for three sample questions: an unordered pair of algebraic roots, a signed calculus result and a numerical probability. Question-specific configuration lives in the optional `answerCheck` field. The checker accepts the configured numeric tolerances and normalises simple fractions, decimals and percentages without evaluating code. Unsupported input receives a neutral unreadable-format result rather than a false incorrect mark. The current draft, latest feedback and up to ten recent checks per question persist locally and are restored after navigation or refresh.

This is final-answer feedback, not partial marking. It does not inspect or grade the token-based workings pad, and it does not attempt general symbolic equivalence. The owner remains interested in using reviewed marking schemes to guide a future correction algorithm.

The recommended approach is a reviewed, question-specific structured rubric rather than passing raw marking-scheme prose directly to a grader. A future question model may need criteria resembling:

```ts
interface MarkingCriterion {
  id: string;
  description: string;
  marks: number;
  acceptedForms: string[];
  dependsOn?: string[];
  allowErrorCarriedForward?: boolean;
}
```

A plausible deterministic pipeline is:

```text
Student tokens
  → split at explicit line-break tokens
  → parse each line into mathematical structure
  → normalise equivalent expressions
  → compare steps with question-specific criteria
  → award marks and show a criterion-by-criterion breakdown
```

Do not compare only rendered strings: reordered factors, equivalent fractions, decimals, percentages and algebraically equivalent expressions may all be valid. Never evaluate student input as JavaScript.

There are three materially different scopes:

1. Final-answer checking for controlled numerical/text answers — relatively small.
2. Rubric-based marking for a curated set of question types — medium complexity and a good prototype target.
3. Examiner-like marking across complete papers, including alternative methods and error-carried-forward marks — a large, difficult project.

The most sensible marking experiment would cover three representative sample questions: one numerical, one algebraic and one calculus question. Attach reviewed, machine-readable criteria to each; require or encourage one working step per line; parse only the necessary expression subset; and return an explicit **unable to mark confidently** result for unsupported or ambiguous work. Do not imply authoritative grading.

Important implementation note: `EquationBuilder` still owns its token array locally. Before workings-based submission or marking can work, it will need a controlled value or an `onChange`/`onSubmit` interface so the question screen can access and persist the workings.

## Product discussion: answering questions

The owner wants the act of answering a question to feel substantially better. They are interested in:

- Entering a final answer and receiving immediate correctness feedback.
- Receiving full or partial grading against the marking criteria for a question.
- Solving on paper, photographing the workings on a phone, transcribing them and grading them.
- Optional onscreen handwriting for touchscreen or stylus users.
- Typed mathematical workings as another option.
- An intuitive symbol interface for students who do not want to type maths syntax.
- Keeping the experience easy and accessible for everyone.

The owner personally prefers working on paper and photographing the result. They are open to a strongly mobile-focused product, but are conscious that requiring a phone or camera immediately could add resistance for a first-time user.

## Recommended product direction

Do not force one input method on every student. Use a simple default with richer optional modes.

Recommended hierarchy:

1. **Enter final answer** — the default and lowest-friction option.
2. **Photograph paper workings** — the preferred future full-grading experience.
3. **Type workings** — useful for keyboard and desktop users.
4. **Draw onscreen** — optional for tablets and styluses.

The central study loop should become:

```text
Understand → attempt → submit → receive feedback → learn → continue
```

The current prototype now completes the attempt-and-feedback loop for three selected final answers. The most valuable next step is testing that narrow loop before expanding coverage or attempting partial marking.

### Final-answer input

The first implementation should be intentionally small:

- Display a clear answer field.
- Let the student press **Check answer**.
- Give immediate correct/incorrect feedback.
- Allow another attempt before revealing the answer.
- Keep hints, the final answer and the worked solution separate.
- Preserve the existing no-account, local-first experience.

The input should eventually adapt to the question type. Support common equivalences such as `1/2`, `0.5` and `50%`, along with tolerances, rounding and units where applicable.

Do not begin by building a general-purpose equation editor. A compact maths keypad that inserts symbols or structured templates at the cursor is likely easier than dragging symbols into place. Drag-and-drop should not be the only interaction because it can be slow for multi-line workings and inaccessible to keyboard or screen-reader users.

### Paper-photo workflow

The promising future flow is:

1. Student chooses **Photograph my workings**.
2. The mobile web experience opens a camera or image-upload flow without requiring a native app.
3. The app checks image readability.
4. The work is transcribed.
5. The student confirms or corrects the transcription.
6. The work is graded against a question-specific rubric.
7. Feedback explains where marks were gained or lost.

Never silently grade an uncertain transcription. Minus signs, powers, fractions and variable names can be misread. The student needs a confirmation or correction stage.

A useful result should show marking detail, for example:

```text
Correct method          3/3
Correct substitution    2/2
Arithmetic error        0/1
Total                   5/6
```

The grader should apply reviewed criteria attached to the question rather than inventing a marking scheme. The data model will eventually need accepted answers, equivalent forms, units, tolerances, method steps, mark allocations and common errors.

### Mobile-first, not mobile-only

The camera workflow can be mobile-first without excluding desktop students. Possible later options include:

- Direct final-answer entry on desktop.
- Uploading an existing image.
- A QR handoff that opens the exact question and camera flow on the student's phone.
- Synchronising the grading result back to the desktop session.

Do not require camera permission during onboarding. Ask only after the student deliberately selects the photo option.

### Onscreen handwriting

Treat drawing as optional rather than the main early experience. It is most useful on tablets with a stylus. A good implementation would require undo, erasing, zoom, resizing, palm rejection and accessible alternatives, so it should follow simpler input experiments.

## Suggested sequence of future experiments

1. Run a live desktop and mobile review of the logo, final-answer checker and optional equation builder.
2. Test correct, incorrect, retry and unreadable-format states with a few students.
3. Expand deterministic checking only to question types that can be handled confidently.
4. Add a controlled value/submission boundary to the workings builder if workings-based feedback is pursued.
5. Prototype structured rubric-based marking for three representative sample questions.
6. Add an **I worked this out on paper** self-marking flow using visible rubric steps.
7. Test those flows before adding recognition infrastructure.
8. Prototype photo upload with a transcription-confirmation screen only after the core loop is useful.

## Recommended next scoped work

Do not immediately broaden the checker into general marking. First review the current pilot in a live desktop and mobile browser, verify that the final-answer field feels easier than the workings pad, and test whether the feedback and saved attempt history encourage another attempt. If it works, add similarly controlled configurations to a small number of straightforward questions. Confirm scope with the owner before implementing rubric-based or photo-based marking.

## Boundaries and cautions

- Do not add authentication, a database or paid services merely to prototype answer entry.
- Do not build AI grading before a reviewed rubric and transcription-confirmation experience exist.
- Do not claim that automated grading is authoritative.
- Do not make camera upload mandatory.
- Do not make drag-and-drop the only way to enter mathematics.
- Do not extract or publish official-paper content without establishing a review and attribution workflow.
- Preserve the existing PDFs and the owner's original Desktop workspace.
- Keep the product small enough to change after user feedback.
