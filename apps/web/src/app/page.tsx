import Link from 'next/link';
import Image from 'next/image';
import { getFloor, maps } from '@/lib/content';
import { ja, text } from '@/lib/copy';
import { pageMetadata, siteUrl, websiteId } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';

export const metadata = pageMetadata(ja.siteTitle, ja.siteDescription, '/');
export default function Home() {
  return <main id="main" className="home-main">
    <StructuredData data={{ '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebSite', '@id': websiteId, url: siteUrl, name: 'SiegeMaps', inLanguage: 'ja', description: ja.siteDescription },
      { '@type': 'CollectionPage', '@id': `${siteUrl}/#page`, url: siteUrl, name: ja.catalogueTitle, description: ja.siteDescription, inLanguage: 'ja', isPartOf: { '@id': websiteId } },
    ] }} />
    <section aria-labelledby="maps-title" className="map-catalogue"><div className="section-heading"><h1 id="maps-title">{ja.catalogueTitle}</h1><span>{text('mapCount', { count: maps.length })}</span></div>
      <div className="map-grid">{maps.map((map, index) => {
        const floor = getFloor(map.id, map.floorIds[0])!;
        return <Link key={map.id} className="map-entry" href={`/maps/${map.id}/${map.floorIds[0]}`} prefetch={false}><div className="map-thumbnail"><Image src={floor.thumbnailPath} alt="" width={768} height={Math.round(768 * floor.imageHeight / floor.imageWidth)} priority={index === 0} unoptimized /></div><div className="map-entry-copy"><h2>{map.nameJa}</h2><span className="english-map-name" lang="en">{map.nameEn}</span><span className="floor-count">{text('floorCount', { count: map.floorIds.length })}</span><span className="entry-arrow" aria-hidden="true">↗</span></div></Link>;
      })}</div>
    </section>
  </main>;
}
