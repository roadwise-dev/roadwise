import { GripVertical, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/contexts/onboarding-context";

export function CustomBoardCreator() {
	const { data, updateData } = useOnboarding();

	const addBoard = () => {
		if (data.customBoards.length < 6) {
			updateData({
				customBoards: [...data.customBoards, ""],
			});
		}
	};

	const removeBoard = (index: number) => {
		if (data.customBoards.length > 2) {
			const newBoards = data.customBoards.filter((_, i) => i !== index);
			updateData({ customBoards: newBoards });
		}
	};

	const updateBoard = (index: number, value: string) => {
		const newBoards = [...data.customBoards];
		newBoards[index] = value;
		updateData({ customBoards: newBoards });
	};

	const filledBoards = data.customBoards.filter((board) => board.trim()).length;

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-bold">Design Your Boards</h1>
				<p className="text-muted-foreground">
					Create your custom board structure. You need at least 2 boards.
				</p>
			</div>

			{/* Custom Board Creator */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						✨ Custom Board Setup
					</CardTitle>
					<CardDescription>
						Create 2-6 boards that represent your feedback workflow
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{data.customBoards.map((board, index) => (
						<div key={index} className="flex items-center gap-3">
							<div className="flex-shrink-0 text-muted-foreground">
								<GripVertical className="h-4 w-4" />
							</div>
							<div className="flex-1">
								<Label htmlFor={`board-${index}`} className="sr-only">
									Board {index + 1} name
								</Label>
								<Input
									id={`board-${index}`}
									placeholder={`Board ${index + 1} name`}
									value={board}
									onChange={(e) => updateBoard(index, e.target.value)}
									className="flex-1"
								/>
							</div>
							{data.customBoards.length > 2 && (
								<Button
									variant="ghost"
									size="icon"
									onClick={() => removeBoard(index)}
									className="shrink-0"
								>
									<X className="h-4 w-4" />
								</Button>
							)}
						</div>
					))}

					{data.customBoards.length < 6 && (
						<Button variant="outline" onClick={addBoard} className="w-full">
							<Plus className="h-4 w-4 mr-2" />
							Add Board
						</Button>
					)}

					<div className="text-sm text-muted-foreground">
						{filledBoards}/6 boards created • {filledBoards >= 2 ? "✓" : "✗"}{" "}
						Minimum 2 required
					</div>
				</CardContent>
			</Card>

			{/* Preview */}
			{filledBoards > 0 && (
				<Card className="bg-muted/50">
					<CardHeader>
						<CardTitle className="text-sm">
							Preview: Your Custom Workflow
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap gap-2">
							{data.customBoards
								.filter((board) => board.trim())
								.map((board, index, filteredBoards) => (
									<div key={index} className="flex items-center gap-1">
										<div className="px-3 py-1 bg-background rounded-md border text-sm">
											{board.trim()}
										</div>
										{index < filteredBoards.length - 1 && (
											<span className="text-muted-foreground">→</span>
										)}
									</div>
								))}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Helpful Tips */}
			<Card className="border-dashed">
				<CardContent className="pt-6">
					<div className="text-sm space-y-2">
						<p className="font-medium">💡 Board naming tips:</p>
						<ul className="list-disc list-inside text-muted-foreground space-y-1">
							<li>
								Use action words: &quot;Requested&quot;, &quot;In Review&quot;,
								&quot;Completed&quot;
							</li>
							<li>Keep names short and clear</li>
							<li>Order them by your typical workflow progression</li>
							<li>
								Examples: &quot;New&quot;, &quot;Planned&quot;, &quot;In
								Progress&quot;, &quot;Done&quot;
							</li>
						</ul>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
