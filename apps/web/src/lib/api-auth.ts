import { db } from "@/db/db";
import { apiKey } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export function hashToken(token: string) {
	return crypto.createHash("sha256").update(token).digest("hex");
}

export async function authenticateApiKey(req: NextRequest) {
	const authHeader = req.headers.get("Authorization");
	
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return { error: "Missing or invalid Authorization header. Format must be 'Bearer <token>'", status: 401 };
	}

	const token = authHeader.split(" ")[1];
	if (!token) {
		return { error: "Missing token", status: 401 };
	}

	const keyHash = hashToken(token);

	try {
		const result = await db
			.select({ id: apiKey.id, userId: apiKey.userId })
			.from(apiKey)
			.where(eq(apiKey.keyHash, keyHash))
			.limit(1);

		const keyRecord = result[0];

		if (!keyRecord) {
			return { error: "Invalid API key", status: 401 };
		}

		// Update lastUsedAt asynchronously (don't await to save latency)
		db.update(apiKey)
			.set({ lastUsedAt: new Date() })
			.where(eq(apiKey.id, keyRecord.id))
			.execute()
			.catch(console.error);

		return { userId: keyRecord.userId };
	} catch (error) {
		console.error("API Auth Error:", error);
		return { error: "Internal server error during authentication", status: 500 };
	}
}

// Helper to quickly reject unauthorized requests
export function unauthorized(message = "Unauthorized") {
	return NextResponse.json({ error: message }, { status: 401 });
}
