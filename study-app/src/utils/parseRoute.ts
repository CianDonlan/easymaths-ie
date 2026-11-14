import { findRealPaper } from "../data/realCatalogue";

export type Route =
  | { screen: "home" }
  | { screen: "quadratics-pilot" }
  | { screen: "papers" }
  | { screen: "book"; paperId: string; partId?: string }
  | { screen: "question"; paperId: string; questionId: string }
  | { screen: "not-found" };

export function parseRoutePath(path: string): Route {
  if (path === "/pilot/quadratics" || path === "/pilot/quadratics/") return { screen: "quadratics-pilot" };
  if (path === "/") return { screen: "home" };
  if (path === "/papers" || path === "/papers/") return { screen: "papers" };

  const bookMatch = path.match(/^\/book\/([^/]+)(?:\/parts\/([^/]+))?\/?$/);
  if (bookMatch) {
    const paper = findRealPaper(bookMatch[1]);
    if (!paper) return { screen: "not-found" };
    const partId = bookMatch[2];
    return partId && paper.questions.some((question) => question.id === partId)
      ? { screen: "question", paperId: paper.id, questionId: partId }
      : { screen: "book", paperId: paper.id, partId };
  }

  const questionMatch = path.match(/^\/papers\/([^/]+)\/questions\/([^/]+)\/?$/);
  if (questionMatch) return { screen: "question", paperId: questionMatch[1], questionId: questionMatch[2] };

  return { screen: "not-found" };
}
