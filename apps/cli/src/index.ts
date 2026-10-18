#!/usr/bin/env bun
import { BunServices } from "@effect/platform-bun";
import { Console, Effect } from "effect";
import { CliError, Command } from "effect/cli";
import { appsCommand, authCommand, configCommand } from "./commands";

// Assemble root CLI command: roadwise
const rootCommand = Command.make("roadwise").pipe(
	Command.withSubcommands([authCommand, configCommand, appsCommand]),
);

// Command.runWith passes process.argv into Effect
const program = Command.runWith(rootCommand, {
	version: "0.1.0",
})(process.argv.slice(2)).pipe(
	Effect.provide(BunServices.layer),
	Effect.catchTags({
		UnauthorizedError: (err) =>
			Console.error(
				`Authentication error: ${err.error}. Run 'roadwise auth login' to update your credentials.`,
			),
		AuthenticationUnavailableError: (err) =>
			Console.error(`Server error: ${err.error}`),
		NotLoggedInError: (err) => Console.error(`Error: ${err.message}`),
	}),
	Effect.catch((err: unknown) => {
		if (CliError.isCliError(err)) {
			return Effect.void;
		}
		const message =
			err instanceof Error
				? err.message
				: typeof err === "string"
					? err
					: JSON.stringify(err);
		return Console.error(`Error: ${message}`);
	}),
);

// Run with Bun
Effect.runPromise(program);
