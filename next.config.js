/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["minah-game-cms-uppyx.appengine.bfcplatform.vn", "localhost"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/u,
      issuer: /\.[jt]sx?$/u,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
