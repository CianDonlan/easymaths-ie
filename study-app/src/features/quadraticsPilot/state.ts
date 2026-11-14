import { pilotTasks, type HelpSection } from "./content";
import type { AnswerCheckOutcome } from "../../types";

export const PILOT_STORAGE_KEY = "lc-maths-quadratics-pilot-v1";
export interface TaskDraft {
  workings: string; answer: string; helpOpen: boolean; section: HelpSection;
  helpUsed: HelpSection[]; steps: [number, number]; solutionOpen: boolean; solutionSeen: boolean;
  outcome?: AnswerCheckOutcome;
}
export interface PilotAttempt { id: string; taskId: string; level: number; at: string; helpUsed: HelpSection[]; solutionSeen: boolean }
export interface PilotState { version: 1; feedback: string; active: string; drafts: Record<string, TaskDraft>; attempts: PilotAttempt[] }
const sections: HelpSection[] = ["square", "turning", "positive-example", "negative-example", "hint"];
export function emptyDraft(): TaskDraft { return { workings: "", answer: "", helpOpen: false, section: "square", helpUsed: [], steps: [0, 0], solutionOpen: false, solutionSeen: false, outcome: undefined }; }
export function emptyPilot(): PilotState { return { version: 1, feedback: "", active: pilotTasks[0].id, drafts: {}, attempts: [] }; }
export function parsePilot(raw: string | null): PilotState {
  const state = emptyPilot();
  try {
    const data = JSON.parse(raw ?? "null");
    if (!data || data.version !== 1) return state;
    state.feedback = typeof data.feedback === "string" ? data.feedback.slice(0, 15000) : "";
    if (pilotTasks.some((t) => t.id === data.active)) state.active = data.active;
    for (const task of pilotTasks) {
      const d = data.drafts?.[task.id];
      if (!d || typeof d !== "object") continue;
      state.drafts[task.id] = { ...emptyDraft(),
        workings: typeof d.workings === "string" ? d.workings.slice(0, 15000) : "",
        answer: typeof d.answer === "string" ? d.answer.slice(0, 1000) : "",
        helpOpen: d.helpOpen === true, section: sections.includes(d.section) ? d.section : "square",
        helpUsed: Array.isArray(d.helpUsed) ? sections.filter((s) => d.helpUsed.includes(s)) : [],
        steps: [0, 1].map((i) => Number.isInteger(d.steps?.[i]) ? Math.min(4, Math.max(0, d.steps[i])) : 0) as [number, number],
        solutionOpen: d.solutionOpen === true, solutionSeen: d.solutionSeen === true || d.solutionOpen === true,
        outcome: ["correct", "incorrect", "unreadable"].includes(d.outcome) ? d.outcome : undefined,
      };
    }
    if (Array.isArray(data.attempts)) state.attempts = data.attempts.filter((a: PilotAttempt) => a && typeof a.id === "string" && pilotTasks.some((t) => t.id === a.taskId) && Number.isInteger(a.level) && a.level >= 1 && a.level <= 5 && typeof a.at === "string" && Number.isFinite(Date.parse(a.at)))
      .map((a: PilotAttempt) => ({ id: a.id, taskId: a.taskId, level: a.level, at: a.at, helpUsed: Array.isArray(a.helpUsed) ? sections.filter((s) => a.helpUsed.includes(s)) : [], solutionSeen: a.solutionSeen === true }));
  } catch { /* A damaged pilot save starts fresh; other app storage is untouched. */ }
  return state;
}

export function restartTask(state: PilotState, taskId: string): PilotState {
  if (!pilotTasks.some((t) => t.id === taskId)) return state;
  return { ...state, drafts: { ...state.drafts, [taskId]: emptyDraft() } };
}
export function recordAttempt(state: PilotState, taskId: string, level: number, at: string, id: string): PilotState {
  if (!pilotTasks.some((t) => t.id === taskId) || !Number.isInteger(level) || level < 1 || level > 5 || !Number.isFinite(Date.parse(at))) return state;
  const draft = state.drafts[taskId] ?? emptyDraft();
  return { ...state, attempts: [...state.attempts, { id, taskId, level, at, helpUsed: [...draft.helpUsed], solutionSeen: draft.solutionSeen }] };
}
