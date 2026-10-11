export type RequestStatus =
	| "Under review"
	| "Planned"
	| "In progress"
	| "Shipped";

export interface DemoComment {
	id: string;
	author: string;
	role: string;
	text: string;
}

export interface DemoRequest {
	id: number;
	title: string;
	description: string;
	votes: number;
	commentCount: number;
	status: RequestStatus;
	voted: boolean;
	comments: DemoComment[];
}

export const demoRequests: DemoRequest[] = [
	{
		id: 42,
		title: "Keyboard shortcuts",
		description:
			"Navigate boards and manage requests without leaving the keyboard.",
		votes: 42,
		commentCount: 8,
		status: "In progress",
		voted: false,
		comments: [
			{
				id: "alex",
				author: "Alex",
				role: "Community",
				text: "Switching boards is the last thing I still reach for my mouse to do.",
			},
			{
				id: "jamie",
				author: "Jamie",
				role: "Maintainer",
				text: "We’re starting with board navigation and quick search.",
			},
		],
	},
	{
		id: 38,
		title: "Export feedback as CSV",
		description: "Take requests and vote counts into our planning documents.",
		votes: 28,
		commentCount: 5,
		status: "Planned",
		voted: false,
		comments: [
			{
				id: "sam",
				author: "Sam",
				role: "Community",
				text: "I’d like to include vote counts in our weekly planning notes.",
			},
		],
	},
	{
		id: 31,
		title: "Custom board domains",
		description: "Give our feedback board a home on our own domain.",
		votes: 19,
		commentCount: 3,
		status: "Under review",
		voted: false,
		comments: [
			{
				id: "lee",
				author: "Lee",
				role: "Community",
				text: "A feedback subdomain would help people find our board.",
			},
		],
	},
	{
		id: 24,
		title: "Remember board filters",
		description: "Keep my preferred view when I return to the board.",
		votes: 16,
		commentCount: 2,
		status: "Shipped",
		voted: false,
		comments: [
			{
				id: "jo",
				author: "Jo",
				role: "Community",
				text: "Thanks for shipping this. My preferred filters are there when I come back.",
			},
		],
	},
];

export const roadmapStages = ["Planned", "In progress", "Shipped"] as const;
export const sourceUrl = "https://github.com/jakmaz/roadwise";
export const publicDemoUrl = "https://www.roadwiseapp.com/app/roadwise";
export const landingLinks = [
	{ href: "/#product", label: "Product" },
	{ href: "/#ecosystem", label: "Developers" },
	{ href: "/#hosting", label: "Open source" },
	{ href: "/#pricing", label: "Pricing" },
];
