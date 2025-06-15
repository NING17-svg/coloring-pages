import { MetadataRoute } from 'next';
import { getLocales } from '../i18n';

// 常见的标签列表，用于生成标签页面的URL
const tags = [
  'stars', 'butterfly', 'detailed', 'monarch', 'creature',
  'fantasy', 'mythical', 'dragon', 'rainbow', 'unicorn'
];

// 站点的基本URL
const siteUrl = 'https://butterfly-coloring-pages.com';

// 站点地图生成函数
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = getLocales();
  const currentDate = new Date().toISOString();
  
  // 创建站点地图条目数组
  const entries: MetadataRoute.Sitemap = [];
  
  // 为每种语言添加基本路由页面
  for (const locale of locales) {
    const localePath = locale === 'en' ? '' : `/${locale}`;
    
    // 首页 - 最高优先级
    entries.push({
      url: `${siteUrl}${localePath}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    });
    
    // 添加基本页面路由
    const basicPages = [
      { path: '/coloring-pages', priority: 0.8, changeFreq: 'weekly' },
      { path: '/text-to-coloring', priority: 0.7, changeFreq: 'monthly' },
      { path: '/about', priority: 0.6, changeFreq: 'monthly' },
      { path: '/contact', priority: 0.6, changeFreq: 'monthly' },
      { path: '/privacy', priority: 0.6, changeFreq: 'monthly' },
      { path: '/terms', priority: 0.6, changeFreq: 'monthly' },
    ];
    
    for (const page of basicPages) {
      entries.push({
        url: `${siteUrl}${localePath}${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changeFreq as 'weekly' | 'monthly' | 'daily',
        priority: page.priority,
      });
    }
    
    // 添加标签页面
    for (const tag of tags) {
      entries.push({
        url: `${siteUrl}${localePath}/coloring-pages?tag=${tag}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }
  
  // 这里可以添加动态数据，例如从数据库获取的着色页面
  // 示例：如果有API或数据访问方法，可以在这里添加
  /*
  try {
    const coloringPages = await fetchColoringPages();
    for (const page of coloringPages) {
      for (const locale of locales) {
        const localePath = locale === 'en' ? '' : `/${locale}`;
        entries.push({
          url: `${siteUrl}${localePath}/coloring-pages/${page.slug}`,
          lastModified: page.updatedAt || currentDate,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  } catch (error) {
    console.error('Error fetching coloring pages for sitemap:', error);
  }
  */
  
  return entries;
} 