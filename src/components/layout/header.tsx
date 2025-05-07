'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          <Image 
            src="/logo.svg" 
            alt="Butterfly Logo" 
            width={40} 
            height={40}
            className="h-auto"
            priority
          />
          <span>Butterfly Coloring Pages</span>
        </Link>
        
        {/* Main Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            {t('navigation.home')}
          </Link>
          <Link href="/coloring-pages" className="text-sm font-medium hover:text-primary transition-colors">
            {t('navigation.categories')}
          </Link>
          <Link href="/create" className="text-sm font-medium hover:text-primary transition-colors">
            {t('navigation.create')}
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            {t('navigation.about')}
          </Link>
        </nav>
        
        {/* Right Section - Language Toggle (Currently only English) */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" disabled>
            EN
          </Button>
        </div>
      </div>
    </header>
  );
} 