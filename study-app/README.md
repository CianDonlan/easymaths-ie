# Development location

This copy is now `easymaths-ie/study-app/`. See `../STUDY_APP.md` for local development, `/study-preview/` builds and phone testing. The original checkout was preserved as a fallback; use this directory for subsequent development after verifying the migration.

# LC Maths Study App

An early UX prototype for a Leaving Certificate Higher Level maths study app. It includes all eighteen normal Higher Level papers from 2017–2025 (739 leaf parts), plus two original sample papers.

The current objective is to learn what makes the study flow useful and reassuring. The product direction and technical decisions are provisional.


## Visual style

The study app follows the current Easy Maths yellow/black/red and warm-paper palette, text wordmark, bold headings and print-style borders. `src/easymaths-theme.css` is imported last from `src/main.tsx` and applies the shared design across the homepage, paper library, study screens and quadratics pilot. The local STIX Two Math font and its SIL Open Font License are in `public/fonts/`, matching the website’s maths font. Correctness feedback retains distinct semantic colours. This is a local app redesign; browser/phone visual review remains outstanding.

## Level 3 quadratics pilot

Open **Level 3 pilot** in the top navigation, the homepage pilot card, or `#/pilot/quadratics` on your dev-site URL (normally `http://localhost:5173/#/pilot/quadratics`). This is a standalone test space with six tasks, two method notes, two examples with revealable steps, and one starting hint per task.

For a quick test, choose **Exam 1**, type some working, open **Notes & help**, try the negative-term example and the starting hint, then return to your question. Refresh or switch tasks to check that your draft remains. Choose a method level yourself, record it, then try **Fresh try** before opening help.

**Testing controls & notes** lets you restart the current question, reset only the pilot, write feedback, and download a JSON copy of your test notes and pilot records. The pilot uses separate device-local storage; its records do not appear in normal paper practice. Restarting clears the current draft/help state while retaining saved attempts; resetting the entire pilot clears its records and feedback too. The help and solution controls require browser/phone usability review; automated checks do not establish classroom effectiveness.

## Local setup

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

Run all checks:

```bash
npm run check
npm test
```

Create a production build:

```bash
npm run build
```

## Current scope

- 2025 Higher Level Paper 1: 10 questions and 51 leaf parts using the tracker's stable IDs, order, topic tags and source pages; all 51 parts from Q1–Q10 have reviewed onscreen prompts, the existing workings pad, answers and authored worked solutions
- 2025 Higher Level Paper 2: 10 questions and 49 leaf parts using the same tracker IDs and source-page metadata; Q1–Q10 are ready onscreen
- 2024 Higher Level Paper 1: 10 questions and 46 leaf parts using stable tracker IDs and source-page metadata; all 46 parts are ready onscreen
- 2024 Higher Level Paper 2: all 10 questions and 46 leaf parts ready onscreen in the tracker-matched catalogue
- 2023 Higher Level Paper 1: all 52 tracker-matched leaf parts ready onscreen
- 2023 Higher Level Paper 2: all 44 tracker-matched leaf parts from Q1–Q10 ready onscreen
- 2022 Higher Level Paper 1: all 10 questions and 48 tracker-matched leaf parts ready onscreen, with 26 narrow answer checks and guided self-checks for the other parts
- 2022 Higher Level Paper 2: all 10 questions and 47 tracker-matched leaf parts ready onscreen, with 26 narrow answer checks and 21 guided self-checks
- 2021 Higher Level Paper 1: all 10 questions and 44 tracker-matched leaf parts ready onscreen, with 24 narrow answer checks and 20 guided self-checks
- 2021 Higher Level Paper 2: all 10 questions and 42 tracker-matched leaf parts ready onscreen, with 26 narrow answer checks and 16 guided self-checks
- 2020 Higher Level Paper 1: all 9 questions and 36 tracker-matched leaf parts ready onscreen, with 22 narrow answer checks and 14 guided self-checks
- 2020 Higher Level Paper 2: all 9 questions and 30 tracker-matched leaf parts ready onscreen, with 20 narrow answer checks and 10 guided self-checks
- 2019 Higher Level Paper 1: all 9 questions and 36 tracker-matched leaf parts ready onscreen, with 13 narrow answer checks and 23 guided self-checks
- 2019 Higher Level Paper 2: all 9 questions and 32 tracker-matched leaf parts ready onscreen, with 21 narrow answer checks and 11 guided self-checks
- 2018 Higher Level Paper 1: all 9 questions and 33 tracker-matched leaf parts ready onscreen, with 19 narrow answer checks and 14 guided self-checks
- 2018 Higher Level Paper 2: all 9 questions and 33 tracker-matched leaf parts ready onscreen, with 24 narrow answer checks and 9 guided self-checks
- 2017 Higher Level Paper 1: all 9 questions and 33 locally source-reviewed leaf parts ready onscreen, with 19 narrow answer checks and 14 guided self-checks
- 2017 Higher Level Paper 2: all 9 questions and 37 locally source-reviewed leaf parts ready onscreen, with 23 narrow answer checks and 14 guided self-checks
- Five-level study-method logging for those parts, with repeat attempts, per-part history and paper progress saved on this device only
- Home, paper selection and question study screens
- Two short sample practice papers
- Pilot final-answer checking on three representative questions
- Optional equation builder with tap, drag, reorder and remove interactions
- Answers and worked solutions revealed independently
- Previous/next question navigation and a question navigator
- Local progress, reveal state, answer drafts, recent attempts and last-question persistence
- Friendly handling of invalid paper or question links
- Responsive layouts for desktop and mobile

Open a real paper from the paper list. Both 2025 Higher Level papers are complete onscreen, with 51 Paper 1 parts and 49 Paper 2 parts. Both 2024 Higher Level papers have all 46 parts ready onscreen. The 2023 Higher Level Paper 1 catalogue has all 52 parts ready onscreen; 2023 Paper 2 has all 44 catalogue parts from Q1–Q10 ready onscreen. The 2022 Higher Level Paper 1 catalogue has all 48 parts ready onscreen, including integration-region and complex-circle diagrams, the supplied cubic and blank derivative axes, a heart-rate graph, and a Ferris-wheel diagram, table and blank graph axes. It has 26 narrow answer checks; drawings, proofs and unsupported symbolic work use guided self-checks. The 2022 Higher Level Paper 2 has all 47 parts ready, with university and car-data tables, circle/triangle/construction figures, cone-net and cut-sphere diagrams, square logo, scatterplots, field and airplane diagrams, and marathon table. Its 26 checks cover controlled numerical answers; its other 21 parts use guided self-checks, including graph estimates, statistical conclusions and the airplane angle affected by intermediate rounding. Both 2021 Higher Level papers are also complete onscreen: Paper 1 has 44 parts and Paper 2 has 42. Their 50 narrow automatic checks are separate from 36 guided self-checks. The 2021 diagrams cover cuboid face areas, tangent and derivative graphs, pendulum/table, rollercoaster table/blank axes, cylindrical trunks, sectioned triangle, circle chord, double cone, similarity and parallel-line proofs, triathlon/tower, plane route and blank voltage axes. The pendulum’s accumulated-angle and half-distance tasks explain carried-forward rounding; graph/proof tasks and normal-table interpretation use guided comparison. Both 2020 papers are also available: nine questions each, 36 Paper 1 parts and 30 Paper 2 parts, with 42 automatic checks and 24 guided self-checks. The new figures cover cubic/line graphs, integral area, triangular patterns/table, inscribed rectangle, shadow, line angles, tangency, inclined flagpole, nested circles, shaded sector, spinner, cone/cup nets and fill lines, normal bounds, ordered data and ship routes. Both 2019 papers add 68 more parts, with 34 automatic checks and 34 guided self-checks. Their figures include exponential/cubic graphs, the Cantor construction, Norman window, circle/chord and cube geometry, orthocentre triangle, Venn diagram, trough, sand timer and helicopter pad. The last pole-height solution explains the effect of carrying a rounded radius forward. Both 2018 papers add 66 parts, with 43 automatic checks and 23 guided self-checks. Their figures include the Sundaram table, cubic and blank typing-model axes, bell curve, Sierpinski patterns, normal probability, tangent circles, parallel-line geometry, railing and rod, confidence-interval statements and crank mechanisms. Proofs, drawings and statistical interpretations retain guided comparison. Both 2017 papers add 70 parts, with 42 automatic checks and 28 guided self-checks. Their illustrations cover decay data, nested squares, the supplied exponential, loan table, tide curve, fuel data/blank scatter axes, centroid, rectangle, horizon/latitude, cones and water sections, probability tree and river/tree geometry. These 2017 catalogues were reviewed directly against the PDFs because they predate the tracker export; their IDs follow the same convention, with no change to the live tracker. They use the same study screen and optional, ungraded workings pad. Narrow final-answer checks cover 34 parts of 2025 Paper 1, 35 of 2025 Paper 2, 34 of 2024 Paper 1, 36 of 2024 Paper 2, 22 of 2023 Paper 1 and 26 parts of 2023 Paper 2. Q10(a) has an exact dot-pattern check; Q2(b)(iii) has an inverse-graph pad that checks three reflected vertices and their segment order. Proofs, formula derivations and graph justifications use guided comparison with worked solutions and make no automatic correctness claim. Paper 2 Q3 includes an accessible Venn diagram; Q4 includes age data tables; Q5 includes geometry schematics; Q6–Q7 include trigonometry, submarine and circle diagrams; Q8 includes a tappable pyramid net construction pad; Q9 includes a test-probability tree; Q10 includes a normal-curve diagram and sample tables. The 2024 Paper 1 Q2 Argand pad, Q3 tangent-guide diagram and Q8 sales graph pad are ungraded; Q9 includes a sphere-cap diagram and Q10 includes the plant-logo curves. The 2024 Paper 2 Q1 stem-and-leaf plot and paired swimming results, Q2 prize table, Q4 geometry diagrams and centroid pad, Q5 circle diagrams, Q6's 16-point grid, Q7 probability diagrams, Q8 cylinder and cone diagrams, Q9's adventure-course diagram and Q10 wiper diagrams are shown in the study screen. The 2023 Paper 1 Q2(c) graph pad and Q4(c) Argand pad are ungraded; Q5(c) shows the function-mapping diagram, Q6(a)(ii) shows the shaded area, Q7(e) shows the four graph choices, Q8(e) includes the ticket-price table, Q9 includes the factor-pair table, ungraded graph pads and tangent triangle, and Q10 includes an ungraded T4 rectangle pad and pyramid section diagram. The 2023 Paper 2 Q1 spinner shows its 12 equal prize sectors; Q4 includes a circle sketch, and Q5 includes the trial data and a cuboid diagram; Q6 includes the rectangle proof diagram, and Q7 includes road, hill and breathing visuals; Q8 includes a normal-curve sketch and an ungraded fillable three-day tree; Q9 includes square, hexagon, arrowhead and circle diagrams, and Q10 includes the conical basin diagram and guided net construction. The Q7(a) ruler represents the printed diagram measurements on any screen size. Unsupported answer forms receive neutral format feedback; the app does not grade workings or claim full symbolic equivalence. The pyramid net pad is ungraded and should be compared using the guided self-check. The inverse-graph check does not assign a drawing mark. Q9(c)(ii) and Q9(d) accept both counting interpretations in the SEC marking scheme; Q10(a)(iii) accepts both area results from rounded-angle and full-precision calculations. The 2023 Q9(a)(ii) and (iii) checks accept the positive-only and signed-factor counts in the SEC scheme. No individual leaf marks have been verified. Method levels describe the help used, not exam marks or predicted grades. These local method attempts are separate from the live Easy Maths tracker and from answer-check history. There is no account or cloud sync in this app yet.

The original pilot checker remains configured for its three sample questions. The real-paper answer checks have separate reviewed configurations, but use the same answer-check UI. Drafts, latest feedback and up to ten recent checks per checked question are saved on the current device. This limit applies only to answer checks, never to method-attempt history. There are no accounts, backend, payments or AI features.

## Content editing

See `ADDING_PAPERS.md` for the source-review, import, authoring and verification workflow used for new papers.

Typed sample content is stored in `src/data/papers.ts`. Add another object matching the `StudyPaper` shape in `src/types.ts` to create another paper.

The book companion catalogues are checked-in snapshots at `src/data/book2025p1.json`, `src/data/book2025p2.json`, `src/data/book2024p1.json`, `src/data/book2024p2.json`, `src/data/book2023p1.json`, `src/data/book2023p2.json`, `src/data/book2022p1.json`, `src/data/book2022p2.json`, `src/data/book2021p1.json`, `src/data/book2021p2.json`, `src/data/book2020p1.json`, `src/data/book2020p2.json`, `src/data/book2019p1.json`, `src/data/book2019p2.json`, `src/data/book2018p1.json`, `src/data/book2018p2.json`, `src/data/book2017p1.json` and `src/data/book2017p2.json`. The 2018–2025 snapshots were generated from the sibling tracker's `content/edco-2018-2025-candidates.json` and `content/edco-2018-2025-topic-review.json`; `scripts/import_real_paper.py` verifies the source PDF hash and copies metadata only. The 2017 snapshots are authored from the source PDFs with `catalogueOrigin: app-local-source-review` and explicit review provenance; they are not registered in the tracker. The tracker catalogue and source PDFs remain the references for future review. The importer applies one paper-verified local topic correction: 2023 Paper 2 Q5(b) is geometry rather than statistics; the live tracker has not been changed. This app does not import code at runtime from the website repository.

The 75 downloaded official PDFs are stored in `data/papers/`. They are source material only and are not bundled into the web app. Prototype questions are clearly labelled original examples rather than official transcriptions.

## Project status

This is an experimental, early-stage product made primarily to explore the UX. All requirements, visual choices, content structures and technology decisions may change.

## Possible next steps

- Test the study loop with a few students
- Add another reviewed real paper using the same tracker IDs and study-screen format
- Improve mathematical formatting
- Test and carefully expand the answer-checking pilot
- Design a careful PDF extraction and review workflow
