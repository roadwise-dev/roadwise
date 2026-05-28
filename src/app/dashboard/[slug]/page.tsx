import { auth } from "@clerk/nextjs/server";
import { and, count, desc, eq, gte, sql } from "drizzle-orm";
import {
	Activity,
	AlertCircle,
	Calendar,
	ExternalLink,
	Eye,
	EyeOff,
	Heart,
	MessageSquare,
	TrendingUp,
	Users,
} from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { app, board, feature, news, upvote } from "@/db/schema";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export default async function AppOverviewPage({ params }: PageProps) {
	const { userId } = await auth();

	if (!userId) {
		redirect("/login");
	}

	const { slug } = await params;
	const [dbApp] = await db.select().from(app).where(eq(app.slug, slug));

	if (!dbApp) {
		notFound();
	}

	// Verify app ownership
	if (dbApp.userId !== userId) {
		notFound();
	}

	// Get comprehensive app statistics
	const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

	// Basic counts
	const [featureCount] = await db
		.select({ count: count() })
		.from(feature)
		.where(eq(feature.appId, dbApp.id));

	const [newsCount] = await db
		.select({ count: count() })
		.from(news)
		.where(eq(news.appId, dbApp.id));

	// Recent activity counts (last 7 days)
	const [recentFeatures] = await db
		.select({ count: count() })
		.from(feature)
		.where(
			and(eq(feature.appId, dbApp.id), gte(feature.createdAt, oneWeekAgo)),
		);

	const [totalUpvotes] = await db
		.select({ count: count() })
		.from(upvote)
		.innerJoin(feature, eq(upvote.featureId, feature.id))
		.where(eq(feature.appId, dbApp.id));

	const [recentUpvotes] = await db
		.select({ count: count() })
		.from(upvote)
		.innerJoin(feature, eq(upvote.featureId, feature.id))
		.where(and(eq(feature.appId, dbApp.id), gte(upvote.createdAt, oneWeekAgo)));

	// Top requested features
	const topFeatures = await db
		.select({
			id: feature.id,
			title: feature.title,
			upvotes: feature.upvotes,
			boardName: board.name,
		})
		.from(feature)
		.leftJoin(board, eq(feature.boardId, board.id))
		.where(eq(feature.appId, dbApp.id))
		.orderBy(desc(feature.upvotes))
		.limit(3);

	// Recent activity
	const recentActivity = await db
		.select({
			type: sql<string>`'upvote'`,
			content: feature.title,
			email: upvote.email,
			createdAt: upvote.createdAt,
			upvotes: feature.upvotes,
		})
		.from(upvote)
		.innerJoin(feature, eq(upvote.featureId, feature.id))
		.where(eq(feature.appId, dbApp.id))
		.orderBy(desc(upvote.createdAt))
		.limit(5);

	// Top contributors (most active upvoters)
	const topContributors = await db
		.select({
			email: upvote.email,
			count: count(),
		})
		.from(upvote)
		.innerJoin(feature, eq(upvote.featureId, feature.id))
		.where(eq(feature.appId, dbApp.id))
		.groupBy(upvote.email)
		.orderBy(desc(count()))
		.limit(5);

	const upvoteGrowth =
		recentUpvotes.count > 0
			? Math.round(
					(recentUpvotes.count /
						Math.max(totalUpvotes.count - recentUpvotes.count, 1)) *
						100,
				)
			: 0;

	return (
		<div className="space-y-6">
			{/* Streamlined Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<Avatar className="w-12 h-12 rounded-lg">
						<AvatarImage src={dbApp.avatarUrl || ""} alt={dbApp.name} />
						<AvatarFallback className="text-lg font-semibold rounded-lg">
							{dbApp.name.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div>
						<div className="flex items-center gap-3">
							<h1 className="text-2xl font-bold tracking-tight">
								{dbApp.name}
							</h1>
						</div>
						<div className="flex items-center gap-3 mt-1">
							<p className="text-sm text-muted-foreground">
								{dbApp.description || "No description"}
							</p>
							<Link
								href={`/app/${dbApp.slug}`}
								className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
							>
								<ExternalLink className="w-3 h-3" />
								View Live
							</Link>
						</div>
					</div>
				</div>
				<Badge variant={dbApp.isPublic ? "default" : "secondary"}>
					{dbApp.isPublic ? (
						<>
							<Eye className="w-3 h-3 mr-1" />
							Public
						</>
					) : (
						<>
							<EyeOff className="w-3 h-3 mr-1" />
							Private
						</>
					)}
				</Badge>
			</div>

			{/* App Insights */}
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
							<div className="text-xs text-muted-foreground">
								Total Features
							</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">
								+{upvoteGrowth}%
							</div>
							<div className="text-xs text-muted-foreground">Growth</div>
						</div>
					</div>
					{topFeatures.length > 0 && (
						<div className="mt-4 pt-4 border-t">
							<h4 className="text-sm font-medium mb-2">🔥 Top Requested</h4>
							<div className="space-y-1">
								{topFeatures.slice(0, 2).map((feature) => (
									<div
										key={feature.id}
										className="flex items-center justify-between text-sm"
									>
										<span className="truncate">{feature.title}</span>
										<Badge variant="outline" className="text-xs">
											{feature.upvotes} <Heart className="w-3 h-3 ml-1" />
										</Badge>
									</div>
								))}
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Action Items */}
			{(topFeatures.length > 0 || newsCount.count === 0) && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<AlertCircle className="w-5 h-5" />
							Action Items
						</CardTitle>
						<CardDescription>Things that need your attention</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{topFeatures.length > 0 && (
								<div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
									<MessageSquare className="w-4 h-4 mt-0.5 text-blue-600" />
									<div className="flex-1">
										<p className="text-sm font-medium">
											High-priority feature request
										</p>
										<p className="text-xs text-muted-foreground">
											&quot;{topFeatures[0].title}&quot; has{" "}
											{topFeatures[0].upvotes} upvotes - consider prioritizing
										</p>
									</div>
									<Button size="sm" variant="outline" asChild>
										<Link href={`/dashboard/${slug}/feedback`}>Review</Link>
									</Button>
								</div>
							)}
							{newsCount.count === 0 && (
								<div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
									<Calendar className="w-4 h-4 mt-0.5 text-yellow-600" />
									<div className="flex-1">
										<p className="text-sm font-medium">No news posts yet</p>
										<p className="text-xs text-muted-foreground">
											Keep your users engaged with updates and announcements
										</p>
									</div>
									<Button size="sm" variant="outline" asChild>
										<Link href={`/dashboard/${slug}/news`}>Create Post</Link>
									</Button>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Activity and Contributors */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Activity */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Activity className="w-5 h-5" />
							Recent Activity
						</CardTitle>
						<CardDescription>
							Latest engagement from your community
						</CardDescription>
					</CardHeader>
					<CardContent>
						{recentActivity.length > 0 ? (
							<div className="space-y-3">
								{recentActivity.map((activity, i) => (
									<div key={i} className="flex items-start gap-3 text-sm">
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

				{/* Top Contributors */}
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
			</div>
		</div>
	);
}
