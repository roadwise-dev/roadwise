"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import FeatureCard from "../implemented/feature-card";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Hero() {
	return (
		<section className="w-full max-w-[1120px] mx-auto px-5 padding-container">
			<div className="flex flex-col items-center text-center">
				<motion.div
					className="max-w-4xl mx-auto mb-6"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<Badge
							variant="outline"
							className="mb-6 px-4 py-3 text-sm font-medium"
						>
							Alpha version - Try Now
						</Badge>
					</motion.div>

					{/* Centered text */}
					<motion.h1
						className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						Empower Your Product
						<br />
						with <span className="font-medium italic">User Feedback</span>
					</motion.h1>

					<motion.p
						className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						Create feedback boards for your apps and let your users
						<br />
						shape the future of your product
					</motion.p>

					{/* Centered buttons */}
					<motion.div
						className="flex flex-col sm:flex-row gap-4 mb-4 w-full max-w-md justify-center mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
					>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button className="w-full sm:w-auto rounded-lg text-md" size="lg">
								<Link href="/signup">Start for free</Link>
							</Button>
						</motion.div>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								className="w-full sm:w-auto rounded-lg text-md"
								variant="outline"
								size="lg"
							>
								<Link href="/app/roadwise">See roadwise in action</Link>
							</Button>
						</motion.div>
					</motion.div>
				</motion.div>

				{/* Big screenshot below */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
				>
					<FeatureShowcase />
				</motion.div>
			</div>
		</section>
	);
}

const tabs = [
	{
		id: "roadmap",
		label: "Roadmap",
		image: "/images/roadmap.png",
	},
	{
		id: "features",
		label: "Features",
		image: "/images/features.png",
	},
	{
		id: "news",
		label: "News",
		image: "/images/news.png",
	},
];

function FeatureShowcase() {
	const [activeTab, setActiveTab] = useState("roadmap");

	return (
		<motion.div
			className="space-y-6"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			{/* Tab buttons */}
			<motion.div
				className="flex justify-center gap-2"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				{tabs.map((tab, index) => (
					<motion.div
						key={tab.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Button
							variant={activeTab === tab.id ? "secondary" : "outline"}
							size="sm"
							onClick={() => setActiveTab(tab.id)}
							className="px-4 py-2 text-sm font-medium"
						>
							{tab.label}
						</Button>
					</motion.div>
				))}
			</motion.div>

			{/* Screenshot display */}
			<motion.div
				className="shadow-xl rounded-xl overflow-hidden border relative"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
			>
				{tabs.map((tab) => (
					<motion.div
						key={tab.id}
						initial={{ opacity: 0 }}
						animate={{
							opacity: activeTab === tab.id ? 1 : 0,
						}}
						transition={{ duration: 0.18, ease: "easeOut" }}
						className={cn(
							"w-full h-auto",
							activeTab === tab.id ? "relative" : "absolute inset-0",
						)}
					>
						<Image
							src={tab.image}
							alt={`${tab.label} screenshot`}
							width={1920}
							height={1080}
							className="w-full h-auto"
							draggable={false}
							priority
						/>
					</motion.div>
				))}
			</motion.div>
		</motion.div>
	);
}

const features = [
	{
		id: "1",
		title: "Dark Mode",
		description: "Enable dark mode for better night-time usability.",
		upvotes: 48,
	},
	{
		id: "2",
		title: "Multi-Language Support",
		description: "Support multiple languages for a global audience.",
		upvotes: 35,
	},
	{
		id: "3",
		title: "Real-Time Notifications",
		description: "Receive real-time notifications for user feedback.",
		upvotes: 12,
	},
];

function InteractiveBoard() {
	return (
		<Card className="h-full border-0 shadow-none">
			<CardHeader>
				<CardTitle>Features</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{features.map((feature) => (
					<FeatureCard key={feature.id} feature={feature} />
				))}
			</CardContent>
		</Card>
	);
}

// Export the InteractiveBoard component so it can be used elsewhere
export { InteractiveBoard };
