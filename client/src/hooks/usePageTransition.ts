import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { pageTransitionIn, pageTransitionOut } from '@/utils/animations';

export const usePageTransition = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (pageRef.current && !isTransitioning.current) {
      isTransitioning.current = true;
      pageTransitionIn(pageRef.current).then(() => {
        isTransitioning.current = false;
      });
    }
  }, []);

  const transitionToNext = async (callback: () => void) => {
    if (isTransitioning.current || !pageRef.current) return;

    isTransitioning.current = true;
    await pageTransitionOut(pageRef.current);
    callback();
    isTransitioning.current = false;
  };

  return { pageRef, transitionToNext };
};

export const useScrollToSection = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      gsap.to(window, {
        scrollTo: { y: section, offsetY: 50 },
        duration: 1,
        ease: 'power2.inOut',
      });
    }
  };

  return { scrollToSection };
};
