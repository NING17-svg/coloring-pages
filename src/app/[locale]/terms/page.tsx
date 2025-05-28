import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { LayoutContainer } from '@/components/layout/layout-container';

export async function generateMetadata(props: { params: { locale: string } }): Promise<Metadata> {
  const locale = props.params.locale;
  const t = await getTranslations('terms');

  return {
    title: `Terms of Service - Butterfly Coloring Pages`,
    description: 'Read our terms of service to understand the rules and guidelines for using our coloring pages platform. Learn about user rights, responsibilities, and usage policies.',
    alternates: {
      canonical: `https://butterfly-coloring-pages.com/${locale}/terms`
    }
  };
}

export default async function TermsPage(props: { params: { locale: string } }) {
  const locale = props.params.locale;
  
  // 启用静态渲染
  unstable_setRequestLocale(locale);
  
  const t = await getTranslations('terms');
  
  return (
    <LayoutContainer>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>{t('lastUpdated')}</p>
              
              <h2>{t('sections.acceptance.title')}</h2>
              <p>{t('sections.acceptance.content')}</p>
              
              <h2>{t('sections.services.title')}</h2>
              <p>{t('sections.services.content')}</p>
              
              <h2>{t('sections.userContent.title')}</h2>
              <p>{t('sections.userContent.content')}</p>
              
              <h2>{t('sections.intellectualProperty.title')}</h2>
              <p>{t('sections.intellectualProperty.content')}</p>
              
              <h2>{t('sections.limitations.title')}</h2>
              <p>{t('sections.limitations.content')}</p>
              
              <h2>{t('sections.disclaimer.title')}</h2>
              <p>{t('sections.disclaimer.content')}</p>
              
              <h2>{t('sections.changes.title')}</h2>
              <p>{t('sections.changes.content')}</p>
              
              <h2>{t('sections.contact.title')}</h2>
              <p dangerouslySetInnerHTML={{ __html: t.raw('sections.contact.content') }} />
            </div>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
} 