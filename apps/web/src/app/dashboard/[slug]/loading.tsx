import { Skeleton } from "@/components/ui/skeleton";

export default function AppOverviewLoading() {
	return (
		<div className="space-y-6">
			{/* Streamlined Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<Skeleton className="h-12 w-12 rounded-lg" />
					<div className="space-y-2">
						<Skeleton className="h-8 w-48" />
						<div className="flex items-center gap-3">
							<Skeleton className="h-4 w-64" />
							<Skeleton className="h-4 w-20" />
						</div>
					</div>
				</div>
				<Skeleton className="h-6 w-20 rounded-full" />
			</div>

			{/* App Insights */}
			<Skeleton className="h-[250px] w-full rounded-xl" />

			{/* Action Items */}
			<Skeleton className="h-[150px] w-full rounded-xl" />

			{/* Activity and Contributors */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Skeleton className="h-[300px] w-full rounded-xl" />
				<Skeleton className="h-[300px] w-full rounded-xl" />
			</div>
		</div>
	);
}
