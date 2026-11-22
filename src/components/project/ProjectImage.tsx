'use client';

import { useEffect, useRef } from 'react';
import { Maximize2, X } from 'lucide-react';
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
        className="group/img relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-border bg-background text-left"
      >
        <img
          src={url}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
        />
        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1 text-xs text-white/90 opacity-0 backdrop-blur transition-opacity group-hover/img:opacity-100 group-focus-visible/img:opacity-100">
          <Maximize2 className="h-3 w-3" aria-hidden />
          Enlarge
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
