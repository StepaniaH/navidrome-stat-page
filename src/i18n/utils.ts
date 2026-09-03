import { ui, type Language, type Translation } from './ui';

export type { Language, Translation };

export function getT(lang: Language): Translation {
  return ui[lang];
}

const PATH_PREFIX: Record<Language, string> = {
  en: '',
  zh: '/zh',
  'zh-TW': '/zh-tw',
  ja: '/ja',
  de: '/de',
  fr: '/fr',
  es: '/es',
};

export function localePath(lang: Language, path: string): string {
  return `${PATH_PREFIX[lang]}${path}`;
}
