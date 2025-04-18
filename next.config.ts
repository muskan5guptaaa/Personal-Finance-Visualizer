import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {

    MONGODB_URI: process.env.MONGODB_URI,

  },
};

export default nextConfig;
