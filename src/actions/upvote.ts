"use server";

import { db } from "@/db/db";
import { recordUpvote } from "@/db/upvotes";
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

		const inserted = await recordUpvote(db, email, featureId);

		if (!inserted) {
			return {
				message: "You have already upvoted this feature.",
				success: false,
			};
		}

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
