import { Schema } from "effect";

export class NotLoggedInError extends Schema.TaggedError<NotLoggedInError>()(
	"NotLoggedInError",
	{
		message: Schema.String,
	},
) {}

export class ConfigError extends Schema.TaggedError<ConfigError>()(
	"ConfigError",
	{
		message: Schema.String,
	},
) {}
