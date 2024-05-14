/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    images: {
      unoptimized: false,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "ecommerce-api.test",
        },
        {
          protocol: "https",
          hostname: "via.placeholder.com",
        },
        {
          protocol: "https",
          hostname: "xn--*.com",
        },
        {
          protocol: "https",
          hostname: "*pic.in.th",
        },
        {
          protocol: "https",
          hostname: "setting.ihavecpu.com",
        },
        {
          protocol: "https",
          hostname: "media-cdn.bnn.in.th",
        },
        {
          protocol: "https",
          hostname: "ccns-th.com",
        },   
      ],
    },
  };
  module.exports = nextConfig;
  