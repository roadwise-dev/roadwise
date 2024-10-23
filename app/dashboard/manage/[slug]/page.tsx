import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/drizzle/db";
import { app } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const [dbApp] = await db.select().from(app).where(eq(app.slug, params.slug));

  if (!dbApp) {
    notFound();
  }

  return (
    <div className="container mx-auto space-y-6">
      {/* App Overview Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
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

        <Button variant="default">Update App</Button>
      </div>

      <Separator />

      {/* App Statistics Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold">App Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-sm font-semibold text-gray-700">
                Total Users
              </h3>
              <p className="text-2xl font-bold">2,310</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-sm font-semibold text-gray-700">
                Active Sessions
              </h3>
              <p className="text-2xl font-bold">45</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-sm font-semibold text-gray-700">
                New Signups
              </h3>
              <p className="text-2xl font-bold">32</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-sm font-semibold text-gray-700">
                Feedback Submitted
              </h3>
              <p className="text-2xl font-bold">128</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
