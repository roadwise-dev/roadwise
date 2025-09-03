import { db } from "@/db/db"
import { app } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { notFound, redirect } from "next/navigation"

interface AppLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export default async function AppLayout({ children, params }: AppLayoutProps) {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/login")
  }

  const { slug } = await params
  const [dbApp] = await db.select().from(app).where(eq(app.slug, slug))

  if (!dbApp) {
    notFound()
  }

  // Verify app ownership
  if (dbApp.userId !== userId) {
    notFound()
  }

  return <>{children}</>
}