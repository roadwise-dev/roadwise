"use client";

import { ChevronUp, Layout, Megaphone, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnnounceVisual } from "./how-it-works/announce-visual";
import { CaptureVisual } from "./how-it-works/capture-visual";
import { DecideVisual } from "./how-it-works/decide-visual";
import { MeasureVisual } from "./how-it-works/measure-visual";

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
								type="button"
								key={step.id}
								onClick={() => setActiveStep(step.id)}
								className={cn(
									"group flex flex-col items-start gap-2 rounded-2xl border p-5 text-left transition-all",
									isActive
										? "border-foreground bg-background"
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
				<div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-muted/10 sm:aspect-[4/3] lg:aspect-auto lg:h-[500px]">
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
