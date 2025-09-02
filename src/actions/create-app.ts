"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "../db/db";
import { app } from "../db/schema";

export async function createAppAction(formData: FormData) {
  // Authenticate user
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }

  // Retrieve form data
  const appName = formData.get("app-name") as string;
  const appSlug = formData.get("app-slug") as string;
  const appDescription = formData.get("app-description") as string;
  // Note: Avatar upload temporarily disabled - will be re-implemented with proper storage solution

  // Check for an existing app with the same slug
  const [existingApp] = await db
    .select()
    .from(app)
    .where(eq(app.slug, appSlug));
  if (existingApp) {
    return "This app slug is already taken";
  }

  // Insert new app into the database (without avatar for now)
  await db.insert(app).values({
    userId: userId, // This should map to user_id column in the schema
    name: appName,
    description: appDescription,
    domain: `${appSlug}.roadwiseapp.com`,
    slug: appSlug,
    avatarUrl: "", // Temporarily empty until we implement proper storage
  });

  return redirect(`/dashboard/manage/${appSlug}`);
}
