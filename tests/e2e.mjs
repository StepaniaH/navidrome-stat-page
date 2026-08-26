import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4398;
const BASE = `http://127.0.0.1:${PORT}`;
const results = [];
const check = (name, ok, detail = '') => {
  results.push(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`);
};

// CSP must allow the data: font subsets Astro inlines into noto-sc.css
{
  const headersTxt = readFileSync(new URL('../public/_headers', import.meta.url), 'utf8');
  const fontSrc = headersTxt.match(/font-src ([^;\n]+)/)?.[1] ?? '';
  check('CSP font-src allows data: fonts', fontSrc.includes('data:'), fontSrc);
}

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

  // lang menu escape + focus + semantics
  await page.click('[data-lang-btn]');
  await page.locator('[data-lang-menu] a').first().focus();
  await page.keyboard.press('Escape');
  check('lang menu closes on Escape', await page.locator('[data-lang-menu]').isHidden());
  check(
    'lang menu Escape restores focus to button',
    await page.evaluate(() => document.activeElement?.hasAttribute('data-lang-btn'))
  );
  {
    const sem = await page.evaluate(() => {
      const menu = document.querySelector('[data-lang-menu]');
      return {
        optionRoles: menu.querySelectorAll('[role="option"]').length,
        current: menu.querySelector('a[aria-current="true"]')?.textContent?.trim(),
      };
    });
    check('lang menu is semantic link list with aria-current', sem.optionRoles === 0 && sem.current === 'English', JSON.stringify(sem));
  }

  // version interpolation: compose snippet must carry the pinned version tag
  {
    const composeCode = await page.locator('[data-start-panel="compose"] code').textContent();
    check('compose snippet pins SITE_VERSION', composeCode.includes('stepaniah/navidrome-statistic:v0.8.1'));
  }

  // overflow desktop
  const overflowD = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check('no horizontal overflow @1440', overflowD <= 0, `delta=${overflowD}`);
  await page.close();

  // all six locales render + hreflang + lang attr
  const locales = [
    { path: '/', htmlLang: 'en', probe: 'Every play,' },
    { path: '/zh/', htmlLang: 'zh-CN', probe: '每一次播放' },
    { path: '/zh-tw/', htmlLang: 'zh-TW', probe: '每一次播放' },
    { path: '/ja/', htmlLang: 'ja', probe: 'すべての再生' },
    { path: '/fr/', htmlLang: 'fr', probe: 'Chaque écoute' },
    { path: '/es/', htmlLang: 'es', probe: 'Cada reproducción' },
  ];
  for (const loc of locales) {
    const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(BASE + loc.path, { waitUntil: 'networkidle' });
    const body = await p.evaluate(() => document.body.innerText);
    check(`locale renders ${loc.path}`, body.includes(loc.probe), `probe "${loc.probe}"`);
    const langAttr = await p.evaluate(() => document.documentElement.lang);
    check(`html lang ${loc.path}`, langAttr === loc.htmlLang, langAttr);
    const hreflangCount = await p.locator('link[rel="alternate"][hreflang]').count();
    check(`hreflang set ${loc.path}`, hreflangCount === 7, `${hreflangCount}/7`);
    await p.close();
  }

  // i18n correctness probes
  {
    const p = await browser.newPage();
    await p.goto(BASE + '/zh-tw/', { waitUntil: 'networkidle' });
    const body = await p.evaluate(() => document.body.innerText);
    const raw = await p.evaluate(() => document.body.textContent);
    check('zh-TW uses traditional 首發', body.includes('Product Hunt 首發'));
    check('zh-TW uses traditional 部署後', raw.includes('部署後'));
    await p.close();
  }
  {
    const p = await browser.newPage();
    await p.goto(BASE + '/ja/', { waitUntil: 'networkidle' });
    const body = await p.evaluate(() => document.body.innerText);
    check('ja uses プラグイン (not 插件)', body.includes('プラグイン') && !body.includes('插件'));
    check('ja theme mock localized', body.includes('再生統計'));
    await p.close();
  }
  {
    const p = await browser.newPage();
    await p.goto(BASE + '/zh/', { waitUntil: 'networkidle' });
    const body = await p.evaluate(() => document.body.innerText);
    check('zh theme mock localized', body.includes('播放统计'));
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
    const ldName = await p.evaluate(() => {
      const s = [...document.querySelectorAll('script[type="application/ld+json"]')].find((x) =>
        x.textContent.includes('SoftwareApplication')
      );
      return s ? JSON.parse(s.textContent).name : null;
    });
    check('JSON-LD name is Navidrome Stat', ldName === 'Navidrome Stat', ldName);
    const ogMeta = await p.evaluate(() => ({
      w: document.querySelector('meta[property="og:image:width"]')?.content,
      h: document.querySelector('meta[property="og:image:height"]')?.content,
      alt: document.querySelector('meta[property="og:image:alt"]')?.content,
    }));
    check('og:image width/height/alt present', ogMeta.w === '1200' && ogMeta.h === '630' && !!ogMeta.alt, JSON.stringify(ogMeta));
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
    const langHrefs = await pm.locator('[data-menu-panel] a').evaluateAll((as) =>
      as
        .map((a) => a.getAttribute('href'))
        .filter((h) => ['/', '/zh/', '/zh-tw/', '/ja/', '/fr/', '/es/'].includes(h))
    );
    check(`mobile menu offers all 6 languages ${path}`, langHrefs.length === 6, langHrefs.join(' '));
    await pm.click('[data-menu-panel] a[href="#features"]');
    check(`mobile menu closes on anchor click ${path}`, await pm.locator('[data-menu-panel]').isHidden());
    await pm.close();
    const pe = await browser.newPage({ viewport: { width: 375, height: 667 } });
    await pe.goto(BASE + path, { waitUntil: 'networkidle' });
    await pe.click('[data-menu-btn]');
    check(`mobile menu opens for Escape test ${path}`, await pe.locator('[data-menu-panel]').isVisible());
    await pe.keyboard.press('Escape');
    const esc = await pe.evaluate(() => ({
      hidden: document.querySelector('[data-menu-panel]').hidden,
      focus: document.activeElement?.hasAttribute('data-menu-btn'),
    }));
    check(`mobile menu Escape closes + restores focus ${path}`, esc.hidden && esc.focus, JSON.stringify(esc));
    await pe.close();
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
