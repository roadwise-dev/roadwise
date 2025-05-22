import RequestFeatureList from "@/components/implemented/request-feature-list";
import { eq, and } from "drizzle-orm";
import { db } from "@/lib/drizzle/db";
import { app, board, feature } from "@/lib/drizzle/schema";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const [dbApp] = await db.select().from(app).where(eq(app.slug, params.slug));

  if (!dbApp) {
    notFound();
  }

  const dbFeaturesRaw = await db
    .select()
    .from(feature)
    .innerJoin(board, eq(feature.boardId, board.id))
    .where(
      and(
        eq(board.appId, dbApp.id),
        eq(board.name, "Unassigned")
      )
    );

  // Extract features only
  const dbFeatures = dbFeaturesRaw.map((row) => row.feature);

  return <RequestFeatureList features={dbFeatures} />;
}
