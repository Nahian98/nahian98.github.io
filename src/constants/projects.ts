import type { Project } from '@/types';

/**
 * Project case studies. Replace links with real URLs and drop matching
 * screenshots into /public/images (see `imageAlt` for what each should show).
 */
export const projects: Project[] = [
  {
    id: 'offline-music-player',
    title: 'Offline Music Player',
    tagline: 'A gapless, offline-first player with a real-time equalizer.',
    description:
      'A polished media player built on Media3/ExoPlayer with a custom audio pipeline. Designed offline-first: the entire library, playback queue and lyrics work with zero connectivity, and playback continues seamlessly in the background with a rich media notification and lock-screen controls. Published on Google Play, where it has crossed 100K+ downloads worldwide.',
    tags: ['Media', 'Offline-first', 'Compose'],
    features: [
      'Media3 / ExoPlayer playback engine with gapless transitions',
      '10-band graphic equalizer with presets and live preview',
      'Foreground service for reliable background playback',
      'Synchronized, scrolling lyrics view',
      'Realm database for fast local library indexing',
      'Material You dynamic theming',
    ],
    tech: ['Kotlin', 'Media3', 'ExoPlayer', 'Realm', 'Compose', 'Coroutines'],
    image: '/images/offlineMusicPlayer.jpg',
    imageAlt: 'Offline Music Player — now-playing screen with album art, equalizer and lyrics.',
    downloads: '100K+',
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.offlinemusicplayer&hl=en',
      caseStudy: '#',
    },
    accent: 'green',
    featured: true,
  },
  {
    id: 'entrix',
    title: 'Entrix',
    tagline: 'Privacy-first, offline attendance tracking powered by geofencing.',
    description:
      'A privacy-first Android app that automatically logs office entry and exit using the Geofencing API — no account, no cloud, no analytics, everything stays on-device. Built as a showcase of production-grade modern Android engineering: a feature-first, multi-module Clean Architecture with a pure-JVM, framework-independent domain layer that is fully unit-tested. A deliberate ENTER → DWELL → EXIT reconciliation policy ignores boundary jitter and brief drive-bys while still recording the true entry time, and geofences are restored after device reboot — all with no continuous polling or foreground service.',
    tags: ['Location', 'Offline-first', 'Architecture'],
    features: [
      'Automatic, battery-friendly entry/exit detection via the Geofencing API (no polling, no foreground service)',
      'Feature-first multi-module Clean Architecture with a pure-JVM, unit-tested domain',
      'ENTER → DWELL → EXIT reconciliation that ignores jitter yet keeps the real entry time',
      '100% local & private — no account, network or tracking anywhere in the dependency graph',
      'Material 3 UI with dynamic color, light/dark themes; geofences restored after reboot',
      'Gradle convention plugins (build-logic), 24 JVM unit tests + an instrumented Room DAO test',
    ],
    tech: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Koin', 'Room', 'DataStore', 'Coroutines', 'Geofencing'],
    image: '/images/entrix.jpg',
    imageAlt:
      'Entrix — dashboard, attendance history and settings screens in Material 3 dark theme.',
    links: {
      github: 'https://github.com/Nahian98/Entrix',
      caseStudy: '#',
    },
    accent: 'violet',
    featured: true,
  },
  // {
  //   id: 'wifi-file-sharing',
  //   title: 'WiFi File Sharing App',
  //   tagline: 'Cross-platform, high-speed transfers with no internet required.',
  //   description:
  //     'A device-to-device file transfer app that spins up a local Ktor server and shares over a hotspot or local network. A scannable QR code pairs devices instantly, and the web fallback makes it interoperable with iOS and desktop — no app required on the receiving end.',
  //   tags: ['Networking', 'Ktor', 'Offline-first'],
  //   features: [
  //     'Embedded Ktor server for LAN/hotspot transfers',
  //     'QR-code pairing for instant device discovery',
  //     'Cross-platform receiving via browser (iOS / desktop compatible)',
  //     'Chunked, resumable high-speed transfers',
  //     'Hotspot management and connection lifecycle handling',
  //   ],
  //   tech: ['Kotlin', 'Ktor', 'OkHttp', 'Coroutines', 'Compose'],
  //   imageAlt:
  //     'PLACEHOLDER: Screenshot of the file-sharing app showing a QR pairing code and an in-progress transfer with speed graph.',
  //   links: {
  //     github: 'https://github.com/your-username/wifi-file-sharing',
  //     demo: '',
  //     caseStudy: '#',
  //   },
  //   accent: 'blue',
  //   featured: true,
  // },
];

/** Domain tags used by the project filter (derived + deduped from projects). */
export const projectFilters = [
  'All',
  ...Array.from(new Set(projects.flatMap((p) => p.tags))),
];
