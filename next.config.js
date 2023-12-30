/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "connectify-files.s3.amazonaws.com",
        port: "",
        pathname: "/events/**",
      },
    ],
  },
};

module.exports = nextConfig;
