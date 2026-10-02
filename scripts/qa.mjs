import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
await mkdir('qa-output', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
for (const [path, lang, dir] of [['/', 'ar', 'rtl'], ['/en/', 'en', 'ltr']]) {
  for (const width of [320, 768, 1280, 1920]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const errors = []; page.on('pageerror', err => errors.push(err.message));
    await page.goto(`http://127.0.0.1:4321${path}`);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('html').getAttribute('lang'), lang);
    assert.equal(await page.locator('html').getAttribute('dir'), dir);
    assert.equal(await page.locator('h1').count(), 1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    assert.equal(overflow, false, `${lang} ${width} overflow`);
    assert.equal(await page.locator('header .language').first().getAttribute('href'), lang === 'ar' ? '/en/' : '/');
    const slider = page.locator('#comparison-range');
    await slider.focus(); await slider.press(dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight');
    assert.equal(await slider.inputValue(), '51');
    await slider.press('End'); assert.equal(await slider.inputValue(), '100');
    await slider.press('Home'); assert.equal(await slider.inputValue(), '0');
    await slider.fill('50');
    const box = await slider.boundingBox();
    assert(box);
    await slider.click({position:{x:box.width * .75,y:box.height / 2}});
    const pointerValue = Number(await slider.inputValue());
    assert(dir === 'rtl' ? pointerValue < 40 : pointerValue > 60, 'Pointer follows reading direction');
    await slider.fill('50');
    if (width < 1100) {
      const button = page.locator('.menu-toggle');
      await button.click(); assert.equal(await button.getAttribute('aria-expanded'), 'true');
      await button.press('Escape'); assert.equal(await button.getAttribute('aria-expanded'), 'false');
      await button.click(); await page.locator('#mobile-menu a[href$="#services"]').click();
      assert.equal(await button.getAttribute('aria-expanded'), 'false');
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.locator('.sun').evaluate(el => getComputedStyle(el).animationName), 'none');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    assert(description && description.length >= 150 && description.length <= 160);
    const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
    assert.equal(schema.telephone, '+962771559900');
    assert.equal(schema.openingHoursSpecification.dayOfWeek.length, 7);
    assert.equal(schema.openingHoursSpecification.opens, '00:00');
    assert.equal(await page.locator('link[hreflang]').count(), 3);
    assert.equal(await page.locator('a[href="https://share.google/pVEZY1WdLjaEmwwD8"]').count(), 1);
    const wa = await page.locator('a[href*="wa.me/"]').first().getAttribute('href');
    assert(wa?.startsWith('https://wa.me/962771559900?text='));
    // Scroll through lazy images before screenshot and accessibility audit.
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const broken = await page.locator('img').evaluateAll(imgs => imgs.filter(i => !i.complete || !i.naturalWidth).map(i => i.src));
    assert.deepEqual(broken, []);
    await page.evaluate(() => scrollTo(0,0));
    await page.waitForTimeout(300);
    const axe = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    await page.screenshot({path:`qa-output/${lang}-${width}.png`,fullPage:true});
    const result = {lang,width,overflow,errors,violations:axe.violations.map(v => ({id:v.id,description:v.description,nodes:v.nodes.map(n=>n.target)}))};
    results.push(result); console.log(JSON.stringify(result));
    await context.close();
  }
}
await browser.close();
await writeFile('qa-output/browser-results.json',JSON.stringify(results,null,2));
assert(results.every(r => !r.errors.length && !r.violations.length), 'Accessibility or console errors found; see qa-output.');
