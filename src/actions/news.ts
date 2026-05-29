"use server";

import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db/db";
import { app, news } from "@/db/schema";

const createNewsSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(100, "Title must be less than 100 characters")
		.transform((val) => val.trim()),
	content: z
		.string()
		.min(1, "Content is required")
		.max(5000, "Content must be less than 5000 characters")
		.transform((val) => val.trim()),
	image: z
		.string()
		.optional()
		.or(z.literal(""))
		.transform((val) => (val === "" ? undefined : val)),
	tags: z
		.string()
		.transform((val) => {
			if (!val.trim()) return [];
			return val
				.split(",")
				.map((tag) => tag.trim())
				.filter((tag) => tag.length > 0);
		})
		.default(() => []),
});

const updateNewsSchema = createNewsSchema.extend({
	id: z.string().min(1, "News ID is required"),
});

const newsSlugSchema = z.object({
	slug: z.string().min(1, "App slug is required"),
});

const deleteNewsFormSchema = newsSlugSchema.extend({
	newsId: z.string().min(1, "News ID is required"),
});

export async function createNewsAction(appSlug: string, formData: FormData) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return redirect("/login");
		}

		// Get app and verify ownership
		const [dbApp] = await db.select().from(app).where(eq(app.slug, appSlug));
		if (!dbApp || dbApp.userId !== userId) {
			return "App not found or access denied";
		}

		// Validate input data
		const result = createNewsSchema.safeParse({
			title: formData.get("title"),
			content: formData.get("content"),
			image: formData.get("image"),
			tags: formData.get("tags"),
		});

		if (!result.success) {
			const errors = result.error.issues
				.map((issue) => issue.message)
				.join(", ");
			return `Validation error: ${errors}`;
		}

		const { title, content, image, tags } = result.data;

		// Insert new news into the database
		await db.insert(news).values({
			appId: dbApp.id,
			title,
			content,
			image: image || null,
			tags,
		});

		revalidatePath(`/dashboard/${appSlug}/news`);
		revalidatePath(`/app/${appSlug}/news`);

		return null; // Success
	} catch (error) {
		console.error("Error creating news:", error);
		return "An unexpected error occurred. Please try again.";
	}
}

export async function createNewsFromFormAction(formData: FormData) {
	const result = newsSlugSchema.safeParse({
		slug: formData.get("slug"),
	});

	if (!result.success) {
		const errors = result.error.issues.map((issue) => issue.message).join(", ");
		return `Validation error: ${errors}`;
	}

	return createNewsAction(result.data.slug, formData);
}

export async function submitCreateNewsFormAction(formData: FormData) {
	await createNewsFromFormAction(formData);
}

export async function updateNewsAction(appSlug: string, formData: FormData) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return redirect("/login");
		}

		// Get app and verify ownership
		const [dbApp] = await db.select().from(app).where(eq(app.slug, appSlug));
		if (!dbApp || dbApp.userId !== userId) {
			return "App not found or access denied";
		}

		// Validate input data
		const result = updateNewsSchema.safeParse({
			id: formData.get("id"),
			title: formData.get("title"),
			content: formData.get("content"),
			image: formData.get("image"),
			tags: formData.get("tags"),
		});

		if (!result.success) {
			const errors = result.error.issues
				.map((issue) => issue.message)
				.join(", ");
			return `Validation error: ${errors}`;
		}

		const { id, title, content, image, tags } = result.data;

		// Verify news belongs to this app
		const [existingNews] = await db.select().from(news).where(eq(news.id, id));
		if (!existingNews || existingNews.appId !== dbApp.id) {
			return "News not found or access denied";
		}

		// Update news
		await db
			.update(news)
			.set({
				title,
				content,
				image: image || null,
				tags,
			})
			.where(eq(news.id, id));

		revalidatePath(`/dashboard/${appSlug}/news`);
		revalidatePath(`/app/${appSlug}/news`);

		return null; // Success
	} catch (error) {
		console.error("Error updating news:", error);
		return "An unexpected error occurred. Please try again.";
	}
}

export async function deleteNewsAction(appSlug: string, newsId: string) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return redirect("/login");
		}

		// Get app and verify ownership
		const [dbApp] = await db.select().from(app).where(eq(app.slug, appSlug));
		if (!dbApp || dbApp.userId !== userId) {
			return "App not found or access denied";
		}

		// Verify news belongs to this app
		const [existingNews] = await db
			.select()
			.from(news)
			.where(eq(news.id, newsId));
		if (!existingNews || existingNews.appId !== dbApp.id) {
			return "News not found or access denied";
		}

		// Delete news
		await db.delete(news).where(eq(news.id, newsId));

		revalidatePath(`/dashboard/${appSlug}/news`);
		revalidatePath(`/app/${appSlug}/news`);

		return null; // Success
	} catch (error) {
		console.error("Error deleting news:", error);
		return "An unexpected error occurred. Please try again.";
	}
}

export async function deleteNewsFromFormAction(formData: FormData) {
	const result = deleteNewsFormSchema.safeParse({
		slug: formData.get("slug"),
		newsId: formData.get("newsId"),
	});

	if (!result.success) {
		const errors = result.error.issues.map((issue) => issue.message).join(", ");
		return `Validation error: ${errors}`;
	}

	return deleteNewsAction(result.data.slug, result.data.newsId);
}

export async function submitDeleteNewsFormAction(formData: FormData) {
	await deleteNewsFromFormAction(formData);
}

export async function getNewsForApp(appSlug: string) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return null;
		}

		// Get app and verify ownership
		const [dbApp] = await db.select().from(app).where(eq(app.slug, appSlug));
		if (!dbApp || dbApp.userId !== userId) {
			return null;
		}

		// Get all news for this app
		const dbNews = await db
			.select()
			.from(news)
			.where(eq(news.appId, dbApp.id))
			.orderBy(desc(news.date));

		return { app: dbApp, news: dbNews };
	} catch (error) {
		console.error("Error fetching news:", error);
		return null;
	}
}
