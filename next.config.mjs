/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        hostname: "**", // Correct hostname for imagebb
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
