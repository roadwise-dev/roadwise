import { Context, Effect, Layer } from "effect";
import { NotLoggedInError } from "./errors";

export interface ConfigData {
	token?: string;
	url?: string;
	baseUrl?: string;
}

export const DEFAULT_URL = "https://roadwiseapp.com";

const HOME = process.env.HOME || process.env.USERPROFILE || "";
const XDG_CONFIG_HOME = process.env.XDG_CONFIG_HOME;

export const CONFIG_DIR = XDG_CONFIG_HOME
	? `${XDG_CONFIG_HOME}/roadwise`
	: `${HOME}/.config/roadwise`;

export const CONFIG_PATH = `${CONFIG_DIR}/config.json`;

// Native Bun file reading from ~/.config/roadwise/config.json
export const readConfig = async (): Promise<ConfigData> => {
	const file = Bun.file(CONFIG_PATH);

	if (await file.exists()) {
		try {
			const data = await file.json();
			const resolvedUrl = data.url ?? data.baseUrl;
			return {
				token: data.token,
				url: resolvedUrl,
				baseUrl: resolvedUrl,
			};
		} catch {
			return {};
		}
	}
	return {};
};

// Native Bun file writing to ~/.config/roadwise/config.json
// Standardizes on 'url' in the config file
export const saveConfig = async (data: ConfigData): Promise<void> => {
	const resolvedUrl = data.url ?? data.baseUrl;
	const payload: { token?: string; url?: string } = {};
	if (data.token) payload.token = data.token;
	if (resolvedUrl) payload.url = resolvedUrl;

	await Bun.write(CONFIG_PATH, JSON.stringify(payload, null, 2));
};

// 1. The Effect Service Tag (Dependency Injection)
export class CliConfig extends Context.Service<
	CliConfig,
	{ readonly token: string; readonly url: string; readonly baseUrl: string }
>()("CliConfig") {}

// 2. The Layer that resolves the configuration
export const CliConfigLive = Layer.effect(
	CliConfig,
	Effect.gen(function* () {
		const fromDisk = yield* Effect.promise(() => readConfig());
		const token = fromDisk.token ?? process.env.ROADWISE_API_KEY;
		const url =
			fromDisk.url ??
			fromDisk.baseUrl ??
			process.env.ROADWISE_URL ??
			process.env.ROADWISE_BASE_URL ??
			DEFAULT_URL;

		if (!token) {
			return yield* Effect.fail(
				new NotLoggedInError({
					message: "You are not logged in. Run 'roadwise auth login' first.",
				}),
			);
		}

		return { token, url, baseUrl: url };
	}),
);
