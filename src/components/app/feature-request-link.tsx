"use client";

import { useEffect, useState } from "react";
import { isSubdomain } from "@/lib/config";

interface FeatureRequestLinkProps {
	appSlug: string;
	children: React.ReactNode;
}

export function FeatureRequestLink({
	appSlug,
	children,
}: FeatureRequestLinkProps) {
	const [isOnSubdomain, setIsOnSubdomain] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const hostname = window.location.hostname;
			setIsOnSubdomain(isSubdomain(hostname));
		}
	}, []);

	const href = isOnSubdomain
		? "/feature-request"
		: `${appSlug}/feature-request`;

	return (
		<a href={href} className="inline-flex">
			{children}
		</a>
	);
}
