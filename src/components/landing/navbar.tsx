"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { AuthButtons } from "./auth-buttons";
import RoadwiseLogo from "../svg/logo";

// Navigation data
const navigationItems = [
  { href: "/features", label: "Features", ariaLabel: "View features" },
  { href: "/customers", label: "Customers", ariaLabel: "View customers" },
  { href: "/pricing", label: "Pricing", ariaLabel: "View pricing" }
];

// Desktop Navigation Link Component
function DesktopNavLink({ item }: { item: typeof navigationItems[0] }) {
  return (
    <Link
      href={item.href}
      className="font-semibold text-foreground/80 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg"
      aria-label={item.ariaLabel}
    >
      {item.label}
    </Link>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({ item, onClose }: {
  item: typeof navigationItems[0];
  onClose: () => void;
}) {
  return (
    <Link
      href={item.href}
      className="block px-3 py-2 text-sm text-foreground/70 hover:text-foreground rounded-lg transition-colors"
      onClick={onClose}
    >
      {item.label}
    </Link>
  );
}

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
              <RoadwiseLogo
                width={30}
                height={30}
              />
              <span className="text-xl font-bold">Roadwise</span>
            </Link>

            {/* Center: Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {navigationItems.map((item) => (
                <DesktopNavLink key={item.href} item={item} />
              ))}
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
              {navigationItems.map((item) => (
                <MobileNavLink
                  key={item.href}
                  item={item}
                  onClose={() => setIsMenuOpen(false)}
                />
              ))}
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
