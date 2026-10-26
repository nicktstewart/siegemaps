import type { Metadata } from 'next';
import Link from 'next/link';
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
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>
    <a href="#main" className="skip-link">{ja.skipToContent}</a>
    <header className="site-header"><Link className="wordmark" href="/" aria-label={ja.homeLabel}>SiegeMaps</Link><span className="header-description">{ja.siteSubtitle}</span><SiteNavigation /></header>
    {children}
    <footer className="site-footer"><span>{ja.footerNotice}</span><a href="https://drive.google.com/drive/folders/1nBG6OcSTvI3fCErspyEPWwVwxRiLRj3C" target="_blank" rel="noreferrer">{ja.mapCredit}</a></footer>
  </body></html>;
}
