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
  '/text-to-coloring': '/text-to-coloring',
  '/coloring-pages': '/coloring-pages',
  '/coloring-pages/:category': '/coloring-pages/:category',
  '/coloring-pages/:category/:imageId': '/coloring-pages/:category/:imageId',
  '/privacy': '/privacy',
  '/terms': '/terms',
  '/contact': '/contact'
} satisfies Pathnames<typeof locales>;

// 将localePrefix设置为'as-needed'，这样英语(默认语言)不会有前缀，只有其他语言会有前缀
export const localePrefix = 'as-needed';

export type AppPathnames = keyof typeof pathnames; 