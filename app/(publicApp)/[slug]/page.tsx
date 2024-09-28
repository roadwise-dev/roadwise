import FeatureBoard from "@/components/implemented/feature-board";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/lib/drizzle/db";
import { app, board } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const [dbApp] = await db.select().from(app).where(eq(app.slug, params.slug));

  if (!dbApp) {
    notFound();
  }

  const dbBoards = await db
    .select()
    .from(board)
    .where(eq(board.appId, dbApp.id));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center">
        <Avatar className="w-14 h-14">
          <AvatarImage src={dbApp.avatarUrl} alt={dbApp.name} />
          <AvatarFallback className="text-2xl font-semibold">
            {dbApp.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{dbApp.name}</h1>
          <p className="text-gray-500">{dbApp.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow h-full">
        {dbBoards.map((board) => (
          <FeatureBoard key={board.id} id={board.id} name={board.name} />
        ))}
      </div>
    </div>
  );
}
