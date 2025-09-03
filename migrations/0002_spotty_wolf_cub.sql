PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_board` (
	`id` text PRIMARY KEY NOT NULL,
	`app_id` text NOT NULL,
	`name` text NOT NULL,
	`column` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `app`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_board`("id", "app_id", "name", "column", "created_at") SELECT "id", "app_id", "name", "column", "created_at" FROM `board`;--> statement-breakpoint
DROP TABLE `board`;--> statement-breakpoint
ALTER TABLE `__new_board` RENAME TO `board`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `board_app_id_idx` ON `board` (`app_id`);--> statement-breakpoint
CREATE TABLE `__new_comment` (
	`id` text PRIMARY KEY NOT NULL,
	`feature_id` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`feature_id`) REFERENCES `feature`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_comment`("id", "feature_id", "name", "email", "content", "created_at") SELECT "id", "feature_id", "name", "email", "content", "created_at" FROM `comment`;--> statement-breakpoint
DROP TABLE `comment`;--> statement-breakpoint
ALTER TABLE `__new_comment` RENAME TO `comment`;--> statement-breakpoint
CREATE INDEX `comment_feature_id_idx` ON `comment` (`feature_id`);--> statement-breakpoint
CREATE TABLE `__new_feature` (
	`id` text PRIMARY KEY NOT NULL,
	`board_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`name` text NOT NULL,
	`upvotes` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`board_id`) REFERENCES `board`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_feature`("id", "board_id", "title", "description", "tags", "name", "upvotes", "created_at") SELECT "id", "board_id", "title", "description", "tags", "name", "upvotes", "created_at" FROM `feature`;--> statement-breakpoint
DROP TABLE `feature`;--> statement-breakpoint
ALTER TABLE `__new_feature` RENAME TO `feature`;--> statement-breakpoint
CREATE INDEX `feature_board_id_idx` ON `feature` (`board_id`);--> statement-breakpoint
CREATE TABLE `__new_news` (
	`id` text PRIMARY KEY NOT NULL,
	`app_id` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`image` text,
	`tags` text DEFAULT '[]' NOT NULL,
	`date` integer DEFAULT (unixepoch()) NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `app`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_news`("id", "app_id", "title", "content", "image", "tags", "date", "created_at") SELECT "id", "app_id", "title", "content", "image", "tags", "date", "created_at" FROM `news`;--> statement-breakpoint
DROP TABLE `news`;--> statement-breakpoint
ALTER TABLE `__new_news` RENAME TO `news`;--> statement-breakpoint
CREATE INDEX `news_app_id_idx` ON `news` (`app_id`);--> statement-breakpoint
CREATE TABLE `__new_subscribe` (
	`id` text PRIMARY KEY NOT NULL,
	`app_id` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `app`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_subscribe`("id", "app_id", "name", "email") SELECT "id", "app_id", "name", "email" FROM `subscribe`;--> statement-breakpoint
DROP TABLE `subscribe`;--> statement-breakpoint
ALTER TABLE `__new_subscribe` RENAME TO `subscribe`;--> statement-breakpoint
CREATE INDEX `subscribe_app_id_idx` ON `subscribe` (`app_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `subscribe_email_app_unique` ON `subscribe` (`email`,`app_id`);--> statement-breakpoint
CREATE TABLE `__new_upvote` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`feature_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`feature_id`) REFERENCES `feature`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_upvote`("id", "email", "feature_id", "created_at") SELECT "id", "email", "feature_id", "created_at" FROM `upvote`;--> statement-breakpoint
DROP TABLE `upvote`;--> statement-breakpoint
ALTER TABLE `__new_upvote` RENAME TO `upvote`;--> statement-breakpoint
CREATE INDEX `upvote_feature_id_idx` ON `upvote` (`feature_id`);--> statement-breakpoint
CREATE INDEX `upvote_email_idx` ON `upvote` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `upvote_email_feature_unique` ON `upvote` (`email`,`feature_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `app_slug_unique` ON `app` (`slug`);--> statement-breakpoint
CREATE INDEX `app_slug_idx` ON `app` (`slug`);--> statement-breakpoint
CREATE INDEX `app_user_id_idx` ON `app` (`user_id`);