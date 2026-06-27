import Link from 'next/link';
import type { Metadata } from 'next';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';
import { BackgroundDecoration } from '@/components/common';
import { withBasePath } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

/**
 * 404 page. Statically exported to 404.html, which GitHub Pages serves for any
 * unknown path. next/link automatically applies basePath, so "Home" resolves
 * correctly on both root and project-page deploys.
 */
export default function NotFound() {
  return (
    <>
      <BackgroundDecoration />
      <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-[7rem] font-extrabold leading-none text-gradient sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          This screen wasn&apos;t in the navigation graph.
        </h1>
        <p className="mt-3 max-w-md text-balance text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back to safety.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button as="a" href={withBasePath('/')} size="lg">
            <Home className="h-4 w-4" />
            Back home
          </Button>
        </div>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to portfolio
        </Link>
      </main>
    </>
  );
}
