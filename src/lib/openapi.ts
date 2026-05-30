import {
	OpenAPIRegistry,
	OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

// Required to use `.openapi()` on Zod schemas
extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

// Bearer Token Auth
const bearerAuth = registry.registerComponent("securitySchemes", "bearerAuth", {
	type: "http",
	scheme: "bearer",
	bearerFormat: "API Key",
});

// App Schema
export const AppSchema = registry.register(
	"App",
	z.object({
		id: z.string().uuid(),
		name: z.string(),
		slug: z.string(),
		description: z.string().nullable(),
		domain: z.string(),
		isPublic: z.boolean().nullable(),
		createdAt: z.date(),
	}).openapi({
		description: "A Roadwise feedback board (app)",
	})
);

// Define the GET /api/v1/apps route
registry.registerPath({
	method: "get",
	path: "/api/v1/apps",
	summary: "List apps",
	description: "Fetch all apps/feedback boards belonging to the authenticated user.",
	security: [{ [bearerAuth.name]: [] }],
	responses: {
		200: {
			description: "A list of apps",
			content: {
				"application/json": {
					schema: z.object({
						success: z.boolean(),
						data: z.array(AppSchema),
					}),
				},
			},
		},
		401: {
			description: "Unauthorized",
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
		},
	},
});

export function getOpenApiSpec() {
	const generator = new OpenApiGeneratorV3(registry.definitions);
	
	return generator.generateDocument({
		openapi: "3.0.0",
		info: {
			version: "1.0.0",
			title: "Roadwise API",
			description: "The official API for Roadwise, a developer-centric feedback board.",
		},
		servers: [
			{ url: "http://localhost:3000", description: "Local environment" },
			{ url: "https://roadwise.dev", description: "Production environment" }
		],
	});
}
