import { auth } from "@clerk/nextjs/server";
import { type HandleUploadBody, handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";

const allowedContentTypes = [
	"image/png",
	"image/jpeg",
	"image/webp",
	"image/svg+xml",
];
const maxUploadSizeBytes = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
	const { userId } = await auth();

	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = (await request.json()) as HandleUploadBody;
		const jsonResponse = await handleUpload({
			body,
			request,
			onBeforeGenerateToken: async (pathname) => {
				if (
					!pathname.startsWith(`app-logos/${userId}/`) &&
					!pathname.startsWith(`news-images/${userId}/`)
				) {
					throw new Error("Invalid upload path");
				}

				return {
					allowedContentTypes,
					maximumSizeInBytes: maxUploadSizeBytes,
					addRandomSuffix: false,
					tokenPayload: JSON.stringify({ userId }),
				};
			},
		});

		return NextResponse.json(jsonResponse);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Logo upload failed";

		return NextResponse.json({ error: message }, { status: 400 });
	}
}
