"use client";

import { ChevronUp, Save } from "lucide-react";
import { useId, useState, useTransition } from "react";
import { toast } from "sonner";
import { updateAppThemeAction } from "@/actions/app-settings";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import { defaultPresets } from "@/lib/theme-presets";

interface ThemePickerProps {
	appSlug: string;
	currentTheme: string | null;
}

export function ThemePicker({ appSlug, currentTheme }: ThemePickerProps) {
	const [isPending, startTransition] = useTransition();

	// Convert object to string to easily check equality
	const currentThemeString = currentTheme ? JSON.stringify(currentTheme) : null;
	const [selectedThemeStr, setSelectedThemeStr] = useState<string | null>(
		currentThemeString,
	);

	// Find active key
	let activeKey = "default";
	if (selectedThemeStr) {
		const found = Object.entries(defaultPresets).find(
			([, v]) => JSON.stringify(v.styles) === selectedThemeStr,
		);
		if (found) activeKey = found[0];
	}

	const handleSelect = (val: string | null) => {
		if (!val) return;
		const presetKey = val === "default" ? null : val;
		const newTheme = presetKey ? defaultPresets[presetKey].styles : null;
		const newThemeStr = newTheme ? JSON.stringify(newTheme) : null;
		setSelectedThemeStr(newThemeStr);
	};

	const handleSave = () => {
		startTransition(async () => {
			const themeObj = selectedThemeStr ? JSON.parse(selectedThemeStr) : null;
			const result = await updateAppThemeAction(appSlug, themeObj);
			if (result.error) {
				toast.error(result.error);
			} else {
				toast.success("Theme updated successfully!");
			}
		});
	};

	const hasChanges = selectedThemeStr !== currentThemeString;
	const previewId = useId().replace(/:/g, "");
	const previewClassName = `theme-preview-${previewId}`;

	const activeStyles = selectedThemeStr ? JSON.parse(selectedThemeStr) : null;

	const lightStyles = Object.entries(activeStyles?.light || {})
		.map(([key, value]) => `--${key}: ${value};`)
		.join("\n");

	const darkStyles = Object.entries(activeStyles?.dark || {})
		.map(([key, value]) => `--${key}: ${value};`)
		.join("\n");

	// Color Dots Component for the Select items
	const ColorDots = ({ presetKey }: { presetKey: string | null }) => {
		if (!presetKey || !defaultPresets[presetKey]) {
			// Default Roadwise theme colors (approximate)
			return (
				<div className="flex gap-1 mr-2">
					{["#0f172a", "#f1f5f9", "#e2e8f0", "#94a3b8"].map((c) => (
						<div
							key={c}
							className="w-2.5 h-2.5 rounded-full border border-black/10"
							style={{ backgroundColor: c }}
						/>
					))}
				</div>
			);
		}

		const light = defaultPresets[presetKey].styles.light;
		// Use Primary, Secondary, Accent, and Background or Muted
		const colors = [light.primary, light.secondary, light.accent, light.muted];

		return (
			<div className="flex gap-1 mr-2">
				{colors.map((c) => (
					<div
						key={c}
						className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-sm"
						style={{ backgroundColor: c }}
					/>
				))}
			</div>
		);
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h3 className="text-lg font-medium">Appearance Settings</h3>
					<p className="text-sm text-gray-500">
						Select a theme to customize the look and feel of your public app
						page.
					</p>
				</div>
				<div className="flex items-center gap-3 w-full sm:w-auto">
					<div className="w-full sm:w-[280px]">
						<Select
							value={activeKey}
							onValueChange={handleSelect}
							disabled={isPending}
						>
							<SelectTrigger className="w-full">
								<div className="flex items-center truncate">
									<ColorDots
										presetKey={activeKey === "default" ? null : activeKey}
									/>
									<span className="truncate">
										{activeKey === "default"
											? "Roadwise Default"
											: defaultPresets[activeKey]?.label}
									</span>
								</div>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="default">
									<div className="flex items-center">
										<ColorDots presetKey={null} />
										<span>Roadwise Default</span>
									</div>
								</SelectItem>
								{Object.entries(defaultPresets).map(([key, preset]) => (
									<SelectItem key={key} value={key}>
										<div className="flex items-center">
											<ColorDots presetKey={key} />
											<span>{preset.label}</span>
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<Button
						onClick={handleSave}
						disabled={!hasChanges || isPending}
						className="min-w-[100px]"
					>
						{isPending ? (
							<span className="animate-pulse">Saving...</span>
						) : (
							<>
								<Save className="w-4 h-4 mr-2" />
								Save
							</>
						)}
					</Button>
				</div>
			</div>

			{/* Preview Box */}
			<div className="border rounded-xl overflow-hidden bg-background shadow-sm">
				<div className="bg-muted/50 px-4 py-2 border-b text-xs font-medium text-muted-foreground flex justify-between items-center">
					<span>Live Page Preview</span>
					{hasChanges && (
						<span className="text-primary animate-pulse">Unsaved changes</span>
					)}
				</div>

				<style>{`
					.${previewClassName} {
						${lightStyles}
					}
					.dark .${previewClassName} {
						${darkStyles}
					}
				`}</style>

				{/* The preview container applies the scoped class so all children inherit the CSS variables */}
				<div
					className={`${previewClassName} bg-background text-foreground p-6 sm:p-10 min-h-[450px]`}
				>
					{/* Exact match of app/[slug]/page.tsx layout */}
					<div className="flex flex-col h-full pointer-events-none">
						{/* Header */}
						<div className="flex items-end justify-between mb-6">
							<div className="flex gap-4 items-center">
								<Avatar className="w-16 h-16 rounded-md">
									<AvatarFallback className="text-3xl font-semibold rounded-md bg-primary text-primary-foreground">
										A
									</AvatarFallback>
								</Avatar>
								<div>
									<h1 className="text-3xl font-bold">App Name</h1>
									<p className="text-muted-foreground">
										A brief description of what this app does.
									</p>
								</div>
							</div>
							<Button>Request a feature</Button>
						</div>

						{/* Grid */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
							{/* Feature Board 1 */}
							<Card className="h-full border-border bg-card">
								<CardHeader>
									<CardTitle>Planned</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									{/* Feature Card */}
									<Card className="p-4 shadow-sm border-border bg-card">
										<div className="flex items-start gap-4">
											<Button
												variant="outline"
												className="flex flex-col h-auto py-2 px-3 gap-1 bg-background border-border shrink-0"
											>
												<ChevronUp className="w-4 h-4" />
												<span className="text-xs font-medium">42</span>
											</Button>
											<div className="grow">
												<h3 className="font-semibold text-card-foreground">
													Dark mode support
												</h3>
												<p className="text-sm text-muted-foreground">
													Add a dark mode toggle
												</p>
											</div>
										</div>
									</Card>

									{/* Feature Card */}
									<Card className="p-4 shadow-sm border-border bg-card">
										<div className="flex items-start gap-4">
											<Button
												variant="outline"
												className="flex flex-col h-auto py-2 px-3 gap-1 bg-background border-border shrink-0"
											>
												<ChevronUp className="w-4 h-4" />
												<span className="text-xs font-medium">18</span>
											</Button>
											<div className="grow">
												<h3 className="font-semibold text-card-foreground">
													API Integrations
												</h3>
												<p className="text-sm text-muted-foreground">
													Support webhooks and REST API
												</p>
											</div>
										</div>
									</Card>
								</CardContent>
							</Card>

							{/* Feature Board 2 */}
							<Card className="h-full border-border bg-card opacity-80">
								<CardHeader>
									<CardTitle>In Progress</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<Card className="p-4 shadow-sm border-border bg-card">
										<div className="flex items-start gap-4">
											<Button
												variant="outline"
												className="flex flex-col h-auto py-2 px-3 gap-1 bg-background border-border shrink-0 text-primary border-primary/20 bg-primary/5"
											>
												<ChevronUp className="w-4 h-4" />
												<span className="text-xs font-medium">129</span>
											</Button>
											<div className="grow">
												<h3 className="font-semibold text-card-foreground">
													Custom Themes
												</h3>
												<p className="text-sm text-muted-foreground">
													Let users customize the app's look and feel
												</p>
											</div>
										</div>
									</Card>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
