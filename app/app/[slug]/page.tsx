import FeatureBoard from "@/components/implemented/feature-board";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/drizzle/db";
import { app, board } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // read route params
  const slug = (await params).slug;
  const [dbApp] = await db.select().from(app).where(eq(app.slug, slug));

  return {
    title: dbApp.name,
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const [dbApp] = await db.select().from(app).where(eq(app.slug, params.slug));

  if (!dbApp) {
    notFound();
  }

  const dbBoards = await db
    .select()
    .from(board)
    .where(eq(board.appId, dbApp.id))
    .orderBy(board.column);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div className="flex gap-4 items-center">
          <Avatar className="w-16 h-16 rounded-md">
            <AvatarImage src={dbApp.avatarUrl} alt={dbApp.name} />
            <AvatarFallback className="text-3xl font-semibold rounded-md">
              {dbApp.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{dbApp.name}</h1>
            <p className="text-gray-500">{dbApp.description}</p>
          </div>
        </div>
        <Button asChild>
          <Link href={dbApp.slug + "/feature-request"}>Request a feature</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 grow h-full">
        {dbBoards.map((board) => (
          <FeatureBoard key={board.id} id={board.id} name={board.name} />
        ))}
      </div>
    </div>
  );
}
