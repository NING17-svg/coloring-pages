import {Pathnames} from 'next-intl/navigation';

// 支持英语和德语
export const locales = ['en', 'de'] as const;
export const defaultLocale = 'en';

export const languages = [
  {
    code: "en-US",
    lang: "en",
    language: "English"
  },
  {
    code: "de-DE",
    lang: "de",
    language: "Deutsch"
  }
];

// 定义路径名称映射，为多语言支持做准备
export const pathnames = {
  '/': '/',
  '/about': '/about',
  '/create': '/create',
  '/coloring-pages': '/coloring-pages',
  '/coloring-pages/:category': '/coloring-pages/:category',
  '/coloring-pages/:category/:imageId': '/coloring-pages/:category/:imageId',
  '/privacy': '/privacy',
  '/terms': '/terms'
} satisfies Pathnames<typeof locales>;

// 设置为as-needed，允许语言切换但不强制重定向
export const localePrefix = 'as-needed';

export type AppPathnames = keyof typeof pathnames; 