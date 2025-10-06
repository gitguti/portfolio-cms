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
    <header className=" fixed top-0 z-10 w-full py-5 px-2 md:px-12">
      <nav>
        <Container className="flex items-center justify-between">
          <Link href="/" title={t('common.homepage')}>
            {/* <BlogLogo /> */}
            <h4 className="text-xl font-light text-neutral-800 dark:text-zinc-50 md:text-sm">
              git
            </h4>
          </Link>
          {/* <LanguageSelector /> */}

          <div className="flex h-fit gap-4">
            <a
              href="http://github.com/gitguti"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <div className="dark:bg-neutral-950 flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-800 bg-neutral-800 transition duration-500 ease-in hover:-translate-y-3 hover:ease-in">
                <TbBrandGithubFilled className="h-4 w-4" color="white" />
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/gitguti/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <div className="dark:bg-neutral-950 flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-800 bg-neutral-800 transition duration-500 ease-in hover:-translate-y-3 hover:ease-in">
                <FaLinkedinIn className="h-4 w-4" fill="white" />
              </div>
            </a>
            <a
              href="https://twitter.com/whynotgit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dribbble"
            >
              <div className="dark:bg-neutral-950 flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-800 bg-neutral-800 transition duration-500 ease-in hover:-translate-y-3 hover:ease-in">
                <FaTwitter className="h-4 w-4" fill="white" />
              </div>
            </a>
            <a
              href="https://dribbble.com/gitguti"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dribbble"
            >
              <div className="dark:bg-neutral-950 flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-800 bg-neutral-800 transition duration-500 ease-in hover:-translate-y-3 hover:ease-in">
                <TbBrandDribbbleFilled className="h-4 w-4 " color="white" />
              </div>
            </a>
            <a
              href="mailto:gitmelgutierrez@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <div className="dark:bg-neutral-950 flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-800 bg-neutral-800 transition duration-500 ease-in hover:-translate-y-3 hover:ease-in">
                <MdEmail className="h-4 w-4" fill="white" />
              </div>
            </a>
          </div>
        </Container>
      </nav>
    </header>
  );
};
