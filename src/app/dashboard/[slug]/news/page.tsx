import { auth } from "@clerk/nextjs/server";
import { count, desc, eq } from "drizzle-orm";
import { Calendar, Mail, Trash2, Users } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import {
	submitCreateNewsFormAction,
	submitDeleteNewsFormAction,
} from "@/actions/news";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/db/db";
import { app, news, subscribe } from "@/db/schema";

interface PageProps {
	params: Promise<{ slug: string }>;
}

async function DeleteNewsForm({
	slug,
	newsId,
	title,
}: {
	slug: string;
	newsId: string;
	title: string;
}) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline" size="sm">
					<Trash2 className="w-4 h-4" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete News Post</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete &quot;{title}&quot;? This action
						cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<form action={submitDeleteNewsFormAction}>
						<input type="hidden" name="slug" value={slug} />
						<input type="hidden" name="newsId" value={newsId} />
						<AlertDialogAction
							type="submit"
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							Delete
						</AlertDialogAction>
					</form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default async function NewsManagementPage({ params }: PageProps) {
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

	const dbNews = await db
		.select()
		.from(news)
		.where(eq(news.appId, dbApp.id))
		.orderBy(desc(news.date));

	// Get subscribers count and list
	const [subscribersCount] = await db
		.select({ count: count() })
		.from(subscribe)
		.where(eq(subscribe.appId, dbApp.id));

	const subscribers = await db
		.select({
			id: subscribe.id,
			name: subscribe.name,
			email: subscribe.email,
		})
		.from(subscribe)
		.where(eq(subscribe.appId, dbApp.id))
		.limit(50); // Limit to 50 most recent subscribers

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card className="lg:col-span-1">
					<CardHeader>
						<CardTitle className="text-lg">Create News Post</CardTitle>
						<CardDescription>
							Add a new news post for your users
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form action={submitCreateNewsFormAction} className="space-y-4">
							<input type="hidden" name="slug" value={slug} />
							<div className="space-y-2">
								<Label htmlFor="title">Title</Label>
								<Input
									id="title"
									name="title"
									placeholder="Enter news title"
									required
									maxLength={200}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="content">Content</Label>
								<Textarea
									id="content"
									name="content"
									placeholder="Write your news content..."
									required
									maxLength={5000}
									rows={8}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="image">Image URL (optional)</Label>
								<Input
									id="image"
									name="image"
									type="url"
									placeholder="https://example.com/image.jpg"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="tags">Tags (comma-separated)</Label>
								<Input
									id="tags"
									name="tags"
									placeholder="Feature, Update, Bug Fix"
								/>
							</div>

							<Button type="submit" className="w-full">
								Create News Post
							</Button>
						</form>
					</CardContent>
				</Card>

				<div className="lg:col-span-2 space-y-4">
					{dbNews.length === 0 ? (
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">
									<div className="flex items-center justify-between">
										Existing News Posts
										<Badge variant="secondary">{dbNews.length} posts</Badge>
									</div>
								</CardTitle>
							</CardHeader>
							<CardContent className="py-8 text-center text-muted-foreground">
								No news posts yet. Create your first news post to get started.
							</CardContent>
						</Card>
					) : (
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-semibold">Existing News Posts</h3>
								<Badge variant="secondary">{dbNews.length} posts</Badge>
							</div>
							{dbNews.map((newsItem) => (
								<Card key={newsItem.id}>
									<CardHeader>
										<div className="flex items-start justify-between">
											<div className="space-y-1">
												<CardTitle className="text-lg">
													{newsItem.title}
												</CardTitle>
												<div className="flex items-center gap-2 text-sm text-muted-foreground">
													<Calendar className="w-4 h-4" />
													{newsItem.date.toLocaleDateString("en-US", {
														day: "2-digit",
														month: "short",
														year: "numeric",
													})}
												</div>
											</div>
											<div className="flex items-center gap-2">
												<DeleteNewsForm
													slug={slug}
													newsId={newsItem.id}
													title={newsItem.title}
												/>
											</div>
										</div>
									</CardHeader>
									<CardContent className="space-y-3">
										<p className="text-sm text-muted-foreground line-clamp-3">
											{newsItem.content}
										</p>

										{newsItem.image && (
											<div className="text-xs text-muted-foreground">
												📷 Image: {newsItem.image}
											</div>
										)}

										{newsItem.tags.length > 0 && (
											<div className="flex flex-wrap gap-1">
												{newsItem.tags.map((tag) => (
													<Badge
														key={tag}
														variant="secondary"
														className="text-xs"
													>
														{tag}
													</Badge>
												))}
											</div>
										)}
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Subscribers Overview - Moved to bottom */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Users className="w-5 h-5" />
						News Subscribers
						<Badge variant="secondary">{subscribersCount.count}</Badge>
					</CardTitle>
					<CardDescription>
						People who subscribed to receive news updates
					</CardDescription>
				</CardHeader>
				<CardContent>
					{subscribers.length > 0 ? (
						<div className="space-y-3">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
								{subscribers.slice(0, 9).map((subscriber) => (
									<div
										key={subscriber.id}
										className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
									>
										<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
											<Mail className="w-4 h-4" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium truncate">
												{subscriber.name}
											</p>
											<p className="text-xs text-muted-foreground truncate">
												{subscriber.email}
											</p>
										</div>
									</div>
								))}
							</div>
							{subscribers.length > 9 && (
								<div className="text-center pt-2">
									<p className="text-sm text-muted-foreground">
										And {subscribers.length - 9} more subscribers...
									</p>
								</div>
							)}
						</div>
					) : (
						<div className="text-center py-8 text-muted-foreground">
							<Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
							<p className="text-sm">No subscribers yet</p>
							<p className="text-xs">
								Users can subscribe to news on your public app
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
