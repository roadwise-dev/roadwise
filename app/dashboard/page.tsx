import AppCard from "@/components/dashboard/app-card";
import CreateAppButton from "@/components/dashboard/create-app";
import { Search } from "@/components/dashboard/search";
import { db } from "@/lib/drizzle/db";
import { app } from "@/lib/drizzle/schema";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const apps = await db.select().from(app).where(eq(app.userId, data.user.id));

  return (
    <>
      {/* Create New App Button */}
      <div className="flex justify-end gap-4 mb-6">
        <Search />
        <CreateAppButton />
      </div>

      {/* App Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </>
  );
}
