import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import {
	submitDeleteAppFormAction,
	submitUpdateAppDetailsFormAction,
	submitUpdateAppVisibilityFormAction,
} from "@/actions/app-settings";
import { AppAvatarUpload } from "@/components/dashboard/app-avatar-upload";
import {
	AlertDialog,
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
import { app } from "@/db/schema";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export default async function SettingsPage({ params }: PageProps) {
	const { userId } = await auth();

	if (!userId) {
		redirect("/login");
	}

	const { slug } = await params;
	const [dbApp] = await db.select().from(app).where(eq(app.slug, slug));

	if (!dbApp) {
		notFound();
	}

	// Verify app ownership
	if (dbApp.userId !== userId) {
		notFound();
	}

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>App Information</CardTitle>
					<CardDescription>Basic information about your app</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label className="text-sm font-medium">App Name</Label>
							<p className="text-sm text-muted-foreground">{dbApp.name}</p>
						</div>
						<div>
							<Label className="text-sm font-medium">App Slug</Label>
							<p className="text-sm text-muted-foreground">{dbApp.slug}</p>
						</div>
					</div>
					<div>
						<Label className="text-sm font-medium">Description</Label>
						<p className="text-sm text-muted-foreground">
							{dbApp.description || "No description provided"}
						</p>
					</div>
					<div>
						<Label className="text-sm font-medium">Domain</Label>
						<p className="text-sm text-muted-foreground">{dbApp.domain}</p>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Edit App Details</CardTitle>
					<CardDescription>
						Update the information shown in your dashboard and public portal.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={submitUpdateAppDetailsFormAction} className="space-y-4">
						<input type="hidden" name="slug" value={dbApp.slug} />
						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="name">App Name</Label>
								<Input
									id="name"
									name="name"
									defaultValue={dbApp.name}
									required
									maxLength={80}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="domain">Domain</Label>
								<Input
									id="domain"
									name="domain"
									defaultValue={dbApp.domain}
									required
									maxLength={255}
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								name="description"
								defaultValue={dbApp.description || ""}
								maxLength={240}
								rows={3}
							/>
						</div>
						<div className="space-y-2">
							<Label>App Icon</Label>
							<AppAvatarUpload
								slug={dbApp.slug}
								currentAvatarUrl={dbApp.avatarUrl}
								appName={dbApp.name}
								variant="settings"
							/>
						</div>
						<Button type="submit">Save Changes</Button>
					</form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Visibility Settings</CardTitle>
					<CardDescription>Control who can access your app</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<div className="flex items-center gap-2">
								<Label
									htmlFor="visibility-toggle"
									className="text-sm font-medium"
								>
									App Visibility
								</Label>
								<Badge variant={dbApp.isPublic ? "outline" : "secondary"}>
									{dbApp.isPublic ? (
										<>
											<Eye className="w-3 h-3 mr-1" />
											Public
										</>
									) : (
										<>
											<EyeOff className="w-3 h-3 mr-1" />
											Private
										</>
									)}
								</Badge>
							</div>
							<p className="text-sm text-muted-foreground">
								{dbApp.isPublic
									? "Your app is visible to everyone and can be accessed by anyone"
									: "Your app is private and only accessible to you"}
							</p>
						</div>
						<form action={submitUpdateAppVisibilityFormAction}>
							<input type="hidden" name="slug" value={dbApp.slug} />
							<input
								type="hidden"
								name="isPublic"
								value={(!dbApp.isPublic).toString()}
							/>
							<Button type="submit" variant="outline" size="sm">
								{dbApp.isPublic ? "Make Private" : "Make Public"}
							</Button>
						</form>
					</div>
				</CardContent>
			</Card>

			<Card className="border-destructive/50 shadow-destructive/20">
				<CardHeader>
					<CardTitle className="text-destructive">Danger Zone</CardTitle>
					<CardDescription>
						Irreversible and destructive actions
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label className="text-sm font-medium">Delete App</Label>
							<p className="text-sm text-muted-foreground">
								Permanently delete this app and all its data. This action cannot
								be undone.
							</p>
						</div>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="destructive" size="sm" className="text-white">
									<Trash2 className="w-4 h-4 mr-2" />
									Delete App
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										the app &quot;{dbApp.name}&quot; and remove all associated
										data including:
										<br />
										<br />• All feature requests and feedback
										<br />• All boards and their contents
										<br />• All news posts and updates
										<br />• All user comments and upvotes
										<br />• All subscriber information
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<form action={submitDeleteAppFormAction} className="inline">
										<input type="hidden" name="slug" value={dbApp.slug} />
										<Button type="submit" variant="destructive">
											Yes, delete app permanently
										</Button>
									</form>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
