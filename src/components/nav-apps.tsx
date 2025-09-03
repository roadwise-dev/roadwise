"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronsUpDown, Plus, Building2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

interface App {
  id: string
  name: string
  slug: string
  description: string | null
  avatarUrl: string | null
}

interface NavAppsProps {
  apps: App[]
  currentApp?: App
}

export function NavApps({ apps, currentApp }: NavAppsProps) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  
  // Default to showing "All Apps" when no current app
  const activeApp = currentApp || {
    id: "all",
    name: "All Apps",
    slug: "",
    description: "Manage all your apps",
    avatarUrl: null
  }

  const handleAppSwitch = (app: App | typeof activeApp) => {
    if (app.id === "all") {
      router.push("/dashboard")
    } else {
      router.push(`/dashboard/${app.slug}`)
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {activeApp.avatarUrl ? (
                  <Avatar className="size-8">
                    <AvatarImage src={activeApp.avatarUrl} alt={activeApp.name} />
                    <AvatarFallback className="text-xs">
                      {activeApp.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Building2 className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeApp.name}</span>
                <span className="truncate text-xs">
                  {activeApp.id === "all" ? `${apps.length} apps` : activeApp.description || "Roadwise App"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Apps
            </DropdownMenuLabel>
            
            {/* All Apps option */}
            <DropdownMenuItem
              onClick={() => handleAppSwitch({ id: "all", name: "All Apps", slug: "", description: "Manage all your apps", avatarUrl: null })}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-md border">
                <Building2 className="size-3.5 shrink-0" />
              </div>
              All Apps
            </DropdownMenuItem>

            {/* Individual Apps */}
            {apps.map((app) => (
              <DropdownMenuItem
                key={app.id}
                onClick={() => handleAppSwitch(app)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  {app.avatarUrl ? (
                    <Avatar className="size-6">
                      <AvatarImage src={app.avatarUrl} alt={app.name} />
                      <AvatarFallback className="text-xs">
                        {app.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <span className="text-xs font-medium">
                      {app.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                {app.name}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
            
            {/* Create App option */}
            <DropdownMenuItem asChild className="gap-2 p-2">
              <Link href="/dashboard/create">
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">Create App</div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}