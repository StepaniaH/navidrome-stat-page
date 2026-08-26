import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4398;
const BASE = `http://127.0.0.1:${PORT}`;
const results = [];
const check = (name, ok, detail = '') => {
  results.push(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`);
};

const server = spawn('npx', ['astro', 'preview', '--host', '127.0.0.1', '--port', String(PORT)], {
  cwd: new URL('..', import.meta.url).pathname,
  stdio: 'ignore',
});

let browser;
try {
  let up = false;
  for (let i = 0; i < 40 && !up; i++) {
    await sleep(500);
    up = await fetch(BASE + '/').then((r) => r.ok).catch(() => false);
  }
  if (!up) throw new Error('preview server did not start');

  browser = await chromium.launch({ args: ['--no-proxy-server'] });
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });

  // counters (en)
  await page.locator('#review').evaluate((el) => el.scrollIntoView());
  await page.waitForTimeout(2200);
  const plays = await page.locator('#review [data-count]').first().textContent();
  check('en counter reaches 3,847', plays.trim() === '3,847', `got "${plays.trim()}"`);

  // theme pill switching
  await page.locator('#themes').evaluate((el) => el.scrollIntoView());
  await page.click('[data-theme-pill="dracula"]');
  const scopeClass = await page.getAttribute('[data-theme-scope]', 'class');
  check('theme pill switches scope', scopeClass.includes('dm-dracula'), scopeClass);

  // review modal
  await page.click('[data-review-open]');
  check('modal opens', await page.locator('dialog[data-review-modal]').evaluate((d) => d.open));
  const centered = await page.locator('dialog[data-review-modal]').evaluate((d) => {
    const r = d.getBoundingClientRect();
    return Math.abs(r.left + r.width / 2 - innerWidth / 2) < 40;
  });
  check('modal centered', centered);
  await page.keyboard.press('Escape');
  check('modal closes on Escape', !(await page.locator('dialog[data-review-modal]').evaluate((d) => d.open)));

  // quickstart tabs + copy
  await page.click('[data-start-tab="env"]');
  check('quickstart .env tab', await page.locator('[data-start-panel="env"]').isVisible());

  // FAQ
  const faq = page.locator('details').first();
  await faq.locator('summary').click();
  check('FAQ opens', await faq.evaluate((d) => d.open));

  // now-playing sync
  const read = () =>
    page.evaluate(() => ({
      w: parseFloat(document.querySelector('[data-np-fill]').style.width),
      t: document.querySelector('[data-np-current]').textContent,
    }));
  const npA = await read();
  await page.waitForTimeout(2500);
  const npB = await read();
  check('np bar and time advance together', npB.w > npA.w && npB.t !== npA.t, `${JSON.stringify(npA)} -> ${JSON.stringify(npB)}`);

  // lang menu escape
  await page.click('[data-lang-btn]');
  await page.keyboard.press('Escape');
  check('lang menu closes on Escape', await page.locator('[data-lang-menu]').isHidden());

  // overflow desktop
  const overflowD = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check('no horizontal overflow @1440', overflowD <= 0, `delta=${overflowD}`);
  await page.close();

  // all four locales render + hreflang + lang attr
  const locales = [
    { path: '/', htmlLang: 'en', probe: 'Every play,' },
    { path: '/zh/', htmlLang: 'zh-CN', probe: '每一次播放' },
    { path: '/zh-tw/', htmlLang: 'zh-TW', probe: '每一次播放' },
    { path: '/ja/', htmlLang: 'ja', probe: 'すべての再生' },
  ];
  for (const loc of locales) {
    const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(BASE + loc.path, { waitUntil: 'networkidle' });
    const body = await p.evaluate(() => document.body.innerText);
    check(`locale renders ${loc.path}`, body.includes(loc.probe), `probe "${loc.probe}"`);
    const langAttr = await p.evaluate(() => document.documentElement.lang);
    check(`html lang ${loc.path}`, langAttr === loc.htmlLang, langAttr);
    const hreflangCount = await p.locator('link[rel="alternate"][hreflang]').count();
    check(`hreflang set ${loc.path}`, hreflangCount === 5, `${hreflangCount}/5`);
    await p.close();
  }

  // FAQPage JSON-LD present
  {
    const p = await browser.newPage();
    await p.goto(BASE + '/ja/', { waitUntil: 'networkidle' });
    const hasFaqLd = await p.evaluate(() =>
      [...document.querySelectorAll('script[type="application/ld+json"]')].some((s) => s.textContent.includes('FAQPage')),
    );
    check('FAQPage JSON-LD', hasFaqLd);
    const ogImage = await p.evaluate(() => document.querySelector('meta[property="og:image"]').content);
    check('localized og:image', ogImage.endsWith('/og-ja.png'), ogImage);
    await p.close();
  }

  // mobile
  for (const path of ['/', '/ja/']) {
    const pm = await browser.newPage({ viewport: { width: 375, height: 667 } });
    await pm.goto(BASE + path, { waitUntil: 'networkidle' });
    const overflow = await pm.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(`no horizontal overflow @375 ${path}`, overflow <= 0, `delta=${overflow}`);
    await pm.click('[data-menu-btn]');
    check(`mobile menu opens ${path}`, await pm.locator('[data-menu-panel]').isVisible());
    await pm.close();
  }

  // reduced motion
  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  const pr = await ctx.newPage();
  await pr.goto(BASE + '/', { waitUntil: 'networkidle' });
  const npRm = await pr.evaluate(() => ({
    w: document.querySelector('[data-np-fill]').style.width,
    t: document.querySelector('[data-np-current]').textContent,
  }));
  check('reduced-motion np static', npRm.w === '19%' && npRm.t === '1:04', JSON.stringify(npRm));
  await ctx.close();

  check('no console/page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
} finally {
  await browser?.close();
  server.kill();
}

console.log(results.join('\n'));
const failed = results.filter((r) => r.startsWith('FAIL')).length;
console.log(failed === 0 ? '\nALL PASS' : `\n${failed} FAILURES`);
process.exit(failed === 0 ? 0 : 1);
