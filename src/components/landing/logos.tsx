"use client";

import { motion } from "motion/react";

const proofPoints = [
	"Collect requests",
	"Prioritize by demand",
	"Close the loop",
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
					priorities, and follow what changed, so product decisions stop
					disappearing into chat threads and support tickets.
				</p>

				<div className="mt-10 grid overflow-hidden rounded-lg border border-border sm:grid-cols-3">
					{proofPoints.map((point) => (
						<div
							key={point}
							className="border-b border-border px-5 py-4 text-sm font-medium text-foreground last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
						>
							{point}
						</div>
					))}
				</div>
			</div>
		</motion.section>
	);
}
