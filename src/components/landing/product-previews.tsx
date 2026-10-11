import {
	ArrowRight,
	Check,
	ChevronUp,
	MessageSquare,
	PanelsTopLeft,
} from "lucide-react";
import Link from "next/link";
import {
	type DemoComment,
	type DemoRequest,
	demoRequests,
	type RequestStatus,
	roadmapStages,
} from "./demo-data";
import styles from "./landing.module.css";

export function RequestStatusLabel({ status }: { status: RequestStatus }) {
	return (
		<span className={styles.status}>
			<span
				className={styles.statusDot}
				data-status={status}
				aria-hidden="true"
			/>
			{status}
		</span>
	);
}

export function VotePreview({ votes }: { votes: number }) {
	return (
		<span className={styles.vote} role="img" aria-label={`${votes} votes`}>
			<ChevronUp aria-hidden="true" />
			<span>{votes}</span>
		</span>
	);
}

export function CommentPreview({ comment }: { comment: DemoComment }) {
	return (
		<div className={styles.comment}>
			<span
				className={styles.avatar}
				data-maintainer={comment.role === "Maintainer"}
				aria-hidden="true"
			>
				{comment.author[0]}
			</span>
			<div>
				<strong>
					{comment.author} <small>{comment.role}</small>
				</strong>
				<p>{comment.text}</p>
			</div>
		</div>
	);
}

export function ConversationPreview() {
	const request = demoRequests[0];
	return (
		<div className={styles.conversation}>
			<div className={styles.detailTop}>
				<RequestStatusLabel status={request.status} />
			</div>
			<div className={styles.detailTitle}>
				<VotePreview votes={request.votes} />
				<h3>{request.title}</h3>
			</div>
			<p>{request.description}</p>
			{request.comments.map((comment) => (
				<CommentPreview key={comment.id} comment={comment} />
			))}
			<div className={styles.commentCompose}>
				<span className={styles.avatar} aria-hidden="true">
					Y
				</span>
				<Link href="/#product">
					Join the conversation <ArrowRight aria-hidden="true" />
				</Link>
			</div>
		</div>
	);
}

export function RoadmapPreview() {
	return (
		<div className={styles.kanban}>
			{roadmapStages.map((stage) => {
				const requests = demoRequests.filter(
					(request) => request.status === stage,
				);
				return (
					<div className={styles.kanbanColumn} key={stage}>
						<div className={styles.columnHeading}>
							<RequestStatusLabel status={stage} />
							<span>{requests.length}</span>
						</div>
						{requests.map((request) => (
							<RoadmapCard key={request.id} request={request} />
						))}
					</div>
				);
			})}
		</div>
	);
}

function RoadmapCard({ request }: { request: DemoRequest }) {
	return (
		<article className={styles.task}>
			<VotePreview votes={request.votes} />
			<div className={styles.taskCopy}>
				<h4>{request.title}</h4>
				<p>{request.description}</p>
				<span className={styles.taskComments}>
					<MessageSquare aria-hidden="true" /> {request.commentCount} comments
				</span>
			</div>
		</article>
	);
}

export function ChangelogPreview() {
	return (
		<article className={styles.change}>
			<div className={styles.releaseMeta}>
				<RequestStatusLabel status="Shipped" />
			</div>
			<h3>Your board, right where you left it.</h3>
			<p>
				Forma now remembers your board filters. Come back to the requests you
				were following, with your preferred view already in place.
			</p>
			<div className={styles.filterPreview}>
				<span>
					<PanelsTopLeft aria-hidden="true" /> All requests
				</span>
				<span>
					In progress <Check aria-hidden="true" />
				</span>
				<span>
					Most voted <Check aria-hidden="true" />
				</span>
			</div>
			<div className={styles.releaseFooter}>
				<span className={styles.avatar} aria-hidden="true">
					J
				</span>
				<span>Jamie · Forma team</span>
				<span>Remember board filters</span>
			</div>
		</article>
	);
}
