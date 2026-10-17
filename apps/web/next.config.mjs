/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "fzwocdpenznpkjx9.public.blob.vercel-storage.com",
				pathname: "/news-images/**",
			},
			{
				protocol: "https",
				hostname: "hcdqvxzjnkgscvkvplfd.supabase.co",
				pathname: "/storage/v1/object/public/news/**",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/ingest/static/:path*",
				destination: "https://eu-assets.i.posthog.com/static/:path*",
			},
			{
				source: "/ingest/:path*",
				destination: "https://eu.i.posthog.com/:path*",
			},
		];
	},
	// This is required to support PostHog trailing slash API requests
	skipTrailingSlashRedirect: true,
};

export default nextConfig;
