import { desc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SubscribeDialog } from "@/components/app/news/subsribe-dialog";
import { NewsPost } from "@/components/app/news-post";
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
		<div className="max-w-5xl mx-auto px-4 py-8">
			<div className="flex flex-row justify-between items-end mb-4">
				<div className="flex flex-col gap-2">
					<h1 className="text-4xl font-bold">News</h1>
					<p className="text-gray-600">
						New updates and improvements on {dbApp.name}
					</p>
				</div>
				<SubscribeDialog appId={dbApp.id} appName={dbApp.name} />
			</div>

			<Suspense fallback={<NewsLoadingSkeleton />}>
				<NewsContent appId={dbApp.id} />
			</Suspense>
		</div>
	);
}

// Create a separate component for the news content
async function NewsContent({ appId }: { appId: string }) {
	const dbNews = await db
		.select()
		.from(news)
		.where(eq(news.appId, appId))
		.orderBy(desc(news.date));

	return (
		<div className="border-t border-gray-200">
			{dbNews.map((news, index) => (
				<div key={index}>
					<NewsPost
						date={news.date}
						title={news.title}
						content={news.content}
						image={news.image}
						tags={news.tags}
					/>
				</div>
			))}
		</div>
	);
}

// Loading fallback component using Shadcn Skeleton
function NewsLoadingSkeleton() {
	return (
		<div className="border-t border-gray-200 py-8 space-y-6">
			{[1, 2, 3].map((i) => (
				<div key={i} className="space-y-3">
					<Skeleton className="h-4 w-24 rounded" />
					<div className="flex justify-between items-center gap-2 mb-4">
						<Skeleton className="h-8 w-64 rounded" />
						<div className="flex gap-2">
							<Skeleton className="h-6 w-16 rounded-full" />
						</div>
					</div>
					<Skeleton className="h-32 w-full rounded mb-6" />
					<Skeleton className="h-4 w-full rounded mb-2" />
					<Skeleton className="h-4 w-3/4 rounded" />
				</div>
			))}
		</div>
	);
}
