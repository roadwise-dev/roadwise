import { Card, CardContent } from "@/components/ui/card";

const boardRequests = [
	{
		title: "Add team roles",
		status: "Planned",
		votes: 48,
	},
	{
		title: "Slack digest for new feedback",
		status: "In review",
		votes: 32,
	},
	{
		title: "Custom public board domain",
		status: "Shipped",
		votes: 21,
	},
];

const rankedRequests = [
	{ title: "Import requests from CSV", votes: 82 },
	{ title: "Merge duplicate ideas", votes: 64 },
	{ title: "Notify voters on ship", votes: 51 },
];

const statuses = ["New", "Planned", "In progress", "Shipped", "Closed"];

const setupSteps = ["Create app", "Choose board", "Invite users"];

export function Features() {
	return (
		<section className="w-full max-w-[1120px] mx-auto px-5 padding-container">
			<div className="mx-auto max-w-3xl text-center">
				<h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
					Everything you need, accessible via API
				</h2>
				<p className="mt-4 text-lg leading-8 text-muted-foreground sm:text-xl">
					A focused set of tools for collecting ideas and understanding demand.
					Use our drop-in components or build your own UI.
				</p>
			</div>

			<div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-6">
				<Card className="rounded-3xl shadow-none relative overflow-hidden lg:col-span-4">
					<CardContent className="grid gap-8 p-6 lg:grid-cols-[0.85fr_1.15fr] lg:p-8">
						<div className="flex flex-col justify-between gap-8">
							<div>
								<p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
									Boards
								</p>
								<h3 className="mt-3 text-2xl font-semibold">
									Drop-in React components
								</h3>
								<p className="mt-4 text-sm leading-6 text-muted-foreground">
									Give every product a clean board using our fully styled
									components, or consume our headless API for complete control.
								</p>
							</div>
							<div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
								<span className="rounded-full border px-3 py-1">Requests</span>
								<span className="rounded-full border px-3 py-1">Comments</span>
								<span className="rounded-full border px-3 py-1">Votes</span>
							</div>
						</div>

						<div className="rounded-2xl border bg-muted/30 p-3">
							<div className="rounded-xl border bg-background">
								<div className="flex items-center justify-between border-b px-4 py-3">
									<div>
										<p className="text-sm font-semibold">Roadwise feedback</p>
										<p className="text-xs text-muted-foreground">
											3 open requests
										</p>
									</div>
									<button
										type="button"
										className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background"
									>
										Add request
									</button>
								</div>
								<div className="divide-y">
									{boardRequests.map((request) => (
										<div
											key={request.title}
											className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3"
										>
											<div>
												<p className="text-sm font-medium">{request.title}</p>
												<span className="mt-2 inline-flex rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
													{request.status}
												</span>
											</div>
											<div className="flex min-w-12 flex-col items-center justify-center rounded-md border bg-background px-2 py-1 text-xs">
												<span className="font-semibold">{request.votes}</span>
												<span className="text-muted-foreground">votes</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="rounded-3xl shadow-none lg:col-span-2">
					<CardContent className="flex h-full flex-col justify-between gap-8 p-6 lg:p-8">
						<div>
							<p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
								Demand
							</p>
							<h3 className="mt-3 text-2xl font-semibold">
								Data-driven sorting
							</h3>
							<p className="mt-4 text-sm leading-6 text-muted-foreground">
								Surface the requests people keep asking for, without manually
								triaging GitHub issues or support tickets.
							</p>
						</div>
						<div className="space-y-3">
							{rankedRequests.map((request, index) => (
								<div key={request.title} className="rounded-lg border p-3">
									<div className="flex items-center justify-between gap-3">
										<p className="text-sm font-medium">{request.title}</p>
										<span className="text-sm font-semibold">
											{request.votes}
										</span>
									</div>
									<div className="mt-3 h-1.5 rounded-full bg-muted">
										<div
											className="h-full rounded-full bg-foreground"
											style={{ width: `${92 - index * 18}%` }}
										/>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="rounded-3xl shadow-none lg:col-span-2">
					<CardContent className="flex h-full flex-col justify-between gap-8 p-6 lg:p-8">
						<div>
							<p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
								Roadmap
							</p>
							<h3 className="mt-3 text-2xl font-semibold">Roadmap statuses</h3>
							<p className="mt-4 text-sm leading-6 text-muted-foreground">
								Mark requests as planned, in progress, shipped, or closed so
								expectations stay clear.
							</p>
						</div>
						<div className="flex flex-wrap gap-2">
							{statuses.map((status, index) => (
								<span
									key={status}
									className="rounded-full border px-3 py-1.5 text-sm"
								>
									{index + 1}. {status}
								</span>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="rounded-3xl shadow-none lg:col-span-4">
					<CardContent className="grid gap-8 p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
						<div>
							<p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
								Updates
							</p>
							<h3 className="mt-3 text-2xl font-semibold">
								Product updates and news
							</h3>
							<p className="mt-4 text-sm leading-6 text-muted-foreground">
								Publish release notes and product updates from the same place
								users already follow feedback.
							</p>
						</div>
						<div className="rounded-2xl border bg-muted/30 p-4">
							<article className="rounded-xl border bg-background p-4">
								<div className="flex items-center justify-between gap-4">
									<span className="rounded-full border px-2.5 py-1 text-xs font-medium">
										Shipped
									</span>
									<time className="text-xs text-muted-foreground">Today</time>
								</div>
								<h4 className="mt-4 text-base font-semibold">
									Custom board statuses are live
								</h4>
								<p className="mt-2 text-sm leading-6 text-muted-foreground">
									Teams can now show exactly where a request stands and notify
									users when an idea moves forward.
								</p>
								<div className="mt-4 flex gap-2 text-xs text-muted-foreground">
									<span className="rounded-full bg-muted px-2 py-1">
										Roadmap
									</span>
									<span className="rounded-full bg-muted px-2 py-1">News</span>
								</div>
							</article>
						</div>
					</CardContent>
				</Card>

				<Card className="rounded-3xl shadow-none lg:col-span-3">
					<CardContent className="grid h-full gap-8 p-6 sm:grid-cols-[0.9fr_1.1fr] lg:p-8">
						<div>
							<p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
								Setup
							</p>
							<h3 className="mt-3 text-2xl font-semibold">Deploy in minutes</h3>
							<p className="mt-4 text-sm leading-6 text-muted-foreground">
								Create an app and start collecting feedback instantly. Works
								seamlessly with Next.js, Vite, and other modern frameworks.
							</p>
						</div>
						<div className="space-y-3">
							{setupSteps.map((step, index) => (
								<div
									key={step}
									className="flex items-center gap-3 rounded-lg border p-3"
								>
									<span className="flex size-7 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background">
										{index + 1}
									</span>
									<span className="text-sm font-medium">{step}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="rounded-3xl shadow-none lg:col-span-3">
					<CardContent className="grid h-full gap-8 p-6 sm:grid-cols-[0.9fr_1.1fr] lg:p-8">
						<div>
							<p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
								Brand
							</p>
							<h3 className="mt-3 text-2xl font-semibold">Bring your own UI</h3>
							<p className="mt-4 text-sm leading-6 text-muted-foreground">
								Customize completely with our headless architecture or use our
								beautiful, accessible defaults.
							</p>
						</div>
						<div className="rounded-2xl border bg-muted/30 p-4">
							<div className="rounded-xl border bg-background p-4">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-foreground text-sm font-semibold text-background">
										R
									</div>
									<div>
										<p className="text-sm font-semibold">Roadwise</p>
										<p className="text-xs text-muted-foreground">
											feedback.yourapp.com
										</p>
									</div>
								</div>
								<div className="mt-5 grid grid-cols-3 gap-2">
									<div className="h-10 rounded-md border bg-background" />
									<div className="h-10 rounded-md bg-foreground" />
									<div className="h-10 rounded-md border bg-muted" />
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
