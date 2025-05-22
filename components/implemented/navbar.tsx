"use client";

import { Map, MessageCircle, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const basePath = pathname.split("/")[2];

  const links = [
    { href: "", label: "Roadmap", icon: Map },
    { href: "feature-request", label: "Feature Request", icon: MessageCircle },
    { href: "news", label: "News", icon: Newspaper },
  ];

  const isActive = (href: string) => {
    if (
      href === "" &&
      (pathname === `/app/${basePath}` || pathname === `/app/${basePath}/`)
    ) {
      return true;
    }
    if (pathname === `/app/${basePath}/${href}`) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-10 border-b py-4">
      <div className="flex justify-between max-w-[1440px] mx-auto gap-6 px-6">
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={`/app/${basePath}/${link.href}`}
              className={`text-base transition-colors flex items-center space-x-2 ${isActive(link.href)
                ? "text-black font-semibold"
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
            href="https://roadwiseapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hidden sm:block hover:text-primary"
          >
            Powered by Roadwise™
          </Link>
        </div>
      </div>
    </nav>
  );
}
