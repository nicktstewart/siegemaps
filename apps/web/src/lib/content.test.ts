import { describe, expect, it } from 'vitest';
import { floorSchema, calloutSchema } from './schema';
import { defaultSettings, labelText, restoreSettings } from './labels';
import { getFloor, maps } from './content';
import { existsSync } from 'node:fs';
import path from 'node:path';

const callout = { id: 'blue-stairs', primaryNames: ['青階段', 'ブルー階段'], shortNames: ['青階', 'ブルー階'], x: 0.3, y: 0.7, reviewStatus: 'draft' as const };
describe('public floor data', () => {
  it('includes eleven maps and thirty floors', () => {
    expect(maps.map((map) => map.id)).toEqual(['bank', 'border', 'chalet', 'clubhouse', 'consulate', 'fortress', 'kafe', 'lair', 'nighthaven-labs', 'skyscraper', 'villa']);
    expect(maps.reduce((count, map) => count + map.floorIds.length, 0)).toBe(30);
  });
  it('keeps Lair source attribution separate from the Sternab maps', () => {
    expect(getFloor('border', '2f')?.sourceCredit).toBe('Sternab');
    for (const id of ['2f', '1f', 'b1']) {
      const floor = getFloor('lair', id)!;
      expect(floor.sourceCredit).toBe('R6Callouts / @HardBaguette');
      expect(floor.sourceUrl).toBe(`https://r6callouts.com/maps/lair/${id === 'b1' ? 'b' : id}.png`);
      expect(floor.layoutStatus).toBe('reviewed');
      expect(floor.callouts).toEqual([]);
    }
  });
  it('loads each declared floor and its background', () => {
    for (const map of maps) for (const id of map.floorIds) {
      const floor = getFloor(map.id, id)!;
      expect(floor.id).toBe(id);
      expect(existsSync(path.join(process.cwd(), 'public', floor.imagePath))).toBe(true);
    }
  });
  it('provides sourced English labels on all thirty floors', () => {
    let count = 0;
    for (const map of maps) for (const id of map.floorIds) {
      const floor = getFloor(map.id, id)!;
      if (['villa', 'fortress'].includes(map.id)) {
        expect(floor.layoutStatus).toBe('unverified');
        expect(floor.callouts).toEqual([]);
        expect(floor.sourceCredit).toBe(map.id === 'villa' && id !== 'b1' ? 'Sternab' : 'Stratbook');
      }
      expect(floor.englishCallouts.length).toBeGreaterThan(0);
      expect(new Set(floor.englishCallouts.map((item) => item.id)).size).toBe(floor.englishCallouts.length);
      for (const callout of floor.englishCallouts) {
        expect(callout.reviewStatus).toBe('draft');
        expect(new URL(callout.sourceUrl).hostname).toBe(map.id === 'lair' ? 'r6callouts.com' : 'www.r6calls.com');
      }
      count += floor.englishCallouts.length;
    }
    expect(count).toBe(422);
  });
  it('rejects duplicate English IDs, invalid coordinates and missing provenance', () => {
    const floor = getFloor('bank', '2f')!;
    const callout = floor.englishCallouts[0];
    expect(floorSchema.safeParse({ ...floor, englishCallouts: [callout, callout] }).success).toBe(false);
    expect(floorSchema.safeParse({ ...floor, englishCallouts: [{ ...callout, y: -0.1 }] }).success).toBe(false);
    expect(floorSchema.safeParse({ ...floor, englishCallouts: [{ ...callout, sourceUrl: '' }] }).success).toBe(false);
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
  it('keeps English off by default and migrates existing saved settings', () => {
    expect(defaultSettings.showEnglish).toBe(false);
    expect(restoreSettings({ showNames: false, firstOnly: false, showShortNames: true })).toEqual({ showNames: false, firstOnly: false, showShortNames: true, showEnglish: false });
    expect(restoreSettings({ showEnglish: true })).toEqual({ ...defaultSettings, showEnglish: true });
    expect(restoreSettings({ showEnglish: 'true' })).toEqual(defaultSettings);
    expect(restoreSettings(null)).toEqual(defaultSettings);
  });
  it('shows the first primary name by default', () => expect(labelText(callout, defaultSettings)).toBe('青階段'));
  it('can show every name and abbreviation', () => expect(labelText(callout, { ...defaultSettings, showNames: true, firstOnly: false, showShortNames: true })).toBe('青階段/ブルー階段 (青階/ブルー階)'));
  it('supports abbreviation-only and hidden labels', () => {
    expect(labelText(callout, { ...defaultSettings, showNames: false, showShortNames: true })).toBe('(青階/ブルー階)');
    expect(labelText(callout, { ...defaultSettings, showNames: false })).toBe('');
    expect(labelText({ ...callout, shortNames: [] }, { ...defaultSettings, showShortNames: true })).toBe('青階段');
  });
});
