CREATE TABLE `api_key` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`key_hash` text NOT NULL,
	`hint` text NOT NULL,
	`last_used_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `api_key_key_hash_unique` ON `api_key` (`key_hash`);--> statement-breakpoint
CREATE INDEX `api_key_user_id_idx` ON `api_key` (`user_id`);--> statement-breakpoint
CREATE INDEX `api_key_key_hash_idx` ON `api_key` (`key_hash`);