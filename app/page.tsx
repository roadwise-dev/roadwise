import { HowItWorks } from "@/components/how-it-works";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";
import { Pricing } from "@/components/landing/pricing";

export default function HomePage() {
  return (
    <div className="min-h-screen max-w-[1240px] mx-auto px-4 text-gray-900">
      <Navbar />
      <main className="flex flex-col gap-0 sm:gap-10">
        <Hero />

        <HowItWorks />
        {/* <Statistics /> */}

        {/* <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl mb-8">
              Join thousands of product teams using Roadwise to build better
              products.
            </p>
            <Button size="lg">Sign up for free</Button>
          </div>
        </section> */}
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
