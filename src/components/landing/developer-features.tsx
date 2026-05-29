"use client";

import { Code, Terminal, Zap } from "lucide-react";
import { motion } from "motion/react";

const proofPoints = [
	{
		title: "Lightning Fast",
		description: "Built on a modern stack for zero-latency interactions.",
		icon: Zap,
	},
	{
		title: "Open Source",
		description: "Self-host it or use our managed cloud. Fully transparent codebase.",
		icon: Code,
	},
	{
		title: "Anywhere you work",
		description: "Native clients for Raycast, CLI, and MCP. Manage feedback without leaving your terminal.",
		icon: Terminal,
	},
];

export default function DeveloperFeatures() {
	return (
		<motion.section
			className="w-full max-w-[1120px] mx-auto px-5"
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			<div className="mx-auto max-w-3xl text-center">
				<h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
					Built for engineers who ship.
				</h2>
				<p className="mt-5 text-lg leading-8 text-muted-foreground sm:text-xl">
					Roadwise is a developer-first feedback engine that fits right into your stack.
					No more scattered requests across GitHub, Slack, and email.
				</p>
			</div>

			<div className="mt-16 grid gap-6 sm:grid-cols-3">
				{proofPoints.map((point, i) => (
					<motion.div
						key={point.title}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-80px" }}
						transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
						className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-border bg-background p-8 text-center transition-colors hover:border-foreground/30"
					>
						<div className="mb-6 flex size-14 items-center justify-center rounded-full border border-border bg-muted/50 transition-colors group-hover:bg-foreground group-hover:text-background">
							<point.icon className="size-6 transition-transform duration-300 group-hover:scale-110" />
						</div>
						<h3 className="mb-2 text-lg font-semibold text-foreground">
							{point.title}
						</h3>
						<p className="text-sm leading-relaxed text-muted-foreground">
							{point.description}
						</p>
					</motion.div>
				))}
			</div>
		</motion.section>
	);
}
