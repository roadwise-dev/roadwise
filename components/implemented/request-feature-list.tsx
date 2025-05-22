"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Plus, Search, X } from "lucide-react"

interface Feature {
  id: string;
  boardId: string;
  title: string;
  description: string;
  name: string;
  upvotes: number;
  createdAt: Date;
}


export default function RequestFeatureList({ features }: { features: Feature[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const appname = "roadwise"

  // Get feature ID from URL if present
  const featureIdParam = searchParams.get("id")
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(
    featureIdParam || null
  );

  // Find the selected feature
  const selectedFeature = selectedFeatureId ? features.find((f) => f.id === selectedFeatureId) : null

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

  // Handle opening a feature
  const handleFeatureClick = (id: string) => {
    setSelectedFeatureId(id);
    router.push(`/app/${appname}/feature-request?id=${id}`, { scroll: false });
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setSelectedFeatureId(null)
    // Update URL without navigation
    router.push(`/app/${appname}/feature-request`, { scroll: false })
  }

  // Handle direct URL access with feature ID
  useEffect(() => {
    if (featureIdParam) {
      setSelectedFeatureId(featureIdParam);
    }
  }, [featureIdParam]);

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 mb-6">
        <div className="relative grow">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input type="text" placeholder="Search features..." className="pl-10" />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Request
        </Button>
      </div>

      {features.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleFeatureClick(feature.id)}
            >
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  {/* <div className="flex items-center"> */}
                  {/*   <MessageSquare className="h-4 w-4 mr-1" /> */}
                  {/*   <span className="text-sm text-gray-500">{feature.comments.length}</span> */}
                  {/* </div> */}
                  {/* <div> */}
                  {/*   {feature.tags.map((tag) => ( */}
                  {/*     <Badge key={tag} variant="secondary" className="mr-1 mb-1"> */}
                  {/*       {tag} */}
                  {/*     </Badge> */}
                  {/*   ))} */}
                  {/* </div> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-2">No results found</h2>
          <p className="text-gray-600">We couldn&apos;t find any features matching your search or selected tags.</p>
          <p className="text-gray-600">
            Try adjusting your search terms or selected tags, or{" "}
            <Button variant="link" className="p-0 h-auto font-semibold">
              submit a new feature request
            </Button>
            .
          </p>
        </div>
      )}

      {/* Feature Detail Dialog */}
      <Dialog
        open={selectedFeatureId !== null}
        onOpenChange={(open) => {
          if (!open) handleCloseDialog()
        }}
      >
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedFeature && (
            <div className="relative">
              <Button variant="ghost" size="icon" className="absolute right-0 top-0" onClick={handleCloseDialog}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">{selectedFeature.title}</h1>
                </div>

                <div className="flex items-center mb-4">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>{selectedFeature.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <span className="font-medium">{selectedFeature.name}</span>
                    <span className="text-muted-foreground"> • {formatDate(selectedFeature.createdAt)}</span>
                  </div>
                </div>

                <p className="text-base mb-4">{selectedFeature.description}</p>

                {/* <div className="flex flex-wrap gap-2 mb-4"> */}
                {/*   {selectedFeature.tags.map((tag) => ( */}
                {/*     <Badge key={tag} variant="secondary"> */}
                {/*       {tag} */}
                {/*     </Badge> */}
                {/*   ))} */}
                {/* </div> */}
              </div>

              <Separator className="my-4" />

              <div>
                <div className="flex items-center mb-4">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  {/* <h2 className="text-lg font-semibold">Comments ({selectedFeature.comments.length})</h2> */}
                </div>

                {/* <div className="space-y-4 mb-6"> */}
                {/*   {selectedFeature.comments.map((comment) => ( */}
                {/*     <Card key={comment.id}> */}
                {/*       <CardHeader className="p-3 pb-1"> */}
                {/*         <div className="flex items-center"> */}
                {/*           <Avatar className="h-6 w-6 mr-2"> */}
                {/*             <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} alt={comment.author} /> */}
                {/*             <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback> */}
                {/*           </Avatar> */}
                {/*           <div className="text-sm"> */}
                {/*             <span className="font-medium">{comment.author}</span> */}
                {/*             <span className="text-muted-foreground"> • {formatDate(comment.date)}</span> */}
                {/*           </div> */}
                {/*         </div> */}
                {/*       </CardHeader> */}
                {/*       <CardContent className="p-3 pt-1"> */}
                {/*         <p className="text-sm">{comment.content}</p> */}
                {/*       </CardContent> */}
                {/*     </Card> */}
                {/*   ))} */}
                {/* </div> */}

                <div className="mb-2">
                  <h3 className="text-base font-medium mb-2">Add a comment</h3>
                  <Textarea
                    placeholder="Share your thoughts on this feature request..."
                    className="min-h-[80px] mb-2"
                  />
                  <Button>Submit Comment</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
