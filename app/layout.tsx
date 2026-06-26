import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import SplashLoader from '@/components/SplashLoader';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nexaro.vercel.app'),
  title: 'Nexaro — Advanced AI Data Automation Platform',
  description:
    'Deploy custom enterprise agents and automate complex workflows. Scale your intelligence with Nexaro — the next-generation AI-driven data automation platform.',
  keywords: ['AI automation', 'enterprise agents', 'data automation', 'neural ops', 'AI platform', 'Nexaro'],
  authors: [{ name: 'Nexaro' }],
  creator: 'Nexaro',
  publisher: 'Nexaro',
  openGraph: {
    title: 'Nexaro — Advanced AI Data Automation Platform',
    description: 'Deploy custom enterprise agents and automate complex workflows. Scale your intelligence with Nexaro.',
    type: 'website',
    url: 'https://nexaro.vercel.app',
    siteName: 'Nexaro',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Nexaro — AI Data Automation Platform' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexaro — Advanced AI Data Automation Platform',
    description: 'Deploy custom enterprise agents and automate complex workflows.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://nexaro.vercel.app' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#172B36',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Nexaro',
  description: 'Advanced AI Data Automation Platform for deploying custom enterprise agents.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '29', priceCurrency: 'USD' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SplashLoader />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
