"use client";

import { Features } from "@/components/blocks/features-8";
import { HowItWorks } from "@/components/how-it-works";
import { CallToAction } from "@/components/landing/cta";
import Hero from "@/components/landing/hero";
import Logos from "@/components/landing/logos";
import { motion } from "motion/react";

export default function HomePage() {
  const sections = [
    { component: <Hero />, delay: 0 },
    { component: <Logos />, delay: 0.1 },
    { component: <HowItWorks />, delay: 0.2 },
    { component: <Features />, delay: 0.3 },
    { 
      component: (
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
      ), 
      delay: 0.4 
    },
  ];

  return (
    <main className="flex flex-col gap-16 sm:gap-30">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.6, 
            delay: section.delay,
            ease: "easeOut"
          }}
        >
          {section.component}
        </motion.div>
      ))}
    </main>
  );
}
