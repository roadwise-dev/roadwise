"use client";

import { Button } from "@/components/ui/button";

export default function NewsError() {
	return (
		<div className="rounded-xl border border-border px-6 py-16 text-center">
			<h2 className="mb-2 text-lg font-semibold">Couldn&apos;t load updates</h2>
			<p className="mb-6 text-sm text-muted-foreground">Please try again.</p>
			<Button
				variant="outline"
				onClick={() => {
					window.location.reload();
				}}
			>
				Try again
			</Button>
		</div>
	);
}
