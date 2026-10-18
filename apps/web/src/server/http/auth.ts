import { ApiKeyAuth, CurrentUser } from "@roadwise/contracts";
import { eq } from "drizzle-orm";
import { Effect, Layer, Redacted } from "effect";
import { HttpServerRequest } from "effect/http";
import type { db } from "@/db/db";
import { apiKey } from "@/db/schema";
import { hashToken } from "@/lib/api-auth";

export function makeApiKeyAuthLayer(database: typeof db) {
	return Layer.succeed(
		ApiKeyAuth,
		ApiKeyAuth.of({
			bearer: (httpEffect, { credential }) =>
				Effect.gen(function* () {
					const request = yield* HttpServerRequest.HttpServerRequest;

					if (!request.headers.authorization?.startsWith("Bearer ")) {
						return yield* Effect.fail({
							error:
								"Missing or invalid Authorization header. Format must be 'Bearer <token>'" as const,
						});
					}

					const token = Redacted.value(credential);

					if (!token) {
						return yield* Effect.fail({
							error: "Missing token" as const,
						});
					}

					const keyHash = hashToken(token);

					const records = yield* Effect.tryPromise(() =>
						database
							.select({ id: apiKey.id, userId: apiKey.userId })
							.from(apiKey)
							.where(eq(apiKey.keyHash, keyHash))
							.limit(1),
					).pipe(
						Effect.tapError((error) =>
							Effect.logError("API key lookup failed", error),
						),
						Effect.mapError(() => ({
							error: "Internal server error during authentication" as const,
						})),
					);

					const record = records[0];

					if (!record) {
						return yield* Effect.fail({
							error: "Invalid API key" as const,
						});
					}

					yield* Effect.tryPromise(() =>
						database
							.update(apiKey)
							.set({ lastUsedAt: new Date() })
							.where(eq(apiKey.id, record.id))
							.execute(),
					).pipe(
						Effect.catch((error) =>
							Effect.logWarning("Could not update API key usage", error),
						),
					);

					return yield* Effect.provideService(httpEffect, CurrentUser, {
						userId: record.userId,
					});
				}),
		}),
	);
}
