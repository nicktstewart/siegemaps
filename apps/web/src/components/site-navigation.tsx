'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ja } from '@/lib/copy';

export function SiteNavigation() {
  const pathname = usePathname();
  return <nav className="site-navigation" aria-label={ja.primaryNavigation}>
    <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>{ja.catalogueTitle}</Link>
    <Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>{ja.aboutNav}</Link>
  </nav>;
}
