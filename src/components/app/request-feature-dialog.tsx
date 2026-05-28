"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createFeatureRequest } from "@/actions/request-feature";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserData } from "@/hooks/use-user-data";

const formSchema = z.object({
	name: z.string().min(2, { message: "Name must be at least 2 characters" }),
	title: z
		.string()
		.min(3, { message: "Feature title must be at least 3 characters" }),
	description: z
		.string()
		.min(10, { message: "Description must be at least 10 characters" }),
	tags: z.array(z.string()).max(5, { message: "You can add up to 5 tags" }),
	appId: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateFeatureDialog({
	appId,
	appName,
}: {
	appId: string;
	appName: string;
}) {
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [tagInput, setTagInput] = useState("");
	const { userData, isLoaded, updateName } = useUserData();
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			title: "",
			description: "",
			tags: [],
			appId: appId,
		},
	});

	// Update form values when userData loads or changes
	useEffect(() => {
		if (isLoaded) {
			form.setValue("name", userData.name);
		}
	}, [isLoaded, userData, form]);

	// Watch the tags array for updates
	const watchedTags = form.watch("tags");

	const addTag = () => {
		const trimmedTag = tagInput.trim().toLowerCase();
		if (
			trimmedTag &&
			!watchedTags.includes(trimmedTag) &&
			watchedTags.length < 5
		) {
			const newTags = [...watchedTags, trimmedTag];
			form.setValue("tags", newTags);
			setTagInput("");
		}
	};

	const removeTag = (tagToRemove: string) => {
		const newTags = watchedTags.filter((tag) => tag !== tagToRemove);
		form.setValue("tags", newTags);
	};

	const handleTagKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			addTag();
		}
	};

	async function onSubmit(values: FormValues) {
		setIsSubmitting(true);

		// Update localStorage with the latest name
		updateName(values.name);

		const result = await createFeatureRequest(values);

		if (result.success) {
			setOpen(false);
			toast("Feature request submitted successfully!", {
				description: `Your request for "${values.title}" has been added to ${appName}`,
				action: {
					label: "View",
					onClick: () => router.push(`?id=${result.featureId}`),
				},
			});
			form.reset({
				name: values.name, // Keep the name for next time
				title: "",
				description: "",
				tags: [],
				appId: appId,
			});
			setTagInput("");

			// Refresh the page to show the new feature
			router.refresh();
		} else {
			toast("Failed to submit feature request", {
				description: result.error,
			});
		}

		setIsSubmitting(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="flex items-center gap-2">
					<Plus className="h-4 w-4" />
					New Request
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[525px]">
				<DialogHeader>
					<DialogTitle>Request a Feature</DialogTitle>
					<DialogDescription>
						Submit a new feature request for {appName}. Describe what you&apos;d
						like to see implemented.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Your name</FormLabel>
									<FormControl>
										<Input placeholder="John Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Feature title</FormLabel>
									<FormControl>
										<Input placeholder="Dark mode support" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Describe the feature in detail. What problem does it solve? How should it work?"
											className="min-h-[100px]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="space-y-2">
							<FormLabel>Tags (optional)</FormLabel>
							<div className="flex gap-2">
								<Input
									placeholder="Add a tag"
									value={tagInput}
									onChange={(e) => setTagInput(e.target.value)}
									onKeyPress={handleTagKeyPress}
									disabled={watchedTags.length >= 5}
								/>
								<Button
									type="button"
									variant="outline"
									onClick={addTag}
									disabled={!tagInput.trim() || watchedTags.length >= 5}
								>
									Add
								</Button>
							</div>
							{watchedTags.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-2">
									{watchedTags.map((tag) => (
										<Badge
											key={tag}
											variant="secondary"
											className="flex items-center gap-1"
										>
											{tag}
											<X
												className="h-3 w-3 cursor-pointer"
												onClick={() => removeTag(tag)}
											/>
										</Badge>
									))}
								</div>
							)}
							<p className="text-xs text-muted-foreground">
								Tags help categorize your request. You can add up to 5 tags.
							</p>
						</div>

						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant="outline">
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? "Submitting..." : "Submit Request"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
