import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface NewsPostProps {
	id: string;
	date: Date;
	title: string;
	content: string;
	image: string | null;
	tags: string[];
	link?: {
		text: string;
		url: string;
	};
}

export function NewsPost({
	id,
	date,
	title,
	content,
	image,
	tags,
	link,
}: NewsPostProps) {
	return (
		<article
			id={id}
			aria-labelledby={`${id}-title`}
			className="scroll-mt-24 border-b border-border pb-8 last:border-b-0 last:pb-0"
		>
			<time
				dateTime={date.toISOString()}
				className="mb-2 block text-sm text-muted-foreground"
			>
				{date.toLocaleDateString("en-US", {
					day: "2-digit",
					month: "short",
					year: "numeric",
				})}
			</time>
			<div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
				<h2
					id={`${id}-title`}
					className="min-w-0 flex-1 break-words text-2xl font-semibold tracking-tight"
				>
					{title}
				</h2>
				<div className="flex max-w-full flex-wrap gap-2 sm:max-w-[40%] sm:justify-end">
					{tags.map((tag) => (
						<Badge
							key={tag}
							variant={tag === "New Feature" ? "default" : "secondary"}
							className="h-auto max-w-full whitespace-normal break-words"
						>
							{tag}
						</Badge>
					))}
				</div>
			</div>

			{image && (
				<div className="mb-6 overflow-hidden rounded-lg border border-border">
					<Image
						src={image}
						alt={title}
						width={800}
						height={400}
						sizes="(min-width: 1440px) 1048px, (min-width: 1024px) 75vw, 100vw"
						className="h-auto w-full"
					/>
				</div>
			)}

			<p className="whitespace-pre-wrap break-words leading-7">{content}</p>

			{link && (
				<p className="mt-3 break-words leading-7">
					{link.text.split("here").map((part, i, arr) => {
						const isLast = i === arr.length - 1;
						return isLast ? (
							<span key={part}>{part}</span>
						) : (
							<span key={part}>
								{part}
								<Link
									href={link.url}
									className="underline underline-offset-4 hover:text-muted-foreground"
								>
									here
								</Link>
							</span>
						);
					})}
				</p>
			)}
		</article>
	);
}
