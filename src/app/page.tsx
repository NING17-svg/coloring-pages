import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import HomePage from './[locale]/page';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://butterfly-coloring-pages.com/'
  }
};

// 根页面直接渲染英文内容，不需要语言路径前缀
export default function RootPage() {
  // 设置请求语言为英语(默认语言)
  unstable_setRequestLocale('en');
  
  // 渲染英文版首页
  return <HomePage params={{ locale: 'en' }} />;
}