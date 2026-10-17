import { eq, sql } from "drizzle-orm";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { feature, upvote } from "@/db/schema";

// Keep the vote record and the total used by roadmap sorting in one transaction.
export async function recordUpvote(
	database: LibSQLDatabase,
	email: string,
	featureId: string,
) {
	return database.transaction(async (tx) => {
		const [inserted] = await tx
			.insert(upvote)
			.values({ email, featureId })
			.onConflictDoNothing({ target: [upvote.email, upvote.featureId] })
			.returning({ id: upvote.id });

		if (!inserted) return false;

		await tx
			.update(feature)
			.set({
				upvotes: sql`(select count(*) from ${upvote} where ${upvote.featureId} = ${feature.id})`,
			})
			.where(eq(feature.id, featureId));

		return true;
	});
}
