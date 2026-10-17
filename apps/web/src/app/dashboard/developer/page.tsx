import { getApiKeys } from "@/actions/api-keys";
import { DeveloperSettings } from "@/components/dashboard/developer-settings";

export const metadata = {
	title: "Developer Settings",
	description: "Manage your Personal Access Tokens.",
};

export default async function DeveloperPage() {
	const keys = await getApiKeys();

	return (
		<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Developer Settings</h2>
			</div>
			<p className="text-muted-foreground mb-8">
				Manage your Personal Access Tokens for the Roadwise CLI, Raycast extension, and MCP servers.
			</p>
			
			<DeveloperSettings initialKeys={keys} />
		</div>
	);
}
