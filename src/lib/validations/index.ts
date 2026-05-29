import { z } from "zod";

// --- App Settings Validations ---
export const updateVisibilitySchema = z.object({
	slug: z.string().min(1, "App slug is required"),
	isPublic: z.boolean(),
});

export const deleteAppSchema = z.object({
	slug: z.string().min(1, "App slug is required"),
});

export const updateAppDetailsSchema = z.object({
	slug: z.string().min(1, "App slug is required"),
	name: z
		.string()
		.min(1, "App name is required")
		.max(80, "App name must be less than 80 characters")
		.transform((val) => val.trim()),
	description: z
		.string()
		.max(240, "Description must be less than 240 characters")
		.optional()
		.or(z.literal(""))
		.transform((val) => (val ? val.trim() : null)),
	domain: z
		.string()
		.min(1, "Domain is required")
		.max(255, "Domain must be less than 255 characters")
		.regex(
			/^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,}$/,
			"Enter a valid domain",
		)
		.transform((val) => val.trim().toLowerCase()),
	avatarUrl: z
		.string()
		.max(2048, "Avatar URL must be less than 2048 characters")
		.transform((val) => val.trim()),
});

export const createAppSchema = z.object({
	appName: z
		.string()
		.min(1, "App name is required")
		.max(50, "App name must be less than 50 characters")
		.transform((val) => val.trim()),
	appSlug: z
		.string()
		.min(1, "App slug is required")
		.max(30, "App slug must be less than 30 characters")
		.regex(
			/^[a-z0-9-]+$/,
			"App slug can only contain lowercase letters, numbers, and hyphens",
		)
		.transform((val) => val.trim()),
	appDescription: z
		.string()
		.max(200, "Description must be less than 200 characters")
		.transform((val) => val.trim())
		.optional()
		.default(""),
	avatarUrl: z.string().optional().default(""),
	isPublic: z.boolean().default(true),
	emailNotifications: z.boolean().default(true),
});

// --- Board Validations ---
export const boardFormSchema = z.object({
	slug: z.string().min(1, "App slug is required"),
	name: z
		.string()
		.min(1, "Board name is required")
		.max(60, "Board name must be less than 60 characters")
		.transform((val) => val.trim()),
	column: z.coerce
		.number()
		.int("Column must be a whole number")
		.min(0, "Column must be zero or greater"),
});

export const boardMutationSchema = boardFormSchema.extend({
	boardId: z.string().min(1, "Board ID is required"),
});

export const deleteBoardSchema = z.object({
	slug: z.string().min(1, "App slug is required"),
	boardId: z.string().min(1, "Board ID is required"),
});

// --- News Validations ---
export const createNewsSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(100, "Title must be less than 100 characters")
		.transform((val) => val.trim()),
	content: z
		.string()
		.min(1, "Content is required")
		.max(5000, "Content must be less than 5000 characters")
		.transform((val) => val.trim()),
	image: z
		.string()
		.optional()
		.or(z.literal(""))
		.transform((val) => (val === "" ? undefined : val)),
	tags: z
		.string()
		.transform((val) => {
			if (!val.trim()) return [];
			return val
				.split(",")
				.map((tag) => tag.trim())
				.filter((tag) => tag.length > 0);
		})
		.default(() => []),
});

export const updateNewsSchema = createNewsSchema.extend({
	id: z.string().min(1, "News ID is required"),
});

export const newsSlugSchema = z.object({
	slug: z.string().min(1, "App slug is required"),
});

export const deleteNewsFormSchema = newsSlugSchema.extend({
	newsId: z.string().min(1, "News ID is required"),
});

// --- Subscription & Upvote Validations ---
export const subscribeSchema = z.object({
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

export const upvoteSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.max(254, "Email is too long")
		.email("Please enter a valid email address")
		.transform((val) => val.trim().toLowerCase()),
	featureId: z
		.string()
		.min(1, "Feature ID is required")
		.transform((val) => val.trim()),
});
