import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // ShadCN avatar component
import { Button } from "@/components/ui/button"; // ShadCN button component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // ShadCN components
import { db } from "@/lib/drizzle/db";
import { user } from "@/lib/drizzle/schema";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/dist/client/components/navigation";

export default async function Dashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const [drizzleUser] = await db.select().from(user);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={drizzleUser.avatarUrl}
              alt={drizzleUser.firstName}
            />
            <AvatarFallback>{drizzleUser.firstName}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-bold">
              {drizzleUser.firstName}
            </CardTitle>
            <p>Some email</p>
          </div>
        </CardHeader>
        <CardContent>
          <p>Welcome back, {drizzleUser.firstName}! </p>
          <p> Here’s your account information:</p>
          <div className="mt-4 space-y-2">
            <div>
              <span className="font-medium">Username: </span>
              <span>{drizzleUser.firstName}</span>
            </div>
          </div>
          <div className="mt-6">
            <Button className="w-full">Manage Your Apps</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
