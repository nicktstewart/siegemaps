import { readFileSync } from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import rawMaps from '../../content/maps.json';
import { floorSchema, mapSchema } from './schema';

export const maps = z.array(mapSchema).parse(rawMaps);
if (new Set(maps.map((map) => map.id)).size !== maps.length) throw new Error('Duplicate map ID');

export function getMap(mapId: string) {
  return maps.find((map) => map.id === mapId);
}
export function getFloor(mapId: string, floorId: string) {
  const map = getMap(mapId);
  if (!map || !map.floorIds.includes(floorId)) return undefined;
  const floor = floorSchema.parse(JSON.parse(readFileSync(path.join(process.cwd(), 'content', 'maps', mapId, `${floorId}.json`), 'utf8')));
  if (floor.id !== floorId || floor.mapId !== mapId) throw new Error('Floor identity does not match its path');
  return floor;
}
