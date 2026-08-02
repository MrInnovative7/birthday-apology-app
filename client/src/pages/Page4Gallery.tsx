import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePageTransition } from '@/hooks/usePageTransition';

interface Page4GalleryProps {
  onNext?: () => void;
}

// 7 polaroids with optimized mobile-friendly and desktop scattered positions
const initialPolaroids = [
  { id: 1, rotation: -5, x: 0, y: 0, imageIndex: 0 },
  { id: 2, rotation: 3, x: 60, y: -30, imageIndex: 1 },
  { id: 3, rotation: -8, x: -70, y: 20, imageIndex: 2 },
  { id: 4, rotation: 5, x: 90, y: 40, imageIndex: 3 },
  { id: 5, rotation: -3, x: -50, y: -50, imageIndex: 4 },
  { id: 6, rotation: 7, x: 70, y: 60, imageIndex: 5 },
  { id: 7, rotation: -4, x: -60, y: -20, imageIndex: 6 },
];

const allImages = [
  '/1.jpeg',
  '/2.jpeg',
  '/3.jpeg',
  '/4.jpeg',
  '/5.jpeg',
  '/6.jpeg',
  '/7.jpeg',
];

export const Page4Gallery = ({ onNext }: Page4GalleryProps) => {
  const { pageRef, transitionToNext } = usePageTransition();
  const polaroidRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State to track current image index for each of the 7 polaroid cards
  const [currentIndices, setCurrentIndices] = useState(
    initialPolaroids.map((p) => p.imageIndex)
  );

  useEffect(() => {
    // Animate polaroids entrance with floating effect
    polaroidRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          {
            opacity: 0,
            scale: 0.5,
            y: 100,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'back.out',
          }
        );

        // Floating animation
        gsap.to(ref, {
          y: Math.sin(index) * 15,
          duration: 3 + index * 0.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    });

    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      polaroidRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.to(ref, {
            x: x * 20 * (index % 3 === 0 ? 1 : -1),
            y: y * 20 * (index % 2 === 0 ? 1 : -1),
            duration: 0.5,
            overwrite: 'auto',
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto change image for cards every 3 seconds with a smooth effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndices((prevIndices) =>
        prevIndices.map((currentIndex) => (currentIndex + 1) % allImages.length)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = async () => {
    await transitionToNext(() => {
      onNext?.();
    });
  };

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#2E114E] via-[#0a0a0f] to-[#1a1a2e] flex flex-col items-center justify-center overflow-hidden px-4 py-8 md:py-12"
    >
      {/* Inline style for smooth heart floating upwards */}
      <style>{`
        @keyframes floatUpAnimation {
          0% {
            transform: translateY(0px) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-500px) scale(1.2);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: floatUpAnimation linear infinite;
        }
      `}</style>

      {/* Background particles and Flying Hearts from bottom to top */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-300 rounded-full opacity-15"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${7 + i * 0.5}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Global floating hearts flying down to up */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute text-pink-500 select-none animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-10%`,
              fontSize: `${1 + Math.random() * 1.5}rem`,
              animationDuration: `${5 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-white mb-2 md:mb-4">
          Our Beautiful Memories
        </h1>

        <p className="text-center text-gray-400 text-sm md:text-lg mb-6 md:mb-12">
          Moments that made me fall in love with you all over again...
        </p>

        {/* Gallery Container with Pink Glow Effect and Background Flying Hearts Behind Cards */}
        <div
          ref={containerRef}
          className="relative h-80 md:h-[450px] w-full max-w-md mb-8 md:mb-12 flex items-center justify-center"
        >
          {/* Glowing Pink Light Effect Behind Cards */}
          <div className="absolute w-64 h-64 md:w-[400px] md:h-[400px] bg-gradient-to-r from-pink-500/40 via-rose-500/30 to-purple-500/40 rounded-full blur-3xl pointer-events-none -z-20 animate-pulse" />

          {/* Heart Flying Animation Directly Behind Images (Down to Up) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            {[...Array(10)].map((_, i) => (
              <div
                key={`card-heart-${i}`}
                className="absolute text-pink-400 select-none animate-float-up"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  bottom: `-20%`,
                  fontSize: `${0.9 + Math.random() * 1.3}rem`,
                  animationDuration: `${3.5 + Math.random() * 3}s`,
                  animationDelay: `${Math.random() * 4}s`,
                }}
              >
                💖
              </div>
            ))}
          </div>

          {initialPolaroids.map((item, index) => {
            const activeImageIndex = currentIndices[index];
            const imgSource = allImages[activeImageIndex];

            return (
              <div
                key={item.id}
                ref={(el) => {
                  polaroidRefs.current[index] = el;
                }}
                className="absolute w-36 h-44 md:w-52 md:h-60 glass rounded-lg overflow-hidden shadow-2xl bg-white/5 p-2 md:p-3 flex flex-col transition-all duration-300"
                style={{
                  transform: `rotate(${item.rotation}deg) translateX(${item.x * 0.7}px) translateY(${item.y * 0.7}px)`,
                }}
              >
                {/* Polaroid Image with smooth transition */}
                <div className="w-full h-32 md:h-44 overflow-hidden rounded bg-black/20 relative">
                  <img
                    key={imgSource}
                    src={imgSource}
                    alt={`Memory ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover animate-fade-in transition-opacity duration-500"
                  />
                </div>

                {/* Polaroid text area */}
                <div className="w-full flex-1 flex items-center justify-center pt-1 md:pt-2">
                  <p className="text-[10px] md:text-sm text-pink-300 font-medium text-center">
                    Memory #{activeImageIndex + 1} 💕
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleNext}
            className="btn-glow text-base md:text-xl px-6 py-3"
          >
            Continue to My Letter 💌
          </button>
        </div>
      </div>
    </div>
  );
};