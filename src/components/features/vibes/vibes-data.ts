export interface VibesProject {
  id: string;
  title: string;
  description: string;
  /** Optional backstory — why you built it, the rabbit hole that led here */
  story?: string;
  /** URL for the live iframe preview */
  previewUrl: string;
  /** Tech stack used */
  stack: string[];
  /** GitHub repository URL */
  githubUrl: string;
  /** Deployed project URL */
  liveUrl: string;
}

export const vibesProjects: VibesProject[] = [
  {
    id: 'vibe-004',
    title: 'Animania Bay',
    description: 'Part of a pure css course animation',
    story: 'Started as a "what if I animate 200 divs at once" experiment at 2am. It spiraled.',
    previewUrl: 'https://animania-bay.vercel.app',
    stack: ['CSS'],
    githubUrl: 'https://github.com/gitguti/animania-bay',
    liveUrl: 'https://animania-bay.vercel.app',
  },
  {
    id: 'vibe-003',
    title: 'Bubbles',
    description: 'An experiment with spline interactions',
    story:
      'I was learning about particle systems and wanted to build something you could just... poke.',
    previewUrl: 'https://animania-o37s.vercel.app',
    stack: ['Spline'],
    githubUrl: 'https://github.com/gitguti/animania',
    liveUrl: 'https://animania-o37s.vercel.app',
  },
  {
    id: 'vibe-002',
    title: 'Laravel Vapor Landing',
    description:
      'Inspired by the Laravel Vapor official landing page, I did my version with spline',
    previewUrl: 'https://tranquil-sable-4149b6.netlify.app',
    stack: ['Spline'],
    githubUrl: 'https://github.com/gitguti/laravel-vapor-landing',
    liveUrl: 'https://tranquil-sable-4149b6.netlify.app',
  },
  {
    id: 'vibe-001',
    title: 'Charts generator',
    description: 'Charts based on own design system and customizable',
    previewUrl: 'https://chart-charming-craft.lovable.app',
    stack: ['Lovable'],
    githubUrl: 'https://github.com/gitguti/chart-weaver?tab=readme-ov-file',
    liveUrl: 'https://chart-charming-craft.lovable.app',
  },
];
