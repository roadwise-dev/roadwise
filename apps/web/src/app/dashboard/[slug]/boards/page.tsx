import { auth } from "@clerk/nextjs/server";
import { asc, count, eq } from "drizzle-orm";
import { Calendar, Plus, Save, Trash2 } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import {
	submitCreateBoardFormAction,
	submitDeleteBoardFormAction,
	submitUpdateBoardFormAction,
} from "@/actions/boards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/db/db";
import { app, board, feature } from "@/db/schema";

interface PageProps {
	params: Promise<{ slug: string }>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Boards",
};

export default async function BoardsPage({ params }: PageProps) {
	const { userId } = await auth();

	if (!userId) {
		redirect("/login");
	}

	const { slug } = await params;
	const [dbApp] = await db.select().from(app).where(eq(app.slug, slug));

	if (!dbApp) {
		notFound();
	}

	if (dbApp.userId !== userId) {
		notFound();
	}

	const boards = await db
		.select({
			id: board.id,
			name: board.name,
			column: board.column,
			createdAt: board.createdAt,
			featureCount: count(feature.id),
		})
		.from(board)
		.leftJoin(feature, eq(feature.boardId, board.id))
		.where(eq(board.appId, dbApp.id))
		.groupBy(board.id)
		.orderBy(asc(board.column), asc(board.createdAt));

	const nextColumn =
		boards.reduce((max, item) => Math.max(max, item.column ?? 0), -1) + 1;

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
				<div className="space-y-1">
					<h1 className="text-2xl font-semibold tracking-tight">Boards</h1>
					<p className="text-sm text-muted-foreground">
						Organize the public feedback columns for {dbApp.name}.
					</p>
				</div>
				<Badge variant="secondary">{boards.length} boards</Badge>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Plus className="size-4" />
						New Board
					</CardTitle>
					<CardDescription>
						Add a board to the public feedback portal.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						action={submitCreateBoardFormAction}
						className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end"
					>
						<input type="hidden" name="slug" value={slug} />
						<input type="hidden" name="column" value={nextColumn} />
						<div className="space-y-2">
							<Label htmlFor="new-board-name">Name</Label>
							<Input
								id="new-board-name"
								name="name"
								placeholder="Planned"
								required
								maxLength={60}
							/>
						</div>
						<Button type="submit">Create Board</Button>
					</form>
				</CardContent>
			</Card>

			{boards.length === 0 ? (
				<Card>
					<CardHeader>
						<CardTitle>No boards yet</CardTitle>
						<CardDescription>
							Create your first board above to start grouping feature requests.
						</CardDescription>
					</CardHeader>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
					{boards.map((item) => (
						<Card key={item.id}>
							<CardHeader>
								<div className="flex items-start justify-between gap-4">
									<div className="min-w-0 space-y-1">
										<CardTitle className="truncate text-lg">
											{item.name}
										</CardTitle>
										<CardDescription>
											{item.featureCount} feature
											{item.featureCount === 1 ? "" : "s"} assigned
										</CardDescription>
									</div>
									<form action={submitDeleteBoardFormAction}>
										<input type="hidden" name="slug" value={slug} />
										<input type="hidden" name="boardId" value={item.id} />
										<Button
											type="submit"
											variant="ghost"
											size="icon-sm"
											aria-label={`Delete ${item.name}`}
										>
											<Trash2 className="size-4" />
										</Button>
									</form>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
									<Calendar className="size-3.5" />
									Created {new Date(item.createdAt).toLocaleDateString()}
								</div>

								<form
									action={submitUpdateBoardFormAction}
									className="grid gap-3 md:grid-cols-[1fr_100px_auto] md:items-end"
								>
									<div className="space-y-2">
										<Label htmlFor={`board-name-${item.id}`}>Name</Label>
										<div>
											<input type="hidden" name="slug" value={slug} />
											<input type="hidden" name="boardId" value={item.id} />
											<Input
												id={`board-name-${item.id}`}
												name="name"
												defaultValue={item.name}
												required
												maxLength={60}
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor={`board-column-${item.id}`}>Position</Label>
										<Input
											id={`board-column-${item.id}`}
											name="column"
											type="number"
											min={0}
											defaultValue={item.column ?? 0}
											required
										/>
									</div>
									<Button type="submit" variant="outline">
										<Save className="size-4" />
										Save
									</Button>
								</form>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
