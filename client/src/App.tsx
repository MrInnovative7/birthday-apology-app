import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import { CustomCursor } from './components/CustomCursor';
import { MusicPlayer } from './components/MusicPlayer';
import { LoadingScreen } from './components/LoadingScreen';
import { Page1Hero } from './pages/Page1Hero';
import { Page2HappinessMeter } from './pages/Page2HappinessMeter';
import { Page3Hearts } from './pages/Page3Hearts';
import { Page4Gallery } from './pages/Page4Gallery';
import { Page5Letter } from './pages/Page5Letter';
import { Page6Gift } from './pages/Page6Gift';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

type PageNumber = 1 | 2 | 3 | 4 | 5 | 6;

function App() {
  const [currentPage, setCurrentPage] = useState<PageNumber>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [herName, setHerName] = useState('Parul');

  // Easter egg - Press 'H' to show hidden message
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'h') {
        const message = document.createElement('div');
        message.innerHTML = 'I still smile whenever I think about you ❤️';
        message.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(46, 17, 78, 0.95);
          color: #FFB6C1;
          padding: 2rem;
          border-radius: 1rem;
          border: 2px solid #FF2E93;
          font-size: 1.5rem;
          z-index: 9999;
          text-align: center;
          box-shadow: 0 0 30px rgba(255, 46, 147, 0.6);
        `;
        document.body.appendChild(message);

        gsap.fromTo(
          message,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out' }
        );

        setTimeout(() => {
          gsap.to(message, {
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            ease: 'back.in',
            onComplete: () => message.remove(),
          });
        }, 3000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handlePageChange = (page: PageNumber) => {
    setCurrentPage(page);
    // Scroll to top
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 0.5,
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <Page1Hero
            herName={herName}
            onNext={() => handlePageChange(2)}
          />
        );
      case 2:
        return <Page2HappinessMeter onNext={() => handlePageChange(3)} />;
      case 3:
        return <Page3Hearts onNext={() => handlePageChange(4)} />;
      case 4:
        return <Page4Gallery onNext={() => handlePageChange(5)} />;
      case 5:
        return <Page5Letter onNext={() => handlePageChange(6)} />;
      case 6:
        return <Page6Gift onNext={() => {}} />;
      default:
        return <Page1Hero herName={herName} onNext={() => handlePageChange(2)} />;
    }
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          {isLoading ? (
            <LoadingScreen onComplete={handleLoadingComplete} />
          ) : (
            <>
              <CustomCursor />
              <MusicPlayer />
              <div className="bg-gradient-to-b from-[#0a0a0f] to-[#2E114E] min-h-screen">
                {renderPage()}
              </div>
            </>
          )}
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;