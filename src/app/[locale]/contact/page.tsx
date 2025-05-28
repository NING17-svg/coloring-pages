import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { LayoutContainer } from '@/components/layout/layout-container';
import { Mail, MapPin, Clock } from 'lucide-react';

export async function generateMetadata(props: { params: { locale: string } }): Promise<Metadata> {
  const locale = props.params.locale;
  const t = await getTranslations('contact');

  return {
    title: `Contact Us - Butterfly Coloring Pages`,
    description: 'Get in touch with us for any questions, feedback, or support regarding our coloring pages. We are here to help you with your coloring journey.',
    alternates: {
      canonical: `https://butterfly-coloring-pages.com/${locale}/contact`
    }
  };
}

export default async function ContactPage(props: { params: { locale: string } }) {
  const locale = props.params.locale;
  
  // 启用静态渲染
  unstable_setRequestLocale(locale);
  
  const t = await getTranslations('contact');
  
  return (
    <LayoutContainer>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
            
            <div className="prose prose-lg max-w-none mb-8">
              <p>{t('description')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('email.title')}</h3>
                <p className="text-gray-600">
                  <a href="mailto:support@butterfly-coloring-pages.com" className="text-primary hover:underline">
                    support@butterfly-coloring-pages.com
                  </a>
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('location.title')}</h3>
                <p className="text-gray-600">{t('location.address')}</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{t('hours.title')}</h3>
                <p className="text-gray-600">{t('hours.time')}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">{t('faq.title')}</h2>
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <h3 className="font-semibold mb-2">{t(`faq.q${i}`)}</h3>
                    <p className="text-gray-600">{t(`faq.a${i}`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
} 