import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// The existing tracker uses a small, fixed set of D1 statements. This bridge
// maps those statements to documents while the separate local D1 preview stays
// usable. No arbitrary SQL or client-provided query text is accepted.
let connection: Firestore | undefined;
function db(): Firestore {
  if (connection) return connection;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId) throw new Error("FIREBASE_PROJECT_ID is not configured.");
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccount && !process.env.FIRESTORE_EMULATOR_HOST) throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is not configured.");
  const app = getApps()[0] ?? initializeApp({
    projectId,
    credential: serviceAccount ? cert(JSON.parse(serviceAccount)) : applicationDefault(),
  });
  return (connection = getFirestore(app));
}

type Row = Record<string, unknown>;
type Result = { results: Row[]; meta: { changes: number } };
const result = (rows: Row[] = [], changes = 0): Result => ({ results: rows, meta: { changes } });
const collection = (name: string) => db().collection(`tracker_${name}`);
const document = (name: string, id: unknown) => collection(name).doc(String(id));
const data = (snapshot: { exists: boolean; data(): Row | undefined }) => snapshot.exists ? snapshot.data() ?? null : null;
const byId = async (name: string, id: unknown) => data(await document(name, id).get());
const byField = async (name: string, field: string, value: unknown) => (await collection(name).where(field, "==", value).get()).docs.map(doc => doc.data());

class Statement {
  readonly sql: string;
  readonly params: unknown[];
  constructor(sql: string, params: unknown[] = []) { this.sql = sql; this.params = params; }
  bind(...params: unknown[]) { return new Statement(this.sql, params); }
  async first<T>(): Promise<T | null> { return (await this.execute()).results[0] as T ?? null; }
  async all<T>(): Promise<{ results: T[] }> { return { results: (await this.execute()).results as T[] }; }
  async run() { return { meta: (await this.execute()).meta }; }

  async execute(): Promise<Result> {
    const s = this.sql, p = this.params;
    if (s.startsWith("SELECT 1 FROM tracker_users WHERE role='tutor'")) return result((await byId("meta", "tutor")) ? [{ "1": 1 }] : []);
    if (s.startsWith("SELECT u.id,u.username,u.display_name,u.role FROM tracker_sessions")) {
      const session = await byId("sessions", p[0]);
      const user = session && String(session.expires_at) > String(p[1]) ? await byId("users", session.user_id) : null;
      return result(user ? [user] : []);
    }
    if (s.startsWith("SELECT 1 FROM tracker_assignments")) return result((await byId("assignments", `${p[0]}_${p[1]}`)) ? [{ "1": 1 }] : []);
    if (s.startsWith("SELECT * FROM tracker_attempts")) {
      const rows = await byField("attempts", "student_id", p[0]);
      rows.sort((a, b) => String(b.attempted_at).localeCompare(String(a.attempted_at)) || String(b.created_at).localeCompare(String(a.created_at)));
      return result(rows);
    }
    if (s.startsWith("SELECT failures,blocked_until FROM tracker_login_throttle")) { const row = await byId("throttle", p[0]); return result(row ? [row] : []); }
    if (s.startsWith("SELECT id,password_hash FROM tracker_users WHERE username")) {
      const index = await byId("usernames", p[0]);
      const user = index ? await byId("users", index.id) : null;
      return result(user ? [user] : []);
    }
    if (s.startsWith("SELECT password_hash FROM tracker_users WHERE id")) { const row = await byId("users", p[0]); return result(row ? [row] : []); }
    if (s.startsWith("SELECT weekly_goal_days, weekly_part_goal FROM tracker_users")) { const row = await byId("users", p[0]); return result(row ? [row] : []); }
    if (s.startsWith("SELECT u.id, u.display_name")) {
      const assignments = await byField("assignments", "tutor_id", p[0]);
      const users = (await Promise.all(assignments.map(item => byId("users", item.student_id)))).filter((row): row is Row => !!row);
      return result(users.map(user => ({ id: user.id, displayName: user.display_name, username: user.username })).sort((a, b) => String(a.displayName).localeCompare(String(b.displayName))));
    }
    if (s.startsWith("SELECT student_id FROM tracker_attempts")) { const row = await byId("attempts", p[0]); return result(row ? [row] : []); }
    if (s.startsWith("INSERT INTO tracker_users") && s.includes("WHERE NOT EXISTS")) {
      const [id, username, display_name, password_hash, created_at, updated_at] = p;
      const created = await db().runTransaction(async tx => {
        const tutor = document("meta", "tutor"), name = document("usernames", username);
        const [existingTutor, existingName] = await Promise.all([tx.get(tutor), tx.get(name)]);
        if (existingTutor.exists) return false;
        if (existingName.exists) throw new Error("Username already exists.");
        tx.create(tutor, { id });
        tx.create(name, { id });
        tx.create(document("users", id), { id, username, display_name, role: "tutor", password_hash, created_at, updated_at, weekly_goal_days: 3, weekly_part_goal: 20 });
        return true;
      });
      return result([], created ? 1 : 0);
    }
    if (s.startsWith("INSERT INTO tracker_sessions")) {
      const [token_hash, user_id, expires_at, created_at] = p;
      await document("sessions", token_hash).create({ token_hash, user_id, expires_at, created_at });
      return result([], 1);
    }
    if (s.startsWith("INSERT INTO tracker_login_throttle")) {
      const [key, failures, blocked_until, updated_at] = p;
      await document("throttle", key).set({ key, failures, blocked_until, updated_at });
      return result([], 1);
    }
    if (s.startsWith("DELETE FROM tracker_login_throttle")) { await document("throttle", p[0]).delete(); return result([], 1); }
    if (s.startsWith("DELETE FROM tracker_sessions WHERE token_hash")) { await document("sessions", p[0]).delete(); return result([], 1); }
    if (s.startsWith("UPDATE tracker_attempts")) {
      const [part_id, attempted_at, method_score, scale_version, earned_marks, maximum_marks, note, updated_at, id, student_id] = p;
      const changed = await db().runTransaction(async tx => {
        const ref = document("attempts", id), old = await tx.get(ref);
        if (!old.exists || old.data()?.student_id !== student_id) return false;
        tx.update(ref, { part_id, attempted_at, method_score, scale_version, earned_marks, maximum_marks, note, updated_at });
        return true;
      });
      return result([], changed ? 1 : 0);
    }
    if (s.startsWith("INSERT OR IGNORE INTO tracker_attempts")) {
      const [id, student_id, part_id, attempted_at, method_score, scale_version, earned_marks, maximum_marks, note, created_at, updated_at] = p;
      const changed = await db().runTransaction(async tx => {
        const ref = document("attempts", id), old = await tx.get(ref);
        if (old.exists) return false;
        tx.create(ref, { id, student_id, part_id, attempted_at, method_score, scale_version, earned_marks, maximum_marks, note, created_at, updated_at });
        return true;
      });
      return result([], changed ? 1 : 0);
    }
    if (s.startsWith("DELETE FROM tracker_attempts")) {
      const changed = await db().runTransaction(async tx => {
        const ref = document("attempts", p[0]), old = await tx.get(ref);
        if (!old.exists || old.data()?.student_id !== p[1]) return false;
        tx.delete(ref); return true;
      });
      return result([], changed ? 1 : 0);
    }
    if (s.startsWith("UPDATE tracker_users SET weekly_goal_days") || s.startsWith("UPDATE tracker_users SET weekly_part_goal")) {
      const field = s.includes("weekly_goal_days") ? "weekly_goal_days" : "weekly_part_goal";
      await document("users", p[2]).update({ [field]: p[0], updated_at: p[1] });
      return result([], 1);
    }
    throw new Error(`Unsupported tracker storage operation: ${s}`);
  }
}

export const firestoreDatabase = {
  prepare(sql: string) { return new Statement(sql); },
  async batch(statements: Statement[]) {
    const [first, second] = statements;
    if (!first || !second || statements.length !== 2) throw new Error("Unsupported tracker batch.");
    if (first.sql.startsWith("INSERT INTO tracker_users") && second.sql.startsWith("INSERT INTO tracker_assignments")) {
      const [id, username, display_name, password_hash, created_at, updated_at] = first.params;
      const [tutor_id, student_id, assigned_at] = second.params;
      await db().runTransaction(async tx => {
        const name = document("usernames", username);
        if ((await tx.get(name)).exists) throw new Error("Username already exists.");
        tx.create(name, { id });
        tx.create(document("users", id), { id, username, display_name, role: "student", password_hash, created_at, updated_at, weekly_goal_days: 3, weekly_part_goal: 20 });
        tx.create(document("assignments", `${tutor_id}_${student_id}`), { tutor_id, student_id, created_at: assigned_at });
      });
      return [result([], 1), result([], 1)];
    }
    if (first.sql.startsWith("UPDATE tracker_users SET password_hash") && second.sql.startsWith("DELETE FROM tracker_sessions WHERE user_id")) {
      const [password_hash, updated_at, id] = first.params;
      const sessions = await byField("sessions", "user_id", second.params[0]);
      const changed = await db().runTransaction(async tx => {
        const user = document("users", id), old = await tx.get(user);
        if (!old.exists || (first.sql.includes("role='student'") && old.data()?.role !== "student")) return false;
        tx.update(user, { password_hash, updated_at });
        for (const session of sessions) tx.delete(document("sessions", session.token_hash));
        return true;
      });
      return [result([], changed ? 1 : 0), result([], sessions.length)];
    }
    throw new Error("Unsupported tracker batch.");
  },
};

export const env = { DB: firestoreDatabase as unknown as D1Database };
