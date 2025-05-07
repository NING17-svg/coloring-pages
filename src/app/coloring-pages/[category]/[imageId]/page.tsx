import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LayoutContainer } from '@/components/layout/layout-container';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, Share2 } from 'lucide-react';
import { getImageData, getCategoryData, getRelatedImages, getAllImagePaths } from '@/lib/coloring-data';

// Generate dynamic metadata
export async function generateMetadata({ 
  params 
}: { 
  params: { category: string; imageId: string } 
}): Promise<Metadata> {
  const image = getImageData(params.category, params.imageId);
  
  if (!image) {
    return {
      title: 'Coloring Page Not Found',
      description: 'The requested coloring page could not be found.'
    };
  }

  return {
    title: `${image.title} | Free Printable Coloring Page | butterflycoloringpages.com`,
    description: image.description,
    keywords: image.tags,
    robots: 'index, follow',
    alternates: {
      canonical: `https://butterflycoloringpages.com/coloring-pages/${params.category}/${params.imageId}`
    }
  };
}

// Pre-generate common paths
export function generateStaticParams() {
  const paths = getAllImagePaths();
  return paths;
}

export default function ColoringImagePage({ 
  params 
}: { 
  params: { category: string; imageId: string } 
}) {
  const image = getImageData(params.category, params.imageId);
  const categoryData = getCategoryData(params.category);
  const relatedImages = getRelatedImages(params.category, params.imageId, 4);
  
  // Return 404 if image or category not found
  if (!image || !categoryData) {
    notFound();
  }

  // Format difficulty display
  const getDifficultyLabel = (difficulty: string) => {
    const labels = {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard'
    };
    return labels[difficulty as keyof typeof labels] || difficulty;
  };

  // Format age group display
  const getAgeGroupLabel = (ageGroup: string) => {
    const labels = {
      children: 'Children',
      teen: 'Teenagers',
      adult: 'Adults',
      all: 'All Ages'
    };
    return labels[ageGroup as keyof typeof labels] || ageGroup;
  };
  
  return (
    <LayoutContainer>
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb navigation */}
          <div className="flex items-center mb-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/coloring-pages" className="text-gray-500 hover:text-primary transition-colors">
              Coloring Pages
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href={`/coloring-pages/${params.category}`} className="text-gray-500 hover:text-primary transition-colors">
              {categoryData.title}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">{image.title}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side image display */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative" style={{ height: '70vh', maxHeight: '600px' }}>
                  <Image 
                    src={image.imageUrl} 
                    alt={image.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                
                {/* Download and share buttons */}
                <div className="p-4 border-t flex justify-between items-center">
                  <Button asChild size="lg" variant="default">
                    <Link href={`/api/download/${params.category}/${params.imageId}`}>
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" title="Share">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right side information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h1 className="text-2xl font-bold mb-2">{image.title}</h1>
                <p className="text-gray-600 mb-4">{image.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Difficulty:</span>
                    <span className="font-medium">{getDifficultyLabel(image.difficulty)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Age Group:</span>
                    <span className="font-medium">{getAgeGroupLabel(image.ageGroup)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Downloads:</span>
                    <span className="font-medium">{image.downloadCount}</span>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {image.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/coloring-pages?tag=${tag}`}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Quick action buttons */}
                <div className="space-y-3">
                  <Button asChild size="lg" className="w-full">
                    <Link href={`/api/download/${params.category}/${params.imageId}`}>
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link href={`/coloring-pages/${params.category}`}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> More {categoryData.title}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related images */}
          {relatedImages.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Coloring Pages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedImages.map((relatedImage, index) => (
                  <Link 
                    href={`/coloring-pages/${params.category}/${relatedImage.id}`} 
                    key={index}
                    className="group"
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                      <div className="aspect-video bg-gray-100 relative">
                        <Image 
                          src={relatedImage.imageUrl} 
                          alt={relatedImage.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium group-hover:text-primary transition-colors">{relatedImage.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{relatedImage.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </LayoutContainer>
  );
} 