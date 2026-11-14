# Easy Maths website and study tracker: agent guide

Read this before changing the website or tracker. This repository is the source for **easymaths.ie** (`CianDonlan/easymaths-ie`). The live website is hosted by the existing **Netlify** project `dainty-mochi-d8f980`, deployed from GitHub `main`. The tracker is live at `https://easymaths.ie/tracker`. The owner confirmed on 31 October 2026 that the live tracker is working. Do not assume the separate ChatGPT Site, Cloudflare, GitHub Pages, or the sibling study app hosts this domain.

## Purpose and product direction

Easy Maths is a Leaving Cert maths tutoring business. The tracker serves a small group of the owner's students, who solve questions in a **physical Edco exam book** and log how each part went on their phones. The tutor needs to see assigned students' practice and use it to plan lessons. It is a study record, not a question renderer, automatic marker, or predicted-grade engine. The larger study app may eventually reuse the catalogue and attempt model, but it is a separate repository and has no runtime dependency here.

Prioritise quick, clear logging and progress that is truthful and encouraging. The student lands on **Log attempt** or **See progress**, chooses year, paper, sitting, question and subpart, then sees a full-screen logging form. After saving, acknowledge the work equally at all five method levels. A low level still counts as practice. The picker shows prior attempt levels, and Progress shows weekly volume, paper-equivalent practice, improvements, independence, and topic breakdowns. Avoid punitive zero headlines, invented exam-score estimates, or decorative statistics. The owner currently considers the UX good enough to use; refine it based on real student feedback.

## Where things live

- `app/tracker/tracker.tsx` and tracker CSS: student/tutor flow. `app/tracker/login/`: account entry. `app/api/tracker/`: bootstrap, session, attempts, goals, students, password changes, exports.
- `app/tracker/catalogue.ts`: stable paper and leaf-part IDs, order, topics, provenance and review status. `content/`: generated Edco inventory, topic review, and corrections. Preserve existing part IDs when improving classifications so saved attempts remain linked.
- `app/tracker/model.ts`, `goals.ts`, `progress.ts`: method scale, validation and derived progress. `auth.ts` and `server.ts`: passwords, sessions and access control. `firestore-db.ts`: Firestore adapter for the tracker's fixed D1 query set.
- `drizzle/`: local D1 schema/migrations. `vite.config.ts` is for local D1 development; `vite.netlify.config.ts` builds a Nitro server function for Netlify. `netlify.toml` runs `npm run build:netlify` and publishes `dist`.
- The sibling `study_app/lc-maths-study-app` holds source PDFs under `data/papers/` and a different device-local answer-check prototype. It does not store or serve live tracker attempts. `easymaths-site-publish` and the owner-only ChatGPT Site are separate copies; do not deploy either as easymaths.ie.

## Live data and accounts

Production and Netlify deploy previews use Firebase project **`easymaths-ie` / Cloud Firestore**, via the Firebase Admin SDK in the Netlify server function. They share that database. The server-only Netlify environment variables are `FIREBASE_PROJECT_ID`, `FIREBASE_SERVICE_ACCOUNT_JSON` (secret), and `TRACKER_SETUP_KEY` (one-time tutor setup). Never commit their values or move credentials into public client variables. `firestore.rules` denies direct client access; the server mediates reads/writes. Check the console's deployed rules separately if changing them.

The owner has created a tutor account. Tutors provision students with usernames and passwords; students can see and change only their own attempts. Tutors can view/export assigned students and reset their passwords, but cannot edit their attempts. Users can change their own passwords, which revokes sessions. There is **no self-service recovery for a forgotten tutor password** yet. Sessions are cookie-based. A preview login cookie will not sign the user into the live domain; sign in there separately. `/tracker?demo=1` uses browser localStorage only and is not the live account database.

Local development uses **D1**, independent of production Firestore. Run `npm install` if needed, `npm run tracker:db:local`, then `npm run dev`. Open `/tracker/login` to create a local tutor account if the local database is empty. Do not interpret local/demo records as production records. See `.env.example` for configuration notes.

## Data and calculation rules

The authoritative scale is `easy-maths-five-levels-v1` in `app/tracker/model.ts`: 1 Copy the solution; 2 Build with the solution; 3 Use notes/examples; 4 Answer independently; 5 Answer correctly at exam pace. Higher means less help. It is an **ordinal study-method level**, not a mark, percentage or forecast. Marks are optional and separate. Each save is a distinct dated attempt; edits retain its ID and deletion removes that attempt. Keep repeated history intact.

The primary weekly target is **20 logged parts** (optional 12/30), counted by saved attempts in the Europe/Dublin Monday-to-Sunday week regardless of level. A secondary 2/3/4 practice-day goal is available. Paper-equivalent practice is total attempts divided by **35**; it is an estimate of volume, not completed whole papers. Improvement means a part's later attempt beats its previous personal best. “Done without help” counts distinct parts whose latest attempt is level 4 or 5. Topic cards show latest-level counts per distinct part, plus an all-attempt average with its denominator; repeats contribute again to that average. A part may have multiple topic tags. Exact definitions and edge cases are in `TRACKER.md`; tests are under `tests/`.

The catalogue currently covers **24 Higher Level papers / 1,049 structure-reviewed leaf parts**: 2026 normal Papers 1 and 2 (95 parts), plus the 22 Edco book papers from 2018–2025 (954 parts, including deferred papers for 2022–2024). Edco contents photos confirmed that book set. The source PDF inventory has 75 files in the sibling study app. Topic workbooks are hints, not authoritative leaf inventories or mark allocations. Leaf maximum marks remain unknown (`null`) unless individually verified. Extraction and topic mapping were checked against PDF text, with corrections, but every printed page has not been visually certified. See `TRACKER.md` and `content/` before expanding coverage or changing topic tags. Never infer marks from whole-question totals.

## Working and deployment checks

From this repository, use `npm run lint`, `npx tsc --noEmit`, and `npm test` for code changes. For catalogue changes, also run `python3 scripts/check_tracker_structure.py` and `python3 scripts/map_tracker_topics.py`. For Firestore adapter/runtime changes, run `npm run test:firestore` and `npm run test:firestore-runtime` with Java 21+ and a localhost-capable environment. A focused request test should cover student isolation when changing auth or access logic. Do not repeat broad tests without a concrete risk.

GitHub `main` deploys to the **existing Netlify site**. Use a preview branch/PR for changes that need live-environment checks; preview and production share Firestore, so avoid destructive test data. Keep public `/`, `/grinds`, and the enquiry form working. There is no reason to change DNS or move hosting for routine tracker work. Preserve unrelated untracked private files in this working tree, including the PNG, internal PDF and Python cache; do not commit them accidentally.

For more detail, read `TRACKER.md` (feature behavior, catalogue and calculations) and `TRACKER_LIVE_HANDOFF.md` (release architecture and checks). `TRACKER_HANDOFF.md` is historical. Parts of `README.md` still describe the original starter and optional Cloudflare hosting; they are not the current deployment source of truth.

## Study app development home

The study app now lives in `study-app/` inside this repository and is built as an isolated static app at `/study-preview/`. Read `STUDY_APP.md` and `study-app/AGENTS.md` before changing it. Use `npm run dev:study` for its live dev server, `npm run check:study` / `npm run test:study` for its checks. `build:netlify` prepares its static assets before the existing website build. The original sibling repository is retained as a fallback, not a second development target. This does not connect study localStorage to tracker accounts or Firestore.
