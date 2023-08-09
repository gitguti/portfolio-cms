import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import BlogLogo from '@icons/blog-logo.svg';
import { LanguageSelector } from '@src/components/features/language-selector';
import { Container } from '@src/components/shared/container';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 z-50 w-full py-5 px-12">
      <nav>
        <Container className="flex items-center justify-between">
          <Link href="/" title={t('common.homepage')}>
            {/* <BlogLogo /> */}
            <h4 className="font-light text-neutral-800 dark:text-zinc-50">gitmel gutierrez</h4>
          </Link>
          <LanguageSelector />
        </Container>
      </nav>
    </header>
  );
};
