"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { AuthButtons } from "./auth-buttons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Floating navbar */}
      <header className="w-full max-container padding-container fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-background/60 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm p-3">
          <div className="flex items-center justify-between space-x-8">
            {/* Left: Logo - compact for floating design */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Roadwise app logo"
                width={24}
                height={24}
                className="rounded-sm opacity-90"
              />
              <span className="text-lg font-bold ">Roadwise</span>
            </Link>

            {/* Center: Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link
                href="/features"
                className="text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/50"
                aria-label="View features"
              >
                Features
              </Link>
              <Link
                href="/customers"
                className="text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/50"
                aria-label="View customers"
              >
                Customers
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/50"
                aria-label="View pricing"
              >
                Pricing
              </Link>
            </nav>

            {/* Right: Auth buttons and menu */}
            <div className="flex items-center gap-2">
              {/* Auth buttons - hidden on mobile in floating nav */}
              <AuthButtons />

              {/* Menu button - visible on mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-8 w-8"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu - floating dropdown */}
      {isMenuOpen && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 md:hidden">
          <div className="bg-background/90 backdrop-blur-md border border-border/50 rounded-2xl shadow-lg p-4 min-w-[280px]">
            <div className="space-y-2">
              <Link
                href="/features"
                className="block px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/customers"
                className="block px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Customers
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="pt-2 border-t border-border/50">
                <AuthButtons />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
