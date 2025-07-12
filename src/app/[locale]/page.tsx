import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { LayoutContainer } from '@/components/layout/layout-container';
import { Button } from '@/components/ui/button';
import { ArrowRight, Paintbrush, Image as ImageIcon, Download, Star, Users } from 'lucide-react';

// 导入JSON数据
import butterflyData from '../../../data/butterfly-coloring-pages.json';
import flowerData from '../../../data/flower-coloring-pages.json';
import dragonData from '../../../data/dragon-coloring-pages.json';
import unicornData from '../../../data/unicorn-coloring-pages.json';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://butterfly-coloring-pages.com/'
  }
};

export default async function Home(props: { params: { locale: string } }) {
  const locale = props.params.locale;
  
  // 启用静态渲染
  unstable_setRequestLocale(locale);
  
  const t = await getTranslations();
  
  // 构建网站结构化数据
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Butterfly Coloring Pages',
    'url': 'https://butterfly-coloring-pages.com',
    'description': 'Free printable butterfly coloring pages and other designs for kids and adults',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://butterfly-coloring-pages.com/coloring-pages?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
  
  // 构建组织结构化数据
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Butterfly Coloring Pages',
    'url': 'https://butterfly-coloring-pages.com',
    'logo': 'https://butterfly-coloring-pages.com/logo.svg',
    'sameAs': [
      'https://www.facebook.com/butterflycoloringpages',
      'https://www.pinterest.com/butterflycoloringpages'
    ]
  };
  
  return (
    <LayoutContainer>
      {/* 添加结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      
      {/* 英雄区域 */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t('home.hero.title')}
              </h1>
              <p className="text-lg text-gray-600 md:pr-12">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href={`/${locale}/coloring-pages`}>
                    {t('home.hero.browseButton')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href={`/${locale}/text-to-coloring`}>
                    {t('home.hero.createButton')} <Paintbrush className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="bg-gray-100 rounded-lg aspect-square relative overflow-hidden">
                    <Image 
                      src="/images/coloring/butterfly/0001-butterfly-coloring-pages.webp" 
                      alt="Butterfly coloring page design" 
                      className="object-cover"
                      fill
                    />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm mt-8">
                  <div className="bg-gray-100 rounded-lg aspect-square relative overflow-hidden">
                    <Image 
                      src="/images/coloring/dragon/0001-dragon-coloring-pages.webp" 
                      alt="A dragon flying in the sky" 
                      className="object-cover"
                      fill
                    />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="bg-gray-100 rounded-lg aspect-square relative overflow-hidden">
                    <Image 
                      src="/images/coloring/unicorn/0002-unicorn-coloring-pages.webp" 
                      alt="A unicorn in a forest" 
                      className="object-cover"
                      fill
                    />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm mt-8">
                  <div className="bg-gray-100 rounded-lg aspect-square relative overflow-hidden">
                    <Image 
                      src="/images/coloring/flower/0001-flower-coloring-pages.webp" 
                      alt="two flowers" 
                      className="object-cover"
                      fill
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 分类展示区 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('home.categories.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.categories.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { 
                name: t('home.categories.butterflyCategory'),
                image: '/images/coloring/butterfly/0001-butterfly-coloring-pages.webp',
                count: butterflyData.count
              },
              { 
                name: t('home.categories.flowerCategory'),
                image: '/images/coloring/flower/0001-flower-coloring-pages.webp',
                count: flowerData.count 
              },
              { 
                name: t('home.categories.dragonCategory'),
                image: '/images/coloring/dragon/0001-dragon-coloring-pages.webp',
                count: dragonData.count
              },
              { 
                name: t('home.categories.unicornCategory'),
                image: '/images/coloring/unicorn/0002-unicorn-coloring-pages.webp',
                count: unicornData.count
              }
            ].map((category, index) => (
              <Link href={`/${locale}/coloring-pages/${category.name.toLowerCase().replace(/\s+/g, '-')}`} key={index} className="group">
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="aspect-video bg-gray-100 relative">
                    <Image 
                      src={category.image} 
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} {category.count === 1 ? t('home.categories.countSuffixSingular') : t('home.categories.countSuffix')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/coloring-pages`}>
                {t('home.categories.viewAll')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 文生图介绍区域 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-6 rounded-xl shadow-sm max-w-md mx-auto lg:mx-0">
                <div className="border-b pb-4 mb-4">
                  <h4 className="font-medium text-sm mb-2">{t('home.create.promptLabel')}</h4>
                  <p className="bg-gray-50 p-3 rounded text-sm">
                    &ldquo;{t('home.create.promptExample')}&rdquo;
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">{t('home.create.generatedImageLabel')}</h4>
                  <div className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden">
                    <Image 
                      src="/ex-txt2img.webp"
                      alt="AI generated butterfly coloring pages example"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-4">{t('home.create.title')}</h2>
              <p className="text-gray-600 mb-6">
                {t('home.create.subtitle')}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded mr-3 mt-1">
                    <Paintbrush className="h-4 w-4 text-primary" />
                  </div>
                  <span>{t('home.create.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded mr-3 mt-1">
                    <ImageIcon className="h-4 w-4 text-primary" />
                  </div>
                  <span>{t('home.create.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded mr-3 mt-1">
                    <Download className="h-4 w-4 text-primary" />
                  </div>
                  <span>{t('home.create.feature3')}</span>
                </li>
              </ul>
              <Button asChild size="lg">
                <Link href={`/${locale}/text-to-coloring`}>
                  {t('home.create.button')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 特点介绍 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('home.features.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Paintbrush className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.features.ai.title')}</h3>
              <p className="text-gray-600">
                {t('home.features.ai.description')}
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.features.variety.title')}</h3>
              <p className="text-gray-600">
                {t('home.features.variety.description')}
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.features.quality.title')}</h3>
              <p className="text-gray-600">
                {t('home.features.quality.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 用户评价 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('home.testimonials.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.testimonials.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: t('home.testimonials.reviews.0.name'),
                role: t('home.testimonials.reviews.0.role'),
                comment: t('home.testimonials.reviews.0.comment')
              },
              {
                name: t('home.testimonials.reviews.1.name'),
                role: t('home.testimonials.reviews.1.role'),
                comment: t('home.testimonials.reviews.1.comment')
              },
              {
                name: t('home.testimonials.reviews.2.name'),
                role: t('home.testimonials.reviews.2.role'),
                comment: t('home.testimonials.reviews.2.comment')
              }
            ].map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 呼吁行动 */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('home.cta.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {t('home.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href={`/${locale}/coloring-pages`}>
                {t('home.cta.browseButton')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/text-to-coloring`}>
                {t('home.cta.createButton')} <Paintbrush className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
} 