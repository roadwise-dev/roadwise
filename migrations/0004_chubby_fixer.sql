DROP INDEX "app_slug_unique";--> statement-breakpoint
DROP INDEX "app_slug_idx";--> statement-breakpoint
DROP INDEX "app_user_id_idx";--> statement-breakpoint
DROP INDEX "board_app_id_idx";--> statement-breakpoint
DROP INDEX "comment_feature_id_idx";--> statement-breakpoint
DROP INDEX "feature_board_id_idx";--> statement-breakpoint
DROP INDEX "news_app_id_idx";--> statement-breakpoint
DROP INDEX "subscribe_app_id_idx";--> statement-breakpoint
DROP INDEX "subscribe_email_app_unique";--> statement-breakpoint
DROP INDEX "upvote_feature_id_idx";--> statement-breakpoint
DROP INDEX "upvote_email_idx";--> statement-breakpoint
DROP INDEX "upvote_email_feature_unique";--> statement-breakpoint
ALTER TABLE `app` ALTER COLUMN "onboarding_completed" TO "onboarding_completed" integer;--> statement-breakpoint
CREATE UNIQUE INDEX `app_slug_unique` ON `app` (`slug`);--> statement-breakpoint
CREATE INDEX `app_slug_idx` ON `app` (`slug`);--> statement-breakpoint
CREATE INDEX `app_user_id_idx` ON `app` (`user_id`);--> statement-breakpoint
CREATE INDEX `board_app_id_idx` ON `board` (`app_id`);--> statement-breakpoint
CREATE INDEX `comment_feature_id_idx` ON `comment` (`feature_id`);--> statement-breakpoint
CREATE INDEX `feature_board_id_idx` ON `feature` (`board_id`);--> statement-breakpoint
CREATE INDEX `news_app_id_idx` ON `news` (`app_id`);--> statement-breakpoint
CREATE INDEX `subscribe_app_id_idx` ON `subscribe` (`app_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `subscribe_email_app_unique` ON `subscribe` (`email`,`app_id`);--> statement-breakpoint
CREATE INDEX `upvote_feature_id_idx` ON `upvote` (`feature_id`);--> statement-breakpoint
CREATE INDEX `upvote_email_idx` ON `upvote` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `upvote_email_feature_unique` ON `upvote` (`email`,`feature_id`);--> statement-breakpoint
ALTER TABLE `app` ALTER COLUMN "is_public" TO "is_public" integer DEFAULT true;--> statement-breakpoint
ALTER TABLE `app` ALTER COLUMN "email_notifications" TO "email_notifications" integer DEFAULT true;