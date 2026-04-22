import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
  HiHome,
  HiBriefcase,
  HiCode,
  HiLightningBolt,
  HiViewGrid,
  HiSun,
  HiMoon,
  HiUser,
} from 'react-icons/hi';
import { contactConfig } from '@src/components/features/about/about-data';
import { useActiveSection } from '@src/lib/hooks/useActiveSection';

const SECTION_IDS = ['hero', 'work', 'building', 'hacks'];

// Links that scroll to feed sections on the homepage
const feedLinks = [
  { id: 'hero', label: 'Home', icon: HiHome },
  { id: 'work', label: 'Work', icon: HiBriefcase },
  { id: 'building', label: 'Building', icon: HiCode },
  { id: 'hacks', label: 'Hacks', icon: HiLightningBolt },
];

// Link that always navigates to a page route
const craftLink = { href: '/craft', label: 'Craft', icon: HiViewGrid };

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

  // Only use IntersectionObserver-based active section on the homepage
  const isHomePage = router.pathname === '/';
  const activeSection = useActiveSection(isHomePage ? SECTION_IDS : []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (!isHomePage) {
        // Navigate to homepage then scroll — let the browser follow the href (/#id)
        return;
      }
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    },
    [isHomePage],
  );

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

  const aboutActive = router.pathname === '/about';

  return (
    <header className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:bottom-auto md:top-6">
      <nav className="relative flex items-center gap-1 rounded-full border border-white/20 bg-white/70 px-2 py-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/60">
        {feedLinks.map(link => {
          const Icon = link.icon;
          // Active on homepage: driven by IntersectionObserver
          // Active on other pages: only "Feed" (home icon) can loosely indicate homepage
          const isActive = isHomePage ? activeSection === link.id : false;

          return (
            <a
              key={link.id}
              href={isHomePage ? `#${link.id}` : `/#${link.id}`}
              onClick={e => handleAnchorClick(e, link.id)}
              className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-light transition-all ${
                isActive
                  ? 'bg-neutral-800 text-white dark:bg-neutral-700 dark:text-white'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 dark:text-zinc-400 dark:hover:bg-neutral-800 dark:hover:text-zinc-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{link.label}</span>
            </a>
          );
        })}

        {/* Craft — always a page route */}
        {(() => {
          const Icon = craftLink.icon;
          const isActive = router.pathname.startsWith('/craft');
          return (
            <Link
              href={craftLink.href}
              className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-light transition-all ${
                isActive
                  ? 'bg-neutral-800 text-white dark:bg-neutral-700 dark:text-white'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 dark:text-zinc-400 dark:hover:bg-neutral-800 dark:hover:text-zinc-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{craftLink.label}</span>
            </Link>
          );
        })()}

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
