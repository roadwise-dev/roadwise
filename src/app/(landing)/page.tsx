"use client";

import { motion } from "motion/react";
import { Features } from "@/components/blocks/features-8";
import { HowItWorks } from "@/components/how-it-works";
import { BeforeAfterWorkflow } from "@/components/landing/before-after-workflow";
import { CallToAction } from "@/components/landing/cta";
import Hero from "@/components/landing/hero";
import Logos from "@/components/landing/logos";

export default function HomePage() {
	const sections = [
		{ id: "hero", component: <Hero />, delay: 0 },
		{ id: "narrative", component: <Logos />, delay: 0.1 },
		{ id: "before-after", component: <BeforeAfterWorkflow />, delay: 0.15 },
		{ id: "workflow", component: <HowItWorks />, delay: 0.2 },
		{ id: "features", component: <Features />, delay: 0.25 },
		{
			id: "cta",
			component: (
				<CallToAction
					title="Start collecting better feedback"
					description="Create a Roadwise board for your product and give users a clear place to request, vote, and follow progress."
					buttons={[
						{
							text: "Start for free",
							href: "/signup",
						},
					]}
				/>
			),
			delay: 0.3,
		},
	];

	return (
		<main className="flex flex-col gap-16 sm:gap-30">
			{sections.map((section) => (
				<motion.div
					key={section.id}
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{
						duration: 0.5,
						delay: section.delay / 2,
						ease: "easeOut",
					}}
				>
					{section.component}
				</motion.div>
			))}
		</main>
	);
}
