import type { EducationItem, ExperienceItem } from '@/types';

/** Career history, most recent first. Mirrors the resume. */
export const experience: ExperienceItem[] = [
  {
    id: 'applab',
    role: 'Software Engineer (Android)',
    company: 'Applab Ltd.',
    period: 'Aug 2023 — Present',
    location: 'Dhaka, Bangladesh',
    highlights: [
      'Own moderately complex features end to end — from technical design through implementation, testing and production release.',
      'Build features on Clean Architecture, MVVM and MVI with Kotlin Coroutines and Flow, keeping UI, domain and data layers separate so business logic stays testable.',
      'Integrate REST APIs and cloud storage SDKs (Google Drive, OneDrive, Dropbox) using Retrofit, Volley, OkHttp and Ktor, including authentication flows.',
      'Developed a media playback module on ExoPlayer / Media3 backed by background services, keeping playback reliable outside the foreground lifecycle.',
      'Debug production issues across UI, data and network layers to isolate root causes; write unit and instrumented tests and review peers’ code.',
    ],
    tech: ['Kotlin', 'Java', 'Coroutines', 'Flow', 'Media3', 'Retrofit', 'OkHttp', 'Ktor', 'Jetpack Compose'],
  },
];

export const education: EducationItem[] = [
  {
    school: 'Khulna University of Engineering & Technology (KUET)',
    degree: 'B.Sc. in Computer Science and Engineering',
    period: '2018 — 2023',
    location: 'Khulna, Bangladesh',
  },
];
