import { useTranslation } from 'next-i18next';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { TbBrandGithubFilled, TbBrandDribbbleFilled } from 'react-icons/tb';
import { MdEmail } from 'react-icons/md';

import { Container } from '@src/components/shared/container';

const socialLinks = [
  {
    href: 'http://github.com/gitguti',
    label: 'GitHub',
    icon: <TbBrandGithubFilled className="h-4 w-4" />,
  },
  {
    href: 'https://www.linkedin.com/in/gitguti/',
    label: 'LinkedIn',
    icon: <FaLinkedinIn className="h-4 w-4" />,
  },
  {
    href: 'https://twitter.com/whynotgit',
    label: 'Twitter',
    icon: <FaTwitter className="h-4 w-4" />,
  },
  {
    href: 'https://dribbble.com/gitguti',
    label: 'Dribbble',
    icon: <TbBrandDribbbleFilled className="h-4 w-4" />,
  },
  {
    href: 'mailto:gitmelgutierrez@gmail.com',
    label: 'Email',
    icon: <MdEmail className="h-4 w-4" />,
  },
];

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-gray-50 px-2 py-6 pb-20 dark:bg-neutral-950 md:px-1 md:pb-6">
      <Container className="flex flex-col items-center justify-center gap-4">
        <div className="flex gap-4">
          {socialLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition-colors hover:border-neutral-800 hover:bg-neutral-800 hover:text-white dark:border-neutral-700 dark:text-zinc-400 dark:hover:border-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-white">
                {link.icon}
              </div>
            </a>
          ))}
        </div>
        <div className="text-xs text-neutral-800 dark:text-neutral-500">
          © Git / Made with ❤️ in Next / 2026
        </div>
      </Container>
    </footer>
  );
};
