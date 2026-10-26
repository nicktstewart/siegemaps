import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { maps } from '@/lib/content';
import { ja, text } from '@/lib/copy';

export const metadata: Metadata = { alternates: { canonical: '/' } };
export default function Home() {
  return <main id="main" className="home-main">
    <section aria-labelledby="maps-title" className="map-catalogue"><div className="section-heading"><h1 id="maps-title">{ja.catalogueTitle}</h1><span>{text('mapCount', { count: maps.length })}</span></div>
      <div className="map-grid">{maps.map((map, index) => <Link key={map.id} className="map-entry" href={`/maps/${map.id}/${map.floorIds[0]}`}><div className="map-thumbnail"><Image src={`/maps/${map.id}/${map.floorIds[0]}.jpg`} alt="" width={5000} height={3750} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" priority={index < 3} /></div><div className="map-entry-copy"><h2>{map.nameJa}</h2><span className="english-map-name" lang="en">{map.nameEn}</span><span className="floor-count">{text('floorCount', { count: map.floorIds.length })}</span><span className="entry-arrow" aria-hidden="true">↗</span></div></Link>)}</div>
    </section>
  </main>;
}
