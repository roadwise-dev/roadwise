"use server";

import { db } from "../drizzle/db";
import { upvote } from "../drizzle/schema";

export async function upvoteWithEmail(prevState: any, formData: FormData) {
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
    await db.insert(upvote).values(data);
    return {
      message: "Your vote has been recorded successfully!",
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
