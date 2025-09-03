"use server";

import { eq, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "../db/db";
import { app, news } from "../db/schema";

const createNewsSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .transform(val => val.trim()),
  content: z.string()
    .min(1, "Content is required")
    .max(5000, "Content must be less than 5000 characters")
    .transform(val => val.trim()),
  image: z.string().optional(),
  tags: z.string()
    .default("")
    .transform(val => val.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0)),
});

const updateNewsSchema = createNewsSchema.extend({
  id: z.string().min(1, "News ID is required"),
});

export async function createNewsAction(appSlug: string, formData: FormData) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return redirect("/login");
    }

    const [dbApp] = await db.select().from(app).where(eq(app.slug, appSlug));
    if (!dbApp) {
      return "App not found";
    }

    if (dbApp.userId !== userId) {
      return "Unauthorized";
    }

    const result = createNewsSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
      image: formData.get("image"),
      tags: formData.get("tags"),
    });

    if (!result.success) {
      const errors = result.error.issues.map(issue => issue.message).join(", ");
      return `Validation error: ${errors}`;
    }

    const { title, content, image, tags } = result.data;

    await db.insert(news).values({
      appId: dbApp.id,
      title,
      content,
      image: image || null,
      tags,
    });

    return redirect(`/dashboard/${appSlug}/news`);
  } catch (error) {
    console.error("Error creating news:", error);
    return "An unexpected error occurred. Please try again.";
  }
}

export async function updateNewsAction(appSlug: string, formData: FormData) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return redirect("/login");
    }

    const [dbApp] = await db.select().from(app).where(eq(app.slug, appSlug));
    if (!dbApp) {
      return "App not found";
    }

    if (dbApp.userId !== userId) {
      return "Unauthorized";
    }

    const result = updateNewsSchema.safeParse({
      id: formData.get("id"),
      title: formData.get("title"),
      content: formData.get("content"),
      image: formData.get("image"),
      tags: formData.get("tags"),
    });

    if (!result.success) {
      const errors = result.error.issues.map(issue => issue.message).join(", ");
      return `Validation error: ${errors}`;
    }

    const { id, title, content, image, tags } = result.data;

    const [existingNews] = await db
      .select()
      .from(news)
      .where(eq(news.id, id));

    if (!existingNews || existingNews.appId !== dbApp.id) {
      return "News not found or unauthorized";
    }

    await db
      .update(news)
      .set({
        title,
        content,
        image: image || null,
        tags,
      })
      .where(eq(news.id, id));

    return redirect(`/dashboard/${appSlug}/news`);
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

    const [dbApp] = await db.select().from(app).where(eq(app.slug, appSlug));
    if (!dbApp) {
      return "App not found";
    }

    if (dbApp.userId !== userId) {
      return "Unauthorized";
    }

    const [existingNews] = await db
      .select()
      .from(news)
      .where(eq(news.id, newsId));

    if (!existingNews || existingNews.appId !== dbApp.id) {
      return "News not found or unauthorized";
    }

    await db.delete(news).where(eq(news.id, newsId));

    return null; // Success
  } catch (error) {
    console.error("Error deleting news:", error);
    return "An unexpected error occurred. Please try again.";
  }
}

export async function getNewsForApp(appSlug: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized" };
    }

    const [dbApp] = await db.select().from(app).where(eq(app.slug, appSlug));
    if (!dbApp) {
      return { error: "App not found" };
    }

    if (dbApp.userId !== userId) {
      return { error: "Unauthorized" };
    }

    const dbNews = await db
      .select()
      .from(news)
      .where(eq(news.appId, dbApp.id))
      .orderBy(desc(news.date));

    return { news: dbNews };
  } catch (error) {
    console.error("Error fetching news:", error);
    return { error: "An unexpected error occurred" };
  }
}