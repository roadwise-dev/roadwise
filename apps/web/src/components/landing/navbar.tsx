"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/svg/logo";
import { AuthButtons } from "./auth-buttons";
import { landingLinks, publicDemoUrl } from "./demo-data";
import styles from "./landing.module.css";

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const toggleRef = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		if (!open) return;
		function closeMenu(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setOpen(false);
				toggleRef.current?.focus();
			}
		}
		document.addEventListener("keydown", closeMenu);
		return () => document.removeEventListener("keydown", closeMenu);
	}, [open]);
	return (
		<>
			<a className={styles.skip} href="#main">
				Skip to content
			</a>
			<header className={styles.header}>
				<div className={`${styles.wideWrap} ${styles.navWrap}`}>
					<Link
						href="/"
						className={styles.brand}
						aria-label="Roadwise home"
						onClick={() => setOpen(false)}
					>
						<Logo size={27} variant="whiteOnBlack" />
						<span>Roadwise</span>
					</Link>
					<nav className={styles.desktopNav} aria-label="Main navigation">
						{landingLinks.map((link) => (
							<Link key={link.href} href={link.href}>
								{link.label}
							</Link>
						))}
					</nav>
					<div className={styles.navActions}>
						<a href={publicDemoUrl} className={styles.demoLink}>
							View demo
						</a>
						<AuthButtons />
						<button
							ref={toggleRef}
							type="button"
							className={styles.menuToggle}
							aria-label={open ? "Close navigation" : "Open navigation"}
							aria-expanded={open}
							aria-controls="mobile-navigation"
							onClick={() => setOpen((value) => !value)}
						>
							{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
						</button>
					</div>
				</div>
				<nav
					className={styles.mobileMenu}
					id="mobile-navigation"
					hidden={!open}
					aria-label="Mobile navigation"
				>
					<a href={publicDemoUrl} onClick={() => setOpen(false)}>
						View demo
					</a>
					{landingLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setOpen(false)}
						>
							{link.label}
						</Link>
					))}
				</nav>
			</header>
		</>
	);
}
