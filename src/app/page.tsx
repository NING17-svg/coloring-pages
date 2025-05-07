import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutContainer } from '@/components/layout/layout-container';
import { Button } from '@/components/ui/button';
import { ArrowRight, Paintbrush, Image as ImageIcon, Download, Star, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Butterfly Coloring Pages - Free Printable Designs | butterflycoloringpages.com',
  description: 'Download beautiful butterfly coloring pages for free. Create custom butterfly designs with our AI or browse our curated collection for kids and adults. Print & enjoy!',
  keywords: ['butterfly coloring pages', 'printable coloring sheets', 'free coloring pages', 'butterfly designs', 'kids coloring pages'],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://butterflycoloringpages.com/'
  }
};

export default function Home() {
  return (
    <LayoutContainer>
      {/* 英雄区域 */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Beautiful Butterfly Coloring Pages For Everyone
              </h1>
              <p className="text-lg text-gray-600 md:pr-12">
                Explore our collection of free, high-quality butterfly coloring pages or create your own custom designs with our AI technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/coloring-pages">
                    Browse All Coloring Pages <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/create">
                    Create Your Own <Paintbrush className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="bg-gray-100 rounded-lg aspect-square relative overflow-hidden">
                    <Image 
                      src="/images/coloring/butterfly/0001-butterfly.webp" 
                      alt="Butterfly coloring page design" 
                      className="object-cover"
                      fill
                    />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm mt-8">
                  <div className="bg-gray-100 rounded-lg aspect-square relative overflow-hidden">
                    <Image 
                      src="/images/coloring/butterfly/0002-butterfly.webp" 
                      alt="Butterfly coloring page for kids" 
                      className="object-cover"
                      fill
                    />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="bg-gray-100 rounded-lg aspect-square relative overflow-hidden">
                    <Image 
                      src="/images/coloring/butterfly/0003-butterfly.webp" 
                      alt="Detailed butterfly coloring page" 
                      className="object-cover"
                      fill
                    />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm mt-8">
                  <div className="bg-gray-100 rounded-lg aspect-square relative overflow-hidden">
                    <Image 
                      src="/images/coloring/butterfly/0001-butterfly.webp" 
                      alt="Monarch butterfly coloring page" 
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
            <h2 className="text-3xl font-bold mb-4">Browse Butterfly Coloring Pages by Themes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of butterfly coloring pages organized by themes. Find the perfect butterfly design for any age and interest.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { 
                name: 'Butterfly coloring pages',
                image: '/images/coloring/butterfly/0001-butterfly.webp',
                count: 4
              },
              { 
                name: 'Flower coloring pages',
                image: '/images/coloring/butterfly/0002-butterfly.webp',
                count: 1 
              },
              { 
                name: 'Dragon coloring pages',
                image: '/images/coloring/butterfly/0003-butterfly.webp',
                count: 1
              },
              { 
                name: 'Unicorn coloring pages',
                image: '/images/coloring/butterfly/0004-butterfly.webp',
                count: 1
              }
            ].map((category, index) => (
              <Link href={`/coloring-pages/${category.name.toLowerCase().replace(/\s+/g, '-')}`} key={index} className="group">
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
                    <p className="text-sm text-gray-500">{category.count} coloring {category.count === 1 ? 'page' : 'pages'}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/coloring-pages">
                View All Coloring Pages <ArrowRight className="ml-2 h-4 w-4" />
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
                  <h4 className="font-medium text-sm mb-2">Your Prompt:</h4>
                  <p className="bg-gray-50 p-3 rounded text-sm">
                    &ldquo;A beautiful monarch butterfly with detailed wings in a flower garden&rdquo;
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Generated Image:</h4>
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
              <h2 className="text-3xl font-bold mb-4">Create Your Own Butterfly Coloring Pages</h2>
              <p className="text-gray-600 mb-6">
                Use our AI-powered generator to create unique, custom butterfly coloring pages from your text descriptions. Simply describe the butterfly design you want and watch our system transform your words into beautiful line art ready for coloring.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded mr-3 mt-1">
                    <Paintbrush className="h-4 w-4 text-primary" />
                  </div>
                  <span>Unlimited butterfly design possibilities with simple text prompts</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded mr-3 mt-1">
                    <ImageIcon className="h-4 w-4 text-primary" />
                  </div>
                  <span>High-quality black and white butterfly drawings optimized for coloring</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded mr-3 mt-1">
                    <Download className="h-4 w-4 text-primary" />
                  </div>
                  <span>Instantly download your butterfly creations for printing</span>
                </li>
              </ul>
              <Button asChild size="lg">
                <Link href="/create">
                  Create Butterfly Coloring Page <ArrowRight className="ml-2 h-4 w-4" />
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
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Butterfly Coloring Pages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the benefits that make our butterfly coloring pages the perfect choice for coloring enthusiasts of all ages.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Paintbrush className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Generated Designs</h3>
              <p className="text-gray-600">
                Create custom butterfly coloring pages with our AI technology, transforming your ideas into beautiful line art.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For All Ages</h3>
              <p className="text-gray-600">
                Our butterfly collection includes designs for everyone, from simple patterns for kids to complex butterfly art for adults.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Download className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free to Download</h3>
              <p className="text-gray-600">
                All our butterfly coloring pages are free to download, print, and enjoy. No subscriptions or hidden fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 用户评价 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Butterfly Coloring Fans Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from people who have used our butterfly coloring pages to unlock their creativity and find moments of calm.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Emily Parker",
                role: "Parent",
                comment: "The butterfly coloring pages are amazing! My kids love the detailed wing patterns and how they can customize their own butterfly designs."
              },
              {
                name: "Michael Johnson",
                role: "Art Teacher",
                comment: "I use these butterfly coloring pages in my classroom. The variety of designs keeps my students engaged, and the custom creation tool is perfect for our themed lessons."
              },
              {
                name: "Sarah Thompson",
                role: "Hobbyist",
                comment: "I've always enjoyed coloring butterflies as a way to relax. This platform offers butterfly designs I can't find anywhere else, and the ability to create custom pages is incredible."
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
          <h2 className="text-3xl font-bold mb-6">Ready to Start Coloring Butterflies?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Browse our collection of free butterfly coloring pages or create your own custom butterfly design using our AI generator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/coloring-pages">
                Browse All Coloring Pages <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/create">
                Create Your Own Butterfly <Paintbrush className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
}