"use server";

import { db } from "@/lib/drizzle/db"; // Your database connection
import { app } from "@/lib/drizzle/schema"; // Your app schema
import { revalidatePath } from "next/cache";

// Server action to handle form submission
export async function createAppAction(formData: FormData) {
  const appName = formData.get("app-name") as string;
  const appDescription = formData.get("app-description") as string;
  // const appGroup = formData.get("app-group") as string;
  // const appAvatar = formData.get("avatar") as File | null; // Avatar file (if uploaded)

  // Insert new app into the database
  await db.insert(app).values({
    userId: "b8387cd9-71ee-4148-bdff-a3708fb541fd",
    name: appName,
    description: appDescription,
    domain: "example.com", // Default domain for now
    slug: "test2",
    avatarUrl: "test", // Store the avatar URL if uploaded, otherwise null
  });

  // Revalidate the path or page that lists the apps, if necessary
  revalidatePath("/dashboard");
}
