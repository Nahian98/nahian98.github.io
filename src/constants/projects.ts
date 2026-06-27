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
  // {
  //   id: 'geo-attendance',
  //   title: 'Geo Attendance Tracker',
  //   tagline: 'Automatic office check-ins powered by geofencing.',
  //   description:
  //     'A workforce attendance app that logs office entry and exit automatically using geofences — no manual punch-in. Location history is captured efficiently in the background and presented as a clean timeline, with full offline support and deferred sync.',
  //   tags: ['Location', 'Offline-first', 'Background'],
  //   features: [
  //     'Geofencing-based automatic entry/exit logging',
  //     'Battery-conscious background location tracking',
  //     'Visual timeline of location history',
  //     'Offline support with deferred sync',
  //     'Room-backed local store of attendance events',
  //   ],
  //   tech: ['Kotlin', 'Geofencing API', 'Room', 'Coroutines', 'WorkManager'],
  //   imageAlt:
  //     'PLACEHOLDER: Screenshot of the attendance app showing a daily timeline of office entries and a map with geofence radius.',
  //   links: {
  //     github: 'https://github.com/your-username/geo-attendance',
  //     demo: '',
  //     caseStudy: '#',
  //   },
  //   accent: 'violet',
  //   featured: false,
  // },
];

/** Domain tags used by the project filter (derived + deduped from projects). */
export const projectFilters = [
  'All',
  ...Array.from(new Set(projects.flatMap((p) => p.tags))),
];
