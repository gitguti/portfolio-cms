import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { TbBrandGithubFilled, TbBrandDribbbleFilled } from 'react-icons/tb';
import { MdEmail } from 'react-icons/md';
// import { LanguageSelector } from '@src/components/features/language-selector';
import { Container } from '@src/components/shared/container';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className=" fixed top-0 z-50 w-full px-2 py-5 md:px-12">
      <nav>
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" title={t('common.homepage')}>
              {/* <BlogLogo /> */}
              <h4 className="text-xl font-light text-neutral-800 md:text-sm dark:text-zinc-50">
                git
              </h4>
            </Link>
            <Link
              href="/blog"
              className="text-sm font-light text-neutral-600 transition-colors hover:text-neutral-800 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Blog
            </Link>
            <Link
              href="/craft"
              className="text-sm font-light text-neutral-600 transition-colors hover:text-neutral-800 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Craft
            </Link>
          </div>
          {/* <LanguageSelector /> */}

          <div className="flex h-fit gap-4">
            <a
              href="http://github.com/gitguti"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-800 bg-neutral-800 transition duration-500 ease-in hover:-translate-y-3 hover:ease-in dark:bg-neutral-950">
                <TbBrandGithubFilled className="h-4 w-4" color="white" />
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/gitguti/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-800 bg-neutral-800 transition duration-500 ease-in hover:-translate-y-3 hover:ease-in dark:bg-neutral-950">
                <FaLinkedinIn className="h-4 w-4" fill="white" />
              </div>
            </a>
            <a
              href="https://twitter.com/whynotgit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dribbble"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-800 bg-neutral-800 transition duration-500 ease-in hover:-translate-y-3 hover:ease-in dark:bg-neutral-950">
                <FaTwitter className="h-4 w-4" fill="white" />
              </div>
            </a>
            <a
              href="https://dribbble.com/gitguti"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dribbble"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-800 bg-neutral-800 transition duration-500 ease-in hover:-translate-y-3 hover:ease-in dark:bg-neutral-950">
                <TbBrandDribbbleFilled className="h-4 w-4 " color="white" />
              </div>
            </a>
            <a
              href="mailto:gitmelgutierrez@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-800 bg-neutral-800 transition duration-500 ease-in hover:-translate-y-3 hover:ease-in dark:bg-neutral-950">
                <MdEmail className="h-4 w-4" fill="white" />
              </div>
            </a>
          </div>
        </Container>
      </nav>
    </header>
  );
};
