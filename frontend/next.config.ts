import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['cdn-icons-png.flaticon.com', 'images.unsplash.com', 'plus.unsplash.com', 'media.istockphoto.com',],
  },
};

export default nextConfig;
