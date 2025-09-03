"use client"

import * as React from "react"
import { Home, BarChart3, Grid3X3, MessageSquare, Settings, HelpCircle, Building } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavApps } from "@/components/nav-apps"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface App {
  id: string
  name: string
  slug: string
  description: string | null
  avatarUrl: string | null
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  apps: App[]
  currentApp?: App
}

export function AppSidebar({ apps, currentApp, ...props }: AppSidebarProps) {
  // Main navigation - changes based on context
  const navMain = React.useMemo(() => {
    if (currentApp) {
      // App-specific navigation
      return [
        {
          title: "Overview",
          url: `/dashboard/${currentApp.slug}`,
          icon: Home,
        },
        {
          title: "Analytics",
          url: `/dashboard/${currentApp.slug}/analytics`,
          icon: BarChart3,
        },
        {
          title: "Boards",
          url: `/dashboard/${currentApp.slug}/boards`,
          icon: Grid3X3,
        },
        {
          title: "Feedback",
          url: `/dashboard/${currentApp.slug}/feedback`,
          icon: MessageSquare,
        },
        {
          title: "Settings",
          url: `/dashboard/${currentApp.slug}/settings`,
          icon: Settings,
        },
      ]
    } else {
      // Global navigation
      return [
        {
          title: "All Apps",
          url: "/dashboard",
          icon: Building,
        },
      ]
    }
  }, [currentApp])

  const navSecondary = [
    {
      title: "Help & Support",
      url: "#",
      icon: HelpCircle,
    },
  ]

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <Building className="!size-5" />
                <span className="text-base font-semibold">Roadwise</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavApps apps={apps} currentApp={currentApp} />
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        {/* User nav will go here */}
      </SidebarFooter>
    </Sidebar>
  )
}
