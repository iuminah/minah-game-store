// @ts-check
const {i18n} = require("./next-i18next.config.js");

/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n,
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
