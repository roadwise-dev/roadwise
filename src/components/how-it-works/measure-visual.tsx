import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function MeasureVisual() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center p-6">
			<div className="w-full max-w-sm space-y-3">
				{[
					{ title: "Dark mode support", votes: 243, active: true },
					{ title: "API access for enterprise", votes: 189, active: false },
					{ title: "Mobile app notifications", votes: 94, active: false },
				].map((item) => (
					<div
						key={item.title}
						className={cn(
							"flex items-center gap-4 rounded-2xl border p-3",
							item.active
								? "border-foreground bg-background"
								: "border-border bg-muted/20",
						)}
					>
						<div
							className={cn(
								"flex flex-col items-center justify-center rounded-lg border p-2",
								item.active
									? "border-border bg-muted/50"
									: "border-transparent bg-transparent",
							)}
						>
							<ChevronUp
								className={cn(
									"size-4",
									item.active ? "text-foreground" : "text-muted-foreground",
								)}
							/>
							<span
								className={cn(
									"mt-1 text-sm font-semibold",
									item.active ? "text-foreground" : "text-muted-foreground",
								)}
							>
								{item.votes}
							</span>
						</div>
						<div className="flex-1 space-y-2">
							<div
								className={cn(
									"h-3 w-3/4 rounded",
									item.active ? "bg-foreground" : "bg-muted-foreground/50",
								)}
							/>
							<div className="h-2 w-1/2 rounded bg-muted-foreground/20" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
