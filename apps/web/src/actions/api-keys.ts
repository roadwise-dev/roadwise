"use server";

import { db } from "@/db/db";
import { apiKey } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { hashToken } from "@/lib/api-auth";

export async function createApiKey(name: string) {
	const { userId } = await auth();
	if (!userId) {
		return { error: "Unauthorized" };
	}

	if (!name || name.trim().length === 0) {
		return { error: "Name is required" };
	}

	// Generate a secure random token
	const rawToken = "rw_" + crypto.randomBytes(24).toString("hex");

	const keyHash = hashToken(rawToken);
	const hint =
		rawToken.substring(0, 7) + "..." + rawToken.substring(rawToken.length - 4);

	try {
		await db.insert(apiKey).values({
			userId,
			name: name.trim(),
			keyHash,
			hint,
		});

		revalidatePath("/dashboard/developer");

		// Return the raw token ONLY ONCE. It cannot be retrieved again.
		return { token: rawToken };
	} catch (error) {
		console.error("Failed to create API key:", error);
		return { error: "Failed to create API key" };
	}
}

export async function getApiKeys() {
	const { userId } = await auth();
	if (!userId) {
		return [];
	}

	const keys = await db
		.select({
			id: apiKey.id,
			name: apiKey.name,
			hint: apiKey.hint,
			createdAt: apiKey.createdAt,
			lastUsedAt: apiKey.lastUsedAt,
		})
		.from(apiKey)
		.where(eq(apiKey.userId, userId))
		.orderBy(desc(apiKey.createdAt));

	return keys;
}

export async function revokeApiKey(id: string) {
	const { userId } = await auth();
	if (!userId) {
		return { error: "Unauthorized" };
	}

	try {
		await db
			.delete(apiKey)
			.where(and(eq(apiKey.id, id), eq(apiKey.userId, userId)));

		revalidatePath("/dashboard/developer");
		return { success: true };
	} catch (error) {
		console.error("Failed to revoke API key:", error);
		return { error: "Failed to revoke API key" };
	}
}
