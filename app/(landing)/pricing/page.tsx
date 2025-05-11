import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Pricing'
}

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for indie developers and small teams",
      price: "Free",
      features: ["5 feedback boards", "Unlimited users", "Basic analytics", "Email support", "Community forums"],
      cta: "Get Started",
      ctaLink: "/signup",
    },
    {
      name: "Pro (Coming Soon!)",
      description: "For teams serious about user-driven development",
      price: "$5",
      interval: "per month",
      features: [
        "Unlimited feedback boards",
        "All Starter features",
        "Custom domain",
        "Changelog",
        "HTML embed",
        "Advanced analytics",
        "Priority support",
        "Team collaboration",
      ],
      cta: "Upgrade to Pro",
      ctaLink: "/signup?plan=pro",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col mt-48">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 bg-gray-50 border rounded-2xl">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple, Transparent Pricing
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Choose the plan that best fits your needs and start gathering valuable user feedback today.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`flex flex-col ${index === 1 ? "border-primary shadow-lg" : "border-gray-200"}`}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="grow">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.interval && <span className="text-gray-600 ml-2">{plan.interval}</span>}
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-5 w-5 mr-3 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={index === 1 ? "default" : "outline"} asChild>
                      <Link href={plan.ctaLink}>{plan.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-20 bg-gray-50 border rounded-2xl">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Join thousands of product teams using Roadwise to build better products.
                </p>
              </div>
              <div className="space-x-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Start for Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
