import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import {
  HiHome,
  HiBriefcase,
  HiCode,
  HiLightningBolt,
  HiViewGrid,
  HiSun,
  HiMoon,
  HiUser,
  HiArrowLeft,
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

export const Header = () => {
  const router = useRouter();
  const variant = router.route === '/[slug]' ? 'article' : 'default';
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAboutClick = useCallback(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, []);

  // Only use IntersectionObserver-based active section on the homepage
  const isHomePage = router.pathname === '/';
  const activeSection = useActiveSection(isHomePage ? SECTION_IDS : []);

  useEffect(() => {
    setMounted(true);
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

  const aboutActive = router.pathname === '/about';

  const [articleAnim, setArticleAnim] = useState<'enter' | 'exit' | 'idle'>('idle');
  const articleAnimDuration = 700;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (variant !== 'article') return;
    // Reset to idle first so changing asPath always re-triggers the enter animation
    setArticleAnim('idle');
    const id = requestAnimationFrame(() => setArticleAnim('enter'));
    return () => cancelAnimationFrame(id);
  }, [variant, router.asPath]);

  useEffect(() => {
    if (variant !== 'article') return;

    const handleRouteChangeStart = () => {
      setArticleAnim('exit');
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    return () => router.events.off('routeChangeStart', handleRouteChangeStart);
  }, [variant, router.events]);

  useEffect(() => {
    if (variant !== 'article') return;
    setScrolled(false);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant, router.asPath]);

  if (variant === 'article') {
    const enterAnim = (name: string): React.CSSProperties =>
      articleAnim === 'enter'
        ? { animation: `${name} ${articleAnimDuration}ms cubic-bezier(0.22,1,0.36,1) both` }
        : articleAnim === 'exit'
        ? { animation: `${name}-out ${articleAnimDuration}ms cubic-bezier(0.22,1,0.36,1) both` }
        : { opacity: 0 };

    const resting =
      'bg-white/70 backdrop-blur-xl dark:bg-[#131416]/80 border border-black/[0.08] dark:border-white/[0.08] shadow-sm';

    return (
      <header
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 px-6 py-2.5 backdrop-blur-xl dark:bg-[#101113]/95 md:px-10'
            : 'bg-transparent px-6 py-5 md:px-10'
        }`}
      >
        {/* Left — back to work */}
        <Link
          href="/"
          className={
            'flex items-center gap-1.5 rounded-full font-light transition-all duration-300 ' +
            'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 ' +
            (scrolled ? 'px-0 py-1 text-xs' : `px-3.5 py-2 text-sm ${resting}`)
          }
          style={enterAnim('article-header-left')}
        >
          <HiArrowLeft
            className={`shrink-0 transition-all duration-300 ${
              scrolled ? 'h-3 w-3' : 'h-3.5 w-3.5'
            }`}
          />
          Back to home
        </Link>

        {/* Right — craft + about */}
        <div className="flex items-center gap-2" style={enterAnim('article-header-right')}>
          <Link
            href="/craft"
            className={
              'group flex items-center rounded-full font-light transition-all duration-300 ' +
              'text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-100 ' +
              (scrolled ? 'gap-0 p-1.5' : `gap-1.5 px-3.5 py-2 text-sm ${resting}`)
            }
          >
            <HiViewGrid
              className={`shrink-0 transition-all duration-300 ${
                scrolled ? 'h-3.5 w-3.5' : 'h-4 w-4'
              }`}
            />
            {scrolled ? (
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs opacity-0 transition-all duration-300 group-hover:ml-1.5 group-hover:max-w-[120px] group-hover:opacity-100">
                Some explorations
              </span>
            ) : (
              <span>Some explorations</span>
            )}
          </Link>

          <Link
            href="/about"
            className={
              'group flex items-center rounded-full font-light transition-all duration-300 ' +
              'text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-100 ' +
              (scrolled ? 'gap-0 p-1.5' : `gap-1.5 px-3.5 py-2 text-sm ${resting}`)
            }
          >
            <Image
              src="/avatar.png"
              alt="gitmel"
              width={scrolled ? 16 : 20}
              height={scrolled ? 16 : 20}
              className="shrink-0 rounded-full object-cover transition-all duration-300"
            />
            {scrolled ? (
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs opacity-0 transition-all duration-300 group-hover:ml-1.5 group-hover:max-w-[80px] group-hover:opacity-100">
                About me
              </span>
            ) : (
              <span>About me</span>
            )}
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:bottom-auto md:top-6">
      <nav className="relative flex items-center gap-1 rounded-full border border-white/20 bg-white/70 px-2 py-2 shadow-2xl backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#131416]/80">
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
                  ? 'bg-gray-800 text-white dark:bg-white/90 dark:text-[#101113]'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-100'
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
                  ? 'bg-gray-800 text-white dark:bg-white/90 dark:text-[#101113]'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{craftLink.label}</span>
            </Link>
          );
        })()}

        {/* About */}
        <Link
          href="/about"
          onClick={handleAboutClick}
          className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-light transition-all ${
            aboutActive
              ? 'bg-gray-800 text-white dark:bg-white/90 dark:text-[#101113]'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-100'
          }`}
        >
          <HiUser className="h-4 w-4" />
          <span className="hidden sm:inline">About</span>
        </Link>

        {/* Toast */}
        <div
          className={`pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-white/70 px-4 py-2 text-xs text-gray-700 shadow-2xl backdrop-blur-xl transition-all duration-300 dark:border-white/[0.08] dark:bg-[#131416]/80 dark:text-gray-300 md:bottom-auto md:top-[calc(100%+10px)] ${
            showToast
              ? 'translate-y-0 opacity-100'
              : '-translate-y-1.5 opacity-0 md:translate-y-1.5'
          }`}
        >
          oh, you actually clicked — hi 👋
        </div>

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-gray-300 dark:bg-white/10" />

        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center justify-center rounded-full px-2.5 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-100"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <HiSun className="h-4 w-4" /> : <HiMoon className="h-4 w-4" />}
          </button>
        )}
      </nav>
    </header>
  );
};
