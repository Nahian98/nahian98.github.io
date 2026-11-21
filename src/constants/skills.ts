import type { SkillGroup } from '@/types';

/** Technical skills, grouped the same way as on the resume. */
export const skillGroups: SkillGroup[] = [
  { label: 'Languages', items: ['Kotlin', 'Java', 'SQL'] },
  {
    label: 'Architecture',
    items: ['Clean Architecture', 'MVVM', 'MVI', 'Multi-module / feature-first design', 'Dependency injection'],
  },
  {
    label: 'Concurrency & Data',
    items: ['Coroutines', 'Flow / StateFlow', 'Room', 'Realm', 'SQLite', 'MySQL', 'DataStore'],
  },
  {
    label: 'Networking',
    items: ['REST', 'Retrofit', 'OkHttp', 'Volley', 'Ktor', 'WebSockets', 'NanoHTTPD', 'FTPS', 'Cloud storage SDKs'],
  },
  {
    label: 'Platform',
    items: ['Android SDK', 'Jetpack Compose', 'XML Views', 'Services & background work', 'Media3 / ExoPlayer'],
  },
  {
    label: 'Testing',
    items: ['JUnit', 'MockK', 'Turbine', 'Coroutines Test', 'Instrumented tests', 'Android Lint'],
  },
  {
    label: 'Tooling',
    items: ['Git', 'GitHub Actions CI/CD', 'Gradle (Kotlin DSL, convention plugins, version catalogs)'],
  },
];
