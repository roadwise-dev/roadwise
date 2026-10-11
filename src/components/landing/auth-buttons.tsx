"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import styles from "./landing.module.css";
import StartButton from "./start-button";

export function AuthButtons() {
	const { isSignedIn } = useAuth();
	return (
		<div className={styles.authButtons}>
			{!isSignedIn && (
				<Link href="/login" className={styles.login}>
					Log in
				</Link>
			)}
			<StartButton compact />
		</div>
	);
}
