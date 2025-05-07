import { Metadata } from 'next';
import { LayoutContainer } from '@/components/layout/layout-container';
import Image from 'next/image';
import Link from 'next/link';
import { getCategoryData } from '@/lib/coloring-data';

export const metadata: Metadata = {
  title: 'Flower Coloring Pages - Free Printable Designs | butterflycoloringpages.com',
  description: 'Download beautiful flower coloring pages for free. Printable floral designs for kids and adults featuring roses, daisies, tulips and more.',
  keywords: ['flower coloring pages', 'printable flower designs', 'floral coloring sheets', 'rose coloring pages', 'adult flower coloring'],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://butterflycoloringpages.com/coloring-pages/flower-coloring-pages'
  }
};

export default function FlowerColoringPages() {
  // 获取花朵分类数据
  const categoryData = getCategoryData('flower-coloring-pages');
  const images = categoryData?.images || [];
  
  return (
    <LayoutContainer>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h1 className="text-4xl font-bold mb-4">Flower Coloring Pages</h1>
          <p className="text-gray-600 max-w-3xl mb-8">
            Explore our collection of free printable flower coloring pages. Perfect for nature lovers of all ages, featuring roses, daisies, tulips, and many more beautiful blooms.
          </p>
          
          {/* Gallery of flower coloring pages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {images.length > 0 ? (
              images.map((image, i) => (
                <Link href={`/coloring-pages/flower-coloring-pages/${image.id}`} key={i} className="group">
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
                <h3 className="font-medium">Flower Coloring Pages Coming Soon</h3>
                <p className="text-sm text-gray-500 mt-2">We're working on adding beautiful flower designs to our collection.</p>
              </div>
            )}
          </div>

          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">About Flower Coloring Pages</h2>
            <div className="prose max-w-none">
              <p>
                Flowers are one of nature's most beautiful creations, offering endless variety in shapes, patterns, and arrangements. 
                Our flower coloring pages capture these intricate details, from delicate petals to lush bouquets.
              </p>
              <p>
                Coloring flower designs can be a wonderful way to connect with nature and appreciate the beauty of botanical forms. 
                These pages are perfect for garden enthusiasts, nature lovers, or anyone looking for a calming artistic activity.
              </p>
              <p>
                Whether you prefer roses, daisies, tulips, or wildflower meadows, our collection offers something for every flower lover. 
                All pages are free to download and print in high quality for immediate use.
              </p>
              <p>
                Stay tuned as we continue to expand our flower coloring page collection with new designs regularly!
              </p>
            </div>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
} 