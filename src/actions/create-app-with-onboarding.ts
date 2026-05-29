"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect, unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { db } from "@/db/db";
import { app, board } from "@/db/schema";

const DEFAULT_BOARD_NAMES = ["Requested", "In Progress", "Completed"];

const createAppSchema = z.object({
	// App details
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
	avatarUrl: z.string().optional().default(""),

	// Settings
	isPublic: z.boolean().default(true),
	emailNotifications: z.boolean().default(true),
});

export async function createAppWithOnboardingAction(formData: FormData) {
	try {
		// Canonical create-app action used by /dashboard/create.
		// Authenticate user
		const { userId } = await auth();
		if (!userId) {
			return redirect("/login");
		}

		// Parse and validate data
		const rawData = {
			appName: formData.get("appName") as string,
			appSlug: formData.get("appSlug") as string,
			appDescription: formData.get("appDescription") as string,
			avatarUrl: formData.get("avatarUrl") as string,
			isPublic: formData.get("isPublic") === "true",
			emailNotifications: formData.get("emailNotifications") === "true",
		};

		const result = createAppSchema.safeParse(rawData);
		if (!result.success) {
			const errors = result.error.issues
				.map((issue) => issue.message)
				.join(", ");
			return `Validation error: ${errors}`;
		}

		const {
			appName,
			appSlug,
			appDescription,
			avatarUrl,
			isPublic,
			emailNotifications,
		} = result.data;

		// Check slug availability
		const [existingApp] = await db
			.select()
			.from(app)
			.where(eq(app.slug, appSlug));

		if (existingApp) {
			return "This app slug is already taken";
		}

		// Create app
		const [newApp] = await db
			.insert(app)
			.values({
				userId,
				name: appName,
				description: appDescription,
				domain: `${appSlug}.roadwiseapp.com`,
				slug: appSlug,
				avatarUrl,
				onboardingCompleted: true, // Mark as completed since we're doing it all at once
				isPublic,
				emailNotifications,
			})
			.returning();

		await db.insert(board).values(
			DEFAULT_BOARD_NAMES.map((boardName, index) => ({
				appId: newApp.id,
				name: boardName,
				column: index + 1,
			})),
		);

		revalidatePath("/dashboard", "layout");
		return redirect(`/dashboard/${appSlug}`);
	} catch (error) {
		unstable_rethrow(error);
		console.error("Error creating app:", error);
		return "An unexpected error occurred. Please try again.";
	}
}

// Helper action for real-time slug validation
export async function validateSlugAction(slug: string) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return { available: false, error: "Authentication required" };
		}

		if (!slug || slug.length === 0) {
			return { available: false, error: "Slug is required" };
		}

		if (slug.length > 30) {
			return {
				available: false,
				error: "Slug must be less than 30 characters",
			};
		}

		if (!/^[a-z0-9-]+$/.test(slug)) {
			return {
				available: false,
				error: "Slug can only contain lowercase letters, numbers, and hyphens",
			};
		}

		const [existingApp] = await db.select().from(app).where(eq(app.slug, slug));

		if (existingApp) {
			return { available: false, error: "This slug is already taken" };
		}

		return { available: true, error: null };
	} catch (error) {
		console.error("Error validating slug:", error);
		return { available: false, error: "Validation failed" };
	}
}
