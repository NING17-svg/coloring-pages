import type { Metadata, Viewport } from "next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import Script from "next/script";
import { locales } from "../../config";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const messages = await getMessages({ locale });
  const siteMessages = (messages as any).site || {};
  
  return {
    title: siteMessages.title || "Butterfly Coloring Pages",
    description: siteMessages.description || "Download beautiful butterfly coloring pages for free.",
    keywords: ["butterfly coloring pages", "printable coloring sheets", "black and white artwork", "free coloring pages", "AI generated coloring"],
    creator: "Butterfly Coloring Pages",
    publisher: "Butterfly Coloring Pages",
    authors: [{ name: "Butterfly Coloring Pages Team" }],
    robots: "index, follow",
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : locale === "de" ? "de_DE" : "en_US",
      url: "https://butterfly-coloring-pages.com",
      title: siteMessages.title || "Butterfly Coloring Pages",
      description: siteMessages.description || "Download beautiful butterfly coloring pages for free.",
      siteName: "Butterfly Coloring Pages",
    },
    twitter: {
      card: "summary_large_image",
      title: siteMessages.title || "Butterfly Coloring Pages",
      description: siteMessages.description || "Download beautiful butterfly coloring pages for free.",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {
  // 验证语言环境
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // 启用静态渲染
  unstable_setRequestLocale(locale);

  // 获取翻译消息
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      {/* Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4194035852162505"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      {/* Google Analytics */}
      <Script 
        async 
        src="https://www.googletagmanager.com/gtag/js?id=G-YYP1EZK0RQ" 
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YYP1EZK0RQ');
        `}
      </Script>
      
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 