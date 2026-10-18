"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
	deleteAppSchema,
	updateAppDetailsSchema,
	updateVisibilitySchema,
} from "@/lib/validations";
import type { ThemeStyles } from "@/types/theme";
import { db } from "../db/db";
import { app } from "../db/schema";

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
			avatarUrl: formData.get("avatarUrl"),
		});

		if (!result.success) {
			const errors = result.error.issues
				.map((issue) => issue.message)
				.join(", ");
			return `Validation error: ${errors}`;
		}

		const { slug, name, description, avatarUrl } = result.data;
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

export async function updateAppAvatarAction(slug: string, avatarUrl: string) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return { error: "Unauthorized" };
		}

		const [existingApp] = await db.select().from(app).where(eq(app.slug, slug));
		if (!existingApp) {
			return { error: "App not found" };
		}

		if (existingApp.userId !== userId) {
			return {
				error: "Unauthorized: You don't have permission to modify this app",
			};
		}

		await db.update(app).set({ avatarUrl }).where(eq(app.slug, slug));

		revalidatePath(`/dashboard/${slug}`);
		revalidatePath(`/dashboard/${slug}/settings`);
		revalidatePath(`/app/${slug}`);

		return { success: true };
	} catch (error) {
		console.error("Error updating app avatar:", error);
		return { error: "An unexpected error occurred. Please try again." };
	}
}

export async function updateAppThemeAction(
	slug: string,
	theme: ThemeStyles | null,
) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return { error: "Unauthorized" };
		}

		const [existingApp] = await db.select().from(app).where(eq(app.slug, slug));
		if (!existingApp) {
			return { error: "App not found" };
		}

		if (existingApp.userId !== userId) {
			return {
				error: "Unauthorized: You don't have permission to modify this app",
			};
		}

		await db.update(app).set({ theme }).where(eq(app.slug, slug));

		revalidatePath(`/dashboard/${slug}`);
		revalidatePath(`/dashboard/${slug}/theme`);
		revalidatePath(`/app/${slug}`);

		return { success: true };
	} catch (error) {
		console.error("Error updating app theme:", error);
		return { error: "An unexpected error occurred. Please try again." };
	}
}

export async function submitUpdateAppDetailsFormAction(formData: FormData) {
	await updateAppDetailsAction(formData);
}

export async function submitUpdateAppVisibilityFormAction(formData: FormData) {
	await updateAppVisibilityAction(formData);
}

export async function submitDeleteAppFormAction(formData: FormData) {
	await deleteAppAction(formData);
}
