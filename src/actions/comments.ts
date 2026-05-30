"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "../db/db";
import { comment } from "../db/schema";

interface CreateCommentData {
	featureId: string;
	name: string;
	email: string;
	content: string;
}

interface CreateCommentResult {
	success: boolean;
	error?: string;
}

export async function createComment(
	data: CreateCommentData,
): Promise<CreateCommentResult> {
	try {
		// Validate required fields
		if (!data.name || data.name.trim().length < 2) {
			return {
				success: false,
				error: "Name must be at least 2 characters long",
			};
		}

		if (!data.email?.includes("@")) {
			return {
				success: false,
				error: "Please enter a valid email address",
			};
		}

		if (!data.content || data.content.trim().length < 5) {
			return {
				success: false,
				error: "Comment must be at least 5 characters long",
			};
		}

		if (!data.featureId) {
			return {
				success: false,
				error: "Feature ID is required",
			};
		}

		// Insert the comment
		await db.insert(comment).values({
			featureId: data.featureId,
			name: data.name.trim(),
			email: data.email.trim().toLowerCase(),
			content: data.content.trim(),
		});

		return {
			success: true,
		};
	} catch (error) {
		console.error("Error creating comment:", error);
		return {
			success: false,
			error: "An error occurred while adding your comment. Please try again.",
		};
	}
}

export async function getComments(featureId: string) {
	try {
		const comments = await db
			.select()
			.from(comment)
			.where(eq(comment.featureId, featureId))
			.orderBy(desc(comment.createdAt));

		return comments;
	} catch (error) {
		console.error("Error fetching comments:", error);
		return [];
	}
}
