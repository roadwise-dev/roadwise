"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Tabs } from "@base-ui/react/tabs";
import {
	ArrowRight,
	Check,
	ChevronUp,
	FileText,
	Map as MapIcon,
	MessageSquare,
	PanelsTopLeft,
	Plus,
	Search,
	SlidersHorizontal,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import Logo from "@/components/svg/logo";
import { type DemoRequest, demoRequests, roadmapStages } from "./demo-data";
import styles from "./landing.module.css";
import LandingDialog from "./landing-dialog";
import {
	ChangelogPreview,
	CommentPreview,
	RequestStatusLabel,
} from "./product-previews";

const demoTabs = [
	{ id: "feedback", label: "Feedback", icon: PanelsTopLeft },
	{ id: "roadmap", label: "Roadmap", icon: MapIcon },
	{ id: "changelog", label: "Changelog", icon: FileText },
	{ id: "appearance", label: "Appearance", icon: SlidersHorizontal },
] as const;
type DemoTab = (typeof demoTabs)[number]["id"];
type DemoSurface = "light" | "graphite";

export default function ProductDemo() {
	const [requests, setRequests] = useState(demoRequests);
	const [activeTab, setActiveTab] = useState<DemoTab>("feedback");
	const [query, setQuery] = useState("");
	const [sort, setSort] = useState("votes");
	const [dialog, setDialog] = useState<"new" | "detail" | null>(null);
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [comment, setComment] = useState("");
	const [formError, setFormError] = useState("");
	const [boardName, setBoardName] = useState("Forma");
	const [draftName, setDraftName] = useState("Forma");
	const [surface, setSurface] = useState<DemoSurface>("light");
	const [draftSurface, setDraftSurface] = useState<DemoSurface>("light");
	const [announcement, setAnnouncement] = useState("");
	const selected = requests.find((request) => request.id === selectedId);
	const filtered = requests
		.filter((request) =>
			`${request.title} ${request.description}`
				.toLowerCase()
				.includes(query.trim().toLowerCase()),
		)
		.sort((a, b) => (sort === "newest" ? b.id - a.id : b.votes - a.votes));

	function vote(id: number) {
		setRequests((current) =>
			current.map((request) =>
				request.id === id
					? {
							...request,
							voted: !request.voted,
							votes: request.votes + (request.voted ? -1 : 1),
						}
					: request,
			),
		);
	}

	function showRequest(id: number) {
		setSelectedId(id);
		setComment("");
		setDialog("detail");
	}

	function submitRequest(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!title.trim()) {
			setFormError("Enter a title for your request.");
			return;
		}
		const id = Math.max(...requests.map((request) => request.id)) + 1;
		setRequests((current) => [
			{
				id,
				title: title.trim(),
				description: description.trim(),
				status: "Under review",
				votes: 1,
				voted: true,
				commentCount: 0,
				comments: [],
			},
			...current,
		]);
		setTitle("");
		setDescription("");
		setFormError("");
		setQuery("");
		setSort("newest");
		setActiveTab("feedback");
		setDialog(null);
		setAnnouncement("Your request was added to this sample board.");
	}

	function submitComment(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!comment.trim() || selectedId === null) return;
		const newComment = {
			id: crypto.randomUUID(),
			author: "You",
			role: "Community",
			text: comment.trim(),
		};
		setRequests((current) =>
			current.map((request) =>
				request.id === selectedId
					? {
							...request,
							commentCount: request.commentCount + 1,
							comments: [...request.comments, newComment],
						}
					: request,
			),
		);
		setComment("");
		setAnnouncement("Your comment was added to this sample request.");
	}

	return (
		<section
			className={`${styles.wideWrap} ${styles.demoSection}`}
			id="product"
			aria-label="Explore Roadwise"
		>
			<div className={styles.stageFrame}>
				<Tabs.Root
					value={activeTab}
					onValueChange={(value: unknown) => {
						const tab = demoTabs.find((tab) => tab.id === value);
						if (tab) setActiveTab(tab.id);
					}}
					className={styles.productApp}
					data-surface={surface}
				>
					<div className={styles.appNavigation}>
						<Tabs.List
							className={styles.appTabs}
							aria-label="Product demo views"
							activateOnFocus
						>
							{demoTabs.map((tab) => (
								<Tabs.Tab key={tab.id} value={tab.id} aria-label={tab.label}>
									<tab.icon aria-hidden="true" />
									<span>{tab.label}</span>
								</Tabs.Tab>
							))}
						</Tabs.List>
						<span className={styles.appPowered}>
							Powered by{" "}
							<Logo
								size={18}
								variant={
									surface === "graphite" ? "blackOnWhite" : "whiteOnBlack"
								}
							/>{" "}
							Roadwise
						</span>
					</div>
					<div className={styles.boardIntro}>
						<div className={styles.boardIdentity}>
							<span className={styles.forma} aria-hidden="true">
								f
							</span>
							<div>
								<h3>{boardName}</h3>
								<p>Product feedback, roadmap, and updates.</p>
							</div>
						</div>
						<button
							type="button"
							className={styles.smallButton}
							onClick={() => {
								setFormError("");
								setDialog("new");
							}}
						>
							<Plus aria-hidden="true" /> Request a feature
						</button>
					</div>
					<div className={styles.appPanels}>
						<Tabs.Panel
							value="feedback"
							keepMounted
							hidden={false}
							className={styles.appPanel}
						>
							<div className={styles.boardTools}>
								<label className={styles.search} htmlFor="demo-search">
									<Search aria-hidden="true" />
									<input
										className={styles.field}
										id="demo-search"
										type="search"
										value={query}
										onChange={(event) => setQuery(event.target.value)}
										placeholder="Search requests…"
										aria-label="Search requests"
									/>
								</label>
								<select
									className={styles.sort}
									aria-label="Sort requests"
									value={sort}
									onChange={(event) => setSort(event.target.value)}
								>
									<option value="votes">Most voted</option>
									<option value="newest">Newest first</option>
								</select>
							</div>
							<div className={styles.requestList}>
								{filtered.map((request) => (
									<article key={request.id} className={styles.requestRow}>
										<VoteButton request={request} onVote={vote} />
										<div className={styles.requestCopy}>
											<button
												type="button"
												className={styles.requestTitle}
												onClick={() => showRequest(request.id)}
											>
												{request.title}
											</button>
											<p>{request.description}</p>
											<div className={styles.requestMeta}>
												<RequestStatusLabel status={request.status} />
												<span>
													<MessageSquare aria-hidden="true" />{" "}
													{request.commentCount}
												</span>
											</div>
										</div>
									</article>
								))}
							</div>
							{filtered.length === 0 && (
								<div className={styles.empty} role="status">
									<p>No requests found. Try another search.</p>
									<button
										type="button"
										className={`${styles.actionButton} ${styles.outlineButton}`}
										onClick={() => setQuery("")}
									>
										Clear search
									</button>
								</div>
							)}
						</Tabs.Panel>
						<Tabs.Panel
							value="roadmap"
							keepMounted
							hidden={false}
							className={styles.appPanel}
						>
							<div className={styles.kanban}>
								{roadmapStages.map((stage) => (
									<div className={styles.kanbanColumn} key={stage}>
										<div className={styles.columnHeading}>
											<RequestStatusLabel status={stage} />
											<span>
												{
													requests.filter((request) => request.status === stage)
														.length
												}
											</span>
										</div>
										{requests
											.filter((request) => request.status === stage)
											.map((request) => (
												<article key={request.id} className={styles.task}>
													<VoteButton request={request} onVote={vote} />
													<div className={styles.taskCopy}>
														<h4>
															<button
																type="button"
																className={styles.requestTitle}
																onClick={() => showRequest(request.id)}
															>
																{request.title}
															</button>
														</h4>
														<p>{request.description}</p>
														<span className={styles.taskComments}>
															<MessageSquare aria-hidden="true" />{" "}
															{request.commentCount} comments
														</span>
													</div>
												</article>
											))}
									</div>
								))}
							</div>
						</Tabs.Panel>
						<Tabs.Panel
							value="changelog"
							keepMounted
							hidden={false}
							className={styles.appPanel}
						>
							<ChangelogPreview />
						</Tabs.Panel>
						<Tabs.Panel
							value="appearance"
							keepMounted
							hidden={false}
							className={styles.appPanel}
						>
							<form
								className={styles.appearance}
								onSubmit={(event) => {
									event.preventDefault();
									setBoardName(draftName.trim() || "Forma");
									setSurface(draftSurface);
									setAnnouncement("Appearance saved for this sample board.");
								}}
							>
								<h3>Make your board feel like home.</h3>
								<p>Set the look of your public feedback board.</p>
								<label htmlFor="demo-board-name">Board name</label>
								<input
									className={styles.field}
									id="demo-board-name"
									value={draftName}
									maxLength={24}
									required
									onChange={(event) => setDraftName(event.target.value)}
								/>
								<fieldset className={styles.themeOptions}>
									<legend className="sr-only">Preview surface</legend>
									{(["light", "graphite"] as const).map((theme) => (
										<button
											key={theme}
											type="button"
											aria-pressed={draftSurface === theme}
											onClick={() => setDraftSurface(theme)}
										>
											<span
												className={styles.swatch}
												data-surface={theme}
												aria-hidden="true"
											/>
											{theme === "light" ? "Light" : "Graphite"}
										</button>
									))}
								</fieldset>
								<button type="submit" className={styles.actionButton}>
									Save appearance <Check aria-hidden="true" />
								</button>
								<p className={styles.localDemoNote}>
									Changes apply to this sample board only.
								</p>
								<p className={styles.saveMessage} role="status">
									{announcement.startsWith("Appearance") ? announcement : ""}
								</p>
							</form>
						</Tabs.Panel>
					</div>
				</Tabs.Root>
			</div>
			<span className="sr-only" role="status">
				{announcement}
			</span>

			<LandingDialog
				open={dialog === "new"}
				onOpenChange={(open) => {
					if (!open) setDialog(null);
				}}
			>
				<div className={styles.dialogHeader}>
					<Dialog.Title className={styles.dialogTitle}>
						Suggest a feature
					</Dialog.Title>
					<Dialog.Description className={styles.dialogDescription}>
						Add a request to the sample board. Changes stay in this demo.
					</Dialog.Description>
				</div>
				<form onSubmit={submitRequest} className={styles.demoForm}>
					<label htmlFor="demo-request-title">Title</label>
					<input
						className={styles.field}
						id="demo-request-title"
						value={title}
						maxLength={100}
						required
						aria-invalid={!!formError}
						aria-describedby={formError ? "demo-request-error" : undefined}
						onChange={(event) => {
							setTitle(event.target.value);
							setFormError("");
						}}
						placeholder="What would you like to see?"
					/>
					<label htmlFor="demo-request-description">
						Description <span>(optional)</span>
					</label>
					<textarea
						className={styles.field}
						id="demo-request-description"
						value={description}
						maxLength={1000}
						onChange={(event) => setDescription(event.target.value)}
						placeholder="How would this help you?"
						rows={4}
					/>
					{formError && (
						<p id="demo-request-error" role="alert">
							{formError}
						</p>
					)}
					<button type="submit" className={styles.actionButton}>
						Submit request <ArrowRight aria-hidden="true" />
					</button>
				</form>
			</LandingDialog>
			<LandingDialog
				open={dialog === "detail" && !!selected}
				onOpenChange={(open) => {
					if (!open) setDialog(null);
				}}
			>
				{selected && (
					<>
						<div className={styles.dialogHeader}>
							<div className={styles.detailTop}>
								<RequestStatusLabel status={selected.status} />
							</div>
							<div className={styles.detailTitle}>
								<VoteButton request={selected} onVote={vote} />
								<Dialog.Title className={styles.dialogTitle}>
									{selected.title}
								</Dialog.Title>
							</div>
							<Dialog.Description className={styles.dialogDescription}>
								{selected.description ||
									"Tell us how this feature would help you."}
							</Dialog.Description>
						</div>
						<div>
							{selected.comments.length ? (
								selected.comments.map((item) => (
									<CommentPreview key={item.id} comment={item} />
								))
							) : (
								<p className={styles.emptyComments}>
									Start the conversation. Add context for this request.
								</p>
							)}
						</div>
						<form onSubmit={submitComment} className={styles.demoForm}>
							<label htmlFor="demo-comment">Your comment</label>
							<textarea
								className={styles.field}
								id="demo-comment"
								value={comment}
								maxLength={1000}
								required
								rows={3}
								onChange={(event) => setComment(event.target.value)}
								placeholder="Add your perspective…"
							/>
							<button
								type="submit"
								disabled={!comment.trim()}
								className={styles.actionButton}
							>
								Post comment
							</button>
						</form>
						<p className={styles.dialogNote}>
							Sample content. Votes and comments stay in this demo.
						</p>
					</>
				)}
			</LandingDialog>
		</section>
	);
}

function VoteButton({
	request,
	onVote,
}: {
	request: DemoRequest;
	onVote: (id: number) => void;
}) {
	return (
		<button
			type="button"
			className={styles.vote}
			aria-label={`${request.voted ? "Remove vote from" : "Vote for"} ${request.title}`}
			aria-pressed={request.voted}
			onClick={() => onVote(request.id)}
		>
			<ChevronUp aria-hidden="true" />
			<span>{request.votes}</span>
		</button>
	);
}
