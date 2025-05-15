import { Metadata } from 'next';
import { LayoutContainer } from '@/components/layout/layout-container';
import Image from 'next/image';
import Link from 'next/link';
import { getCategoryData } from '@/lib/coloring-data';
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: 'Unicorn Coloring Pages - Free Printable Designs | butterfly-coloring-pages.com',
  description: 'Download magical unicorn coloring pages for free. Enchanted designs with rainbows, stars, and fantasy elements for children and adults.',
  keywords: ['unicorn coloring pages', 'printable unicorn designs', 'fantasy coloring sheets', 'magical creature coloring', 'rainbow unicorn coloring'],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://butterfly-coloring-pages.com/coloring-pages/unicorn-coloring-pages'
  }
};

export default function UnicornColoringPages({
  params,
}: {
  params: { locale: string };
}) {
  // 设置国际化的区域
  unstable_setRequestLocale(params.locale);

  // 获取独角兽分类数据
  const categoryData = getCategoryData('unicorn-coloring-pages');
  const images = categoryData?.images || [];
  
  return (
    <LayoutContainer>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h1 className="text-4xl font-bold mb-4">Unicorn Coloring Pages</h1>
          <p className="text-gray-600 max-w-3xl mb-8">
            Explore our collection of free printable unicorn coloring pages. Perfect for kids and adults who love these magical creatures with their flowing manes and mystical horns.
          </p>
          
          {/* Gallery of unicorn coloring pages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {images.length > 0 ? (
              images.map((image, i) => (
                <Link href={`/${params.locale}/coloring-pages/unicorn-coloring-pages/${image.id}`} key={i} className="group">
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
              ))
            ) : (
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm col-span-full p-8 text-center">
                <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                  Coming Soon
                </div>
                <h3 className="font-medium">Unicorn Coloring Pages Coming Soon</h3>
                <p className="text-sm text-gray-500 mt-2">We're working on adding magical unicorn designs to our collection.</p>
              </div>
            )}
          </div>

          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">About Unicorn Coloring Pages</h2>
            <div className="prose max-w-none">
              <p>
                Unicorns have captivated our imagination for centuries, representing magic, wonder, and purity. These mythical 
                creatures with their flowing manes, spiraled horns, and sometimes rainbow-colored features make perfect subjects 
                for coloring pages.
              </p>
              <p>
                Our unicorn coloring pages feature a variety of designs - from cute, cartoonish unicorns that younger children 
                will love to more detailed, majestic creatures that challenge older kids and adults. Many of our designs include 
                magical elements like rainbows, stars, clouds, and flowers to enhance the fantasy theme.
              </p>
              <p>
                Coloring unicorns offers a wonderful opportunity to use bright, vibrant colors and create magical scenes. 
                The combination of the unicorn's body, mane, horn, and surrounding magical elements allows for endless creative 
                possibilities and color combinations.
              </p>
              <p>
                All of our unicorn coloring pages are free to download and print. We regularly update our collection with new 
                magical designs, so check back often for the latest additions to our unicorn gallery!
              </p>
            </div>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
} 