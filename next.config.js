const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // 禁用构建时的ESLint检查
    },
    typescript: {
      ignoreBuildErrors: true, // 禁用构建时的TypeScript类型检查
    },
    // 环境变量
    env: {
      NEXT_TELEMETRY_DISABLED: '1',
      NEXT_DISABLE_VERSION_CHECK: '1'
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
    output: 'standalone',
    // 添加重写规则，将无前缀路径映射到英语路径
    async rewrites() {
      return {
        beforeFiles: [
          // 首页映射
          {
            source: '/',
            destination: '/en'
          },
          // 关于页面映射
          {
            source: '/about',
            destination: '/en/about'
          },
          // 隐私政策映射
          {
            source: '/privacy',
            destination: '/en/privacy'
          },
          // 服务条款映射
          {
            source: '/terms',
            destination: '/en/terms'
          },
          // 联系页面映射
          {
            source: '/contact',
            destination: '/en/contact'
          },
          // 文本转色页映射
          {
            source: '/text-to-coloring',
            destination: '/en/text-to-coloring'
          },
          // 着色页面映射
          {
            source: '/coloring-pages',
            destination: '/en/coloring-pages'
          },
          // 着色页面分类映射
          {
            source: '/coloring-pages/:category',
            destination: '/en/coloring-pages/:category'
          },
          // 着色页面详情映射
          {
            source: '/coloring-pages/:category/:imageId',
            destination: '/en/coloring-pages/:category/:imageId'
          }
        ]
      };
    }
};
  
module.exports = withNextIntl(nextConfig);