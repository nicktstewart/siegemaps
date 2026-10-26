import type { MetadataRoute } from 'next';
import { maps, getFloor } from '@/lib/content';
import { floorIsIndexable, siteUrl } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }, { url: `${siteUrl}/about` }, ...maps.flatMap((map) => map.floorIds.filter((id) => floorIsIndexable(getFloor(map.id, id)!)).map((id) => ({ url: `${siteUrl}/maps/${map.id}/${id}` })))];
}
