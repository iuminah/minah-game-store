/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["minah-game-cms-uppyx.appengine.bfcplatform.vn", "localhost"],
  },
};

module.exports = nextConfig;
