import { NewsPost } from "@/components/app/news-post"
import { SubscribeDialog } from "@/components/app/news/subsribe-dialog"

export default function AnnouncementsPage() {
  // Sample data for announcements
  const announcements = [
    {
      date: "May 16, 2025",
      title: "Subscribe to Updates",
      content:
        "You can now let your users subscribe with one click to receive email notifications whenever you publish a new announcement.",
      image: "https://hcdqvxzjnkgscvkvplfd.supabase.co/storage/v1/object/public/news//roadwise-subscribe.png",
      tags: ["New Feature", "Announcement"],
    },
    {
      date: "May 10, 2025",
      title: "New Dashboard Layout",
      content: "We've redesigned the dashboard to make it more intuitive and easier to navigate.",
      tags: ["Product Update"],
    },
    {
      date: "May 5, 2025",
      title: "API Documentation Updates",
      content: "We've updated our API documentation with more examples and clearer explanations.",
      tags: ["Documentation"],
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-row justify-between items-end mb-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">News</h1>
          <p className="text-gray-600">New updates and improvements</p>
        </div>
        <SubscribeDialog />
      </div>

      <div className="border-t border-gray-200">
        {announcements.map((announcement, index) => (
          <div key={index}>
            <NewsPost
              date={announcement.date}
              title={announcement.title}
              content={announcement.content}
              image={index === 0 ? announcement.image : undefined}
              tags={announcement.tags}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
