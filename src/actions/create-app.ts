"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "../db/db";
import { app } from "../db/schema";

// Input validation schema
const createAppSchema = z.object({
	appName: z
		.string()
		.min(1, "App name is required")
		.max(50, "App name must be less than 50 characters")
		.transform((val) => val.trim()),
	appSlug: z
		.string()
		.min(1, "App slug is required")
		.max(30, "App slug must be less than 30 characters")
		.regex(
			/^[a-z0-9-]+$/,
			"App slug can only contain lowercase letters, numbers, and hyphens",
		)
		.transform((val) => val.trim()),
	appDescription: z
		.string()
		.max(200, "Description must be less than 200 characters")
		.transform((val) => val.trim())
		.optional()
		.default(""),
});

export async function createAppAction(formData: FormData) {
	try {
		// Authenticate user
		const { userId } = await auth();
		if (!userId) {
			return redirect("/login");
		}

		// Validate input data
		const result = createAppSchema.safeParse({
			appName: formData.get("app-name"),
			appSlug: formData.get("app-slug"),
			appDescription: formData.get("app-description"),
		});

		if (!result.success) {
			const errors = result.error.issues
				.map((issue) => issue.message)
				.join(", ");
			return `Validation error: ${errors}`;
		}

		const { appName, appSlug, appDescription } = result.data;

		// Check for an existing app with the same slug
		const [existingApp] = await db
			.select()
			.from(app)
			.where(eq(app.slug, appSlug));
		if (existingApp) {
			return "This app slug is already taken";
		}

		// Insert new app into the database
		await db.insert(app).values({
			userId: userId,
			name: appName,
			description: appDescription,
			domain: `${appSlug}.roadwiseapp.com`,
			slug: appSlug,
			avatarUrl: "",
		});

		return redirect(`/dashboard/${appSlug}`);
	} catch (error) {
		console.error("Error creating app:", error);
		return "An unexpected error occurred. Please try again.";
	}
}
