import { Github, GitFork, Star, Code2 } from 'lucide-react';
import type { ExperienceItem, Repo, Stat } from '@/types';

/**
 * Career timeline. PLACEHOLDER content — replace roles, companies and periods
 * with your real history.
 */
export const experience: ExperienceItem[] = [
  // {
  //   id: 'senior-android',
  //   role: 'Senior Android Engineer',
  //   company: 'Company Name', // TODO: replace
  //   period: '2023 — Present',
  //   location: 'Remote',
  //   summary:
  //     'Lead Android development for flagship apps, owning architecture, performance and the path to release.',
  //   highlights: [
  //     'Re-architected a legacy app to MVVM + Clean Architecture, cutting crash-free sessions issues significantly',
  //     'Introduced Jetpack Compose incrementally alongside existing XML screens',
  //     'Built an offline-first sync layer with Room and WorkManager',
  //     'Reduced cold-start time and jank through systematic profiling',
  //   ],
  //   tech: ['Kotlin', 'Compose', 'MVVM', 'Coroutines', 'Room'],
  // },
  {
    id: 'android-engineer',
    role: 'Android Engineer',
    company: 'Applab Ltd.', // TODO: replace
    period: '2023 - Present',
    location: 'On-site',
    summary:
      'Delivered feature-rich consumer apps with a focus on media, networking and smooth UX.',
    highlights: [
      'Shipped a media playback module on ExoPlayer with background services',
      'Implemented custom views and complex animations for a branded UI',
      'Integrated REST and real-time networking with OkHttp and Retrofit',
    ],
    tech: ['Kotlin', 'ExoPlayer', 'OkHttp', 'XML UI', 'Flow'],
  },
  // {
  //   id: 'junior-android',
  //   role: 'Android Developer',
  //   company: 'Company Name', // TODO: replace
  //   period: '2020 — 2021',
  //   location: 'On-site',
  //   summary:
  //     'Built and maintained production Android features while leveling up on architecture and testing.',
  //   highlights: [
  //     'Contributed to core features across multiple release cycles',
  //     'Adopted Coroutines and Flow to replace callback-based code',
  //     'Wrote unit tests and improved CI reliability',
  //   ],
  //   tech: ['Kotlin', 'Java', 'MVVM', 'SQLite'],
  // },
];

/** Pinned repositories. PLACEHOLDER — swap for your real repos and stats. */
export const pinnedRepos: Repo[] = [
  {
    name: 'compose-equalizer',
    description: 'A reusable Jetpack Compose audio equalizer component with presets.',
    language: 'Kotlin',
    languageColor: '#A97BFF',
    stars: 0,
    forks: 0,
    href: 'https://github.com/your-username/compose-equalizer',
  },
  {
    name: 'ktor-file-share',
    description: 'Lightweight embedded Ktor server for LAN file transfer on Android.',
    language: 'Kotlin',
    languageColor: '#A97BFF',
    stars: 0,
    forks: 0,
    href: 'https://github.com/your-username/ktor-file-share',
  },
  {
    name: 'android-clean-template',
    description: 'Opinionated multi-module Clean Architecture starter for new Android apps.',
    language: 'Kotlin',
    languageColor: '#A97BFF',
    stars: 0,
    forks: 0,
    href: 'https://github.com/your-username/android-clean-template',
  },
  {
    name: 'flow-extensions',
    description: 'Handy Kotlin Flow operators for offline-first apps.',
    language: 'Kotlin',
    languageColor: '#A97BFF',
    stars: 0,
    forks: 0,
    href: 'https://github.com/your-username/flow-extensions',
  },
];

/** Headline stats. PLACEHOLDER values — update with your real numbers. */
export const openSourceStats: Stat[] = [
  { label: 'Public Repos', value: '20+', icon: Github },
  { label: 'Total Stars', value: '—', icon: Star },
  { label: 'Forks', value: '—', icon: GitFork },
  { label: 'Contributions / yr', value: '500+', icon: Code2 },
];
