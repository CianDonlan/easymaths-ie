"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { papers, parts, topics as catalogueTopics, type Paper, type Part } from "./catalogue";
import { historyByPart, methodScale, summarize, type Attempt } from "./model";
import { improvementSummary, paperEquivalentProgress, topicProgress } from "./progress";
import { DEFAULT_WEEKLY_GOAL_DAYS, DEFAULT_WEEKLY_PART_GOAL, validWeeklyGoalDays, validWeeklyPartGoal, weeklyGoalProgress, weeklyVolumeProgress, type WeeklyGoalDays, type WeeklyPartGoal } from "./goals";
import { deleteDemoAttempt, demoStudentId, readDemoAttempts, readDemoGoalDays, readDemoPartGoal, saveDemoAttempt, saveDemoGoalDays, saveDemoPartGoal } from "./demo-store";
import "./tracker.css";
import "./tracker-flow.css";

type Student = { id: string; displayName: string; username: string };
type Payload = {
  user: { id: string; displayName: string; role: "student" | "tutor" };
  students: Student[]; papers: Paper[]; parts: Part[]; topics: typeof catalogueTopics; attempts: Attempt[]; weeklyGoalDays: WeeklyGoalDays; weeklyPartGoal: WeeklyPartGoal;
  viewedStudentId?: string;
};
type Screen = "home" | "pick" | "entry" | "reward" | "progress" | "students" | "account";
type Draft = { id: string; submissionId: string; methodScore: number; attemptedAt: string; earnedMarks: string; maximumMarks: string; note: string };
type Reward = { partLabel: string; insight: string };

function WeeklyGoalCard({ progress, onChange, busy, compact = false }: {
  progress: ReturnType<typeof weeklyGoalProgress>;
  onChange?: (days: WeeklyGoalDays) => void;
  busy?: boolean;
  compact?: boolean;
}) {
  return <section className={`tracker-week-goal${compact ? " compact" : ""}`} aria-label="Weekly practice goal">
    <div className="tracker-week-heading"><span><small>THIS WEEK</small><strong>{progress.activeDays} of {progress.goalDays} practice days</strong></span><span className="tracker-week-fraction">{progress.activeDays}/{progress.goalDays}</span></div>
    <div className="tracker-week-bar" role="progressbar" aria-label="Weekly practice days" aria-valuenow={Math.min(progress.activeDays, progress.goalDays)} aria-valuemin={0} aria-valuemax={progress.goalDays}><span style={{ width: `${Math.min(100, progress.activeDays / progress.goalDays * 100)}%` }}/></div>
    <p>Any day with a logged attempt counts, whatever your level.</p>
    {onChange && <fieldset className="tracker-goal-choices"><legend>My weekly goal</legend>{([2, 3, 4] as const).map(days => <button type="button" key={days} aria-pressed={progress.goalDays === days} disabled={busy} onClick={() => onChange(days)}>{days} days</button>)}</fieldset>}
  </section>;
}

function WeeklyVolumeCard({ progress, onChange, busy, compact = false }: {
  progress: ReturnType<typeof weeklyVolumeProgress>;
  onChange?: (parts: WeeklyPartGoal) => void;
  busy?: boolean;
  compact?: boolean;
}) {
  return <section className={`tracker-week-goal tracker-volume-goal${compact ? " compact" : ""}`} aria-label="Weekly parts goal">
    <div className="tracker-week-heading"><span><small>THIS WEEK · PARTS PRACTISED</small><strong>{progress.count} of {progress.goalParts} parts</strong></span><span className="tracker-week-fraction">{progress.count}/{progress.goalParts}</span></div>
    <div className="tracker-week-bar" role="progressbar" aria-label="Weekly parts practised" aria-valuenow={Math.min(progress.count, progress.goalParts)} aria-valuemin={0} aria-valuemax={progress.goalParts}><span style={{ width: `${Math.min(100, progress.count / progress.goalParts * 100)}%` }}/></div>
    <p>{progress.newParts} new {progress.newParts === 1 ? "part" : "parts"} · {progress.revisits} {progress.revisits === 1 ? "revisit" : "revisits"}. Every logged attempt counts, whatever your level.</p>
    {progress.goalParts === 20 && <p className="tracker-paper-context">20 parts is roughly half a Leaving Cert Higher Level paper.</p>}
    {onChange && <fieldset className="tracker-goal-choices"><legend>My weekly target</legend>{([12, 20, 30] as const).map(parts => <button type="button" key={parts} aria-pressed={progress.goalParts === parts} disabled={busy} onClick={() => onChange(parts)}>{parts} parts</button>)}</fieldset>}
  </section>;
}

const localDate = (iso: string) => new Date(new Date(iso).getTime() - new Date(iso).getTimezoneOffset() * 60000).toISOString().slice(0, 16);
const showDate = (iso: string) => new Date(iso).toLocaleString("en-IE", { dateStyle: "medium", timeStyle: "short" });
const questionNumber = (part: Part) => Number(part.label.match(/^Q(\d+)/)?.[1] ?? 0);
const subquestion = (part: Part) => part.label.replace(/^Q\d+/, "").replace(/^\(([^)]+)\)/, "$1").replaceAll(")(", ") (") || "Whole question";
const pickerLevelNames = ["", "Copied solution", "With solution", "With notes", "Independent", "Exam pace"];
const newDraft = (attempt?: Attempt): Draft => ({
  id: attempt?.id ?? "", submissionId: crypto.randomUUID(), methodScore: attempt?.methodScore ?? 0,
  attemptedAt: localDate(attempt?.attemptedAt ?? new Date().toISOString()),
  earnedMarks: attempt?.earnedMarks?.toString() ?? "", maximumMarks: attempt?.maximumMarks?.toString() ?? "",
  note: attempt?.note ?? "",
});

export default function Tracker() {
  const [data, setData] = useState<Payload | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [screen, setScreen] = useState<Screen>("home");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [viewedStudentId, setViewedStudentId] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [paperNumber, setPaperNumber] = useState<1 | 2 | "">("");
  const [sitting, setSitting] = useState<"normal" | "deferred">("normal");
  const [question, setQuestion] = useState<number | "">("");
  const [selectedPartId, setSelectedPartId] = useState("");
  const [entryReturn, setEntryReturn] = useState<"pick" | "progress">("pick");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [reward, setReward] = useState<Reward | null>(null);
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetStudentId, setResetStudentId] = useState("");
  const [resetPasswordValue, setResetPasswordValue] = useState("");
  const [resetPasswordConfirm, setResetPasswordConfirm] = useState("");
  const [currentPasswordValue, setCurrentPasswordValue] = useState("");
  const [changedPasswordValue, setChangedPasswordValue] = useState("");
  const [changedPasswordConfirm, setChangedPasswordConfirm] = useState("");

  const load = useCallback(async (student?: string) => {
    try {
      if (new URLSearchParams(window.location.search).get("demo") === "1") {
        setDemoMode(true);
        const local: Payload = { user: { id: demoStudentId, displayName: "Demo student", role: "student" }, students: [], papers, parts, topics: catalogueTopics, attempts: readDemoAttempts(localStorage), weeklyGoalDays: readDemoGoalDays(localStorage), weeklyPartGoal: readDemoPartGoal(localStorage) };
        setData(local);
        setError("");
        return local;
      }
      const url = `/api/tracker${student ? `?student=${encodeURIComponent(student)}` : ""}`;
      const response = await fetch(url, { cache: "no-store" });
      if (response.status === 401) { window.location.assign("/tracker/login"); return null; }
      if (!response.headers.get("content-type")?.includes("application/json")) throw new Error("Tracker service returned an unexpected response.");
      const body = await response.json() as Payload & { error?: string };
      if (!response.ok) throw new Error(body.error || "Unable to load tracker.");
      setData({ ...body, weeklyGoalDays: validWeeklyGoalDays(body.weeklyGoalDays) ? body.weeklyGoalDays : DEFAULT_WEEKLY_GOAL_DAYS, weeklyPartGoal: validWeeklyPartGoal(body.weeklyPartGoal) ? body.weeklyPartGoal : DEFAULT_WEEKLY_PART_GOAL });
      setError("");
      return body;
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to load tracker."); return null; }
  }, []);

  useEffect(() => { const timer = window.setTimeout(() => { void load(); }, 0); return () => window.clearTimeout(timer); }, [load]);

  const years = [...new Set(data?.papers.map(p => p.year) ?? [])].sort((a, b) => b - a);
  const paperChoices = data?.papers.filter(p => p.year === year && p.number === paperNumber) ?? [];
  const selectedPaper = paperChoices.find(p => p.sitting === sitting) ?? (paperChoices.length === 1 ? paperChoices[0] : undefined);
  const paperParts = data?.parts.filter(p => p.paperId === selectedPaper?.id) ?? [];
  const questions = [...new Set(paperParts.map(questionNumber))].filter(n => n > 0).sort((a, b) => a - b);
  const questionParts = paperParts.filter(p => questionNumber(p) === question).sort((a, b) => a.order - b.order);
  const partMap = new Map(data?.parts.map(p => [p.id, p]) ?? []);
  const paperMap = new Map(data?.papers.map(p => [p.id, p]) ?? []);
  const selectedPart = partMap.get(selectedPartId);
  const ownPractice = !viewedStudentId;
  const selectedStudent = data?.students.find(s => s.id === viewedStudentId);
  const resetStudent = data?.students.find(s => s.id === resetStudentId);
  const summary = summarize(data?.attempts ?? [], data?.parts.length ?? 0);
  const partHistory = historyByPart(data?.attempts ?? []);
  const paperPractice = paperEquivalentProgress(data?.attempts ?? []);
  const improvement = improvementSummary(data?.attempts ?? []);
  const topicSummary = topicProgress(data?.attempts ?? [], data?.parts ?? []);
  const topicRows = (data?.topics ?? []).filter(topic => topicSummary.topics.has(topic.id)).map(topic => ({ ...topic, progress: topicSummary.topics.get(topic.id)! }));
  const goalDays = data && validWeeklyGoalDays(data.weeklyGoalDays) ? data.weeklyGoalDays : DEFAULT_WEEKLY_GOAL_DAYS;
  const week = weeklyGoalProgress(data?.attempts ?? [], goalDays);
  const partGoal = data && validWeeklyPartGoal(data.weeklyPartGoal) ? data.weeklyPartGoal : DEFAULT_WEEKLY_PART_GOAL;
  const volume = weeklyVolumeProgress(data?.attempts ?? [], partGoal);
  const recent = [...(data?.attempts ?? [])].sort((a, b) => b.attemptedAt.localeCompare(a.attemptedAt) || b.createdAt.localeCompare(a.createdAt));
  const revisit = summary.latest.filter(a => a.methodScore <= 3).sort((a, b) => a.attemptedAt.localeCompare(b.attemptedAt));
  const nextRevisit = revisit.find(attempt => partMap.has(attempt.partId));
  const grouped = recent.reduce<Record<string, Attempt[]>>((groups, attempt) => {
    (groups[attempt.attemptedAt.slice(0, 10)] ??= []).push(attempt);
    return groups;
  }, {});
  const trend = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).slice(-7).map(([day, rows]) => ({ day, mean: summarize(rows, 0).attemptMean, count: rows.length }));

  function chooseYear(value: number | "") { setYear(value); setPaperNumber(""); setSitting("normal"); setQuestion(""); }
  function choosePaper(value: 1 | 2) { setPaperNumber(value); setSitting("normal"); setQuestion(""); }
  function openEntry(part: Part, attempt?: Attempt, from: "pick" | "progress" = "pick") {
    if (!ownPractice) return;
    const paper = paperMap.get(part.paperId);
    if (paper) { setYear(paper.year); setPaperNumber(paper.number); setSitting(paper.sitting); setQuestion(questionNumber(part)); }
    setSelectedPartId(part.id); setDraft(newDraft(attempt)); setReward(null); setEntryReturn(from); setError(""); setNotice(""); setScreen("entry");
    window.scrollTo(0, 0);
  }
  async function save() {
    if (!draft || !selectedPart || busy) return;
    if (!draft.methodScore) { setError("Choose the level that matches your attempt."); return; }
    if (!draft.attemptedAt || !Number.isFinite(Date.parse(draft.attemptedAt))) { setError("Enter a valid date and time."); return; }
    setBusy(true); setError("");
    try {
      const input = { ...draft, partId: selectedPart.id, attemptedAt: new Date(draft.attemptedAt).toISOString() };
      const beforeAttempts = data?.attempts ?? [];
      const beforeWeek = weeklyGoalProgress(beforeAttempts, goalDays);
      const beforeVolume = weeklyVolumeProgress(beforeAttempts, partGoal);
      const firstTimeOnPart = !beforeAttempts.some(attempt => attempt.partId === selectedPart.id);
      let created = false;
      if (demoMode) {
        created = !draft.id && !readDemoAttempts(localStorage).some(attempt => attempt.id === draft.submissionId);
        saveDemoAttempt(localStorage, input);
      } else {
        const response = await fetch("/api/tracker/attempts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
        const body = await response.json() as { error?: string; created?: boolean };
        if (!response.ok) throw new Error(body.error || "Save failed.");
        created = body.created === true;
      }
      const updated = await load();
      setDraft(null); setSelectedPartId("");
      if (!updated) {
        setError(""); setNotice("Attempt saved. Refresh the page to update your progress."); setScreen("home");
      } else if (draft.id) {
        setNotice("Attempt updated."); setScreen("progress");
      } else if (created) {
        const afterWeek = weeklyGoalProgress(updated.attempts, goalDays);
        const afterVolume = weeklyVolumeProgress(updated.attempts, partGoal);
        const newBest = improvementSummary(updated.attempts).events.find(event => event.id === draft.submissionId);
        const volumeInsight = afterVolume.reached && !beforeVolume.reached
          ? `You reached your ${partGoal}-part goal this week.`
          : afterVolume.count > beforeVolume.count
            ? `That's ${afterVolume.count} of ${partGoal} parts practised this week.`
            : afterWeek.activeDays > beforeWeek.activeDays
              ? `That's practice day ${afterWeek.activeDays} this week.`
              : "Another attempt is in your practice history.";
        const insight = newBest
          ? `New best on this part: Level ${newBest.from} → ${newBest.to}. ${volumeInsight}`
          : `${volumeInsight}${firstTimeOnPart ? " A new part is in your history." : " A revisit is in your history."}`;
        setReward({ partLabel: selectedPart.label, insight }); setScreen("reward");
      } else {
        setNotice("This attempt was already saved."); setScreen("home");
      }
      window.scrollTo(0, 0);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Save failed. Try again."); }
    finally { setBusy(false); }
  }
  async function remove(attempt: Attempt) {
    if (busy || !window.confirm("Delete this attempt?")) return;
    setBusy(true); setError("");
    try {
      if (demoMode) deleteDemoAttempt(localStorage, attempt.id);
      else {
        const response = await fetch(`/api/tracker/attempts?id=${encodeURIComponent(attempt.id)}`, { method: "DELETE" });
        if (!response.ok) throw new Error(((await response.json()) as { error?: string }).error || "Delete failed.");
      }
      await load(); setNotice("Attempt deleted.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Delete failed."); }
    finally { setBusy(false); }
  }
  async function addStudent() {
    if (busy) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/tracker/students", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: newUsername, displayName: newName, password: newPassword }) });
      if (!response.ok) throw new Error(((await response.json()) as { error?: string }).error || "Could not add student.");
      setNewName(""); setNewUsername(""); setNewPassword("");
      await load(); setNotice("Student account created. Share the username and password with them directly.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not add student."); }
    finally { setBusy(false); }
  }
  async function resetStudentPassword() {
    if (busy || !resetStudentId) return;
    if (resetPasswordValue !== resetPasswordConfirm) { setError("New passwords do not match."); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/tracker/students/password", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentId: resetStudentId, newPassword: resetPasswordValue }) });
      if (!response.ok) throw new Error(((await response.json()) as { error?: string }).error || "Could not reset password.");
      setNotice(`Password updated for ${resetStudent?.displayName ?? "student"}. Give them the new password directly.`);
      setResetStudentId(""); setResetPasswordValue(""); setResetPasswordConfirm("");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not reset password."); }
    finally { setBusy(false); }
  }
  async function changePassword() {
    if (busy) return;
    if (changedPasswordValue !== changedPasswordConfirm) { setError("New passwords do not match."); return; }
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/tracker/password", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword: currentPasswordValue, newPassword: changedPasswordValue }) });
      if (!response.ok) throw new Error(((await response.json()) as { error?: string }).error || "Could not change password.");
      setCurrentPasswordValue(""); setChangedPasswordValue(""); setChangedPasswordConfirm("");
      window.location.assign("/tracker/login?passwordChanged=1");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not change password."); setBusy(false); }
  }
  async function changeGoal(days: WeeklyGoalDays) {
    if (!data || !ownPractice || busy || days === goalDays) return;
    setBusy(true); setError("");
    try {
      if (demoMode) saveDemoGoalDays(localStorage, days);
      else {
        const response = await fetch("/api/tracker/goals", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ days }) });
        if (!response.ok) throw new Error(((await response.json()) as { error?: string }).error || "Could not save your goal.");
      }
      setData(current => current ? { ...current, weeklyGoalDays: days } : current);
      setNotice(`Weekly goal set to ${days} practice days.`);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save your goal."); }
    finally { setBusy(false); }
  }
  async function changePartGoal(parts: WeeklyPartGoal) {
    if (!data || !ownPractice || busy || parts === partGoal) return;
    setBusy(true); setError("");
    try {
      if (demoMode) saveDemoPartGoal(localStorage, parts);
      else {
        const response = await fetch("/api/tracker/goals", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ parts }) });
        if (!response.ok) throw new Error(((await response.json()) as { error?: string }).error || "Could not save your goal.");
      }
      setData(current => current ? { ...current, weeklyPartGoal: parts } : current);
      setNotice(`Weekly target set to ${parts} parts.`);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save your goal."); }
    finally { setBusy(false); }
  }
  async function viewStudent(id: string) { if (!await load(id)) return; setViewedStudentId(id); setScreen("progress"); window.scrollTo(0, 0); }
  async function myPractice() { if (!await load()) return; setViewedStudentId(""); setScreen("home"); window.scrollTo(0, 0); }
  async function signOut() { await fetch("/api/tracker/session", { method: "DELETE" }); window.location.assign("/tracker/login"); }
  function screenTo(value: Screen) {
    if (value === "home" && viewedStudentId) { void myPractice(); return; }
    setError(""); setNotice(""); setScreen(value); window.scrollTo(0, 0);
  }

  if (screen === "entry" && selectedPart && draft && data) {
    const paper = paperMap.get(selectedPart.paperId);
    return <main className="tracker-entry-screen">
      <header className="tracker-entry-top"><button type="button" onClick={() => screenTo(entryReturn)} aria-label="Back to questions">← Back</button><span>Record an attempt</span></header>
      <div className="tracker-entry-content">
        <p className="tracker-kicker">{paper?.year} · {paper?.sitting === "deferred" ? "Deferred · " : ""}Paper {paper?.number}</p>
        <h1>{selectedPart.label}</h1>
        <p className="tracker-lead">How did you work through this part?</p>
        {selectedPart.status === "needs-review" && <p className="tracker-note">Question structure is provisional. Check the part against your exam book.</p>}
        <div className="tracker-levels" role="group" aria-label="Help level">
          {methodScale.levels.map(level => <button key={level.value} type="button" className={draft.methodScore === level.value ? "selected" : ""} aria-pressed={draft.methodScore === level.value} onClick={() => setDraft({ ...draft, methodScore: level.value })}>
            <span className="tracker-level-number">{level.value}</span><span><strong>{level.label}</strong><small>{level.detail}</small></span>
          </button>)}
        </div>
        <p className="tracker-muted">Higher levels mean less help. This is separate from exam marks.</p>
        <details className="tracker-details"><summary>Date, marks and note <span>Optional details</span></summary><div className="tracker-details-fields">
          <label>Date and time<input type="datetime-local" value={draft.attemptedAt} onChange={e => setDraft({ ...draft, attemptedAt: e.target.value })}/></label>
          <div className="tracker-field-pair"><label>Marks earned<input type="number" min="0" step="any" inputMode="decimal" value={draft.earnedMarks} onChange={e => setDraft({ ...draft, earnedMarks: e.target.value })}/></label><label>Marks possible<input type="number" min="0.01" step="any" inputMode="decimal" value={draft.maximumMarks} onChange={e => setDraft({ ...draft, maximumMarks: e.target.value })}/></label></div>
          <label>Note<textarea maxLength={500} value={draft.note} onChange={e => setDraft({ ...draft, note: e.target.value })} placeholder="What should you remember next time?"/></label>
        </div></details>
        {error && <p role="alert" className="tracker-error">{error}</p>}
      </div>
      <div className="tracker-entry-actions"><button type="button" className="tracker-primary" disabled={busy || !draft.methodScore} onClick={save}>{busy ? "Saving…" : draft.id ? "Save changes" : "Save attempt"}</button></div>
    </main>;
  }

  if (screen === "reward" && reward && data) {
    return <main className="tracker-reward-screen"><div className="tracker-reward-inner">
      <div className="tracker-reward-mark" aria-hidden="true">✓</div>
      <p className="tracker-kicker">PRACTICE RECORDED</p>
      <h1>You showed up.</h1>
      <p className="tracker-reward-subtitle">{reward.partLabel} is in your practice history. Every honest attempt counts.</p>
      <p className="tracker-reward-insight">{reward.insight}</p>
      <WeeklyVolumeCard progress={volume} compact/>
      <div className="tracker-reward-actions"><button className="tracker-primary" onClick={() => screenTo("pick")}>Log another question</button><button onClick={() => screenTo("progress")}>See progress</button></div>
    </div></main>;
  }

  return <main className="tracker-app">
    <header className="tracker-app-header"><Link href="/" className="tracker-app-brand">EASY MATHS<span>.IE</span></Link><div className="tracker-header-actions">{data?.user.role === "tutor" && screen !== "students" && <button onClick={() => screenTo("students")}>Manage students</button>}{data && !demoMode && <button onClick={signOut}>Sign out</button>}</div></header>
    <div className="tracker-app-wrap">
      {demoMode && <p className="tracker-demo-note" role="status">Browser demo · Attempts stay on this device.</p>}
      {error && <p role="alert" className="tracker-error">{error}{!data && <> <a href="/tracker/login">Sign in</a></>}</p>}
      {notice && <p role="status" className="tracker-success-note">{notice}</p>}
      {!data && !error && <p className="tracker-loading">Loading your tracker…</p>}

      {data && screen === "home" && <section className="tracker-home">
        <p className="tracker-kicker">YOUR STUDY TRACKER</p><h1>What would you like to do?</h1><p className="tracker-welcome">Hi {data.user.displayName.split(" ")[0]}. Pick up where you left off.</p>
        <div className="tracker-home-choices">
          <button className="tracker-home-choice" onClick={() => screenTo("pick")}><span className="choice-icon" aria-hidden="true">✎</span><span><strong>Log attempt</strong><small>Choose a paper and record how it went</small></span><span aria-hidden="true">→</span></button>
          <button className="tracker-home-choice" onClick={() => screenTo("progress")}><span className="choice-icon" aria-hidden="true">↗</span><span><strong>See progress</strong><small>Your practice, levels and next steps</small></span><span aria-hidden="true">→</span></button>
        </div>
        <WeeklyVolumeCard progress={volume} compact/>
        {recent.length > 0 && <p className="tracker-home-foot">{recent.length} {recent.length === 1 ? "attempt" : "attempts"} recorded so far</p>}
        {!demoMode && <button className="tracker-account-link" onClick={() => screenTo("account")}>Change password</button>}
      </section>}

      {data && screen === "account" && !demoMode && <section className="tracker-account">
        <button className="tracker-back" onClick={() => screenTo("home")}>← Home</button>
        <p className="tracker-kicker">YOUR ACCOUNT</p><h1>Change password</h1>
        <p className="tracker-muted">Choose a new password with at least 12 characters. You’ll sign in again after saving it.</p>
        <form className="tracker-account-card" onSubmit={event => { event.preventDefault(); void changePassword(); }}>
          <label>Current password<input type="password" autoComplete="current-password" required value={currentPasswordValue} onChange={event => setCurrentPasswordValue(event.target.value)}/></label>
          <label>New password<input type="password" autoComplete="new-password" required minLength={12} maxLength={128} value={changedPasswordValue} onChange={event => setChangedPasswordValue(event.target.value)}/></label>
          <label>Confirm new password<input type="password" autoComplete="new-password" required minLength={12} maxLength={128} value={changedPasswordConfirm} onChange={event => setChangedPasswordConfirm(event.target.value)}/></label>
          <button className="tracker-primary" disabled={busy || changedPasswordValue.length < 12 || changedPasswordValue !== changedPasswordConfirm}>{busy ? "Saving…" : "Save new password"}</button>
        </form>
      </section>}

      {data && screen === "pick" && <section className="tracker-picker">
        <button className="tracker-back" onClick={() => screenTo("home")}>← Home</button>
        <p className="tracker-kicker">LOG AN ATTEMPT</p><h1>Find your question</h1><p className="tracker-muted">Keep your exam book beside you and choose the part you practised.</p>
        <div className="tracker-pick-step"><span className="step-count">1</span><div><h2>Year and paper</h2><label className="tracker-select-label">Exam year<select value={year} onChange={e => chooseYear(e.target.value ? Number(e.target.value) : "")}><option value="">Choose year</option>{years.map(value => <option key={value} value={value}>{value}</option>)}</select></label>
          {year !== "" && <div className="tracker-paper-buttons" role="group" aria-label="Paper number">{([1, 2] as const).map(value => <button key={value} className={paperNumber === value ? "active" : ""} onClick={() => choosePaper(value)}>Paper {value}</button>)}</div>}
          {paperChoices.length > 1 && <div className="tracker-sitting-buttons" role="group" aria-label="Exam sitting">{paperChoices.map(p => <button key={p.sitting} className={sitting === p.sitting ? "active" : ""} onClick={() => { setSitting(p.sitting); setQuestion(""); }}>{p.sitting === "normal" ? "Main exam" : "Deferred"}</button>)}</div>}
        </div></div>
        {selectedPaper && <div className="tracker-pick-step"><span className="step-count">2</span><div><h2>Question number</h2><div className="tracker-question-grid" role="group" aria-label="Question number">{questions.map(value => <button key={value} className={question === value ? "active" : ""} onClick={() => setQuestion(value)} aria-pressed={question === value}>{value}</button>)}</div></div></div>}
        {selectedPaper && question !== "" && <div className="tracker-pick-step"><span className="step-count">3</span><div><h2>Which part?</h2><div className="tracker-subquestions">{questionParts.map(part => {
          const history = partHistory.get(part.id);
          const level = history?.latest.methodScore;
          return <button key={part.id} className={level ? `tracker-part-level-${level}` : ""} onClick={() => openEntry(part)}>
            <span className="tracker-subquestion-label"><strong>{subquestion(part)}</strong>
              {level ? <><span className="tracker-history-badge">{level === 5 && <span aria-hidden="true">★ </span>}Last: Level {level} · {pickerLevelNames[level]}</span><small>{history.count} {history.count === 1 ? "attempt" : "attempts"} recorded</small></>
                : <small>Not attempted</small>}
            </span><span className="tracker-subquestion-arrow" aria-hidden="true">→</span>
          </button>;
        })}</div>{selectedPaper.year < 2026 && <p className="tracker-muted">These part labels are provisional. Check them against your exam book.</p>}</div></div>}
      </section>}

      {data && screen === "progress" && <section className="tracker-progress">
        <button className="tracker-back" onClick={() => screenTo(viewedStudentId ? "students" : "home")}>← {viewedStudentId ? "Students" : "Home"}</button>
        <p className="tracker-kicker">STUDY PROGRESS</p><h1>{selectedStudent ? `${selectedStudent.displayName}'s progress` : "Your progress"}</h1>
        <WeeklyVolumeCard progress={volume} onChange={ownPractice ? parts => { void changePartGoal(parts); } : undefined} busy={busy}/>
        {summary.attemptCount === 0 ? <div className="tracker-empty"><h2>No attempts yet</h2><p>{selectedStudent ? "This student has not logged any practice yet." : "Log your first question to see your progress here."}</p>{ownPractice && <button className="tracker-primary" onClick={() => screenTo("pick")}>Log an attempt</button>}</div> : <>
          <div className="tracker-progress-highlights">
            <section className="tracker-highlight-card tracker-paper-card"><small>TOTAL PARTS ANSWERED</small><strong>{paperPractice.count}</strong><span>logged attempts, including repeats</span><div className="tracker-paper-estimate"><b>{paperPractice.equivalents.toFixed(2)}</b><span>estimated papers’ worth</span></div><p>A Leaving Cert Higher Level paper is roughly 35 parts. This is practice volume, not a completed paper.</p></section>
            <section className="tracker-highlight-card tracker-highlight-improved"><small>PARTS IMPROVED</small>{improvement.partsImproved > 0 ? <><strong>{improvement.partsImproved}</strong><span>{improvement.partsImprovedThisMonth > 0 ? `${improvement.partsImprovedThisMonth} this month · ${improvement.stepsThisMonth} level ${improvement.stepsThisMonth === 1 ? "step" : "steps"}` : "Each part counts once"}</span><p>Level 1 → 2 counts too.</p></> : <><div className="tracker-highlight-prompt">Try a part again</div><p>Move up from any previous level, even 1 → 2.</p></>}</section>
            <section className="tracker-highlight-card"><small>DONE WITHOUT HELP</small>{improvement.currentIndependent > 0 ? <><strong>{improvement.currentIndependent}</strong><span>parts last logged at Level 4 or 5</span><p>Your latest method on each part, not an exam mark.</p></> : <><div className="tracker-highlight-prompt">Try one without help</div><p>A Level 4 or 5 on your latest try will appear here.</p></>}</section>
          </div>
          {improvement.recentImprovements.length > 0 && <section className="tracker-progress-section tracker-improvement-section"><h2>Level gains</h2><div className="tracker-gain-list">{improvement.recentImprovements.map(event => { const part = partMap.get(event.partId); const paper = part && paperMap.get(part.paperId); return part && <div key={event.id}><strong>{paper?.year} · Paper {paper?.number} · {part.label}</strong><span>Level {event.from} → {event.to}</span></div>; })}</div></section>}
          <section className="tracker-next-step"><div><small>NEXT STEP</small><h2>{nextRevisit ? `Try ${partMap.get(nextRevisit.partId)?.label} again` : "Choose a new part"}</h2><p>{nextRevisit ? `Last logged at Level ${nextRevisit.methodScore}. See if you can move it up one level.` : "Keep building your practice across different parts."}</p></div>{ownPractice && (nextRevisit ? <button className="tracker-primary" onClick={() => openEntry(partMap.get(nextRevisit.partId)!, undefined, "progress")}>Try this part</button> : <button className="tracker-primary" onClick={() => screenTo("pick")}>Find a question</button>)}</section>
          <section className="tracker-progress-section">
            <h2>Topics practised</h2>
            <p className="tracker-muted">For reviewed 2026 parts, the average uses every logged attempt; level counts use the latest attempt on each part. Levels describe help used, not exam marks. Older papers still need their topic tags checked.</p>
            {topicRows.length > 0 ? <div className="tracker-topic-grid">{topicRows.map(topic => <div className="tracker-topic-card" key={topic.id}>
              <small>USUALLY PAPER {topic.paper}</small><h3>{topic.label}</h3>
              <div className="tracker-topic-average"><span>AVERAGE LOGGED LEVEL</span><strong>{topic.progress.averageLevel.toFixed(1)}<em>/5</em></strong><small>from {topic.progress.loggedAttempts} {topic.progress.loggedAttempts === 1 ? "attempt" : "attempts"}</small></div>
              <p><strong>{topic.progress.tried}</strong> {topic.progress.tried === 1 ? "part" : "parts"} tried{topic.progress.independent > 0 ? <> · <strong>{topic.progress.independent}</strong> without help</> : " · Try one without help next"}</p>
              <div className="tracker-topic-levels" aria-label={`Latest levels: ${topic.progress.levels.map((count, index) => `Level ${index + 1}: ${count}`).join(", ")}`}>{topic.progress.levels.map((count, index) => count > 0 && <span className={`tracker-topic-level-${index + 1}`} key={index}>L{index + 1} {count}</span>)}</div>
            </div>)}</div> : <p className="tracker-topic-empty">Your current parts have no reviewed topic tags yet. They still count toward your practice and level gains.</p>}
            {topicSummary.unclassifiedParts > 0 && <p className="tracker-muted">{topicSummary.unclassifiedParts} practised {topicSummary.unclassifiedParts === 1 ? "part is" : "parts are"} waiting for verified topic tags.</p>}
          </section>
          <details className="tracker-progress-extra"><summary>More practice details</summary><div className="tracker-stat-grid"><div><small>Attempts</small><strong>{summary.attemptCount}</strong><span>practice entries</span></div><div><small>Parts practised</small><strong>{summary.uniqueCount}</strong><span>different parts</span></div><div><small>Latest level average</small><strong>{summary.latestMean?.toFixed(1) ?? "—"}<em>/5</em></strong><span>latest attempt per part</span></div>{summary.marks && <div><small>Marks recorded</small><strong>{summary.marks.percent.toFixed(0)}<em>%</em></strong><span>{summary.marks.count} attempts with marks</span></div>}</div><p className="tracker-muted">Levels describe the help used. The average changes with the mix of questions and is not an exam grade.</p>{trend.length > 0 && <section className="tracker-progress-section"><h2>Practice over time</h2><div className="tracker-trend">{trend.map(item => <div key={item.day}><time>{new Date(`${item.day}T12:00:00`).toLocaleDateString("en-IE", { day: "numeric", month: "short" })}</time><span className="tracker-trend-bar"><i style={{ width: `${((item.mean ?? 0) / 5) * 100}%` }}/></span><strong>{item.mean?.toFixed(1)}</strong></div>)}</div><p className="tracker-muted">Average level of attempts recorded each day.</p></section>}</details>
          <details className="tracker-secondary-goal"><summary>Practice days this week</summary><WeeklyGoalCard progress={week} onChange={ownPractice ? days => { void changeGoal(days); } : undefined} busy={busy}/></details>
          {revisit.length > 0 && <section className="tracker-progress-section"><h2>To revisit</h2><p className="tracker-muted">These parts last scored Level 1–3.</p><div className="tracker-progress-list">{revisit.slice(0, 8).map(attempt => { const part = partMap.get(attempt.partId); const paper = part && paperMap.get(part.paperId); return part && <div key={attempt.partId}><span><strong>{paper?.year} · Paper {paper?.number} · {part.label}</strong><small>Level {attempt.methodScore} · {showDate(attempt.attemptedAt)}</small></span>{ownPractice && <button onClick={() => openEntry(part, undefined, "progress")}>Try again</button>}</div>; })}</div></section>}
          <section className="tracker-progress-section"><h2>Recent attempts</h2><div className="tracker-progress-list">{recent.slice(0, 12).map(attempt => { const part = partMap.get(attempt.partId); const paper = part && paperMap.get(part.paperId); return part && <div key={attempt.id}><span><strong>{paper?.year} · Paper {paper?.number} · {part.label}</strong><small>Level {attempt.methodScore} · {showDate(attempt.attemptedAt)}{attempt.earnedMarks !== null && attempt.maximumMarks !== null ? ` · ${attempt.earnedMarks}/${attempt.maximumMarks} marks` : ""}</small>{attempt.note && <small>{attempt.note}</small>}</span>{ownPractice && <span className="tracker-attempt-actions"><button onClick={() => openEntry(part, attempt, "progress")}>Edit</button><button onClick={() => void remove(attempt)}>Delete</button></span>}</div>; })}</div></section>
        </>}
      </section>}

      {data && screen === "students" && data.user.role === "tutor" && <section className="tracker-students"><button className="tracker-back" onClick={() => screenTo("home")}>← Home</button><p className="tracker-kicker">TUTOR AREA</p><h1>Manage students</h1><p className="tracker-muted">Your own practice stays under Log attempt and See progress.</p>
        <div className="tracker-student-card"><h2>Add a student</h2><div className="tracker-student-fields"><label>Student name<input value={newName} maxLength={80} onChange={e => setNewName(e.target.value)} placeholder="Name"/></label><label>Username<input value={newUsername} maxLength={32} onChange={e => setNewUsername(e.target.value)} placeholder="Username"/></label><label>Initial password<input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="At least 12 characters"/></label></div><button className="tracker-primary" disabled={busy || !newName || !newUsername || newPassword.length < 12} onClick={() => void addStudent()}>Add student</button><p className="tracker-muted">Share the username and password directly. Students sign in at /tracker/login and can change their password after signing in.</p></div>
        {data.students.length > 0 && <div className="tracker-student-card"><h2>Your students</h2><div className="tracker-progress-list">{data.students.map(student => <div key={student.id}><span><strong>{student.displayName}</strong><small>@{student.username}</small></span><span className="tracker-student-actions"><button onClick={() => void viewStudent(student.id)}>See progress</button><button onClick={() => { setResetStudentId(student.id); setResetPasswordValue(""); setResetPasswordConfirm(""); setError(""); setNotice(""); }}>Reset password</button></span></div>)}</div>
          {resetStudent && <form className="tracker-reset-form" onSubmit={event => { event.preventDefault(); void resetStudentPassword(); }}><h3>New password for {resetStudent.displayName}</h3><p>They’ll be signed out on other devices. Their practice history stays in place.</p><label>New password<input type="password" autoComplete="new-password" required minLength={12} maxLength={128} value={resetPasswordValue} onChange={event => setResetPasswordValue(event.target.value)}/></label><label>Confirm password<input type="password" autoComplete="new-password" required minLength={12} maxLength={128} value={resetPasswordConfirm} onChange={event => setResetPasswordConfirm(event.target.value)}/></label><div className="tracker-reset-actions"><button type="button" onClick={() => { setResetStudentId(""); setResetPasswordValue(""); setResetPasswordConfirm(""); }}>Cancel</button><button className="tracker-primary" disabled={busy || resetPasswordValue.length < 12 || resetPasswordValue !== resetPasswordConfirm}>{busy ? "Saving…" : "Save password"}</button></div></form>}
        </div>}
      </section>}
    </div>
  </main>;
}
