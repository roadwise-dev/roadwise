import { Map, MessageCircle, Newspaper } from "lucide-react";
import Link from "next/link";

export default function Navbar({ companyName }: { companyName: string }) {
  const links = [
    { href: "/", label: "Roadmap", icon: Map },
    { href: "/feature-request", label: "Feature Request", icon: MessageCircle },
    { href: "/news", label: "News", icon: Newspaper },
  ];

  return (
    <nav className="p-10 flex items-center gap-8">
      <h1 className="text-xl font-semibold">{companyName}</h1>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-md text-muted-foreground transition-colors hover:text-primary flex items-center space-x-2"
        >
          <link.icon size={18} />
          <span>{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
