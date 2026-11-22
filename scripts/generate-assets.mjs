/**
 * Generates raster brand assets (favicons, PWA icons, OG image) from inline
 * SVG sources using sharp. Run with: `npm run gen:assets`.
 *
 * Why a script: social/OG scrapers and PWA manifests need real PNGs (not SVG),
 * so we rasterize once at authoring time and commit the output to /public.
 *
 * Keep the identity constants below in sync with src/constants/site.ts, then
 * re-run this script (`--og` rebuilds only the OG image). The OG card composites public/images/profile.jpg (your
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
const SHORT_NAME = 'Nahian Kanon';
const MONO = 'NK';
const ROLE = 'Software Engineer, Android';
const BADGE = 'Open to Android &amp; mobile engineering roles';
// Hero headline, split into lines; the middle line gets the accent gradient.
const HEADLINE = ['I build production', 'Android apps', 'people actually use.'];
const STATS = [
  ['3+', 'Years in Android'],
  ['500K+', 'Google Play downloads'],
  ['93', 'Unit tests, one OSS app'],
];
// Rasterized by librsvg with system fonts; the site's Inter / JetBrains Mono
// fall back to these close matches when not installed.
const FONT = "Inter, 'Helvetica Neue', Arial, sans-serif";
const MONO_FONT = "'JetBrains Mono', Menlo, monospace";
const FAVICON_FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

// Design tokens (mirror src/app/globals.css, dark theme)
const C = {
  bg: '#090A0C',
  card: '#131519',
  surface: '#0F1114',
  border: '#24272E',
  fg: '#F3F5F7',
  muted: '#98A0AD',
  accent: '#3DDC84',
  accentFg: '#06140C',
  secondary: '#6EA8FE',
};

// Photo box on the OG card (right side)
const PW = 330;
const PH = 390;
const PX = 800;
const PY = 96;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#3DDC84"/><stop offset="1" stop-color="#4F8EF7"/>
  </linearGradient></defs>
  <rect x="2" y="2" width="60" height="60" rx="16" fill="#18181B" stroke="#27272A" stroke-width="2"/>
  <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="${FAVICON_FONT}" font-size="24" font-weight="800" fill="url(#g)">${MONO}</text>
  <circle cx="50" cy="16" r="5" fill="#3DDC84"/>
</svg>`;

const hasPhoto = existsSync(PROFILE);
// Without a photo the code card moves up into the photo's place.
const CARD_Y = hasPhoto ? 430 : 200;

const statsSvg = STATS.map(([value, label], i) => {
  const x = 80 + i * 210;
  return `
    ${i > 0 ? `<rect x="${x}" y="500" width="1" height="78" fill="${C.border}"/>` : ''}
    <text x="${x + 24}" y="537" font-family="${MONO_FONT}" font-size="30" font-weight="700" fill="${C.fg}">${value}</text>
    <text x="${x + 24}" y="563" font-family="${FONT}" font-size="15" fill="${C.muted}">${label}</text>`;
}).join('');

/* Background layer: everything that sits *under* the photo. */
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="tg" gradientUnits="userSpaceOnUse" x1="80" y1="0" x2="470" y2="0">
      <stop offset="0" stop-color="${C.accent}"/><stop offset="1" stop-color="${C.secondary}"/>
    </linearGradient>
    <radialGradient id="glowG" cx="30%" cy="0%" r="65%">
      <stop offset="0" stop-color="${C.accent}" stop-opacity="0.20"/>
      <stop offset="1" stop-color="${C.accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="88%" cy="55%" r="45%">
      <stop offset="0" stop-color="${C.secondary}" stop-opacity="0.12"/>
      <stop offset="1" stop-color="${C.secondary}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="fade" cx="50%" cy="0%" r="90%">
      <stop offset="0.3" stop-color="#fff"/><stop offset="1" stop-color="#000"/>
    </radialGradient>
    <mask id="gridMask"><rect width="1200" height="630" fill="url(#fade)"/></mask>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0V44" fill="none" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.accent}"/><stop offset="1" stop-color="${C.secondary}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="${C.bg}"/>
  <rect width="1200" height="630" fill="url(#grid)" mask="url(#gridMask)"/>
  <rect width="1200" height="630" fill="url(#glowG)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>

  <!-- wordmark -->
  <rect x="80" y="62" width="48" height="48" rx="12" fill="${C.accent}"/>
  <text x="104" y="87" dominant-baseline="middle" text-anchor="middle" font-family="${MONO_FONT}" font-size="19" font-weight="700" fill="${C.accentFg}">${MONO}</text>
  <text x="144" y="95" font-family="${FONT}" font-size="25" font-weight="700" fill="${C.fg}">${SHORT_NAME}<tspan fill="${C.accent}">.</tspan></text>

  <!-- availability badge -->
  <rect x="80" y="146" width="428" height="38" rx="19" fill="${C.accent}" fill-opacity="0.10" stroke="${C.accent}" stroke-opacity="0.35"/>
  <circle cx="102" cy="165" r="5" fill="${C.accent}"/>
  <text x="117" y="171" font-family="${FONT}" font-size="17" font-weight="500" fill="${C.accent}">${BADGE}</text>

  <!-- headline -->
  <text font-family="${FONT}" font-size="62" font-weight="700" letter-spacing="-1.5">
    <tspan x="78" y="260" fill="${C.fg}">${HEADLINE[0]}</tspan>
    <tspan x="78" y="330" fill="url(#tg)">${HEADLINE[1]}</tspan>
    <tspan x="78" y="400" fill="${C.fg}">${HEADLINE[2]}</tspan>
  </text>
  <text x="80" y="450" font-family="${FONT}" font-size="21" fill="${C.muted}">${NAME}  ·  ${ROLE}</text>

  <!-- stats strip -->
  <rect x="80" y="500" width="630" height="78" rx="16" fill="${C.card}" fill-opacity="0.9" stroke="${C.border}"/>
  ${statsSvg}

  ${
    hasPhoto
      ? `<!-- photo glow + gradient ring -->
  <rect x="${PX - 18}" y="${PY - 18}" width="${PW + 36}" height="${PH + 36}" rx="40" fill="${C.accent}" opacity="0.08"/>
  <rect x="${PX - 4}" y="${PY - 4}" width="${PW + 8}" height="${PH + 8}" rx="30" fill="none" stroke="url(#ring)" stroke-opacity="0.8" stroke-width="2.5"/>`
      : ''
  }
</svg>`;

/* Foreground layer: the mini code card that overlaps the photo's corner. */
const overlaySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <g transform="translate(730, ${CARD_Y})">
    <rect x="0" y="6" width="330" height="128" rx="16" fill="#000" opacity="0.35"/>
    <rect x="0" y="0" width="330" height="128" rx="16" fill="${C.card}" stroke="${C.border}"/>
    <path d="M16 0H314A16 16 0 0 1 330 16V40H0V16A16 16 0 0 1 16 0Z" fill="${C.surface}"/>
    <rect x="0" y="40" width="330" height="1" fill="${C.border}"/>
    <circle cx="22" cy="20" r="5.5" fill="#FF5F57"/>
    <circle cx="40" cy="20" r="5.5" fill="#FEBC2E"/>
    <circle cx="58" cy="20" r="5.5" fill="#28C840"/>
    <text x="80" y="25" font-family="${MONO_FONT}" font-size="12" fill="${C.muted}">Developer.kt</text>
    <text font-family="${MONO_FONT}" font-size="15" xml:space="preserve">
      <tspan x="20" y="74"><tspan fill="#C792EA">fun</tspan><tspan fill="${C.fg}"> </tspan><tspan fill="#82AAFF">Developer</tspan><tspan fill="${C.fg}">.</tspan><tspan fill="#FFCB6B">status</tspan><tspan fill="${C.fg}">() =</tspan></tspan>
      <tspan x="20" y="104" fill="${C.accent}">  "Open to new roles"</tspan>
    </text>
    <rect x="212" y="90" width="9" height="18" fill="${C.accent}"/>
  </g>
</svg>`;

async function png(svg, size, out) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(PUBLIC, out));
  console.log('  ✓', out, `${size}x${size}`);
}

async function buildOg() {
  const bg = await sharp(Buffer.from(ogSvg)).png().toBuffer();
  const layers = [];
  if (hasPhoto) {
    const mask = Buffer.from(
      `<svg width="${PW}" height="${PH}"><rect width="${PW}" height="${PH}" rx="26" fill="#fff"/></svg>`,
    );
    const photo = await sharp(PROFILE)
      .resize(PW, PH, { fit: 'cover', position: 'top' })
      .ensureAlpha()
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer();
    layers.push({ input: photo, left: PX, top: PY });
  }
  layers.push({ input: Buffer.from(overlaySvg), left: 0, top: 0 });
  await sharp(bg).composite(layers).png().toFile(join(PUBLIC, 'og-image.png'));
  console.log(`  ✓ og-image.png 1200x630 (${hasPhoto ? 'with photo' : 'text-only, profile.jpg not found'})`);
}

async function main() {
  await mkdir(PUBLIC, { recursive: true });
  // `--og` regenerates only the OG card and leaves the favicons untouched.
  const ogOnly = process.argv.includes('--og');
  console.log(ogOnly ? 'Generating OG image…' : 'Generating brand assets…');
  if (ogOnly) {
    await buildOg();
    console.log('Done.');
    return;
  }
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
