import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { LayoutContainer } from '@/components/layout/layout-container';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: 'About Us - Butterfly Coloring Pages',
    description: 'Learn about Butterfly Coloring Pages, our mission to provide high-quality butterfly coloring pages, and how our platform works.',
    alternates: {
      canonical: `https://butterfly-coloring-pages.com/${locale}/about`,
      languages: {
        'en': 'https://butterfly-coloring-pages.com/en/about',
        'de': 'https://butterfly-coloring-pages.com/de/about',
      }
    }
  };
}

export default async function AboutPage({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  // 启用静态渲染
  unstable_setRequestLocale(locale);
  
  const t = await getTranslations('about');
  
  return (
    <LayoutContainer>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>
                {t('intro')}
              </p>
              
              <h2>{t('mission.title')}</h2>
              <p>
                {t('mission.description')}
              </p>
              
              <h2>{t('howItWorks.title')}</h2>
              <p>
                {t('howItWorks.description')}
              </p>
              <ul>
                <li>
                  <strong>{t('howItWorks.browse')}</strong>: {t('howItWorks.browseDescription')}
                </li>
                <li>
                  <strong>{t('howItWorks.create')}</strong>: {t('howItWorks.createDescription')}
                </li>
              </ul>
              
              <h2>{t('technology.title')}</h2>
              <p>
                {t('technology.description')}
              </p>
              
              <h2>{t('contact.title')}</h2>
              <p dangerouslySetInnerHTML={{ __html: t.raw('contact.description') }} />
            </div>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
} 