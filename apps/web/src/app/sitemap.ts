import type { MetadataRoute } from 'next';
import { maps, getFloor } from '@/lib/content';
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://siegemaps.com' }, ...maps.flatMap((map) => map.floorIds.filter((id) => { const floor = getFloor(map.id, id)!; return floor.layoutStatus === 'reviewed' && floor.callouts.length > 0 && floor.callouts.every((callout) => callout.reviewStatus === 'reviewed'); }).map((id) => ({ url: `https://siegemaps.com/maps/${map.id}/${id}` })))];
}
