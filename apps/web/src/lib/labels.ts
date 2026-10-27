import type { Callout } from './schema';

export type DisplaySettings = { showNames: boolean; firstOnly: boolean; showShortNames: boolean; showEnglish: boolean };
export const defaultSettings: DisplaySettings = { showNames: true, firstOnly: true, showShortNames: false, showEnglish: false };
export function restoreSettings(saved: unknown): DisplaySettings {
  const settings = { ...defaultSettings };
  if (saved && typeof saved === 'object') {
    for (const key of Object.keys(defaultSettings) as (keyof DisplaySettings)[]) {
      const value = (saved as Record<string, unknown>)[key];
      if (typeof value === 'boolean') settings[key] = value;
    }
  }
  return settings;
}
export function labelText(callout: Callout, settings: DisplaySettings) {
  const primary = settings.showNames ? (settings.firstOnly ? callout.primaryNames.slice(0, 1) : callout.primaryNames).join('/') : '';
  const short = settings.showShortNames && callout.shortNames.length ? `(${callout.shortNames.join('/')})` : '';
  return [primary, short].filter(Boolean).join(' ');
}
