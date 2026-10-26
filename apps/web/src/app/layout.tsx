import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ja } from '@/lib/copy';
import { SiteNavigation } from '@/components/site-navigation';
import { robotsForPage, siteUrl } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: ja.siteTitle, template: '%s | SiegeMaps' },
  description: ja.siteDescription,
  openGraph: { siteName: 'SiegeMaps', locale: 'ja_JP', type: 'website' },
  twitter: { card: 'summary_large_image' },
  robots: robotsForPage(),
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  icons: {
    icon: [{ url: '/brand/logo.svg', type: 'image/svg+xml', sizes: 'any' }, { url: '/brand/favicon-32.png', type: 'image/png', sizes: '32x32' }],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>
    <a href="#main" className="skip-link">{ja.skipToContent}</a>
    <header className="site-header"><Link className="wordmark" href="/" aria-label={ja.homeLabel}><Image className="brand-mark" src="/brand/logo.svg" width={36} height={36} alt="" priority />SiegeMaps</Link><span className="header-description">{ja.siteSubtitle}</span><SiteNavigation /></header>
    {children}
    <footer className="site-footer"><span>{ja.footerNotice}</span><a href="https://drive.google.com/drive/folders/1nBG6OcSTvI3fCErspyEPWwVwxRiLRj3C" target="_blank" rel="noreferrer">{ja.mapCredit}</a></footer>
  </body></html>;
}
