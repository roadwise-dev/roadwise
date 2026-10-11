import {
	ArrowRight,
	CodeXml,
	Globe,
	Map as MapIcon,
	Server,
} from "lucide-react";
import { sourceUrl } from "./demo-data";
import DeveloperPreview from "./developer-preview";
import styles from "./landing.module.css";
import {
	ChangelogPreview,
	ConversationPreview,
	RoadmapPreview,
} from "./product-previews";
import StartButton from "./start-button";

export function Workflow() {
	return (
		<section
			className={`${styles.wrap} ${styles.workflow}`}
			id="workflow"
			aria-labelledby="workflow-title"
		>
			<div className={styles.storyTitle}>
				<h2 id="workflow-title">
					From the first “could you…”
					<br />
					to the next product update.
				</h2>
			</div>
			<div className={styles.storyRow}>
				<div className={styles.storyText}>
					<span className={styles.storyNumber}>01</span>
					<h3>
						The request is
						<br />
						only the beginning.
					</h3>
					<p>
						Let people submit ideas, vote, and add context. A public board gives
						every conversation a place to grow.
					</p>
					<span className={styles.storyAside}>
						The votes tell you how many.
						<br />
						The conversation tells you why.
					</span>
				</div>
				<ConversationPreview />
			</div>
			<div className={styles.storyRow}>
				<div className={styles.storyText}>
					<span className={styles.storyNumber}>02</span>
					<h3>
						Show what’s
						<br />
						moving forward.
					</h3>
					<p>
						Organize feedback from your developer dashboard. Use votes and
						comments to understand demand, then make progress visible on your
						roadmap.
					</p>
					<span className={styles.storyAside}>
						Customize your public board’s appearance
						<br />
						to make it feel like part of your product.
					</span>
				</div>
				<div className={styles.storyRoadmap}>
					<div className={styles.storyUiLabel}>
						<strong>Forma</strong>
						<span>
							<MapIcon aria-hidden="true" /> Public roadmap
						</span>
					</div>
					<RoadmapPreview />
				</div>
			</div>
			<div className={styles.storyRow}>
				<div className={styles.storyText}>
					<span className={styles.storyNumber}>03</span>
					<h3>
						You shipped it.
						<br />
						Let them know.
					</h3>
					<p>
						Publish changelogs and product news alongside your board. Show the
						community how its feedback is shaping your product.
					</p>
					<span className={styles.storyAside}>
						A published update from the same product.
					</span>
				</div>
				<div className={styles.storyRelease}>
					<div className={styles.releaseArt} aria-hidden="true" />
					<ChangelogPreview />
				</div>
			</div>
		</section>
	);
}

export function Ecosystem() {
	return (
		<section
			className={styles.ecosystem}
			id="ecosystem"
			aria-labelledby="ecosystem-title"
		>
			<div className={styles.wrap}>
				<div className={styles.ecosystemTop}>
					<span className={styles.eyebrow}>THE NEXT CHAPTER</span>
					<h2 id="ecosystem-title">Your feedback, wherever you work.</h2>
					<p>
						We’re bringing Roadwise to your tools and agents. Ask an assistant
						what users want, read requests from your terminal, or update roadmap
						progress through MCP.
					</p>
				</div>
				<DeveloperPreview />
			</div>
		</section>
	);
}

export function Hosting() {
	return (
		<section
			className={`${styles.wrap} ${styles.hosting}`}
			id="hosting"
			aria-labelledby="hosting-title"
		>
			<div className={styles.sectionHeading}>
				<span className={styles.eyebrow}>OPEN SOURCE. YOUR CHOICE.</span>
				<h2 id="hosting-title">
					A home for feedback.
					<br />
					You choose where.
				</h2>
				<p>
					Use our free cloud or run Roadwise on your own infrastructure. The
					source is open for you to inspect, adapt, and contribute.
				</p>
			</div>
			<div className={styles.hostingOptions} id="pricing">
				<article className={styles.hostOption}>
					<Globe aria-hidden="true" />
					<div>
						<h3>Roadwise Cloud</h3>
						<span className={styles.hostPrice}>Free</span>
						<p>
							Public boards, votes, comments, roadmaps, and updates. Hosted by
							us.
						</p>
						<StartButton />
					</div>
				</article>
				<article className={styles.hostOption}>
					<Server aria-hidden="true" />
					<div>
						<h3>Self-hosted</h3>
						<span className={styles.hostPrice}>Your infrastructure</span>
						<p>
							The same open-source foundation. Run it where your team wants it.
						</p>
						<a
							className={styles.textLink}
							href={sourceUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							<CodeXml aria-hidden="true" /> View source{" "}
							<ArrowRight aria-hidden="true" />
						</a>
					</div>
				</article>
			</div>
		</section>
	);
}

export function Closing() {
	return (
		<section
			className={`${styles.wrap} ${styles.closing}`}
			aria-labelledby="closing-title"
		>
			<div>
				<h2 id="closing-title">
					Give feedback
					<br />a way forward.
				</h2>
			</div>
			<div>
				<StartButton />
				<p>Free cloud access. Open-source code.</p>
			</div>
		</section>
	);
}
