import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Analytics",
};

export default async function AnalyticsPage() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Analytics are not available yet</CardTitle>
				<CardDescription>
					This page is hidden from navigation until real app analytics are
					tracked.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">
					Current dashboard metrics are shown on the overview and feedback
					pages.
				</p>
			</CardContent>
		</Card>
	);
}
