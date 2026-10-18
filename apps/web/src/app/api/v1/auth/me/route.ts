import { db } from "@/db/db";
import { makeApiHandler } from "@/server/http/api";

const { handler } = makeApiHandler(db);

export const runtime = "nodejs";

export function GET(request: Request) {
	return handler(request);
}
