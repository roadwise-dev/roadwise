import { createClient } from "@libsql/client";
import { config } from "dotenv";
config({ path: ".env.db.local" });

const client = createClient({
	url: process.env.TURSO_DATABASE_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function main() {
	try {
		await client.execute("ALTER TABLE `app` DROP COLUMN `theme`");
		await client.execute("DELETE FROM `__drizzle_migrations` WHERE id >= 2"); // or whatever row represents 0002
		console.log("Success");
	} catch (e) {
		console.error(e);
	}
}
main();
