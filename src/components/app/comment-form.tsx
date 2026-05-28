"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createComment } from "@/actions/comments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserData } from "@/hooks/use-user-data";

interface CommentFormProps {
	featureId: string;
	onCommentAdded: () => void;
}

export function CommentForm({ featureId, onCommentAdded }: CommentFormProps) {
	const { userData, isLoaded, updateUserData } = useUserData();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [content, setContent] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Update form when userData loads
	useEffect(() => {
		if (isLoaded) {
			setName(userData.name);
			setEmail(userData.email);
		}
	}, [isLoaded, userData]);

	const handleNameChange = (value: string) => {
		setName(value);
		updateUserData({ name: value });
	};

	const handleEmailChange = (value: string) => {
		setEmail(value);
		updateUserData({ email: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!name.trim() || !email.trim() || !content.trim()) {
			toast("Please fill in all fields", {
				description: "Name, email, and comment are required",
			});
			return;
		}

		setIsSubmitting(true);

		const result = await createComment({
			featureId,
			name: name.trim(),
			email: email.trim(),
			content: content.trim(),
		});

		if (result.success) {
			toast("Comment added successfully!", {
				description: "Your comment has been added to this feature request",
			});
			setContent("");
			onCommentAdded();
		} else {
			toast("Failed to add comment", {
				description: result.error,
			});
		}

		setIsSubmitting(false);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-2">
			<h3 className="text-base font-medium mb-2">Add a comment</h3>
			<Input
				placeholder="Name"
				value={name}
				onChange={(e) => handleNameChange(e.target.value)}
				required
			/>
			<Input
				placeholder="Email"
				type="email"
				value={email}
				onChange={(e) => handleEmailChange(e.target.value)}
				required
			/>
			<Textarea
				placeholder="Share your thoughts on this feature request..."
				className="min-h-[80px]"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				required
			/>
			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Adding comment..." : "Submit Comment"}
			</Button>
		</form>
	);
}
