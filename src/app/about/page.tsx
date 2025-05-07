import { Metadata } from 'next';
import { LayoutContainer } from '@/components/layout/layout-container';

export const metadata: Metadata = {
  title: 'About Us - Butterfly Coloring Pages',
  description: 'Learn about Butterfly Coloring Pages, our mission to provide high-quality butterfly coloring pages, and how our platform works.',
};

export default function AboutPage() {
  return (
    <LayoutContainer>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">About Butterfly Coloring Pages</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Welcome to Butterfly Coloring Pages, your go-to destination for high-quality, printable butterfly coloring pages. 
                Our platform combines traditional coloring page curation with cutting-edge AI technology to offer 
                an extensive library of black and white butterfly artwork suitable for all ages.
              </p>
              
              <h2>Our Mission</h2>
              <p>
                We believe in the therapeutic and educational value of coloring. Our mission is to provide 
                accessible, diverse, and high-quality coloring resources that inspire creativity and mindfulness 
                for people of all ages.
              </p>
              
              <h2>How It Works</h2>
              <p>
                Our platform offers two main ways to enjoy coloring pages:
              </p>
              <ul>
                <li>
                  <strong>Browse Coloring Pages:</strong> Explore our curated collection of coloring pages organized 
                  by themes, difficulty levels, and age groups.
                </li>
                <li>
                  <strong>Create Custom Pages:</strong> Use our AI-powered generator to create unique coloring 
                  pages based on your text descriptions. Simply type what you want to see, and our system will 
                  create a black and white line drawing ready for coloring.
                </li>
              </ul>
              
              <h2>Technology</h2>
              <p>
                Butterfly Coloring Pages uses advanced AI image generation technology to create custom butterfly coloring pages. 
                Our system has been specially designed to produce black and white line drawings that are perfect 
                for coloring, with appropriate level of detail and clear outlines.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                Have questions, suggestions, or feedback? We'd love to hear from you! Please visit our 
                <a href="/contact" className="text-primary hover:underline"> contact page</a> to get in touch with our team.
              </p>
            </div>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
} 