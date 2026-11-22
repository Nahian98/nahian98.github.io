import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

const base =
  'inline-flex select-none items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-foreground shadow-[0_0_0_1px_rgb(var(--accent)/0.4),0_8px_30px_-8px_rgb(var(--accent)/0.55)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgb(var(--accent)/0.6),0_12px_36px_-8px_rgb(var(--accent)/0.7)]',
  secondary:
    'border border-border bg-card/60 text-foreground backdrop-blur hover:-translate-y-0.5 hover:border-border-strong hover:bg-card-hover',
  ghost: 'text-muted-foreground hover:text-foreground hover:bg-surface',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    as?: 'button';
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    as: 'a';
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Polymorphic button: a `<button>` by default, or an `<a>` with `as="a"`. */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = 'primary', size = 'md', className, children, ...props }, ref) {
    const classes = cn(base, variants[variant], sizes[size], className);

    if (props.as === 'a') {
      const { as: _as, ...anchorProps } = props;
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }

    const { as: _as, type, ...buttonProps } = props as ButtonAsButton;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type ?? 'button'}
        className={classes}
        {...buttonProps}
      >
        {children}
      </button>
    );
  },
);
