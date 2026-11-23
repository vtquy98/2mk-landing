// Visual check of a migrated page against the live Webflow page (pixel diff).
//   node scripts/webflow-import/compare.mjs <path> [options]
//     --local http://localhost:4321   local server (astro preview / dev)
//     --widths 1440,375               viewport widths
//     --live-sel .main-wrapper        element to capture on the live page (default: full page)
//     --local-sel main                element to capture locally (default: full page)
//     --out <dir>                     where PNGs go (default: .webflow-cache/compare/<path>)
// Prints, per width: heights and % of differing pixels; writes live.png, local.png and diff.png to look at.
// Uses the system Chrome (CHROME env var to override). Needs `npm i` (playwright-core, pixelmatch, pngjs).
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright-core';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { CACHE, SITE } from './lib.mjs';

const [path = '/', ...rest] = process.argv.slice(2);
const opt = name => { const i = rest.indexOf(`--${name}`); return i >= 0 ? rest[i + 1] : undefined; };
const local = opt('local') ?? 'http://localhost:4321';
const widths = (opt('widths') ?? '1440,375').split(',').map(Number);
const out = opt('out') ?? join(CACHE, 'compare', path === '/' ? 'index' : path.slice(1));
mkdirSync(out, { recursive: true });

const HIDE = '#cookieyes,.cky-consent-container,.cky-overlay,.cky-btn-revisit-wrapper{display:none!important}';
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? '/usr/bin/google-chrome' });

async function shot(url, width, sel, file) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch(() => {});
  await page.addStyleTag({ content: HIDE });
  // Scroll through so lazy images load and scroll-triggered animations reach their end state.
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 300)); }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(2000);
  const target = sel ? page.locator(sel).first() : page;
  const buf = sel ? await target.screenshot({ animations: 'disabled' }) : await page.screenshot({ fullPage: true, animations: 'disabled' });
  writeFileSync(file, buf);
  await page.close();
  return PNG.sync.read(buf);
}

for (const w of widths) {
  const a = await shot(SITE + path, w, opt('live-sel'), join(out, `live-${w}.png`));
  const b = await shot(local + path, w, opt('local-sel'), join(out, `local-${w}.png`));
  const W = Math.min(a.width, b.width), H = Math.min(a.height, b.height);
  const crop = img => { const c = new PNG({ width: W, height: H }); PNG.bitblt(img, c, 0, 0, W, H, 0, 0); return c; };
  const diff = new PNG({ width: W, height: H });
  const n = pixelmatch(crop(a).data, crop(b).data, diff.data, W, H, { threshold: 0.15 });
  writeFileSync(join(out, `diff-${w}.png`), PNG.sync.write(diff));
  console.log(`${w}px: live ${a.width}x${a.height} · local ${b.width}x${b.height} · diff ${((n / (W * H)) * 100).toFixed(2)}% of overlap · ${out}`);
}
await browser.close();
