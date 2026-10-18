import { Schema } from "effect";

export const AppResponse = Schema.Struct({
	id: Schema.String,
	name: Schema.String,
	slug: Schema.String,
	domain: Schema.String,
	description: Schema.NullOr(Schema.String),
	isPublic: Schema.NullOr(Schema.Boolean),
	createdAt: Schema.String,
});

export type AppResponse = typeof AppResponse.Type;

export const ListAppsResponse = Schema.Struct({
	success: Schema.Literal(true),
	data: Schema.Array(AppResponse),
});
