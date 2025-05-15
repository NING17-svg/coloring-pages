import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// 定义支持的语言
const locales = ['en', 'de'];

export default getRequestConfig(async ({ locale }) => {
  // 验证请求的语言是否在支持列表中
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});

export function getLocales() {
  return locales;
} 