"use server";

import { db } from "@/db/db";
import { upvote } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function upvoteWithEmail(prevState: unknown, formData: FormData) {
  const email = formData.get("email");
  const featureId = formData.get("feature-id");

  if (!email || !featureId) {
    return {
      message: "Missing email or feature ID",
      success: false,
    };
  }

  const data = {
    email: email.toString(),
    featureId: featureId.toString(),
  };

  try {
    const existingUpvote = await db
      .select()
      .from(upvote)
      .where(
        and(eq(upvote.email, data.email), eq(upvote.featureId, data.featureId)),
      );
    if (existingUpvote.length > 0) {
      return {
        message: "You have already upvoted this feature.",
        success: false,
      };
    }

    await db.insert(upvote).values(data);

    return {
      message: "",
      success: true,
    };
  } catch (error) {
    console.error("Error inserting upvote:", error);
    return {
      message:
        "An error occurred while processing your vote. Please try again.",
      success: false,
    };
  }
}
