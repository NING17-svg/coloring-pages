import createMiddleware from 'next-intl/middleware';
import {pathnames, locales, localePrefix, defaultLocale} from './src/config';
import { NextRequest, NextResponse } from 'next/server';

// 直接使用next-intl提供的中间件，使用as-needed模式
// 这样默认语言(英语)不需要前缀，其他语言(如德语)需要前缀
export default createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix,
  // 可以根据用户浏览器首选项自动检测语言
  localeDetection: true
});

// 匹配规则
export const config = {
  matcher: [
    // 匹配所有路径，除了特定的系统路径
    '/((?!api|_next|_vercel|.*\\..*).*)',
    
    // 匹配所有以en开头的路径（虽然as-needed模式下不应该有这样的路径，但以防万一）
    '/en/:path*',
    
    // 支持德语路径
    '/de/:path*'
  ]
}; 