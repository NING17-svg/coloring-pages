import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { LayoutContainer } from '@/components/layout/layout-container';

export async function generateMetadata(props: { params: { locale: string } }): Promise<Metadata> {
  const locale = props.params.locale;
  const t = await getTranslations('privacy');

  return {
    title: `Privacy Policy - Butterfly Coloring Pages`,
    description: 'Learn about how we collect, use, and protect your personal information. Our privacy policy explains our data practices and your privacy rights.',
    alternates: {
      canonical: `https://butterfly-coloring-pages.com/${locale}/privacy`
    }
  };
}

export default async function PrivacyPage(props: { params: { locale: string } }) {
  const locale = props.params.locale;
  
  // 启用静态渲染
  unstable_setRequestLocale(locale);
  
  const t = await getTranslations('privacy');
  
  return (
    <LayoutContainer>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>{t('lastUpdated')}</p>
              
              <h2>{t('sections.introduction.title')}</h2>
              <p>{t('sections.introduction.content')}</p>
              
              <h2>{t('sections.collection.title')}</h2>
              <p>{t('sections.collection.content')}</p>
              
              <h2>{t('sections.usage.title')}</h2>
              <p>{t('sections.usage.content')}</p>
              
              <h2>{t('sections.cookies.title')}</h2>
              <p>{t('sections.cookies.content')}</p>
              
              <h2>{t('sections.thirdParty.title')}</h2>
              <p>{t('sections.thirdParty.content')}</p>
              
              <h2>{t('sections.security.title')}</h2>
              <p>{t('sections.security.content')}</p>
              
              <h2>{t('sections.rights.title')}</h2>
              <p>{t('sections.rights.content')}</p>
              
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