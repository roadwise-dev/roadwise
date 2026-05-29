import {
	BarChart3,
	Bell,
	Globe,
	MessageSquare,
	Moon,
	Users,
	ChevronUp,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Features",
};

export default function FeaturesPage() {
	return (
		<main className="flex flex-col w-full max-container padding-container pb-24">
			<section className="w-full max-w-[1120px] mx-auto px-5 pt-16 pb-20">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-4">
						<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
							Everything you need to build better products.
						</h1>
						<p className="mx-auto max-w-[600px] text-lg text-muted-foreground sm:text-xl">
							Roadwise gives you the tools to capture feedback, prioritize by
							demand, and communicate progress.
						</p>
					</div>
				</div>
			</section>

			<section className="w-full max-w-[1120px] mx-auto px-5">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
					{/* Feedback Boards (Spans 2 columns) */}
					<div className="group relative col-span-1 md:col-span-2 flex flex-col overflow-hidden rounded-3xl border border-border bg-background transition-colors hover:border-foreground/30">
						<div className="relative flex-1 p-8 pb-0">
							<div className="flex items-center gap-3 mb-4">
								<div className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background">
									<MessageSquare className="size-5" />
								</div>
								<h3 className="text-xl font-semibold text-foreground">
									Feedback Boards
								</h3>
							</div>
							<p className="text-muted-foreground max-w-[400px]">
								Give your users a dedicated, public space to submit ideas and
								upvote the features they care about most.
							</p>
						</div>
						<div className="relative h-48 w-full translate-y-8 translate-x-8 rounded-tl-xl border border-border bg-muted/20 shadow-sm transition-transform duration-500 group-hover:translate-y-4 group-hover:translate-x-4">
							<div className="absolute inset-0 p-6 space-y-4">
								{[1, 2].map((i) => (
									<div
										key={i}
										className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 shadow-sm"
									>
										<div className="flex flex-col items-center justify-center rounded-md border border-border bg-muted/30 p-2">
											<ChevronUp className="size-4 text-muted-foreground" />
											<span className="text-xs font-medium mt-1">
												{124 - i * 15}
											</span>
										</div>
										<div className="space-y-2 flex-1">
											<div className="h-2.5 w-3/4 rounded bg-foreground/80" />
											<div className="h-2 w-1/2 rounded bg-muted-foreground/40" />
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Analytics (Spans 1 column) */}
					<div className="group relative col-span-1 flex flex-col overflow-hidden rounded-3xl border border-border bg-background transition-colors hover:border-foreground/30">
						<div className="p-8">
							<div className="flex items-center gap-3 mb-4">
								<div className="flex size-10 items-center justify-center rounded-xl border border-border bg-muted/20 text-foreground">
									<BarChart3 className="size-5" />
								</div>
								<h3 className="text-xl font-semibold text-foreground">
									Analytics
								</h3>
							</div>
							<p className="text-muted-foreground">
								Gain deep insights into user priorities and track engagement
								over time.
							</p>
						</div>
						<div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-muted/30 to-transparent flex items-end justify-center pb-8 opacity-70 transition-opacity duration-500 group-hover:opacity-100">
							<div className="flex items-end gap-2 h-24">
								{[40, 70, 45, 90, 65, 100].map((h, i) => (
									<div
										key={i}
										className="w-8 rounded-t-sm bg-foreground/20"
										style={{ height: `${h}%` }}
									/>
								))}
							</div>
						</div>
					</div>

					{/* Notifications (Spans 1 column) */}
					<div className="group relative col-span-1 flex flex-col overflow-hidden rounded-3xl border border-border bg-background transition-colors hover:border-foreground/30">
						<div className="p-8">
							<div className="flex items-center gap-3 mb-4">
								<div className="flex size-10 items-center justify-center rounded-xl border border-border bg-muted/20 text-foreground">
									<Bell className="size-5" />
								</div>
								<h3 className="text-xl font-semibold text-foreground">
									Notifications
								</h3>
							</div>
							<p className="text-muted-foreground">
								Stay updated instantly when a user submits new feedback or
								votes.
							</p>
						</div>
						<div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] rounded-lg border border-border bg-background p-4 shadow-lg transition-transform duration-500 group-hover:-translate-y-2">
							<div className="flex gap-3">
								<div className="mt-0.5 size-2 rounded-full bg-foreground" />
								<div>
									<p className="text-sm font-medium text-foreground">
										New Feature Request
									</p>
									<p className="mt-1 text-xs text-muted-foreground">
										"Please add SSO support..."
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Dark Mode (Spans 2 columns) */}
					<div className="group relative col-span-1 md:col-span-2 flex flex-col overflow-hidden rounded-3xl border border-foreground bg-foreground text-background transition-colors">
						<div className="relative z-10 p-8">
							<div className="flex items-center gap-3 mb-4">
								<div className="flex size-10 items-center justify-center rounded-xl bg-background/10 text-background">
									<Moon className="size-5" />
								</div>
								<h3 className="text-xl font-semibold text-background">
									Stunning Dark Mode
								</h3>
							</div>
							<p className="text-background/70 max-w-[400px]">
								A gorgeous, high-contrast dark theme built right in, ensuring
								your feedback boards look incredible at any hour.
							</p>
						</div>
						<div className="absolute -bottom-24 -right-12 size-96 rounded-full bg-background/5 blur-3xl transition-transform duration-700 group-hover:scale-110" />
						<div className="absolute right-12 bottom-12 flex size-32 items-center justify-center rounded-full border border-background/10 bg-background/5 backdrop-blur-sm">
							<Moon className="size-12 text-background/80" />
						</div>
					</div>

					{/* Team Collaboration (Spans 2 columns) */}
					<div className="group relative col-span-1 md:col-span-2 flex flex-col overflow-hidden rounded-3xl border border-border bg-background transition-colors hover:border-foreground/30">
						<div className="p-8">
							<div className="flex items-center gap-3 mb-4">
								<div className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background">
									<Users className="size-5" />
								</div>
								<h3 className="text-xl font-semibold text-foreground">
									Team Collaboration
								</h3>
							</div>
							<p className="text-muted-foreground max-w-[400px]">
								Add your team members to manage statuses, leave internal notes,
								and coordinate the roadmap together.
							</p>
						</div>
						<div className="absolute bottom-8 right-8 flex -space-x-4">
							{[1, 2, 3, 4].map((i) => (
								<div
									key={i}
									className="flex size-14 items-center justify-center rounded-full border-4 border-background bg-muted text-lg font-medium text-muted-foreground shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:z-10"
								>
									T{i}
								</div>
							))}
						</div>
					</div>

					{/* Global/Language (Spans 1 column) */}
					<div className="group relative col-span-1 flex flex-col overflow-hidden rounded-3xl border border-border bg-background transition-colors hover:border-foreground/30">
						<div className="p-8">
							<div className="flex items-center gap-3 mb-4">
								<div className="flex size-10 items-center justify-center rounded-xl border border-border bg-muted/20 text-foreground">
									<Globe className="size-5" />
								</div>
								<h3 className="text-xl font-semibold text-foreground">
									Global Ready
								</h3>
							</div>
							<p className="text-muted-foreground">
								Built to support users worldwide with customizable localization
								options.
							</p>
						</div>
						<div className="absolute -bottom-8 -right-8 opacity-20 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110">
							<Globe className="size-48 text-foreground" />
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
