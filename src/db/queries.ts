import { count, eq } from "drizzle-orm";
import { db } from "@/db/db";
import { app as appTable, feature, news, subscribe, upvote } from "@/db/schema";
import { type AppOverviewCardData } from "@/components/dashboard/global-app-card";

export async function getUserAppsOverview(userId: string): Promise<AppOverviewCardData[]> {
	const apps = await db
		.select()
		.from(appTable)
		.where(eq(appTable.userId, userId));

	if (apps.length === 0) {
		return [];
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

	return apps.map((app) => ({
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
}
