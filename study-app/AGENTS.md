# Study app: current direction and next build

This directory is the Leaving Cert study app inside the easymaths.ie repository. It has its own frontend build and local test records, published as a separate static document at `/study-preview/`. Read `../AGENTS.md` and `../STUDY_APP.md` for the website build and release workflow. Preserve the live website, enquiry form and tracker while working here; no account or Firestore integration is implied by sharing a repository.

## Product goal

Help students practise Leaving Cert maths consistently, understand worked solutions, and see real progress. The intended flow is **choose a paper/part → attempt it → get useful feedback or self-check → log the five-level study method → see progress → continue**. The physical Edco book can remain the source of question text while the first integrated flow is tested. Keep the experience simple on a phone, supportive at every method level, and honest about what the app can assess. Automated correctness checks and method levels are different measures. Do not present a method level as an exam mark or predicted grade.

The owner has chosen this repository as the development home for the combined product. Start with one complete, reviewable paper flow, then broaden the catalogue and refine the UX from testing. The eventual account and data migration to easymaths.ie should preserve existing tracker user, paper, part and attempt identities where possible. Avoid developing a second incompatible tracker model.

## Current state of this repository

This is a React 19, TypeScript and Vite **frontend-only prototype**. As of 14 November 2026, all eighteen normal Higher Level papers from **2017–2025** are in the common study flow: **739 leaf parts**, with authored prompts, answers, worked solutions, diagrams and either narrow final-answer checks or guided self-checks. Two original sample papers remain. `src/data/realCatalogue.ts` registers the real content and `book*.json` catalogue snapshots. The 2018–2025 snapshots match the tracker exports; 2017 is reviewed directly from the PDFs, follows the same ID convention, and is not registered in the live tracker. `src/App.tsx` uses hash routes; `src/components/BookPaper.tsx` supplies the catalogue and a book fallback for future unreviewed parts. `src/utils/progress.ts` stores visits, reveals, drafts and up to ten recent answer checks per question in localStorage. `src/utils/methodAttempts.ts` separately records dated five-level method attempts without that ten-check cap. There are no accounts, backend, cloud attempts or shared tracker stats here yet. The 75 PDFs in `data/papers/` are review sources, not served PDFs. See `ADDING_PAPERS.md` for the import/review workflow, `README.md` for setup and the latest section of `HANDOFF.md` for completion and verification notes.

The app now uses the live Easy Maths yellow/black/red and warm-paper design. `src/easymaths-theme.css` loads last after the base/component styles; preserve its cascade when changing layouts. It covers the header, homepage, catalogue, study screens and pilot. Licensed local maths fonts are in `public/fonts/`. Read the latest handoff for the reference source and visual-review limitations.

A standalone Level 3 quadratics pilot is available at `#/pilot/quadratics` through the header and homepage. `src/features/quadraticsPilot/` owns its six tasks, two method notes, two stepwise examples, task hints, UI and separate local persistence. Its records are deliberately separate from paper method attempts; opening help never chooses the student’s level. See the README pilot instructions and latest handoff before expanding it.

The existing tracker lives in the parent website repository at `../`. Read its `AGENTS.md`, `TRACKER.md` and relevant code before adapting tracker behavior. It already has stable paper/leaf-part IDs, 24 Higher Level papers, a five-level method scale, dated repeat attempts, weekly volume goals, topic progress, tutor/student access and exports. The website uses Netlify server functions and Firestore in production, while local website development uses D1. The study app cannot safely call Firestore Admin from its current client-only Vite build. Introduce a server boundary before real accounts or cloud writes; use an emulator or separate test database for experiments, never production student records. Do not copy credentials into this repository or expose them in Vite client variables.

The prototype's `AnswerAttemptState` is **not** the tracker attempt model: it records answer-check outcomes, has no durable dated study-method history, and retains only ten recent checks. Do not carry that limit into tracker attempts. The prototype's sample question IDs (`q1`, etc.) are also not the tracker's stable paper/part IDs. Keep answer-check history separate from method-level attempts until an explicit link is designed.

## First implementation slice

1. Examine the current study screen alongside the tracker logging and progress screens. Identify the smallest flow that lets a student work through **one verified real paper** and log its leaf parts without leaving the study experience. The companion-to-book format is the default starting point; the app need not display full copyrighted question text or solutions to test integration.
2. Reuse the tracker's stable IDs, scale semantics, attempt history and progress calculations. Keep catalogue/content, persistence, calculations and UI separate. Decide the backend interface before moving auth or data access code; do not rely on a browser-only mock for a claimed account feature.
3. Run the slice locally with test data, including phone-width UX, repeated attempts, revisits and progress. Confirm that the sample answer checker still clearly refers only to its original sample questions.
4. Expand papers through a reviewed content workflow. PDF extraction and topic spreadsheets are aids; confirm leaf structure and tags against source papers, preserve IDs and leave unverified marks unknown. Keep the live website untouched until the owner explicitly chooses a release/migration plan.

These are direction notes, not a request to implement all four steps in one pass. Make routine design choices autonomously within the user's next task.

## Run and verify

From this repository: `npm install`, then `npm run dev`; Vite prints the local URL (usually `http://localhost:5173`). For a phone on the same network, `npm run dev -- --host 0.0.0.0` and open the computer's local IP and printed port. `npm run check` runs lint and TypeScript; `npm run build` creates a production build. Dependencies are installed. Extensive paper-expansion changes remain uncommitted; preserve them and check `git status` before editing. No change to the live website is needed to run this prototype.
