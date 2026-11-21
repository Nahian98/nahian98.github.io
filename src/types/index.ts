import type { LucideIcon } from 'lucide-react';

/** A navigable section anchor used by the navbar + scroll-spy. */
export interface NavItem {
  label: string;
  /** DOM id of the target section (without `#`). */
  id: string;
}

/** A social / contact link with an icon. */
export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Short handle/value shown in the contact section. */
  handle?: string;
}

/** A labelled group of skills, e.g. "Networking: Retrofit, OkHttp, …". */
export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  /** Short factual qualifier shown next to the title, e.g. "500K+ downloads". */
  metric?: string;
  description: string;
  highlights: string[];
  tech: string[];
  /** Public-relative screenshot path, e.g. '/images/foo.jpg'. Optional. */
  image?: string;
  imageAlt?: string;
  links: {
    github?: string;
    playStore?: string;
    demo?: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  /** Human-readable period, e.g. "Aug 2023 — Present". */
  period: string;
  location?: string;
  highlights: string[];
  tech: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  location?: string;
}
