import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div className="space-y-2">
					<Skeleton className="h-9 w-32" />
					<Skeleton className="h-5 w-64" />
				</div>
				<Skeleton className="h-10 w-32" />
			</div>

			{/* Global Stats Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{[1, 2, 3, 4].map((val) => (
					<Skeleton
						key={`global-stat-${val}`}
						className="h-32 w-full rounded-xl"
					/>
				))}
			</div>

			{/* Products Section */}
			<section className="space-y-4">
				<div className="space-y-2">
					<Skeleton className="h-7 w-24" />
					<Skeleton className="h-5 w-72" />
				</div>
				<div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
					{[1, 2, 3].map((val) => (
						<Skeleton
							key={`product-stat-${val}`}
							className="h-[200px] w-full rounded-xl"
						/>
					))}
				</div>
			</section>
		</div>
	);
}
