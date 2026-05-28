import { Badge } from "@/components/ui/badge";

const steps = [
	{ id: "app", label: "App", number: 1 },
	{ id: "boards", label: "Boards", number: 2 },
	{ id: "custom", label: "Custom", number: 3 },
	{ id: "settings", label: "Settings", number: 4 },
	{ id: "launch", label: "Launch", number: 5 },
];

interface ProgressIndicatorProps {
	currentStep: string;
	template?: string;
}

export function ProgressIndicator({
	currentStep,
	template,
}: ProgressIndicatorProps) {
	// Filter out custom step if template is not custom
	const visibleSteps =
		template !== "custom"
			? steps.filter((step) => step.id !== "custom")
			: steps;

	const currentIndex = visibleSteps.findIndex(
		(step) => step.id === currentStep,
	);

	return (
		<div className="flex items-center justify-center mb-8">
			<div className="flex items-center gap-2">
				{visibleSteps.map((step, index) => (
					<div key={step.id} className="flex items-center">
						<Badge
							variant={index <= currentIndex ? "default" : "secondary"}
							className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
						>
							{step.number === 3 && template !== "custom"
								? 4
								: step.number === 4 && template !== "custom"
									? 5
									: step.number}
						</Badge>
						{index < visibleSteps.length - 1 && (
							<div
								className={`w-8 h-px mx-2 ${
									index < currentIndex ? "bg-primary" : "bg-muted"
								}`}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
