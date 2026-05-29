"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
	Send,
	ChevronUp,
	Layout,
	Megaphone,
	Search,
	Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
	{
		id: "capture",
		title: "Capture",
		description:
			"Users submit requests on a public board instead of scattering ideas across email, chat, and calls.",
		icon: Send,
	},
	{
		id: "measure",
		title: "Measure",
		description:
			"Votes and comments show which problems keep coming up, without turning every request into a meeting.",
		icon: ChevronUp,
	},
	{
		id: "decide",
		title: "Decide",
		description:
			"Move requests through clear statuses so the roadmap reflects real intent, not a stale backlog.",
		icon: Layout,
	},
	{
		id: "announce",
		title: "Announce",
		description:
			"Publish updates and product news so customers see progress and know their feedback mattered.",
		icon: Megaphone,
	},
];

function CaptureVisual() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center p-6">
			<div className="w-full max-w-sm rounded-xl border border-border bg-background p-5 shadow-sm">
				<h4 className="mb-4 text-sm font-semibold text-foreground">
					Suggest a feature
				</h4>
				<div className="space-y-3">
					<div className="space-y-1.5">
						<div className="h-3 w-16 rounded bg-muted-foreground/40" />
						<div className="h-9 w-full rounded-md border border-border bg-muted/20" />
					</div>
					<div className="space-y-1.5">
						<div className="h-3 w-20 rounded bg-muted-foreground/40" />
						<div className="h-24 w-full rounded-md border border-border bg-muted/20" />
					</div>
					<div className="flex justify-end pt-2">
						<div className="flex h-9 w-24 items-center justify-center rounded-md bg-foreground text-sm font-medium text-background">
							Submit
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function MeasureVisual() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center p-6">
			<div className="w-full max-w-sm space-y-3">
				{[
					{ title: "Dark mode support", votes: 243, active: true },
					{ title: "API access for enterprise", votes: 189, active: false },
					{ title: "Mobile app notifications", votes: 94, active: false },
				].map((item, i) => (
					<div
						key={i}
						className={cn(
							"flex items-center gap-4 rounded-xl border p-3",
							item.active
								? "border-foreground bg-background shadow-sm"
								: "border-border bg-muted/20",
						)}
					>
						<div
							className={cn(
								"flex flex-col items-center justify-center rounded-lg border p-2",
								item.active
									? "border-border bg-muted/50"
									: "border-transparent bg-transparent",
							)}
						>
							<ChevronUp
								className={cn(
									"size-4",
									item.active ? "text-foreground" : "text-muted-foreground",
								)}
							/>
							<span
								className={cn(
									"mt-1 text-sm font-semibold",
									item.active ? "text-foreground" : "text-muted-foreground",
								)}
							>
								{item.votes}
							</span>
						</div>
						<div className="flex-1 space-y-2">
							<div
								className={cn(
									"h-3 w-3/4 rounded",
									item.active ? "bg-foreground" : "bg-muted-foreground/50",
								)}
							/>
							<div className="h-2 w-1/2 rounded bg-muted-foreground/20" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function DecideVisual() {
	return (
		<div className="flex h-full w-full items-center justify-center overflow-hidden p-6">
			<div className="flex w-full gap-4">
				{/* Column 1 */}
				<div className="flex-1 space-y-3 rounded-lg bg-muted/30 p-3">
					<div className="flex items-center gap-2">
						<div className="size-2 rounded-full bg-muted-foreground" />
						<div className="h-3 w-16 rounded bg-muted-foreground/50" />
					</div>
					<div className="rounded border border-border bg-background p-3 shadow-sm">
						<div className="mb-2 h-2.5 w-3/4 rounded bg-foreground/80" />
						<div className="h-2 w-1/2 rounded bg-muted-foreground/40" />
					</div>
					<div className="rounded border border-border bg-background p-3 shadow-sm opacity-50">
						<div className="mb-2 h-2.5 w-2/3 rounded bg-foreground/80" />
						<div className="h-2 w-1/3 rounded bg-muted-foreground/40" />
					</div>
				</div>
				{/* Column 2 */}
				<div className="flex-1 space-y-3 rounded-lg bg-muted/30 p-3">
					<div className="flex items-center gap-2">
						<div className="size-2 rounded-full bg-foreground" />
						<div className="h-3 w-20 rounded bg-foreground" />
					</div>
					<motion.div
						className="rounded border-2 border-foreground bg-background p-3 shadow-md"
						layoutId="decide-card"
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.4 }}
					>
						<div className="mb-2 h-2.5 w-full rounded bg-foreground" />
						<div className="h-2 w-2/3 rounded bg-muted-foreground/60" />
						<div className="mt-4 flex items-center justify-between border-t border-border pt-3">
							<div className="h-4 w-12 rounded bg-muted" />
							<div className="size-5 rounded-full bg-foreground/20" />
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}

function AnnounceVisual() {
	return (
		<div className="flex h-full w-full items-center justify-center p-6">
			<div className="w-full max-w-sm overflow-hidden rounded-xl border border-border bg-background shadow-sm">
				<div className="border-b border-border bg-muted/20 px-5 py-4">
					<div className="flex items-center gap-2 mb-3">
						<Sparkles className="size-4 text-foreground" />
						<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
							Changelog
						</span>
					</div>
					<h4 className="text-lg font-semibold text-foreground">
						New: Advanced filtering & search
					</h4>
					<p className="mt-1 text-xs text-muted-foreground">May 29, 2026</p>
				</div>
				<div className="p-5 space-y-4">
					<div className="space-y-2">
						<div className="h-2 w-full rounded bg-muted-foreground/30" />
						<div className="h-2 w-full rounded bg-muted-foreground/30" />
						<div className="h-2 w-4/5 rounded bg-muted-foreground/30" />
					</div>
					<div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border bg-muted/10">
						<Search className="size-6 text-muted-foreground/40" />
					</div>
				</div>
			</div>
		</div>
	);
}

export function HowItWorks() {
	const [activeStep, setActiveStep] = useState(steps[0].id);

	const renderVisual = () => {
		switch (activeStep) {
			case "capture":
				return <CaptureVisual />;
			case "measure":
				return <MeasureVisual />;
			case "decide":
				return <DecideVisual />;
			case "announce":
				return <AnnounceVisual />;
			default:
				return null;
		}
	};

	return (
		<section className="w-full max-w-[1120px] mx-auto px-5">
			<div className="mx-auto max-w-3xl text-center mb-16">
				<p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
					The product loop
				</p>
				<h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
					A feedback loop your users understand
				</h2>
				<p className="mt-5 text-lg leading-8 text-muted-foreground">
					Roadwise keeps the loop simple: users submit what they need, your team
					sorts the signal, and everyone can see what is planned or shipped.
				</p>
			</div>

			<div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-12">
				{/* Left: Steps Tab List */}
				<div className="flex flex-col gap-2">
					{steps.map((step) => {
						const isActive = activeStep === step.id;
						return (
							<button
								key={step.id}
								onClick={() => setActiveStep(step.id)}
								className={cn(
									"group flex flex-col items-start gap-2 rounded-xl border p-5 text-left transition-all",
									isActive
										? "border-foreground bg-background shadow-sm"
										: "border-transparent hover:bg-muted/30",
								)}
							>
								<div className="flex w-full items-center justify-between">
									<h3
										className={cn(
											"text-lg font-semibold transition-colors",
											isActive
												? "text-foreground"
												: "text-muted-foreground group-hover:text-foreground/80",
										)}
									>
										{step.title}
									</h3>
									<step.icon
										className={cn(
											"size-5 transition-colors",
											isActive
												? "text-foreground"
												: "text-muted-foreground/50 group-hover:text-muted-foreground",
										)}
									/>
								</div>
								<AnimatePresence>
									{isActive && (
										<motion.p
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.2 }}
											className="overflow-hidden text-sm leading-relaxed text-muted-foreground"
										>
											<span className="block pt-2">{step.description}</span>
										</motion.p>
									)}
								</AnimatePresence>
							</button>
						);
					})}
				</div>

				{/* Right: Visual Mockup Area */}
				<div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted/10 sm:aspect-[4/3] lg:aspect-auto lg:h-[500px]">
					<AnimatePresence mode="wait">
						<motion.div
							key={activeStep}
							initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
							animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
							transition={{ duration: 0.3 }}
							className="absolute inset-0"
						>
							{renderVisual()}
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
