import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Theme",
};
import { db } from "@/db/db";
import { app } from "@/db/schema";
import { ThemePicker } from "@/components/dashboard/theme-picker";

export default async function ThemePage(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const [dbApp] = await db.select().from(app).where(eq(app.slug, params.slug));

	if (!dbApp) {
		notFound();
	}

	return (
		<div className="max-w-5xl mx-auto py-8 px-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Theme</h1>
				<p className="text-gray-500 mt-2">
					Customize the appearance of your public app page.
				</p>
			</div>

			<div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
				<ThemePicker appSlug={dbApp.slug} currentTheme={dbApp.theme} />
			</div>
		</div>
	);
}
