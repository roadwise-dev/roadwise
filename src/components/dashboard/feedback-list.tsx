"use client";

import { Heart, MessageSquare, Search } from "lucide-react";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export interface DashboardFeature {
	id: string;
	title: string;
	description: string;
	tags: string[];
	name: string;
	upvotes: number;
	createdAt: string;
	boardId: string | null;
	boardName: string | null;
	commentCount: number;
}

interface BoardOption {
	id: string;
	name: string;
}

interface FeedbackListProps {
	appSlug: string;
	features: DashboardFeature[];
	boards: BoardOption[];
}

export function FeedbackList({
	appSlug: _appSlug,
	features,
	boards,
}: FeedbackListProps) {
	const [query, setQuery] = useState("");
	const [boardFilter, setBoardFilter] = useState("all");

	const filteredFeatures = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		return features.filter((feature) => {
			const matchesQuery =
				normalizedQuery.length === 0 ||
				feature.title.toLowerCase().includes(normalizedQuery) ||
				feature.description.toLowerCase().includes(normalizedQuery) ||
				feature.name.toLowerCase().includes(normalizedQuery);

			const matchesBoard =
				boardFilter === "all" ||
				(boardFilter === "unassigned" && feature.boardId === null) ||
				feature.boardId === boardFilter;

			return matchesQuery && matchesBoard;
		});
	}, [features, query, boardFilter]);

	if (features.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>No feedback yet</CardTitle>
					<CardDescription>
						Feature requests submitted through the public portal will appear
						here.
					</CardDescription>
				</CardHeader>
			</Card>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-3 md:flex-row">
				<div className="relative flex-1">
					<Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search title, description, or requester"
						className="pl-8"
					/>
				</div>
				<select
					value={boardFilter}
					onChange={(event) => setBoardFilter(event.target.value)}
					className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
					aria-label="Filter by board"
				>
					<option value="all">All boards</option>
					<option value="unassigned">Unassigned</option>
					{boards.map((board) => (
						<option key={board.id} value={board.id}>
							{board.name}
						</option>
					))}
				</select>
			</div>

			{filteredFeatures.length === 0 ? (
				<Card>
					<CardContent className="py-8 text-center text-muted-foreground">
						No feature requests match the current filters.
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-4">
					{filteredFeatures.map((feature) => (
						<Card key={feature.id}>
							<CardHeader>
								<div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
									<div className="space-y-1">
										<CardTitle>{feature.title}</CardTitle>
										<CardDescription>
											Requested by {feature.name} on{" "}
											{new Date(feature.createdAt).toLocaleDateString()}
										</CardDescription>
									</div>
									<div className="flex gap-2">
										<Badge variant="outline">
											<Heart className="size-3" />
											{feature.upvotes}
										</Badge>
										<Badge variant="outline">
											<MessageSquare className="size-3" />
											{feature.commentCount}
										</Badge>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-3">
								<p className="text-sm text-muted-foreground">
									{feature.description}
								</p>
								<div className="flex flex-wrap items-center gap-2">
									<Badge variant="secondary">
										{feature.boardName ?? "Unassigned"}
									</Badge>
									{feature.tags.map((tag) => (
										<Badge key={tag} variant="outline">
											{tag}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
