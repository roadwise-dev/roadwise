import { Star } from 'lucide-react'

import { CallToAction } from "@/components/landing/cta"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Customers'
}

// Customer data
const customers = [
  {
    name: "SketchyBar Editor",
    category: "Developer Tools",
    initials: "SB",
    description: "SketchyBar Editor uses Roadwise to collect feature requests and bug reports from their community of macOS power users, helping them prioritize development efforts.",
    rating: 5
  },
  {
    name: "Albumfy",
    category: "Music & Entertainment",
    initials: "AF",
    description: "Albumfy transformed their product roadmap by implementing Roadwise, allowing music enthusiasts to vote on new features and integrations for their album collection platform.",
    rating: 5
  },
  {
    name: "DevNotes",
    category: "Productivity",
    initials: "DN",
    description: "DevNotes uses Roadwise to gather feedback from developers who use their note-taking app, resulting in a 40% increase in user satisfaction and retention.",
    rating: 5
  },
  {
    name: "TaskFlow",
    category: "Project Management",
    initials: "TF",
    description: "TaskFlow implemented Roadwise to prioritize their development backlog, helping them focus on features that matter most to their project management users.",
    rating: 5
  },
  {
    name: "CodeCollab",
    category: "Developer Tools",
    initials: "CC",
    description: "CodeCollab uses Roadwise to manage feature requests for their collaborative coding platform, enabling them to build a community-driven product roadmap.",
    rating: 5
  },
  {
    name: "DesignVault",
    category: "Design Tools",
    initials: "DV",
    description: "DesignVault leverages Roadwise to collect feedback from designers using their asset management platform, helping them create a more intuitive and powerful tool.",
    rating: 5
  }
]

// Metrics data
const metrics = [
  { value: "40%", description: "Average increase in user satisfaction after implementing Roadwise" },
  { value: "65%", description: "Reduction in development time for new features" },
  { value: "3x", description: "Increase in user engagement with product updates" },
  { value: "85%", description: "Of customers report better alignment between teams" }
]

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 mt-2">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? '' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )
}

// Customer Card Component  
function CustomerCard({ customer }: { customer: typeof customers[0] }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" alt={customer.name} />
            <AvatarFallback>{customer.initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{customer.name}</CardTitle>
            <CardDescription>{customer.category}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="mb-4">{customer.description}</p>
        <StarRating rating={customer.rating} />
      </CardContent>
    </Card>
  )
}

// Metric Card Component
function MetricCard({ metric }: { metric: typeof metrics[0] }) {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-primary">{metric.value}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{metric.description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default function CustomersPage() {
  return (
    <div className="flex flex-col ">
      <main className="flex-1">
        {/* Featured Customers */}
        <section className="max-container padding-container w-full">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by Innovative Teams Worldwide
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Discover how companies of all sizes use Roadwise to build better products with user feedback.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {customers.map((customer, index) => (
              <CustomerCard key={index} customer={customer} />
            ))}
          </div>
        </section>

        {/* Success Metrics */}
        <section className="max-container padding-container w-full py-12 sm:py-24">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Customer Success Metrics
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Real results from companies using Roadwise to improve their products
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>
        </section>

        <CallToAction
          title="Join Our Growing Community of Innovators"
          description="Start collecting valuable user feedback today and build products your users will love."
          buttons={[
            {
              text: "Start for Free",
              href: "/pricing",
            },
            {
              text: "Explore Features",
              href: "/features",
            }
          ]}
        />
      </main>
    </div>
  )
}
