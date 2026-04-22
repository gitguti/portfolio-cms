import gsap from 'gsap';
import { useRef, useState } from 'react';
import { FiGithub } from 'react-icons/fi';

import type { VibesProject } from './vibes-data';

interface VibesCardProps {
  project: VibesProject;
}

/* ─── dock card: Balance + Misura in one full-width card ─── */
const dockApps = [
  {
    id: 'building-002',
    label: 'Balance',
    title: 'Balance',
    description:
      'Voice-first iPad assistant. Calendar, journaling, shopping lists — all by voice. Powered by Claude API with a ReAct agent and Notion as the brain.',
    stack: ['Gemini 2.5', 'Notion', 'Lovable'],
    video: '/craft/balance.mp4',
    iconBg: 'linear-gradient(135deg, #3b1fa8 0%, #6B5CE7 100%)',
    iconText: 'B',
    cardBg: '#1c1b1d',
    accentGlow: 'rgba(107,92,231,0.3)',
  },
  {
    id: 'building-003',
    label: 'Misura',
    title: 'Misura',
    description:
      'Plan ahead instead of tracking after. Add a recipe you love — the system calibrates it to your macros. Shared cart included.',
    stack: ['Next.js', 'Supabase', 'Claude Code'],
    video: '/craft/misura.mp4',
    iconBg: 'linear-gradient(135deg, #C8475E 0%, #9d505e 100%)',
    iconText: 'M',
    cardBg: '#1c1b1d',
    accentGlow: 'rgba(191, 40, 126, 0.28)',
  },
];

const DockCard = ({ project: _project }: { project: VibesProject }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const app = dockApps[active]!;
  const prev = () => setActive(i => (i - 1 + dockApps.length) % dockApps.length);
  const next = () => setActive(i => (i + 1) % dockApps.length);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -4,
      boxShadow: '0 20px 40px -12px rgba(0,0,0,0.18)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: '0 0px 0px 0px rgba(0,0,0,0)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className="vibes-card building-card flex flex-col overflow-hidden rounded-2xl md:col-span-2"
      style={{ background: app.cardBg, transition: 'background 0.5s ease' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Text + carousel nav ── */}
      <div className="flex flex-shrink-0 items-start justify-between gap-4 px-6 pb-4 pt-6">
        <div className="min-w-0">
          <h3
            className="card-title mb-1 font-serif text-3xl font-normal leading-snug"
            style={{ color: 'rgba(232,228,248,1)' }}
          >
            {app.title}
          </h3>
          <p
            className="card-desc text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.38)', maxWidth: '52ch' }}
          >
            {app.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {app.stack.map(tech => (
              <span
                key={tech}
                className="rounded-full border px-2.5 py-0.5 text-[10px]"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.32)',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Carousel controls ── */}
        <div className="flex flex-shrink-0 items-center gap-3 pt-0.5">
          <button
            onClick={prev}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-colors hover:bg-white/10"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
            aria-label="Previous"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M7.5 2L4 6l3.5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* dots */}
          <div className="flex items-center gap-1.5">
            {dockApps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 16 : 6,
                  height: 6,
                  background: i === active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
                }}
                aria-label={dockApps[i]!.label}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-colors hover:bg-white/10"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
            aria-label="Next"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M4.5 2L8 6l-3.5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Video ── */}
      <div
        className="relative mx-auto w-full overflow-hidden sm:w-4/5 md:mb-6 md:rounded-2xl"
        style={{ aspectRatio: '16/9' }}
      >
        {/* ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${app.accentGlow} 0%, transparent 70%)`,
          }}
        />
        {dockApps.map((a, i) => (
          <video
            key={a.id}
            src={a.video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── per-project visual config for other cards ─── */
const cardConfig: Record<
  string,
  {
    bg: string;
    dark: boolean;
    visual: React.ReactNode;
  }
> = {};

export const VibesCard = ({ project }: VibesCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Dock card handles Balance + Misura together
  if (project.id === 'building-dock') {
    return <DockCard project={project} />;
  }

  const config = cardConfig[project.id];
  if (!config) return null;

  const textColor = config.dark ? 'rgba(232,228,248,1)' : '#0D0D0D';
  const descColor = config.dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.48)';
  const tagBg = config.dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)';
  const tagText = config.dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)';
  const tagBorder = config.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';
  const iconColor = config.dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)';
  const ctaColor = config.dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)';

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -4,
      boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: '0 0px 0px 0px rgba(0,0,0,0)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className="vibes-card building-card flex flex-col overflow-hidden rounded-2xl"
      style={{ background: config.bg, minHeight: 520 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text flex-shrink-0 px-5 pb-3.5 pt-5">
        <h3
          className="card-title mb-1.5 font-serif font-normal leading-snug"
          style={{ color: textColor, fontSize: 17 }}
        >
          {project.title}
        </h3>
        <p
          className="card-desc text-xs leading-relaxed"
          style={{
            color: descColor,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.story ?? project.description}
        </p>
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="rounded-full border px-2.5 py-0.5 text-[10px]"
                style={{ background: tagBg, color: tagText, borderColor: tagBorder }}
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: iconColor }}
                className="transition-opacity hover:opacity-70"
                aria-label="GitHub"
              >
                <FiGithub className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium transition-opacity hover:opacity-70"
                style={{ color: ctaColor }}
              >
                Try demo →
              </a>
            ) : (
              <span className="text-[11px] font-medium" style={{ color: ctaColor }}>
                Try demo →
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="visual relative overflow-hidden" style={{ height: 300 }}>
        {config.visual}
      </div>
    </div>
  );
};
