 /** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // 禁用构建时的ESLint检查
    },
    typescript: {
      ignoreBuildErrors: true, // 禁用构建时的TypeScript类型检查
    },
    // 优化图片配置
    images: {
      domains: ['butterfly-coloring-pages.com'],
      // 增加缓存时间提高性能
      minimumCacheTTL: 3600,
      // 设置设备像素比优化
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      // 设置图片尺寸优化
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
    },
    // 确保静态资源被正确处理
    assetPrefix: '',
    // 提高构建输出的详细程度
    output: 'standalone'
  };
  
  module.exports = nextConfig;