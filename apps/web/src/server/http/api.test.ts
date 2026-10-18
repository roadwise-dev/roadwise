import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { eq } from "drizzle-orm";
import { apiKey, app } from "@/db/schema";
import { hashToken } from "@/lib/api-auth";
import { createTestDatabase } from "../../../tests/database";
import { makeApiHandler } from "./api";
import type { UserProfileLookup } from "./auth-handlers";

const ownerToken = "rw_fixture-owner";
const otherToken = "rw_fixture-other";
const emptyToken = "rw_fixture-empty";

const ownedApps = [
	{
		id: "newer-app",
		name: "Newer app",
		slug: "newer-app",
		domain: "newer.invalid",
		description: "",
		isPublic: false,
		createdAt: "2025-02-01T00:00:00.000Z",
	},
	{
		id: "roadwise-test-app",
		name: "Roadwise",
		slug: "roadwise",
		domain: "demo.invalid",
		description: null,
		isPublic: null,
		createdAt: "2025-01-01T00:00:00.000Z",
	},
];

const otherApps = [
	{
		id: "other-app",
		name: "Other app",
		slug: "other-app",
		domain: "other.invalid",
		description: null,
		isPublic: true,
		createdAt: "2025-03-01T00:00:00.000Z",
	},
];

const mockUserLookup: UserProfileLookup = async (userId: string) => {
	if (userId === "test-owner") {
		return { email: "owner@roadwise.test", name: "Test Owner" };
	}
	if (userId === "error-user") {
		throw new Error("Clerk lookup failed");
	}
	return { email: `${userId}@roadwise.test`, name: null };
};

describe("apps and auth HTTP API", () => {
	let fixture: Awaited<ReturnType<typeof createTestDatabase>>;
	let api: ReturnType<typeof makeApiHandler>;

	function request(token: string) {
		return api.handler(
			new Request("http://roadwise.test/api/v1/apps", {
				headers: { Authorization: `Bearer ${token}` },
			}),
		);
	}

	function requestAuthMe(token?: string) {
		const headers: Record<string, string> = {};
		if (token) headers.Authorization = `Bearer ${token}`;
		return api.handler(
			new Request("http://roadwise.test/api/v1/auth/me", { headers }),
		);
	}

	beforeEach(async () => {
		fixture = await createTestDatabase();
		await fixture.database
			.update(app)
			.set({ createdAt: new Date("2025-01-01T00:00:00Z"), isPublic: null })
			.where(eq(app.id, "roadwise-test-app"));
		await fixture.database.insert(app).values([
			{
				id: "newer-app",
				userId: "test-owner",
				name: "Newer app",
				slug: "newer-app",
				domain: "newer.invalid",
				avatarUrl: "",
				description: "",
				isPublic: false,
				createdAt: new Date("2025-02-01T00:00:00Z"),
			},
			{
				id: "other-app",
				userId: "other-owner",
				name: "Other app",
				slug: "other-app",
				domain: "other.invalid",
				avatarUrl: "",
				createdAt: new Date("2025-03-01T00:00:00Z"),
			},
		]);
		await fixture.database.insert(apiKey).values([
			{
				id: "owner-key",
				userId: "test-owner",
				name: "Owner key",
				keyHash: hashToken(ownerToken),
				hint: "fixture",
			},
			{
				id: "other-key",
				userId: "other-owner",
				name: "Other key",
				keyHash: hashToken(otherToken),
				hint: "fixture",
			},
			{
				id: "empty-key",
				userId: "empty-owner",
				name: "Empty owner key",
				keyHash: hashToken(emptyToken),
				hint: "fixture",
			},
		]);
		api = makeApiHandler(fixture.database, mockUserLookup);
	});

	afterEach(async () => {
		try {
			await api.dispose();
		} finally {
			fixture.close();
		}
	});

	it("returns owned apps in created_at desc order", async () => {
		const response = await request(ownerToken);
		assert.equal(response.status, 200);
		assert.deepEqual(await response.json(), {
			success: true,
			data: ownedApps,
		});
	});

	it("returns an empty list for a user without apps", async () => {
		const response = await request(emptyToken);
		assert.equal(response.status, 200);
		assert.deepEqual(await response.json(), { success: true, data: [] });
	});

	it("returns the authenticated user profile from /api/v1/auth/me", async () => {
		const response = await requestAuthMe(ownerToken);
		assert.equal(response.status, 200);
		assert.deepEqual(await response.json(), {
			email: "owner@roadwise.test",
			name: "Test Owner",
		});
	});

	it("rejects /api/v1/auth/me when unauthenticated", async () => {
		const response = await requestAuthMe();
		assert.equal(response.status, 401);
		assert.deepEqual(await response.json(), {
			_tag: "UnauthorizedError",
			error:
				"Missing or invalid Authorization header. Format must be 'Bearer <token>'",
		});
	});

	it("rejects requests missing the authorization header", async () => {
		const response = await api.handler(
			new Request("http://roadwise.test/api/v1/apps"),
		);
		assert.equal(response.status, 401);
		assert.deepEqual(await response.json(), {
			_tag: "UnauthorizedError",
			error:
				"Missing or invalid Authorization header. Format must be 'Bearer <token>'",
		});
	});

	it("rejects authorization headers that do not use the Bearer scheme", async () => {
		const response = await api.handler(
			new Request("http://roadwise.test/api/v1/apps", {
				headers: { Authorization: `Basic ${ownerToken}` },
			}),
		);
		assert.equal(response.status, 401);
		assert.deepEqual(await response.json(), {
			_tag: "UnauthorizedError",
			error:
				"Missing or invalid Authorization header. Format must be 'Bearer <token>'",
		});
	});

	it("rejects empty Bearer tokens", async () => {
		const response = await api.handler(
			new Request("http://roadwise.test/api/v1/apps", {
				headers: { Authorization: "Bearer " },
			}),
		);
		assert.equal(response.status, 401);
		assert.deepEqual(await response.json(), {
			_tag: "UnauthorizedError",
			error:
				"Missing or invalid Authorization header. Format must be 'Bearer <token>'",
		});
	});

	it("rejects unknown tokens", async () => {
		const response = await request("rw_unknown");
		assert.equal(response.status, 401);
		assert.deepEqual(await response.json(), {
			_tag: "UnauthorizedError",
			error: "Invalid API key",
		});
	});

	it("returns a public 500 error when the key lookup fails", async () => {
		await fixture.client.execute("DROP TABLE api_key");
		const response = await request(ownerToken);
		assert.equal(response.status, 500);
		assert.deepEqual(await response.json(), {
			_tag: "AuthenticationUnavailableError",
			error: "Internal server error during authentication",
		});
	});

	it("returns a public 500 error when listing apps fails", async () => {
		await fixture.client.execute("DROP TABLE app");
		const response = await request(ownerToken);
		assert.equal(response.status, 500);
		assert.deepEqual(await response.json(), { error: "Internal server error" });
	});

	it("allows a valid key when recording its usage fails", async () => {
		await fixture.client.execute(`
			CREATE TRIGGER reject_key_usage BEFORE UPDATE ON api_key
			BEGIN SELECT RAISE(ABORT, 'test usage failure'); END
		`);
		const response = await request(ownerToken);
		assert.equal(response.status, 200);
		assert.deepEqual(await response.json(), { success: true, data: ownedApps });
	});

	it("keeps authenticated users isolated across concurrent requests", async () => {
		const responses = await Promise.all([
			request(ownerToken),
			request(otherToken),
			request(emptyToken),
		]);
		for (const response of responses) assert.equal(response.status, 200);
		const bodies: unknown[] = await Promise.all(
			responses.map((response) => response.json()),
		);
		assert.deepEqual(bodies, [
			{ success: true, data: ownedApps },
			{ success: true, data: otherApps },
			{ success: true, data: [] },
		]);
	});
});
