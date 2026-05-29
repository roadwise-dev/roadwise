"use client";

import { Building2, ChevronsUpDown, LayoutGrid, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

interface App {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	avatarUrl: string | null;
}

interface NavAppsProps {
	apps: App[];
	currentApp?: App;
}

export function NavApps({ apps, currentApp }: NavAppsProps) {
	const { isMobile } = useSidebar();
	const router = useRouter();

	// Default to showing "All Apps" when no current app
	const activeApp = currentApp || {
		id: "all",
		name: apps.length === 0 ? "Workspace" : "All Apps",
		slug: "",
		description: apps.length === 0 ? "No apps yet" : "Workspace overview",
		avatarUrl: null,
	};

	const handleAppSwitch = (app: App | typeof activeApp) => {
		if (app.id === "all") {
			router.push("/dashboard");
		} else {
			router.push(`/dashboard/${app.slug}`);
		}
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									{activeApp.id === "all" ? (
										<LayoutGrid className="size-4" />
									) : activeApp.avatarUrl ? (
										<Avatar className="size-8">
											<AvatarImage
												src={activeApp.avatarUrl}
												alt={activeApp.name}
											/>
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
										{activeApp.id === "all"
											? activeApp.description
											: activeApp.description || "Roadwise App"}
									</span>
								</div>
								<ChevronsUpDown className="ml-auto" />
							</SidebarMenuButton>
						}
					/>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuGroup>
							<DropdownMenuLabel className="text-muted-foreground text-xs">
								Apps
							</DropdownMenuLabel>

							{/* All Apps option */}
							<DropdownMenuItem
								onClick={() =>
									handleAppSwitch({
										id: "all",
										name: "All Apps",
										slug: "",
										description:
											apps.length === 0 ? "No apps yet" : `${apps.length} apps`,
										avatarUrl: null,
									})
								}
								className="gap-2 p-2"
							>
								<div className="flex size-6 items-center justify-center rounded-md border">
									<LayoutGrid className="size-3.5 shrink-0" />
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
						</DropdownMenuGroup>

						<DropdownMenuSeparator />

						{/* Create App option */}
						<DropdownMenuItem
							className="gap-2 p-2"
							render={
								<Link href="/dashboard/create">
									<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
										<Plus className="size-4" />
									</div>
									<div className="text-muted-foreground font-medium">
										Create App
									</div>
								</Link>
							}
						/>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
