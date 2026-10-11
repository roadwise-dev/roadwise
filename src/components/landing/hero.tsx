import { ArrowRight } from "lucide-react";
import { publicDemoUrl } from "./demo-data";
import styles from "./landing.module.css";
import StartButton from "./start-button";

export default function Hero() {
	return (
		<section className={`${styles.wrap} ${styles.hero}`}>
			<span className={styles.eyebrow}>OPEN-SOURCE PRODUCT FEEDBACK</span>
			<h1>
				Product feedback.
				<br />A clearer way forward.
			</h1>
			<p className={styles.lead}>
				Collect feedback, shape your roadmap, and share what ships.
				<br className={styles.wideOnly} /> Use our free cloud or host it
				yourself.
			</p>
			<div className={styles.actions}>
				<StartButton />
				<a
					href={publicDemoUrl}
					className={`${styles.actionButton} ${styles.outlineButton}`}
				>
					View demo <ArrowRight aria-hidden="true" />
				</a>
			</div>
		</section>
	);
}
