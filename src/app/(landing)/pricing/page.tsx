import type { Metadata } from "next";
import { CallToAction } from "@/components/landing/cta";
import { Pricing } from "@/components/landing/pricing";

export const metadata: Metadata = {
	title: "Pricing",
};

export default function PricingPage() {
	return (
		<main className="flex flex-col w-full max-container padding-container pb-24">
			<Pricing />

			<CallToAction
				title="Ready to transform your product loop?"
				description="Join forward-thinking product teams using Roadwise to build better products."
				buttons={[{ text: "Start for Free", href: "/signup" }]}
			/>
		</main>
	);
}
