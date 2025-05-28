import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import HomePage from './[locale]/page';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://butterfly-coloring-pages.com/'
  }
};

export default async function RootPage() {
  // 设置默认语言为英语
  unstable_setRequestLocale('en');
  
  return <HomePage params={{ locale: 'en' }} />;
}