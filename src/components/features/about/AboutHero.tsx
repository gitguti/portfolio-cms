import { useEffect, useRef } from 'react';
import Image from 'next/image';

import gsap from 'gsap';

import { Container } from '@src/components/shared/container';

import { heroData, socialLinks } from './about-data';

export const AboutHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const elements = ['.hero-avatar', '.hero-name', '.hero-tagline', '.hero-social'];

    gsap.fromTo(
      elements,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      },
    );
  }, []);

  return (
    <section className="pt-24 md:pt-32" ref={heroRef}>
      <Container className="max-w-3xl px-4 md:px-6">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
          {/* Avatar */}
          <div className="hero-avatar relative h-36 w-36 flex-shrink-0 overflow-hidden rounded-full border-2 border-neutral-200 dark:border-zinc-700 md:h-44 md:w-44 lg:h-52 lg:w-52">
            <Image
              src={heroData.avatarPath}
              alt={`Profile photo of ${heroData.name}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 144px, (max-width: 1024px) 176px, 208px"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4">
            {/* Name */}
            <h1 className="hero-name font-serif text-3xl font-light text-neutral-800 dark:text-zinc-50 md:text-4xl lg:text-5xl">
              {heroData.name}
            </h1>

            {/* Tagline */}
            <p className="hero-tagline max-w-2xl text-lg text-neutral-600 dark:text-zinc-300 md:text-xl">
              {heroData.tagline}
            </p>

            {/* Social Links */}
            <div className="hero-social flex gap-4">
              {socialLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition-colors hover:border-neutral-800 hover:bg-neutral-800 hover:text-white dark:border-neutral-700 dark:text-zinc-400 dark:hover:border-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-white"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
