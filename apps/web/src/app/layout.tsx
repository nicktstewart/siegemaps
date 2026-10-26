import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://siegemaps.com'),
  title: { default: 'SiegeMaps | 日本語R6コールアウトマップ', template: '%s | SiegeMaps' },
  description: 'Rainbow Six Siegeの日本語コールアウトを、マップと一緒に確認する無料のリファレンス。',
  openGraph: { siteName: 'SiegeMaps', locale: 'ja_JP', type: 'website' },
  twitter: { card: 'summary' },
  robots: process.env.VERCEL_ENV === 'preview' ? { index: false, follow: false } : undefined,
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>
    <a href="#main" className="skip-link">本文へ移動</a>
    <header className="site-header"><Link className="wordmark" href="/" aria-label="SiegeMaps ホーム"><span className="brand-symbol" aria-hidden="true">⌖</span>SiegeMaps</Link><span className="header-description">日本語コールアウトマップ</span><span className="development-tag">開発中</span></header>
    {children}
    <footer className="site-footer"><span>非公式のコミュニティプロジェクト。Rainbow Six Siege © Ubisoft.</span><a href="https://drive.google.com/drive/folders/1nBG6OcSTvI3fCErspyEPWwVwxRiLRj3C" target="_blank" rel="noreferrer">Map blueprints by Sternab ↗</a></footer>
  </body></html>;
}
