import { Schema } from "effect";
import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "effect/http-api";
import { ListAppsResponse } from "./apps";
import { ApiKeyAuth, UserProfile } from "./auth";

export const AuthApi = HttpApiGroup.make("auth")
	.add(
		HttpApiEndpoint.get("me", "/api/v1/auth/me", {
			success: UserProfile,
			error: Schema.Struct({
				error: Schema.Literal("Internal server error"),
			}).annotate({ httpApiStatus: 500 }),
		}),
	)
	.middleware(ApiKeyAuth);

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

export const RoadwiseApi = HttpApi.make("roadwise").add(AuthApi).add(AppsApi);
