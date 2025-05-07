import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coloring Pages Hub - Free Printable Coloring Pages",
  description: "Download beautiful black and white coloring pages for free. Create custom coloring sheets with AI or browse our curated collection for kids and adults.",
  keywords: ["coloring pages", "printable coloring sheets", "black and white artwork", "free coloring pages", "AI generated coloring"],
  creator: "Coloring Pages Hub",
  publisher: "Coloring Pages Hub",
  authors: [{ name: "Coloring Pages Hub Team" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coloring-pages-hub.com",
    title: "Coloring Pages Hub - Free Printable Coloring Pages",
    description: "Download beautiful black and white coloring pages for free. Create custom coloring sheets with AI or browse our collection.",
    siteName: "Coloring Pages Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coloring Pages Hub - Free Printable Coloring Pages",
    description: "Download beautiful black and white coloring pages for free. Create custom coloring sheets with AI or browse our collection.",
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
