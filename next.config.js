/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/**.*",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
