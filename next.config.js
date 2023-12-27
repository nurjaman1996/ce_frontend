/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    minimumCacheTTL: 1500000,
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["cecorp.site", "cecollection.id"],
    },
  },
};

module.exports = nextConfig;
