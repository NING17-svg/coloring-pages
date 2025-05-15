import { Metadata } from 'next';
import { LayoutContainer } from '@/components/layout/layout-container';
import Image from 'next/image';
import Link from 'next/link';
import { getCategoryData } from '@/lib/coloring-data';
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: 'Dragon Coloring Pages - Free Printable Designs | butterfly-coloring-pages.com',
  description: 'Download free dragon coloring pages featuring mythical creatures with detailed scales, wings and more. Perfect for kids and fantasy lovers.',
  keywords: ['dragon coloring pages', 'printable dragon designs', 'fantasy coloring pages', 'dragon drawings to color', 'mythical creature coloring'],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://butterfly-coloring-pages.com/coloring-pages/dragon-coloring-pages'
  }
};

export default function DragonColoringPages({
  params,
}: {
  params: { locale: string };
}) {
  // 设置国际化的区域
  unstable_setRequestLocale(params.locale);

  // 获取龙分类数据
  const categoryData = getCategoryData('dragon-coloring-pages');
  const images = categoryData?.images || [];
  
  return (
    <LayoutContainer>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h1 className="text-4xl font-bold mb-4">Dragon Coloring Pages</h1>
          <p className="text-gray-600 max-w-3xl mb-8">
            Explore our collection of free printable dragon coloring pages. Perfect for kids and adults who love these mythical creatures with their scales, wings, and fire-breathing abilities.
          </p>
          
          {/* Gallery of dragon coloring pages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {images.length > 0 ? (
              images.map((image, i) => (
                <Link href={`/${params.locale}/coloring-pages/dragon-coloring-pages/${image.id}`} key={i} className="group">
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
                <h3 className="font-medium">Dragon Coloring Pages Coming Soon</h3>
                <p className="text-sm text-gray-500 mt-2">We're working on adding epic dragon designs to our collection.</p>
              </div>
            )}
          </div>

          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">About Dragon Coloring Pages</h2>
            <div className="prose max-w-none">
              <p>
                Dragons are legendary creatures that have captured human imagination for centuries. Found in mythologies worldwide, 
                these majestic beasts are perfect subjects for detailed and engaging coloring pages.
              </p>
              <p>
                Our dragon coloring pages feature a variety of styles, from cute cartoon dragons suitable for younger children to 
                intricate, detailed designs that older kids and adults will enjoy. Each page showcases the magnificent features of 
                dragons - powerful wings, armored scales, fierce claws, and sometimes, fire-breathing action.
              </p>
              <p>
                Coloring dragons can be an excellent way to express creativity and explore fantasy worlds. The complex patterns of 
                scales and wings allow for endless color combinations and shading opportunities, making these pages perfect for 
                practicing coloring techniques.
              </p>
              <p>
                All of our dragon coloring pages are free to download and print. Look forward to our expanding collection as we 
                add new and exciting dragon designs regularly!
              </p>
            </div>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
} 