PRAGMA foreign_keys = OFF;
--> statement-breakpoint

CREATE TABLE "feature_new" (
	"id" text PRIMARY KEY NOT NULL,
	"app_id" text NOT NULL,
	"board_id" text,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"tags" text DEFAULT '[]' NOT NULL,
	"name" text NOT NULL,
	"upvotes" integer DEFAULT 0 NOT NULL,
	"created_at" integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY ("app_id") REFERENCES "app"("id") ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY ("board_id") REFERENCES "board"("id") ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint

INSERT INTO "feature_new" (
	"id",
	"app_id",
	"board_id",
	"title",
	"description",
	"tags",
	"name",
	"upvotes",
	"created_at"
)
SELECT
	"feature"."id",
	"board"."app_id",
	CASE
		WHEN "board"."name" = 'Unassigned' THEN NULL
		ELSE "feature"."board_id"
	END,
	"feature"."title",
	"feature"."description",
	"feature"."tags",
	"feature"."name",
	"feature"."upvotes",
	"feature"."created_at"
FROM "feature"
INNER JOIN "board" ON "feature"."board_id" = "board"."id";
--> statement-breakpoint

DROP TABLE "feature";
--> statement-breakpoint
ALTER TABLE "feature_new" RENAME TO "feature";
--> statement-breakpoint

CREATE INDEX "feature_app_id_idx" ON "feature" ("app_id");
--> statement-breakpoint
CREATE INDEX "feature_board_id_idx" ON "feature" ("board_id");
--> statement-breakpoint

DELETE FROM "board" WHERE "name" = 'Unassigned';
--> statement-breakpoint

PRAGMA foreign_keys = ON;
