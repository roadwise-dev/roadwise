import { auth } from "@clerk/nextjs/server";
import { count, eq } from "drizzle-orm";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
	type AppOverviewCardData,
	GlobalAppCard,
} from "@/components/dashboard/global-app-card";
import { GlobalStatsCards } from "@/components/dashboard/global-stats-cards";
import { ZeroAppState } from "@/components/dashboard/zero-app-state";
import { Button } from "@/components/ui/button";
import { db } from "@/db/db";
import { app as appTable, feature, news, subscribe, upvote } from "@/db/schema";

export default async function Dashboard() {
	const { userId } = await auth();

	if (!userId) {
		redirect("/login");
	}

	const apps = await db
		.select()
		.from(appTable)
		.where(eq(appTable.userId, userId));

	if (apps.length === 0) {
		return <ZeroAppState />;
	}

	const [featureCounts, upvoteCounts, subscriberCounts, newsCounts] =
		await Promise.all([
			db
				.select({
					appId: feature.appId,
					count: count(),
				})
				.from(feature)
				.innerJoin(appTable, eq(feature.appId, appTable.id))
				.where(eq(appTable.userId, userId))
				.groupBy(feature.appId),
			db
				.select({
					appId: feature.appId,
					count: count(),
				})
				.from(upvote)
				.innerJoin(feature, eq(upvote.featureId, feature.id))
				.innerJoin(appTable, eq(feature.appId, appTable.id))
				.where(eq(appTable.userId, userId))
				.groupBy(feature.appId),
			db
				.select({
					appId: subscribe.appId,
					count: count(),
				})
				.from(subscribe)
				.innerJoin(appTable, eq(subscribe.appId, appTable.id))
				.where(eq(appTable.userId, userId))
				.groupBy(subscribe.appId),
			db
				.select({
					appId: news.appId,
					count: count(),
				})
				.from(news)
				.innerJoin(appTable, eq(news.appId, appTable.id))
				.where(eq(appTable.userId, userId))
				.groupBy(news.appId),
		]);

	const featureCountByAppId = new Map(
		featureCounts.map((item) => [item.appId, item.count]),
	);
	const upvoteCountByAppId = new Map(
		upvoteCounts.map((item) => [item.appId, item.count]),
	);
	const subscriberCountByAppId = new Map(
		subscriberCounts.map((item) => [item.appId, item.count]),
	);
	const newsCountByAppId = new Map(
		newsCounts.map((item) => [item.appId, item.count]),
	);

	const appCards: AppOverviewCardData[] = apps.map((app) => ({
		id: app.id,
		name: app.name,
		slug: app.slug,
		domain: app.domain,
		description: app.description,
		avatarUrl: app.avatarUrl,
		isPublic: app.isPublic,
		featureCount: featureCountByAppId.get(app.id) ?? 0,
		upvoteCount: upvoteCountByAppId.get(app.id) ?? 0,
		subscriberCount: subscriberCountByAppId.get(app.id) ?? 0,
		newsCount: newsCountByAppId.get(app.id) ?? 0,
	}));

	const totalFeatureRequests = appCards.reduce(
		(total, app) => total + app.featureCount,
		0,
	);
	const totalUpvotes = appCards.reduce(
		(total, app) => total + app.upvoteCount,
		0,
	);
	const totalSubscribers = appCards.reduce(
		(total, app) => total + app.subscriberCount,
		0,
	);

	return (
		<div className="space-y-8">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div className="space-y-1">
					<h1 className="text-3xl font-bold tracking-tight">All Apps</h1>
					<p className="text-muted-foreground">
						Monitor feedback activity across your products.
					</p>
				</div>
				<Button asChild>
					<Link href="/dashboard/create">
						<Plus className="size-4" />
						Create App
					</Link>
				</Button>
			</div>

			<GlobalStatsCards
				totalApps={appCards.length}
				totalFeatureRequests={totalFeatureRequests}
				totalUpvotes={totalUpvotes}
				totalSubscribers={totalSubscribers}
			/>

			<section className="space-y-4">
				<div>
					<h2 className="text-lg font-semibold">Products</h2>
					<p className="text-sm text-muted-foreground">
						Open a product workspace or preview the public feedback portal.
					</p>
				</div>
				<div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
					{appCards.map((app) => (
						<GlobalAppCard key={app.id} app={app} />
					))}
				</div>
			</section>
		</div>
	);
}
