/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://butterfly-coloring-pages.com', // 替换为你的实际网址
  generateRobotsTxt: false,  // 我们已经手动创建了robots.txt
  exclude: [
    '/api/*',
    '/admin/*',
    '/login/*',
    '/404',
    '/500',
  ],
  generateIndexSitemap: false,
  outDir: 'public',
  changefreq: 'daily',
  priority: 0.7,
  // 添加额外的URL到sitemap
  additionalPaths: async (config) => {
    const currentDate = new Date();
    const result = [];
    
    // 添加标签页面到sitemap
    const tags = [
      'stars', 'butterfly', 'detailed', 'monarch', 'creature',
      'fantasy', 'mythical', 'dragon', 'rainbow', 'unicorn'
    ];
    
    for (const tag of tags) {
      result.push({
        loc: `/coloring-pages?tag=${tag}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: currentDate.toISOString(),
      });
    }
    
    return result;
  },
  transform: async (config, path) => {
    // 确保使用当前日期，而不是未来日期
    const currentDate = new Date();
    
    // 自定义优先级设置
    if (path === '/') {
      // 首页优先级最高
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: currentDate.toISOString(),
      }
    }
    
    // 类别页面优先级次高
    if (path.startsWith('/coloring-pages') && !path.includes('/[')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: currentDate.toISOString(),
      }
    }
    
    // 创建页面
    if (path === '/text-to-coloring') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: currentDate.toISOString(),
      }
    }
    
    // 隐私政策和服务条款页面 - 对AdSense审核很重要
    if (path === '/privacy' || path === '/terms') {
      return {
        loc: path,
        changefreq: 'monthly', 
        priority: 0.6,
        lastmod: currentDate.toISOString(),
      }
    }
    
    // 默认优先级
    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.5,
      lastmod: currentDate.toISOString(),
    }
  },
} 