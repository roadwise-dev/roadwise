"use client";

import { Map, MessageCircle, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import the usePathname hook

export default function Navbar() {
  const pathname = usePathname(); // Get the current pathname

  // Extract the base path (which includes the slug)
  const basePath = pathname.split("/")[1]; // This will give you 'my-app' or whatever slug is there

  const links = [
    { href: "", label: "Roadmap", icon: Map },
    { href: "feature-request", label: "Feature Request", icon: MessageCircle },
    { href: "news", label: "News", icon: Newspaper },
  ];

  // Function to determine if the link is active
  const isActive = (href: string) => {
    if (
      href === "" &&
      (pathname === `/${basePath}` || pathname === `/${basePath}/`)
    ) {
      return true; // Ensure Roadmap is active for both /some-app and /some-app/
    }
    if (pathname === `/${basePath}/${href}`) return true;
    return false;
  };

  return (
    <nav className="py-8 flex items-center gap-8 justify-between">
      <div className="flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={`/${basePath}/${link.href}`} // Create dynamic URLs based on slug
            className={`text-md transition-colors flex items-center space-x-2 ${
              isActive(link.href)
                ? "text-black font-bold"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <link.icon size={18} />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
      <div>
        <Link
          href="https://roadwiseboard.vercel.app"
          className="text-muted-foreground hover:text-primary"
        >
          Powered by Roadwise™
        </Link>
      </div>
    </nav>
  );
}
