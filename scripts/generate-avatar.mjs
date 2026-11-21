/**
 * Generates the small, head-and-shoulders avatar shown in the hero from
 * public/images/profile.jpg. Run with: `npm run gen:avatar`.
 *
 * Why: the hero shows the photo at ~96 CSS px. Letting the browser shrink a
 * 900px photo ~10x in one pass produces jagged, soft results (especially in
 * Safari), and the full upper-body framing leaves the face only ~30px tall.
 * Pre-cropping to the face and resizing with a high-quality (Lanczos) filter
 * gives a crisp image at each pixel density (1x / 2x / 3x).
 */
import sharp from 'sharp';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES = join(__dirname, '..', 'public', 'images');
const SOURCE = join(IMAGES, 'profile.jpg');

// Square crop around the head and shoulders, in source pixels (900x974 photo).
const CROP = { left: 125, top: 0, width: 660, height: 660 };
const SIZES = [96, 192, 288];

async function main() {
  for (const size of SIZES) {
    const out = join(IMAGES, `avatar-${size}.jpg`);
    await sharp(SOURCE)
      .extract(CROP)
      .resize(size, size, { kernel: 'lanczos3' })
      .sharpen({ sigma: 0.5 })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(out);
    console.log(`wrote ${out}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
