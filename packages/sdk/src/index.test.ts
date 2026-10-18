import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Roadwise } from "./index";

describe("Roadwise SDK", () => {
	it("initializes with default options", () => {
		const client = new Roadwise({ apiKey: "rw_test_key" });
		assert.ok(client);
		assert.equal(typeof client.apps.list, "function");
	});

	it("initializes with custom baseUrl", () => {
		const client = new Roadwise({
			apiKey: "rw_test_key",
			baseUrl: "https://my-selfhosted-roadwise.internal/",
		});
		assert.ok(client);
		assert.equal(typeof client.apps.list, "function");
	});
});
