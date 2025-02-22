/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },

  env: {
    API: process.env.API
  }
};

module.exports = nextConfig;
