import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { db } from "@/db/db"
import { app, board } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { notFound, redirect } from "next/navigation"
import { Plus, MoreHorizontal } from "lucide-react"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BoardsPage({ params }: PageProps) {
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

  // Get app boards
  const boards = await db.select().from(board).where(eq(board.appId, dbApp.id))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Boards</h1>
          <p className="text-muted-foreground">Manage your feature request boards</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Board
        </Button>
      </div>

      {boards.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No boards yet</CardTitle>
            <CardDescription>Create your first board to start collecting feature requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create First Board
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map((board) => (
            <Card key={board.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{board.name}</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Column {board.column}</Badge>
                  <span className="text-sm text-muted-foreground">
                    Created {new Date(board.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}