"use client";

import { Map, MessageCircle, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const basePath = pathname.split("/")[2];

  const links = [
    { href: "", label: "Roadmap", icon: Map },
    { href: "feature-request", label: "Features", icon: MessageCircle },
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
    <nav className="bg-background sticky top-0 z-10 border-b py-3">
      <div className="flex justify-between max-w-[1440px] mx-auto gap-6 px-6 items-center">
        <div className="flex gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={`/app/${basePath}/${link.href}`}
              className={`text-base transition-colors duration-200 flex items-center space-x-2 rounded px-2 py-1 ${isActive(link.href)
                ? "bg-muted text-black"
                : "text-muted-foreground hover:text-black hover:bg-muted"
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
