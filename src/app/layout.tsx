import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";

export const metadata: Metadata = {
  title: "Butterfly Coloring Pages - Free Printable Designs | butterflycoloringpages.com",
  description: "Download beautiful butterfly coloring pages for free. Create custom butterfly designs with our AI or browse our curated collection for kids and adults.",
  keywords: ["butterfly coloring pages", "printable coloring sheets", "black and white artwork", "free coloring pages", "AI generated coloring"],
  creator: "Butterfly Coloring Pages",
  publisher: "Butterfly Coloring Pages",
  authors: [{ name: "Butterfly Coloring Pages Team" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://butterflycoloringpages.com",
    title: "Butterfly Coloring Pages - Free Printable Designs | butterflycoloringpages.com",
    description: "Download beautiful butterfly coloring pages for free. Create custom butterfly designs with our AI or browse our collection.",
    siteName: "Butterfly Coloring Pages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Butterfly Coloring Pages - Free Printable Designs | butterflycoloringpages.com",
    description: "Download beautiful butterfly coloring pages for free. Create custom butterfly designs with our AI or browse our collection.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased"
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
