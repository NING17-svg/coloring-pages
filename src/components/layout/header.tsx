'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams() as { locale: string };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // 切换语言函数
  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) return;
    // 如果当前路径包含locale部分，则替换
    if (pathname.startsWith(`/${locale}`)) {
      const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPath);
    } else {
      // 否则直接跳转到新语言的主页
      router.push(`/${newLocale}`);
    }
    setIsDropdownOpen(false);
  };
  
  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="font-bold text-xl flex items-center gap-2">
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
          <Link href={`/${locale}`} className="text-sm font-medium hover:text-primary transition-colors">
            {locale === 'de' ? 'Startseite' : 'Home'}
          </Link>
          {/* 使用带有locale的路径 */}
          <Link href={`/${locale}/coloring-pages`} className="text-sm font-medium hover:text-primary transition-colors">
            {locale === 'de' ? 'Malvorlagen' : 'Coloring Pages'}
          </Link>
          <Link href={`/${locale}/text-to-coloring`} className="text-sm font-medium hover:text-primary transition-colors">
            {locale === 'de' ? 'Erstellen' : 'Create'}
          </Link>
          <Link href={`/${locale}/about`} className="text-sm font-medium hover:text-primary transition-colors">
            {locale === 'de' ? 'Über uns' : 'About'}
          </Link>
        </nav>
        
        {/* 语言切换下拉菜单 */}
        <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="uppercase min-w-[40px]"
          >
            {locale}
          </Button>
          
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 bg-background border rounded-md shadow-md z-50 min-w-[120px] overflow-hidden">
              <div 
                className={`px-4 py-2 cursor-pointer hover:bg-accent ${locale === 'en' ? 'bg-accent/50' : ''}`}
                onClick={() => switchLanguage('en')}
              >
                English
              </div>
              <div 
                className={`px-4 py-2 cursor-pointer hover:bg-accent ${locale === 'de' ? 'bg-accent/50' : ''}`}
                onClick={() => switchLanguage('de')}
              >
                Deutsch
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 