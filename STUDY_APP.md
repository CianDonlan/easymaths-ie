# Study app in this repository

`study-app/` is the development home for the Leaving Cert study app. It remains an independent React/Vite app with its own package files, tests and styles. Its production URL is `/study-preview/`; the quadratics pilot is `/study-preview/#/pilot/quadratics`.

## Develop

From the website root:

```sh
npm --prefix study-app ci
npm run dev:study
```

Vite prints the local URL with `/study-preview/`. The dev command listens on the local network: on the same Wi-Fi, replace localhost with the computer’s LAN IP to test on a phone. Website development continues to use `npm run dev`.

For local website testing, build the static study app first:

```sh
npm run build:study
npm run dev
```

In the website dev server, use `/study-preview/index.html`; the deployed Netlify URL is `/study-preview/`. The static preview in website development updates when `build:study` is run again. `dev:study` provides live updates while editing the study app itself.

## Verify

```sh
npm run check:study
npm run test:study
npm run lint
npx tsc --noEmit
npm test
npm run build:netlify
node --test tests/study-preview-build.test.mjs
```

The website’s Netlify build now builds the study app before building the website. A separate nested dependency installation is intentional: the two apps currently use different toolchain and React versions. Do not import the study app into the server app or mix their CSS/global layouts.

Only the study app’s `dist/` contents are copied into `public/study-preview/`, which the website build publishes as static files. Source PDFs stay in `study-app/data/papers/` for review and tests; source code, PDFs, node_modules and the app’s Git history are not copied into the public directory. Generated preview files are ignored by Git.

Use a branch and Netlify Deploy Preview to verify `/`, `/grinds`, `/tracker`, `/tracker/login`, the study preview, its fonts/assets, a deep hash link and phone layouts before any production release. The setup does not deploy automatically merely because files were copied locally; pushing the website’s production branch does deploy it. Netlify previews share the live tracker’s Firestore database, so use the study app’s local records for this testing and avoid writing tracker data.

Preview pages send `X-Robots-Tag: noindex, nofollow`; that discourages indexing but is not access control. The app still stores progress in browser localStorage, without accounts or cloud sync. Records are local to each device/browser/origin; opening a new preview hostname or moving from localhost starts with separate records. Storage key names are preserved.

The original `study_app/lc-maths-study-app` repository is preserved as a fallback until the new location and hosted preview are verified. Do not develop competing copies after accepting the migration.
