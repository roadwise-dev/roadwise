"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface App {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	avatarUrl: string | null;
}

interface SiteHeaderProps {
	apps?: App[];
}

export function SiteHeader({ apps = [] }: SiteHeaderProps) {
	const pathname = usePathname();

	const getPageTitle = () => {
		if (pathname === "/dashboard") return "All Apps";
		if (pathname.includes("/analytics")) return "Analytics";
		if (pathname.includes("/boards")) return "Boards";
		if (pathname.includes("/feedback")) return "Feedback";
		if (pathname.includes("/settings")) return "Settings";
		if (pathname.includes("/news")) return "News";
		if (pathname.includes("/create")) return "Create App";
		if (pathname.match(/\/dashboard\/[^/]+$/)) return "Overview";
		return "Dashboard";
	};

	const getCurrentApp = () => {
		const slugMatch = pathname.match(/\/dashboard\/([^/]+)/);
		const currentSlug = slugMatch?.[1];

		if (currentSlug && currentSlug !== "create" && currentSlug !== "manage") {
			return apps.find((a) => a.slug === currentSlug);
		}
		return undefined;
	};

	const currentApp = getCurrentApp();
	const pageTitle = getPageTitle();

	const renderBreadcrumbs = () => {
		if (pathname === "/dashboard") {
			return <BreadcrumbPage>Dashboard</BreadcrumbPage>;
		}

		if (pathname.includes("/create")) {
			return (
				<>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/dashboard">Dashboard</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbPage>Create App</BreadcrumbPage>
				</>
			);
		}

		if (currentApp) {
			const isOverview = pathname.match(/\/dashboard\/[^/]+$/);

			return (
				<>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/dashboard">Dashboard</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href={`/dashboard/${currentApp.slug}`}>
								{currentApp.name}
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					{!isOverview && (
						<>
							<BreadcrumbSeparator />
							<BreadcrumbPage>{pageTitle}</BreadcrumbPage>
						</>
					)}
					{isOverview && (
						<>
							<BreadcrumbSeparator />
							<BreadcrumbPage>Overview</BreadcrumbPage>
						</>
					)}
				</>
			);
		}

		return <BreadcrumbPage>{pageTitle}</BreadcrumbPage>;
	};

	return (
		<header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mx-2 data-[orientation=vertical]:h-4"
				/>
				<Breadcrumb>
					<BreadcrumbList>{renderBreadcrumbs()}</BreadcrumbList>
				</Breadcrumb>
				<div className="ml-auto flex items-center gap-2">
					{currentApp && (
						<Button variant="ghost" size="sm" asChild>
							<a
								href={`https://${currentApp.slug}.roadwiseapp.com`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<ExternalLink className="w-4 h-4 mr-2" />
								View App
							</a>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
