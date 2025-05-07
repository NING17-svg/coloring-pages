import { Metadata } from 'next';
import { LayoutContainer } from '@/components/layout/layout-container';

export const metadata: Metadata = {
  title: 'Browse Categories - Coloring Pages Hub',
  description: 'Browse our collection of coloring pages organized by categories. Find the perfect coloring sheet for kids and adults.',
};

export default function CategoriesPage() {
  return (
    <LayoutContainer>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h1 className="text-4xl font-bold mb-8">Browse Categories</h1>
          
          {/* Placeholder for categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground/50">
                  Category Image
                </div>
                <div className="p-4">
                  <h3 className="font-medium">Category {i + 1}</h3>
                  <p className="text-sm text-muted-foreground">12 coloring pages</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center text-muted-foreground">
            This is a placeholder. Categories will be loaded from the database in the next phase.
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
} 