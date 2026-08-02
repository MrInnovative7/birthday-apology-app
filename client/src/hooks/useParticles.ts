import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ParticleConfig {
  count?: number;
  duration?: number;
  spread?: number;
  velocity?: number;
  gravity?: number;
}

export const useParticles = (config: ParticleConfig = {}) => {
  const {
    count = 30,
    duration = 2,
    spread = 360,
    velocity = 8,
    gravity = 0.5,
  } = config;

  const containerRef = useRef<HTMLDivElement>(null);

  const createParticles = () => {
    if (!containerRef.current) return;

    const particles: HTMLElement[] = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, #FF2E93, #d946ef);
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 10px rgba(255, 46, 147, 0.8);
      `;

      const angle = (i / count) * spread * (Math.PI / 180);
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      containerRef.current.appendChild(particle);
      particles.push(particle);

      gsap.to(particle, {
        x: vx * 100,
        y: vy * 100 - gravity * 50,
        opacity: 0,
        scale: 0,
        duration,
        ease: 'power1.out',
        onComplete: () => {
          particle.remove();
        },
      });
    }
  };

  return { containerRef, createParticles };
};

export const useFloatingHearts = (count: number = 5) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const createHearts = () => {
    if (!containerRef.current) return;

    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.style.cssText = `
        position: fixed;
        font-size: 24px;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: 100%;
        opacity: 0.7;
      `;

      containerRef.current.appendChild(heart);

      gsap.to(heart, {
        y: -window.innerHeight - 100,
        x: (Math.random() - 0.5) * 200,
        opacity: 0,
        duration: 4 + Math.random() * 2,
        ease: 'sine.in',
        onComplete: () => {
          heart.remove();
        },
      });
    }
  };

  return { containerRef, createHearts };
};

export const useSparkles = (count: number = 10) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const createSparkles = (x: number, y: number) => {
    if (!containerRef.current) return;

    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #FFD700;
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        box-shadow: 0 0 8px rgba(255, 215, 0, 0.8);
      `;

      containerRef.current.appendChild(sparkle);

      const angle = (i / count) * Math.PI * 2;
      const velocity = 3 + Math.random() * 5;

      gsap.to(sparkle, {
        x: Math.cos(angle) * velocity * 50,
        y: Math.sin(angle) * velocity * 50,
        opacity: 0,
        scale: 0,
        duration: 1 + Math.random() * 0.5,
        ease: 'power1.out',
        onComplete: () => {
          sparkle.remove();
        },
      });
    }
  };

  return { containerRef, createSparkles };
};
