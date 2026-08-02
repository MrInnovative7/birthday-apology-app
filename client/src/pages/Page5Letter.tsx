import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePageTransition } from '@/hooks/usePageTransition';

interface Page5LetterProps {
  onNext?: () => void;
}

export const Page5Letter = ({ onNext }: Page5LetterProps) => {
  const { pageRef, transitionToNext } = usePageTransition();
  const envelopeRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Animate envelope entrance
    if (envelopeRef.current && !isOpen) {
      gsap.fromTo(
        envelopeRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out',
        }
      );

      // Gentle floating animation
      gsap.to(envelopeRef.current, {
        y: -15,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }
  }, [isOpen]);

  const handleEnvelopeClick = () => {
    if (!envelopeRef.current || isOpen) return;

    setIsOpen(true);

    // Envelope opening animation
    gsap.to(envelopeRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      ease: 'back.in',
    });

    // Letter appearance
    if (letterRef.current) {
      gsap.fromTo(
        letterRef.current,
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'back.out',
        }
      );
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
      className="relative min-h-screen w-full bg-gradient-to-b from-[#1a1a2e] via-[#2E114E] to-[#0a0a0f] flex flex-col items-center justify-center overflow-hidden px-4 py-12"
    >
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full">
        {!isOpen ? (
          <>
            <h1 className="text-5xl md:text-6xl font-bold text-center text-white mb-8">
              A Letter From My Heart
            </h1>

            <p className="text-center text-gray-400 text-lg mb-12">
              Click to open...
            </p>

            {/* Envelope */}
            <div
              ref={envelopeRef}
              onClick={handleEnvelopeClick}
              className="cursor-pointer max-w-md mx-auto mb-12"
            >
              <div className="glass rounded-lg p-8 md:p-12 hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-9xl mb-4">💌</div>
                  <p className="text-gray-300 text-lg">
                    Click to open
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Letter Content */}
            <div
              ref={letterRef}
              className="glass rounded-lg p-8 md:p-12 max-w-2xl mx-auto mb-12 max-h-[75vh] overflow-y-auto"
            >
              <div className="handwriting text-lg md:text-xl text-gray-200 space-y-6 leading-relaxed">
                <p className="text-pink-300 font-bold">
                  Happy Birthday, Betu. ❤️
                </p>

                <p>
                  Shayad mujhe tumhe message nahi karna chahiye tha, aur itne dino baad mera message dekhkar shayad tumhe achha bhi na lage. But today, I just wanted to wish you from the bottom of my heart.
                </p>

                <p>
                  Happy Birthday! 🎂
                </p>

                <p>
                  May Mahadev always bless you with happiness, good health, success, and peace. I hope you achieve every dream you've ever wished for. Keep growing, keep shining, and keep smiling.
                </p>

                <p>
                  Ek baat jo shayad tumhe kabhi pata nahi thi... maine tumhare 12th ke result ke liye Mahadev से mannat maangi thi ki tumhara result bahut achha aaye. Aaj maine woh mannat poori kar di. Bas ye baat tumhe batani thi.
                </p>

                <p>
                  Aur haan... I'm truly sorry. Sirf ek galti ke liye nahi, balki un sabhi baaton ke liye jinse maine kabhi tumhe hurt kiya. I know a simple "sorry" can't change the past, and I don't expect forgiveness. Bas dil se maafi maangna chahta tha.
                </p>

                <p>
                  Main tumse kuch expect nahi karta, na hi kisi reply ki umeed hai. I genuinely wish you nothing but happiness and success.
                </p>

                <p>
                  Happy Birthday once again, Betu. ❤️
                </p>

                <p>
                  May Mahadev always protect you. Keep growing, keep shining, and take care.
                </p>

                <p className="text-pink-300">
                  I'll always be your biggest fan. 🤍
                </p>

                <p className="text-2xl">❤️</p>
              </div>
            </div>

            {/* Continue Button */}
            <div className="text-center">
              <button
                onClick={handleNext}
                className="btn-glow text-lg md:text-xl"
              >
                Open Your Gift 🎁
              </button>
            </div>
          </>
        )}
      </div>

      {/* Floating hearts background animation matching Hero section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-20 animate-pulse"
            style={{
              left: `${20 + i * 30}%`,
              animation: `heart-float ${4 + i}s ease-in infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>
    </div>
  );
};