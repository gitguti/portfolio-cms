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
    id: 'building-001',
    title: 'Fridge',
    description: 'Your grocery bill, decoded by macros',
    story:
      "Scan a receipt, fill your digital fridge. Build dishes and instantly see their macro contribution and exact cost per meal — because eating well shouldn't be a mystery.",
    previewUrl: '',
    stack: ['Lovable', 'Supabase', 'OCR'],
    githubUrl: '',
    liveUrl: '',
  },
  {
    id: 'building-dock',
    title: 'Balance & Misura',
    description: 'Two apps, one obsession: less friction between intention and action',
    story:
      'Balance is a voice-first iPad assistant — calendar, journaling, shopping lists, all by voice, powered by Claude API. Misura is meal planning that adapts to your macros: add a recipe, calibrate it to your goals, share the cart.',
    previewUrl: '',
    stack: ['Claude API', 'Gemini 2.5', 'Next.js', 'Supabase', 'Notion'],
    githubUrl: '',
    liveUrl: '',
  },
  {
    id: 'building-004',
    title: 'M.app',
    description: 'Body data meets progressive overload',
    story:
      'Track measurements, body composition and training load over time. Log progressive overload per exercise. Next step: smartwatch integration.',
    previewUrl: '',
    stack: ['Lovable', 'Supabase'],
    githubUrl: '',
    liveUrl: '',
  },
];
