import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const web = path.join(root, 'apps/web');
const maps = JSON.parse(await readFile(path.join(web, 'content/maps.json'), 'utf8'));
const check = process.argv.includes('--check');
let sourceBytes = 0;
let mapBytes = 0;
let thumbnailBytes = 0;

async function variant(source, mapId, floorId, width, quality, suffix = '') {
  const { data, info } = await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer({ resolveWithObject: true });
  const hash = createHash('sha256').update(data).digest('hex').slice(0, 12);
  const url = `/maps/${mapId}/${floorId}${suffix}-${hash}.webp`;
  const target = path.join(web, 'public', url);
  if (check) {
    if (!(await readFile(target)).equals(data)) throw new Error(`Generated image differs: ${url}`);
  } else {
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, data);
  }
  return { url, width: info.width, height: info.height, bytes: data.length };
}

for (const map of maps) for (const floorId of map.floorIds) {
  const dataPath = path.join(web, 'content/maps', map.id, `${floorId}.json`);
  const original = await readFile(dataPath, 'utf8');
  const floor = JSON.parse(original);
  const source = await readFile(path.join(root, 'assets/map-sources', map.id, `${floorId}.jpg`));
  const image = await variant(source, map.id, floorId, 3200, 85);
  const thumbnail = await variant(source, map.id, floorId, 768, 80, '-thumb');
  const updated = { ...floor, imagePath: image.url, imageWidth: image.width, imageHeight: image.height, thumbnailPath: thumbnail.url };
  if (check) {
    if (JSON.stringify(floor) !== JSON.stringify(updated)) throw new Error(`Stale image metadata: ${dataPath}`);
  } else {
    await writeFile(dataPath, JSON.stringify(updated, null, 2) + '\n');
    for (const old of [floor.imagePath, floor.thumbnailPath]) {
      if (old && old !== image.url && old !== thumbnail.url && /^\/maps\/[a-z0-9-]+\/[a-z0-9-]+-[a-f0-9]{12}\.webp$/.test(old)) {
        await unlink(path.join(web, 'public', old)).catch((error) => { if (error.code !== 'ENOENT') throw error; });
      }
    }
  }
  sourceBytes += source.length;
  mapBytes += image.bytes;
  thumbnailBytes += thumbnail.bytes;
}
console.log(JSON.stringify({ mode: check ? 'check' : 'write', sourceBytes, mapBytes, thumbnailBytes, reductionPercent: Number(((1 - mapBytes / sourceBytes) * 100).toFixed(1)) }));
