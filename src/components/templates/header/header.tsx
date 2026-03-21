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
const TOAST_DURATION = 2800;

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

  const spawnParticles = useCallback(() => {
    if (!aboutBtnRef.current) return;
    const rect = aboutBtnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ['#ffffff', '#d4d4d4', '#a3a3a3', '#e8e4dc'];

    for (let i = 0; i < 10; i++) {
      const p = document.createElement('div');
      p.style.cssText = `position:fixed;pointer-events:none;z-index:9999;border-radius:50%;`;
      const angle = Math.random() * 360;
      const dist = 20 + Math.random() * 32;
      const size = 2 + Math.random() * 3;
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.background = color;
      p.style.left = `${cx}px`;
      p.style.top = `${cy}px`;
      document.body.appendChild(p);
      const anim = p.animate(
        [
          { opacity: 1, transform: `translate(-50%,-50%) rotate(${angle}deg) translateX(0px)` },
          {
            opacity: 0,
            transform: `translate(-50%,-50%) rotate(${angle}deg) translateX(${dist}px)`,
          },
        ],
        { duration: 300 + Math.random() * 200, easing: 'ease-out', fill: 'forwards' },
      );
      anim.onfinish = () => p.remove();
    }

    const heart = document.createElement('div');
    heart.textContent = '🤍';
    heart.style.cssText = `position:fixed;font-size:14px;left:${cx}px;top:${cy}px;pointer-events:none;z-index:9999;`;
    document.body.appendChild(heart);
    const heartAnim = heart.animate(
      [
        { opacity: 1, transform: 'translate(-50%,-50%) translateY(0px) scale(1)' },
        { opacity: 0, transform: 'translate(-50%,-50%) translateY(-32px) scale(1.4)' },
      ],
      { duration: 600, easing: 'ease-out', fill: 'forwards' },
    );
    heartAnim.onfinish = () => heart.remove();
  }, []);

  const startFill = useCallback(() => {
    if (phaseRef.current !== 'idle') return;
    const fill = aboutFillRef.current;
    if (!fill) return;

    phaseRef.current = 'burning';
    startTimeRef.current = null;
    fill.style.transition = 'none';
    fill.style.background = 'rgba(255,255,255,0.13)';
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
        fill.style.background = 'rgba(255,255,255,0.85)';
        fill.style.transition = 'opacity 0.15s';
        setTimeout(() => {
          fill.style.opacity = '0';
        }, 55);

        spawnParticles();
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
          fill.style.transition = 'none';
          fill.style.width = '0%';
          fill.style.opacity = '0';
          fill.style.background = 'rgba(255,255,255,0.13)';
          phaseRef.current = 'idle';
          router.push('/about');
        }, TOAST_DURATION);
      }
    };

    rafRef.current = requestAnimationFrame(burnStep);
  }, [router, spawnParticles]);

  const cancelFill = useCallback(() => {
    if (phaseRef.current !== 'burning') return;
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
  }, []);

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
          onTouchStart={e => {
            e.preventDefault();
            startFill();
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
            style={{ width: '0%', opacity: 0, background: 'rgba(255,255,255,0.13)' }}
          />
          <HiUser className="relative z-10 h-4 w-4" />
          <span className="relative z-10 hidden sm:inline">About</span>
        </button>

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
      </nav>
    </header>
  );
};
