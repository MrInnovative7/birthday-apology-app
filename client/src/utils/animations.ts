import gsap from 'gsap';

/**
 * GSAP Page Transition Animation
 * Creates a cinematic transition between pages with blur, zoom, and fade effects
 */
export const pageTransitionIn = (element: HTMLElement) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)',
    },
    {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out',
    }
  );
};

export const pageTransitionOut = (element: HTMLElement) => {
  return gsap.to(element, {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)',
    duration: 0.8,
    ease: 'power2.in',
  });
};

/**
 * Particle burst animation
 * Creates particles that burst outward from a point
 */
export const particleBurst = (
  particles: HTMLElement[],
  options: { duration?: number; stagger?: number } = {}
) => {
  const { duration = 1, stagger = 0.05 } = options;

  return gsap.to(particles, {
    x: () => (Math.random() - 0.5) * 400,
    y: () => (Math.random() - 0.5) * 400,
    opacity: 0,
    scale: 0,
    duration,
    stagger,
    ease: 'back.out',
  });
};

/**
 * Floating animation
 * Creates a gentle up-and-down floating motion
 */
export const floatingAnimation = (
  element: HTMLElement,
  options: { duration?: number; distance?: number } = {}
) => {
  const { duration = 3, distance = 20 } = options;

  return gsap.to(element, {
    y: -distance,
    duration,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
};

/**
 * Glow pulse animation
 * Creates a pulsing glow effect
 */
export const glowPulse = (
  element: HTMLElement,
  options: { duration?: number } = {}
) => {
  const { duration = 2 } = options;

  return gsap.fromTo(
    element,
    { boxShadow: '0 0 20px rgba(255, 46, 147, 0.6)' },
    {
      boxShadow: '0 0 40px rgba(255, 46, 147, 0.8)',
      duration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    }
  );
};

/**
 * Typing animation
 * Animates text character by character
 */
export const typingAnimation = (
  element: HTMLElement,
  text: string,
  options: { duration?: number; delay?: number } = {}
) => {
  const { duration = 0.05, delay = 0 } = options;

  element.textContent = '';
  let charIndex = 0;

  return gsap.delayedCall(delay, () => {
    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        element.textContent += text[charIndex];
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, duration * 1000);
  });
};

/**
 * Handwriting animation
 * Simulates handwriting by drawing text with opacity
 */
export const handwritingAnimation = (
  element: HTMLElement,
  options: { duration?: number; delay?: number } = {}
) => {
  const { duration = 2, delay = 0 } = options;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 10,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power1.inOut',
    }
  );
};

/**
 * Confetti animation
 * Creates confetti particles that fall and rotate
 */
export const confettiAnimation = (
  particles: HTMLElement[],
  options: { duration?: number } = {}
) => {
  const { duration = 3 } = options;

  return gsap.to(particles, {
    y: () => Math.random() * 500 + 200,
    x: () => (Math.random() - 0.5) * 300,
    rotation: () => Math.random() * 720,
    opacity: 0,
    duration,
    stagger: 0.02,
    ease: 'power1.in',
  });
};

/**
 * Scale pulse animation
 * Creates a pulsing scale effect
 */
export const scalePulse = (
  element: HTMLElement,
  options: { duration?: number; scale: number } = { scale: 1.1 }
) => {
  const { duration = 0.6, scale } = options;

  return gsap.fromTo(
    element,
    { scale: 1 },
    {
      scale,
      duration,
      ease: 'back.out',
      repeat: -1,
      yoyo: true,
    }
  );
};

/**
 * Stagger animation
 * Animates multiple elements with a stagger effect
 */
export const staggerAnimation = (
  elements: HTMLElement[],
  options: {
    duration?: number;
    stagger?: number;
    fromY?: number;
    fromOpacity?: number;
  } = {}
) => {
  const {
    duration = 0.6,
    stagger = 0.1,
    fromY = 20,
    fromOpacity = 0,
  } = options;

  return gsap.fromTo(
    elements,
    {
      y: fromY,
      opacity: fromOpacity,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: 'power2.out',
    }
  );
};

/**
 * Rotate animation
 * Continuous rotation effect
 */
export const rotateAnimation = (
  element: HTMLElement,
  options: { duration?: number; direction?: 1 | -1 } = {}
) => {
  const { duration = 4, direction = 1 } = options;

  return gsap.to(element, {
    rotation: direction * 360,
    duration,
    ease: 'none',
    repeat: -1,
  });
};
