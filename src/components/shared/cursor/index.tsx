import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const COLORS = ['#ffd700', '#c084fc', '#67e8f9', '#f9a8d4', '#a78bfa', '#ffffff'];
const MAX_INTERVAL_MS = 40;

function spawnDust(x: number, y: number) {
  const size = 2 + Math.random() * 4;
  const particle = document.createElement('div');

  particle.style.cssText = `
    position: fixed;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
    pointer-events: none;
    z-index: 9998;
    left: ${x}px;
    top: ${y}px;
    box-shadow: 0 0 ${size * 2}px currentColor;
  `;

  document.body.appendChild(particle);

  const angle = Math.random() * Math.PI * 2;
  const spread = 15 + Math.random() * 30;
  const tx = Math.cos(angle) * spread;
  const ty = Math.sin(angle) * spread + 20 + Math.random() * 20; // slight gravity

  particle.animate(
    [
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.9 },
      { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 },
    ],
    {
      duration: 500 + Math.random() * 400,
      easing: 'ease-out',
      fill: 'forwards',
    },
  ).onfinish = () => particle.remove();
}

export const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50,
    });
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
      });

      const now = Date.now();
      if (now - lastSpawnTime.current >= MAX_INTERVAL_MS) {
        lastSpawnTime.current = now;
        spawnDust(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return <div ref={cursorRef} className="cursor" />;
};
