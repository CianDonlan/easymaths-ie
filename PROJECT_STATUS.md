# Project status

Updated: 13 September 2026

## Completed

- Replaced the old `easymaths-ie` GitHub repository contents with the current maths challenge funnel.
- Added automatic GitHub Pages deployment from `main`.
- Connected `https://easymaths.ie`, enabled HTTPS, and confirmed the live site and `www` redirect work.
- Added the timed challenge, worked solution, short diagnostic, priority result, grind information, and enquiry screens.
- Generated verified QR codes for `poster-01` and `poster-02` in the workspace `qr-codes/` folder.
- Recorded the future curriculum-aware diagnostic idea in `PRODUCT_NOTES.md`.
- Confirmed the build and rendered-page tests pass.

## Current limitations

- The enquiry form is a demo and does not send or save submissions.
- All course and level choices currently use the same five diagnostic questions.
- Funnel stages share one URL; refreshing returns the visitor to the opening challenge.
- Poster IDs are read from the URL but are not yet stored or reported in analytics.

## Next steps

1. Set up Firebase Firestore and a Cloud Function to receive and validate enquiries.
2. Choose an email provider, booking link, and preferred alert method for rapid follow-up.
3. Send an immediate confirmation to the parent or guardian, notify the tutor, and record contact attempts and lead status.
4. Add a privacy notice, retention policy, spam protection, and clear consent handling.
5. Replace the sample diagnostic with question sets tailored to LC/JC and Higher/Ordinary levels.
6. Add poster attribution analytics and consider separate URLs for shareable funnel stages.
7. Replace the remaining placeholder grind details with real formats, prices, locations, availability, and contact information.
