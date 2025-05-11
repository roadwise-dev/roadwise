import { HowItWorks } from "@/components/how-it-works";
import { CallToAction } from "@/components/landing/cta";
import Hero from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";
import { Statistics } from "@/components/statistics";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-0 sm:gap-10">
      <Hero />
      <HowItWorks />
      <Statistics />
      <Pricing />
      <CallToAction />
    </main>
  );
}
