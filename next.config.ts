import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack overlay
  experimental: {
    
  },
  images: {
    domains: ['s3.ap-south-1.amazonaws.com'],
  },
};

export default nextConfig;
