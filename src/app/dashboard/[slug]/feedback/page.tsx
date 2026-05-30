import { auth } from "@clerk/nextjs/server";
import { count, desc, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import {
	type DashboardFeature,
	FeedbackList,
} from "@/components/dashboard/feedback-list";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db/db";
import { app, board, comment, feature } from "@/db/schema";

interface PageProps {
	params: Promise<{ slug: string }>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Feedback",
};

export default async function FeedbackPage({ params }: PageProps) {
	const { userId } = await auth();

	if (!userId) {
		redirect("/login");
	}

	const { slug } = await params;
	const [dbApp] = await db.select().from(app).where(eq(app.slug, slug));

	if (!dbApp) {
		notFound();
	}

	if (dbApp.userId !== userId) {
		notFound();
	}

	const [features, boards, commentCounts] = await Promise.all([
		db
			.select({
				id: feature.id,
				title: feature.title,
				description: feature.description,
				tags: feature.tags,
				name: feature.name,
				upvotes: feature.upvotes,
				createdAt: feature.createdAt,
				boardId: feature.boardId,
				boardName: board.name,
			})
			.from(feature)
			.leftJoin(board, eq(feature.boardId, board.id))
			.where(eq(feature.appId, dbApp.id))
			.orderBy(desc(feature.upvotes), desc(feature.createdAt)),
		db
			.select({
				id: board.id,
				name: board.name,
			})
			.from(board)
			.where(eq(board.appId, dbApp.id)),
		db
			.select({
				featureId: comment.featureId,
				count: count(),
			})
			.from(comment)
			.innerJoin(feature, eq(comment.featureId, feature.id))
			.where(eq(feature.appId, dbApp.id))
			.groupBy(comment.featureId),
	]);

	const commentCountByFeatureId = new Map(
		commentCounts.map((item) => [item.featureId, item.count]),
	);

	const dashboardFeatures: DashboardFeature[] = features.map((item) => ({
		id: item.id,
		title: item.title,
		description: item.description,
		tags: item.tags,
		name: item.name,
		upvotes: item.upvotes,
		createdAt: item.createdAt.toISOString(),
		boardId: item.boardId,
		boardName: item.boardName,
		commentCount: commentCountByFeatureId.get(item.id) ?? 0,
	}));

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
				<div className="space-y-1">
					<h1 className="text-2xl font-semibold tracking-tight">Feedback</h1>
					<p className="text-sm text-muted-foreground">
						Review feature requests submitted for {dbApp.name}.
					</p>
				</div>
				<Badge variant="secondary">
					{dashboardFeatures.length} request
					{dashboardFeatures.length === 1 ? "" : "s"}
				</Badge>
			</div>

			<FeedbackList
				appSlug={slug}
				features={dashboardFeatures}
				boards={boards}
			/>
		</div>
	);
}
