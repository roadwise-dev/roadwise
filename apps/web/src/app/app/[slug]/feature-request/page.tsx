import { and, desc, eq, isNull } from "drizzle-orm";
import { notFound } from "next/navigation";
import RequestFeatureList from "@/components/implemented/request-feature-list";
import { db } from "@/db/db";
import { app, feature } from "@/db/schema";

export default async function Page(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const [dbApp] = await db.select().from(app).where(eq(app.slug, params.slug));

	if (!dbApp) {
		notFound();
	}

	const dbFeatures = await db
		.select()
		.from(feature)
		.where(and(eq(feature.appId, dbApp.id), isNull(feature.boardId)))
		.orderBy(desc(feature.upvotes));

	return (
		<RequestFeatureList
			features={dbFeatures}
			appId={dbApp.id}
			appName={dbApp.name}
		/>
	);
}
