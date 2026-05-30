import { auth } from "@clerk/nextjs/server";

import { Eye, EyeOff } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { AppAvatarUpload } from "@/components/dashboard/app-avatar-upload";
import {
	AppActionItems,
	AppActivityFeed,
	AppInsights,
	AppTopContributors,
} from "@/components/dashboard/app-overview-components";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getAppBySlug } from "@/db/queries";

interface PageProps {
	params: Promise<{ slug: string }>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Overview",
};

function CardSkeleton() {
	return <Skeleton className="h-[250px] w-full rounded-xl" />;
}

function ActionItemsSkeleton() {
	return <Skeleton className="h-[150px] w-full rounded-xl" />;
}

export default async function AppOverviewPage({ params }: PageProps) {
	const { userId } = await auth();

	if (!userId) {
		redirect("/login");
	}

	const { slug } = await params;
	const dbApp = await getAppBySlug(slug);

	if (!dbApp) {
		notFound();
	}

	// Verify app ownership
	if (dbApp.userId !== userId) {
		notFound();
	}

	return (
		<div className="space-y-6">
			{/* Streamlined Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<AppAvatarUpload
						slug={dbApp.slug}
						currentAvatarUrl={dbApp.avatarUrl}
						appName={dbApp.name}
						variant="icon-only"
					/>
					<div>
						<div className="flex items-center gap-3">
							<h1 className="text-2xl font-bold tracking-tight">
								{dbApp.name}
							</h1>
						</div>
						<div className="flex items-center gap-3 mt-1">
							<p className="text-sm text-muted-foreground">
								{dbApp.description || "No description"}
							</p>
						</div>
					</div>
				</div>
				<Badge variant={dbApp.isPublic ? "default" : "secondary"}>
					{dbApp.isPublic ? (
						<>
							<Eye className="w-3 h-3 mr-1" />
							Public
						</>
					) : (
						<>
							<EyeOff className="w-3 h-3 mr-1" />
							Private
						</>
					)}
				</Badge>
			</div>

			<Suspense fallback={<CardSkeleton />}>
				<AppInsights appId={dbApp.id} />
			</Suspense>

			<Suspense fallback={<ActionItemsSkeleton />}>
				<AppActionItems appId={dbApp.id} slug={slug} />
			</Suspense>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Suspense fallback={<CardSkeleton />}>
					<AppActivityFeed appId={dbApp.id} />
				</Suspense>

				<Suspense fallback={<CardSkeleton />}>
					<AppTopContributors appId={dbApp.id} />
				</Suspense>
			</div>
		</div>
	);
}
