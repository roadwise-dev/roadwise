import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Calendar } from "lucide-react"
import { db } from "@/db/db"
import { app, news } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { eq, desc } from "drizzle-orm"
import { notFound, redirect } from "next/navigation"
import { createNewsAction, deleteNewsAction } from "@/actions/news"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

interface PageProps {
  params: Promise<{ slug: string }>
}

async function DeleteNewsForm({ slug, newsId, title }: { slug: string; newsId: string; title: string }) {
  async function deleteNews(formData: FormData) {
    "use server"
    return deleteNewsAction(slug, newsId)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete News Post</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{title}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={deleteNews}>
            <AlertDialogAction type="submit" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default async function NewsManagementPage({ params }: PageProps) {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/login")
  }

  const { slug } = await params
  const [dbApp] = await db.select().from(app).where(eq(app.slug, slug))

  if (!dbApp) {
    notFound()
  }

  if (dbApp.userId !== userId) {
    notFound()
  }

  const dbNews = await db
    .select()
    .from(news)
    .where(eq(news.appId, dbApp.id))
    .orderBy(desc(news.date))

  async function createNews(formData: FormData) {
    "use server"
    return createNewsAction(slug, formData)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News Management</h1>
          <p className="text-muted-foreground">Manage news posts for {dbApp.name}</p>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create News Post
            </CardTitle>
            <CardDescription>Add a new news post for your users</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createNews} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter news title"
                  required
                  maxLength={200}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your news content..."
                  required
                  maxLength={5000}
                  rows={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="Feature, Update, Bug Fix"
                />
              </div>

              <Button type="submit" className="w-full">
                Create News Post
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Existing News Posts</h2>
            <Badge variant="secondary">{dbNews.length} posts</Badge>
          </div>

          {dbNews.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No news posts yet. Create your first news post to get started.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {dbNews.map((newsItem) => (
                <Card key={newsItem.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{newsItem.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {newsItem.date.toLocaleDateString("en-US", { 
                            day: "2-digit", 
                            month: "short", 
                            year: "numeric" 
                          })}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DeleteNewsForm 
                          slug={slug} 
                          newsId={newsItem.id} 
                          title={newsItem.title} 
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {newsItem.content}
                    </p>
                    
                    {newsItem.image && (
                      <div className="text-xs text-muted-foreground">
                        📷 Image: {newsItem.image}
                      </div>
                    )}

                    {newsItem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {newsItem.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}