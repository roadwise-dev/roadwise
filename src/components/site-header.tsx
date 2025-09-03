"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  const pathname = usePathname()

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "All Apps"
    if (pathname.includes("/analytics")) return "Analytics"
    if (pathname.includes("/boards")) return "Boards"
    if (pathname.includes("/feedback")) return "Feedback"
    if (pathname.includes("/settings")) return "Settings"
    if (pathname.includes("/news")) return "News Managemet"
    if (pathname.includes("/create")) return "Create App"
    if (pathname.match(/\/dashboard\/[^\/]+$/)) return "Overview"
    return "Dashboard"
  }

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-semibold">{getPageTitle()}</h1>
        <div className="ml-auto flex items-center gap-2">
          {/* Add any header actions here */}
        </div>
      </div>
    </header>
  )
}
