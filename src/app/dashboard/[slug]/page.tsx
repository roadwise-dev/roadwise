import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { db } from "@/db/db"
import { app, board, feature } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { eq, count } from "drizzle-orm"
import { notFound, redirect } from "next/navigation"
import { BarChart3, Grid3X3, MessageSquare, Settings, ExternalLink } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function AppOverviewPage({ params }: PageProps) {
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

  // Get app statistics
  const [boardCount] = await db.select({ count: count() }).from(board).where(eq(board.appId, dbApp.id))
  
  // Get feature count by joining through boards
  const [featureCount] = await db
    .select({ count: count() })
    .from(feature)
    .innerJoin(board, eq(feature.boardId, board.id))
    .where(eq(board.appId, dbApp.id))

  const stats = [
    {
      title: "Total Boards",
      value: boardCount.count,
      icon: Grid3X3,
      href: `/dashboard/${slug}/boards`,
    },
    {
      title: "Feature Requests", 
      value: featureCount.count,
      icon: MessageSquare,
      href: `/dashboard/${slug}/feedback`,
    },
    {
      title: "Analytics",
      value: "View",
      icon: BarChart3,
      href: `/dashboard/${slug}/analytics`,
    },
  ]

  return (
    <div className="space-y-6">
      {/* App Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 rounded-lg">
            <AvatarImage src={dbApp.avatarUrl || ""} alt={dbApp.name} />
            <AvatarFallback className="text-2xl font-semibold rounded-lg">
              {dbApp.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{dbApp.name}</h1>
            <p className="text-muted-foreground">{dbApp.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">
                {dbApp.isPublic ? "Public" : "Private"}
              </Badge>
              <Link 
                href={`/app/${dbApp.slug}`} 
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                View Live App
              </Link>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/${slug}/settings`}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="cursor-pointer hover:shadow-md transition-shadow">
            <Link href={stat.href}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates in your app</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              No recent activity to display.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href={`/dashboard/${slug}/boards`}>
                <Grid3X3 className="w-4 h-4 mr-2" />
                Manage Boards
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href={`/dashboard/${slug}/feedback`}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Review Feedback
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href={`/dashboard/${slug}/analytics`}>
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}