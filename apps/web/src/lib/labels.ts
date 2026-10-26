import type { Callout } from './schema';

export type DisplaySettings = { showNames: boolean; firstOnly: boolean; showShortNames: boolean };
export const defaultSettings: DisplaySettings = { showNames: true, firstOnly: true, showShortNames: false };
export function labelText(callout: Callout, settings: DisplaySettings) {
  const primary = settings.showNames ? (settings.firstOnly ? callout.primaryNames.slice(0, 1) : callout.primaryNames).join('/') : '';
  const short = settings.showShortNames && callout.shortNames.length ? `(${callout.shortNames.join('/')})` : '';
  return [primary, short].filter(Boolean).join(' ');
}
