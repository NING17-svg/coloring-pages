import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { LayoutContainer } from '@/components/layout/layout-container';

export const metadata: Metadata = {
  title: 'Privacy Policy - Butterfly Coloring Pages',
  description: 'Learn how Butterfly Coloring Pages collects, uses, and protects your personal information, and your privacy rights when using our services.',
};

export default async function PrivacyPage({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  // 启用静态渲染
  unstable_setRequestLocale(locale);
  
  const t = await getTranslations('privacy');
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <LayoutContainer>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>
                {t('lastUpdated')} {today}
              </p>
              
              <p>
                {t('intro')}
              </p>
              
              <h2>{t('infoCollect.title')}</h2>
              <p>
                <strong>{t('infoCollect.personal')}</strong>:
              </p>
              <ul>
                <li>{t('infoCollect.item1')}</li>
                <li>{t('infoCollect.item2')}</li>
                <li>{t('infoCollect.item3')}</li>
              </ul>
              
              <h2>{t('infoUse.title')}</h2>
              <p>
                {t('infoUse.description')}
              </p>
              <ul>
                <li>{t('infoUse.item1')}</li>
                <li>{t('infoUse.item2')}</li>
                <li>{t('infoUse.item3')}</li>
                <li>{t('infoUse.item4')}</li>
                <li>{t('infoUse.item5')}</li>
              </ul>
              
              <h2>Cookies and Similar Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to collect and store information to improve your browsing experience, 
                understand how you use our website, and analyze website traffic. 
                You can control the use of cookies through your browser settings. Please note that disabling cookies may affect certain features of our website.
              </p>
              
              <h2>Information Sharing and Disclosure</h2>
              <p>
                We do not sell, rent, or trade your personal information to third parties unless:
              </p>
              <ul>
                <li>We have your consent</li>
                <li>We are required to do so by law</li>
                <li>To protect our rights and property</li>
                <li>We share with service providers necessary for providing our services (such as analytics services and advertising partners)</li>
              </ul>

              <h2>Third-Party Services</h2>
              <p>
                Our website may include third-party services, such as Google Analytics and advertising services (like Google AdSense). 
                These third-party services may collect information about you. 
                These services are governed by their respective privacy policies, and we encourage you to review these policies to understand how they handle your information.
              </p>
              
              <h2>Children's Privacy</h2>
              <p>
                Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. 
                If you are a parent or guardian and believe that your child has provided us with personal information, 
                please contact us, and we will take steps to remove such information from our systems.
              </p>
              
              <h2>Your Rights</h2>
              <p>
                Depending on your location and applicable laws, you may have the following rights:
              </p>
              <ul>
                <li>Access to the personal information we hold about you</li>
                <li>Correction of inaccurate or incomplete personal information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction of or objection to processing of your personal information</li>
                <li>Data portability</li>
              </ul>
              <p>
                To exercise these rights, please contact us through our contact page.
              </p>
              
              <h2>Security</h2>
              <p>
                We take reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. 
                However, please note that no internet transmission of data can be guaranteed to be 100% secure.
              </p>
              
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we make significant changes, we will post the updated policy on the website and update the "Last Updated" date. 
                We encourage you to review this policy periodically to stay informed about how we are protecting your information.
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