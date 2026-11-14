import type { AnswerAttempt, AnswerAttemptState, AnswerCheckOutcome } from "../types";

export const STORAGE_KEY = "lc-maths-progress-v1";
export const MAX_SAVED_ATTEMPTS = 10;

export interface Progress {
  lastPath?: string;
  viewed: string[];
  answers: string[];
  solutions: string[];
  answerAttempts: Record<string, AnswerAttemptState>;
}

export function createEmptyProgress(): Progress {
  return {
    viewed: [],
    answers: [],
    solutions: [],
    answerAttempts: {},
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function isAnswerCheckOutcome(value: unknown): value is AnswerCheckOutcome {
  return value === "correct" || value === "incorrect" || value === "unreadable";
}

function readAnswerAttempts(value: unknown): Record<string, AnswerAttemptState> {
  if (!isRecord(value)) return {};

  const states: Array<[string, AnswerAttemptState]> = [];
  for (const [key, rawState] of Object.entries(value)) {
    if (!isRecord(rawState)) continue;

    const history: AnswerAttempt[] = [];
    if (Array.isArray(rawState.history)) {
      for (const rawAttempt of rawState.history.slice(-MAX_SAVED_ATTEMPTS)) {
        if (
          isRecord(rawAttempt)
          && typeof rawAttempt.answer === "string"
          && isAnswerCheckOutcome(rawAttempt.outcome)
        ) {
          history.push({ answer: rawAttempt.answer, outcome: rawAttempt.outcome });
        }
      }
    }

    states.push([
      key,
      {
        draft: typeof rawState.draft === "string" ? rawState.draft : "",
        outcome: isAnswerCheckOutcome(rawState.outcome) ? rawState.outcome : undefined,
        history,
        totalAttempts:
          typeof rawState.totalAttempts === "number"
          && Number.isInteger(rawState.totalAttempts)
          && rawState.totalAttempts >= history.length
            ? rawState.totalAttempts
            : history.length,
      },
    ]);
  }

  return Object.fromEntries(states);
}

export function parseProgress(raw: string | null): Progress {
  if (!raw) return createEmptyProgress();

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return createEmptyProgress();
    return {
      lastPath: typeof parsed.lastPath === "string" ? parsed.lastPath : undefined,
      viewed: readStringArray(parsed.viewed),
      answers: readStringArray(parsed.answers),
      solutions: readStringArray(parsed.solutions),
      answerAttempts: readAnswerAttempts(parsed.answerAttempts),
    };
  } catch {
    return createEmptyProgress();
  }
}
