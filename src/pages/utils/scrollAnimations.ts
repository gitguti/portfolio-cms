import gsap from 'gsap';

export function initScrollAnimations() {
  const sections = gsap.utils.toArray('.scrollx section');

  const scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.scrollx',
      pin: true,
      scrub: 1,
      end: '+=3000',
      markers: false,
    },
  });

  console.log(1 / (sections.length - 1));
}
