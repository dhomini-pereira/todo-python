/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "build",
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
