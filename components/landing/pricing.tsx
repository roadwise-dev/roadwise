"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for indie developers and small teams",
      price: "Free",
      features: [
        "5 feedback boards",
        "Unlimited users",
        "Basic analytics",
        "Email support",
        "Community forums",
      ],
      cta: "Get Started",
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
    },
  ];

  return (
    <section className="py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Pricing
        </h2>
        <p className="text-lg text-center mb-12 ">
          Choose the plan that best fits your needs and start gathering valuable
          user feedback today.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col ${index === 1 ? "border-black" : "border-gray-200"}`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="grow">
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.interval && (
                    <span className="text-gray-600 ml-2">{plan.interval}</span>
                  )}
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-black" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={index === 1 ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
