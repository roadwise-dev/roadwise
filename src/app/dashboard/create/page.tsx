"use client";

import { CreateAppForm } from "@/components/onboarding/create-app-form";

export default function CreateAppPage() {
	return (
		<div className="grid h-full place-items-center overflow-hidden bg-background">
			<div className="w-full max-w-2xl">
				<CreateAppForm />
			</div>
		</div>
	);
}
