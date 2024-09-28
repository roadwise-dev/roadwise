import AppCard from "@/components/dashboard/app-card";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/drizzle/db";
import { app } from "@/lib/drizzle/schema";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const apps = await db.select().from(app).where(eq(app.userId, data.user.id));

  return (
    <>
      {/* Create New App Button */}
      <div className="flex justify-end mb-6">
        <Button variant="outline">Create New App</Button>
      </div>

      {/* App Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </>
  );
}
