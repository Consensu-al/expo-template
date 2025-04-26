CREATE TABLE `app_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP),
	`level` text NOT NULL,
	`message` text NOT NULL,
	`metadata` text
);
