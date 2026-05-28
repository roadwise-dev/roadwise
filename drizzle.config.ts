import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

const envFile = process.env.DRIZZLE_ENV_FILE ?? ".env.db.local";

config({ path: envFile });

if (!process.env.TURSO_DATABASE_URL) {
	throw new Error(`Missing TURSO_DATABASE_URL in ${envFile}`);
}

const dbCredentials = process.env.TURSO_AUTH_TOKEN
	? {
			url: process.env.TURSO_DATABASE_URL,
			authToken: process.env.TURSO_AUTH_TOKEN,
		}
	: {
			url: process.env.TURSO_DATABASE_URL,
		};

export default defineConfig({
	schema: "./src/db/schema.ts",
	out: "./migrations",
	dialect: "turso",
	dbCredentials,
});
