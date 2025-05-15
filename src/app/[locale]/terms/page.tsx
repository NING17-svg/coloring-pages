import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LayoutContainer } from '@/components/layout/layout-container';

export const metadata: Metadata = {
  title: 'Terms of Service - Butterfly Coloring Pages',
  description: 'Understand the terms, rules, and limitations of using Butterfly Coloring Pages, as well as your responsibilities when using our website.',
};

export default async function TermsPage() {
  const t = await getTranslations('terms');
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
              
              <h2>{t('websageUsage.title')}</h2>
              <p>
                {t('websageUsage.description')}
              </p>
              <ul>
                <li>{t('websageUsage.item1')}</li>
                <li>{t('websageUsage.item2')}</li>
                <li>{t('websageUsage.item3')}</li>
              </ul>
              
              <h2>{t('userAccounts.title')}</h2>
              <p>
                {t('userAccounts.description')}
              </p>
              <ul>
                <li>{t('userAccounts.item1')}</li>
                <li>{t('userAccounts.item2')}</li>
                <li>{t('userAccounts.item3')}</li>
              </ul>
              <p>
                {t('userAccounts.note')}
              </p>
              
              <h2>{t('intellectualProperty.title')}</h2>
              <p>
                <strong>{t('intellectualProperty.ourContent')}</strong>
              </p>
              <p>
                <strong>{t('intellectualProperty.userContent')}</strong>
              </p>
              <p>
                <strong>{t('intellectualProperty.restrictions.title')}</strong>:
              </p>
              <ul>
                <li>{t('intellectualProperty.restrictions.item1')}</li>
                <li>{t('intellectualProperty.restrictions.item2')}</li>
                <li>{t('intellectualProperty.restrictions.item3')}</li>
              </ul>
              
              <h2>Prohibited Conduct</h2>
              <p>
                When using our website, you may not:
              </p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Post, upload, or transmit any content that is illegal, infringing, threatening, abusive, harassing, defamatory, libelous, obscene, or otherwise objectionable</li>
                <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity</li>
                <li>Interfere with or disrupt the website functionality or servers</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use our services to create content that infringes on the intellectual property rights of others</li>
              </ul>
              
              <h2>Disclaimer</h2>
              <p>
                Our website and services are provided "as is," without any warranties, express or implied. We do not guarantee that:
              </p>
              <ul>
                <li>The service will be uninterrupted, timely, secure, or error-free</li>
                <li>The results will be accurate or reliable</li>
                <li>The quality of the service will meet your expectations</li>
                <li>Any errors or defects will be corrected</li>
              </ul>
              
              <h2>Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Butterfly Coloring Pages and its affiliates, employees, and officers shall not be liable for any direct, indirect, incidental, 
                special, consequential, or punitive damages, including but not limited to loss of profits, data, or cost of purchasing substitute goods or services, 
                whether based on warranty, contract, tort, or any other legal theory.
              </p>
              
              <h2>Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, 
                the content, privacy policies, or practices of any third-party websites. You access any linked websites at your own risk.
              </p>
              
              <h2>Advertising and Ad Services</h2>
              <p>
                We may display third-party advertisements on our website, including Google AdSense ads. These ads may collect and use information about you (not including your name, 
                address, email address, or telephone number) to provide advertisements about goods and services of interest to you. For more information, 
                please refer to our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
              
              <h2>Modifications</h2>
              <p>
                We may modify these Terms from time to time without notice. Your continued use of the website constitutes acceptance of the modified Terms. Please review these Terms regularly to stay informed of any changes.
              </p>
              
              <h2>Termination</h2>
              <p>
                We may, in our sole discretion, terminate or suspend your access to our services without prior notice, for reasons including but not limited to violations of these Terms.
              </p>
              
              <h2>Governing Law</h2>
              <p>
                These Terms are governed by the laws of the United States, without regard to its conflict of law principles.
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