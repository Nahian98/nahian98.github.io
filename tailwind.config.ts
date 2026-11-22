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
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '72rem',
        prose: '68ch',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
        ping: {
          '75%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        blink: 'blink 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
};

export default config;
