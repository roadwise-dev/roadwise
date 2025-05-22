import { Features } from "@/components/blocks/features-8";
import { HowItWorks } from "@/components/how-it-works";
import { CallToAction } from "@/components/landing/cta";
import Hero from "@/components/landing/hero";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-0 sm:gap-10">
      <Hero />
      <HowItWorks />
      <Features />
      {/* <Statistics /> */}
      <CallToAction />
    </main>
  );
}
