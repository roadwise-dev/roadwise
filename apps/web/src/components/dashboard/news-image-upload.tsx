"use client";

import { useUser } from "@clerk/nextjs";
import { upload } from "@vercel/blob/client";
import { ImageIcon, Loader2, X } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const allowedImageTypes = [
	"image/png",
	"image/jpeg",
	"image/webp",
	"image/gif",
];
const maxImageSizeBytes = 5 * 1024 * 1024; // 5MB

interface NewsImageUploadProps {
	name?: string;
}

export function NewsImageUpload({ name = "image" }: NewsImageUploadProps) {
	const { user } = useUser();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const sanitizeFilename = (filename: string) => {
		const extension = filename.split(".").pop()?.toLowerCase() || "png";
		const basename = filename
			.replace(/\.[^/.]+$/, "")
			.toLowerCase()
			.replace(/[^a-z0-9-]/g, "-")
			.replace(/-+/g, "-")
			.replace(/^-|-$/g, "")
			.slice(0, 40);

		return `${basename || "image"}.${extension}`;
	};

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		event.target.value = "";

		if (!file) {
			return;
		}

		if (!allowedImageTypes.includes(file.type)) {
			toast.error("Invalid file type", {
				description: "Please upload a PNG, JPG, WebP, or GIF image.",
			});
			return;
		}

		if (file.size > maxImageSizeBytes) {
			toast.error("File too large", {
				description: "Image must be 5MB or smaller.",
			});
			return;
		}

		if (!user?.id) {
			toast.error("Authentication required", {
				description: "You must be signed in to upload an image.",
			});
			return;
		}

		setIsUploading(true);
		const toastId = toast.loading("Uploading image...");

		try {
			const filename = sanitizeFilename(file.name);
			const pathname = `news-images/${user.id}/${crypto.randomUUID()}-${filename}`;

			const blob = await upload(pathname, file, {
				access: "public",
				handleUploadUrl: "/api/upload",
				contentType: file.type,
			});

			setImageUrl(blob.url);
			toast.success("Image uploaded successfully", { id: toastId });
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

	const removeImage = () => {
		setImageUrl(null);
	};

	return (
		<div className="space-y-4">
			<input
				ref={fileInputRef}
				type="file"
				accept={allowedImageTypes.join(",")}
				className="sr-only"
				onChange={handleFileChange}
			/>

			{/* Hidden input to pass the image URL to the enclosing form */}
			<input type="hidden" name={name} value={imageUrl || ""} />

			{imageUrl ? (
				<div className="relative group rounded-md border overflow-hidden bg-muted/50 w-full aspect-video flex items-center justify-center">
					{/* biome-ignore lint/performance/noImgElement: blob url */}
					<img
						src={imageUrl}
						alt="News attachment"
						className="object-contain w-full h-full"
					/>
					<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
						<Button
							type="button"
							variant="secondary"
							size="sm"
							onClick={triggerUpload}
							disabled={isUploading}
						>
							{isUploading ? (
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
							) : (
								<ImageIcon className="w-4 h-4 mr-2" />
							)}
							Change
						</Button>
						<Button
							type="button"
							variant="destructive"
							size="sm"
							onClick={removeImage}
							disabled={isUploading}
						>
							<X className="w-4 h-4 mr-2" />
							Remove
						</Button>
					</div>
				</div>
			) : (
				<button
					type="button"
					onClick={triggerUpload}
					className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors cursor-pointer w-full ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
				>
					{isUploading ? (
						<>
							<Loader2 className="w-8 h-8 animate-spin" />
							<span className="text-sm font-medium">Uploading image...</span>
						</>
					) : (
						<>
							<div className="p-3 bg-muted rounded-full">
								<ImageIcon className="w-6 h-6" />
							</div>
							<div className="text-center">
								<span className="text-sm font-medium">
									Click to upload an image
								</span>
								<p className="text-xs mt-1">
									PNG, JPG, WebP, or GIF (max. 5MB)
								</p>
							</div>
						</>
					)}
				</button>
			)}
		</div>
	);
}
