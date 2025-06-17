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
    <section className="w-full max-container padding-container">
      <div className="py-20 bg-foreground text-background rounded-xl">
        <div className="px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            {title}
          </h2>
          <p className="mx-auto max-w-[700px] md:text-xl mb-8">
            {description}
          </p>
          <div className="space-x-4">
            {buttons.map((button, index) => (
              <Button 
                key={index}
                variant={button.variant || "secondary"} 
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
