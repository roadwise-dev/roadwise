import {
	ExternalLink,
	Heart,
	Lock,
	MessageSquare,
	Newspaper,
	Users,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
		<Card className="relative gap-3 overflow-hidden transition-all hover:shadow-md hover:border-primary/50 group">
			<Link href={`/dashboard/${app.slug}`} className="absolute inset-0 z-0">
				<span className="sr-only">Open dashboard for {app.name}</span>
			</Link>
			<CardHeader className="gap-3">
				<div className="flex min-w-0 items-start gap-3">
					<Avatar className="size-11 shrink-0 rounded-lg">
						<AvatarImage src={app.avatarUrl || ""} alt={app.name} />
						<AvatarFallback className="rounded-lg text-base font-semibold">
							{app.name.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="min-w-0 flex-1">
						<div className="flex items-center gap-2">
							<CardTitle className="truncate text-lg">{app.name}</CardTitle>
							{!app.isPublic && (
								<Lock
									className="size-4 shrink-0 text-muted-foreground"
									aria-label="Private"
								/>
							)}
						</div>
						<Link
							href={`/app/${app.slug}`}
							className="relative z-10 flex min-w-0 items-center gap-1 text-sm text-muted-foreground hover:text-primary hover:underline"
							title="View live"
						>
							<span className="truncate">{app.domain}</span>
							<ExternalLink className="size-3 shrink-0" />
						</Link>
					</div>
				</div>
				<p className="line-clamp-2 text-sm text-muted-foreground mt-1">
					{app.description || "No description yet."}
				</p>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap items-center gap-5 text-sm">
					{metrics.map((metric) => (
						<div
							key={metric.label}
							className="flex items-center gap-1.5 text-muted-foreground"
							title={metric.label}
						>
							<metric.icon className="size-4" />
							<span className="font-medium text-foreground">
								{metric.value.toLocaleString()}
							</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
