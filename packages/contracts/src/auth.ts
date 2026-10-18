import { Context, Schema } from "effect";
import { HttpApiMiddleware, HttpApiSecurity } from "effect/http-api";

export class CurrentUser extends Context.Service<
	CurrentUser,
	{ readonly userId: string }
>()("roadwise/CurrentUser") {}

export const Unauthorized = Schema.Struct({
	error: Schema.Literals([
		"Missing or invalid Authorization header. Format must be 'Bearer <token>'",
		"Missing token",
		"Invalid API key",
	]),
}).annotate({ httpApiStatus: 401 });

export const AuthenticationUnavailable = Schema.Struct({
	error: Schema.Literal("Internal server error during authentication"),
}).annotate({ httpApiStatus: 500 });

export class ApiKeyAuth extends HttpApiMiddleware.Service<
	ApiKeyAuth,
	{ provides: CurrentUser }
>()("roadwise/ApiKeyAuth", {
	security: { bearer: HttpApiSecurity.bearer },
	error: [Unauthorized, AuthenticationUnavailable],
}) {}
