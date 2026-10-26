import edcoCandidates from "../../content/edco-2018-2025-candidates.json" with { type: "json" };
import edcoTopicReview from "../../content/edco-2018-2025-topic-review.json" with { type: "json" };

export type Paper = { id: string; year: number; sitting: "normal" | "deferred"; level: "HL"; number: 1 | 2; source: string; bookMatch: "unverified" | "contents-confirmed" };
export type Part = { id: string; paperId: string; label: string; order: number; topicIds: string[]; maximumMarks: number | null; status: "structure-reviewed" | "needs-review"; source: string; sourcePage?: number };

export const topics = [
  { id: "p1-number", label: "Number systems, indices, arithmetic, financial maths", paper: 1 },
  { id: "p1-algebra", label: "Algebra", paper: 1 },
  { id: "p1-sequences", label: "Sequences and series", paper: 1 },
  { id: "p1-complex", label: "Complex numbers", paper: 1 },
  { id: "p1-calculus", label: "Functions and calculus", paper: 1 },
  { id: "p1-graphs", label: "Functions and graphs", paper: 1 },
  { id: "p2-statistics", label: "Statistics", paper: 2 },
  { id: "p2-probability", label: "Probability", paper: 2 },
  { id: "p2-geometry", label: "Geometry, area and volume", paper: 2 },
  { id: "p2-line", label: "Line", paper: 2 },
  { id: "p2-circle", label: "Circle and centres", paper: 2 },
  { id: "p2-trigonometry", label: "Trigonometry, sectors, period and range", paper: 2 },
] as const;

const sourceRoot = "study_app/lc-maths-study-app/data/papers/";
// All 22 book papers have PDF text and part lists checked against workbook topics.
// Their part IDs and topic tags can be used in progress summaries; leaf marks remain unknown.
const reviewedEdcoIds = new Set([
  "lc-hl-2018-normal-p1", "lc-hl-2018-normal-p2",
  "lc-hl-2019-normal-p1", "lc-hl-2019-normal-p2",
  "lc-hl-2020-normal-p1", "lc-hl-2020-normal-p2",
  "lc-hl-2021-normal-p1", "lc-hl-2021-normal-p2",
  "lc-hl-2022-normal-p1", "lc-hl-2022-normal-p2", "lc-hl-2022-deferred-p1", "lc-hl-2022-deferred-p2",
  "lc-hl-2023-normal-p1", "lc-hl-2023-normal-p2", "lc-hl-2023-deferred-p1", "lc-hl-2023-deferred-p2",
  "lc-hl-2024-normal-p1", "lc-hl-2024-normal-p2", "lc-hl-2024-deferred-p1", "lc-hl-2024-deferred-p2",
  "lc-hl-2025-normal-p1", "lc-hl-2025-normal-p2",
]);
const candidateTopics = new Map(edcoTopicReview.papers.map(paper => [paper.paperId, paper]));
const candidatePartTopics = new Map(edcoTopicReview.papers.flatMap(paper =>
  Object.entries(paper.candidateTopicIdsByPart).map(([code, ids]) => [`${paper.paperId}-${code}`, ids] as const)
));
for (const paper of edcoCandidates.papers.filter(item => reviewedEdcoIds.has(item.paperId))) {
  const review = candidateTopics.get(paper.paperId);
  if (!review || review.unmappedParts.length || Object.keys(review.unresolvedOverlappingTopicHints).length || review.unresolvedReferenceIssues.length
      || Object.keys(review.candidateTopicIdsByPart).length !== paper.parts.length) {
    throw new Error(`Reviewed topic mapping is incomplete for ${paper.paperId}.`);
  }
}
const reviewedPapers: Paper[] = [1, 2].map(number => ({
  id: `lc-hl-2026-normal-p${number}`, year: 2026, sitting: "normal" as const,
  level: "HL" as const, number: number as 1 | 2,
  source: `${sourceRoot}2026_normal_lc_maths_hl_english_paper_${number}.pdf`,
  bookMatch: "unverified" as const,
}));

const edcoPapers: Paper[] = edcoCandidates.papers.map(item => ({
  id: item.paperId, year: item.year, sitting: item.sitting as "normal" | "deferred",
  level: "HL", number: item.paperNumber as 1 | 2, source: item.source, bookMatch: item.bookMatch as "contents-confirmed",
}));
export const papers: Paper[] = [...reviewedPapers, ...edcoPapers].sort((a, b) =>
  b.year - a.year || a.number - b.number || Number(a.sitting === "deferred") - Number(b.sitting === "deferred")
);

// Reviewed against the 2026 normal SEC paper headings and nested prompts. A leaf alone is trackable.
// Mark allocations per leaf are unavailable; the whole-question totals must not be assigned to leaves.
const outlines: Record<number, [string, string[]][]> = {
  1: [
    ["p1-algebra", ["1a", "1b", "1c"]],
    ["p1-number", ["2a", "2bi", "2bii"]],
    ["p1-calculus", ["3a", "3bi", "3bii"]],
    ["p1-complex", ["4a", "4b", "4c"]],
    ["p1-number", ["5a", "5bi", "5bii", "5c"]],
    ["p1-sequences", ["6a", "6b", "6c"]],
    ["p1-calculus", ["7a", "7b", "7c", "7d", "7e", "7f"]],
    ["p1-calculus", ["8a", "8b", "8c", "8d", "8ei", "8eii", "8f"]],
    ["p1-sequences", ["9a", "9b", "9c", "9d", "9e", "9f", "9g"]],
    ["p1-graphs", ["10ai", "10aii", "10bi", "10bii", "10c", "10d", "10e", "10fi", "10fii"]],
  ],
  2: [
    ["p2-statistics", ["1a", "1b", "1c"]],
    ["p2-statistics", ["2a", "2bi", "2bii", "2c"]],
    ["p2-geometry", ["3a", "3b", "3c"]],
    ["p2-line", ["4a", "4b", "4c"]],
    ["p2-circle", ["5a", "5bi", "5bii", "5biii", "5biv"]],
    ["p2-trigonometry", ["6a", "6b", "6c"]],
    ["p2-trigonometry", ["7ai", "7aii", "7b", "7ci", "7cii", "7d"]],
    ["p2-statistics", ["8a", "8bi", "8bii", "8biii", "8biv", "8c", "8di", "8dii"]],
    ["p2-geometry", ["9a", "9bi", "9bii", "9c", "9d"]],
    ["p2-probability", ["10ai", "10aii", "10bi", "10bii", "10biii", "10ci", "10cii"]],
  ],
};

function label(code: string) {
  const [, q, letter, roman] = code.match(/^(\d+)([a-z])((?:iii|ii|iv|i)?)$/) ?? [];
  return `Q${q}(${letter})${roman ? `(${roman})` : ""}`;
}

const reviewedParts: Part[] = reviewedPapers.flatMap(paper => outlines[paper.number].flatMap(([topic, groups], questionIndex) => groups.map((code, subIndex) => ({
  id: `${paper.id}-${code}`, paperId: paper.id, label: label(code),
  order: questionIndex * 100 + subIndex,
  topicIds: paper.number === 2 && code.startsWith("10a") ? ["p2-statistics"]
    : paper.number === 2 && code.startsWith("8d") ? ["p2-statistics", "p2-trigonometry"]
    : paper.number === 2 && code.startsWith("5b") ? ["p2-circle", "p2-probability"]
    : [topic],
  maximumMarks: null,
  status: "structure-reviewed" as const, source: paper.source,
}))));

const edcoParts: Part[] = edcoCandidates.papers.flatMap(item => item.parts.map(part => ({
  id: `${item.paperId}-${part.code}`, paperId: item.paperId, label: part.label,
  order: part.order,
  topicIds: reviewedEdcoIds.has(item.paperId)
    ? candidatePartTopics.get(`${item.paperId}-${part.code}`) ?? []
    : [],
  maximumMarks: null, status: reviewedEdcoIds.has(item.paperId) ? "structure-reviewed" as const : "needs-review" as const,
  source: item.source, sourcePage: part.sourcePage,
})));

export const parts: Part[] = [...reviewedParts, ...edcoParts];

export const partById = new Map(parts.map(part => [part.id, part]));
