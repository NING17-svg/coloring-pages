'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Site Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image 
                src="/logo.svg" 
                alt="Butterfly Logo" 
                width={36} 
                height={36}
                className="h-auto"
              />
              <h3 className="font-bold text-lg">Butterfly Coloring Pages</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Download and create beautiful black and white coloring pages for kids and adults.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link href="/coloring-pages" className="hover:text-primary transition-colors">
                  {t('navigation.categories')}
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:text-primary transition-colors">
                  {t('navigation.create')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  {t('navigation.about')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Questions or feedback? We'd love to hear from you.
            </p>
            <Link 
              href="/contact" 
              className="text-sm hover:text-primary transition-colors"
            >
              {t('footer.contact')}
            </Link>
          </div>
        </div>
        
        {/* Friendly Links */}
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="font-medium mb-3 text-center">Friendly Links</h4>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href=" " title="MagicBox.Tools - AI Tools Directory" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              MagicBox.Tools - AI Tools Directory
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Butterfly Coloring Pages. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
} 