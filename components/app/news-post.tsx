import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

interface NewsPostProps {
  date: Date
  title: string
  content: string
  image: string | null
  tags: string[]
  link?: {
    text: string
    url: string
  }
}

export function NewsPost({ date, title, content, image, tags, link }: NewsPostProps) {
  return (
    <div className="border-t border-gray-200 py-8">
      <div className="text-sm text-gray-500 mb-2">
        {date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
      </div>
      <div className="flex justify-between items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant={tag === "New Feature" ? "default" : "secondary"} className="ml-2">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {image && (
        <div className="mb-6 border rounded-md overflow-hidden">
          <Image src={image} alt={title} width={800} height={400} className="w-full" />
        </div>
      )}

      <p className="mb-2">{content}</p>

      {link && (
        <p className="mb-2">
          {link.text.split("here").map((part, i, arr) =>
            i === arr.length - 1 ? (
              part
            ) : (
              <span key={i}>
                {part}
                <Link href={link.url} className="hover:underline">
                  here
                </Link>
              </span>
            ),
          )}
        </p>
      )}
    </div>
  )
}
