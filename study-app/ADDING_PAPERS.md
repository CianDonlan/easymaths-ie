# Adding a real paper

Use the existing study flow. Add one normal-sitting paper at a time, in question batches, preserving the tracker IDs. Deferred sittings are separate papers. Keep the live website and tracker unchanged.

## 1. Establish the source and catalogue

Read `AGENTS.md` and the latest `HANDOFF.md` first. Check Git status and preserve existing uncommitted work.

The source PDFs are in `data/papers/`. The tracker exports are in `../content/`. Read that repository's `AGENTS.md` and `TRACKER.md` before adapting its metadata or behaviour. Its catalogue review is a structural aid, not a visual certification of every printed prompt or individual marks.

Import the metadata using the reusable script, for example:

```bash
python3 scripts/import_real_paper.py \
  lc-hl-2022-normal-p1 \
  data/papers/2022_normal_lc_maths_hl_english_paper_1.pdf \
  ../content/edco-2018-2025-candidates.json \
  ../content/edco-2018-2025-topic-review.json \
  src/data/book2022p1.json
```

The script checks the PDF SHA-256, part/topic coverage and unresolved issue lists. It copies metadata only. Keep leaf maximum marks `null` unless individually verified. Do not infer them from whole-question totals. Keep stable IDs even when correcting a topic locally.

### Papers outside the tracker export

The Edco exports cover 2018–2025. For an earlier paper such as 2017, do not force the import or imply that its IDs already exist in the tracker. Review every printed question and leaf label directly, then author a local `bookYEARpN.json` with the same paper/leaf ID convention and fields. Record the source PDF SHA-256, printed source page for each leaf, locally reviewed topic tags, `catalogueOrigin: "app-local-source-review"`, and a dated `sourceReview` note. Keep individual marks null. Verify whole-question totals only from the printed paper; do not distribute them across leaves. Test the hash, leaf order, labels, routes, topic vocabulary and local method persistence. This does not register papers in the live tracker; any later integration must reconcile the local IDs deliberately.

## 2. Review the actual questions

Extract text for navigation, then render the printed pages for visual review:

```bash
pdftotext -layout data/papers/2022_normal_lc_maths_hl_english_paper_1.pdf /tmp/paper.txt
pdftoppm -f 4 -l 30 -scale-to 1400 -png \
  data/papers/2022_normal_lc_maths_hl_english_paper_1.pdf /tmp/paper
```

Inspect the page images. In the 2022 PDFs, plain text extraction loses powers, subscripts, fractions, radicals and inequality symbols. Check shared introductions, labels, units, domains and rounding instructions too. Retain source-page provenance in the catalogue.

## 3. Author a batch and connect it

- Add `src/data/realPaperYEARpN.ts`, following an existing paper. Every ready leaf needs a self-contained prompt, answer and explained solution. Reintroduce context when a student opens a leaf directly.
- Register both content and catalogue in `src/data/realCatalogue.ts`. Preserve catalogue order. Unreviewed parts can use the existing book-companion fallback; never describe them as ready.
- Reuse narrow answer checks only after inspecting their parser semantics. For example, `percentage.expected` uses percentage points (10.56 for 10.56%), while numeric percentage input normalisation differs. `constant-radical` handles a particular constant-plus-radical form, not arbitrary symbolic maths. Test the exact placeholder examples.
- State accepted format and precision in the hint. Allow justified table/calculator rounding. For interpretations or intermediate rounding requiring explanation, prefer guided comparison to an overconfident correctness claim.
- Use guided self-checks for proofs, constructions, drawings and unsupported symbolic answers. Numeric feedback alone does not assess a required proof or method.
- Add accessible SVG diagrams and semantic data tables where the question needs them. Add the illustration type and study-screen dispatch. Check inherited CSS: `.geometry-visual circle` fills circles by default; 2022 diagrams have a scoped outline fix.
- Drawings can be completed on paper. Preserve meaningful geometry and labels; do not substitute an invented drawing evaluator. Keep answer diagrams separate from supplied diagrams to avoid revealing the task prematurely.

Solutions here are authored study explanations. Do not call them official marking schemes or claim verified marks. Check a scheme if available, especially for alternative accepted interpretations, and document what was actually reviewed.

## 4. Verify and leave an accurate handoff

Test catalogue identity/order, every ready route, nonempty content and feedback, and realistic correct/incorrect/unsupported entries. Check repeated method-attempt storage when adding new catalogue IDs. Recalculate numerical results independently; include sign, tail, endpoint, unit, rounding and off-by-one pitfalls.

Run `npm test`, `npm run check`, `npm run build` and `git diff --check`. Review desktop and phone layouts if a browser is available, especially diagrams, tables and answer entry. A successful build does not constitute a visual review. Record any unavailable review explicitly.

Update `README.md` and the top of `HANDOFF.md` with completed parts, answer-check counts, review scope, validation and the next unfinished paper. Keep `AGENTS.md`'s implementation summary current. Do not publish or change the live tracker as part of content authoring.
