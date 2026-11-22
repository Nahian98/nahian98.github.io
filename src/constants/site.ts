import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import type { NavItem, SocialLink } from '@/types';

/**
 * Single source of truth for identity + links. Keep this in sync with the
 * resume in public/resume.pdf.
 */
export const siteConfig = {
  name: 'Abdullah Al Nahian Kanon',
  shortName: 'NK',
  role: 'Software Engineer, Android',
  location: 'Dhaka, Bangladesh',
  // Used in <title>, OpenGraph, and structured data.
  title: 'Abdullah Al Nahian Kanon — Software Engineer, Android',
  description:
    'Software Engineer with 3+ years of experience building production Android apps in Kotlin. Clean Architecture, Jetpack Compose, networking and media. Shipped a Google Play app with 500K+ downloads.',
  // CI injects the live URL (actions/configure-pages -> base_url).
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nahian98.github.io',
  locale: 'en_US',
  email: 'abdullahalnahiankanon@gmail.com',
  githubUsername: 'Nahian98',
  links: {
    github: 'https://github.com/Nahian98',
    linkedin: 'https://www.linkedin.com/in/abdullah-al-nahian-kanon-931594296',
  },
  // `?v=` is a content hash computed in next.config.mjs (cache-busting).
  resumePath: process.env.NEXT_PUBLIC_RESUME_VERSION
    ? `/resume.pdf?v=${process.env.NEXT_PUBLIC_RESUME_VERSION}`
    : '/resume.pdf',
  resumeFileName: 'Abdullah Al Nahian Kanon - Resume.pdf',
  profileImage: '/images/profile.jpg',
  keywords: [
    'Android Engineer',
    'Software Engineer',
    'Kotlin',
    'Jetpack Compose',
    'Clean Architecture',
    'MVVM',
    'MVI',
    'Coroutines',
    'Flow',
    'Media3',
    'ExoPlayer',
    'Ktor',
  ],
} as const;

/** Order = scroll order. Each `id` must match a section's DOM id. */
export const navItems: NavItem[] = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: siteConfig.links.github,
    icon: Github,
    handle: `github.com/${siteConfig.githubUsername}`,
  },
  {
    label: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: Linkedin,
    handle: 'linkedin.com/in/abdullah-al-nahian-kanon',
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
    handle: 'PDF',
  },
];

/** Headline numbers in the hero. Every figure here must be verifiable. */
export const stats: { value: string; label: string }[] = [
  { value: '3+', label: 'Years shipping Android professionally' },
  { value: '500K+', label: 'Downloads on Google Play' },
  { value: '17', label: 'Modules in a Clean Architecture app' },
  { value: '93', label: 'JVM unit tests in one open-source project' },
];
