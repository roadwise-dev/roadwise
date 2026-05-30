import { and, count, desc, eq, gte, sql } from "drizzle-orm";
import {
	Activity,
	Calendar,
	Heart,
	ListChecks,
	MessageSquare,
	TrendingUp,
	Users,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { db } from "@/db/db";
import { board, feature, news, upvote } from "@/db/schema";

export async function AppInsights({ appId }: { appId: string }) {
	const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

	const [
		[featureCount],
		[recentFeatures],
		[totalUpvotes],
		[recentUpvotes],
		topFeatures,
	] = await Promise.all([
		db.select({ count: count() }).from(feature).where(eq(feature.appId, appId)),
		db
			.select({ count: count() })
			.from(feature)
			.where(and(eq(feature.appId, appId), gte(feature.createdAt, oneWeekAgo))),
		db
			.select({ count: count() })
			.from(upvote)
			.innerJoin(feature, eq(upvote.featureId, feature.id))
			.where(eq(feature.appId, appId)),
		db
			.select({ count: count() })
			.from(upvote)
			.innerJoin(feature, eq(upvote.featureId, feature.id))
			.where(and(eq(feature.appId, appId), gte(upvote.createdAt, oneWeekAgo))),
		db
			.select({
				id: feature.id,
				title: feature.title,
				upvotes: feature.upvotes,
				boardName: board.name,
			})
			.from(feature)
			.leftJoin(board, eq(feature.boardId, board.id))
			.where(eq(feature.appId, appId))
			.orderBy(desc(feature.upvotes))
			.limit(3),
	]);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<TrendingUp className="w-5 h-5" />
					App Insights
				</CardTitle>
				<CardDescription>
					Key metrics and engagement this week
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="text-center">
						<div className="text-2xl font-bold">{recentFeatures.count}</div>
						<div className="text-xs text-muted-foreground">New Requests</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold">{recentUpvotes.count}</div>
						<div className="text-xs text-muted-foreground">New Upvotes</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold">{featureCount.count}</div>
						<div className="text-xs text-muted-foreground">Total Features</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold">{totalUpvotes.count}</div>
						<div className="text-xs text-muted-foreground">Total Upvotes</div>
					</div>
				</div>
				{topFeatures.length > 0 && (
					<div className="mt-4 pt-4 border-t">
						<h4 className="text-sm font-medium mb-2">Top requested</h4>
						<div className="space-y-1">
							{topFeatures.slice(0, 2).map((feat) => (
								<div
									key={feat.id}
									className="flex items-center justify-between text-sm"
								>
									<span className="truncate">{feat.title}</span>
									<Badge variant="outline" className="text-xs">
										{feat.upvotes} <Heart className="w-3 h-3 ml-1" />
									</Badge>
								</div>
							))}
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export async function AppActionItems({
	appId,
	slug,
}: {
	appId: string;
	slug: string;
}) {
	const [[newsCount], topFeatures] = await Promise.all([
		db.select({ count: count() }).from(news).where(eq(news.appId, appId)),
		db
			.select({
				id: feature.id,
				title: feature.title,
				upvotes: feature.upvotes,
			})
			.from(feature)
			.where(eq(feature.appId, appId))
			.orderBy(desc(feature.upvotes))
			.limit(1),
	]);

	if (topFeatures.length === 0 && newsCount.count > 0) return null;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<ListChecks className="w-5 h-5" />
					Suggested next steps
				</CardTitle>
				<CardDescription>
					Useful follow-ups based on current app activity
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{topFeatures.length > 0 && (
						<div className="flex items-start gap-3 rounded-lg border p-3">
							<MessageSquare className="w-4 h-4 mt-0.5 text-muted-foreground" />
							<div className="flex-1">
								<p className="text-sm font-medium">Most requested feature</p>
								<p className="text-xs text-muted-foreground">
									&quot;{topFeatures[0].title}&quot; has{" "}
									{topFeatures[0].upvotes} upvotes.
								</p>
							</div>
							<Button size="sm" variant="outline" asChild>
								<Link href={`/dashboard/${slug}/feedback`}>View feedback</Link>
							</Button>
						</div>
					)}
					{newsCount.count === 0 && (
						<div className="flex items-start gap-3 rounded-lg border p-3">
							<Calendar className="w-4 h-4 mt-0.5 text-muted-foreground" />
							<div className="flex-1">
								<p className="text-sm font-medium">Publish your first update</p>
								<p className="text-xs text-muted-foreground">
									Share product changes with subscribers.
								</p>
							</div>
							<Button size="sm" variant="outline" asChild>
								<Link href={`/dashboard/${slug}/news`}>Create news post</Link>
							</Button>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

export async function AppActivityFeed({ appId }: { appId: string }) {
	const recentActivity = await db
		.select({
			id: upvote.id,
			type: sql<string>`'upvote'`,
			content: feature.title,
			email: upvote.email,
			createdAt: upvote.createdAt,
			upvotes: feature.upvotes,
		})
		.from(upvote)
		.innerJoin(feature, eq(upvote.featureId, feature.id))
		.where(eq(feature.appId, appId))
		.orderBy(desc(upvote.createdAt))
		.limit(5);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Activity className="w-5 h-5" />
					Recent Activity
				</CardTitle>
				<CardDescription>Latest engagement from your community</CardDescription>
			</CardHeader>
			<CardContent>
				{recentActivity.length > 0 ? (
					<div className="space-y-3">
						{recentActivity.map((activity) => (
							<div key={activity.id} className="flex items-start gap-3 text-sm">
								<Heart className="w-4 h-4 mt-0.5 text-red-500" />
								<div className="flex-1">
									<p>
										<span className="font-medium">
											{activity.email.split("@")[0]}
										</span>{" "}
										upvoted
									</p>
									<p className="text-muted-foreground truncate">
										&quot;{activity.content}&quot;
									</p>
								</div>
								<span className="text-xs text-muted-foreground">
									{new Date(activity.createdAt).toLocaleDateString()}
								</span>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-8 text-muted-foreground">
						<Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
						<p className="text-sm">No recent activity</p>
						<p className="text-xs">
							Activity will appear here as users engage with your app
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export async function AppTopContributors({ appId }: { appId: string }) {
	const topContributors = await db
		.select({
			email: upvote.email,
			count: count(),
		})
		.from(upvote)
		.innerJoin(feature, eq(upvote.featureId, feature.id))
		.where(eq(feature.appId, appId))
		.groupBy(upvote.email)
		.orderBy(desc(count()))
		.limit(5);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Users className="w-5 h-5" />
					Top Contributors
				</CardTitle>
				<CardDescription>Most active community members</CardDescription>
			</CardHeader>
			<CardContent>
				{topContributors.length > 0 ? (
					<div className="space-y-3">
						{topContributors.map((contributor, i) => (
							<div
								key={contributor.email}
								className="flex items-center justify-between"
							>
								<div className="flex items-center gap-3">
									<div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
										{i + 1}
									</div>
									<span className="text-sm font-medium">
										{contributor.email.split("@")[0]}
									</span>
								</div>
								<Badge variant="outline" className="text-xs">
									{contributor.count} <Heart className="w-3 h-3 ml-1" />
								</Badge>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-8 text-muted-foreground">
						<Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
						<p className="text-sm">No contributors yet</p>
						<p className="text-xs">
							Contributors will appear as users upvote features
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
