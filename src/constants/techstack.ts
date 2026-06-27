import type { TechItem } from '@/types';

/** Flat technology list rendered as chips; `category` powers optional filters. */
export const techStack: TechItem[] = [
  { name: 'Kotlin', category: 'Language' },
  { name: 'Java', category: 'Language' },
  { name: 'Jetpack Compose', category: 'UI' },
  { name: 'XML', category: 'UI' },
  { name: 'Material Design', category: 'UI' },
  { name: 'Android Studio', category: 'Tooling' },
  { name: 'Coroutines', category: 'Async' },
  { name: 'Flow', category: 'Async' },
  { name: 'Room', category: 'Data' },
  { name: 'Realm', category: 'Data' },
  { name: 'SQLite', category: 'Data' },
  { name: 'DataStore', category: 'Data' },
  { name: 'Retrofit', category: 'Network' },
  { name: 'OkHttp', category: 'Network' },
  { name: 'Ktor', category: 'Network' },
  { name: 'Media3', category: 'Media' },
  { name: 'ExoPlayer', category: 'Media' },
  { name: 'Firebase', category: 'Tooling' },
  { name: 'Git', category: 'Tooling' },
  { name: 'GitHub Actions', category: 'Tooling' },
  { name: 'Gradle', category: 'Tooling' },
];

export const techCategories = [
  'All',
  'Language',
  'UI',
  'Async',
  'Data',
  'Network',
  'Media',
  'Tooling',
] as const;
