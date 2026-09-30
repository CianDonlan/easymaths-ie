# Next step: the post-solution contact funnel

Recorded: 18 September 2026. Updated: 20 September 2026. These notes guided the first local prototype; production remains unchanged.

## Local first version — 20 September 2026

The conversation-first path is now prototyped locally. The completed solution offers `Ask about maths grinds` and `Send this to a parent`; `/grinds` is a stable shareable page; and the page explains online, in-person and practical home-visit options, the tutor's confirmed mathematical background, and how an enquiry becomes an agreed booking.

The enquiry form currently prepares a reviewable email message. When `NEXT_PUBLIC_ENQUIRY_EMAIL` is not configured it copies the preview and explicitly says that nothing was sent. No database or phone number is required for this version. The owner still needs to review the page, define the offer and pricing, supply contact details and decide permanent delivery before publication.

## Owner checkpoint — 20 September 2026

The owner reviewed the first local version and considers it good enough to pause here. Preserve the current structure and copy as the working baseline rather than redesigning it from scratch on return.

Completed in this checkpoint:

- The challenge and worked solution now lead directly to a real `/grinds` route.
- Students can share a purpose-written message and stable grinds link with a parent or guardian.
- The grinds page explains online, in-person and possible home-visit arrangements without claiming that any particular slot or location is confirmed.
- The page uses the owner's confirmed background: quantitative analyst at a large financial consulting firm, Master's in Financial Mathematics, and Bachelor's in Mathematical Sciences.
- The enquiry journey asks for enough context to begin a conversation and clearly states that submitting an enquiry is not a confirmed booking.
- Poster attribution is retained in the grinds URL and added to the prepared enquiry.
- With no contact service configured, the local form copies a reviewable message and truthfully says that nothing was sent.
- The production-style static build, route prerendering, rendered-page tests and lint pass.

Resume later with:

1. Develop the actual grind offer and pricing after the owner's offer research.
2. Add a business email and, when ready, a separate business mobile number.
3. Add the owner's name, photograph, fuller professional/academic background and any relevant tutoring evidence.
4. Define the practical home-visit service area and an honest expected response time.
5. Connect permanent enquiry delivery and add final privacy/consent wording and confirmation behaviour.
6. Review the complete experience on mobile, including student sharing and the enquiry interaction.
7. Update the stale social preview image before publishing.

Current publication status: local branch only. Do not publish or merge this checkpoint without explicit approval.

## Goal for the first campaign

Help a student who scans a poster reach a parent or guardian, and make it easy for either of them to start a conversation about maths grinds. The immediate outcome is a real enquiry or direct contact, followed by a human discussion and an agreed arrangement. Direct slot booking can come later.

The owner is putting posters up locally and in neighbouring towns. Session format, location, price and availability are still open. Possible arrangements include travelling to a student, arranging a local room (such as in a library or school), or meeting online. The site should explain that these details are discussed before anyone commits; it should not present any one arrangement as already available or require a visitor to choose one.

## Proposed visitor path to refine together

1. **Finish the maths.** Keep the completed solution visible. The owner liked the direction: “You worked your way to 7” followed by “Easy Maths. We make maths easy, one clear step at a time.” Final wording and layout are still open.
2. **Offer two clear next actions.** The main action leads to asking about grinds. A quieter “Send this to a parent” action helps students bring a parent or guardian into the decision.
3. **Show a short, shareable grinds page.** Replace the current three large method cards and setup placeholder with a concise explanation of the help on offer, the flexible discussion about format, place, time and cost, and a clear contact area. The challenge has already demonstrated the teaching approach.
4. **Make contact easy.** Offer a short “ask me to get in touch” form, the business email address, and a call/text link to a separate business mobile number once the second SIM is ready. Do not show the owner's personal number. All three routes start the same conversation.
5. **Close the loop.** A submitted form must actually reach the tutor and show a truthful confirmation. The tutor then discusses the student's needs and available arrangement with the family. No booking is confirmed by sending the form.

The parent-share action needs a stable page URL. At present, the funnel stages are React state on `/`, so a reopened link starts at the challenge. A suggested share message could say: “I tried the Easy Maths challenge. Could we ask about grinds?” The parent should be able to land directly on the grinds/contact information. Preserve the poster source in the shared or subsequent enquiry path where practical.

The form can ask only what is needed to reply: a name, whether the person is a parent/guardian or student, and a preferred contact detail. A short note about the help wanted or exam stage can be optional. For younger students, explain that a parent or guardian will be involved before lessons are arranged. The exact fields, privacy wording, delivery service, response process and promised response time need owner review before launch.

## Later idea

The owner is interested in an AI chat agent for scheduling. Revisit it when availability, booking rules and handoff are clear. It is not part of the first contact funnel or a prerequisite for putting the initial posters to work.

## When the owner returns

- Review the exact copy and layout for the finish and grinds page, including how prominent the parent-share action should be.
- Decide which contact routes to launch with and supply the business email and new mobile number when ready.
- Agree how enquiries reach the tutor, how quickly they can be answered, and what the confirmation should say.
- Prototype locally, test student sharing and parent contact, then review and tweak before any production push.

Current site status: the grinds page contains placeholder details, the enquiry form sends nothing, and the share action exists only on the deferred diagnostic result. Production remains unchanged.
