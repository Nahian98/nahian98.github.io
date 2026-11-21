/**
 * Generates raster brand assets (favicons, PWA icons, OG image) from inline
 * SVG sources using sharp. Run with: `npm run gen:assets`.
 *
 * Why a script: social/OG scrapers and PWA manifests need real PNGs (not SVG),
 * so we rasterize once at authoring time and commit the output to /public.
 *
 * Keep the identity constants below in sync with src/constants/site.ts, then
 * re-run this script. The OG card composites public/images/profile.jpg (your
 * headshot) on the right; if that file is missing it renders text-only.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');
const PROFILE = join(PUBLIC, 'images', 'profile.jpg');

// ── Identity (keep in sync with src/constants/site.ts) ───────────────────────
const NAME = 'Abdullah Al Nahian Kanon';
const MONO = 'NK';
const ROLE = 'Software Engineer, Android';
const TAGLINE_1 = 'Fast, reliable, thoughtfully';
const TAGLINE_2 = 'engineered mobile experiences.';
const KEYWORDS = 'Kotlin · Jetpack Compose · Clean Architecture';
const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

// Photo box on the OG card (right side)
const PW = 360;
const PH = 420;
const PX = 760;
const PY = 105;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#3DDC84"/><stop offset="1" stop-color="#4F8EF7"/>
  </linearGradient></defs>
  <rect x="2" y="2" width="60" height="60" rx="16" fill="#18181B" stroke="#27272A" stroke-width="2"/>
  <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="${FONT}" font-size="24" font-weight="800" fill="url(#g)">${MONO}</text>
  <circle cx="50" cy="16" r="5" fill="#3DDC84"/>
</svg>`;

const hasPhoto = existsSync(PROFILE);

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3DDC84"/><stop offset="1" stop-color="#4F8EF7"/>
    </linearGradient>
    <radialGradient id="glow" cx="18%" cy="8%" r="80%">
      <stop offset="0" stop-color="#3DDC84" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#09090B" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#27272A" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#09090B"/>
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.5"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- monogram tile -->
  <g transform="translate(80, 76)">
    <rect x="0" y="0" width="84" height="84" rx="22" fill="#18181B" stroke="#27272A" stroke-width="2"/>
    <text x="42" y="48" dominant-baseline="middle" text-anchor="middle" font-family="${FONT}" font-size="32" font-weight="800" fill="url(#g)">${MONO}</text>
    <circle cx="66" cy="20" r="6" fill="#3DDC84"/>
  </g>

  <!-- text column -->
  <text x="80" y="348" font-family="${FONT}" font-size="34" font-weight="600" fill="#3DDC84">${ROLE}</text>
  <text x="80" y="412" font-family="${FONT}" font-size="50" font-weight="800" fill="#FAFAFA">${NAME}</text>
  <text x="80" y="462" font-family="${FONT}" font-size="26" font-weight="400" fill="#A1A1AA">${TAGLINE_1}</text>
  <text x="80" y="496" font-family="${FONT}" font-size="26" font-weight="400" fill="#A1A1AA">${TAGLINE_2}</text>
  <rect x="80" y="536" width="600" height="2" fill="#27272A"/>
  <text x="80" y="580" font-family="${FONT}" font-size="22" font-weight="500" fill="#A1A1AA">${KEYWORDS}</text>

  ${
    hasPhoto
      ? `<!-- photo frame ring + glow -->
  <rect x="${PX - 6}" y="${PY - 6}" width="${PW + 12}" height="${PH + 12}" rx="32" fill="#3DDC84" opacity="0.12"/>
  <rect x="${PX - 4}" y="${PY - 4}" width="${PW + 8}" height="${PH + 8}" rx="30" fill="none" stroke="#3DDC84" stroke-opacity="0.55" stroke-width="2"/>`
      : ''
  }
</svg>`;

async function png(svg, size, out) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(PUBLIC, out));
  console.log('  ✓', out, `${size}x${size}`);
}

async function buildOg() {
  const bg = await sharp(Buffer.from(ogSvg)).png().toBuffer();
  if (!hasPhoto) {
    await sharp(bg).toFile(join(PUBLIC, 'og-image.png'));
    console.log('  ✓ og-image.png 1200x630 (text-only — profile.jpg not found)');
    return;
  }
  const mask = Buffer.from(
    `<svg width="${PW}" height="${PH}"><rect width="${PW}" height="${PH}" rx="26" fill="#fff"/></svg>`,
  );
  const photo = await sharp(PROFILE)
    .resize(PW, PH, { fit: 'cover', position: 'top' })
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
  await sharp(bg)
    .composite([{ input: photo, left: PX, top: PY }])
    .png()
    .toFile(join(PUBLIC, 'og-image.png'));
  console.log('  ✓ og-image.png 1200x630 (with photo)');
}

async function main() {
  await mkdir(PUBLIC, { recursive: true });
  console.log('Generating brand assets…');
  await png(faviconSvg, 16, 'favicon-16x16.png');
  await png(faviconSvg, 32, 'favicon-32x32.png');
  await png(faviconSvg, 180, 'apple-touch-icon.png');
  await png(faviconSvg, 192, 'icon-192.png');
  await png(faviconSvg, 512, 'icon-512.png');
  await buildOg();
  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
