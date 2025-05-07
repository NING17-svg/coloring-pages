/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://butterflycoloringpages.com', // 替换为你的实际网址
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
  transform: async (config, path) => {
    // 自定义优先级设置
    if (path === '/') {
      // 首页优先级最高
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }
    
    // 类别页面优先级次高
    if (path.startsWith('/coloring-pages') && !path.includes('/[')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }
    
    // 创建页面
    if (path === '/create') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }
    }
    
    // 默认优先级
    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    }
  },
} 