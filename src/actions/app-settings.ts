"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "../db/db";
import { app } from "../db/schema";

// Schema for updating app visibility
const updateVisibilitySchema = z.object({
	slug: z.string().min(1, "App slug is required"),
	isPublic: z.boolean(),
});

// Schema for deleting app
const deleteAppSchema = z.object({
	slug: z.string().min(1, "App slug is required"),
});

const updateAppDetailsSchema = z.object({
	slug: z.string().min(1, "App slug is required"),
	name: z
		.string()
		.min(1, "App name is required")
		.max(80, "App name must be less than 80 characters")
		.transform((val) => val.trim()),
	description: z
		.string()
		.max(240, "Description must be less than 240 characters")
		.optional()
		.or(z.literal(""))
		.transform((val) => (val ? val.trim() : null)),
	domain: z
		.string()
		.min(1, "Domain is required")
		.max(255, "Domain must be less than 255 characters")
		.regex(
			/^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,}$/,
			"Enter a valid domain",
		)
		.transform((val) => val.trim().toLowerCase()),
	avatarUrl: z
		.string()
		.max(2048, "Avatar URL must be less than 2048 characters")
		.transform((val) => val.trim()),
});

export async function updateAppDetailsAction(formData: FormData) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return redirect("/login");
		}

		const result = updateAppDetailsSchema.safeParse({
			slug: formData.get("slug"),
			name: formData.get("name"),
			description: formData.get("description"),
			domain: formData.get("domain"),
			avatarUrl: formData.get("avatarUrl"),
		});

		if (!result.success) {
			const errors = result.error.issues
				.map((issue) => issue.message)
				.join(", ");
			return `Validation error: ${errors}`;
		}

		const { slug, name, description, domain, avatarUrl } = result.data;
		const [existingApp] = await db.select().from(app).where(eq(app.slug, slug));

		if (!existingApp) {
			return "App not found";
		}

		if (existingApp.userId !== userId) {
			return "Unauthorized: You don't have permission to modify this app";
		}

		await db
			.update(app)
			.set({
				name,
				description,
				domain,
				avatarUrl,
			})
			.where(eq(app.slug, slug));

		revalidatePath(`/dashboard/${slug}`);
		revalidatePath(`/dashboard/${slug}/settings`);
		revalidatePath(`/app/${slug}`);

		return null;
	} catch (error) {
		console.error("Error updating app details:", error);
		return "An unexpected error occurred. Please try again.";
	}
}

export async function submitUpdateAppDetailsFormAction(formData: FormData) {
	await updateAppDetailsAction(formData);
}

export async function updateAppVisibilityAction(formData: FormData) {
	try {
		// Authenticate user
		const { userId } = await auth();
		if (!userId) {
			return redirect("/login");
		}

		// Validate input data
		const result = updateVisibilitySchema.safeParse({
			slug: formData.get("slug"),
			isPublic: formData.get("isPublic") === "true",
		});

		if (!result.success) {
			const errors = result.error.issues
				.map((issue) => issue.message)
				.join(", ");
			return `Validation error: ${errors}`;
		}

		const { slug, isPublic } = result.data;

		// Check if the app exists and belongs to the user
		const [existingApp] = await db.select().from(app).where(eq(app.slug, slug));

		if (!existingApp) {
			return "App not found";
		}

		if (existingApp.userId !== userId) {
			return "Unauthorized: You don't have permission to modify this app";
		}

		// Update app visibility
		await db.update(app).set({ isPublic }).where(eq(app.slug, slug));

		revalidatePath(`/dashboard/${slug}`);
		revalidatePath(`/dashboard/${slug}/settings`);
		revalidatePath(`/app/${slug}`);

		return null; // Success
	} catch (error) {
		console.error("Error updating app visibility:", error);
		return "An unexpected error occurred. Please try again.";
	}
}

export async function submitUpdateAppVisibilityFormAction(formData: FormData) {
	await updateAppVisibilityAction(formData);
}

export async function deleteAppAction(formData: FormData) {
	try {
		// Authenticate user
		const { userId } = await auth();
		if (!userId) {
			return redirect("/login");
		}

		// Validate input data
		const result = deleteAppSchema.safeParse({
			slug: formData.get("slug"),
		});

		if (!result.success) {
			const errors = result.error.issues
				.map((issue) => issue.message)
				.join(", ");
			return `Validation error: ${errors}`;
		}

		const { slug } = result.data;

		// Check if the app exists and belongs to the user
		const [existingApp] = await db.select().from(app).where(eq(app.slug, slug));

		if (!existingApp) {
			return "App not found";
		}

		if (existingApp.userId !== userId) {
			return "Unauthorized: You don't have permission to delete this app";
		}

		// Delete the app (cascade will handle related records)
		await db.delete(app).where(eq(app.slug, slug));

		return redirect("/dashboard");
	} catch (error) {
		console.error("Error deleting app:", error);
		return "An unexpected error occurred. Please try again.";
	}
}

export async function submitDeleteAppFormAction(formData: FormData) {
	await deleteAppAction(formData);
}
