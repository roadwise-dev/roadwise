import type { Metadata } from "next";
import Hero from "@/components/landing/hero";
import {
	Closing,
	Ecosystem,
	Hosting,
	Workflow,
} from "@/components/landing/home-sections";
import styles from "@/components/landing/landing.module.css";
import ProductDemo from "@/components/landing/product-demo";

export const metadata: Metadata = {
	title: { absolute: "Roadwise — Open-source product feedback." },
	description:
		"Collect feedback, understand demand, organize your roadmap, and publish updates. Open-source product feedback for developers and small teams. Use our free cloud or host it yourself.",
};

export default function HomePage() {
	return (
		<div className={styles.home}>
			<Hero />
			<ProductDemo />
			<Workflow />
			<Ecosystem />
			<Hosting />
			<Closing />
		</div>
	);
}
