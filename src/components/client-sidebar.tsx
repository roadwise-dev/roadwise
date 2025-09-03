"use client"

import { usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { AppSidebar } from "./app-sidebar"

interface App {
  id: string
  name: string
  slug: string
  description: string | null
  avatarUrl: string | null
}

interface ClientSidebarProps {
  apps: App[]
}

export function ClientSidebar({ apps }: ClientSidebarProps) {
  const pathname = usePathname()
  const { user } = useUser()
  
  // Extract current app slug from pathname
  const slugMatch = pathname.match(/\/dashboard\/([^\/]+)/)
  const currentSlug = slugMatch?.[1]
  
  const currentApp = currentSlug && currentSlug !== "create" && currentSlug !== "manage"
    ? apps.find(a => a.slug === currentSlug)
    : undefined

  // Create user data for the sidebar
  const userData = {
    name: user?.fullName || user?.username || "User",
    email: user?.emailAddresses[0]?.emailAddress || "",
    avatar: user?.imageUrl || "",
  }

  return <AppSidebar variant="inset" apps={apps} currentApp={currentApp} user={userData} />
}