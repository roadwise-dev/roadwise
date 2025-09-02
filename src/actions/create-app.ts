"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "../drizzle/db";
import { app } from "../drizzle/schema";
import { createClient } from "../supabase/server";

export async function createAppAction(formData: FormData) {
  const supabase = await createClient();

  // Authenticate user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return redirect("/login");
  }
  const userId = userData.user.id;

  // Retrieve form data
  const appName = formData.get("app-name") as string;
  const appSlug = formData.get("app-slug") as string;
  const appDescription = formData.get("app-description") as string;
  const appAvatar = formData.get("avatar") as File | null;

  // Check for an existing app with the same slug
  const [existingApp] = await db
    .select()
    .from(app)
    .where(eq(app.slug, appSlug));
  if (existingApp) {
    return "This app slug is already taken";
  }

  // Handle avatar upload if file exists
  let avatarUrl = null;
  if (appAvatar) {
    const avatarFilePath = `app/${Date.now()}-${appAvatar.name}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(avatarFilePath, appAvatar);

    if (uploadError) {
      console.error("Avatar upload error:", uploadError);
      return "Failed to upload avatar.";
    }

    // Generate public URL for the uploaded avatar
    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(avatarFilePath);
    avatarUrl = publicUrlData?.publicUrl;
  }

  // Insert new app into the database
  await db.insert(app).values({
    userId,
    name: appName,
    description: appDescription,
    domain: `${appSlug}.roadwiseapp.com`,
    slug: appSlug,
    avatarUrl: avatarUrl || "",
  });

  return redirect(`/dashboard/manage/${appSlug}`);
}
