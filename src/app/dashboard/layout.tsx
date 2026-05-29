import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { ClientSidebar } from "@/components/client-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { db } from "@/db/db";
import { app } from "@/db/schema";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { userId } = await auth();

	if (!userId) {
		redirect("/login");
	}

	// Get user's apps for the sidebar
	const apps = await db.select().from(app).where(eq(app.userId, userId));

	return (
		<SidebarProvider>
			<ClientSidebar apps={apps} />
			<SidebarInset>
				<SiteHeader apps={apps} />
				<main className="min-h-0 flex-1 overflow-auto p-4 lg:p-6">
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
