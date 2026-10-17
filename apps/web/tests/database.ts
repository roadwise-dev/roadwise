import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { app } from "@/db/schema";

// Isolated SQLite files: these checks never load a database environment file.
export async function createTestDatabase() {
	const directory = mkdtempSync(join(tmpdir(), "roadwise-db-test-"));
	const client = createClient({ url: `file:${join(directory, "test.db")}` });
	await client.executeMultiple(`
		PRAGMA foreign_keys = ON;
		CREATE TABLE app (
			id TEXT PRIMARY KEY NOT NULL, user_id TEXT NOT NULL,
			name TEXT NOT NULL, description TEXT, domain TEXT NOT NULL,
			avatar_url TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
			onboarding_completed INTEGER DEFAULT 0, is_public INTEGER DEFAULT 1,
			email_notifications INTEGER DEFAULT 1, theme TEXT,
			created_at INTEGER NOT NULL DEFAULT (unixepoch())
		);
		CREATE TABLE board (
			id TEXT PRIMARY KEY NOT NULL,
			app_id TEXT NOT NULL REFERENCES app(id) ON DELETE CASCADE,
			name TEXT NOT NULL, "column" INTEGER,
			created_at INTEGER NOT NULL DEFAULT (unixepoch())
		);
		CREATE TABLE feature (
			id TEXT PRIMARY KEY NOT NULL,
			app_id TEXT NOT NULL REFERENCES app(id) ON DELETE CASCADE,
			board_id TEXT REFERENCES board(id) ON DELETE SET NULL,
			title TEXT NOT NULL, description TEXT NOT NULL,
			tags TEXT NOT NULL DEFAULT '[]', name TEXT NOT NULL,
			upvotes INTEGER NOT NULL DEFAULT 0,
			created_at INTEGER NOT NULL DEFAULT (unixepoch())
		);
		CREATE TABLE upvote (
			id TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL,
			feature_id TEXT NOT NULL REFERENCES feature(id) ON DELETE CASCADE,
			created_at INTEGER NOT NULL DEFAULT (unixepoch()),
			UNIQUE (email, feature_id)
		);
	`);
	const database = drizzle(client);
	await database.insert(app).values({
		id: "roadwise-test-app",
		userId: "test-owner",
		name: "Roadwise",
		slug: "roadwise",
		domain: "demo.invalid",
		avatarUrl: "",
	});

	return {
		database,
		client,
		directory,
		close() {
			client.close();
			rmSync(directory, { recursive: true, force: true });
		},
	};
}
