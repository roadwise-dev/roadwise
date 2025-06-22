import Link from "next/link"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CallToAction } from "@/components/landing/cta"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Pricing'
}

export default function PricingPage() {
  const plans = [
    {
      name: "Standard",
      description: "Perfect for indie developers",
      price: "Free",
      features: [
        "Up to 3 apps",
        "Unlimited feedback submissions",
        "Unlimited news updates",
        "Basic analytics dashboard",
        "Email support"
      ],
      cta: "Get Started",
      ctaLink: "/signup",
      disabled: false,
    },
    {
      name: "Pro (Coming Soon!)",
      description: "For teams serious about user-driven development",
      price: "$5",
      interval: "per month",
      features: [
        "All Standard features",
        "Unlimited apps",
        "Custom domain",
        "Widget for your website",
        "Advanced analytics",
        "Priority support",
      ],
      cta: "Coming Soon",
      ctaLink: "/",
      disabled: true,
    },
  ]

  return (
    <main >

      <section className="max-contianer padding-container w-full">
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
      </section>

      <section className="max-container padding-container w-full py-12 md:py-24">
        <div className="container">
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
                  <Button
                    className="w-full"
                    variant={index === 1 ? "default" : "outline"}
                    asChild={!plan.disabled}
                    disabled={plan.disabled}
                  >
                    {plan.disabled ? (
                      <span>{plan.cta}</span>
                    ) : (
                      <Link href={plan.ctaLink}>{plan.cta}</Link>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        title="Ready to Get Started?"
        description="Join thousands of product teams using Roadwise to build better products."
        buttons={[
          {
            text: "Start for Free",
            href: "/signup",
          },
          {
            text: "Contact Sales",
            href: "/contact",
          }
        ]}
      />
    </main>
  )
}
