CREATE TABLE `tracker_assignments` (
	`tutor_id` text NOT NULL,
	`student_id` text NOT NULL,
	`created_at` text NOT NULL,
	PRIMARY KEY(`tutor_id`, `student_id`),
	FOREIGN KEY (`tutor_id`) REFERENCES `tracker_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`student_id`) REFERENCES `tracker_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tracker_attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`part_id` text NOT NULL,
	`attempted_at` text NOT NULL,
	`method_score` integer NOT NULL,
	`scale_version` text NOT NULL,
	`earned_marks` real,
	`maximum_marks` real,
	`note` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`student_id`) REFERENCES `tracker_users`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "tracker_attempts_score" CHECK("tracker_attempts"."method_score" BETWEEN 1 AND 5),
	CONSTRAINT "tracker_attempts_marks" CHECK(("tracker_attempts"."earned_marks" IS NULL OR "tracker_attempts"."earned_marks" >= 0) AND ("tracker_attempts"."maximum_marks" IS NULL OR "tracker_attempts"."maximum_marks" > 0) AND ("tracker_attempts"."earned_marks" IS NULL OR "tracker_attempts"."maximum_marks" IS NULL OR "tracker_attempts"."earned_marks" <= "tracker_attempts"."maximum_marks"))
);
--> statement-breakpoint
CREATE INDEX `tracker_attempts_student_time` ON `tracker_attempts` (`student_id`,`attempted_at`);--> statement-breakpoint
CREATE INDEX `tracker_attempts_part` ON `tracker_attempts` (`part_id`);--> statement-breakpoint
CREATE TABLE `tracker_login_throttle` (
	`key` text PRIMARY KEY NOT NULL,
	`failures` integer NOT NULL,
	`blocked_until` text,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tracker_sessions` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `tracker_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `tracker_sessions_user` ON `tracker_sessions` (`user_id`);--> statement-breakpoint
CREATE TABLE `tracker_users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`display_name` text NOT NULL,
	`role` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tracker_users_username` ON `tracker_users` (`username`);