import { readFile, writeFile } from 'node:fs/promises';
// The integration emits sitemap-index.xml. Supply the requested sitemap.xml alias
// and keep the public robots.txt synchronized with the one domain setting.
const sitemap = await readFile('dist/sitemap-0.xml', 'utf8');
await writeFile('dist/sitemap.xml', sitemap);
const siteUrl = sitemap.match(/<loc>([^<]+)<\/loc>/)?.[1];
if (!siteUrl) throw new Error('The sitemap must contain a canonical site URL.');
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', siteUrl).href}\n`;
await writeFile('public/robots.txt', robots);
await writeFile('dist/robots.txt', robots);
