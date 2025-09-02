import Link from "next/link";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface CTAButton {
  text: string;
  href: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  icon?: ReactNode;
}

interface CTAProps {
  title: string;
  description: string;
  buttons: CTAButton[];
}

export function CallToAction({ title, description, buttons }: CTAProps) {
  return (
    <section className="max-container">
      <div
        className="relative py-20 rounded-xl overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/bg-pattern-1.jpg)'
        }}
      >
        {/* Darker overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 rounded-xl" />

        <div className="relative px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-white">
            {title}
          </h2>
          {description && (
            <p className="mx-auto max-w-[700px] md:text-xl mb-8 text-white">
              {description}
            </p>
          )}
          <div className="space-x-4">
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant="secondary"
                size="lg"
                asChild
              >
                <Link href={button.href}>
                  {button.text}
                  {button.icon && button.icon}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
