"use client";

import { motion } from "motion/react";
import { CallToAction } from "@/components/landing/cta";

// Customer data
const customers = [
	{
		name: "SketchyBar Editor",
		category: "Developer Tools",
		initials: "SB",
		description:
			"Roadwise completely changed how we collect feature requests. Our macOS power users now have a dedicated space to vote, and our roadmap has never been clearer.",
	},
	{
		name: "Albumfy",
		category: "Music & Entertainment",
		initials: "AF",
		description:
			"We transformed our product roadmap by implementing Roadwise. Music enthusiasts vote on new integrations, keeping our team focused on what truly matters.",
	},
	{
		name: "DevNotes",
		category: "Productivity",
		initials: "DN",
		description:
			"DevNotes uses Roadwise to gather feedback from developers. We saw a 40% increase in user satisfaction simply by giving them a transparent place to request features.",
	},
	{
		name: "TaskFlow",
		category: "Project Management",
		initials: "TF",
		description:
			"TaskFlow implemented Roadwise to prioritize our development backlog. It stopped the endless Slack feature requests and gave us a data-driven pipeline.",
	},
	{
		name: "CodeCollab",
		category: "Developer Tools",
		initials: "CC",
		description:
			"Managing feature requests used to be a nightmare of duplicate tickets. Roadwise enabled us to build a genuinely community-driven product roadmap.",
	},
	{
		name: "DesignVault",
		category: "Design Tools",
		initials: "DV",
		description:
			"DesignVault leverages Roadwise to collect feedback from designers using our asset platform. The minimalist UI perfectly matches our brand aesthetic.",
	},
];

// Metrics data
const metrics = [
	{
		value: "40%",
		description:
			"Average increase in user satisfaction after implementing Roadwise",
	},
	{
		value: "65%",
		description: "Reduction in development time for new features",
	},
	{
		value: "3x",
		description: "Increase in user engagement with product updates",
	},
	{
		value: "85%",
		description: "Of customers report better alignment between teams",
	},
];

function CustomerCard({ customer }: { customer: (typeof customers)[0] }) {
	return (
		<div className="flex w-[350px] shrink-0 flex-col rounded-3xl border border-border bg-background p-8 sm:w-[400px]">
			<p className="mb-8 flex-1 text-lg leading-relaxed text-foreground">
				"{customer.description}"
			</p>
			<div className="flex items-center gap-4">
				<div className="flex size-12 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
					{customer.initials}
				</div>
				<div>
					<div className="font-medium text-foreground">{customer.name}</div>
					<div className="text-sm text-muted-foreground">
						{customer.category}
					</div>
				</div>
			</div>
		</div>
	);
}

export default function CustomersPage() {
	// Duplicate customers array for seamless marquee loop
	const marqueeCustomers = [...customers, ...customers];

	return (
		<main className="flex flex-col w-full pb-24">
			<section className="w-full pt-16 pb-20 max-w-[1120px] mx-auto px-5">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-4">
						<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
							Trusted by innovative teams.
						</h1>
						<p className="mx-auto max-w-[600px] text-lg text-muted-foreground sm:text-xl">
							Discover how companies of all sizes use Roadwise to build better
							products with user feedback.
						</p>
					</div>
				</div>
			</section>

			{/* Metrics Section */}
			<section className="w-full max-w-[1120px] mx-auto px-5 mb-32">
				<div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 border-t border-border pt-12">
					{metrics.map((metric, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="flex flex-col"
						>
							<div className="mb-4 text-5xl font-bold tracking-tighter text-foreground sm:text-6xl">
								{metric.value}
							</div>
							<p className="text-sm leading-relaxed text-muted-foreground">
								{metric.description}
							</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* Testimonials Marquee */}
			<section className="w-full mb-32 overflow-hidden bg-muted/10 py-24">
				<div className="relative flex w-full overflow-hidden">
					<motion.div
						animate={{ x: ["0%", "-50%"] }}
						transition={{
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
							duration: 40,
						}}
						className="flex w-max gap-6 px-3"
					>
						{marqueeCustomers.map((customer, i) => (
							<CustomerCard key={i} customer={customer} />
						))}
					</motion.div>
					{/* Gradient Masks */}
					<div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
					<div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
				</div>
			</section>

			<CallToAction
				title="Join our growing community."
				description="Start collecting valuable user feedback today and build products your users will love."
				buttons={[{ text: "Start for Free", href: "/pricing" }]}
			/>
		</main>
	);
}
