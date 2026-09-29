// Audita con Lighthouse (perfil móvil) cada idioma del sitio servido en BASE_URL.
// Uso: npm run preview (en otra terminal) y luego `npm run lighthouse`.
import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4321';
const PORT = 9222;
const THRESHOLD = 90;
const PATHS = { es: '/', en: '/en/', pt: '/pt/', fr: '/fr/' };

const browser = await chromium.launch({ args: [`--remote-debugging-port=${PORT}`] });
let failed = false;

try {
  for (const [lang, path] of Object.entries(PATHS)) {
    const result = await lighthouse(`${BASE_URL}${path}`, {
      port: PORT,
      output: 'json',
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    });
    const scores = Object.values(result.lhr.categories).map((c) => [c.id, Math.round(c.score * 100)]);
    console.log(lang.padEnd(3), scores.map(([id, score]) => `${id}=${score}`).join('  '));
    for (const [id, score] of scores) {
      if (score < THRESHOLD) {
        failed = true;
        const audits = Object.values(result.lhr.audits)
          .filter((a) => a.score !== null && a.score < 0.9 && result.lhr.categories[id].auditRefs.some((r) => r.id === a.id && r.weight > 0))
          .map((a) => `    - ${a.id}: ${a.title}`);
        console.log(`  ${id} < ${THRESHOLD}:\n${audits.join('\n')}`);
      }
    }
  }
} finally {
  await browser.close();
}

process.exit(failed ? 1 : 0);
