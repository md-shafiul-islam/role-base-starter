/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.altqart.com",
        pathname: "**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    return config;
  },

  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"]
  }
};

export default nextConfig;
