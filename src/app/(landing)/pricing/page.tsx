import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Pricing",
};

export default function PricingPage() {
	return (
		<main className="flex flex-col w-full max-container padding-container pb-24">
			<section className="w-full pt-16 pb-20">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
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
			</section>

			<section className="w-full max-w-5xl mx-auto px-5">
				<div className="grid md:grid-cols-2 gap-8 items-stretch">
					{/* Standard Plan (Free) */}
					<div className="flex flex-col rounded-3xl border border-border bg-background p-8 sm:p-10 transition-colors hover:border-foreground/30">
						<div className="mb-8">
							<h3 className="text-2xl font-medium tracking-tight text-foreground">
								Standard
							</h3>
							<p className="mt-2 text-sm text-muted-foreground">
								Perfect for indie developers starting out.
							</p>
						</div>
						<div className="mb-8 flex items-baseline">
							<span className="text-6xl font-bold tracking-tighter text-foreground">
								Free
							</span>
						</div>
						<ul className="mb-10 space-y-4 flex-1">
							{[
								"Up to 3 apps",
								"Unlimited feedback submissions",
								"Unlimited news updates",
								"Basic analytics dashboard",
								"Email support",
							].map((feature, i) => (
								<li key={i} className="flex items-start gap-3 text-sm">
									<Check className="size-5 shrink-0 text-foreground" />
									<span className="text-muted-foreground leading-relaxed">
										{feature}
									</span>
								</li>
							))}
						</ul>
						<Link
							href="/signup"
							className="flex h-12 w-full items-center justify-center rounded-xl border border-border bg-transparent text-sm font-medium text-foreground transition-colors hover:bg-muted"
						>
							Get Started
						</Link>
					</div>

					{/* Pro Plan (Premium) */}
					<div className="relative flex flex-col rounded-3xl border border-foreground bg-foreground p-8 sm:p-10 text-background">
						<div className="absolute -top-4 right-8 inline-flex items-center rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground">
							Coming Soon
						</div>
						<div className="mb-8">
							<h3 className="text-2xl font-medium tracking-tight text-background">
								Pro
							</h3>
							<p className="mt-2 text-sm text-background/70">
								For teams serious about user-driven development.
							</p>
						</div>
						<div className="mb-8 flex items-baseline">
							<span className="text-6xl font-bold tracking-tighter text-background">
								$5
							</span>
							<span className="ml-2 text-sm font-medium text-background/70">
								/ month
							</span>
						</div>
						<ul className="mb-10 space-y-4 flex-1">
							{[
								"All Standard features",
								"Unlimited apps",
								"Custom domain support",
								"Widget for your website",
								"Advanced analytics",
								"Priority support",
							].map((feature, i) => (
								<li key={i} className="flex items-start gap-3 text-sm">
									<Check className="size-5 shrink-0 text-background" />
									<span className="text-background/80 leading-relaxed">
										{feature}
									</span>
								</li>
							))}
						</ul>
						<button
							disabled
							className="flex h-12 w-full items-center justify-center rounded-xl bg-background/10 text-sm font-medium text-background/50 cursor-not-allowed"
						>
							Coming Soon
						</button>
					</div>
				</div>
			</section>
		</main>
	);
}
