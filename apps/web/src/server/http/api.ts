import { RoadwiseApi } from "@roadwise/contracts";
import { Layer } from "effect";
import { HttpRouter, HttpServer } from "effect/http";
import { HttpApiBuilder, HttpApiScalar } from "effect/http-api";
import type { db } from "@/db/db";
import { makeAppsHandlers } from "./apps";
import { makeApiKeyAuthLayer } from "./auth";

export function makeApiHandler(database: typeof db) {
	const AppsLive = makeAppsHandlers(database).pipe(
		Layer.provide(makeApiKeyAuthLayer(database)),
	);

	const ApiLive = HttpApiBuilder.layer(RoadwiseApi).pipe(
		Layer.provide(AppsLive),
		Layer.provide(HttpApiScalar.layer(RoadwiseApi, { path: "/docs/api" })),
		Layer.provide(HttpServer.layerServices),
	);

	return HttpRouter.toWebHandler(ApiLive);
}
