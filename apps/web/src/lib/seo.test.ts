import { afterEach, describe, expect, it, vi } from 'vitest';
import { floorIsIndexable, pageMetadata, robotsForPage } from './seo';
import { getFloor } from './content';

afterEach(() => vi.unstubAllEnvs());
describe('page metadata', () => {
  it('keeps the title, canonical and social metadata specific to the page', () => {
    const metadata = pageMetadata('このサイトについて', 'マップ名称と報告', '/about');
    expect(metadata.title).toEqual({ absolute: 'このサイトについて | SiegeMaps' });
    expect(metadata.alternates?.canonical).toBe('/about');
    expect(metadata.openGraph).toMatchObject({ title: 'このサイトについて | SiegeMaps', description: 'マップ名称と報告', url: '/about' });
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image', description: 'マップ名称と報告' });
  });
  it('does not duplicate the site name on the home page', () => {
    expect(pageMetadata('SiegeMaps | R6Sマップ名称', '名称', '/').title).toEqual({ absolute: 'SiegeMaps | R6Sマップ名称' });
  });
  it('keeps preview pages noindex even when a child page is indexable', () => {
    vi.stubEnv('VERCEL_ENV', 'preview');
    expect(robotsForPage(true)).toEqual({ index: false, follow: false });
    expect(pageMetadata('名称一覧', '名称', '/maps/border/2f', true).robots).toEqual({ index: false, follow: false });
  });
  it('allows production public pages and retains noindex for empty floors', () => {
    vi.stubEnv('VERCEL_ENV', 'production');
    expect(robotsForPage()).toEqual({ index: true, follow: true });
    expect(robotsForPage(false)).toEqual({ index: false, follow: true });
    const floor = getFloor('border', '2f')!;
    expect(floorIsIndexable(floor)).toBe(false);
    const reviewed = { ...floor, layoutStatus: 'reviewed' as const, callouts: [{ id: 'example', primaryNames: ['例'], shortNames: [], x: 0.5, y: 0.5, reviewStatus: 'reviewed' as const }] };
    expect(floorIsIndexable(reviewed)).toBe(true);
    expect(floorIsIndexable({ ...reviewed, callouts: [{ ...reviewed.callouts[0], reviewStatus: 'draft' }] })).toBe(false);
  });
});
