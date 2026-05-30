"use client";

import { Check, X } from "lucide-react";
import Link from "next/link";

export function Pricing() {
	const plans = [
		{
			name: "Free",
			description: "Perfect for indie hackers and side projects",
			price: "$0",
			interval: "per month",
			features: [
				"1 user",
				"Up to 5 apps",
				"React Components & REST API",
				"1 Webhook Endpoint",
				"Watermark on components",
			],
			cta: "Get Started",
			href: "/signup",
			highlighted: false,
			disabled: false,
		},
		{
			name: "Pro",
			description: "For apps that are growing and need professional features",
			price: "$5",
			interval: "per month",
			features: [
				"1 user",
				"Up to 50 apps",
				"Custom domains",
				"Unlimited Webhooks",
				"No watermarks",
			],
			cta: "Coming Soon",
			href: "#",
			highlighted: true,
			badge: "Coming Soon",
			disabled: true,
		},
		{
			name: "Team",
			description: "For startups and agencies that collaborate",
			price: "$20",
			interval: "per month",
			features: [
				"Up to 5 team members",
				"Everything in Pro",
				"Shared Workspaces",
				"Export data (CSV)",
				"Priority support",
			],
			cta: "Coming Soon",
			href: "#",
			highlighted: false,
			disabled: true,
		},
	];

	const compareFeatures = [
		{ name: "Users", free: "1 user", pro: "1 user", team: "Up to 5 users" },
		{
			name: "Apps",
			free: "Up to 5 apps",
			pro: "Up to 50 apps",
			team: "Unlimited",
		},
		{ name: "React Components & API", free: true, pro: true, team: true },
		{
			name: "Webhooks",
			free: "1 Endpoint",
			pro: "Unlimited",
			team: "Unlimited",
		},
		{ name: "Custom Domains", free: false, pro: true, team: true },
		{ name: "Remove Watermark", free: false, pro: true, team: true },
		{ name: "Shared Workspaces", free: false, pro: false, team: true },
		{ name: "Export Data (CSV)", free: false, pro: false, team: true },
		{ name: "Priority Support", free: false, pro: false, team: true },
	];

	function renderValue(val: boolean | string) {
		if (typeof val === "boolean") {
			return val ? (
				<Check className="h-5 w-5 mx-auto text-foreground" />
			) : (
				<X className="h-5 w-5 mx-auto text-muted-foreground/50" />
			);
		}
		return <span className="text-sm text-muted-foreground">{val}</span>;
	}

	return (
		<section className="w-full pt-16 pb-20">
			<div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
				<div className="space-y-4">
					<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
						Simple, transparent pricing.
					</h1>
					<p className="mx-auto max-w-[600px] text-lg text-muted-foreground sm:text-xl">
						Start gathering valuable user feedback today. No hidden fees, no
						surprises.
					</p>
				</div>
			</div>

			<div className="w-full max-w-6xl mx-auto px-5">
				<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 items-stretch">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className={`relative flex flex-col rounded-3xl border p-8 sm:p-10 transition-colors ${
								plan.highlighted
									? "border-foreground bg-foreground text-background"
									: "border-border bg-background text-foreground hover:border-foreground/30"
							}`}
						>
							{plan.badge && (
								<div
									className={`absolute -top-4 right-8 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
										plan.highlighted
											? "bg-background text-foreground"
											: "bg-foreground text-background"
									}`}
								>
									{plan.badge}
								</div>
							)}
							<div className="mb-8">
								<h3
									className={`text-2xl font-medium tracking-tight ${
										plan.highlighted ? "text-background" : "text-foreground"
									}`}
								>
									{plan.name}
								</h3>
								<p
									className={`mt-2 text-sm ${
										plan.highlighted
											? "text-background/70"
											: "text-muted-foreground"
									}`}
								>
									{plan.description}
								</p>
							</div>
							<div className="mb-8 flex items-baseline">
								<span
									className={`text-6xl font-bold tracking-tighter ${
										plan.highlighted ? "text-background" : "text-foreground"
									}`}
								>
									{plan.price}
								</span>
								{plan.interval && (
									<span
										className={`ml-2 text-sm font-medium ${
											plan.highlighted
												? "text-background/70"
												: "text-muted-foreground"
										}`}
									>
										{plan.interval}
									</span>
								)}
							</div>
							<ul className="mb-10 space-y-4 flex-1">
								{plan.features.map((feature) => (
									<li key={feature} className="flex items-start gap-3 text-sm">
										<Check
											className={`size-5 shrink-0 ${
												plan.highlighted ? "text-background" : "text-foreground"
											}`}
										/>
										<span
											className={`leading-relaxed ${
												plan.highlighted
													? "text-background/80"
													: "text-muted-foreground"
											}`}
										>
											{feature}
										</span>
									</li>
								))}
							</ul>
							{plan.disabled ? (
								<button
									type="button"
									disabled
									className={`flex h-12 w-full items-center justify-center rounded-xl text-sm font-medium transition-colors cursor-not-allowed ${
										plan.highlighted
											? "bg-background/10 text-background/50"
											: "bg-muted/50 text-muted-foreground border border-border"
									}`}
								>
									{plan.cta}
								</button>
							) : (
								<Link
									href={plan.href}
									className={`flex h-12 w-full items-center justify-center rounded-xl text-sm font-medium transition-colors ${
										plan.highlighted
											? "bg-background text-foreground hover:bg-background/90"
											: "border border-border bg-transparent text-foreground hover:bg-muted"
									}`}
								>
									{plan.cta}
								</Link>
							)}
						</div>
					))}
				</div>

				<div className="mt-32 w-full mx-auto">
					<h3 className="text-3xl font-medium tracking-tight text-center mb-12">
						Compare Plans
					</h3>
					<div className="overflow-x-auto rounded-3xl border border-border bg-background p-1">
						<table className="w-full text-left border-collapse">
							<thead>
								<tr className="border-b border-border">
									<th className="py-6 px-6 font-medium text-foreground w-1/4">
										Features
									</th>
									<th className="py-6 px-6 font-medium text-foreground text-center w-1/4">
										Free
									</th>
									<th className="py-6 px-6 font-medium text-foreground text-center w-1/4">
										Pro
									</th>
									<th className="py-6 px-6 font-medium text-foreground text-center w-1/4">
										Team
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border">
								{compareFeatures.map((feature) => (
									<tr
										key={feature.name}
										className="hover:bg-muted/50 transition-colors"
									>
										<td className="py-5 px-6 text-sm font-medium text-foreground">
											{feature.name}
										</td>
										<td className="py-5 px-6 text-center">
											{renderValue(feature.free)}
										</td>
										<td className="py-5 px-6 text-center">
											{renderValue(feature.pro)}
										</td>
										<td className="py-5 px-6 text-center">
											{renderValue(feature.team)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	);
}
