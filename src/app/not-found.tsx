import type { Metadata } from 'next';
import { Button } from '@/components/ui';
import { withBasePath } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

/** 404 page, exported to 404.html, which GitHub Pages serves for unknown paths. */
export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Button as="a" href={withBasePath('/')} className="mt-8">
        Back to home
      </Button>
    </main>
  );
}
