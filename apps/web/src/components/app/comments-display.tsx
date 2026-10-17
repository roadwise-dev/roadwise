"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Comment {
	id: string;
	name: string;
	email: string;
	content: string;
	createdAt: Date;
}

interface CommentsDisplayProps {
	comments: Comment[];
}

export function CommentsDisplay({ comments }: CommentsDisplayProps) {
	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	};

	if (comments.length === 0) {
		return (
			<div className="text-center py-4">
				<p className="text-muted-foreground text-sm">
					No comments yet. Be the first to share your thoughts!
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-4 mb-6">
			{comments.map((comment) => (
				<Card key={comment.id}>
					<CardHeader className="p-3 pb-1">
						<div className="flex items-center">
							<Avatar className="h-6 w-6 mr-2">
								<AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div className="text-sm">
								<span className="font-medium">{comment.name}</span>
								<span className="text-muted-foreground">
									{" "}
									• {formatDate(comment.createdAt)}
								</span>
							</div>
						</div>
					</CardHeader>
					<CardContent className="p-3 pt-1">
						<p className="text-sm">{comment.content}</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
