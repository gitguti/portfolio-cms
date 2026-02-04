import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  HiHome,
  HiBookOpen,
  HiViewGrid,
  HiSparkles,
  HiSun,
  HiMoon,
  HiUser,
  HiMail,
} from 'react-icons/hi';
import { contactConfig } from '@src/components/features/about/about-data';

const navLinks = [
  { href: '/', label: 'Home', icon: HiHome, iconOnly: true },
  { href: '/blog', label: 'Blog', icon: HiBookOpen, iconOnly: false },
  { href: '/craft', label: 'Craft', icon: HiViewGrid, iconOnly: false },
  { href: '/vibes', label: 'Vibes', icon: HiSparkles, iconOnly: false },
  { href: '/about', label: 'About', icon: HiUser, iconOnly: false },
  { href: contactConfig.url, label: contactConfig.cta.nav, icon: HiMail, iconOnly: false },
];

export const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <header className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:bottom-auto md:top-6">
      <nav className="flex items-center gap-1 rounded-full border border-white/20 bg-white/70 px-2 py-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/60">
        {navLinks.map(link => {
          const Icon = link.icon;
          const active = isActive(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-light transition-all ${
                active
                  ? 'bg-neutral-800 text-white dark:bg-neutral-700 dark:text-white'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 dark:text-zinc-400 dark:hover:bg-neutral-800 dark:hover:text-zinc-50'
              } ${link.iconOnly ? 'px-2.5' : ''}`}
            >
              <Icon className="h-4 w-4" />
              {!link.iconOnly && <span className="hidden sm:inline">{link.label}</span>}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-neutral-300 dark:bg-neutral-700" />

        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center justify-center rounded-full px-2.5 py-2 text-neutral-600 transition-all hover:bg-neutral-100 hover:text-neutral-800 dark:text-zinc-400 dark:hover:bg-neutral-800 dark:hover:text-zinc-50"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <HiSun className="h-4 w-4" /> : <HiMoon className="h-4 w-4" />}
          </button>
        )}
      </nav>
    </header>
  );
};
