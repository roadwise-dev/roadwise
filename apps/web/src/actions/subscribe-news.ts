"use server";

import { and, eq } from "drizzle-orm";
import { db } from "@/db/db";
import { subscribe } from "@/db/schema";
import { subscribeSchema } from "@/lib/validations";

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
