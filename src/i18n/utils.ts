import { ui, type Language, type Translation } from './ui';

export type { Language, Translation };

export function getT(lang: Language): Translation {
  return ui[lang];
}

export function localePath(lang: Language, path: string): string {
  const prefix = lang === 'en' ? '' : '/zh';
  return `${prefix}${path}`;
}
