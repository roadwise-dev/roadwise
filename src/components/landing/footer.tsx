import Link from "next/link";
import Logo from "@/components/svg/logo";
import { sourceUrl } from "./demo-data";
import styles from "./landing.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.wrap}>
				<div className={styles.footerMain}>
					<div>
						<Link href="/" className={styles.brand} aria-label="Roadwise home">
							<Logo size={27} variant="blackOnWhite" />
							<span>Roadwise</span>
						</Link>
						<p>Open-source product feedback.</p>
					</div>
					<nav aria-label="Footer product links">
						<span>Product</span>
						<Link href="/#product">Feedback & roadmap</Link>
						<Link href="/#ecosystem">Developer ecosystem</Link>
						<Link href="/#pricing">Free cloud</Link>
					</nav>
					<nav aria-label="Footer resource links">
						<span>Resources</span>
						<a href={sourceUrl} target="_blank" rel="noopener noreferrer">
							Source code ↗
						</a>
						<Link href="/#hosting">Self-host Roadwise</Link>
						<Link href="/app/roadwise">Our feedback board ↗</Link>
					</nav>
				</div>
				<div className={styles.footerBottom}>
					<span>© {new Date().getFullYear()} Roadwise</span>
					<span>
						<Link href="/privacy-policy">Privacy</Link>
						<Link href="/terms-of-service">Terms</Link>
					</span>
				</div>
			</div>
		</footer>
	);
}
