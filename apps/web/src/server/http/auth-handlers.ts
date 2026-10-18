import { clerkClient } from "@clerk/nextjs/server";
import { CurrentUser, RoadwiseApi } from "@roadwise/contracts";
import { Effect } from "effect";
import { HttpApiBuilder } from "effect/http-api";

export type UserProfileLookup = (
	userId: string,
) => Promise<{ email: string; name: string | null }>;

export const defaultClerkUserLookup: UserProfileLookup = async (
	userId: string,
) => {
	const client = await clerkClient();
	const user = await client.users.getUser(userId);
	const email =
		user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
			?.emailAddress ??
		user.emailAddresses[0]?.emailAddress ??
		"";
	const name = user.fullName ?? user.firstName ?? null;
	return { email, name };
};

export function makeAuthHandlers(
	lookupUser: UserProfileLookup = defaultClerkUserLookup,
) {
	return HttpApiBuilder.group(RoadwiseApi, "auth", (handlers) =>
		handlers.handle("me", () =>
			Effect.gen(function* () {
				const { userId } = yield* CurrentUser;

				const profile = yield* Effect.tryPromise({
					try: () => lookupUser(userId),
					catch: (cause) => cause,
				}).pipe(
					Effect.tapError((error) =>
						Effect.logError("Failed to fetch user profile", error),
					),
					Effect.mapError(() => ({
						error: "Internal server error" as const,
					})),
				);

				return profile;
			}),
		),
	);
}
