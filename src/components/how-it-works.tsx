"use client";

import { motion } from "motion/react";

const steps = [
	{
		title: "Capture",
		description:
			"Users submit requests on a public board instead of scattering ideas across email, chat, and calls.",
	},
	{
		title: "Measure",
		description:
			"Votes and comments show which problems keep coming up, without turning every request into a meeting.",
	},
	{
		title: "Decide",
		description:
			"Move requests through clear statuses so the roadmap reflects real intent, not a stale backlog.",
	},
	{
		title: "Announce",
		description:
			"Publish updates and product news so customers see progress and know their feedback mattered.",
	},
];

export function HowItWorks() {
	return (
		<section className="w-full max-w-[1120px] mx-auto px-5 padding-container">
			<motion.div
				className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				<div className="max-w-xl">
					<p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
						The product loop
					</p>
					<h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
						A feedback loop your users understand
					</h2>
					<p className="mt-6 text-lg leading-8 text-muted-foreground">
						Most teams already collect feedback. The hard part is turning it
						into a visible product system. Roadwise keeps the loop simple: users
						submit what they need, your team sorts the signal, and everyone can
						see what is planned, shipped, or declined.
					</p>
					<p className="mt-6 border-l border-foreground pl-4 text-base leading-7 text-foreground">
						The result is a quieter roadmap process with fewer repeated
						conversations and a clearer story for customers.
					</p>
				</div>

				<ol className="divide-y divide-border rounded-lg border border-border bg-background">
					{steps.map((step, index) => (
						<li
							key={step.title}
							className="grid gap-4 p-6 sm:grid-cols-[6rem_1fr]"
						>
							<div className="flex items-start gap-3">
								<span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-foreground text-sm font-medium">
									{index + 1}
								</span>
								<span className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground sm:hidden">
									{step.title}
								</span>
							</div>
							<div>
								<h3 className="hidden text-base font-semibold sm:block">
									{step.title}
								</h3>
								<p className="text-sm leading-6 text-muted-foreground sm:mt-2">
									{step.description}
								</p>
							</div>
						</li>
					))}
				</ol>
			</motion.div>
		</section>
	);
}
