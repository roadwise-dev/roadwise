"use client";

import { MessageSquare, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FeatureDetailDialog } from "../app/feature-detail-dialog";
import { CreateFeatureDialog } from "../app/request-feature-dialog";
import { Badge } from "../ui/badge";

interface Feature {
	id: string;
	appId: string;
	boardId: string | null;
	title: string;
	description: string;
	tags: string[];
	name: string;
	upvotes: number;
	createdAt: Date;
}

export default function RequestFeatureList({
	features,
	appId,
	appName,
}: {
	features: Feature[];
	appId: string;
	appName: string;
}) {
	const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

	// Handle opening a feature
	const handleFeatureClick = (feature: Feature) => {
		setSelectedFeature(feature);
	};

	// Handle closing the dialog
	const handleCloseDialog = () => {
		setSelectedFeature(null);
	};

	return (
		<div className="flex flex-col">
			<div className="flex gap-4 mb-6">
				<div className="relative grow">
					<Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
					<Input
						type="text"
						placeholder="Search features..."
						className="pl-10"
					/>
				</div>
				<CreateFeatureDialog appId={appId} appName={appName} />
			</div>

			{features.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{features.map((feature) => (
						<Card
							key={feature.id}
							className="cursor-pointer hover:shadow-md transition-shadow"
							onClick={() => handleFeatureClick(feature)}
						>
							<CardHeader>
								<CardTitle>{feature.title}</CardTitle>
								<CardDescription>{feature.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex justify-between items-center">
									<div className="flex items-center text-muted-foreground">
										<MessageSquare className="h-4 w-4 mr-1" />
										<span className="text-sm">2</span>
									</div>
									<div>
										{feature.tags.map((tag) => (
											<Badge
												key={tag}
												variant="secondary"
												className="mr-1 mb-1"
											>
												{tag}
											</Badge>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<div className="text-center py-10">
					<h2 className="text-2xl font-semibold mb-2">No results found</h2>
					<p className="text-muted-foreground">
						We couldn&apos;t find any features matching your search or selected
						tags.
					</p>
					<p className="text-muted-foreground">
						Try adjusting your search terms or selected tags, or{" "}
						<Button variant="link" className="p-0 h-auto font-semibold">
							submit a new feature request
						</Button>
						.
					</p>
				</div>
			)}

			{/* Feature Detail Dialog */}
			<FeatureDetailDialog
				feature={selectedFeature}
				open={selectedFeature !== null}
				onOpenChange={(open) => {
					if (!open) handleCloseDialog();
				}}
			/>
		</div>
	);
}
