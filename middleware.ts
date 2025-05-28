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
    // 匹配所有路径
    '/((?!api|_next|_vercel|.*\\..*).*)',
    
    // 支持德语路径
    '/de/:path*'
  ]
}; 