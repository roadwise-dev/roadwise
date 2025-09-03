import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getNewsForApp, createNewsAction, updateNewsAction, deleteNewsAction } from "@/actions/news"
import { Plus, Edit, Trash2, Calendar } from "lucide-react"
import { notFound } from "next/navigation"
import Image from "next/image"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function NewsManagementPage({ params }: PageProps) {
  const { slug } = await params
  const result = await getNewsForApp(slug)

  if (result.error) {
    notFound()
  }

  const { news: newsList = [] } = result

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News Management</h1>
          <p className="text-muted-foreground">Create and manage news posts for your app</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add News Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create News Post</DialogTitle>
              <DialogDescription>
                Add a new news post that will be visible to your app users.
              </DialogDescription>
            </DialogHeader>
            <NewsForm appSlug={slug} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {newsList.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No news posts yet</h3>
                <p className="mt-2 text-muted-foreground">
                  Get started by creating your first news post.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          newsList.map((newsItem) => (
            <NewsCard key={newsItem.id} news={newsItem} appSlug={slug} />
          ))
        )}
      </div>
    </div>
  )
}

function NewsCard({ news, appSlug }: { news: any; appSlug: string }) {
  const deleteAction = deleteNewsAction.bind(null, appSlug, news.id)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl">{news.title}</CardTitle>
            <CardDescription>
              Published on {news.date.toLocaleDateString("en-US", { 
                day: "2-digit", 
                month: "short", 
                year: "numeric" 
              })}
            </CardDescription>
            <div className="flex gap-2">
              {news.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit News Post</DialogTitle>
                  <DialogDescription>
                    Update your news post details.
                  </DialogDescription>
                </DialogHeader>
                <NewsForm appSlug={appSlug} news={news} />
              </DialogContent>
            </Dialog>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the news post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <form action={deleteAction}>
                    <AlertDialogAction type="submit">Delete</AlertDialogAction>
                  </form>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {news.image && (
          <div className="mb-4">
            <Image 
              src={news.image} 
              alt={news.title} 
              width={400} 
              height={200} 
              className="rounded-md object-cover"
            />
          </div>
        )}
        <p className="text-muted-foreground line-clamp-3">{news.content}</p>
      </CardContent>
    </Card>
  )
}

function NewsForm({ appSlug, news }: { appSlug: string; news?: any }) {
  const action = news 
    ? updateNewsAction.bind(null, appSlug)
    : createNewsAction.bind(null, appSlug)

  return (
    <form action={action} className="space-y-4">
      {news && (
        <input type="hidden" name="id" value={news.id} />
      )}
      
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter news title..."
          defaultValue={news?.title || ""}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your news content..."
          defaultValue={news?.content || ""}
          className="min-h-[120px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL (optional)</Label>
        <Input
          id="image"
          name="image"
          type="url"
          placeholder="https://example.com/image.jpg"
          defaultValue={news?.image || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          name="tags"
          placeholder="New Feature, Bug Fix, Update"
          defaultValue={news?.tags?.join(", ") || ""}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">
          {news ? "Update News Post" : "Create News Post"}
        </Button>
      </div>
    </form>
  )
}