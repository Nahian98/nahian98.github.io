'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { withBasePath } from '@/lib/utils';

interface ProjectImageProps {
  src: string;
  alt: string;
}

/**
 * Project screenshot thumbnail that opens a full-size preview on click.
 *
 * Uses the native <dialog> element: showModal() gives focus trapping, Escape to
 * close and an inert page behind it for free. Clicking anywhere (image or
 * backdrop) or the close button dismisses it.
 */
export function ProjectImage({ src, alt }: ProjectImageProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const url = withBasePath(src);

  // Lock page scroll while the preview is open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const unlock = () => {
      document.body.style.overflow = '';
    };
    dialog.addEventListener('close', unlock);
    return () => {
      dialog.removeEventListener('close', unlock);
      unlock();
    };
  }, []);

  const open = () => {
    document.body.style.overflow = 'hidden';
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`View larger: ${alt}`}
        className="group block w-full self-start cursor-zoom-in rounded-md text-left"
      >
        <img
          src={url}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full rounded-md border border-border object-cover transition-colors group-hover:border-border-strong"
        />
        <span className="mt-1.5 block text-xs text-muted-foreground transition-colors group-hover:text-foreground">
          Click to enlarge
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onClick={close}
        aria-label={alt}
        className="m-auto max-h-none max-w-none overflow-visible bg-transparent p-0 backdrop:bg-black/85"
      >
        <img
          src={url}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block max-h-[90vh] w-auto max-w-[94vw] cursor-zoom-out rounded-lg xl:max-w-[1280px]"
        />
        <button
          type="button"
          onClick={close}
          aria-label="Close preview"
          className="fixed right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
        >
          <X className="h-5 w-5" />
        </button>
      </dialog>
    </>
  );
}
