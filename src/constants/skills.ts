import {
  Smartphone,
  Code2,
  Layers,
  Network,
  Database,
  Workflow,
  Wrench,
  Gauge,
} from 'lucide-react';
import type { SkillCategory } from '@/types';

/** Grouped skill categories rendered as hover-animated cards. */
export const skillCategories: SkillCategory[] = [
  {
    title: 'Android',
    icon: Smartphone,
    description: 'Native platform depth, from SDK internals to background work.',
    skills: [
      'Native Android',
      'Android SDK',
      'Background Services',
      'Offline-first',
      'Custom Views',
      'Material Design',
    ],
  },
  {
    title: 'Kotlin',
    icon: Code2,
    description: 'Idiomatic, expressive Kotlin with a focus on correctness.',
    skills: ['Kotlin', 'Coroutines', 'Flow', 'Sealed Types', 'Extensions', 'Null-safety'],
  },
  {
    title: 'UI / Compose',
    icon: Layers,
    description: 'Declarative and classic UI with pixel-level polish.',
    skills: ['Jetpack Compose', 'XML UI', 'Animations', 'Theming', 'Accessibility'],
  },
  {
    title: 'Architecture',
    icon: Workflow,
    description: 'Scalable, testable foundations that survive feature growth.',
    skills: ['MVVM', 'Clean Architecture', 'Modularization', 'Dependency Injection', 'Use Cases'],
  },
  {
    title: 'Networking',
    icon: Network,
    description: 'Resilient I/O, custom servers and device-to-device transfer.',
    skills: ['Ktor', 'OkHttp', 'Retrofit', 'WebSockets', 'File Sharing'],
  },
  {
    title: 'Databases',
    icon: Database,
    description: 'Local persistence with offline-first sync strategies.',
    skills: ['Room', 'Realm', 'SQLite', 'DataStore', 'Caching'],
  },
  {
    title: 'Media & Performance',
    icon: Gauge,
    description: 'Smooth playback and a relentless eye on frame budgets.',
    skills: ['Media3', 'ExoPlayer', 'Performance Tuning', 'Profiling', 'Memory'],
  },
  {
    title: 'Tooling & DevOps',
    icon: Wrench,
    description: 'A fast, automated path from commit to production.',
    skills: ['Gradle', 'Git', 'GitHub Actions', 'Firebase', 'CI/CD'],
  },
];
