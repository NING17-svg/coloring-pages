import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // 支持的语言
  const supportedLocales = ['en', 'de'];
  
  // 确保是支持的语言
  const validLocale = supportedLocales.includes(locale) ? locale : 'en';
  
  return {
    messages: (await import(`../../messages/${validLocale}.json`)).default
  };
});