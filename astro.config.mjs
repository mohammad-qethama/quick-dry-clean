import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/config/site.ts';
export default defineConfig({
  site: site.siteUrl,
  output: 'static',
  trailingSlash: 'always',
  i18n: { defaultLocale: 'ar', locales: ['ar', 'en'], routing: { prefixDefaultLocale: false } },
  integrations: [sitemap({ i18n: { defaultLocale: 'ar', locales: { ar: 'ar', en: 'en' } } })],
  vite: { plugins: [tailwindcss()] },
});
