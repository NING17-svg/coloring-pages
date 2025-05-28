'use client';

import Link from 'next/link';  // 改回使用Next.js原生Link
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';

export function Footer() {
  const { locale } = useParams() as { locale?: string };  // 可选参数
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  
  // 判断当前使用的语言
  const currentLocale = locale || 'en';
  
  // 构建链接路径
  const getLocalizedPath = (path: string) => {
    // 如果是默认语言(英文)且不在locale子目录下，不需要前缀
    if (currentLocale === 'en' && !pathname?.startsWith('/en')) {
      return path;
    }
    // 其他语言或在locale子目录下，需要带上语言前缀
    return currentLocale === 'en' ? path : `/${currentLocale}${path}`;
  };
  
  // 根据语言提供对应文本
  const getText = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      'navigation.home': {
        en: 'Home',
        de: 'Startseite'
      },
      'navigation.categories': {
        en: 'Coloring Pages',
        de: 'Malvorlagen'
      },
      'navigation.create': {
        en: 'Create',
        de: 'Erstellen'
      },
      'navigation.about': {
        en: 'About',
        de: 'Über uns'
      },
      'footer.resources': {
        en: 'Resources',
        de: 'Ressourcen'
      },
      'footer.contact': {
        en: 'Contact',
        de: 'Kontakt'
      },
      'footer.terms': {
        en: 'Terms of Service',
        de: 'Nutzungsbedingungen'
      },
      'footer.privacy': {
        en: 'Privacy Policy',
        de: 'Datenschutzrichtlinie'
      },
      'footer.contactText': {
        en: 'Questions or feedback? We\'d love to hear from you.',
        de: 'Fragen oder Feedback? Wir würden uns freuen, von Ihnen zu hören.'
      },
      'footer.friendlyLinks': {
        en: 'Friendly Links',
        de: 'Freundliche Links'
      },
      'footer.copyright': {
        en: 'Butterfly Coloring Pages. All rights reserved.',
        de: 'Schmetterling-Malvorlagen. Alle Rechte vorbehalten.'
      }
    };

    return translations[key]?.[currentLocale] || translations[key]?.['en'] || key;
  };
  
  return (
    <footer className="bg-slate-50 py-12 mt-16">
      <div className="container mx-auto px-4">
        {/* Footer Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h4 className="font-medium mb-4">{getText('footer.about')}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Download and create beautiful black and white coloring pages for kids and adults.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={getLocalizedPath('/')} className="hover:text-primary transition-colors">
                  {getText('navigation.home')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/coloring-pages')} className="hover:text-primary transition-colors">
                  {getText('navigation.categories')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/text-to-coloring')} className="hover:text-primary transition-colors">
                  {getText('navigation.create')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="font-medium mb-4">{getText('footer.resources')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={getLocalizedPath('/about')} className="hover:text-primary transition-colors">
                  {getText('navigation.about')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/terms')} className="hover:text-primary transition-colors">
                  {getText('footer.terms')}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/privacy')} className="hover:text-primary transition-colors">
                  {getText('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-medium mb-4">{getText('footer.contact')}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {getText('footer.contactText')}
            </p>
            <Link 
              href={getLocalizedPath('/contact')} 
              className="text-sm hover:text-primary transition-colors"
            >
              {getText('footer.contact')}
            </Link>
          </div>
        </div>
        
        {/* Friendly Links */}
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="font-medium mb-3 text-center">{getText('footer.friendlyLinks')}</h4>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href=" " title="MagicBox.Tools - AI Tools Directory" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              MagicBox.Tools - AI Tools Directory
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} {getText('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
} 