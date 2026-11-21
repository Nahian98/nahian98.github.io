import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import type { NavItem, SocialLink } from '@/types';

/**
 * Single source of truth for identity + links.
 *
 * EDIT THESE PLACEHOLDERS:
 * - `name`, `githubUsername`, `linkedin` are placeholders — replace with yours.
 * - `email` is pre-filled. `url` should match your final GitHub Pages URL.
 * - `basePath` is read from the build env (set automatically by CI); leave as-is.
 */
export const siteConfig = {
  name: 'Abdullah Al Nahian Kanon', // TODO: replace with your full name
  shortName: 'NK', // initials for the logo mark / favicon
  role: 'Android Engineer',
  // Used in <title>, OpenGraph, and structured data.
  title: 'Abdullah Al Nahian Kanon — Android Engineer',
  description:
    'Android Engineer crafting fast, reliable and thoughtfully engineered mobile experiences with Kotlin, Jetpack Compose and clean architecture.',
  // Live URL. CI injects this automatically (actions/configure-pages -> base_url)
  // via NEXT_PUBLIC_SITE_URL; the fallback is only used for local builds. TODO:
  // set the fallback to your real URL, e.g. https://username.github.io/MyPortFolio
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-username.github.io/MyPortFolio',
  locale: 'en_US',
  email: 'abdullahalnahiankanon@gmail.com',
  githubUsername: 'Nahian98', // TODO: replace
  links: {
    github: 'https://github.com/Nahian98', // TODO: replace
    linkedin: 'https://www.linkedin.com/in/abdullah-al-nahian-kanon-931594296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', // TODO: replace
  },
  // Path to the resume in /public. Drop a real PDF at this location.
  // `?v=` is a content hash computed in next.config.mjs (cache-busting).
  resumePath: process.env.NEXT_PUBLIC_RESUME_VERSION
    ? `/resume.pdf?v=${process.env.NEXT_PUBLIC_RESUME_VERSION}`
    : '/resume.pdf',
  // Filename the browser saves the resume as when downloaded.
  resumeFileName: 'Abdullah Al Nahian Kanon - Resume.pdf',
  // Profile photo in /public. Drop your image here; until it exists the About
  // section shows a placeholder automatically. JPG/PNG/WebP all work.
  profileImage: '/images/profile.jpg',
  // Keywords for SEO.
  keywords: [
    'Android Developer',
    'Android Engineer',
    'Kotlin',
    'Jetpack Compose',
    'MVVM',
    'Clean Architecture',
    'Coroutines',
    'Flow',
    'Mobile Engineer',
    'ExoPlayer',
    'Media3',
  ],
} as const;

/** Order = scroll order. Each `id` must match a section's DOM id. */
export const navItems: NavItem[] = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Stack', id: 'stack' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Open Source', id: 'open-source' },
  { label: 'Contact', id: 'contact' },
];

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: siteConfig.links.github,
    icon: Github,
    handle: `@${siteConfig.githubUsername}`,
  },
  {
    label: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: Linkedin,
    handle: 'in/your-username',
  },
  {
    label: 'Email',
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    handle: siteConfig.email,
  },
  {
    label: 'Resume',
    href: siteConfig.resumePath,
    icon: FileText,
    handle: 'Download PDF',
  },
];
