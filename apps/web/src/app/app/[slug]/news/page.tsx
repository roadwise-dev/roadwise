import { desc, eq } from "drizzle-orm";
import { Newspaper } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SubscribeDialog } from "@/components/app/news/subsribe-dialog";
import { NewsPost } from "@/components/app/news-post";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db/db";
import { app, news } from "@/db/schema";

export default async function Page(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const [dbApp] = await db.select().from(app).where(eq(app.slug, params.slug));

	if (!dbApp) {
		notFound();
	}

	return (
		<div className="w-full pb-8">
			<div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-bold">News</h1>
					<p className="text-muted-foreground">
						New updates and improvements on {dbApp.name}
					</p>
				</div>
				<div className="lg:hidden">
					<SubscribeDialog appId={dbApp.id} appName={dbApp.name} />
				</div>
			</div>

			<Suspense fallback={<NewsLoadingSkeleton />}>
				<NewsContent appId={dbApp.id} appName={dbApp.name} />
			</Suspense>
		</div>
	);
}

async function NewsContent({
	appId,
	appName,
}: {
	appId: string;
	appName: string;
}) {
	const dbNews = await db
		.select()
		.from(news)
		.where(eq(news.appId, appId))
		.orderBy(desc(news.date));

	return (
		<div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
			<section aria-label="Updates" className="min-w-0 space-y-8">
				{dbNews.length === 0 ? (
					<div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
						<Newspaper
							aria-hidden="true"
							className="mx-auto mb-4 size-6 text-muted-foreground"
						/>
						<h2 className="mb-2 text-lg font-semibold">No updates yet</h2>
						<p className="mx-auto max-w-sm text-sm leading-6 text-muted-foreground">
							Updates from {appName} will appear here. Subscribe to get
							notified.
						</p>
					</div>
				) : (
					dbNews.map((post) => (
						<NewsPost
							key={post.id}
							id={`news-${post.id}`}
							date={post.date}
							title={post.title}
							content={post.content}
							image={post.image}
							tags={post.tags}
						/>
					))
				)}
			</section>

			<aside className="hidden space-y-8 lg:sticky lg:top-24 lg:block">
				<Card>
					<CardHeader>
						<h2 className="font-semibold">Stay up to date</h2>
						<CardDescription>
							Get notified when {appName} posts an update.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<SubscribeDialog
							appId={appId}
							appName={appName}
							className="w-full"
						/>
					</CardContent>
				</Card>

				{dbNews.length > 0 && (
					<nav aria-label="Recent updates">
						<h2 className="mb-3 px-3 text-sm font-semibold">Recent updates</h2>
						<ul className="space-y-1">
							{dbNews.slice(0, 5).map((post) => (
								<li key={post.id}>
									<a
										href={`#news-${post.id}`}
										className="block rounded-lg px-3 py-2 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
									>
										<time
											dateTime={post.date.toISOString()}
											className="block text-xs text-muted-foreground"
										>
											{post.date.toLocaleDateString("en-US", {
												day: "2-digit",
												month: "short",
												year: "numeric",
											})}
										</time>
										<span className="mt-1 line-clamp-2 break-words text-sm font-medium">
											{post.title}
										</span>
									</a>
								</li>
							))}
						</ul>
					</nav>
				)}
			</aside>
		</div>
	);
}

function NewsLoadingSkeleton() {
	return (
		<div
			role="status"
			aria-busy="true"
			aria-label="Loading updates"
			className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12"
		>
			<div className="min-w-0 space-y-8" aria-hidden="true">
				{[1, 2, 3].map((val) => (
					<div key={val} className="space-y-4">
						<Skeleton className="h-4 w-24 animate-none" />
						<Skeleton className="h-8 w-2/3 animate-none" />
						<Skeleton className="h-48 w-full animate-none" />
						<Skeleton className="h-4 w-full animate-none" />
						<Skeleton className="h-4 w-3/4 animate-none" />
					</div>
				))}
			</div>
			<Skeleton
				aria-hidden="true"
				className="hidden h-36 animate-none rounded-xl lg:block"
			/>
		</div>
	);
}
