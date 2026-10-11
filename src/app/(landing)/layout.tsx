import Footer from "@/components/landing/footer";
import styles from "@/components/landing/landing.module.css";
import Navbar from "@/components/landing/navbar";

export default function LandingLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className={styles.landing}>
			<Navbar />
			<main id="main" tabIndex={-1}>
				{children}
			</main>
			<Footer />
		</div>
	);
}
