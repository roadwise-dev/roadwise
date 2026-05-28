"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/db";
import { subscribe } from "@/db/schema";

// Input validation schema
const subscribeSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.max(254, "Email is too long")
		.email("Please enter a valid email address")
		.transform((val) => val.trim().toLowerCase()),
	name: z
		.string()
		.min(1, "Name is required")
		.max(100, "Name is too long")
		.transform((val) => val.trim()),
	appId: z
		.string()
		.min(1, "App ID is required")
		.transform((val) => val.trim()),
	consent: z
		.boolean()
		.refine((val) => val === true, "You must consent to receive updates"),
});

interface SubscriptionData {
	email: string;
	name: string;
	appId: string;
	consent: boolean;
}

export async function subscribeToUpdates(data: SubscriptionData) {
	try {
		// Validate input data
		const result = subscribeSchema.safeParse(data);

		if (!result.success) {
			const errors = result.error.issues
				.map((issue) => issue.message)
				.join(", ");
			return {
				success: false,
				error: errors,
			};
		}

		const { email, name, appId } = result.data;

		// Check if subscription already exists
		const [existingSubscription] = await db
			.select()
			.from(subscribe)
			.where(and(eq(subscribe.appId, appId), eq(subscribe.email, email)));

		if (existingSubscription) {
			return {
				success: false,
				error: "This email is already subscribed to updates for this app",
			};
		}

		// Insert new subscription
		await db.insert(subscribe).values({
			name,
			email,
			appId,
		});

		return {
			success: true,
		};
	} catch (error) {
		console.error("Subscription error:", error);
		return {
			success: false,
			error: "Server error. Please try again later.",
		};
	}
}
