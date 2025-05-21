import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const rootDomain = "roadwiseapp.com";

function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];

  if (url.includes("localhost")) {
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
    if (fullUrlMatch && fullUrlMatch[1]) return fullUrlMatch[1];
    if (hostname.includes(".localhost")) return hostname.split(".")[0];
    return null;
  }

  const rootDomainFormatted = rootDomain.split(":")[0];

  if (hostname.includes("---") && hostname.endsWith(".vercel.app")) {
    const parts = hostname.split("---");
    return parts.length > 0 ? parts[0] : null;
  }

  const isSubdomain =
    hostname !== rootDomainFormatted && hostname !== `www.${rootDomainFormatted}` && hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, "") : null;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      },
    },
  });

  await supabase.auth.getUser();

  return supabaseResponse;
}

export async function middleware(request: NextRequest) {
  const subdomain = extractSubdomain(request);
  const { pathname } = request.nextUrl;

  const supabaseResponse = await updateSession(request);

  if (subdomain) {
    if (pathname.startsWith("/login") || pathname.startsWith("/dashboard")) {
      const url = new URL("/", request.url);
      return NextResponse.redirect(url);
    }

    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`/app/${subdomain}`, request.url));
    }

    if (!pathname.startsWith("/api") && !pathname.startsWith("/_next")) {
      return NextResponse.rewrite(new URL(`/app/${subdomain}${pathname}`, request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!api|_next|[\\w-]+\\.\\w+).*)"],
};
