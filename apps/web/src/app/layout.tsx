import type { Metadata } from 'next';
import Link from 'next/link';
import { ja } from '@/lib/copy';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://siegemaps.com'),
  title: { default: ja.siteTitle, template: '%s | SiegeMaps' },
  description: ja.siteDescription,
  openGraph: { siteName: 'SiegeMaps', locale: 'ja_JP', type: 'website' },
  twitter: { card: 'summary' },
  robots: process.env.VERCEL_ENV === 'preview' ? { index: false, follow: false } : undefined,
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>
    <a href="#main" className="skip-link">{ja.skipToContent}</a>
    <header className="site-header"><Link className="wordmark" href="/" aria-label={ja.homeLabel}>SiegeMaps</Link><span className="header-description">{ja.siteSubtitle}</span></header>
    {children}
    <footer className="site-footer"><span>{ja.footerNotice}</span><a href="https://drive.google.com/drive/folders/1nBG6OcSTvI3fCErspyEPWwVwxRiLRj3C" target="_blank" rel="noreferrer">{ja.mapCredit}</a></footer>
  </body></html>;
}
