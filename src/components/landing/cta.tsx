"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

interface CTAButton {
	text: string;
	href: string;
	variant?: string;
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
			className="w-full max-w-[1120px] mx-auto px-5 mt-32 mb-24"
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
		>
			<div className="relative py-16 px-6 md:px-12 rounded-3xl overflow-hidden bg-foreground text-background text-center flex flex-col items-center">
				{/* Background decorative blur */}
				<div className="absolute -top-24 -left-24 w-96 h-96 bg-background/5 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute -bottom-24 -right-24 w-96 h-96 bg-background/5 rounded-full blur-3xl pointer-events-none" />

				<motion.h2
					className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 max-w-3xl relative z-10"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.1 }}
				>
					{title}
				</motion.h2>

				{description && (
					<motion.p
						className="text-base md:text-lg text-background/80 mb-8 max-w-2xl relative z-10"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						{description}
					</motion.p>
				)}

				<motion.div
					className="flex flex-wrap items-center justify-center gap-4 relative z-10"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					{buttons.map((button, index) => (
						<motion.div
							key={`${button.href}-${button.text}`}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
						>
							<Link
								href={button.href}
								className={`inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-medium transition-colors ${
									index === 0
										? "bg-background text-foreground hover:bg-background/90"
										: "border border-background/20 bg-transparent text-background hover:bg-background/10"
								}`}
							>
								{button.text}
								{button.icon && <span className="ml-2">{button.icon}</span>}
							</Link>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.section>
	);
}
