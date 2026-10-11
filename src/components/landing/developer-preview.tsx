"use client";

import { Tabs } from "@base-ui/react/tabs";
import { Check, ChevronRight, MessageSquare, Terminal } from "lucide-react";
import Logo from "@/components/svg/logo";
import { demoRequests } from "./demo-data";
import styles from "./landing.module.css";
import {
	CommentPreview,
	RequestStatusLabel,
	VotePreview,
} from "./product-previews";

const views = [
	{
		value: "read",
		title: "Understand what people want",
		description:
			"Read requests and comments through remote MCP or the ChatGPT plugin. Ask about demand with the context already there.",
		tool: "Remote MCP preview",
	},
	{
		value: "progress",
		title: "Keep progress connected",
		description:
			"Update the roadmap through the REST API and developer SDK. Receive feedback events through webhooks.",
		tool: "Roadmap update preview",
	},
	{
		value: "tools",
		title: "Work from your own tools",
		description:
			"Review feedback in the CLI or Raycast extension. Bring your board into your app with embeddable React components.",
		tool: "CLI preview",
	},
] as const;

export default function DeveloperPreview() {
	const request = demoRequests[0];
	return (
		<Tabs.Root defaultValue="read" className={styles.developerPreview}>
			<div className={styles.agentStage}>
				<div className={styles.agentPanels}>
					{views.map((view) => (
						<Tabs.Panel
							key={view.value}
							value={view.value}
							keepMounted
							hidden={false}
							className={styles.agentPanel}
						>
							<div className={styles.agentBar}>
								<span>
									Forma <ChevronRight aria-hidden="true" /> Feature requests
								</span>
								<span className={styles.agentAvailability}>
									<span className={styles.agentPreviewName}>{view.tool}</span>{" "}
									<span>Coming soon</span>
								</span>
							</div>
							<div className={styles.agentBody}>
								<div className={styles.agentRequest}>
									<div className={styles.agentRequestTitle}>
										<VotePreview votes={request.votes} />
										<h3>{request.title}</h3>
									</div>
									<p>{request.description}</p>
									<div className={styles.agentRequestMeta}>
										<RequestStatusLabel status={request.status} />
										<span>
											<MessageSquare aria-hidden="true" />{" "}
											{request.commentCount} comments
										</span>
									</div>
									<div className={styles.agentComments}>
										{request.comments.map((comment) => (
											<CommentPreview key={comment.id} comment={comment} />
										))}
									</div>
								</div>
								<div className={styles.agentContext}>
									{view.value === "tools" ? (
										<>
											<span className={styles.agentContextTitle}>
												<Terminal aria-hidden="true" /> Your terminal
											</span>
											<code className={styles.agentCommand}>
												$ roadwise requests list --board forma
											</code>
											<div className={styles.agentResults}>
												{demoRequests.slice(0, 3).map((item) => (
													<div key={item.id}>
														<span>{item.votes}</span>
														<span>{item.title}</span>
													</div>
												))}
											</div>
											<p className={styles.agentContextNote}>
												Illustrative commands for the upcoming CLI.
											</p>
										</>
									) : (
										<>
											<span className={styles.agentContextTitle}>
												<Logo variant="black" size={20} /> Your assistant
											</span>
											<h4>
												{view.value === "read"
													? "Which request has the most support?"
													: "Move keyboard shortcuts to In progress."}
											</h4>
											{view.value === "read" ? (
												<>
													<p>
														Keyboard shortcuts leads with 42 votes. People want
														to navigate boards without reaching for the mouse.
													</p>
													<div className={styles.agentResults}>
														{demoRequests.slice(0, 3).map((item) => (
															<div key={item.id}>
																<span>{item.votes}</span>
																<span>{item.title}</span>
															</div>
														))}
													</div>
												</>
											) : (
												<>
													<p>
														An assistant will be able to update this request
														through remote MCP and keep your public roadmap in
														sync.
													</p>
													<div className={styles.agentUpdate}>
														<Check aria-hidden="true" />
														<span>
															Keyboard shortcuts
															<RequestStatusLabel status="In progress" />
														</span>
													</div>
												</>
											)}
										</>
									)}
								</div>
							</div>
						</Tabs.Panel>
					))}
				</div>
			</div>
			<Tabs.List
				className={styles.agentTabs}
				aria-label="Upcoming developer workflows"
				activateOnFocus
			>
				{views.map((view) => (
					<Tabs.Tab value={view.value} key={view.value}>
						<strong>{view.title}</strong>
						<span>{view.description}</span>
					</Tabs.Tab>
				))}
			</Tabs.List>
		</Tabs.Root>
	);
}
