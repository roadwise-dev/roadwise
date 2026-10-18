import { RoadwiseApi } from "@roadwise/contracts";
import type { Effect } from "effect";
import * as E from "effect/Effect";
import { FetchHttpClient, HttpClient, HttpClientRequest } from "effect/http";
import { HttpApiClient } from "effect/http-api";

export interface RoadwiseOptions {
	apiKey: string;
	baseUrl?: string;
	url?: string;
}

const getBaseUrl = (options: RoadwiseOptions): string => {
	const envUrl =
		typeof process !== "undefined"
			? (process.env?.ROADWISE_URL ?? process.env?.ROADWISE_BASE_URL)
			: undefined;
	const rawUrl =
		options.url ?? options.baseUrl ?? envUrl ?? "https://roadwiseapp.com";
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
	}).pipe(E.provide(FetchHttpClient.layer));
};

type EffectClient = Effect.Success<ReturnType<typeof makeEffectClient>>;

export class Roadwise {
	private clientPromise: Promise<EffectClient>;

	constructor(options: RoadwiseOptions) {
		this.clientPromise = E.runPromise(makeEffectClient(options));
	}

	readonly apps = {
		list: async () => {
			const client = await this.clientPromise;
			return E.runPromise(client.apps.list({}));
		},
	};
}
