import type { LucideIcon } from 'lucide-react';

/** A navigable section anchor used by the navbar + scroll-spy. */
export interface NavItem {
  /** Label shown in the navbar. */
  label: string;
  /** DOM id of the target section (without `#`). */
  id: string;
}

/** A social / contact link with an icon. */
export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Short handle/value shown in the contact section (e.g. "@username"). */
  handle?: string;
}

/** A grouped set of skills rendered as a card. */
export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  /** Short blurb describing the category's focus. */
  description: string;
  skills: string[];
}

/** A single technology chip in the tech-stack marquee/grid. */
export interface TechItem {
  name: string;
  /** Logical grouping used for optional filtering. */
  category: 'Language' | 'UI' | 'Async' | 'Data' | 'Network' | 'Media' | 'Tooling';
}

/** A portfolio project card with expandable case-study details. */
export interface Project {
  id: string;
  title: string;
  /** One-line tagline shown on the collapsed card. */
  tagline: string;
  /** Longer description revealed when expanded. */
  description: string;
  /** Primary domain tags used for filtering. */
  tags: string[];
  /** Bullet features for the expanded detail panel. */
  features: string[];
  tech: string[];
  /** Public-relative screenshot path, e.g. '/images/foo.jpg'. Falls back to a
   *  labeled placeholder when omitted or the file fails to load. */
  image?: string;
  /** Alt text describing the screenshot (used for the <img> alt + placeholder). */
  imageAlt: string;
  /** Headline traction, e.g. '100K+' — shown as a highlighted downloads badge. */
  downloads?: string;
  links: {
    github?: string;
    demo?: string;
    playStore?: string;
    caseStudy?: string;
  };
  /** Accent used for the card's gradient header. */
  accent: 'green' | 'blue' | 'violet' | 'amber';
  featured?: boolean;
}

/** A role in the experience timeline. */
export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  /** Human-readable period, e.g. "2022 — Present". */
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

/** A pinned/open-source repository card. */
export interface Repo {
  name: string;
  description: string;
  language: string;
  /** Hex color associated with the language dot. */
  languageColor: string;
  stars: number;
  forks: number;
  href: string;
}

/** A headline statistic shown in the open-source section. */
export interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
}
