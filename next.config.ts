import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'platinumnews.com.ng',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        // Supabase S3 storage — product/media images uploaded via PayloadCMS
        protocol: 'https',
        hostname: 'uxuhqftvkvaujtpsdhkz.storage.supabase.co',
      },
    ],
  },
};

export default withPayload(nextConfig);
