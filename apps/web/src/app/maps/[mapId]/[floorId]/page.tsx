import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFloor, getMap, maps } from '@/lib/content';
import { MapViewer } from '@/components/map-viewer';
import { ja, text } from '@/lib/copy';
import { floorIsIndexable, pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ mapId: string; floorId: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return maps.flatMap((map) => map.floorIds.map((floorId) => ({ mapId: map.id, floorId }))); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mapId, floorId } = await params;
  const map = getMap(mapId); const floor = getFloor(mapId, floorId);
  if (!map || !floor) return {};
  return pageMetadata(text('floorPageTitle', { map: map.nameJa, floor: floor.label }), text('floorDescription', { map: map.nameJa, floor: floor.label }), `/maps/${mapId}/${floorId}`, floorIsIndexable(floor));
}
export default async function FloorPage({ params }: Props) {
  const { mapId, floorId } = await params;
  const map = getMap(mapId); const floor = getFloor(mapId, floorId);
  if (!map || !floor) notFound();
  return <main id="main" className="viewer-main">
    <div className="viewer-heading"><div><Link className="back-link" href="/">{ja.catalogueTitle}</Link><h1>{map.nameJa}<span lang="en">{map.nameEn}</span></h1></div><nav className="floor-switcher" aria-label={ja.floorNavigation}>{map.floorIds.map((id) => <Link key={id} href={`/maps/${mapId}/${id}`} aria-current={id === floorId ? 'page' : undefined}>{getFloor(mapId, id)!.label}</Link>)}</nav></div>
    <MapViewer key={`${mapId}/${floorId}`} floor={floor} mapName={map.nameJa} />
    <section className="callout-index" aria-labelledby="callouts-title"><h2 id="callouts-title">{text('calloutList', { map: map.nameJa, floor: floor.label })}</h2>{floor.callouts.length ? <ul>{floor.callouts.map((callout) => <li key={callout.id}><strong>{callout.primaryNames.join(' / ')}</strong>{callout.shortNames.length > 0 && <span>{text('shortNames', { names: callout.shortNames.join(' / ') })}</span>}</li>)}</ul> : <p>{ja.emptyCallouts}</p>}</section>
  </main>;
}
