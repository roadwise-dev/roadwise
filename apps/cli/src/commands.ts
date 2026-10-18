import { makeEffectClient } from "@roadwise/sdk";
import { Console, Effect, Option } from "effect";
import { Argument, Command, Flag } from "effect/cli";
import {
	CliConfig,
	CliConfigLive,
	DEFAULT_URL,
	readConfig,
	saveConfig,
} from "./config";

const urlFlag = Flag.String("url").pipe(
	Flag.optional,
	Flag.withDescription("Override the Roadwise server URL"),
);

// --- 1. roadwise auth login ---
const authLoginCommand = Command.make("login", { url: urlFlag }, ({ url }) =>
	Effect.gen(function* () {
		yield* Console.log("Roadwise CLI Login");

		const input = prompt("Enter your API key (rw_...): ");
		const token = input?.trim();

		// Stage 1: Local format validation
		if (!token) {
			yield* Console.error("Error: API key cannot be empty.");
			return;
		}

		if (!token.startsWith("rw_") || token.length < 20) {
			yield* Console.error(
				"Error: Invalid token format. Roadwise API keys must start with 'rw_'.",
			);
			return;
		}

		const fromDisk = yield* Effect.promise(() => readConfig());
		const serverUrl = (
			Option.isSome(url) ? url.value : (fromDisk.url ?? DEFAULT_URL)
		).replace(/\/+$/, "");

		yield* Console.log(`Connecting to ${serverUrl}...`);

		// Stage 2: Server verification before saving
		const testClient = yield* makeEffectClient({
			apiKey: token,
			url: serverUrl,
		});
		yield* testClient.apps.list({});

		yield* Effect.promise(() =>
			saveConfig({
				...fromDisk,
				token,
				url: serverUrl,
			}),
		);

		yield* Console.log(
			"Token verified. Successfully logged in. Config saved to ~/.config/roadwise/config.json",
		);
	}),
);

// --- 2. roadwise auth status ---
const authStatusCommand = Command.make("status", {}, () =>
	Effect.gen(function* () {
		const fromDisk = yield* Effect.promise(() => readConfig());
		const token = fromDisk.token ?? process.env.ROADWISE_API_KEY;
		const url =
			fromDisk.url ??
			process.env.ROADWISE_URL ??
			process.env.ROADWISE_BASE_URL ??
			DEFAULT_URL;

		if (!token) {
			yield* Console.log("You are not logged in to Roadwise.");
			yield* Console.log("Run 'roadwise auth login' to authenticate.");
			return;
		}

		const masked = `${token.slice(0, 7)}........${token.slice(-4)}`;
		yield* Console.log("Roadwise Authentication Status:");
		yield* Console.log(`  Server:  ${url}`);
		yield* Console.log(`  Token:   ${masked}`);
		yield* Console.log("  Status:  Verifying with server...");

		const client = yield* makeEffectClient({ apiKey: token, url });
		yield* client.apps.list({});

		yield* Console.log("  Status:  Valid (authenticated)");
	}),
);

// --- 3. roadwise auth logout ---
const authLogoutCommand = Command.make("logout", {}, () =>
	Effect.gen(function* () {
		const fromDisk = yield* Effect.promise(() => readConfig());
		yield* Effect.promise(() =>
			saveConfig({
				...fromDisk,
				token: undefined,
			}),
		);
		yield* Console.log(
			"Successfully logged out. Token removed from ~/.config/roadwise/config.json",
		);
	}),
);

// Group: roadwise auth <login | status | logout>
export const authCommand = Command.make("auth").pipe(
	Command.withSubcommands([
		authLoginCommand,
		authStatusCommand,
		authLogoutCommand,
	]),
);

// --- 4. roadwise config set <key> <value> ---
const configKeyArg = Argument.String("key");
const configValueArg = Argument.String("value");

const configSetCommand = Command.make(
	"set",
	{ key: configKeyArg, value: configValueArg },
	({ key, value }) =>
		Effect.gen(function* () {
			const fromDisk = yield* Effect.promise(() => readConfig());
			if (key === "url" || key === "baseUrl") {
				const normalized = value.trim().replace(/\/+$/, "");
				yield* Effect.promise(() =>
					saveConfig({ ...fromDisk, url: normalized }),
				);
				yield* Console.log(`Updated 'url' to: ${normalized}`);
			} else {
				yield* Console.error(
					`Error: Unknown configuration key '${key}'. Supported keys: url (or baseUrl)`,
				);
			}
		}),
);

// --- 5. roadwise config get <key> ---
const configGetCommand = Command.make("get", { key: configKeyArg }, ({ key }) =>
	Effect.gen(function* () {
		const fromDisk = yield* Effect.promise(() => readConfig());
		if (key === "url" || key === "baseUrl") {
			yield* Console.log(fromDisk.url ?? DEFAULT_URL);
		} else {
			yield* Console.error(
				`Error: Unknown configuration key '${key}'. Supported keys: url (or baseUrl)`,
			);
		}
	}),
);

// --- 6. roadwise config list ---
const configListCommand = Command.make("list", {}, () =>
	Effect.gen(function* () {
		const fromDisk = yield* Effect.promise(() => readConfig());
		const url = fromDisk.url ?? DEFAULT_URL;
		const token = fromDisk.token
			? `${fromDisk.token.slice(0, 7)}........${fromDisk.token.slice(-4)}`
			: "(not set)";

		yield* Console.log("Roadwise CLI Configuration:");
		yield* Console.log(`  url:   ${url}`);
		yield* Console.log(`  token: ${token}`);
	}),
);

// Group: roadwise config <set | get | list>
export const configCommand = Command.make("config").pipe(
	Command.withSubcommands([
		configSetCommand,
		configGetCommand,
		configListCommand,
	]),
);

// --- 7. roadwise apps ls ---
const appsListCommand = Command.make("ls", {}, () =>
	Effect.gen(function* () {
		const config = yield* CliConfig;

		yield* Effect.logDebug(`Connecting to ${config.url}...`);

		const client = yield* makeEffectClient({
			apiKey: config.token,
			url: config.url,
		});

		const response = yield* client.apps.list({});

		yield* Effect.logDebug(`Received ${response.data.length} app(s) from API`);

		if (response.data.length === 0) {
			yield* Console.log("No apps found on your account.");
			return;
		}

		yield* Console.log(`Found ${response.data.length} app(s):\n`);
		for (const app of response.data) {
			yield* Console.log(`- ${app.name} (${app.slug}) - ${app.domain}`);
		}
	}).pipe(Effect.provide(CliConfigLive)),
);

// Group: roadwise apps <ls>
export const appsCommand = Command.make("apps").pipe(
	Command.withSubcommands([appsListCommand]),
);
