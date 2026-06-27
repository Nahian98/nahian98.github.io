import type { Config } from 'tailwindcss';

/**
 * Tailwind theme.
 *
 * Colors are defined as semantic tokens (background, surface, card, accent…)
 * that resolve to CSS custom properties holding *space-separated RGB channels*
 * (e.g. `--background: 9 9 11`). Using channels — not full color values — lets
 * Tailwind inject the `<alpha-value>` so opacity modifiers like `bg-card/60`
 * still work. The actual values (and the dark/light split) live in globals.css.
 */

const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        background: withOpacity('--background'),
        surface: withOpacity('--surface'),
        card: withOpacity('--card'),
        'card-hover': withOpacity('--card-hover'),
        border: withOpacity('--border'),
        'border-strong': withOpacity('--border-strong'),
        foreground: withOpacity('--foreground'),
        muted: withOpacity('--muted'),
        'muted-foreground': withOpacity('--muted-foreground'),
        accent: {
          DEFAULT: withOpacity('--accent'),
          foreground: withOpacity('--accent-foreground'),
        },
        secondary: {
          DEFAULT: withOpacity('--secondary'),
          foreground: withOpacity('--secondary-foreground'),
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Fluid hero scale — clamps between mobile and desktop without breakpoints.
        'display-sm': ['clamp(2.25rem, 6vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.75rem, 7vw, 4.5rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(3.25rem, 8vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(0 0 0 / 0.06), 0 8px 24px -12px rgb(0 0 0 / 0.25)',
        card: '0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 12px 40px -16px rgb(0 0 0 / 0.45)',
        glow: '0 0 0 1px rgb(var(--accent) / 0.18), 0 18px 60px -20px rgb(var(--accent) / 0.30)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgb(var(--border) / 0.6) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--border) / 0.6) 1px, transparent 1px)',
        'radial-fade': 'radial-gradient(circle at center, rgb(0 0 0 / 0) 0%, rgb(0 0 0 / 0.8) 100%)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'blob-drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(3%, -4%, 0) scale(1.05)' },
          '66%': { transform: 'translate3d(-3%, 3%, 0) scale(0.97)' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease forwards',
        'blob-drift': 'blob-drift 18s ease-in-out infinite',
        'shimmer': 'shimmer 1.8s ease-in-out infinite',
        'spin-slow': 'spin-slow 1.2s linear infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
