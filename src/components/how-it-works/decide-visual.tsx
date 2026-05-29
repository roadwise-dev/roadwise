"use client";

import { motion } from "motion/react";

export function DecideVisual() {
	return (
		<div className="flex h-full w-full items-center justify-center overflow-hidden p-6">
			<div className="flex w-full gap-4">
				{/* Column 1 */}
				<div className="flex-1 space-y-3 rounded-lg bg-muted/30 p-3">
					<div className="flex items-center gap-2">
						<div className="size-2 rounded-full bg-muted-foreground" />
						<div className="h-3 w-16 rounded bg-muted-foreground/50" />
					</div>
					<div className="rounded border border-border bg-background p-3">
						<div className="mb-2 h-2.5 w-3/4 rounded bg-foreground/80" />
						<div className="h-2 w-1/2 rounded bg-muted-foreground/40" />
					</div>
					<div className="rounded border border-border bg-background p-3 opacity-50">
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
						className="rounded border-2 border-foreground bg-background p-3"
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
