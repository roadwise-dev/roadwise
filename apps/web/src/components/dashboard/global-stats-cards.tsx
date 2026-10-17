import { AppWindow, Heart, MessageSquare, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type GlobalStatsCardsProps = {
	totalApps: number;
	totalFeatureRequests: number;
	totalUpvotes: number;
	totalSubscribers: number;
};

export function GlobalStatsCards({
	totalApps,
	totalFeatureRequests,
	totalUpvotes,
	totalSubscribers,
}: GlobalStatsCardsProps) {
	const stats = [
		{
			title: "Total Apps",
			value: totalApps,
			icon: AppWindow,
		},
		{
			title: "Feature Requests",
			value: totalFeatureRequests,
			icon: MessageSquare,
		},
		{
			title: "Upvotes",
			value: totalUpvotes,
			icon: Heart,
		},
		{
			title: "Subscribers",
			value: totalSubscribers,
			icon: Users,
		},
	];

	return (
		<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
			{stats.map((stat) => (
				<Card key={stat.title}>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
						<stat.icon className="size-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stat.value.toLocaleString()}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
