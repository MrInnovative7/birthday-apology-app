import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePageTransition } from '@/hooks/usePageTransition';

interface Page3HeartsProps {
  onNext?: () => void;
}

const heartMessages = [
  {
    title: 'I\'m Sorry',
    message: 'For every moment I hurt you, every word I regret, and every tear I caused.',
  },
  {
    title: 'I Love You',
    message: 'More than words can express. You are my everything, my reason to be better.',
  },
  {
    title: 'Happy Birthday',
    message: 'To the most beautiful person inside and out. May your day be as special as you are.',
  },
  {
    title: 'Forgive Me',
    message: 'I promise to be better, to listen more, to love deeper, and to never take you for granted.',
  },
  {
    title: 'Forever Yours',
    message: 'If you give me another chance, I will spend the rest of my life making you smile.',
  },
];

export const Page3Hearts = ({ onNext }: Page3HeartsProps) => {
  const { pageRef, transitionToNext } = usePageTransition();
  const [openedHearts, setOpenedHearts] = useState<number[]>([]);
  const [showLetter, setShowLetter] = useState(false);
  const heartRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate hearts entrance
    heartRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out',
          }
        );
      }
    });
  }, []);

  const handleHeartClick = (index: number) => {
    if (openedHearts.includes(index)) return;

    const newOpened = [...openedHearts, index];
    setOpenedHearts(newOpened);

    // Animate heart flip
    if (heartRefs.current[index]) {
      gsap.to(heartRefs.current[index], {
        rotationY: 180,
        duration: 0.6,
        ease: 'back.out',
      });
    }

    // Show letter button when all hearts are opened
    if (newOpened.length === heartMessages.length) {
      setTimeout(() => setShowLetter(true), 500);
    }
  };

  const handleNext = async () => {
    await transitionToNext(() => {
      onNext?.();
    });
  };

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#2E114E] flex flex-col items-center justify-center overflow-hidden px-4 py-6 md:py-12"
    >
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-300 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${6 + i * 0.5}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-white mb-2 md:mb-3">
          Tap Every Heart <span className="text-pink-400">❤️</span>
        </h1>

        <p className="text-center text-gray-400 text-sm md:text-lg mb-6 md:mb-10">
          Each heart holds a special message for you...
        </p>

        {/* Hearts Grid - Mobile Friendly & Compact Gap */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-10 w-full max-w-4xl">
          {heartMessages.map((msg, index) => (
            <div
              key={index}
              ref={(el) => {
                heartRefs.current[index] = el;
              }}
              onClick={() => handleHeartClick(index)}
              className="cursor-pointer perspective w-full"
            >
              <div
                className={`relative w-full aspect-square rounded-xl glass flex flex-col items-center justify-center p-3 md:p-4 transition-all duration-300 hover:scale-105 shadow-xl ${
                  openedHearts.includes(index) ? 'ring-2 ring-pink-400' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: openedHearts.includes(index)
                    ? 'rotateY(180deg)'
                    : 'rotateY(0deg)',
                }}
              >
                {/* Front */}
                <div
                  className={`absolute inset-0 flex items-center justify-center text-4xl md:text-6xl ${
                    openedHearts.includes(index) ? 'hidden' : ''
                  }`}
                >
                  ❤️
                </div>

                {/* Back */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center p-2 md:p-3 text-center overflow-y-auto ${
                    openedHearts.includes(index) ? 'block' : 'hidden'
                  }`}
                >
                  <h3 className="text-xs md:text-base font-bold text-pink-300 mb-1">
                    {msg.title}
                  </h3>
                  <p className="text-[10px] md:text-xs text-gray-200 leading-tight">
                    {msg.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show letter button */}
        {showLetter && (
          <div className="text-center animate-bounce mb-4">
            <button
              onClick={handleNext}
              className="btn-glow text-base md:text-xl px-6 py-3"
            >
              Read My Letter 💌
            </button>
          </div>
        )}

        {/* Progress indicator */}
        <div className="text-center text-gray-400 text-xs md:text-sm">
          <p>
            {openedHearts.length} / {heartMessages.length} hearts opened
          </p>
        </div>
      </div>
    </div>
  );
};