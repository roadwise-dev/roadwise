import { CurrentUser, RoadwiseApi } from "@roadwise/contracts";
import { desc, eq } from "drizzle-orm";
import { Data, Effect } from "effect";
import { HttpApiBuilder } from "effect/http-api";
import type { db } from "@/db/db";
import { app } from "@/db/schema";

export class DatabaseError extends Data.TaggedError("DatabaseError")<{
	readonly cause: unknown;
}> {}

export function listOwnedApps(database: typeof db, userId: string) {
	return Effect.tryPromise({
		try: () =>
			database
				.select({
					id: app.id,
					name: app.name,
					slug: app.slug,
					description: app.description,
					domain: app.domain,
					isPublic: app.isPublic,
					createdAt: app.createdAt,
				})
				.from(app)
				.where(eq(app.userId, userId))
				.orderBy(desc(app.createdAt)),
		catch: (cause) => new DatabaseError({ cause }),
	});
}

export function makeAppsHandlers(database: typeof db) {
	return HttpApiBuilder.group(RoadwiseApi, "apps", (handlers) =>
		handlers.handle("list", () =>
			Effect.gen(function* () {
				const { userId } = yield* CurrentUser;

				const rows = yield* listOwnedApps(database, userId).pipe(
					Effect.tapError((error) =>
						Effect.logError("Failed to list apps", error),
					),
					Effect.mapError(() => ({
						error: "Internal server error" as const,
					})),
				);

				return {
					success: true as const,
					data: rows.map((row) => ({
						...row,
						createdAt: row.createdAt.toISOString(),
					})),
				};
			}),
		),
	);
}
