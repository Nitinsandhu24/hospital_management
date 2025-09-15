/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    backendUrl: "http://localhost:8080",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
