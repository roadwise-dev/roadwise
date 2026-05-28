import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { createClient } from "@libsql/client";

const targets = ["local", "staging", "production"] as const;
type Target = (typeof targets)[number];

const target = process.argv[2] as Target | undefined;

if (!target || !targets.includes(target)) {
	console.error(`Usage: bun run scripts/migrate.ts <${targets.join(" | ")}>`);
	process.exit(1);
}

const envFile = `.env.db.${target}`;
const productionEnvFile = ".env.db.production";

function readEnvFile(path: string) {
	if (!existsSync(path)) {
		throw new Error(
			`Missing ${path}. Copy .env.db.example or pull from Vercel.`,
		);
	}

	return Object.fromEntries(
		readFileSync(path, "utf8")
			.split("\n")
			.map((line) => line.trim())
			.filter((line) => line && !line.startsWith("#"))
			.map((line) => {
				const separator = line.indexOf("=");
				return [line.slice(0, separator), line.slice(separator + 1)];
			}),
	);
}

const env = readEnvFile(envFile);

if (!env.TURSO_DATABASE_URL) {
	console.error(`Missing TURSO_DATABASE_URL in ${envFile}`);
	process.exit(1);
}

if (target !== "production" && existsSync(productionEnvFile)) {
	const productionEnv = readEnvFile(productionEnvFile);

	if (
		productionEnv.TURSO_DATABASE_URL &&
		env.TURSO_DATABASE_URL === productionEnv.TURSO_DATABASE_URL &&
		process.env.ALLOW_SHARED_DB_MIGRATION !== "1"
	) {
		console.error(
			`${envFile} points at the same TURSO_DATABASE_URL as ${productionEnvFile}.`,
		);
		console.error(
			"Refusing to run a non-production migration against the production database.",
		);
		console.error(
			"Create separate Turso databases or set ALLOW_SHARED_DB_MIGRATION=1 if this is intentional.",
		);
		process.exit(1);
	}
}

if (target === "production") {
	const expectedConfirmation = "roadwise-production";

	if (process.env.CONFIRM_PROD_MIGRATION !== expectedConfirmation) {
		console.error("Refusing to run production migrations.");
		console.error(
			`Set CONFIRM_PROD_MIGRATION=${expectedConfirmation} to confirm you intentionally want to migrate production.`,
		);
		process.exit(1);
	}
}

const client = createClient({
	url: env.TURSO_DATABASE_URL,
	authToken: env.TURSO_AUTH_TOKEN,
});

await client.execute(`
	CREATE TABLE IF NOT EXISTS __roadwise_migrations (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL UNIQUE,
		hash TEXT NOT NULL,
		created_at INTEGER DEFAULT (unixepoch()) NOT NULL
	)
`);

const appliedMigrations = await client.execute(
	"SELECT name, hash FROM __roadwise_migrations",
);
const applied = new Map(
	appliedMigrations.rows.map((row) => [String(row.name), String(row.hash)]),
);

const migrationFiles = readdirSync("migrations")
	.filter((file) => file.endsWith(".sql"))
	.sort();

for (const file of migrationFiles) {
	const sql = readFileSync(`migrations/${file}`, "utf8");
	const hash = createHash("sha256").update(sql).digest("hex");
	const existingHash = applied.get(file);

	if (existingHash) {
		if (existingHash !== hash) {
			throw new Error(
				`Migration ${file} was already applied with a different hash. Never edit applied migrations.`,
			);
		}

		console.log(`Skipping ${file}; already applied.`);
		continue;
	}

	console.log(`Applying ${file}...`);

	const statements = sql
		.split("--> statement-breakpoint")
		.map((statement) => statement.trim())
		.filter((statement) => statement && !statement.startsWith("--"));

	try {
		for (const statement of statements) {
			await client.execute(statement);
		}

		await client.execute({
			sql: "INSERT INTO __roadwise_migrations (name, hash) VALUES (?, ?)",
			args: [file, hash],
		});
	} catch (error) {
		throw error;
	}
}

client.close();
console.log(`Migrations complete for ${target}.`);
