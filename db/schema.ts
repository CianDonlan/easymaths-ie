import { check, index, integer, primaryKey, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const trackerUsers = sqliteTable("tracker_users", {
  id: text("id").primaryKey(), username: text("username").notNull(),
  displayName: text("display_name").notNull(), role: text("role", { enum: ["student", "tutor"] }).notNull(),
  passwordHash: text("password_hash").notNull(), weeklyGoalDays: integer("weekly_goal_days").notNull().default(3),
  weeklyPartGoal: integer("weekly_part_goal").notNull().default(20),
  createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(),
}, table => [uniqueIndex("tracker_users_username").on(table.username)]);

export const trackerAssignments = sqliteTable("tracker_assignments", {
  tutorId: text("tutor_id").notNull().references(() => trackerUsers.id),
  studentId: text("student_id").notNull().references(() => trackerUsers.id),
  createdAt: text("created_at").notNull(),
}, table => [primaryKey({ columns: [table.tutorId, table.studentId] })]);

export const trackerSessions = sqliteTable("tracker_sessions", {
  tokenHash: text("token_hash").primaryKey(), userId: text("user_id").notNull().references(() => trackerUsers.id),
  expiresAt: text("expires_at").notNull(), createdAt: text("created_at").notNull(),
}, table => [index("tracker_sessions_user").on(table.userId)]);

export const trackerLoginThrottle = sqliteTable("tracker_login_throttle", {
  key: text("key").primaryKey(), failures: integer("failures").notNull(),
  blockedUntil: text("blocked_until"), updatedAt: text("updated_at").notNull(),
});

export const trackerAttempts = sqliteTable("tracker_attempts", {
  id: text("id").primaryKey(), studentId: text("student_id").notNull().references(() => trackerUsers.id),
  partId: text("part_id").notNull(), attemptedAt: text("attempted_at").notNull(),
  methodScore: integer("method_score").notNull(), scaleVersion: text("scale_version").notNull(),
  earnedMarks: real("earned_marks"), maximumMarks: real("maximum_marks"), note: text("note"),
  createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(),
}, table => [
  index("tracker_attempts_student_time").on(table.studentId, table.attemptedAt),
  index("tracker_attempts_part").on(table.partId),
  check("tracker_attempts_score", sql`${table.methodScore} BETWEEN 1 AND 5`),
  check("tracker_attempts_marks", sql`(${table.earnedMarks} IS NULL OR ${table.earnedMarks} >= 0) AND (${table.maximumMarks} IS NULL OR ${table.maximumMarks} > 0) AND (${table.earnedMarks} IS NULL OR ${table.maximumMarks} IS NULL OR ${table.earnedMarks} <= ${table.maximumMarks})`),
]);
