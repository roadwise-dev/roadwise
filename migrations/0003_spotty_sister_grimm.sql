ALTER TABLE `app` ADD `onboarding_completed` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `app` ADD `is_public` integer DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `app` ADD `email_notifications` integer DEFAULT true NOT NULL;