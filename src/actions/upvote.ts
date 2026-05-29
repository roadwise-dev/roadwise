"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/db";
import { upvote } from "@/db/schema";
import { upvoteSchema } from "@/lib/validations";

export async function upvoteWithEmail(_prevState: unknown, formData: FormData) {
	try {
		// Validate input data
		const result = upvoteSchema.safeParse({
			email: formData.get("email"),
			featureId: formData.get("feature-id"),
		});

		if (!result.success) {
			const errors = result.error.issues
				.map((issue) => issue.message)
				.join(", ");
			return {
				message: errors,
				success: false,
			};
		}

		const { email, featureId } = result.data;

		// Check for existing upvote
		const existingUpvote = await db
			.select()
			.from(upvote)
			.where(and(eq(upvote.email, email), eq(upvote.featureId, featureId)));

		if (existingUpvote.length > 0) {
			return {
				message: "You have already upvoted this feature.",
				success: false,
			};
		}

		// Insert upvote
		await db.insert(upvote).values({
			email,
			featureId,
		});

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
