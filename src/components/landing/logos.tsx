"use client";

import { motion } from "motion/react";
import { Inbox, BarChart3, RefreshCcw } from "lucide-react";

const proofPoints = [
	{
		title: "Collect requests",
		description: "A single, clear inbox for user feedback.",
		icon: Inbox,
	},
	{
		title: "Prioritize by demand",
		description: "Data-driven decisions over loud voices.",
		icon: BarChart3,
	},
	{
		title: "Close the loop",
		description: "Let users know when their ideas ship.",
		icon: RefreshCcw,
	},
];

export default function Logos() {
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
					Built for teams that want feedback they can actually use.
				</h2>
				<p className="mt-5 text-lg leading-8 text-muted-foreground sm:text-xl">
					Roadwise gives your users one clear place to request features, vote on
					priorities, and follow what changed.
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
