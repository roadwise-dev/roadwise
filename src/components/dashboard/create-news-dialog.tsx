"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { submitCreateNewsFormAction } from "@/actions/news";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NewsImageUpload } from "./news-image-upload";

interface CreateNewsDialogProps {
	slug: string;
}

export function CreateNewsDialog({ slug }: CreateNewsDialogProps) {
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (formData: FormData) => {
		setIsSubmitting(true);

		try {
			await submitCreateNewsFormAction(formData);
			toast.success("News post created successfully!");
			setOpen(false);
		} catch (error) {
			toast.error("Failed to create news post");
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="w-4 h-4 mr-2" />
					Create News Post
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Create News Post</DialogTitle>
					<DialogDescription>
						Add a new news post for your users. It will appear on your public
						portal.
					</DialogDescription>
				</DialogHeader>
				<form action={handleSubmit} className="space-y-4 pt-4">
					<input type="hidden" name="slug" value={slug} />
					<div className="space-y-2">
						<Label htmlFor="title">Title</Label>
						<Input
							id="title"
							name="title"
							placeholder="Enter news title"
							required
							maxLength={200}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="content">Content</Label>
						<Textarea
							id="content"
							name="content"
							placeholder="Write your news content..."
							required
							maxLength={5000}
							rows={6}
						/>
					</div>

					<div className="space-y-2">
						<Label>Cover Image (optional)</Label>
						<NewsImageUpload name="image" />
					</div>

					<div className="space-y-2">
						<Label htmlFor="tags">Tags (comma-separated)</Label>
						<Input
							id="tags"
							name="tags"
							placeholder="Feature, Update, Bug Fix"
						/>
					</div>

					<div className="flex justify-end gap-2 pt-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
							disabled={isSubmitting}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Creating..." : "Create Post"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
