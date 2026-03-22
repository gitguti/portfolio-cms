import { useCallback, useEffect, useRef, useState } from 'react';
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
  { href: contactConfig.url, label: contactConfig.cta.nav, icon: HiMail, iconOnly: false },
];

const FILL_SPEED = 900;

export const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const aboutBtnRef = useRef<HTMLButtonElement>(null);
  const aboutFillRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<'idle' | 'burning' | 'done'>('idle');
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  const startFill = useCallback(() => {
    if (phaseRef.current !== 'idle') return;
    const fill = aboutFillRef.current;
    if (!fill) return;

    const isDark = theme === 'dark';
    const fillColor = isDark ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.08)';
    const fillDoneColor = isDark ? '#404040' : '#262626';

    phaseRef.current = 'burning';
    startTimeRef.current = null;
    fill.style.transition = 'none';
    fill.style.background = fillColor;
    fill.style.opacity = '1';
    fill.style.width = '0%';

    const burnStep = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const progress = Math.min((ts - startTimeRef.current) / FILL_SPEED, 1);
      if (fill) fill.style.width = `${progress * 100}%`;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(burnStep);
      } else {
        phaseRef.current = 'done';
        fill.style.background = fillDoneColor;
        if (aboutBtnRef.current) aboutBtnRef.current.style.color = 'white';
      }
    };

    rafRef.current = requestAnimationFrame(burnStep);
  }, [theme]);

  const cancelFill = useCallback(() => {
    if (phaseRef.current === 'idle') return;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    startTimeRef.current = null;
    phaseRef.current = 'idle';

    const fill = aboutFillRef.current;
    if (fill) {
      fill.style.transition = 'width 0.3s ease-out, opacity 0.25s';
      fill.style.width = '0%';
      fill.style.opacity = '0';
    }
    if (aboutBtnRef.current) aboutBtnRef.current.style.color = '';
  }, []);

  const handleAboutClick = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    startTimeRef.current = null;
    phaseRef.current = 'idle';
    const fill = aboutFillRef.current;
    if (fill) {
      fill.style.transition = 'none';
      fill.style.width = '0%';
      fill.style.opacity = '0';
    }
    if (aboutBtnRef.current) aboutBtnRef.current.style.color = '';
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    router.push('/about');
  }, [router]);

  const aboutActive = isActive('/about');

  return (
    <header className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:bottom-auto md:top-6">
      <nav className="relative flex items-center gap-1 rounded-full border border-white/20 bg-white/70 px-2 py-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/60">
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

        {/* About — special fill interaction */}
        <button
          ref={aboutBtnRef}
          onMouseEnter={startFill}
          onMouseLeave={cancelFill}
          onClick={handleAboutClick}
          onTouchStart={e => {
            e.preventDefault();
            handleAboutClick();
          }}
          className={`relative flex items-center gap-2 overflow-hidden rounded-full px-3 py-2 text-sm font-light transition-colors ${
            aboutActive
              ? 'bg-neutral-800 text-white dark:bg-neutral-700 dark:text-white'
              : 'text-neutral-600 dark:text-zinc-400'
          }`}
        >
          <div
            ref={aboutFillRef}
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ width: '0%', opacity: 0 }}
          />
          <HiUser className="relative z-10 h-4 w-4" />
          <span className="relative z-10 hidden sm:inline">About</span>
        </button>

        {/* Toast */}
        <div
          className={`pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-neutral-900 px-4 py-2 text-xs text-neutral-100 transition-all duration-300 md:bottom-auto md:top-[calc(100%+10px)] ${
            showToast
              ? 'translate-y-0 opacity-100'
              : '-translate-y-1.5 opacity-0 md:translate-y-1.5'
          }`}
        >
          oh, you actually clicked — hi 👋
        </div>

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
