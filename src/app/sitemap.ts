import { MetadataRoute } from 'next';
import { getLocales } from '../i18n';
import { getAllImagePaths, getCategoryData } from '@/lib/coloring-data';

// 项目中实际使用的标签列表，用于生成标签页面的URL
const tags = [
  'butterfly', 'detailed', 'nature', 'insects', 'simple', 'kids', 'easy',
  'monarch', 'flowers', 'garden', 'cartoon', 'flower', 'unicorn', 'fantasy',
  'magical', 'rainbow', 'stars', 'dragon', 'mythical', 'creature', 'fire',
  'medieval'
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
  
  // 添加所有涂色页面到站点地图
  try {
    const coloringPaths = getAllImagePaths();
    const categories = ['butterfly-coloring-pages', 'dragon-coloring-pages', 'flower-coloring-pages', 'unicorn-coloring-pages'];
    
    // 添加分类页面
    for (const category of categories) {
      const categoryData = getCategoryData(category);
      if (categoryData) {
        for (const locale of locales) {
          const localePath = locale === 'en' ? '' : `/${locale}`;
          entries.push({
            url: `${siteUrl}${localePath}/coloring-pages/${category}`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      }
    }
    
    // 添加单个图像页面
    for (const path of coloringPaths) {
      for (const locale of locales) {
        const localePath = locale === 'en' ? '' : `/${locale}`;
        entries.push({
          url: `${siteUrl}${localePath}/coloring-pages/${path.category}/${path.imageId}`,
          lastModified: currentDate,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  } catch (error) {
    console.error('Error adding coloring pages to sitemap:', error);
  }
  
  return entries;
} 