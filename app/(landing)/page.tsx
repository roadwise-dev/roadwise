import { Features } from "@/components/blocks/features-8";
import { HowItWorks } from "@/components/how-it-works";
import { CallToAction } from "@/components/landing/cta";
import Hero from "@/components/landing/hero";

export default function HomePage() {
  return (
    <main className="w-full flex flex-col gap-10 sm:gap-20">
      <Hero />
      <HowItWorks />
      <Features />
      {/* <Statistics /> */}
      <CallToAction
        title="Ready to get started?"
        description="Join thousands of product teams using Roadwise to build better products."
        buttons={[
          {
            text: "Sign up for free",
            href: "/signup",
            variant: "secondary"
          }
        ]}
      />
    </main>
  );
}
