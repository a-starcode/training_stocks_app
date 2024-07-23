/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    SEARCH_API_KEY: process.env.API_KEY1,
  },

  reactStrictMode: true,
  // to add SVG support
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
