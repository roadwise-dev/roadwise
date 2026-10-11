"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./landing.module.css";

export default function LandingDialog({
	open,
	onOpenChange,
	children,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
}) {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Backdrop className={styles.dialogBackdrop} />
				<Dialog.Popup className={`${styles.landing} ${styles.demoDialog}`}>
					{children}
					<Dialog.Close
						className={styles.dialogClose}
						aria-label="Close dialog"
					>
						<X aria-hidden="true" />
					</Dialog.Close>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
