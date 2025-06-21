"use client"

import { Cpu, Link, PencilRuler, ShieldCheck } from "lucide-react"
import { motion } from "motion/react"

export default function Logos() {
  const logos = [
    { name: "Bring2Gather", icon: Link },
    { name: "Mirai T&S", icon: Cpu },
    { name: "SketchybarEditor", icon: PencilRuler },
    { name: "SafeScan", icon: ShieldCheck },
  ]

  // Triple the logos for seamless infinite scroll
  const renderedLogos = [...logos, ...logos, ...logos]

  return (
    <section className="w-full max-container padding-container py-18">
      <h2 className="text-center text-3xl font-semibold">Powering the  best product teams.</h2>
      <p className="text-center text-3xl text-muted-foreground mb-12">
        From next-gen startups to established enterprises.
      </p>

      <div className="relative overflow-hidden">
        {/* Gradient masks for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <motion.div
          className="flex"
          animate={{
            x: [0, -280 * logos.length], // Updated to match new width
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
            duration: logos.length * 3, // 2 seconds per logo
          }}
          style={{ width: `${280 * renderedLogos.length}px` }}
        >
          {renderedLogos.map((logo, index) => {
            const IconComponent = logo.icon
            return (
              <div
                key={`${logo.name}-${index}`}
                className="flex items-center justify-center min-w-[280px] h-20 px-8 flex-shrink-0"
              >
                <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300">
                  <IconComponent className="h-6 w-6" />
                  <span className="font-medium text-2xl whitespace-nowrap">{logo.name}</span>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
