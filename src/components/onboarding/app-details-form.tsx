import { Upload } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useOnboarding } from "@/contexts/onboarding-context";

export function AppDetailsForm() {
	const { data, updateData, errors, setErrors } = useOnboarding();

	const generateSlug = useCallback((name: string) => {
		return name
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, "")
			.trim()
			.replace(/\s+/g, "-");
	}, []);

	const handleNameChange = (value: string) => {
		updateData({
			appName: value,
			appSlug: data.isSlugEdited ? data.appSlug : generateSlug(value),
		});
	};

	const handleSlugChange = (value: string) => {
		const cleanSlug = value.toLowerCase().replace(/[^a-z0-9-]/g, "");
		updateData({
			appSlug: cleanSlug,
			isSlugEdited: true,
		});
	};

	// Real-time validation
	useEffect(() => {
		const newErrors: Record<string, string> = {};

		if (data.appName.length > 50) {
			newErrors.appName = "App name must be less than 50 characters";
		}

		if (data.appSlug.length > 30) {
			newErrors.appSlug = "App slug must be less than 30 characters";
		} else if (data.appSlug && !/^[a-z0-9-]+$/.test(data.appSlug)) {
			newErrors.appSlug =
				"Slug can only contain lowercase letters, numbers, and hyphens";
		}

		if (data.appDescription.length > 200) {
			newErrors.appDescription = "Description must be less than 200 characters";
		}

		setErrors(newErrors);
	}, [data.appName, data.appSlug, data.appDescription, setErrors]);

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-bold">Create Your Feedback App</h1>
				<p className="text-muted-foreground">
					Start collecting and organizing user feedback in minutes
				</p>
			</div>

			{/* App Preview Card */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-3">
						<Avatar className="w-12 h-12 rounded-lg">
							<AvatarImage src={data.avatarUrl} />
							<AvatarFallback className="rounded-lg">
								{data.appName?.charAt(0)?.toUpperCase() || "A"}
							</AvatarFallback>
						</Avatar>
						<div>
							<div className="text-lg">{data.appName || "Your App Name"}</div>
							<div className="text-sm text-muted-foreground">
								{data.appSlug || "your-app-slug"}.roadwiseapp.com
							</div>
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* App Name */}
					<div className="space-y-2">
						<Label htmlFor="app-name">App Name</Label>
						<Input
							id="app-name"
							placeholder="My Awesome Product"
							value={data.appName}
							onChange={(e) => handleNameChange(e.target.value)}
							className={errors.appName ? "border-destructive" : ""}
						/>
						{errors.appName && (
							<p className="text-sm text-destructive">{errors.appName}</p>
						)}
					</div>

					{/* URL Slug */}
					<div className="space-y-2">
						<Label htmlFor="app-slug">URL Slug</Label>
						<div className="flex">
							<Input
								id="app-slug"
								value={data.appSlug}
								onChange={(e) => handleSlugChange(e.target.value)}
								className={`rounded-r-none ${errors.appSlug ? "border-destructive" : ""}`}
							/>
							<div className="px-3 py-2 bg-muted border border-l-0 rounded-r-md text-sm text-muted-foreground">
								.roadwiseapp.com
							</div>
						</div>
						{errors.appSlug && (
							<p className="text-sm text-destructive">{errors.appSlug}</p>
						)}
					</div>

					{/* Description */}
					<div className="space-y-2">
						<Label htmlFor="app-description">Description (Optional)</Label>
						<Textarea
							id="app-description"
							placeholder="Brief description of your product..."
							value={data.appDescription}
							onChange={(e) => updateData({ appDescription: e.target.value })}
							className={`resize-none ${errors.appDescription ? "border-destructive" : ""}`}
							rows={3}
						/>
						{errors.appDescription && (
							<p className="text-sm text-destructive">
								{errors.appDescription}
							</p>
						)}
						<p className="text-xs text-muted-foreground">
							{data.appDescription.length}/200 characters
						</p>
					</div>

					{/* Avatar Upload */}
					<div className="space-y-2">
						<Label>App Logo (Optional)</Label>
						<Button
							type="button"
							variant="outline"
							className="w-full"
							onClick={() => {
								// TODO: Handle avatar upload in future iteration
								console.log("Avatar upload - will implement in next step");
							}}
						>
							<Upload className="w-4 h-4 mr-2" />
							Upload Logo
						</Button>
						<p className="text-xs text-muted-foreground">
							You can upload a custom logo later from your app settings
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
