'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import enTranslations from '@/i18n/translations/en.json';

// 支持的语言类型
export type Language = 'en';

// 翻译数据类型
type Translations = typeof enTranslations;

// 语言上下文类型
type LanguageContextType = {
  language: Language;
  translations: Translations;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// 创建上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻译映射表，目前只有英文
const translationsMap: Record<Language, Translations> = {
  en: enTranslations,
};

// 根据点分隔的路径从对象中获取值
function getValueByPath(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === undefined || current === null) {
      return path; // 返回路径作为回退值
    }
    if (typeof current === 'object' && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }

  return typeof current === 'string' ? current : path;
}

// 语言提供者组件
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const translations = translationsMap[language];

  // 翻译函数
  const t = (key: string): string => {
    return getValueByPath(translations, key) || key;
  };

  // 设置语言函数
  const setLanguage = (newLanguage: Language) => {
    if (newLanguage !== language) {
      setLanguageState(newLanguage);
    }
  };

  const value = {
    language,
    translations,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// 使用语言上下文的Hook
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 