import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t mt-10 bg-background">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center leading-loose text-muted-foreground md:text-left">
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
            >
              Roadwise
            </Link>
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <nav className="flex gap-4 md:gap-6">
            <Link
              href="/features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="/customers"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Customers
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
          </nav>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Roadwise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
