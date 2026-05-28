import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getSubdomain } from "@/lib/config";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, request) => {
	const { pathname } = request.nextUrl;
	const host = request.headers.get("host") || "";
	const hostname = host.split(":")[0];
	const subdomain = getSubdomain(hostname);

	// Handle subdomain routing
	if (subdomain) {
		// Block dashboard/admin access from subdomains
		if (
			pathname.startsWith("/dashboard") ||
			pathname.startsWith("/login") ||
			pathname.startsWith("/signup")
		) {
			return NextResponse.redirect(new URL("/", request.url));
		}

		// Rewrite subdomain requests to /app/[slug] routes
		if (pathname === "/") {
			return NextResponse.rewrite(new URL(`/app/${subdomain}`, request.url));
		}

		// Handle nested paths (e.g., myapp.roadwiseapp.com/feature-request)
		return NextResponse.rewrite(
			new URL(`/app/${subdomain}${pathname}`, request.url),
		);
	}

	// Main domain: protect dashboard routes
	if (isProtectedRoute(request)) {
		await auth.protect();
	}

	return NextResponse.next();
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
