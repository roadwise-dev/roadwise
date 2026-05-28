"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../db/db";
import { board, feature } from "../db/schema";

interface RequestFeatureData {
	name: string;
	title: string;
	description: string;
	tags: string[];
	appId: string;
}

export async function createFeatureRequest(data: RequestFeatureData) {
	try {
		// Validate required fields
		if (!data.name || data.name.trim().length < 2) {
			return {
				success: false,
				error: "Name must be at least 2 characters long",
			};
		}

		if (!data.title || data.title.trim().length < 3) {
			return {
				success: false,
				error: "Feature title must be at least 3 characters long",
			};
		}

		if (!data.description || data.description.trim().length < 10) {
			return {
				success: false,
				error: "Description must be at least 10 characters long",
			};
		}

		if (!data.appId) {
			return {
				success: false,
				error: "App ID is required",
			};
		}

		// Find the "Unassigned" board for this app
		const [unassignedBoard] = await db
			.select()
			.from(board)
			.where(and(eq(board.appId, data.appId), eq(board.name, "Unassigned")))
			.limit(1);

		if (!unassignedBoard) {
			return {
				success: false,
				error: "No unassigned board found for this app",
			};
		}

		// Clean and validate tags
		const cleanTags = data.tags
			.filter((tag) => tag.trim().length > 0)
			.map((tag) => tag.trim().toLowerCase())
			.slice(0, 5); // Limit to 5 tags

		// Insert the feature
		const [newFeature] = await db
			.insert(feature)
			.values({
				boardId: unassignedBoard.id,
				title: data.title.trim(),
				description: data.description.trim(),
				tags: cleanTags,
				name: data.name.trim(),
				upvotes: 0,
			})
			.returning({ id: feature.id });

		return {
			success: true,
			featureId: newFeature.id,
		};
	} catch (error) {
		console.error("Error creating feature request:", error);
		return {
			success: false,
			error:
				"An error occurred while creating your feature request. Please try again.",
		};
	}
}
