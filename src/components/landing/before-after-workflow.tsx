"use client";

import { motion } from "motion/react";
import {
	MessageSquare,
	Mail,
	FileText,
	ChevronUp,
	CheckCircle2,
} from "lucide-react";

function ChaosVisual() {
	return (
		<div className="relative h-[340px] w-full overflow-hidden rounded-2xl border border-border bg-muted/20 p-4 sm:h-[400px]">
			{/* Slack-like message */}
			<motion.div
				className="absolute left-[5%] top-[10%] w-[80%] -rotate-2 rounded-xl border border-border bg-background/90 p-4 shadow-sm backdrop-blur-sm"
				initial={{ opacity: 0, x: -20, y: 10, rotate: -8 }}
				whileInView={{ opacity: 0.8, x: 0, y: 0, rotate: -2 }}
				viewport={{ once: true, margin: "-50px" }}
				transition={{ duration: 0.6, delay: 0.1 }}
			>
				<div className="flex items-center gap-2 mb-2">
					<MessageSquare className="size-4 text-muted-foreground" />
					<div className="h-2 w-16 rounded bg-muted-foreground/30" />
				</div>
				<div className="space-y-2">
					<div className="h-2 w-full rounded bg-muted-foreground/20" />
					<div className="h-2 w-4/5 rounded bg-muted-foreground/20" />
				</div>
			</motion.div>

			{/* Email-like message */}
			<motion.div
				className="absolute right-[5%] top-[35%] w-[85%] rotate-3 rounded-xl border border-border bg-background/90 p-4 shadow-sm backdrop-blur-sm"
				initial={{ opacity: 0, x: 20, y: 10, rotate: 8 }}
				whileInView={{ opacity: 0.8, x: 0, y: 0, rotate: 3 }}
				viewport={{ once: true, margin: "-50px" }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				<div className="flex items-center gap-2 mb-2">
					<Mail className="size-4 text-muted-foreground" />
					<div className="h-2 w-24 rounded bg-muted-foreground/30" />
				</div>
				<div className="space-y-2">
					<div className="h-2 w-[90%] rounded bg-muted-foreground/20" />
					<div className="h-2 w-3/4 rounded bg-muted-foreground/20" />
					<div className="h-2 w-1/2 rounded bg-muted-foreground/20" />
				</div>
			</motion.div>

			{/* Notes-like message */}
			<motion.div
				className="absolute bottom-[10%] left-[10%] w-[75%] -rotate-1 rounded-xl border border-border bg-background/90 p-4 shadow-sm backdrop-blur-sm"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 0.8, y: 0, rotate: -1 }}
				viewport={{ once: true, margin: "-50px" }}
				transition={{ duration: 0.6, delay: 0.3 }}
			>
				<div className="flex items-center gap-2 mb-2">
					<FileText className="size-4 text-muted-foreground" />
					<div className="h-2 w-20 rounded bg-muted-foreground/30" />
				</div>
				<div className="space-y-2">
					<div className="h-2 w-full rounded bg-muted-foreground/20" />
					<div className="h-2 w-2/3 rounded bg-muted-foreground/20" />
				</div>
			</motion.div>

			<div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent pointer-events-none" />
		</div>
	);
}

function ClarityVisual() {
	return (
		<div className="relative flex h-[340px] w-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-sm sm:h-[400px]">
			<div className="mb-4 flex items-center justify-between border-b border-border pb-4">
				<div className="flex items-center gap-2">
					<div className="size-6 rounded bg-foreground" />
					<div className="h-4 w-24 rounded bg-foreground/90" />
				</div>
				<div className="h-6 w-16 rounded-full bg-muted" />
			</div>

			<div className="flex flex-col gap-3">
				{[
					{ votes: 142, status: "Planned", active: true },
					{ votes: 89, status: "Under Review", active: false },
					{ votes: 56, status: "Shipped", active: false, shipped: true },
				].map((item, i) => (
					<motion.div
						key={i}
						className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${
							item.active
								? "border-foreground shadow-sm"
								: "border-border bg-muted/10"
						}`}
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.4, delay: i * 0.15 }}
					>
						<div className="flex items-center gap-3">
							<div
								className={`flex flex-col items-center justify-center rounded-md border p-1.5 ${
									item.active
										? "border-border bg-background"
										: "border-transparent bg-muted/50"
								}`}
							>
								<ChevronUp
									className={`size-3 ${
										item.active ? "text-foreground" : "text-muted-foreground"
									}`}
								/>
								<span
									className={`text-xs font-semibold mt-0.5 ${
										item.active ? "text-foreground" : "text-muted-foreground"
									}`}
								>
									{item.votes}
								</span>
							</div>
							<div className="space-y-1.5">
								<div
									className={`h-2.5 w-32 rounded ${
										item.active ? "bg-foreground" : "bg-muted-foreground/40"
									}`}
								/>
								<div
									className={`h-2 w-20 rounded ${
										item.active
											? "bg-muted-foreground"
											: "bg-muted-foreground/20"
									}`}
								/>
							</div>
						</div>
						{item.shipped ? (
							<div className="flex items-center gap-1.5 rounded-full bg-foreground/5 px-2 py-1 text-xs font-medium text-foreground">
								<CheckCircle2 className="size-3" />
								{item.status}
							</div>
						) : (
							<div
								className={`rounded-full px-2.5 py-1 text-xs font-medium ${
									item.active
										? "bg-foreground text-background"
										: "bg-muted text-muted-foreground"
								}`}
							>
								{item.status}
							</div>
						)}
					</motion.div>
				))}
			</div>

			<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
		</div>
	);
}

export function BeforeAfterWorkflow() {
	return (
		<motion.section
			className="w-full max-w-[1120px] mx-auto px-5"
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			<div className="mx-auto max-w-3xl text-center">
				<h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
					From scattered requests to a visible product loop
				</h2>
				<p className="mt-5 text-lg leading-8 text-muted-foreground">
					Roadwise turns informal feedback into a place users can follow and
					your team can act on.
				</p>
			</div>

			<div className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-12 items-center">
				<div className="flex flex-col gap-6">
					<div className="space-y-2 text-center md:text-left">
						<h3 className="text-xl font-semibold tracking-tight text-muted-foreground">
							Without Roadwise
						</h3>
						<p className="text-sm text-muted-foreground/80">
							Requests live in Slack, email, and support tools. Ideas get
							repeated. Decisions are hard to track.
						</p>
					</div>
					<ChaosVisual />
				</div>

				<div className="flex flex-col gap-6">
					<div className="space-y-2 text-center md:text-left">
						<h3 className="text-xl font-semibold tracking-tight text-foreground">
							With Roadwise
						</h3>
						<p className="text-sm text-muted-foreground">
							One public feedback board. Your team sees demand, statuses are
							clear, and loops are closed.
						</p>
					</div>
					<ClarityVisual />
				</div>
			</div>
		</motion.section>
	);
}
