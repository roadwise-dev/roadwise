import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { eq } from "drizzle-orm";
import { createTestDatabase } from "../../tests/database";
import { feature, upvote } from "./schema";
import { recordUpvote } from "./upvotes";

describe("persistent upvotes", () => {
	let fixture: Awaited<ReturnType<typeof createTestDatabase>>;

	beforeEach(async () => {
		fixture = await createTestDatabase();
		await fixture.database.insert(feature).values({
			id: "test-request",
			appId: "roadwise-test-app",
			title: "A request",
			description: "A request used to verify voting.",
			name: "Roadwise",
		});
	});
	afterEach(() => fixture.close());

	it("persists the total and rejects duplicate votes without incrementing", async () => {
		assert.equal(
			await recordUpvote(fixture.database, "voter@example.com", "test-request"),
			true,
		);
		assert.equal(
			await recordUpvote(fixture.database, "voter@example.com", "test-request"),
			false,
		);
		const [request] = await fixture.database.select().from(feature);
		assert.equal(request.upvotes, 1);
		assert.equal((await fixture.database.select().from(upvote)).length, 1);
	});

	it("repairs a stale total using actual vote records", async () => {
		await fixture.database.insert(upvote).values([
			{ email: "old-voter-1@example.com", featureId: "test-request" },
			{ email: "old-voter-2@example.com", featureId: "test-request" },
		]);
		await recordUpvote(
			fixture.database,
			"new-voter@example.com",
			"test-request",
		);
		const [request] = await fixture.database.select().from(feature);
		assert.equal(request.upvotes, 3);
	});

	it("rolls back the vote if updating its total fails", async () => {
		await fixture.client.execute(`
			CREATE TRIGGER reject_test_total BEFORE UPDATE ON feature
			BEGIN SELECT RAISE(ABORT, 'test total failure'); END
		`);
		await assert.rejects(
			recordUpvote(fixture.database, "voter@example.com", "test-request"),
		);
		assert.deepEqual(await fixture.database.select().from(upvote), []);
		const [request] = await fixture.database.select().from(feature);
		assert.equal(request.upvotes, 0);
	});

	it("rejects votes for missing requests without leaving records", async () => {
		await assert.rejects(
			recordUpvote(fixture.database, "voter@example.com", "missing-request"),
		);
		assert.deepEqual(await fixture.database.select().from(upvote), []);
		const [request] = await fixture.database
			.select()
			.from(feature)
			.where(eq(feature.id, "test-request"));
		assert.equal(request.upvotes, 0);
	});
});
