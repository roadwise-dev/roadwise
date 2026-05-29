import { Search, Sparkles } from "lucide-react";

export function AnnounceVisual() {
	return (
		<div className="flex h-full w-full items-center justify-center p-6">
			<div className="w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-background">
				<div className="border-b border-border bg-muted/20 px-5 py-4">
					<div className="flex items-center gap-2 mb-3">
						<Sparkles className="size-4 text-foreground" />
						<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
							Changelog
						</span>
					</div>
					<h4 className="text-lg font-semibold text-foreground">
						New: Advanced filtering & search
					</h4>
					<p className="mt-1 text-xs text-muted-foreground">May 29, 2026</p>
				</div>
				<div className="p-5 space-y-4">
					<div className="space-y-2">
						<div className="h-2 w-full rounded bg-muted-foreground/30" />
						<div className="h-2 w-full rounded bg-muted-foreground/30" />
						<div className="h-2 w-4/5 rounded bg-muted-foreground/30" />
					</div>
					<div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border bg-muted/10">
						<Search className="size-6 text-muted-foreground/40" />
					</div>
				</div>
			</div>
		</div>
	);
}
