/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: { styledComponents: true },
  transpilePackages: ["@repo/ui"],
  experimental: {
    htmlLimitedBots: /.*/,
  },
};

export default nextConfig;
