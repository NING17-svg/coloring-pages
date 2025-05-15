import { Metadata } from 'next';
import { LayoutContainer } from '@/components/layout/layout-container';

export const metadata: Metadata = {
  title: 'Terms of Service - Butterfly Coloring Pages',
  description: 'Understand the terms, rules, and limitations of using Butterfly Coloring Pages, as well as your responsibilities when using our website.',
};

export default function TermsPage() {
  return (
    <LayoutContainer>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Last Updated: {new Date().toISOString().split('T')[0]}
              </p>
              
              <p>
                Welcome to Butterfly Coloring Pages. By accessing or using our website, you agree to be bound by these Terms of Service ("Terms"). 
                Please read these Terms carefully. If you do not agree to these Terms, please do not use our website.
              </p>
              
              <h2>Website Usage</h2>
              <p>
                Butterfly Coloring Pages provides coloring page download and creation services. You may:
              </p>
              <ul>
                <li>Browse and download coloring page resources we provide</li>
                <li>Use our AI tools to create custom coloring pages</li>
                <li>Print and personally use these coloring pages</li>
              </ul>
              
              <h2>User Accounts</h2>
              <p>
                Some features may require creating a user account. If you create an account, you are responsible for:
              </p>
              <ul>
                <li>Maintaining the security and confidentiality of your account</li>
                <li>All activities that occur under your account</li>
                <li>Keeping your account information up to date</li>
              </ul>
              <p>
                We reserve the right to refuse service, terminate accounts, or remove or edit content at our sole discretion.
              </p>
              
              <h2>Intellectual Property</h2>
              <p>
                <strong>Our Content</strong>: All content on the website, including but not limited to designs, text, graphics, images, coloring page templates, etc. (except for user-generated content), 
                is the property of Butterfly Coloring Pages and its licensors, and is protected by copyright and other intellectual property laws.
              </p>
              <p>
                <strong>User-Generated Content</strong>: For custom coloring pages created using our AI tools, you retain ownership of the content you create. 
                However, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, publish, and display the content you create 
                for the purpose of operating and improving our services.
              </p>
              <p>
                <strong>Usage Restrictions</strong>: You may not:
              </p>
              <ul>
                <li>Copy, modify, or create derivative works of our website content for commercial purposes</li>
                <li>Remove any copyright or other proprietary notices from our website</li>
                <li>Resell, sublicense, or otherwise commercialize our content</li>
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
              
              <h2>Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us through our <a href="/contact" className="text-primary hover:underline">contact page</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
} 