# Tracker live deployment handoff — 26 October 2026

The tracker is deployed at `https://easymaths.ie/tracker` through the existing Netlify site. PR #1 (`tracker-firestore-preview`) was tested as a Netlify deploy preview, then fast-forwarded to `main` at commit `2d71f52`. GitHub recognized the PR as merged. No DNS or Cloudflare nameserver changes were made.

The owner created the first tutor account on the preview and confirmed an attempt survived a page reload. Production and preview use the same Firebase project, `easymaths-ie`, so the tutor account should work on the live site. The owner still needs to sign in on the live URL and confirm their saved attempt appears there; the agent cannot do this without the owner's password and should not request it.

Production smoke checks passed: `/`, `/grinds`, `/tracker`, `/tracker/login`, `/netlify-form.html`, and `/api/tracker/bootstrap` returned HTTP 200. An unauthenticated `/api/tracker` request returned 401. The bootstrap endpoint returned `needsSetup:false`, showing the live server reached Firestore and found the tutor account. The owner confirmed a test enquiry submitted through the preview form appeared in Netlify Forms. The production form has not been submitted as part of smoke testing.

Architecture: the website remains on Netlify; `vite.netlify.config.ts` produces a Nitro server function, with `app/tracker/firestore-db.ts` mapping the tracker's fixed D1 query set to Firestore documents through the Firebase Admin SDK. Server-only Netlify variables are `FIREBASE_PROJECT_ID`, `FIREBASE_SERVICE_ACCOUNT_JSON`, and `TRACKER_SETUP_KEY`. The owner marked the service-account JSON as secret. Never commit credentials or use `NEXT_PUBLIC_` for them. The local D1 preview and separate ChatGPT Site D1 remain independent from Firestore.

Local checks passed before release: `npm test`, `npm run lint`, `npx tsc --noEmit`, Firestore emulator integration test, built Netlify function smoke test against the emulator, and a production dependency audit with zero vulnerabilities. The Firestore emulator test needs Java 21+ and permission to listen on localhost. The working tree still contains unrelated untracked private PNG/PDF source files; preserve them.

Next step: ask the owner to sign in at `https://easymaths.ie/tracker`, verify their existing attempt, and test the phone flow. Then address any issue they find. Tutor password recovery is still manual, so the owner should retain their password in a password manager. The one-time setup key is no longer needed for new tutor creation once the tutor record exists.
