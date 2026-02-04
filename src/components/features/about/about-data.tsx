import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { TbBrandGithubFilled } from 'react-icons/tb';
import { MdEmail } from 'react-icons/md';

// Social Links (for Hero section)
export const socialLinks = [
  {
    href: 'http://github.com/gitguti',
    label: 'GitHub',
    icon: <TbBrandGithubFilled className="h-5 w-5" />,
  },
  {
    href: 'https://www.linkedin.com/in/gitguti/',
    label: 'LinkedIn',
    icon: <FaLinkedinIn className="h-5 w-5" />,
  },
  {
    href: 'https://twitter.com/whynotgit',
    label: 'Twitter',
    icon: <FaTwitter className="h-5 w-5" />,
  },
  {
    href: 'mailto:gitmelgutierrez@gmail.com',
    label: 'Email',
    icon: <MdEmail className="h-5 w-5" />,
  },
];

// Contact Configuration
export const contactConfig = {
  url: 'mailto:gitmelgutierrez@gmail.com',
  cta: {
    home: 'Say hello',
    about: 'Send me an email',
    nav: 'Contact',
  },
};

// Hero Data
export const heroData = {
  name: 'git',
  tagline: 'Designer and builder making complex workflows simple, automated, and usable.',
  avatarPath: '/avatar.png',
};

// About Content
export const aboutContent = {
  title: 'About',
  paragraphs: [
    'I’m a Product Designer and Design Engineer from Puerto Cabello, Venezuela. I design and build products that turn complex workflows into simple, automated, and usable experiences—bringing efficiency into everyday work.',
    'My career has been beautifully non-linear: programming → frontend → UI → UX → product design → full-stack vibecoder (product + code). These paths always converge. I naturally think in systems, zooming out to make sense of complexity and zooming in to create clarity.',
    'I’m deeply interested in health and psychology, and in how habits, behavior, and context shape the way people interact with products—and with themselves.',
  ],
};

// Now Section Data (easy to update regularly)
export const nowData = {
  lastUpdated: '2025-01-30', // UPDATE THIS REGULARLY - This page is updated regularly
  currentProject:
    "Working with my husband on NutriFood—a family meal planning system that's proactive, not reactive. It considers each individual's nutritional goals (macros) and makes healthy eating actually sustainable.",
  learning: [
    'Product adoption and behavior change',
    'Data-driven workflows, automation, and AI-assisted systems',
    'Health, nutrition, and metabolic science',
    'Psychology, habits, and identity-based change',
    'Designing calm and sustainable systems for myself',
  ],
  approach: 'My approach: ship fast, design with data, AI as an enabler, focus on real adoption.',
  sideProjectsNote: 'Check out my',
  sideProjectsLink: '/vibes',
  sideProjectsLinkText: 'vibes page',
};

// Beliefs (easy to add/remove)
export const beliefs = [
  '  Failing early is urgent',
  'Bias toward shipping',
  'We are all a work in progress',
  'Inspiration exists, but it has to find you working (Picasso)',
  'Perfection is the enemy of progress (Voltaire)',
  'There is nothing more beautiful than authenticity',
];
