//next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['s3.ap-south-1.amazonaws.com'], // ✅ S3 image domains if using <Image />
  },
  experimental: {
    // any specific experimental flags if needed
  },
};

export default nextConfig;
