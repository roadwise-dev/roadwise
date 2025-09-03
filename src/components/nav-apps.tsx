"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, Plus } from "lucide-react"
import Link from "next/link"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Apps</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full justify-between">
                  <div className="flex items-center gap-2">
                    {currentApp ? (
                      <>
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={currentApp.avatarUrl || ""} alt={currentApp.name} />
                          <AvatarFallback className="text-xs">
                            {currentApp.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate">{currentApp.name}</span>
                      </>
                    ) : (
                      <span>All Apps</span>
                    )}
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <span>All Apps</span>
                  </Link>
                </DropdownMenuItem>
                {apps.map((app) => (
                  <DropdownMenuItem key={app.id} asChild>
                    <Link href={`/dashboard/${app.slug}`} className="flex items-center gap-2">
                      <Avatar className="w-4 h-4">
                        <AvatarImage src={app.avatarUrl || ""} alt={app.name} />
                        <AvatarFallback className="text-xs">
                          {app.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{app.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/create" className="flex items-center gap-2 font-medium">
                    <Plus className="h-4 w-4" />
                    <span>Create App</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}