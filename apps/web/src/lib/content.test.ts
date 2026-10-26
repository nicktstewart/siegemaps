import { describe, expect, it } from 'vitest';
import { floorSchema, calloutSchema } from './schema';
import { defaultSettings, labelText } from './labels';
import { getFloor, maps } from './content';
import { existsSync } from 'node:fs';
import path from 'node:path';

const callout = { id: 'blue-stairs', primaryNames: ['青階段', 'ブルー階段'], shortNames: ['青階', 'ブルー階'], x: 0.3, y: 0.7, reviewStatus: 'draft' as const };
describe('public floor data', () => {
  it('includes the agreed eight maps and twenty-two floors', () => {
    expect(maps.map((map) => map.id)).toEqual(['bank', 'border', 'chalet', 'clubhouse', 'consulate', 'kafe', 'nighthaven-labs', 'skyscraper']);
    expect(maps.reduce((count, map) => count + map.floorIds.length, 0)).toBe(22);
  });
  it('loads each declared floor and its background', () => {
    for (const map of maps) for (const id of map.floorIds) {
      const floor = getFloor(map.id, id)!;
      expect(floor.id).toBe(id);
      expect(existsSync(path.join(process.cwd(), 'public', floor.imagePath))).toBe(true);
    }
  });
  it('does not resolve undeclared maps or path traversal', () => {
    expect(getFloor('../private-docs', '2f')).toBeUndefined();
    expect(getFloor('border', '../2f')).toBeUndefined();
  });
  it('rejects invalid coordinates and blank primary names', () => {
    expect(calloutSchema.safeParse({ ...callout, x: 1.1 }).success).toBe(false);
    expect(calloutSchema.safeParse({ ...callout, primaryNames: [' '] }).success).toBe(false);
  });
  it('rejects duplicate callout IDs in a floor', () => {
    expect(floorSchema.safeParse({ ...getFloor('border', '2f'), callouts: [callout, callout] }).success).toBe(false);
  });
});
describe('display settings', () => {
  it('shows the first primary name by default', () => expect(labelText(callout, defaultSettings)).toBe('青階段'));
  it('can show every name and abbreviation', () => expect(labelText(callout, { showNames: true, firstOnly: false, showShortNames: true })).toBe('青階段/ブルー階段 (青階/ブルー階)'));
  it('supports abbreviation-only and hidden labels', () => {
    expect(labelText(callout, { ...defaultSettings, showNames: false, showShortNames: true })).toBe('(青階/ブルー階)');
    expect(labelText(callout, { ...defaultSettings, showNames: false })).toBe('');
    expect(labelText({ ...callout, shortNames: [] }, { ...defaultSettings, showShortNames: true })).toBe('青階段');
  });
});
