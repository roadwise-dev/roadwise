import { db } from "@/db/db"
import { app } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ClientSidebar } from "@/components/client-sidebar"
import { SiteHeader } from "@/components/site-header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/login")
  }

  // Get user's apps for the sidebar
  const apps = await db.select().from(app).where(eq(app.userId, userId))

  return (
    <SidebarProvider>
      <ClientSidebar apps={apps} />
      <SidebarInset>
        <SiteHeader apps={apps} />
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
