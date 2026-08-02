import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { usePageTransition } from '@/hooks/usePageTransition';

interface Page6GiftProps {
  onNext?: () => void;
}

export const Page6Gift = ({ onNext }: Page6GiftProps) => {
  const { pageRef } = usePageTransition();
  const giftRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Animate teddy entrance
    if (giftRef.current && !isOpen) {
      gsap.fromTo(
        giftRef.current,
        { opacity: 0, scale: 0.6, rotationZ: -10 },
        {
          opacity: 1,
          scale: 1,
          rotationZ: 0,
          duration: 0.8,
          ease: 'back.out',
        }
      );

      // Gentle floating animation for teddy
      gsap.to(giftRef.current, {
        y: -10,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }
  }, [isOpen]);

  const handleGiftClick = () => {
    if (isOpen || !giftRef.current) return;

    setIsOpen(true);

    // Bounce and celebrate effect on click
    gsap.to(giftRef.current, {
      scale: 1.15,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
    });

    // Trigger confetti and effects
    confetti({
      particleCount: 150,
      spread: 360,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#FF2E93', '#d946ef', '#a855f7', '#FFD700', '#FF69B4'],
    });

    // More confetti bursts
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 180,
        origin: { x: 0.2, y: 0.3 },
        colors: ['#FF2E93', '#FFD700'],
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 180,
        origin: { x: 0.8, y: 0.3 },
        colors: ['#d946ef', '#FFD700'],
      });
    }, 400);
  };

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#2E114E] flex flex-col items-center justify-center overflow-hidden px-4 py-12"
    >
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + i * 0.3}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Flying Heart Animations in Background */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute text-pink-500 opacity-30 select-none animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${1 + Math.random() * 1.5}rem`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite, fadeInOut ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          {isOpen ? "Happy Birthday, Parul! ❤️" : "Your Special Gift"}
        </h1>

        <p className="text-gray-300 text-lg mb-8">
          {isOpen ? "Opened with all my heart ✨" : "Click the teddy to open... 🧸"}
        </p>

        {/* Teddy Container with Pink Glow Effect Behind */}
        <div className="relative flex items-center justify-center">
          {/* Glowing Pink Light Effect Behind Teddy */}
          <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-gradient-to-r from-pink-500/40 via-rose-500/30 to-purple-500/40 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

          {/* Teddy Without Background Box */}
          <div
            ref={giftRef}
            onClick={handleGiftClick}
            className="cursor-pointer flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105"
          >
            <img
              src="/teddy.png"
              alt="Cute Teddy"
              className="w-80 h-80 md:w-96 md:h-96 object-contain drop-shadow-2xl mb-2"
            />
            <p className="text-pink-300 text-xl font-semibold tracking-wide drop-shadow">
              {isOpen ? "Forever Yours 💕" : "Click to open ✨"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};