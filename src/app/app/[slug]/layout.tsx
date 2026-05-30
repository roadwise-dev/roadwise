import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Navbar from "@/components/implemented/navbar";
import { db } from "@/db/db";
import { app } from "@/db/schema";

export default async function PublicAppLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const [dbApp] = await db.select().from(app).where(eq(app.slug, slug));

	if (!dbApp) {
		notFound();
	}

	const slugId = `app-theme-${dbApp.slug}`;

	const lightStyles = Object.entries(dbApp.theme?.light || {})
		.map(([key, value]) => `--${key}: ${value};`)
		.join("\n");

	const darkStyles = Object.entries(dbApp.theme?.dark || {})
		.map(([key, value]) => `--${key}: ${value};`)
		.join("\n");

	return (
		<>
			<style>{`
				.${slugId} {
					${lightStyles}
				}
				.dark .${slugId} {
					${darkStyles}
				}
			`}</style>
			<div
				className={`flex flex-col min-h-screen bg-background text-foreground transition-colors ${slugId}`}
			>
				{/* Navbar */}
				<Navbar />
				<div className="w-full px-8 py-4 max-w-[1440px] mx-auto grow">
					{/* Main Content */}
					<main className="mt-4 w-full h-full">{children}</main>
				</div>
			</div>
		</>
	);
}
