import { Metadata } from 'next';
import { LayoutContainer } from '@/components/layout/layout-container';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Create Coloring Page - Coloring Pages Hub',
  description: 'Generate your own custom coloring page using AI. Type a description and get a unique black and white artwork to download and color.',
};

export default function CreatePage() {
  return (
    <LayoutContainer>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Create Your Own Coloring Page</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Describe what you want to create and our AI will generate a unique coloring page just for you.
            </p>
            
            {/* Input Form */}
            <div className="bg-card rounded-lg p-6 shadow-sm mb-8">
              <form className="space-y-4">
                <div>
                  <label htmlFor="prompt" className="block text-sm font-medium mb-1">
                    Describe what you want to create
                  </label>
                  <textarea
                    id="prompt"
                    className="w-full min-h-[100px] p-3 border rounded-md bg-background"
                    placeholder="E.g. A magical forest with fairies and mushrooms"
                  ></textarea>
                </div>
                <Button type="submit" className="w-full">Generate</Button>
              </form>
            </div>
            
            {/* Result Preview (Placeholder) */}
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div className="aspect-square bg-muted rounded-md flex items-center justify-center text-muted-foreground/50 mb-4">
                Your generated coloring page will appear here
              </div>
              <div className="flex flex-wrap gap-4">
                <Button disabled>Download PNG</Button>
                <Button variant="outline" disabled>Download PDF</Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Note: The actual image generation will be implemented in the next phase.
              </p>
            </div>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
} 