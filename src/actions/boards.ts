"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db/db";
import { app, board } from "@/db/schema";
import {
	boardFormSchema,
	boardMutationSchema,
	deleteBoardSchema,
} from "@/lib/validations";

async function getOwnedApp(slug: string) {
	const { userId } = await auth();

	if (!userId) {
		redirect("/login");
	}

	const [dbApp] = await db.select().from(app).where(eq(app.slug, slug));

	if (!dbApp) {
		return null;
	}

	if (dbApp.userId !== userId) {
		return null;
	}

	return dbApp;
}

function revalidateBoardPaths(slug: string) {
	revalidatePath(`/dashboard/${slug}/boards`);
	revalidatePath(`/dashboard/${slug}`);
	revalidatePath(`/app/${slug}`);
}

export async function createBoardAction(formData: FormData) {
	try {
		const result = boardFormSchema.safeParse({
			slug: formData.get("slug"),
			name: formData.get("name"),
			column: formData.get("column"),
		});

		if (!result.success) {
			const errors = result.error.issues
				.map((issue) => issue.message)
				.join(", ");
			return `Validation error: ${errors}`;
		}

		const { slug, name, column } = result.data;
		const dbApp = await getOwnedApp(slug);

		if (!dbApp) {
			return "App not found or access denied";
		}

		await db.insert(board).values({
			appId: dbApp.id,
			name,
			column,
		});

		revalidateBoardPaths(slug);

		return null;
	} catch (error) {
		console.error("Error creating board:", error);
		return "An unexpected error occurred. Please try again.";
	}
}



export async function updateBoardAction(formData: FormData) {
	try {
		const result = boardMutationSchema.safeParse({
			slug: formData.get("slug"),
			boardId: formData.get("boardId"),
			name: formData.get("name"),
			column: formData.get("column"),
		});

		if (!result.success) {
			const errors = result.error.issues
				.map((issue) => issue.message)
				.join(", ");
			return `Validation error: ${errors}`;
		}

		const { slug, boardId, name, column } = result.data;
		const dbApp = await getOwnedApp(slug);

		if (!dbApp) {
			return "App not found or access denied";
		}

		const [existingBoard] = await db
			.select()
			.from(board)
			.where(and(eq(board.id, boardId), eq(board.appId, dbApp.id)));

		if (!existingBoard) {
			return "Board not found or access denied";
		}

		await db
			.update(board)
			.set({ name, column })
			.where(and(eq(board.id, boardId), eq(board.appId, dbApp.id)));

		revalidateBoardPaths(slug);

		return null;
	} catch (error) {
		console.error("Error updating board:", error);
		return "An unexpected error occurred. Please try again.";
	}
}



export async function deleteBoardAction(formData: FormData) {
	try {
		const result = deleteBoardSchema.safeParse({
			slug: formData.get("slug"),
			boardId: formData.get("boardId"),
		});

		if (!result.success) {
			const errors = result.error.issues
				.map((issue) => issue.message)
				.join(", ");
			return `Validation error: ${errors}`;
		}

		const { slug, boardId } = result.data;
		const dbApp = await getOwnedApp(slug);

		if (!dbApp) {
			return "App not found or access denied";
		}

		await db
			.delete(board)
			.where(and(eq(board.id, boardId), eq(board.appId, dbApp.id)));

		revalidateBoardPaths(slug);

		return null;
	} catch (error) {
		console.error("Error deleting board:", error);
		return "An unexpected error occurred. Please try again.";
	}
}

export async function submitCreateBoardFormAction(formData: FormData) {
	await createBoardAction(formData);
}

export async function submitUpdateBoardFormAction(formData: FormData) {
	await updateBoardAction(formData);
}

export async function submitDeleteBoardFormAction(formData: FormData) {
	await deleteBoardAction(formData);
}


