import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';

interface MusicPlayerProps {
  musicUrl?: string;
}

export const MusicPlayer = ({ musicUrl }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {
        // Autoplay may be blocked by browser
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleToggle = () => {
    setIsPlaying(!isPlaying);

    // Animate button
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.9,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src={musicUrl || '/music/romantic-piano.mp3'}
      />
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="fixed bottom-8 right-8 z-40 p-4 rounded-full glass hover:scale-110 transition-transform duration-300"
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
        title={isPlaying ? 'Music: On' : 'Music: Off'}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-pink-400" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-400" />
        )}
      </button>
    </>
  );
};
