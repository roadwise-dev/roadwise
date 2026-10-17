"use client";

import { useAuth } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./landing.module.css";

export default function StartButton({
	compact = false,
}: {
	compact?: boolean;
}) {
	const { isSignedIn } = useAuth();
	return (
		<Link
			href={isSignedIn ? "/dashboard" : "/signup"}
			className={`${styles.actionButton} ${styles.startButton} ${compact ? styles.compactButton : ""}`}
		>
			<span className={styles.buttonLabel}>
				{isSignedIn ? "Dashboard" : "Start for free"}
			</span>
			{!compact && <ArrowRight aria-hidden="true" />}
		</Link>
	);
}
