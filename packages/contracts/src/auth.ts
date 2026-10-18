import { Context, Schema } from "effect";
import {
	HttpApiMiddleware,
	HttpApiSchema,
	HttpApiSecurity,
} from "effect/http-api";

export class CurrentUser extends Context.Service<
	CurrentUser,
	{ readonly userId: string }
>()("roadwise/CurrentUser") {}

export class UnauthorizedError extends Schema.TaggedError<UnauthorizedError>()(
	"UnauthorizedError",
	{
		error: Schema.Literals([
			"Missing or invalid Authorization header. Format must be 'Bearer <token>'",
			"Missing token",
			"Invalid API key",
		]),
	},
) {}

export class AuthenticationUnavailableError extends Schema.TaggedError<AuthenticationUnavailableError>()(
	"AuthenticationUnavailableError",
	{
		error: Schema.Literal("Internal server error during authentication"),
	},
) {}

export class ApiKeyAuth extends HttpApiMiddleware.Service<
	ApiKeyAuth,
	{ provides: CurrentUser }
>()("roadwise/ApiKeyAuth", {
	security: { bearer: HttpApiSecurity.bearer },
	error: [
		UnauthorizedError.pipe(HttpApiSchema.status(401)),
		AuthenticationUnavailableError.pipe(HttpApiSchema.status(500)),
	],
}) {}

export const UserProfile = Schema.Struct({
	email: Schema.String,
	name: Schema.NullOr(Schema.String),
});
