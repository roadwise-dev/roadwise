import Link from "next/link"
import { ArrowRight, Check, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
      name: "Pro",
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

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to all the new features. When downgrading, the changes will take effect at the end of your current billing cycle.",
    },
    {
      question: "Is there a limit to how many users can access my feedback boards?",
      answer:
        "No, both our Starter and Pro plans allow unlimited users to access and interact with your feedback boards. This means you can gather feedback from your entire user base without any restrictions.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express, Discover) as well as PayPal. For annual enterprise plans, we can also accommodate bank transfers and invoicing.",
    },
    {
      question: "Do you offer any discounts for annual billing?",
      answer:
        "Yes, we offer a 20% discount when you choose annual billing for our Pro plan. This means you'll pay $48 per year instead of $60 when paying monthly.",
    },
    {
      question: "Is there a free trial for the Pro plan?",
      answer:
        "Yes, we offer a 14-day free trial of our Pro plan. No credit card is required to start the trial, and you can downgrade to the Starter plan at any time if you decide the Pro plan isn't right for you.",
    },
    {
      question: "What happens to my data if I cancel my subscription?",
      answer:
        "If you downgrade from Pro to Starter, you'll retain access to your data but will be limited to 5 feedback boards. If you cancel your account entirely, your data will be stored for 30 days, during which time you can reactivate your account. After 30 days, your data will be permanently deleted.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col mt-48">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
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

        {/* Enterprise Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 mb-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Need Something More Custom?</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  We offer tailored enterprise solutions for larger organizations with specific requirements.
                </p>
              </div>

              <Card className="w-full max-w-3xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Enterprise</CardTitle>
                  <CardDescription>For organizations with advanced needs and custom requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-3 text-primary" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-3 text-primary" />
                      <span>Custom integrations</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-3 text-primary" />
                      <span>Advanced security features</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-3 text-primary" />
                      <span>SLA guarantees</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-3 text-primary" />
                      <span>Custom branding options</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-3 text-primary" />
                      <span>Advanced user permissions</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-3 text-primary" />
                      <span>Onboarding & training</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-3 text-primary" />
                      <span>Priority feature development</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Find answers to common questions about our pricing and plans
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Plan Comparison</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Compare our plans to find the perfect fit for your needs
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-4 px-6 text-left font-medium">Feature</th>
                    <th className="py-4 px-6 text-center font-medium">Starter</th>
                    <th className="py-4 px-6 text-center font-medium">Pro</th>
                    <th className="py-4 px-6 text-center font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-4 px-6 font-medium">Feedback Boards</td>
                    <td className="py-4 px-6 text-center">5</td>
                    <td className="py-4 px-6 text-center">Unlimited</td>
                    <td className="py-4 px-6 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 font-medium">Users</td>
                    <td className="py-4 px-6 text-center">Unlimited</td>
                    <td className="py-4 px-6 text-center">Unlimited</td>
                    <td className="py-4 px-6 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-4 px-6 font-medium">Custom Domain</td>
                    <td className="py-4 px-6 text-center">—</td>
                    <td className="py-4 px-6 text-center">✓</td>
                    <td className="py-4 px-6 text-center">✓</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 font-medium">Changelog</td>
                    <td className="py-4 px-6 text-center">—</td>
                    <td className="py-4 px-6 text-center">✓</td>
                    <td className="py-4 px-6 text-center">✓</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-4 px-6 font-medium">HTML Embed</td>
                    <td className="py-4 px-6 text-center">—</td>
                    <td className="py-4 px-6 text-center">✓</td>
                    <td className="py-4 px-6 text-center">✓</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 font-medium">Analytics</td>
                    <td className="py-4 px-6 text-center">Basic</td>
                    <td className="py-4 px-6 text-center">Advanced</td>
                    <td className="py-4 px-6 text-center">Advanced + Custom</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-4 px-6 font-medium">Support</td>
                    <td className="py-4 px-6 text-center">Email</td>
                    <td className="py-4 px-6 text-center">Priority</td>
                    <td className="py-4 px-6 text-center">Dedicated</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 font-medium">Team Collaboration</td>
                    <td className="py-4 px-6 text-center">—</td>
                    <td className="py-4 px-6 text-center">✓</td>
                    <td className="py-4 px-6 text-center">✓</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-4 px-6 font-medium">Custom Integrations</td>
                    <td className="py-4 px-6 text-center">—</td>
                    <td className="py-4 px-6 text-center">—</td>
                    <td className="py-4 px-6 text-center">✓</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 font-medium">SLA</td>
                    <td className="py-4 px-6 text-center">—</td>
                    <td className="py-4 px-6 text-center">—</td>
                    <td className="py-4 px-6 text-center">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  What Our Customers Say About Our Pricing
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Hear from teams who have found the perfect plan for their needs
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <blockquote className="border-l-4 border-primary pl-4 italic mb-4">
                    The free Starter plan was perfect for validating our product idea. Once we saw the value in user
                    feedback, upgrading to Pro was a no-brainer for the additional features.
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="font-medium">JD</span>
                    </div>
                    <div>
                      <p className="font-medium">Jamie Dawson</p>
                      <p className="text-sm text-gray-500">Founder, TaskFlow</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6">
                  <blockquote className="border-l-4 border-primary pl-4 italic mb-4">
                    The Pro plan offers incredible value for the price. The unlimited feedback boards and team
                    collaboration features have transformed how we build our product.
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="font-medium">SL</span>
                    </div>
                    <div>
                      <p className="font-medium">Sarah Lin</p>
                      <p className="text-sm text-gray-500">Product Manager, CodeCollab</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
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

        {/* Need Help Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-lg border bg-white">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Need help choosing a plan?</h3>
                  <p className="text-gray-500">Our team is here to answer any questions you might have.</p>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
