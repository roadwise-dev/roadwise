"use client";

import { Map, MessageCircle, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import the usePathname hook

export default function Navbar() {
  const pathname = usePathname(); // Get the current pathname

  // Extract the base path after '/app', which includes the app slug
  const basePath = pathname.split("/")[2]; // This will now give you 'app-name'

  const links = [
    { href: "", label: "Roadmap", icon: Map },
    { href: "feature-request", label: "Feature Request", icon: MessageCircle },
    { href: "news", label: "News", icon: Newspaper },
  ];

  // Function to determine if the link is active
  const isActive = (href: string) => {
    if (
      href === "" &&
      (pathname === `/app/${basePath}` || pathname === `/app/${basePath}/`)
    ) {
      return true; // Ensure Roadmap is active for both /app/app-name and /app/app-name/
    }
    if (pathname === `/app/${basePath}/${href}`) return true;
    return false;
  };

  return (
    <nav className="py-8 flex items-center gap-8 justify-between">
      <div className="flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={`/app/${basePath}/${link.href}`} // Adjust dynamic URLs based on new structure
            className={`text-base transition-colors flex items-center space-x-2 ${
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
