import { Metadata } from 'next';
import { LayoutContainer } from '@/components/layout/layout-container';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Coloring Pages - Free Printable Designs | butterflycoloringpages.com',
  description: 'Browse our collection of free printable coloring pages organized by themes. Find perfect designs including butterflies, flowers, dragons and unicorns for kids and adults to print and enjoy.',
  keywords: ['coloring pages', 'printable coloring pages', 'butterfly coloring pages', 'flower coloring pages', 'dragon coloring pages', 'unicorn coloring pages'],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://butterflycoloringpages.com/coloring-pages'
  }
};

export default function ColoringPagesPage() {
  const categories = [
    {
      name: 'Butterfly Coloring Pages',
      description: 'Beautiful butterfly designs with detailed wings and patterns',
      image: '/images/coloring/butterfly/0001-butterfly.webp',
      count: 4,
      slug: 'butterfly-coloring-pages'
    },
    {
      name: 'Flower Coloring Pages',
      description: 'Gorgeous floral designs featuring roses, daisies, tulips and more',
      image: '/images/coloring/butterfly/0002-butterfly.webp',
      count: 1,
      slug: 'flower-coloring-pages'
    },
    {
      name: 'Dragon Coloring Pages',
      description: 'Mythical dragon designs with scales, wings and fire-breathing action',
      image: '/images/coloring/butterfly/0003-butterfly.webp',
      count: 1,
      slug: 'dragon-coloring-pages'
    },
    {
      name: 'Unicorn Coloring Pages',
      description: 'Magical unicorn designs with rainbows, stars and enchanted scenes',
      image: '/images/coloring/butterfly/0004-butterfly.webp',
      count: 1,
      slug: 'unicorn-coloring-pages'
    }
  ];

  return (
    <LayoutContainer>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Coloring Pages</h1>
            <p className="text-gray-600">
              Browse our collection of free printable coloring pages organized by themes. 
              We offer a variety of designs for all ages and skill levels.
            </p>
          </div>
          
          {/* Categories grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link href={`/coloring-pages/${category.slug}`} key={index} className="group">
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
                      <span className="text-sm font-medium text-gray-500">{category.count} {category.count === 1 ? 'page' : 'pages'}</span>
                      <span className="text-primary text-sm group-hover:underline">View all</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">About Our Coloring Pages</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  Our coloring pages are designed to provide a relaxing and creative experience for people of all ages. 
                  Each category features carefully crafted black and white designs that are perfect for coloring with 
                  colored pencils, markers, crayons, or even digital tools.
                </p>
                <p>
                  Whether you're looking for simple designs for young children or intricate patterns for adults, 
                  our diverse collection has something for everyone. Coloring is not just fun but also offers numerous 
                  benefits including stress relief, improved focus, and enhanced creativity.
                </p>
                <p>
                  All of our coloring pages are completely free to download and print. We regularly update our 
                  collection with new designs, so be sure to check back often for the latest additions!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
} 