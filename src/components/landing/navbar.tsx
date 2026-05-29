"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "../svg/logo";
import { AuthButtons } from "./auth-buttons";

const navigationItems = [
	{ href: "/features", label: "Features", ariaLabel: "View features" },
	{ href: "/customers", label: "Customers", ariaLabel: "View customers" },
	{ href: "/pricing", label: "Pricing", ariaLabel: "View pricing" },
];

function DesktopNavLink({ item }: { item: (typeof navigationItems)[0] }) {
	const pathname = usePathname();
	const isActive = pathname === item.href;

	return (
		<Link
			href={item.href}
			className={`text-sm font-semibold transition-colors px-4 py-2 ${
				isActive
					? "text-foreground"
					: "text-muted-foreground hover:text-foreground"
			}`}
			aria-label={item.ariaLabel}
		>
			{item.label}
		</Link>
	);
}

function MobileNavLink({
	item,
	onClose,
}: {
	item: (typeof navigationItems)[0];
	onClose: () => void;
}) {
	const pathname = usePathname();
	const isActive = pathname === item.href;

	return (
		<Link
			href={item.href}
			className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
				isActive
					? "text-foreground bg-muted/50 font-medium"
					: "text-foreground/70 hover:text-foreground hover:bg-muted/30"
			}`}
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
			<header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-max px-4">
				<div className="flex items-center gap-6 rounded-full border border-border bg-background/80 backdrop-blur-md px-6 py-3">
					<Link href="/" className="flex items-center gap-2 pr-2">
						<Logo variant="whiteOnBlack" width={24} height={24} />
						<span className="text-base font-bold tracking-tight">Roadwise</span>
					</Link>

					<nav className="hidden md:flex items-center gap-2">
						{navigationItems.map((item) => (
							<DesktopNavLink key={item.href} item={item} />
						))}
					</nav>

					<div className="hidden md:flex pl-2">
						<AuthButtons />
					</div>

					<Button
						variant="ghost"
						size="icon"
						className="md:hidden size-8 rounded-full"
						onClick={toggleMenu}
						aria-label="Toggle menu"
					>
						<Menu className="size-4" />
					</Button>
				</div>
			</header>

			{/* Mobile menu - floating dropdown */}
			{isMenuOpen && (
				<div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 md:hidden w-[90%] max-w-[300px]">
					<div className="bg-background/90 backdrop-blur-md border border-border rounded-2xl p-4">
						<div className="space-y-2">
							{navigationItems.map((item) => (
								<MobileNavLink
									key={item.href}
									item={item}
									onClose={() => setIsMenuOpen(false)}
								/>
							))}
							<div className="pt-2 mt-2 border-t border-border">
								<AuthButtons />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
