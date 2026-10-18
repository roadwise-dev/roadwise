import { Schema } from "effect";
import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "effect/http-api";
import { ListAppsResponse } from "./apps";
import { ApiKeyAuth } from "./auth";

const AppsApi = HttpApiGroup.make("apps")
	.add(
		HttpApiEndpoint.get("list", "/api/v1/apps", {
			success: ListAppsResponse,
			error: Schema.Struct({
				error: Schema.Literal("Internal server error"),
			}).annotate({ httpApiStatus: 500 }),
		}),
	)
	.middleware(ApiKeyAuth);

export const RoadwiseApi = HttpApi.make("roadwise").add(AppsApi);
