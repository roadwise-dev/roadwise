import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-background z-50 border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-start gap-4">
            <Image
              src="/logo.png"
              alt="Roadwise app logo"
              width={32}
              height={32}
              className="rounded-md opacity-90"
            />
            <span className="text-2xl font-bold">Roadwise</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-center space-x-8">
          <Link
            href="/features"
            className="text-foreground/80 hover:text-black transition"
            aria-label="View features"
          >
            Features
          </Link>
          <Link
            href="/customers"
            className="text-foreground/80 hover:text-black transition"
            aria-label="View customers"
          >
            Customers
          </Link>
          <Link
            href="/pricing"
            className="text-foreground/80 hover:text-black transition"
            aria-label="View pricing"
          >
            Pricing
          </Link>
        </nav>

        {/* Right: Login button */}
        <div className="flex items-center space-x-2">
          <Button asChild variant="outline" className="rounded-lg text-md">
            <Link href="/login" aria-label="Log in to your account">
              Log in
            </Link>
          </Button>
          <Button asChild className="rounded-lg text-md">
            <Link href="/signup" aria-label="Log in to your account">
              Start Now
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
