import { NextRequest, NextResponse } from "next/server";
import { authenticateApiKey } from "@/lib/api-auth";
import { db } from "@/db/db";
import { app } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
	const auth = await authenticateApiKey(req);
	if (auth.error) {
		return NextResponse.json({ error: auth.error }, { status: auth.status });
	}

	try {
		// Non-null assertion is safe here because we check auth.error above
		const userApps = await db
			.select({
				id: app.id,
				name: app.name,
				slug: app.slug,
				description: app.description,
				domain: app.domain,
				isPublic: app.isPublic,
				createdAt: app.createdAt,
			})
			.from(app)
			.where(eq(app.userId, auth.userId!))
			.orderBy(desc(app.createdAt));

		return NextResponse.json({
			success: true,
			data: userApps,
		});
	} catch (error) {
		console.error("Failed to fetch apps via API:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
