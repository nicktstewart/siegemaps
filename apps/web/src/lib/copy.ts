import copy from '../../content/ja.json';

export const ja = copy;
export function text(key: keyof typeof copy, values: Record<string, string | number> = {}) {
  return copy[key].replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match));
}
