import gsap from 'gsap';

export const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

export const moveCursor = (
  ref: React.RefObject<HTMLDivElement | null>,
  x: number,
  y: number,
  duration = 0.35,
) =>
  new Promise<void>(resolve => {
    if (!ref.current) return resolve();
    gsap.to(ref.current, {
      left: x,
      top: y,
      opacity: 1,
      duration,
      ease: 'power2.inOut',
      onComplete: resolve,
    });
  });

export const clickCursor = (ref: React.RefObject<HTMLDivElement | null>) =>
  new Promise<void>(resolve => {
    if (!ref.current) return resolve();
    gsap
      .timeline({ onComplete: resolve })
      .to(ref.current, { scale: 0.7, duration: 0.08, ease: 'power2.in' })
      .to(ref.current, { scale: 1, duration: 0.12, ease: 'back.out(2)' });
  });

export const hideCursor = (ref: React.RefObject<HTMLDivElement | null>) => {
  if (ref.current) gsap.to(ref.current, { opacity: 0, duration: 0.2 });
};

export const openList = (el: HTMLElement | null) =>
  new Promise<void>(resolve => {
    if (!el) return resolve();
    gsap.fromTo(
      el,
      { scaleY: 0, opacity: 0, y: -8 },
      {
        scaleY: 1,
        opacity: 1,
        y: 0,
        duration: 0.22,
        ease: 'power2.out',
        transformOrigin: 'top',
        onComplete: resolve,
      },
    );
  });

export const closeList = (el: HTMLElement | null) =>
  new Promise<void>(resolve => {
    if (!el) return resolve();
    gsap.to(el, {
      scaleY: 0,
      opacity: 0,
      y: -8,
      duration: 0.18,
      ease: 'power2.in',
      transformOrigin: 'top',
      onComplete: resolve,
    });
  });

/** Returns the position of an element relative to a wrapper element. */
export const relPos = (el: Element, wrapper: Element) => {
  const er = el.getBoundingClientRect();
  const wr = wrapper.getBoundingClientRect();
  return { x: er.left - wr.left + er.width / 2, y: er.top - wr.top + er.height / 2 };
};
