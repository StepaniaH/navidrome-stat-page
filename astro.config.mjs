import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://navidrome-stat.pages.dev',
  integrations: [sitemap()],
  experimental: {
    fonts: [
      {
        name: 'Inter Variable',
        cssVariable: '--font-inter',
        provider: fontProviders.local(),
        options: { variants: [{ src: ['./node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'] }] }, optimizedFallbacks: false, fallbacks: ['Noto Sans SC', 'sans-serif'],
      },
      {
        name: 'Space Grotesk Variable',
        cssVariable: '--font-space-grotesk',
        provider: fontProviders.local(),
        options: { variants: [{ src: ['./node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2'] }] }, optimizedFallbacks: false, fallbacks: ['Noto Sans SC', 'sans-serif'],
      },
      {
        name: 'JetBrains Mono Variable',
        cssVariable: '--font-jetbrains-mono',
        provider: fontProviders.local(),
        options: { variants: [{ src: ['./node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2'] }] }, optimizedFallbacks: false, fallbacks: ['Noto Sans SC', 'sans-serif'],
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en',
      { path: 'zh', codes: ['zh-CN'] },
      { path: 'zh-tw', codes: ['zh-TW'] },
      { path: 'ja', codes: ['ja'] },
      { path: 'de', codes: ['de'] },
      { path: 'fr', codes: ['fr'] },
      { path: 'es', codes: ['es'] },
    ],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
