# Photo answers: pilot plan

Status: planning note, 1 November 2026. No photo processing is implemented yet. The owner chose to add more papers before starting this pilot.

## Why this experiment matters

The preferred student flow is to solve a question on paper, photograph the work, and receive useful feedback in the same study screen. The 2025 Higher Level Paper 1 has all 51 leaf parts available onscreen, giving enough varied content to test this input method when the owner returns to it. The earlier discussion in `HANDOFF.md` proposed capture, transcription confirmation and question-specific assessment; this file is the plan for a small pilot.

The pilot should answer two questions: can the app read ordinary student handwriting accurately enough after student correction, and does its feedback help the student understand or fix a mistake? It should not promise examiner-style marking.

## First pilot scope

Use three reviewed parts with different kinds of work:

1. **Q8(a)** — a short numerical calculation with successive discounts.
2. **Q9(a)(v)** — several linked calculations and units in a rate-of-change problem.
3. **Q10(e)(ii)** — a written proof by induction.

These are initial candidates; the owner can change them after trying the capture flow. Test with consented example work and separate test data. Do not use production tracker student records.

## Student flow

1. Open a part and choose **Photograph my work**. The existing final-answer, workings-pad and self-check options remain available.
2. Take a photo or upload an existing image. Preview it, crop or rotate it, and retake it if the writing is unclear. Camera access is requested only after the student chooses this option.
3. The app transcribes the work into ordered mathematical steps and highlights uncertain symbols or regions. The original image stays visible for comparison.
4. The student corrects or confirms the transcription before asking for feedback. A missed minus sign, exponent, fraction bar or variable must not be silently treated as their answer.
5. The app compares the confirmed work with reviewed, question-specific criteria and gives step-linked feedback. It should explain a likely issue, accept an alternative valid method where it can, and say **unable to assess confidently** where it cannot.
6. The student can review the authored solution, retry, and separately record the five-level study method. An answer assessment is not a method level, exam mark or predicted grade.

## Technical shape

- Add a server API boundary before sending images to an AI service or storing them. This Vite frontend must not contain service credentials or make privileged cloud writes.
- Use a vision-capable model to produce a structured transcription: ordered steps, mathematical notation, location in the image, and explicit uncertainty. Keep the model choice replaceable until sample handwriting has been evaluated. A specialist maths OCR service is an option only if direct vision transcription proves insufficient.
- Keep transcription and assessment separate. The student-approved transcription is the assessment input; the image remains available as evidence and context.
- Attach reviewed assessment criteria to each pilot part. Use deterministic maths checks for expressions or values the app can parse reliably, with model-assisted interpretation for the rest. Never invent a marking scheme or silently turn uncertainty into a correct/incorrect result.
- Keep photo submissions and feedback separate from existing final-answer checks and from dated tracker method attempts. Design any later account persistence to reuse the tracker's stable paper and leaf-part IDs.
- Decide image retention, access and deletion before saving student photos. For the pilot, use disposable test data and avoid production student records. Track processing cost and response time during testing.

## Build order and success checks

1. **Capture and confirm:** phone-width upload/camera flow, crop/retake, editable transcription and saved draft for a revisit. No AI correctness claim yet.
2. **Feedback on the three parts:** reviewed criteria, evidence-linked comments, retry, and a clear unable-to-assess state.
3. **Evaluate with real examples:** include neat and messy handwriting, crossed-out steps, alternative methods, incorrect work and poor photos. Compare transcription with the image and feedback with a human review. Record where the system is uncertain or wrong before widening coverage.

Do not broaden to all 51 parts or another paper until the pilot is useful and its failure cases are understood. Graphs, diagrams and unrestricted partial-credit marking are later scopes.

## Relationship to older notes

`HANDOFF.md` records the original paper-photo idea and a historical sequence that placed recognition after more final-answer work. This plan is ready for a small trial when the owner returns to photo answers; paper-catalogue expansion is the current work. `AGENTS.md` remains the source for tracker integration and live-site boundaries.
