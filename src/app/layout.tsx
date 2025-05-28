import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://butterfly-coloring-pages.com'),
  title: 'Butterfly Coloring Pages',
  description: 'Download beautiful butterfly coloring pages for free.',
  keywords: ['butterfly coloring pages', 'printable coloring sheets', 'black and white artwork', 'free coloring pages', 'AI generated coloring'],
  creator: 'Butterfly Coloring Pages',
  publisher: 'Butterfly Coloring Pages',
  authors: [{ name: 'Butterfly Coloring Pages Team' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://butterfly-coloring-pages.com'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
} 