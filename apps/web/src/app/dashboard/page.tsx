import { auth } from "@clerk/nextjs/server";

import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { GlobalAppCard } from "@/components/dashboard/global-app-card";
import { GlobalStatsCards } from "@/components/dashboard/global-stats-cards";
import { ZeroAppState } from "@/components/dashboard/zero-app-state";
import { Button } from "@/components/ui/button";
import { getUserAppsOverview } from "@/db/queries";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default async function Dashboard() {
	const { userId } = await auth();

	if (!userId) {
		redirect("/login");
	}

	const appCards = await getUserAppsOverview(userId);

	if (appCards.length === 0) {
		return <ZeroAppState />;
	}

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
