// Genera public/og-default.png (1200x630). Ejecutar: node scripts/generate-og-image.mjs
import sharp from 'sharp';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0f172a"/>
  <rect x="0" y="600" width="1200" height="30" fill="#c86432"/>
  <g transform="translate(96 150) scale(5)">
    <path fill="#1e293b" d="M16 1 29 8.5v15L16 31 3 23.5v-15z"/>
    <path fill="#c86432" d="M16 7 23.8 11.5v9L16 25l-7.8-4.5v-9z"/>
  </g>
  <text x="300" y="265" font-family="Segoe UI, Arial, sans-serif" font-size="96" font-weight="700" fill="#f8fafc">GeoCobre</text>
  <text x="300" y="335" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="#e08a5c">Consultoría geológica · Geological consulting</text>
  <text x="96" y="480" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#e2e8f0">Campo · Laboratorio · Investigación aplicada · TRL 5</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og-default.png');
console.log('public/og-default.png generado');
