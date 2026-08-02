import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      // Update cursor position
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 8,
          y: e.clientY - 8,
          duration: 0.1,
          overwrite: 'auto',
        });
      }

      // Create trail particles
      if (trailRef.current && Math.random() > 0.7) {
        const trail = document.createElement('div');
        trail.style.cssText = `
          position: fixed;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #FF2E93, #d946ef);
          border-radius: 50%;
          pointer-events: none;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          box-shadow: 0 0 8px rgba(255, 46, 147, 0.6);
        `;

        trailRef.current.appendChild(trail);

        gsap.to(trail, {
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            trail.remove();
          },
        });
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 1,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.3,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 opacity-0"
        style={{
          width: '16px',
          height: '16px',
          border: '2px solid #FF2E93',
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(255, 46, 147, 0.6)',
        }}
      />
      <div ref={trailRef} className="fixed pointer-events-none z-40" />
    </>
  );
};
