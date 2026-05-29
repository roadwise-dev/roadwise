export function CaptureVisual() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center p-6">
			<div className="w-full max-w-sm rounded-2xl border border-border bg-background p-5">
				<h4 className="mb-4 text-sm font-semibold text-foreground">
					Suggest a feature
				</h4>
				<div className="space-y-3">
					<div className="space-y-1.5">
						<div className="h-3 w-16 rounded bg-muted-foreground/40" />
						<div className="h-9 w-full rounded-md border border-border bg-muted/20" />
					</div>
					<div className="space-y-1.5">
						<div className="h-3 w-20 rounded bg-muted-foreground/40" />
						<div className="h-24 w-full rounded-md border border-border bg-muted/20" />
					</div>
					<div className="flex justify-end pt-2">
						<div className="flex h-9 w-24 items-center justify-center rounded-md bg-foreground text-sm font-medium text-background">
							Submit
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
