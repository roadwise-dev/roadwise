import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import AppCard from "@/components/dashboard/app-card";
import CreateAppButton from "@/components/dashboard/create-app";
import { Search } from "@/components/dashboard/search";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { db } from "@/db/db";
import { app } from "@/db/schema";

export default async function Dashboard() {
	const { userId } = await auth();

	if (!userId) {
		redirect("/login");
	}

	const apps = await db.select().from(app).where(eq(app.userId, userId));

	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-col gap-1">
				<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
				<p className="text-muted-foreground">
					Manage your apps and view feedback statistics.
				</p>
			</div>

			{/* Create New App Button */}
			<section className="space-y-6">
				<StatsCards />
				<div className="flex justify-between">
					<Search />
					<CreateAppButton />
				</div>

				{/* App Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{apps.map((app) => (
						<AppCard key={app.id} app={app} />
					))}
				</div>
			</section>
		</div>
	);
}
