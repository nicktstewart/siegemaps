import type { Metadata } from 'next';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { getFloor, getMap, maps } from '@/lib/content';
import { FloorEditor } from '@/components/floor-editor';
import { ja } from '@/lib/copy';
import type { FloorInput } from '@/lib/schema';

type Props = { searchParams: Promise<{ map?: string; floor?: string }> };
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: ja.editorTitle, robots: { index: false, follow: false } };
export default async function EditorPage({ searchParams }: Props) {
  if (process.env.NODE_ENV !== 'development') notFound();
  const query = await searchParams;
  const map = getMap(query.map ?? '') ?? maps[0];
  const floorId = query.floor && map.floorIds.includes(query.floor) ? query.floor : map.floorIds[0];
  const floor = JSON.parse(readFileSync(path.join(process.cwd(), 'content', 'maps', map.id, `${floorId}.json`), 'utf8')) as FloorInput;
  const mapOptions = maps.map((entry) => ({ id: entry.id, name: entry.nameJa, floors: entry.floorIds.map((id) => ({ id, label: getFloor(entry.id, id)!.label })) }));
  return <main id="main" className="viewer-main"><FloorEditor key={`${map.id}/${floorId}`} initial={floor} maps={mapOptions} /></main>;
}
