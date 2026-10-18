import { RoadwiseApi } from "@roadwise/contracts";
import { Effect } from "effect";
import { FetchHttpClient, HttpClient, HttpClientRequest } from "effect/http";
import { HttpApiClient } from "effect/http-api";

export interface RoadwiseOptions {
	apiKey: string;
	baseUrl?: string;
}

const getBaseUrl = (options: RoadwiseOptions): string => {
	const envUrl =
		typeof process !== "undefined" ? process.env?.ROADWISE_BASE_URL : undefined;
	const rawUrl = options.baseUrl ?? envUrl ?? "https://roadwise.dev";
	return rawUrl.replace(/\/+$/, "");
};

export const makeEffectClient = (options: RoadwiseOptions) => {
	const baseUrl = getBaseUrl(options);

	return HttpApiClient.make(RoadwiseApi, {
		baseUrl,
		transformClient: (client) =>
			client.pipe(
				HttpClient.mapRequest(
					HttpClientRequest.setHeader(
						"Authorization",
						`Bearer ${options.apiKey}`,
					),
				),
			),
	}).pipe(Effect.provide(FetchHttpClient.layer));
};

type EffectClient = Effect.Effect.Success<ReturnType<typeof makeEffectClient>>;

export class Roadwise {
	private clientPromise: Promise<EffectClient>;

	constructor(options: RoadwiseOptions) {
		this.clientPromise = Effect.runPromise(makeEffectClient(options));
	}

	readonly apps = {
		list: async () => {
			const client = await this.clientPromise;
			return Effect.runPromise(client.apps.list({}));
		},
	};
}
