import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', ...(process.env.VERCEL_ENV === 'preview' ? { disallow: '/' } : { allow: '/' }) }, sitemap: 'https://siegemaps.com/sitemap.xml' };
}
