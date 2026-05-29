import {
	ExternalLink,
	Heart,
	MessageSquare,
	Newspaper,
	Users,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export type AppOverviewCardData = {
	id: string;
	name: string;
	slug: string;
	domain: string;
	description: string | null;
	avatarUrl: string | null;
	isPublic: boolean | null;
	featureCount: number;
	upvoteCount: number;
	subscriberCount: number;
	newsCount: number;
};

type GlobalAppCardProps = {
	app: AppOverviewCardData;
};

export function GlobalAppCard({ app }: GlobalAppCardProps) {
	const metrics = [
		{
			label: "Requests",
			value: app.featureCount,
			icon: MessageSquare,
		},
		{
			label: "Upvotes",
			value: app.upvoteCount,
			icon: Heart,
		},
		{
			label: "Subscribers",
			value: app.subscriberCount,
			icon: Users,
		},
		{
			label: "News",
			value: app.newsCount,
			icon: Newspaper,
		},
	];

	return (
		<Card className="transition-shadow hover:shadow-md">
			<CardHeader className="gap-3">
				<div className="flex items-start justify-between gap-3">
					<div className="flex min-w-0 items-center gap-3">
						<Avatar className="size-11 rounded-lg">
							<AvatarImage src={app.avatarUrl || ""} alt={app.name} />
							<AvatarFallback className="rounded-lg text-base font-semibold">
								{app.name.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div className="min-w-0">
							<CardTitle className="truncate text-lg">{app.name}</CardTitle>
							<p className="truncate text-sm text-muted-foreground">
								{app.domain}
							</p>
						</div>
					</div>
					<Badge variant={app.isPublic ? "default" : "secondary"}>
						{app.isPublic ? "Public" : "Private"}
					</Badge>
				</div>
				<p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">
					{app.description || "No description yet."}
				</p>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-3">
					{metrics.map((metric) => (
						<div key={metric.label} className="rounded-lg border p-3">
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<metric.icon className="size-3.5" />
								{metric.label}
							</div>
							<div className="mt-1 text-lg font-semibold">
								{metric.value.toLocaleString()}
							</div>
						</div>
					))}
				</div>
			</CardContent>
			<CardFooter className="justify-between gap-2">
				<Button asChild>
					<Link href={`/dashboard/${app.slug}`}>Open dashboard</Link>
				</Button>
				<Button asChild variant="ghost">
					<Link href={`/app/${app.slug}`}>
						<ExternalLink className="size-4" />
						View live
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
