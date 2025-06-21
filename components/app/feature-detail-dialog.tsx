"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { MessageSquare } from "lucide-react"
import { Badge } from "../ui/badge"
import { CommentsDisplay } from "./comments-display"
import { CommentForm } from "./comment-form"
import { getComments } from "@/lib/actions/comments"

interface Feature {
  id: string;
  boardId: string;
  title: string;
  description: string;
  tags: string[];
  name: string;
  upvotes: number;
  createdAt: Date;
}

interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  createdAt: Date;
}

interface FeatureDetailDialogProps {
  feature: Feature | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FeatureDetailDialog({ feature, open, onOpenChange }: FeatureDetailDialogProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loadingComments, setLoadingComments] = useState(false)

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Load comments for a feature
  const loadComments = async (featureId: string) => {
    setLoadingComments(true)
    const fetchedComments = await getComments(featureId)
    setComments(fetchedComments)
    setLoadingComments(false)
  }

  // Handle comment added
  const handleCommentAdded = () => {
    if (feature) {
      loadComments(feature.id)
    }
  }

  // Load comments when dialog opens
  useEffect(() => {
    if (open && feature && comments.length === 0 && !loadingComments) {
      loadComments(feature.id)
    }
  }, [open, feature])

  // Clear comments when dialog closes
  useEffect(() => {
    if (!open) {
      setComments([])
    }
  }, [open])

  if (!feature) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <DialogTitle className="text-2xl font-bold">{feature.title}</DialogTitle>
            </div>

            <div className="flex items-center mb-4">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback>{feature.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <span className="font-medium">{feature.name}</span>
                <span className="text-muted-foreground"> • {formatDate(feature.createdAt)}</span>
              </div>
            </div>

            <p className="text-base mb-4">{feature.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {feature.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <div className="flex items-center mb-4">
              <MessageSquare className="mr-2 h-5 w-5" />
              <h2 className="text-lg font-semibold">Comments</h2>
            </div>

            {loadingComments ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground text-sm">Loading comments...</p>
              </div>
            ) : (
              <CommentsDisplay comments={comments} />
            )}

            <CommentForm
              featureId={feature.id}
              onCommentAdded={handleCommentAdded}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
