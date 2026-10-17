"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CreateAppButton() {
	const router = useRouter();

	const handleCreateApp = () => {
		router.push("/dashboard/create");
	};

	return (
		<Button onClick={handleCreateApp}>
			<Plus className="mr-2 h-4 w-4" />
			Create App
		</Button>
	);
}
