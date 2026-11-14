# LC Maths Study App — Initial Codex Build Brief

## Read This First

This document is a starting brief, not a permanent specification.

**Nothing in this project is set in stone.** The product direction, feature set, architecture, technology choices, design, data model, business model and even the objectives below may change as we learn more.

The application should be built so that it is easy to:

- run locally;
- understand;
- change;
- remove features from;
- add features to;
- improve in short working sessions;
- deploy when useful.

Do not treat early decisions as sacred. Prefer simple, reversible decisions over elaborate systems designed for hypothetical future requirements.

---

# 1. Product Objectives

The current priority order is:

## Primary objective

**Help Leaving Certificate students study mathematics effectively and become more confident for their exams.**

The application should eventually help students:

- practise real exam-style questions;
- understand where they went wrong;
- improve weak topics;
- become familiar with exam structure;
- build confidence through visible progress;
- prepare efficiently for their Leaving Certificate mathematics exams.

## Secondary objective

**Acquire and retain a large number of users.**

The product should eventually be useful and engaging enough that students:

- return regularly;
- recommend it to classmates;
- share questions, results or challenges;
- regard it as a normal part of their exam preparation.

## Tertiary objective

**Generate revenue.**

Possible future revenue models may include subscriptions, premium analytics, revision products, tutoring-related services or other approaches.

This objective is also provisional. Do not build monetisation into the first version.

---

# 2. Current Development Philosophy

The immediate goal is not to build the complete product.

The immediate goal is to create a **very small, working web application** that can serve as a foundation for repeated one-to-five-hour development sessions.

The owner should be able to return at any time and say things such as:

- improve the paper-selection screen;
- change how questions are displayed;
- add a new paper;
- add hints;
- improve mobile usability;
- add progress tracking;
- replace the data model;
- test a different study flow;
- remove a feature that is not useful.

Prioritise:

1. A working application.
2. A clear and pleasant core flow.
3. Simple code.
4. Easy local development.
5. Easy iteration.
6. Reasonable mobile support.
7. Only then, additional features.

---

# 3. Immediate Assignment

Inspect the current repository before making changes.

If there is already a functional application, preserve useful work and adapt this brief to the existing structure.

If the repository is empty or does not contain a usable application, create a minimal web application.

A reasonable default stack for an empty repository is:

- Next.js with the App Router;
- TypeScript;
- simple CSS or Tailwind CSS;
- static local data;
- no database;
- no authentication;
- no paid services;
- no external API dependency.

This stack is a default, not a permanent commitment. Use another simple stack if the repository already points clearly in another direction.

The completed first build must:

- install without unusual manual steps;
- run locally with one documented command;
- have no obvious runtime errors;
- work at desktop and mobile widths;
- contain a small amount of sample study content;
- support the basic study flow described below.

---

# 4. First MVP User Flow

Build the smallest coherent version of this flow:

1. A student opens the application.
2. The student sees that it is a Leaving Certificate maths study app.
3. The student can start studying without creating an account.
4. The student selects a sample paper.
5. The student opens a question.
6. The student reads the question and sees the available marks.
7. The student can reveal the answer.
8. The student can reveal a short worked solution.
9. The student can move to the previous or next question.
10. The application remembers the most recently viewed question locally if this can be added without complicating the build.

The first version does **not** need to assess mathematical workings or provide intelligent marking.

---

# 5. Required Screens

## A. Home screen

Include:

- a clear product name;
- a one-sentence explanation;
- a prominent **Start studying** action;
- a small note that the app is an early version.

Avoid:

- long marketing copy;
- account creation;
- pricing;
- elaborate animations;
- fake user statistics;
- unfinished navigation items.

## B. Paper selection screen

Display a small list of sample papers.

Each paper card should show, where available:

- year;
- Higher or Ordinary Level;
- Paper 1 or Paper 2;
- number of questions currently available;
- a clear action to open the paper.

Only a few sample papers are required.

## C. Question study screen

Display:

- paper name;
- question number;
- question text;
- marks available;
- optional topic label;
- **Show answer** control;
- **Show worked solution** control;
- previous and next question controls;
- a way to return to the paper list.

The answer and solution should remain hidden initially.

The layout must remain usable on a phone.

---

# 6. Initial Content

Use a very small local dataset.

For the first build, include approximately:

- two sample papers;
- three to five questions per paper;
- a mixture of basic algebra, calculus, probability, statistics or geometry;
- clearly labelled sample or placeholder questions unless authorised source material already exists in the repository.

Do not scrape examination papers or introduce a complicated import pipeline during this task.

The purpose of the sample data is to test the application structure and study experience.

---

# 7. Suggested Minimal Data Model

Use a straightforward typed structure. It may resemble the following, but change it if the implementation benefits from a simpler structure:

```ts
type Level = "Higher" | "Ordinary";
type PaperNumber = 1 | 2;

interface StudyPaper {
  id: string;
  year: number;
  level: Level;
  paperNumber: PaperNumber;
  title: string;
  questions: StudyQuestion[];
}

interface StudyQuestion {
  id: string;
  number: string;
  prompt: string;
  marks: number;
  topic?: string;
  answer: string;
  solution: string;
}
```

Keep content separate from presentation components.

For example:

```text
src/
  data/
    papers.ts
  components/
  app/
```

The exact folder structure is not important. Separation of concerns is.

Do not create a sophisticated relational schema, content-management system or backend at this stage.

---

# 8. Design Direction

The design should feel:

- clear;
- calm;
- academic without looking institutional;
- approachable to a teenager;
- focused on the current question;
- easy to scan;
- credible enough to continue developing.

Use:

- strong typographic hierarchy;
- generous spacing;
- clear buttons;
- readable mathematical content;
- obvious navigation;
- visible focus states;
- sensible contrast.

Avoid:

- childish visual styling;
- excessive gamification;
- dense dashboards;
- unnecessary gradients and animations;
- too many colours;
- decorative elements that compete with the mathematics.

Do not spend excessive time creating a brand identity. A simple temporary name and visual system are sufficient.

---

# 9. Mathematical Content

For this first version:

- plain text and Unicode are acceptable for simple expressions;
- use a lightweight maths-rendering library only if it can be added cleanly;
- do not make advanced equation editing part of this task;
- ensure long expressions do not break the mobile layout;
- structure components so richer maths rendering can be introduced later.

If KaTeX or another maths renderer is already configured, use it. Otherwise, do not let maths-rendering infrastructure block completion of the basic application.

---

# 10. Local Progress

If it remains simple, use browser local storage to remember:

- the last opened paper;
- the last opened question;
- which questions have been viewed;
- whether an answer or solution was revealed.

This is optional for the first pass. Do not add a backend merely to support progress.

Any local-storage code should:

- avoid errors during server-side rendering;
- tolerate missing or malformed stored values;
- be easy to remove or replace later.

---

# 11. Explicitly Out of Scope

Do not build the following in this initial task:

- user accounts;
- authentication;
- databases;
- subscriptions;
- payments;
- referrals;
- leaderboards;
- school competitions;
- social profiles;
- AI tutoring;
- AI marking;
- handwritten-answer recognition;
- automatic symbolic equivalence checking;
- exam-grade prediction;
- teacher dashboards;
- admin dashboards;
- complete past-paper archives;
- native mobile applications;
- elaborate analytics infrastructure;
- notification systems;
- complex animations;
- a large design system.

These may be considered later. Their absence is intentional.

---

# 12. Engineering Standards

Keep the codebase small and legible.

Requirements:

- use TypeScript where applicable;
- avoid `any` unless genuinely necessary;
- use reusable components where repetition is already visible;
- do not create abstractions for imagined future use cases;
- remove scaffolding and demo content that are not used;
- avoid unnecessary packages;
- ensure navigation does not produce dead ends;
- handle missing paper or question IDs gracefully;
- include basic metadata such as page title and description;
- ensure buttons and links are keyboard accessible;
- keep console output clean;
- run the available lint, type-check and build commands before finishing.

Do not pursue perfect architecture. Produce a clean, modifiable baseline.

---

# 13. Documentation

Create or update the repository `README.md` with:

## Project summary

A concise description of the current application and its provisional objectives.

## Local setup

Exact commands for:

- installing dependencies;
- starting the development server;
- running checks;
- producing a production build.

## Current scope

State exactly what the first version supports.

## Content editing

Explain where sample papers and questions are stored and how to add another one.

## Project status

Clearly say that the application is an experimental early-stage product and that all requirements and technical decisions may change.

## Next-step ideas

Include only a short list, such as:

- add real reviewed paper content;
- improve question formatting;
- add answer input;
- add progressive hints;
- improve progress tracking;
- test the flow with students.

Do not turn the README into a large speculative product document.

---

# 14. Acceptance Criteria

The task is complete when all of the following are true:

- [ ] The app starts locally using the documented command.
- [ ] The home screen loads without errors.
- [ ] A student can enter the paper-selection screen.
- [ ] At least two sample papers are listed.
- [ ] A student can open a paper and view its questions.
- [ ] Answers are hidden initially.
- [ ] Worked solutions are hidden initially.
- [ ] The student can reveal the answer and solution independently.
- [ ] Previous and next navigation works.
- [ ] Invalid paper or question routes fail gracefully.
- [ ] The interface is usable at a common mobile width.
- [ ] The code passes the available lint and type checks.
- [ ] A production build succeeds.
- [ ] The README explains how to run and modify the application.

---

# 15. How to Work on This Task

Proceed autonomously.

1. Inspect the repository.
2. Identify the simplest viable implementation.
3. Implement the application.
4. Run it and correct errors.
5. Run linting, type checking and the production build.
6. Review the core flow at desktop and mobile widths.
7. Update the README.
8. Report what was built, what files were important and what remains intentionally unbuilt.

Do not stop at a plan if the repository permits implementation.

Do not add speculative infrastructure merely because it may be useful later.

When choosing between:

- a more impressive system that is hard to change; and
- a smaller system that works and is easy to change,

choose the smaller system.

---

# 16. Prime Directive

At every stage, use this order of priority:

1. **Help Leaving Certificate students study mathematics and gain exam confidence.**
2. **Create a product that many students genuinely want to use and share.**
3. **Find an appropriate way for the product to make money.**

These priorities are current hypotheses, not immutable rules.

The project should evolve in response to:

- student behaviour;
- direct user feedback;
- observed learning outcomes;
- usage and retention data;
- technical constraints;
- the owner's judgement;
- emerging opportunities.

Build the first version as a foundation for learning, not as a claim that the final product has already been designed.
