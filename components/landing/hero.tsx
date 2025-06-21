"use client"

import Link from "next/link"
import FeatureCard from "../implemented/feature-card"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="py-10 w-full max-container padding-container">
      <div className="flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium">Alpha version - Try Now</Badge>

          {/* Centered text */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Empower Your Product<br />with User Feedback</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create feedback boards for your apps and let your users<br />shape the future of your product
          </p>

          {/* Centered buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4 w-full max-w-md justify-center mx-auto">
            <Button className="w-full sm:w-auto rounded-lg text-md" size="lg">
              <Link href="/signup">Start for free</Link>
            </Button>
            <Button className="w-full sm:w-auto rounded-lg text-md" variant="outline" size="lg">
              <Link href="/app/roadwise">See roadwise in action</Link>
            </Button>
          </div>
        </div>

        {/* Big screenshot below */}
        <div className="w-full">
          <FeatureShowcase />
        </div>
      </div>
    </section>
  )
}

const tabs = [
  {
    id: "roadmap",
    label: "Roadmap",
    image: "/images/roadmap.png"
  },
  {
    id: "features",
    label: "Features",
    image: "/images/features.png"
  },
  {
    id: "news",
    label: "News",
    image: "/images/news.png"
  },

]

function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState("roadmap")

  return (
    <div className="space-y-6">
      {/* Tab buttons */}
      <div className="flex justify-center gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2 text-sm font-medium"
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Screenshot display */}
      <div className="shadow-xl rounded-xl overflow-hidden border">
        <Image
          src={tabs.find(tab => tab.id === activeTab)?.image || "/images/features.png"}
          alt={`${tabs.find(tab => tab.id === activeTab)?.label} screenshot`}
          width={1920}
          height={1080}
          className="w-full h-auto"
          draggable={false}
          priority
        />
      </div>
    </div>
  )
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
]

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
  )
}

// Export the InteractiveBoard component so it can be used elsewhere
export { InteractiveBoard }
