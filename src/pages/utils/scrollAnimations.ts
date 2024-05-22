export function initScrollAnimations() {
  if (typeof window !== 'undefined') {
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([gsapModule, ScrollTriggerModule]) => {
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.default;

        gsap.registerPlugin(ScrollTrigger);

        const sections = gsap.utils.toArray<HTMLElement>('.scrollx section');

        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: '.scrollx',
            pin: true,
            scrub: 1,
            end: () => `+=${(document.querySelector('.scrollx') as HTMLElement).offsetWidth}`,
            markers: false,
          },
        });
      })
      .catch(error => {
        console.error('Error importing gsap or ScrollTrigger:', error);
      });
  }
}
