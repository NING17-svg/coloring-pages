/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 禁用构建时的ESLint检查
  },
  typescript: {
    ignoreBuildErrors: true, // 禁用构建时的TypeScript类型检查
  }
};

module.exports = nextConfig; 