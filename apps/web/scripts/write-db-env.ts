import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const databaseByTarget = {
	local: "roadwise-local",
	staging: "roadwise-staging",
	production: "roadwise",
} as const;

type Target = keyof typeof databaseByTarget;

const target = process.argv[2] as Target | "all" | undefined;

if (!target || (target !== "all" && !(target in databaseByTarget))) {
	console.error(
		"Usage: bun run scripts/write-db-env.ts <local | staging | production | all>",
	);
	process.exit(1);
}

const targets =
	target === "all" ? (Object.keys(databaseByTarget) as Target[]) : [target];

function run(command: string, args: string[]) {
	const result = spawnSync(command, args, {
		encoding: "utf8",
		stdio: ["ignore", "pipe", "inherit"],
	});

	if (result.status !== 0) {
		process.exit(result.status ?? 1);
	}

	return result.stdout.trim();
}

for (const currentTarget of targets) {
	const database = databaseByTarget[currentTarget];
	const url = run("turso", ["db", "show", database, "--url"]);
	const token = run("turso", ["db", "tokens", "create", database]);
	const envFile = `.env.db.${currentTarget}`;

	writeFileSync(
		envFile,
		`TURSO_DATABASE_URL=${url}\nTURSO_AUTH_TOKEN=${token}\n`,
	);

	console.log(`Wrote ${envFile} for ${database}`);
}
