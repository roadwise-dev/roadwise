import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CreateFeatureDialog } from "@/components/app/request-feature-dialog";
import FeatureBoard, {
	FeatureBoardSkeleton,
} from "@/components/implemented/feature-board";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { db } from "@/db/db";
import { getAppBySlug } from "@/db/queries";
import { board } from "@/db/schema";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	// read route params
	const slug = (await params).slug;
	const dbApp = await getAppBySlug(slug);

	if (!dbApp) return { title: "App Not Found" };

	return {
		title: dbApp.name,
	};
}

export default async function Page(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const dbApp = await getAppBySlug(params.slug);

	if (!dbApp) {
		notFound();
	}

	const dbBoards = await db
		.select()
		.from(board)
		.where(eq(board.appId, dbApp.id))
		.orderBy(board.column);

	return (
		<div className="flex flex-col h-[calc(100vh-10rem)]">
			<div className="flex items-end justify-between mb-6">
				<div className="flex gap-4 items-center">
					<Avatar className="w-16 h-16 rounded-md">
						<AvatarImage
							src={dbApp.avatarUrl || "/placeholder.svg"}
							alt={dbApp.name}
						/>
						<AvatarFallback className="text-3xl font-semibold rounded-md">
							{dbApp.name.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div>
						<h1 className="text-3xl font-bold">{dbApp.name}</h1>
						<p className="text-muted-foreground">{dbApp.description}</p>
					</div>
				</div>
				<CreateFeatureDialog
					appId={dbApp.id}
					appName={dbApp.name}
					trigger={<Button>Request a feature</Button>}
				/>
			</div>
			{/* Use flex-1 to make the grid take up all remaining space */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
				{dbBoards.map((board) => (
					<Suspense key={board.id} fallback={<FeatureBoardSkeleton />}>
						<FeatureBoard id={board.id} name={board.name} />
					</Suspense>
				))}
			</div>
		</div>
	);
}
