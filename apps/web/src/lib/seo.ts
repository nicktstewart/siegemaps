import type { Metadata } from 'next';
import type { Floor } from './schema';

export const siteUrl = 'https://www.siegemaps.com';
export const websiteId = `${siteUrl}/#website`;
export function robotsForPage(indexable = true): Metadata['robots'] {
  const preview = process.env.VERCEL_ENV === 'preview';
  return { index: !preview && indexable, follow: !preview };
}
export function floorIsIndexable(floor: Floor) {
  return floor.layoutStatus === 'reviewed' && floor.callouts.length > 0 && floor.callouts.every((callout) => callout.reviewStatus === 'reviewed');
}
export function pageMetadata(title: string, description: string, path: string, indexable = true): Metadata {
  const fullTitle = title.includes('SiegeMaps') ? title : `${title} | SiegeMaps`;
  return {
    title: { absolute: fullTitle }, description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: 'SiegeMaps', locale: 'ja_JP', type: 'website', images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SiegeMaps' }] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: ['/opengraph-image'] },
    robots: robotsForPage(indexable),
  };
}
