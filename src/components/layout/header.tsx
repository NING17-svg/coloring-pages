'use client';

import Link from 'next/link';  // 改回使用Next.js原生Link
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams() as { locale?: string }; // 可选参数
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
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
  
  // 切换语言函数
  const switchLanguage = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    
    // 构造新的URL路径
    let newPath;
    if (pathname === '/' || pathname === `/${currentLocale}`) {
      // 如果是首页，直接跳转到目标语言根路径
      newPath = newLocale === 'en' ? '/' : `/${newLocale}`;
    } else if (pathname?.startsWith(`/${currentLocale}/`)) {
      // 如果当前路径有语言前缀，提取路径部分
      const pathPart = pathname.substring(`/${currentLocale}`.length);
      newPath = newLocale === 'en' ? pathPart : `/${newLocale}${pathPart}`;
    } else if (pathname) {
      // 其他情况（在一个没有语言前缀的路径）
      newPath = newLocale === 'en' ? pathname : `/${newLocale}${pathname}`;
    } else {
      // 默认情况，跳转到新语言的主页
      newPath = newLocale === 'en' ? '/' : `/${newLocale}`;
    }
    
    router.push(newPath);
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
        <Link href={getLocalizedPath('/')} className="font-bold text-xl flex items-center gap-2">
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
          <Link href={getLocalizedPath('/')} className="text-sm font-medium hover:text-primary transition-colors">
            {currentLocale === 'de' ? 'Startseite' : 'Home'}
          </Link>
          <Link href={getLocalizedPath('/coloring-pages')} className="text-sm font-medium hover:text-primary transition-colors">
            {currentLocale === 'de' ? 'Malvorlagen' : 'Coloring Pages'}
          </Link>
          <Link href={getLocalizedPath('/text-to-coloring')} className="text-sm font-medium hover:text-primary transition-colors">
            {currentLocale === 'de' ? 'Erstellen' : 'Create'}
          </Link>
          <Link href={getLocalizedPath('/about')} className="text-sm font-medium hover:text-primary transition-colors">
            {currentLocale === 'de' ? 'Über uns' : 'About'}
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
            {currentLocale}
          </Button>
          
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 bg-background border rounded-md shadow-md z-50 min-w-[120px] overflow-hidden">
              <div 
                className={`px-4 py-2 cursor-pointer hover:bg-accent ${currentLocale === 'en' ? 'bg-accent/50' : ''}`}
                onClick={() => switchLanguage('en')}
              >
                English
              </div>
              <div 
                className={`px-4 py-2 cursor-pointer hover:bg-accent ${currentLocale === 'de' ? 'bg-accent/50' : ''}`}
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