import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { getAppBySlug } from "@/db/queries";

interface AppLayoutProps {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const dbApp = await getAppBySlug(slug);

	if (!dbApp) return {};

	return {
		title: {
			template: `%s | ${dbApp.name} | Roadwise`,
			default: `${dbApp.name} | Roadwise`,
		},
	};
}

export default async function AppLayout({ children, params }: AppLayoutProps) {
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

	return <>{children}</>;
}
