/**
 * Next.js configuration tuned for a fully static, GitHub-Pages-friendly build.
 *
 * Why these settings:
 * - `output: 'export'` produces a pure static site in `out/` with no Node server.
 * - `basePath` / `assetPrefix` are read from NEXT_PUBLIC_BASE_PATH. A project
 *   repo is served from `https://<user>.github.io/<repo>`, so every asset/link
 *   must be prefixed with `/<repo>`. A user/org page (`<user>.github.io`) is
 *   served from root, so the prefix must be empty. The CI workflow computes the
 *   correct value automatically, so this never needs to be hand-edited.
 * - `images.unoptimized` is required: the default Image Optimization API needs a
 *   running server, which static export does not have.
 * - `trailingSlash` makes GitHub Pages resolve `/about/` to `/about/index.html`
 *   reliably and keeps deep links working without a server rewrite layer.
 */

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Short content hash of the resume, appended to its URL as `?v=<hash>`.
// Uploading a new public/resume.pdf changes the URL automatically, so browsers
// and the GitHub Pages CDN can never serve a stale cached copy.
let resumeVersion = '';
try {
  resumeVersion = createHash('sha1')
    .update(readFileSync(new URL('./public/resume.pdf', import.meta.url)))
    .digest('hex')
    .slice(0, 8);
} catch {
  // No resume present — link stays unversioned.
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_RESUME_VERSION: resumeVersion,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
