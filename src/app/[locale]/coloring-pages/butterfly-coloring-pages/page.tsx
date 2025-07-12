import { Metadata } from 'next';
import { LayoutContainer } from '@/components/layout/layout-container';
import Image from 'next/image';
import Link from 'next/link';
import { getCategoryData } from '@/lib/coloring-data';
import { unstable_setRequestLocale } from "next-intl/server";
import { defaultLocale } from '@/config';

// 使用generateMetadata函数动态生成元数据
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  // 根据localePrefix配置处理canonical URL
  const localePath = params.locale === defaultLocale ? '' : `/${params.locale}`;
  const canonicalUrl = `https://butterfly-coloring-pages.com${localePath}/coloring-pages/butterfly-coloring-pages`;

  return {
    title: 'Butterfly Coloring Pages - Free Printable Designs | butterfly-coloring-pages.com',
    description: 'Download beautiful butterfly coloring pages for free. Detailed wing patterns, simple designs for kids, and more. Print and enjoy!',
    keywords: ['butterfly coloring pages', 'printable butterfly designs', 'free butterfly coloring', 'kids butterfly coloring', 'butterflies to color'],
    robots: 'index, follow',
    alternates: {
      canonical: canonicalUrl
    }
  };
}

export default function ButterflyColoringPages({
  params,
}: {
  params: { locale: string };
}) {
  // 设置国际化的区域
  unstable_setRequestLocale(params.locale);

  // 获取蝴蝶分类数据
  const categoryData = getCategoryData('butterfly-coloring-pages');
  const images = categoryData?.images || [];
  
  // 构建结构化数据 - 面包屑导航
  const localePath = params.locale === defaultLocale ? '' : `/${params.locale}`;
  const siteUrl = 'https://butterfly-coloring-pages.com';
  
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': `${siteUrl}${localePath}`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Coloring Pages',
        'item': `${siteUrl}${localePath}/coloring-pages`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Butterfly Coloring Pages',
        'item': `${siteUrl}${localePath}/coloring-pages/butterfly-coloring-pages`
      }
    ]
  };
  
  // 构建结构化数据 - 集合页面
  const collectionData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Butterfly Coloring Pages',
    'description': 'Explore our collection of free printable butterfly coloring pages. Perfect for kids and adults who love these beautiful insects with their delicate wings and patterns.',
    'url': `${siteUrl}${localePath}/coloring-pages/butterfly-coloring-pages`,
    'numberOfItems': images.length,
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': images.map((image, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'url': `${siteUrl}${localePath}/coloring-pages/butterfly-coloring-pages/${image.id}`
      }))
    }
  };

  return (
    <LayoutContainer>
      {/* 添加结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionData) }}
      />
      
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h1 className="text-4xl font-bold mb-4">Butterfly Coloring Pages</h1>
          <p className="text-gray-600 max-w-3xl mb-8">
            Explore our collection of free printable butterfly coloring pages. Perfect for kids and adults who love these beautiful insects with their delicate wings and patterns.
          </p>
          
          {/* Gallery of butterfly coloring pages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {images.map((image, i) => (
              <Link href={`/${params.locale}/coloring-pages/butterfly-coloring-pages/${image.id}`} key={i} className="group">
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="aspect-video bg-gray-100 relative">
                    <Image 
                      src={image.imageUrl} 
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium group-hover:text-primary transition-colors">{image.title}</h3>
                    <p className="text-sm text-gray-500">{image.difficulty} • {image.ageGroup}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">About Butterfly Coloring Pages</h2>
            <div className="prose max-w-none">
              <p>
                Butterflies are among the most beloved insects in the world, known for their vibrant colors and delicate wings. 
                Our butterfly coloring pages capture the intricate details of these beautiful creatures, making them perfect for both kids and adults.
              </p>
              <p>
                Coloring butterflies can help improve fine motor skills in children while providing a relaxing, meditative activity for adults. 
                Our designs range from simple butterfly outlines suitable for young children to complex patterns perfect for experienced colorists.
              </p>
              <p>
                All of our butterfly coloring pages are free to download and print. Simply click on any design to view it in detail, then download it in 
                your preferred format for immediate printing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
}