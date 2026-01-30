export type CraftMedium = 'image' | 'gif' | 'video' | 'iframe';

export type CraftSize = 'small' | 'medium' | 'large';

export type CraftSource = 'local' | 'dribbble';

export interface CraftProject {
  id: string;
  title: string;
  description: string;
  medium: CraftMedium;
  /** Image/video source (local path or external URL), or iframe embed URL when medium is 'iframe' */
  src: string;
  /** Optional poster image for videos */
  poster?: string;
  tags: string[];
  /** Optional external link to live demo or source */
  link?: string;
  /** ISO date string, e.g. "2025-06-15" */
  date: string;
  /** Controls grid item sizing: small = natural, medium = taller, large = tallest */
  size: CraftSize;
  /** Aspect ratio hint for the media, e.g. "16/9", "1/1", "4/5" */
  aspectRatio?: string;
  /** Data source: 'local' for manually added, 'dribbble' for API-fetched */
  source: CraftSource;
  /** Curated pick — featured items sort to the top of the grid */
  featured?: boolean;
}

/**
 * Local craft projects — for items not on Dribbble (GitHub repos, videos, local experiments).
 * These are merged with Dribbble shots at build time.
 */
export const localCraftProjects: CraftProject[] = [
  // Example entry — replace with your own projects:
  {
    id: 'local-001',
    title: 'Inspiration Laravel Vapor',
    description: '',
    medium: 'video',
    src: '/craft/laravel.mov',
    tags: ['animation'],
    link: 'https://tranquil-sable-4149b6.netlify.app',
    date: '2024-09-01',
    size: 'medium',
    aspectRatio: '16/9',
    source: 'local',
    featured: false,
  },
  {
    id: 'local-002',
    title: 'Bubles',
    description: '',
    medium: 'video',
    src: '/craft/bubles.mov',
    tags: ['animation'],
    link: 'https://animania-o37s.vercel.app',
    date: '2024-08-01',
    size: 'medium',
    aspectRatio: '16/9',
    source: 'local',
    featured: false,
  },
  {
    id: 'local-003',
    title: 'Miro optica',
    description: '',
    medium: 'video',
    src: '/craft/miro.mp4',
    tags: ['animation'],
    link: 'https://github.com/gitguti/-project',
    date: '2023-09-01',
    size: 'medium',
    aspectRatio: '16/9',
    source: 'local',
    featured: false,
  },
  {
    id: 'local-004',
    title: '404 Mario',
    description: '',
    medium: 'video',
    src: '/craft/mario.mp4',
    tags: ['animation'],
    link: 'https://github.com/gitguti/my-project',
    date: '2024-07-01',
    size: 'medium',
    aspectRatio: '16/9',
    source: 'local',
    featured: false,
  },
  {
    id: 'local-005',
    title: 'Universe',
    description: '',
    medium: 'image',
    src: '/craft/universe.jpg',
    tags: ['design'],
    link: 'https://github.com/gitguti/my-project',
    date: '2023-04-01',
    size: 'medium',
    aspectRatio: '1/1',
    source: 'local',
    featured: false,
  },
  {
    id: 'local-006',
    title: 'Landing Page Shepherd',
    description: '',
    medium: 'image',
    src: '/craft/shepherd.png',
    tags: ['design'],
    link: 'https://github.com/gitguti/my-project',
    date: '2023-09-01',
    size: 'medium',
    aspectRatio: '3/2',
    source: 'local',
    featured: false,
  },
  {
    id: 'local-007',
    title: 'Animania Bay',
    description: 'Interactive animation playground.',
    medium: 'iframe',
    src: 'https://animania-bay.vercel.app',
    tags: ['animation'],
    link: 'https://animania-bay.vercel.app',
    date: '2022-06-25',
    size: 'large',
    aspectRatio: '9/16',
    source: 'local',
    featured: false,
  },
];
