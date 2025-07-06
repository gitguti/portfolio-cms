import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { Container } from '@src/components/shared/container';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="dark:bg-neutral-950 fixed bottom-0 z-10 w-full bg-gray-50 py-2 px-2 md:px-1">
      <Container className="flex items-center justify-center">
        <div className=" text-xs text-neutral-800 dark:text-neutral-500">
          © Git / Made with ❤️ in Next / 2025
        </div>
      </Container>
    </footer>
  );
};
