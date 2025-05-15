import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import HomePage from './[locale]/page';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://butterfly-coloring-pages.com/'
  }
};

export default function RootPage() {
  redirect('/en');
}