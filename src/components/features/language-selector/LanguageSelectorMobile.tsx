import { LanguageIcon, CloseIcon } from '@contentful/f36-icons';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { AiOutlineMenu } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

import { Portal } from '@src/components/shared/portal';

export const LanguageSelectorMobile = ({ localeName, displayName }) => {
  const { locale, locales } = useRouter();
  const router = useRouter();
  const { t } = useTranslation();
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    const close = e => {
      if (e.key === 'Escape') {
        setShowDrawer(false);
      }
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  });

  return (
    <>
      <button
        title={t('common.languageDrawer')}
        onClick={() => setShowDrawer(currentState => !currentState)}
        aria-expanded={showDrawer}
        aria-controls="locale-drawer"
      >
        <AiOutlineMenu className="text-2xl font-light text-neutral-800 dark:text-zinc-50 md:text-sm" />
      </button>

      <Portal>
        <FocusLock disabled={!showDrawer} returnFocus={true}>
          <div
            role="presentation"
            tabIndex={-1}
            className={twMerge(
              'fixed top-0 left-0 h-full w-full bg-colorBlack/[0.4] transition-opacity duration-150',
              showDrawer ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
            )}
            onClick={() => setShowDrawer(false)}
          />
          <div
            id="locale-drawer"
            aria-modal="true"
            aria-hidden={!showDrawer}
            className={twMerge(
              `fixed top-0 right-0 z-40 h-full w-[100vw] bg-black py-8 px-5 duration-300 ease-in-out`,
              showDrawer ? 'translate-x-0' : 'translate-x-full',
            )}
          >
            <div className="flex items-center">
              {/* <h2 className="text-xl font-semibold  text-zinc-200 dark:text-neutral-800 md:text-sm">{t('common.regionalSettings')}</h2> */}

              <button className="ml-auto pl-2" onClick={() => setShowDrawer(false)}>
                <CloseIcon className="text-2xl font-light text-neutral-800 dark:text-zinc-50 md:text-sm" />
              </button>
            </div>
            {/*
            <p className="mt-8 text-base text-zinc-200 dark:text-neutral-800"> {t('common.language')}</p> */}
            {/* <select
              className="mt-2 block w-full rounded-md py-3 px-2 text-sm bg-neutral-800"
              defaultValue={locale}
              onChange={event => {
                router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
                  locale: String(event.target.value),
                });
                setShowDrawer(!showDrawer);
              }}
            >
              {locales?.map(availableLocale => (
                <option key={availableLocale} value={availableLocale}>
                  {displayName(availableLocale).of(localeName(availableLocale))}
                </option>
              ))}
            </select> */}
            <ul className=" mt-8">
              <Link href="/">
                <li className="mb-12 text-8xl font-semibold text-neutral-50 transition duration-500 ease-in hover:translate-x-12 hover:ease-in">
                  Work
                </li>
              </Link>
              <Link href="/">
                <li className="text-8xl font-semibold text-neutral-50 transition duration-500 ease-in hover:translate-x-12 hover:ease-in">
                  About
                </li>
              </Link>
            </ul>
          </div>
        </FocusLock>
      </Portal>
    </>
  );
};
