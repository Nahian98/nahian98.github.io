import type { Project } from '@/types';

/** Selected projects. Screenshots live in /public/images. */
export const projects: Project[] = [
  {
    id: 'offline-music-player',
    title: 'Offline Music Player',
    metric: '500K+ downloads on Google Play',
    description:
      'An offline-first music player published on Google Play. Built on MVVM with Realm for the local library, and a UI in XML Views and Jetpack Compose.',
    highlights: [
      'Background playback with Media3 / ExoPlayer, a foreground service and lock-screen media controls.',
      'Cloud music sync from Google Drive, OneDrive, Dropbox and Box to local storage via Volley and OkHttp.',
    ],
    tech: ['Kotlin', 'Media3', 'ExoPlayer', 'Realm', 'MVVM', 'Jetpack Compose'],
    image: '/images/offline-music-player.jpg',
    imageAlt: 'Offline Music Player — Now Playing, Equalizer and cloud Import screens.',
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.offlinemusicplayer',
    },
  },
  {
    id: 'entrix',
    title: 'Entrix',
    metric: 'Open source',
    description:
      'A privacy-first Android app that records when you enter and leave your offices using the Geofencing API, then turns those visits into history, weekly and monthly reports, and PDF timesheets. No account or analytics; attendance data never leaves the device.',
    highlights: [
      '17-module, feature-first Clean Architecture with pure Kotlin/JVM domain and model modules, Koin DI and Gradle convention plugins.',
      'Idempotent ENTER → DWELL → EXIT geofence reconciliation that ignores boundary jitter, keeps the true entry time across process death, and reopens a visit after a false exit within a 10-minute grace period.',
      'Multiple offices placed on a Google Maps picker; reports with an interactive bar chart; on-device PDF timesheet export with no third-party libraries.',
      '93 JVM unit tests, instrumented Room DAO and migration tests, and a Koin graph check; GitHub Actions runs tests, lint and release builds.',
    ],
    tech: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Koin', 'Room', 'DataStore', 'Geofencing API', 'Google Maps', 'Gradle convention plugins'],
    image: '/images/entrix.jpg',
    imageAlt: 'Entrix — home, history and weekly report screens in dark theme.',
    links: {
      github: 'https://github.com/Nahian98/Entrix',
    },
  },
  {
    id: 'file-server',
    title: 'File-Server',
    metric: 'Prototype',
    description:
      'An offline device-to-device file-sharing prototype for Android and iOS, built to compare transport options for local transfers.',
    highlights: [
      'Evaluated five transports: a socket-level HTTP server, NanoHTTPD, embedded Ktor (Netty), WebSockets and FTPS.',
      'Local networking via Local-Only Hotspot and Wi-Fi Direct, with QR-code pairing and upload progress tracking.',
    ],
    tech: ['Kotlin', 'Ktor', 'NanoHTTPD', 'WebSockets', 'FTPS', 'Wi-Fi Direct'],
    links: {
      github: 'https://github.com/Nahian98/File-Server',
    },
  },
];
