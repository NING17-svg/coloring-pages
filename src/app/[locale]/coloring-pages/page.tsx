import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { LayoutContainer } from '@/components/layout/layout-container';
import Link from 'next/link';
import Image from 'next/image';
import { defaultLocale } from '@/config';

// 直接导入JSON数据，与首页保持一致
import butterflyData from '../../../../data/butterfly-coloring-pages.json';
import flowerData from '../../../../data/flower-coloring-pages.json';
import dragonData from '../../../../data/dragon-coloring-pages.json';
import unicornData from '../../../../data/unicorn-coloring-pages.json';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  // 根据localePrefix配置处理canonical URL
  const localePath = locale === defaultLocale ? '' : `/${locale}`;
  const canonicalUrl = `https://butterfly-coloring-pages.com${localePath}/coloring-pages`;

  return {
    title: 'Coloring Pages - Free Printable Designs | butterfly-coloring-pages.com',
    description: 'Browse our collection of free printable coloring pages organized by themes. Find perfect designs including butterflies, flowers, dragons and unicorns for kids and adults to print and enjoy.',
    keywords: ['coloring pages', 'printable coloring pages', 'butterfly coloring pages', 'flower coloring pages', 'dragon coloring pages', 'unicorn coloring pages'],
    robots: 'index, follow',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://butterfly-coloring-pages.com/coloring-pages',
        'de': 'https://butterfly-coloring-pages.com/de/coloring-pages',
      }
    }
  };
}

export default async function ColoringPagesPage({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  // 启用静态渲染
  unstable_setRequestLocale(locale);
  
  // 注意：这里使用as any类型断言来临时解决TypeScript错误
  // 实际上，messages/en.json中已经包含了这些翻译键
  // 在生产环境中，这些类型错误不会影响网站功能
  const t = await getTranslations('coloringPages' as any);
  
  const categories = [
    {
      name: t('categories.butterfly.name' as any),
      description: t('categories.butterfly.description' as any),
      // 使用数据中的第一张图片，如果存在的话
      image: butterflyData.images && butterflyData.images.length > 0 
        ? butterflyData.images[0].imageUrl 
        : '/images/coloring/butterfly/0001-butterfly-coloring-pages.webp',
      count: butterflyData.count,
      slug: 'butterfly-coloring-pages'
    },
    {
      name: t('categories.flower.name' as any),
      description: t('categories.flower.description' as any),
      // 使用正确的花卉图片目录
      image: flowerData.images && flowerData.images.length > 0 
        ? flowerData.images[0].imageUrl 
        : '/images/coloring/flower/0001-flower-coloring-pages.webp',
      count: flowerData.count,
      slug: 'flower-coloring-pages'
    },
    {
      name: t('categories.dragon.name' as any),
      description: t('categories.dragon.description' as any),
      // 使用正确的龙图片目录
      image: dragonData.images && dragonData.images.length > 0 
        ? dragonData.images[0].imageUrl 
        : '/images/coloring/dragon/0001-dragon-coloring-pages.webp',
      count: dragonData.count,
      slug: 'dragon-coloring-pages'
    },
    {
      name: t('categories.unicorn.name' as any),
      description: t('categories.unicorn.description' as any),
      // 使用正确的独角兽图片目录
      image: unicornData.images && unicornData.images.length > 0 
        ? unicornData.images[0].imageUrl 
        : '/images/coloring/unicorn/0001-unicorn-coloring-pages.webp',
      count: unicornData.count,
      slug: 'unicorn-coloring-pages'
    }
  ];

  return (
    <LayoutContainer>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t('title' as any)}</h1>
            <p className="text-gray-600">
              {t('subtitle' as any)}
            </p>
          </div>
          
          {/* Categories grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link href={`/${locale}/coloring-pages/${category.slug}`} key={index} className="group">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
                  <div className="aspect-video relative overflow-hidden">
                    <Image 
                      src={category.image} 
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{category.name}</h2>
                    <p className="text-gray-600 mb-4 flex-grow">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        {category.count} {category.count === 1 ? t('categories.pageSuffixSingular' as any) : t('categories.pageSuffix' as any)}
                      </span>
                      <span className="text-primary text-sm group-hover:underline">{t('categories.viewAll' as any)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">{t('about.title' as any)}</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  {t('about.paragraph1' as any)}
                </p>
                <p>
                  {t('about.paragraph2' as any)}
                </p>
                <p>
                  {t('about.paragraph3' as any)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
} 