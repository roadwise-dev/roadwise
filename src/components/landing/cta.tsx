"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "../ui/button";

interface CTAButton {
	text: string;
	href: string;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	icon?: ReactNode;
}

interface CTAProps {
	title: string;
	description: string;
	buttons: CTAButton[];
}

export function CallToAction({ title, description, buttons }: CTAProps) {
	return (
		<motion.section
			className="w-full max-w-[1120px] mx-auto px-5"
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
		>
			<motion.div
				className="relative py-20 rounded-xl overflow-hidden bg-cover bg-center"
				style={{
					backgroundImage: "url(/images/bg-pattern-1.jpg)",
				}}
				initial={{ scale: 0.95 }}
				whileInView={{ scale: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				{/* Darker overlay for better text readability */}
				<div className="absolute inset-0 bg-black/20 rounded-xl" />

				<div className="relative px-4 text-center">
					<motion.h2
						className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-white"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						{title}
					</motion.h2>
					{description && (
						<motion.p
							className="mx-auto max-w-[700px] md:text-xl mb-8 text-white"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							{description}
						</motion.p>
					)}
					<motion.div
						className="space-x-4"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.5 }}
					>
						{buttons.map((button, index) => (
							<motion.div
								key={`${button.href}-${button.text}`}
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.4,
									delay: 0.6 + index * 0.1,
									type: "spring",
									stiffness: 200,
								}}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="inline-block"
							>
								<Button variant="secondary" size="lg" asChild>
									<Link href={button.href}>
										{button.text}
										{button.icon && button.icon}
									</Link>
								</Button>
							</motion.div>
						))}
					</motion.div>
				</div>
			</motion.div>
		</motion.section>
	);
}
