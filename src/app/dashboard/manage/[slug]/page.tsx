import { BoardsList } from "@/components/boards-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db/db";
import { app } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/login");
  }

  const params = await props.params;
  const [dbApp] = await db.select().from(app).where(eq(app.slug, params.slug));

  if (!dbApp) {
    notFound();
  }

  // Critical security fix: Verify app ownership
  if (dbApp.userId !== userId) {
    notFound(); // Return 404 instead of revealing the app exists
  }

  return (
    <div className="container mx-auto space-y-6">
      {/* App Overview Section */}
      <div className="flex justify-between items-end mb-8">
        <div className="flex items-center space-x-4">
          <Avatar className="w-14 h-14 rounded-md">
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

        <Button variant="default">Update App</Button>
      </div>

      <Separator />

      <BoardsList />
    </div>
  );
}
