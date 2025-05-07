/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 禁用构建时的ESLint检查
  },
  typescript: {
    ignoreBuildErrors: true, // 禁用构建时的TypeScript类型检查
  },
  // 添加图片优化配置
  images: {
    domains: ['butterfly-coloring-pages.com'],
    // 确保图片加载更可靠
    minimumCacheTTL: 60,
    // 禁用图片优化，使用原始图片
    unoptimized: true
  },
  // 确保静态资源被正确处理
  assetPrefix: '',
  // 提高构建输出的详细程度
  output: 'standalone'
};

module.exports = nextConfig; 