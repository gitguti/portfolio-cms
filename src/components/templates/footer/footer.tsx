import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { Container } from '@src/components/shared/container';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="fixed bottom-0 z-10 w-full py-2 px-2 md:px-1">
      <Container className="flex items-center justify-end">
        <div className=" text-xs text-neutral-800 dark:text-neutral-500">
          © Gitmel Gutierrez / Hecho con ❤️ en Next / 2023
        </div>
      </Container>
    </footer>
  );
};
