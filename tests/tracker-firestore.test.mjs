import assert from "node:assert/strict";
import { test } from "node:test";
import { firestoreDatabase as store } from "../app/tracker/firestore-db.ts";

test("Firestore stores tutor, student, sessions and attempts with ownership checks", async () => {
  const name = `tutor-${crypto.randomUUID()}`;
  const tutor = crypto.randomUUID(), student = crypto.randomUUID();
  const now = new Date().toISOString();
  const tutorInsert = "INSERT INTO tracker_users(id,username,display_name,role,password_hash,created_at,updated_at) SELECT ?,?,?,'tutor',?,?,? WHERE NOT EXISTS (SELECT 1 FROM tracker_users WHERE role='tutor')";
  assert.equal((await store.prepare(tutorInsert).bind(tutor, name, "Tutor", "hash", now, now).run()).meta.changes, 1);
  assert.equal((await store.prepare(tutorInsert).bind(crypto.randomUUID(), `${name}-2`, "Other", "hash", now, now).run()).meta.changes, 0);
  assert.equal((await store.prepare("SELECT 1 FROM tracker_users WHERE role='tutor' LIMIT 1").first()) !== null, true);

  const studentName = `student-${crypto.randomUUID()}`;
  const addStudent = store.prepare("INSERT INTO tracker_users(id,username,display_name,role,password_hash,created_at,updated_at) VALUES(?,?,?,'student',?,?,?)").bind(student, studentName, "Student", "student-hash", now, now);
  const assign = store.prepare("INSERT INTO tracker_assignments(tutor_id,student_id,created_at) VALUES(?,?,?)").bind(tutor, student, now);
  await store.batch([addStudent, assign]);
  await assert.rejects(store.batch([addStudent, assign]), /Username already exists/);
  const lookedUp = await store.prepare("SELECT id,password_hash FROM tracker_users WHERE username=?").bind(studentName).first();
  assert.equal(lookedUp.id, student);
  assert.equal((await store.prepare("SELECT 1 FROM tracker_assignments WHERE tutor_id=? AND student_id=?").bind(tutor, student).first()) !== null, true);
  assert.equal((await store.prepare('SELECT u.id, u.display_name AS "displayName", u.username FROM tracker_assignments a JOIN tracker_users u ON u.id=a.student_id WHERE a.tutor_id=? ORDER BY u.display_name').bind(tutor).all()).results[0].displayName, "Student");

  const token = crypto.randomUUID();
  await store.prepare("INSERT INTO tracker_sessions(token_hash,user_id,expires_at,created_at) VALUES(?,?,?,?)").bind(token, student, new Date(Date.now() + 60_000).toISOString(), now).run();
  assert.equal((await store.prepare("SELECT u.id,u.username,u.display_name,u.role FROM tracker_sessions s JOIN tracker_users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?").bind(token, now).first()).id, student);

  const attempt = crypto.randomUUID();
  const insertAttempt = store.prepare("INSERT OR IGNORE INTO tracker_attempts(id,student_id,part_id,attempted_at,method_score,scale_version,earned_marks,maximum_marks,note,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").bind(attempt, student, "part-a", now, 2, "1", null, null, null, now, now);
  assert.equal((await insertAttempt.run()).meta.changes, 1);
  assert.equal((await insertAttempt.run()).meta.changes, 0);
  assert.equal((await store.prepare("SELECT * FROM tracker_attempts WHERE student_id=? ORDER BY attempted_at DESC, created_at DESC").bind(student).all()).results.length, 1);
  assert.equal((await store.prepare("UPDATE tracker_attempts SET part_id=?,attempted_at=?,method_score=?,scale_version=?,earned_marks=?,maximum_marks=?,note=?,updated_at=? WHERE id=? AND student_id=?").bind("part-a", now, 3, "1", null, null, null, now, attempt, tutor).run()).meta.changes, 0);
  assert.equal((await store.prepare("DELETE FROM tracker_attempts WHERE id=? AND student_id=?").bind(attempt, tutor).run()).meta.changes, 0);

  await store.batch([
    store.prepare("UPDATE tracker_users SET password_hash=?,updated_at=? WHERE id=? AND role='student'").bind("new-hash", now, student),
    store.prepare("DELETE FROM tracker_sessions WHERE user_id=?").bind(student),
  ]);
  assert.equal((await store.prepare("SELECT password_hash FROM tracker_users WHERE id=?").bind(student).first()).password_hash, "new-hash");
  assert.equal(await store.prepare("SELECT u.id,u.username,u.display_name,u.role FROM tracker_sessions s JOIN tracker_users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?").bind(token, now).first(), null);
});
