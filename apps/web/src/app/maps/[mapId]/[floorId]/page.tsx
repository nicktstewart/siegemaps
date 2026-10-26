import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFloor, getMap, maps } from '@/lib/content';
import { MapViewer } from '@/components/map-viewer';

type Props = { params: Promise<{ mapId: string; floorId: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return maps.flatMap((map) => map.floorIds.map((floorId) => ({ mapId: map.id, floorId }))); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mapId, floorId } = await params;
  const map = getMap(mapId); const floor = getFloor(mapId, floorId);
  if (!map || !floor) return {};
  return { title: `${map.nameJa} ${floor.label} コールアウト`, description: `${map.nameJa}・${floor.label}のマップと日本語コールアウト。`, alternates: { canonical: `/maps/${mapId}/${floorId}` }, robots: floor.layoutStatus !== 'reviewed' || !floor.callouts.length || floor.callouts.some((item) => item.reviewStatus !== 'reviewed') ? { index: false, follow: true } : undefined };
}
export default async function FloorPage({ params }: Props) {
  const { mapId, floorId } = await params;
  const map = getMap(mapId); const floor = getFloor(mapId, floorId);
  if (!map || !floor) notFound();
  return <main id="main" className="viewer-main">
    <div className="viewer-heading"><div><Link className="back-link" href="/">マップ一覧</Link><h1>{map.nameJa}<span>{map.nameEn}</span></h1></div><nav className="floor-switcher" aria-label="フロア">{map.floorIds.map((id) => <Link key={id} href={`/maps/${mapId}/${id}`} aria-current={id === floorId ? 'page' : undefined}>{getFloor(mapId, id)!.label}</Link>)}</nav></div>
    <MapViewer key={`${mapId}/${floorId}`} floor={floor} mapName={map.nameJa} />
    <section className="callout-index" aria-labelledby="callouts-title"><h2 id="callouts-title">{map.nameJa} {floor.label}の呼称一覧</h2>{floor.callouts.length ? <ul>{floor.callouts.map((callout) => <li key={callout.id}><strong>{callout.primaryNames.join(' / ')}</strong>{callout.shortNames.length > 0 && <span>略称: {callout.shortNames.join(' / ')}</span>}<span>{callout.reviewStatus === 'reviewed' ? '確認済み' : '未確認'}</span></li>)}</ul> : <p>呼称データは準備中です。現在は背景マップを閲覧できます。</p>}</section>
  </main>;
}
