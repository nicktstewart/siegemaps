import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { getFloor, maps } from './content';

describe('map delivery assets', () => {
  it('preserves source proportions and keeps hashed WebP assets within the transfer budget', async () => {
    for (const map of maps) for (const id of map.floorIds) {
      const floor = getFloor(map.id, id)!;
      const source = await sharp(path.resolve(process.cwd(), '../../assets/map-sources', map.id, `${id}.jpg`)).metadata();
      for (const [url, maxWidth, maxBytes] of [[floor.imagePath, 3200, 200_000], [floor.thumbnailPath, 768, 20_000]] as const) {
        const bytes = await readFile(path.join(process.cwd(), 'public', url));
        const image = await sharp(bytes).metadata();
        expect(image.format).toBe('webp');
        expect(image.width).toBeLessThanOrEqual(maxWidth);
        expect(bytes.length).toBeLessThan(maxBytes);
        expect(image.width! / image.height!).toBeCloseTo(source.width! / source.height!, 3);
        expect(url).toContain(createHash('sha256').update(bytes).digest('hex').slice(0, 12));
        if (url === floor.imagePath) {
          expect(image.width).toBe(floor.imageWidth);
          expect(image.height).toBe(floor.imageHeight);
        }
      }
    }
  });
  it('does not expose the source JPEGs through public routes', async () => {
    const files = await readdir(path.join(process.cwd(), 'public/maps'), { recursive: true });
    expect(files.filter((file) => /\.jpe?g$/i.test(file))).toEqual([]);
  });
});
