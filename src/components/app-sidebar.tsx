"use client";

import {
	BarChart3,
	Grid3X3,
	Home,
	LayoutDashboard,
	MessageSquare,
	Newspaper,
	PlusCircle,
	Settings,
} from "lucide-react";
import { useMemo } from "react";
import { NavApps } from "@/components/nav-apps";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "@/components/ui/sidebar";

interface App {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	avatarUrl: string | null;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	apps: App[];
	currentApp?: App;
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}

export function AppSidebar({
	apps,
	currentApp,
	user,
	...props
}: AppSidebarProps) {
	// Main navigation - changes based on context
	const navMain = useMemo(() => {
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
					title: "News",
					url: `/dashboard/${currentApp.slug}/news`,
					icon: Newspaper,
				},
				{
					title: "Settings",
					url: `/dashboard/${currentApp.slug}/settings`,
					icon: Settings,
				},
			];
		} else {
			// Global navigation
			return [
				{
					title: "Overview",
					url: "/dashboard",
					icon: LayoutDashboard,
				},
				{
					title: "Create App",
					url: "/dashboard/create",
					icon: PlusCircle,
				},
			];
		}
	}, [currentApp]);

	return (
		<Sidebar variant="inset" collapsible="icon" {...props}>
			<SidebarHeader>
				<NavApps apps={apps} currentApp={currentApp} />
			</SidebarHeader>

			<SidebarContent>
				<NavMain items={navMain} />
			</SidebarContent>

			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
