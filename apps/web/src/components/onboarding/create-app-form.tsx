import { useUser } from "@clerk/nextjs";
import { upload } from "@vercel/blob/client";
import {
	ArrowLeft,
	CheckCircle2,
	Loader2,
	Upload,
	XCircle,
} from "lucide-react";
import Link from "next/link";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	createAppWithOnboardingAction,
	validateSlugAction,
} from "@/actions/create-app-with-onboarding";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const allowedLogoTypes = [
	"image/png",
	"image/jpeg",
	"image/webp",
	"image/svg+xml",
];
const maxLogoSizeBytes = 2 * 1024 * 1024;

type CreateAppData = {
	appName: string;
	appSlug: string;
	appDescription: string;
	avatarUrl: string;
	isSlugEdited: boolean;
	isPublic: boolean;
	emailNotifications: boolean;
};

type SlugAvailabilityStatus =
	| "idle"
	| "checking"
	| "available"
	| "unavailable"
	| "error";

const initialData: CreateAppData = {
	appName: "",
	appSlug: "",
	appDescription: "",
	avatarUrl: "",
	isSlugEdited: false,
	isPublic: true,
	emailNotifications: true,
};

function getSlugValidationError(slug: string) {
	if (slug.length > 30) {
		return "App slug must be less than 30 characters";
	}

	if (slug && !/^[a-z0-9-]+$/.test(slug)) {
		return "Slug can only contain lowercase letters, numbers, and hyphens";
	}

	return null;
}

function isNextRedirectError(error: unknown) {
	return (
		typeof error === "object" &&
		error !== null &&
		"digest" in error &&
		typeof error.digest === "string" &&
		error.digest.startsWith("NEXT_REDIRECT")
	);
}

export function CreateAppForm() {
	const { user } = useUser();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const slugCheckIdRef = useRef(0);
	const [data, setData] = useState<CreateAppData>(initialData);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [slugAvailability, setSlugAvailability] =
		useState<SlugAvailabilityStatus>("idle");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [isUploadingLogo, setIsUploadingLogo] = useState(false);
	const [logoUploadError, setLogoUploadError] = useState<string | null>(null);

	const updateData = (updates: Partial<CreateAppData>) => {
		setData((current) => ({ ...current, ...updates }));
		setSubmitError(null);
	};

	const generateSlug = useCallback((name: string) => {
		return name
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, "")
			.trim()
			.replace(/\s+/g, "-");
	}, []);

	const handleNameChange = (value: string) => {
		updateData({
			appName: value,
			appSlug: data.isSlugEdited ? data.appSlug : generateSlug(value),
		});
	};

	const handleSlugChange = (value: string) => {
		updateData({
			appSlug: value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
			isSlugEdited: true,
		});
	};

	const sanitizeFilename = (filename: string) => {
		const extension = filename.split(".").pop()?.toLowerCase() || "png";
		const basename = filename
			.replace(/\.[^/.]+$/, "")
			.toLowerCase()
			.replace(/[^a-z0-9-]/g, "-")
			.replace(/-+/g, "-")
			.replace(/^-|-$/g, "")
			.slice(0, 40);

		return `${basename || "logo"}.${extension}`;
	};

	const handleLogoChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		event.target.value = "";

		if (!file) {
			return;
		}

		setLogoUploadError(null);

		if (!allowedLogoTypes.includes(file.type)) {
			setLogoUploadError("Upload a PNG, JPG, WebP, or SVG logo.");
			return;
		}

		if (file.size > maxLogoSizeBytes) {
			setLogoUploadError("Logo must be 2MB or smaller.");
			return;
		}

		if (!user?.id) {
			setLogoUploadError("You must be signed in to upload a logo.");
			return;
		}

		setIsUploadingLogo(true);

		try {
			const filename = sanitizeFilename(file.name);
			const pathname = `app-logos/${user.id}/${crypto.randomUUID()}-${filename}`;
			const blob = await upload(pathname, file, {
				access: "public",
				handleUploadUrl: "/api/app-logo/upload",
				contentType: file.type,
			});

			updateData({ avatarUrl: blob.url });
		} catch (error) {
			setLogoUploadError(
				error instanceof Error ? error.message : "Logo upload failed.",
			);
		} finally {
			setIsUploadingLogo(false);
		}
	};

	useEffect(() => {
		const nextErrors: Record<string, string> = {};

		if (data.appName.length > 50) {
			nextErrors.appName = "App name must be less than 50 characters";
		}

		const slugError = getSlugValidationError(data.appSlug);
		if (slugError) {
			nextErrors.appSlug = slugError;
		}

		if (data.appDescription.length > 200) {
			nextErrors.appDescription =
				"Description must be less than 200 characters";
		}

		setErrors(nextErrors);
	}, [data.appName, data.appSlug, data.appDescription]);

	useEffect(() => {
		const slug = data.appSlug.trim();
		const slugError = getSlugValidationError(slug);

		if (!slug || slugError) {
			slugCheckIdRef.current += 1;
			setSlugAvailability("idle");
			return;
		}

		const checkId = slugCheckIdRef.current + 1;
		slugCheckIdRef.current = checkId;
		setSlugAvailability("checking");

		const timeoutId = window.setTimeout(async () => {
			const result = await validateSlugAction(slug);

			if (slugCheckIdRef.current !== checkId) {
				return;
			}

			if (result.available) {
				setSlugAvailability("available");
				return;
			}

			const isTaken = result.error === "This slug is already taken";
			setSlugAvailability(isTaken ? "unavailable" : "error");
		}, 400);

		return () => window.clearTimeout(timeoutId);
	}, [data.appSlug]);

	const canSubmit =
		Boolean(data.appName.trim()) &&
		Boolean(data.appSlug.trim()) &&
		Object.keys(errors).length === 0 &&
		slugAvailability === "available" &&
		!isSubmitting &&
		!isUploadingLogo;

	const slugErrorMessage =
		errors.appSlug ||
		(slugAvailability === "unavailable"
			? "This app slug is already taken"
			: slugAvailability === "error"
				? "Could not check slug availability. Try again."
				: null);

	const handleSubmit = async () => {
		if (!canSubmit) {
			return;
		}

		setIsSubmitting(true);
		setSubmitError(null);

		try {
			const formData = new FormData();
			formData.append("appName", data.appName);
			formData.append("appSlug", data.appSlug);
			formData.append("appDescription", data.appDescription);
			formData.append("avatarUrl", data.avatarUrl);
			formData.append("isPublic", data.isPublic.toString());
			formData.append("emailNotifications", data.emailNotifications.toString());

			const result = await createAppWithOnboardingAction(formData);
			if (typeof result === "string") {
				if (result === "This app slug is already taken") {
					setErrors((current) => ({ ...current, appSlug: result }));
					setSlugAvailability("unavailable");
				}
				setSubmitError(result);
			}
		} catch (error) {
			if (isNextRedirectError(error)) {
				return;
			}

			console.error("Error creating app:", error);
			setSubmitError("An unexpected error occurred. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="space-y-4">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-bold">Create your feedback app</h1>
				<p className="text-muted-foreground">
					Start collecting feedback with a public page for your product.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-3">
						<input
							ref={fileInputRef}
							type="file"
							accept={allowedLogoTypes.join(",")}
							className="sr-only"
							onChange={handleLogoChange}
						/>
						<button
							type="button"
							aria-label="Upload app logo"
							className="group relative size-12 shrink-0 rounded-lg border bg-muted/40 transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
							disabled={isUploadingLogo}
							onClick={() => fileInputRef.current?.click()}
						>
							<Avatar className="size-full rounded-lg after:rounded-lg">
								<AvatarImage className="rounded-lg" src={data.avatarUrl} />
								<AvatarFallback className="rounded-lg bg-transparent">
									<Upload className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
								</AvatarFallback>
							</Avatar>
						</button>
						<div className="min-w-0">
							<div className="truncate text-lg">
								{data.appName || "Your App Name"}
							</div>
							<div className="truncate text-sm text-muted-foreground">
								{data.appSlug || "your-app-slug"}.roadwiseapp.com
							</div>
						</div>
					</CardTitle>
					{(logoUploadError || isUploadingLogo) && (
						<p
							className={`text-xs ${
								logoUploadError ? "text-destructive" : "text-muted-foreground"
							}`}
						>
							{logoUploadError || "Uploading logo..."}
						</p>
					)}
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="app-name">App Name</Label>
						<Input
							id="app-name"
							placeholder="My Awesome Product"
							value={data.appName}
							onChange={(event) => handleNameChange(event.target.value)}
							className={errors.appName ? "border-destructive" : ""}
						/>
						{errors.appName && (
							<p className="text-sm text-destructive">{errors.appName}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="app-slug">URL Slug</Label>
						<div className="flex h-8">
							<div className="relative min-w-0 flex-1">
								<Input
									id="app-slug"
									value={data.appSlug}
									onChange={(event) => handleSlugChange(event.target.value)}
									className={`h-full rounded-r-none border-r-0 pr-8 ${
										slugErrorMessage ? "border-destructive" : ""
									}`}
								/>
								<div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
									{slugAvailability === "checking" && (
										<Loader2 className="size-3.5 animate-spin text-muted-foreground" />
									)}
									{slugAvailability === "available" && (
										<CheckCircle2 className="size-3.5 text-muted-foreground" />
									)}
									{(errors.appSlug ||
										slugAvailability === "unavailable" ||
										slugAvailability === "error") && (
										<XCircle className="size-3.5 text-destructive" />
									)}
								</div>
							</div>
							<div className="flex h-full shrink-0 items-center rounded-r-lg border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground">
								.roadwiseapp.com
							</div>
						</div>
						{slugErrorMessage && (
							<p className="text-sm text-destructive">{slugErrorMessage}</p>
						)}
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="app-description">Description (Optional)</Label>
						<Textarea
							id="app-description"
							placeholder="Brief description of your product..."
							value={data.appDescription}
							onChange={(event) =>
								updateData({ appDescription: event.target.value })
							}
							className={`resize-none ${
								errors.appDescription ? "border-destructive" : ""
							}`}
							rows={2}
						/>
						{errors.appDescription && (
							<p className="text-sm text-destructive">
								{errors.appDescription}
							</p>
						)}
						<p className="text-xs text-muted-foreground">
							{data.appDescription.length}/200 characters
						</p>
					</div>

					<div className="divide-y border-t">
						<div className="flex items-center justify-between gap-4 py-3.5">
							<div className="space-y-1">
								<div className="flex flex-wrap items-center gap-2">
									<Label htmlFor="public-page">Public feedback page</Label>
									<span className="text-xs text-muted-foreground">
										{data.isPublic ? "Public" : "Private"}
									</span>
								</div>
								<p className="text-sm text-muted-foreground">
									Anyone with the link can view and submit feedback.
								</p>
							</div>
							<Switch
								id="public-page"
								checked={data.isPublic}
								onCheckedChange={(checked: boolean) =>
									updateData({ isPublic: checked })
								}
							/>
						</div>

						<div className="flex items-center justify-between gap-4 pt-3.5">
							<div className="space-y-1">
								<div className="flex flex-wrap items-center gap-2">
									<Label htmlFor="email-notifications">
										Email notifications
									</Label>
									<span className="text-xs text-muted-foreground">
										{data.emailNotifications ? "Enabled" : "Disabled"}
									</span>
								</div>
								<p className="text-sm text-muted-foreground">
									Get an email when new feedback is submitted.
								</p>
							</div>
							<Switch
								id="email-notifications"
								checked={data.emailNotifications}
								onCheckedChange={(checked: boolean) =>
									updateData({ emailNotifications: checked })
								}
							/>
						</div>
					</div>

					{submitError && (
						<p className="text-sm text-destructive">{submitError}</p>
					)}
				</CardContent>
				<CardFooter className="justify-between">
					<Button variant="ghost" asChild>
						<Link href="/dashboard">
							<ArrowLeft className="size-4" />
							Back to dashboard
						</Link>
					</Button>
					<Button onClick={handleSubmit} disabled={!canSubmit}>
						{isSubmitting ? "Creating..." : "Create app"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
