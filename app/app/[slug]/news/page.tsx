import { NewsPost } from "@/components/app/news-post"
import { SubscribeDialog } from "@/components/app/news/subsribe-dialog"
import { db } from "@/lib/drizzle/db";
import { eq, desc } from "drizzle-orm";
import { app, news } from "@/lib/drizzle/schema";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const [dbApp] = await db.select().from(app).where(eq(app.slug, params.slug));

  if (!dbApp) {
    notFound();
  }

  const dbNews = await db
    .select()
    .from(news)
    .where(eq(news.appId, dbApp.id))
    .orderBy(desc(news.date));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-row justify-between items-end mb-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">News</h1>
          <p className="text-gray-600">New updates and improvements</p>
        </div>
        <SubscribeDialog />
      </div>

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
    </div>
  )
}
