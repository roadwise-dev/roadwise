"use client";

import { motion } from "motion/react";

const withoutRoadwise = [
	"Requests live in Slack, email, calls, and support tools.",
	"The same ideas get repeated because users cannot see what already exists.",
	"Roadmap decisions are hard to explain after the fact.",
];

const withRoadwise = [
	"Users submit and vote in one public feedback board.",
	"Your team sees demand, comments, and status in the same workflow.",
	"Updates and news close the loop when work ships.",
];

function WorkflowColumn({ label, rows }: { label: string; rows: string[] }) {
	return (
		<div className="rounded-lg border border-border bg-background">
			<div className="border-b border-border px-5 py-4">
				<p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
					{label}
				</p>
			</div>
			<div className="divide-y divide-border">
				{rows.map((row) => (
					<p key={row} className="px-5 py-5 text-sm leading-6 text-foreground">
						{row}
					</p>
				))}
			</div>
		</div>
	);
}

export function BeforeAfterWorkflow() {
	return (
		<motion.section
			className="w-full max-w-[1120px] mx-auto px-5 padding-container"
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

			<div className="mt-10 grid gap-3 md:grid-cols-2">
				<WorkflowColumn label="Without Roadwise" rows={withoutRoadwise} />
				<WorkflowColumn label="With Roadwise" rows={withRoadwise} />
			</div>

			<p className="mx-auto mt-8 max-w-2xl border-l border-foreground pl-4 text-base leading-7 text-foreground">
				Less manual triage. Fewer repeated conversations. Clearer product
				decisions.
			</p>
		</motion.section>
	);
}
