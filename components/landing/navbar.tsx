"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-background z-50 border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-6">
        {/* Left: Logo - simplified */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Roadwise app logo"
            width={32}
            height={32}
            className="rounded-sm opacity-90"
          />
          <span className="text-2xl font-bold ml-4 k">Roadwise</span>
        </Link>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden sm:flex items-center justify-center space-x-8">
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

        {/* Right: Login/Signup buttons and menu icon */}
        <div className="flex items-center space-x-2">
          {/* Auth buttons - always visible */}
          <div className="flex items-center space-x-2">
            <Button asChild variant="outline" className="rounded-lg text-sm hidden sm:block">
              <Link href="/login" aria-label="Log in to your account">
                Sign in
              </Link>
            </Button>
            <Button asChild className="rounded-lg text-sm">
              <Link href="/signup" aria-label="Sign up for an account">
                Start for free
              </Link>
            </Button>
          </div>

          {/* Menu button - visible on mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden ml-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile menu - slides down when open */}
      {isMenuOpen && (
        <div className="sm:hidden bg-background border-t min-h-full">
          <div className="px-4 py-2 space-y-3">
            <Link
              href="/features"
              className="block py-2 text-foreground/80 hover:text-black transition"
            >
              Features
            </Link>
            <Link
              href="/customers"
              className="block py-2 text-foreground/80 hover:text-black transition"
            >
              Customers
            </Link>
            <Link
              href="/pricing"
              className="block py-2 text-foreground/80 hover:text-black transition"
            >
              Pricing
            </Link>
            <Button asChild className="rounded-lg text-sm w-full">
              <Link href="/login" aria-label="Log in to your account">
                Log in
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
