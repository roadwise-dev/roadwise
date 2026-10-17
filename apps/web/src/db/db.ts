/** biome-ignore-all lint/style/noNonNullAssertion: its fine */

import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";

config({ path: ".env.local" });

// Validate required environment variables
const requiredEnvVars = {
	TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
	TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
} as const;

// Check for missing environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
	.filter(([, value]) => !value)
	.map(([key]) => key);

if (missingEnvVars.length > 0) {
	throw new Error(
		`Missing required environment variables: ${missingEnvVars.join(", ")}`,
	);
}

export const db = drizzle({
	connection: {
		url: requiredEnvVars.TURSO_DATABASE_URL!,
		authToken: requiredEnvVars.TURSO_AUTH_TOKEN!,
	},
});
