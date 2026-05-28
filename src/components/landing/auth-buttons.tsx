"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";

export function AuthButtons() {
	const { isLoaded } = useUser();

	if (!isLoaded) {
		return <div className="h-9 w-[120px]" />;
	}

	return (
		<div className="animate-in fade-in duration-300">
			<SignedIn>
				<Button asChild className="rounded-lg text-sm">
					<Link href="/dashboard" aria-label="Go to your dashboard">
						Dashboard
					</Link>
				</Button>
			</SignedIn>

			<SignedOut>
				<div className="flex items-center space-x-2">
					<Button
						asChild
						variant="outline"
						className="hidden rounded-lg text-sm sm:inline-flex"
					>
						<Link href="/login" aria-label="Log in to your account">
							Sign in
						</Link>
					</Button>
					<Button asChild className="rounded-lg text-sm">
						<Link href="/signup" aria-label="Sign up for an account">
							Start for free
						</Link>
					</Button>
				</div>
			</SignedOut>
		</div>
	);
}
