"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppWindow, MessageSquare, Rocket, UserPlus } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      title: "Create Your Account",
      description:
        "Sign up for Roadwise in just a few clicks. No credit card required for the free plan.",
      icon: <UserPlus className="h-10 w-10 mb-4" />,
    },
    {
      title: "Add Your App",
      description:
        "Set up a feedback board for your product. Customize it to match your brand.",
      icon: <AppWindow className="h-10 w-10 mb-4" />,
    },
    {
      title: "Invite Users",
      description:
        "Share your feedback board with users. They can submit ideas and vote on features.",
      icon: <MessageSquare className="h-10 w-10 mb-4" />,
    },
    {
      title: "Ship Better Products",
      description:
        "Use insights to prioritize features and build products your users love.",
      icon: <Rocket className="h-10 w-10 mb-4" />,
    },
  ];

  return (
    <section className="py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          How Roadwise Works
        </h2>
        <p className="text-lg text-center mb-12 mx-auto">
          Get started with Roadwise in four simple steps and transform your
          product development process.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="border-black/10 shadow-xs hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-center">
                  {step.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-center">
                  {index + 1}. {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm text-gray-600">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
