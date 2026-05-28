"use client";

import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Board = {
	id: string;
	name: string;
};

export function BoardsList() {
	const [boards, setBoards] = useState<Board[]>([
		{ id: "1", name: "Project Alpha" },
		{ id: "2", name: "Marketing Campaign" },
		{ id: "3", name: "Bug Tracker" },
	]);
	const [newBoardName, setNewBoardName] = useState("");

	const addBoard = () => {
		if (newBoardName.trim()) {
			setBoards([
				...boards,
				{ id: Date.now().toString(), name: newBoardName.trim() },
			]);
			setNewBoardName("");
		}
	};

	const removeBoard = (id: string) => {
		setBoards(boards.filter((board) => board.id !== id));
	};

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-semibold">Boards</h2>
			<ul className="space-y-2">
				{boards.map((board) => (
					<li
						key={board.id}
						className="flex items-center justify-between p-2 border border-gray-200 rounded-md"
					>
						<span>{board.name}</span>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => removeBoard(board.id)}
							aria-label={`Remove ${board.name} board`}
						>
							<X className="h-4 w-4" />
						</Button>
					</li>
				))}
			</ul>
			<div className="flex items-center space-x-2">
				<Input
					placeholder="New board name"
					value={newBoardName}
					onChange={(e) => setNewBoardName(e.target.value)}
					className="max-w-sm"
				/>
				<Button onClick={addBoard}>
					<PlusCircle className="mr-2 h-4 w-4" />
					Add Board
				</Button>
			</div>
		</div>
	);
}
