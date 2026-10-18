import { RoadwiseApi } from "@roadwise/contracts";
import { Layer } from "effect";
import { HttpRouter, HttpServer } from "effect/http";
import { HttpApiBuilder, HttpApiScalar } from "effect/http-api";
import type { db } from "@/db/db";
import { makeAppsHandlers } from "./apps";
import { makeApiKeyAuthLayer } from "./auth";
import { makeAuthHandlers, type UserProfileLookup } from "./auth-handlers";

export function makeApiHandler(
	database: typeof db,
	userLookup?: UserProfileLookup,
) {
	const authMiddleware = makeApiKeyAuthLayer(database);

	const AppsLive = makeAppsHandlers(database).pipe(
		Layer.provide(authMiddleware),
	);

	const AuthLive = makeAuthHandlers(userLookup).pipe(
		Layer.provide(authMiddleware),
	);

	const ApiLive = HttpApiBuilder.layer(RoadwiseApi).pipe(
		Layer.provide(AppsLive),
		Layer.provide(AuthLive),
		Layer.provide(HttpApiScalar.layer(RoadwiseApi, { path: "/docs/api" })),
		Layer.provide(HttpServer.layerServices),
	);

	return HttpRouter.toWebHandler(ApiLive);
}
