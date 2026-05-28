"use client";

import { AppWindow, MessageSquare, Rocket, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HowItWorks() {
	const steps = [
		{
			title: "Create Your Account",
			description:
				"Sign up for Roadwise in just a few clicks. No credit card required for the free plan.",
			icon: <UserPlus className="h-10 w-10 mb-4" />,
		},
		{
			title: "Add Your App",
			description:
				"Set up a feedback board for your product. Customize it to match your brand.",
			icon: <AppWindow className="h-10 w-10 mb-4" />,
		},
		{
			title: "Invite Users",
			description:
				"Share your feedback board with users. They can submit ideas and vote on features.",
			icon: <MessageSquare className="h-10 w-10 mb-4" />,
		},
		{
			title: "Ship Better Products",
			description:
				"Use insights to prioritize features and build products your users love.",
			icon: <Rocket className="h-10 w-10 mb-4" />,
		},
	];

	return (
		<section className="w-full max-container padding-container">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<h2 className="text-2xl sm:text-3xl font-bold text-center">
					How Roadwise Works
				</h2>
				<p className="text-center text-xl sm:text-2xl text-muted-foreground mb-12">
					From user ideas to product impact - in four simple steps.
				</p>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{steps.map((step, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.6,
							delay: index * 0.15,
							ease: "easeOut",
						}}
						whileHover={{
							scale: 1.05,
							transition: { duration: 0.2 },
						}}
					>
						<Card className="border-black/10 shadow-xs hover:shadow-md transition-shadow h-full">
							<CardHeader>
								<motion.div
									className="flex items-center justify-center"
									initial={{ scale: 0 }}
									whileInView={{ scale: 1 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.5,
										delay: index * 0.15 + 0.3,
										type: "spring",
										stiffness: 200,
									}}
								>
									{step.icon}
								</motion.div>
								<CardTitle className="text-xl font-semibold text-center">
									{index + 1}. {step.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-center text-sm text-gray-600">
									{step.description}
								</p>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>
		</section>
	);
}
