import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'images.unsplash.com'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '/src',
      '@components': '/src/app/_components',
      '@assets': '/public/assets',
    };
    return config;
  },
};

export default nextConfig;