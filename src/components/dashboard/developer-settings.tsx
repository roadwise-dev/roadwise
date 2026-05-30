"use client";

import { useState } from "react";
import { createApiKey, revokeApiKey, type getApiKeys } from "@/actions/api-keys";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Trash2, Copy, Key, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type ApiKeyList = Awaited<ReturnType<typeof getApiKeys>>;

export function DeveloperSettings({ initialKeys }: { initialKeys: ApiKeyList }) {
	const [keys, setKeys] = useState(initialKeys);
	const [isCreating, setIsCreating] = useState(false);
	const [newKeyName, setNewKeyName] = useState("");
	const [generatedToken, setGeneratedToken] = useState<string | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleCreateKey = async () => {
		if (!newKeyName.trim()) {
			toast.error("Please enter a name for your API key");
			return;
		}

		setIsCreating(true);
		const result = await createApiKey(newKeyName);
		setIsCreating(false);

		if (result.error) {
			toast.error(result.error);
			return;
		}

		if (result.token) {
			setGeneratedToken(result.token);
			setNewKeyName("");
			
			// Optimistically update the list without a full refetch
			const newKeyEntry = {
				id: "temp-" + Date.now(),
				name: newKeyName,
				hint: result.token.substring(0, 7) + "..." + result.token.substring(result.token.length - 4),
				createdAt: new Date(),
				lastUsedAt: null
			};
			
			setKeys([newKeyEntry as any, ...keys]);
		}
	};

	const handleRevokeKey = async (id: string) => {
		const confirmed = window.confirm("Are you sure you want to revoke this key? Any application using it will lose access immediately.");
		if (!confirmed) return;

		const result = await revokeApiKey(id);
		if (result.error) {
			toast.error(result.error);
			return;
		}

		setKeys(keys.filter(k => k.id !== id));
		toast.success("API key revoked");
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success("Copied to clipboard");
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>Personal Access Tokens</CardTitle>
							<CardDescription>
								Use these tokens to authenticate with the Roadwise API.
								<br />
								<Link href="/docs/api" className="inline-flex items-center text-primary hover:underline mt-2" target="_blank">
									Read the API Documentation <ArrowRight className="ml-1 h-3 w-3" />
								</Link>
							</CardDescription>
						</div>
						<Dialog open={isDialogOpen} onOpenChange={(open) => {
							setIsDialogOpen(open);
							if (!open) {
								setGeneratedToken(null);
								setNewKeyName("");
							}
						}}>
							<DialogTrigger asChild>
								<Button>Generate New Token</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Generate API Key</DialogTitle>
									<DialogDescription>
										Create a new token to access the Roadwise API from external applications.
									</DialogDescription>
								</DialogHeader>

								{!generatedToken ? (
									<div className="space-y-4 py-4">
										<div className="space-y-2">
											<Label htmlFor="name">Token Name</Label>
											<Input
												id="name"
												placeholder="e.g., Raycast Extension, Macbook CLI"
												value={newKeyName}
												onChange={(e) => setNewKeyName(e.target.value)}
											/>
										</div>
										<DialogFooter>
											<Button onClick={handleCreateKey} disabled={isCreating}>
												{isCreating ? "Generating..." : "Generate Token"}
											</Button>
										</DialogFooter>
									</div>
								) : (
									<div className="space-y-4 py-4">
										<div className="rounded-md bg-muted p-4 space-y-3 border border-border">
											<div className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-500">
												<Key className="h-4 w-4" />
												Please copy your new API key now.
											</div>
											<p className="text-sm text-muted-foreground">
												For your security, it will never be shown again.
											</p>
											<div className="flex gap-2 items-center mt-2">
												<Input value={generatedToken} readOnly className="font-mono" />
												<Button variant="outline" size="icon" onClick={() => copyToClipboard(generatedToken)}>
													<Copy className="h-4 w-4" />
												</Button>
											</div>
										</div>
										<DialogFooter>
											<Button onClick={() => setIsDialogOpen(false)}>I have copied it</Button>
										</DialogFooter>
									</div>
								)}
							</DialogContent>
						</Dialog>
					</div>
				</CardHeader>
				<CardContent>
					{keys.length === 0 ? (
						<div className="text-center py-8 text-muted-foreground">
							No API keys generated yet.
						</div>
					) : (
						<div className="space-y-4">
							{keys.map((key) => (
								<div key={key.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
									<div className="space-y-1">
										<div className="font-medium">{key.name}</div>
										<div className="text-sm font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-md w-fit">
											{key.hint}
										</div>
									</div>
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<div>
											Created {new Date(key.createdAt).toLocaleDateString()}
										</div>
										<Button 
											variant="ghost" 
											size="icon" 
											className="text-destructive hover:text-destructive hover:bg-destructive/10"
											onClick={() => handleRevokeKey(key.id)}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
