import createMiddleware from 'next-intl/middleware';
import {pathnames, locales, localePrefix, defaultLocale} from './src/config';

export default createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix,
  // 启用自动语言检测，如果没有指定语言，将使用defaultLocale
  localeDetection: true
});

// 匹配规则
export const config = {
  matcher: [
    // 根路径
    '/',
    
    // 支持多语言（英文和德文）
    '/(en|de)/:path*',
    
    // 明确匹配详情页路由 - 这会被中间件处理并重定向到带有语言前缀的URL
    '/coloring-pages/:path*',
    
    // 资源和API路径除外
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
}; 