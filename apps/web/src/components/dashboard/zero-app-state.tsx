import { Grid3X3, MessageSquare, Newspaper, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const previewItems = [
	{
		title: "Feedback board",
		description: "Collect requests and let customers vote on what matters.",
		icon: MessageSquare,
	},
	{
		title: "Roadmap boards",
		description: "Organize product ideas into clear status columns.",
		icon: Grid3X3,
	},
	{
		title: "Product updates",
		description: "Publish news so users can follow your progress.",
		icon: Newspaper,
	},
];

export function ZeroAppState() {
	return (
		<div className="flex min-h-[calc(100svh-8rem)] items-center justify-center">
			<section className="w-full max-w-4xl rounded-xl border bg-background p-6 shadow-sm sm:p-8">
				<div className="mx-auto flex max-w-2xl flex-col items-center text-center">
					<div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
						<Plus className="size-6" />
					</div>
					<h1 className="text-3xl font-bold tracking-tight">
						Create your first app
					</h1>
					<p className="mt-3 text-base text-muted-foreground">
						Each app gets its own feedback board, roadmap, product updates, and
						settings so every product has a focused workspace.
					</p>
					<Button asChild size="lg" className="mt-6">
						<Link href="/dashboard/create">
							<Plus className="size-4" />
							Create App
						</Link>
					</Button>
				</div>

				<div className="mt-8 grid gap-3 sm:grid-cols-3">
					{previewItems.map((item) => (
						<div key={item.title} className="rounded-lg border p-4">
							<item.icon className="mb-3 size-5 text-muted-foreground" />
							<h2 className="font-medium">{item.title}</h2>
							<p className="mt-1 text-sm text-muted-foreground">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
