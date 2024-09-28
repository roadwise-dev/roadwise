import FeatureBoard from "@/components/implemented/feature-board";
import Navbar from "@/components/implemented/navbar";
import { db } from "@/lib/drizzle/db";
import { app, board } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function Page({ params }: { params: { slug: string } }) {
  const [dbApp] = await db.select().from(app).where(eq(app.slug, params.slug));
  const dbBoards = await db
    .select()
    .from(board)
    .where(eq(board.appId, dbApp.id));

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Navbar companyName={dbApp.name} />
        </div>
      </header>
      <main className="flex-grow flex justify-center p-8">
        <div className="max-w-screen-2xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {dbBoards.map((board) => (
              <FeatureBoard key={board.id} id={board.id} name={board.name} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
