/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hcdqvxzjnkgscvkvplfd.supabase.co",
        pathname: "/storage/v1/object/public/news/**",
      },
    ],
  },
};

export default nextConfig;
