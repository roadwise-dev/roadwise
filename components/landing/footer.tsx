import Link from "next/link";
import RoadwiseLogo from "../svg/logo";

export default function Footer() {
  return (
    <footer className="w-full bg-background mt-10">
      <div className="container mx-auto px-4 py-12 md:px-6 2xl:max-w-[1400px]">
        {/* Logo/description and navigation links */}
        <div className="flex flex-col md:flex-row md:justify-between mb-8 gap-8">
          {/* Logo and description */}
          <div className="flex-1 max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity"
            >
              <RoadwiseLogo width={28} height={28} />
              <h2 className="text-lg font-semibold text-foreground">Roadwise</h2>
            </Link>
            <p className="text-sm text-muted-foreground">
              Build better products with user feedback. Collect feature requests, prioritize your roadmap, and keep your users informed.
            </p>
          </div>

          {/* Navigation links */}
          <nav aria-label="Footer">
            <div className="flex flex-wrap gap-6">
              <Link
                href="/features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="/customers"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Customers
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
            </div>
          </nav>
        </div>

        {/* Copyright and legal links */}
        <div className="pt-6 border-t flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Roadwise. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/terms-of-service"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

