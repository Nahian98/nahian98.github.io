import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/constants';
import { Providers } from '@/components/layout';
import { JsonLd } from '@/components/common/JsonLd';

/* Inter, self-hosted at build time by next/font (no runtime Google request). */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

/*
 * Next does NOT auto-prefix manually-configured metadata icon/manifest URLs with
 * basePath, so on a GitHub Pages project site (served from /<repo>) a bare
 * '/favicon.svg' would 404. We prefix them ourselves. OG/Twitter images use the
 * fully-absolute siteConfig.url (which already includes the subpath) so social
 * scrapers fetch a real, reachable image.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const asset = (p: string) => `${base}${p}`;
const ogImageUrl = `${siteConfig.url}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  applicationName: `${siteConfig.name} Portfolio`,
  alternates: { canonical: '/' },
  manifest: asset('/manifest.webmanifest'),
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: `${siteConfig.name} — Portfolio`,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: asset('/favicon.svg'), type: 'image/svg+xml' },
      { url: asset('/favicon-32x32.png'), sizes: '32x32', type: 'image/png' },
      { url: asset('/favicon-16x16.png'), sizes: '16x16', type: 'image/png' },
    ],
    apple: asset('/apple-touch-icon.png'),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0C0C0E' },
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={inter.variable}
    >
      <body className="min-h-screen font-sans antialiased">
        <JsonLd />
        <Providers>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}
