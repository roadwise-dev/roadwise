"use client";

import { useUser } from "@clerk/nextjs";
import { upload } from "@vercel/blob/client";
import { Loader2, Upload } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { updateAppAvatarAction } from "@/actions/app-settings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const allowedLogoTypes = [
	"image/png",
	"image/jpeg",
	"image/webp",
	"image/svg+xml",
];
const maxLogoSizeBytes = 2 * 1024 * 1024;

interface AppAvatarUploadProps {
	slug: string;
	currentAvatarUrl: string | null;
	appName: string;
	variant?: "icon-only" | "settings";
}

export function AppAvatarUpload({
	slug,
	currentAvatarUrl,
	appName,
	variant = "icon-only",
}: AppAvatarUploadProps) {
	const { user } = useUser();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl);

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

		if (!allowedLogoTypes.includes(file.type)) {
			toast.error("Invalid file type", {
				description: "Please upload a PNG, JPG, WebP, or SVG logo.",
			});
			return;
		}

		if (file.size > maxLogoSizeBytes) {
			toast.error("File too large", {
				description: "Logo must be 2MB or smaller.",
			});
			return;
		}

		if (!user?.id) {
			toast.error("Authentication required", {
				description: "You must be signed in to upload a logo.",
			});
			return;
		}

		setIsUploading(true);
		const toastId = toast.loading("Uploading new logo...");

		try {
			const filename = sanitizeFilename(file.name);
			const pathname = `app-logos/${user.id}/${crypto.randomUUID()}-${filename}`;
			const blob = await upload(pathname, file, {
				access: "public",
				handleUploadUrl: "/api/upload",
				contentType: file.type,
			});

			const result = await updateAppAvatarAction(slug, blob.url);

			if (result.error) {
				toast.error("Upload failed", {
					id: toastId,
					description: result.error,
				});
				return;
			}

			setAvatarUrl(blob.url);
			toast.success("Logo updated successfully", { id: toastId });
		} catch (error) {
			toast.error("Upload failed", {
				id: toastId,
				description:
					error instanceof Error
						? error.message
						: "An unexpected error occurred.",
			});
		} finally {
			setIsUploading(false);
		}
	};

	const triggerUpload = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className="flex items-center gap-4">
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
				className={`group relative shrink-0 rounded-lg border bg-muted/40 transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60 ${
					variant === "settings" ? "size-20" : "size-12"
				}`}
				disabled={isUploading}
				onClick={triggerUpload}
			>
				<Avatar className="size-full rounded-lg after:rounded-lg">
					<AvatarImage
						className="rounded-lg object-cover"
						src={avatarUrl || ""}
						alt={appName}
					/>
					<AvatarFallback
						className={`rounded-lg bg-transparent font-semibold ${variant === "settings" ? "text-2xl" : "text-lg"}`}
					>
						{isUploading ? (
							<Loader2 className="size-5 animate-spin text-muted-foreground" />
						) : avatarUrl ? (
							appName.charAt(0).toUpperCase()
						) : (
							<Upload className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
						)}
					</AvatarFallback>
				</Avatar>

				{/* Hover overlay for icon-only variant when it has an image or is settings variant */}
				<div
					className={`absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity ${!isUploading && "group-hover:opacity-100"}`}
				>
					<Upload className="size-5 text-white" />
				</div>
			</button>

			{variant === "settings" && (
				<div className="flex flex-col gap-2">
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={triggerUpload}
						disabled={isUploading}
					>
						{isUploading ? "Uploading..." : "Change Logo"}
					</Button>
					<p className="text-xs text-muted-foreground">
						Recommended size: 256x256px.
						<br />
						Max size: 2MB.
					</p>
				</div>
			)}

			{/* Hidden input to pass the avatar URL to any enclosing form if needed */}
			{variant === "settings" && (
				<input type="hidden" name="avatarUrl" value={avatarUrl || ""} />
			)}
		</div>
	);
}
