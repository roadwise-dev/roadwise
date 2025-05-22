"use server";

import { db } from "@/lib/drizzle/db";
import { subscribe } from "@/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";

interface SubscriptionData {
  email: string;
  name: string;
  appId: string;
  consent: boolean;
}

export async function subscribeToUpdates(data: SubscriptionData) {
  try {
    // Validate consent
    if (!data.consent) {
      return {
        success: false,
        error: "You must consent to receive updates",
      };
    }
    const [existingSubscription] = await db
      .select()
      .from(subscribe)
      .where(and(eq(subscribe.appId, data.appId), eq(subscribe.email, data.email)));

    if (existingSubscription) {
      return {
        success: false,
        error: "This email is already subscribed to updates for this app",
      };
    }

    // Insert new subscription
    await db.insert(subscribe).values({
      name: data.name,
      email: data.email,
      appId: data.appId,
    });

    return {
      success: true,
      message: "Successfully subscribed to updates",
    };
  } catch (error) {
    console.error("Subscription error:", error);
    return {
      success: false,
      error: "Failed to subscribe. Please try again later.",
    };
  }
}
