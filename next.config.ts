import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sagardotdev-invoice.s3.us-east-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
