import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

interface HeroVideoBackgroundProps {
  videoSrc?: string;
  videoSrcFallback?: string;
  posterSrc?: string;
  fallbackImageSrc?: string;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({
  videoSrc = '/videos/laboratory-hero-opt.mp4',
  videoSrcFallback = '/videos/laboratory-hero.mp4',
  posterSrc = '/images/hero-poster.jpg',
  fallbackImageSrc = '/images/hero-poster.jpg',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isDataSaver, setIsDataSaver] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [manuallyPaused, setManuallyPaused] = useState<boolean>(false);

  // Check client environment
  useEffect(() => {
    // 1. Viewport check (mobile breakpoint < 768px)
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mobileQuery.matches);

    const handleMobileChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mobileQuery.addEventListener('change', handleMobileChange);

    // 2. Prefers reduced motion check
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // 3. Save-Data header check
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    if (nav.connection?.saveData) {
      setIsDataSaver(true);
    }

    return () => {
      mobileQuery.removeEventListener('change', handleMobileChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Handle visibility change (pause when tab hidden, resume when visible)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!videoRef.current || hasError || isMobile || prefersReducedMotion) return;

      if (document.hidden) {
        videoRef.current.pause();
      } else if (!manuallyPaused) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [manuallyPaused, hasError, isMobile, prefersReducedMotion]);

  // Handle IntersectionObserver (pause when scrolled off screen)
  useEffect(() => {
    if (!containerRef.current || isMobile || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!videoRef.current || hasError) return;

        if (!entry.isIntersecting) {
          videoRef.current.pause();
        } else if (!manuallyPaused && !document.hidden) {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMobile, prefersReducedMotion, manuallyPaused, hasError]);

  // Autoplay attempt on mount / readiness
  useEffect(() => {
    if (isMobile || prefersReducedMotion || isDataSaver || hasError) return;

    const video = videoRef.current;
    if (!video) return;

    const attemptAutoplay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked by browser policy; stay on poster/paused
            setIsPlaying(false);
          });
      }
    };

    if (video.readyState >= 3) {
      attemptAutoplay();
    }
  }, [isMobile, prefersReducedMotion, isDataSaver, hasError]);

  // User Play/Pause toggle
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      setManuallyPaused(true);
    } else {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setManuallyPaused(false);
          })
          .catch((err) => {
            console.warn('Playback resume blocked:', err);
          });
      }
    }
  };

  // Video can render if not mobile, not reduced motion, not data saver, and no error
  const shouldRenderVideo = !isMobile && !prefersReducedMotion && !isDataSaver && !hasError;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-charcoal">
      {/* 1. Base Static Image Fallback (Always present beneath for zero CLS) */}
      <img
        src={fallbackImageSrc}
        alt="Danieli Corus Refractory Testing Facility and high-temperature furnace"
        className={`w-full h-full object-cover object-center scale-105 filter brightness-50 contrast-125 transition-opacity duration-1000 ${
          isVideoReady && isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
        loading="eager"
      />

      {/* 2. Native HTML5 Video Element */}
      {shouldRenderVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          onCanPlay={() => setIsVideoReady(true)}
          onPlaying={() => {
            setIsPlaying(true);
            setIsVideoReady(true);
          }}
          onPause={() => setIsPlaying(false)}
          onError={() => {
            setHasError(true);
            setIsVideoReady(false);
          }}
          className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-1000 ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrcFallback} type="video/mp4" />
        </video>
      )}

      {/* 3. Dark Gradient Contrast Overlays (WCAG 2.2 AA Compliance) */}
      {/* Horizontal contrast gradient for editorial text legibility */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-900/90 to-charcoal-950/75"
        aria-hidden="true"
      />
      {/* Subtle top & bottom vignette for boundary contrast */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal/80"
        aria-hidden="true"
      />

      {/* 4. Industrial Grid Pattern Layer */}
      <div 
        className="absolute inset-0 industrial-grid-dark opacity-25 pointer-events-none"
        aria-hidden="true"
      />

      {/* 5. Accessible User Play/Pause Control (Desktop/Tablet only when video is active) */}
      {shouldRenderVideo && isVideoReady && (
        <div className="absolute bottom-6 right-6 z-30 hidden md:block">
          <button
            type="button"
            onClick={togglePlayPause}
            className="flex items-center space-x-2 px-3 py-1.5 bg-charcoal-900/90 hover:bg-charcoal-800 text-charcoal-200 hover:text-white border border-charcoal-700/80 backdrop-blur-md transition-all text-xs font-mono focus:outline-none focus:ring-2 focus:ring-industrial-orange focus:border-industrial-orange shadow-lg group pointer-events-auto"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            title={isPlaying ? 'Pause background video' : 'Play background video'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-industrial-orange group-hover:scale-110 transition-transform" />
                <span className="uppercase tracking-wider text-[10px] font-semibold">Pause video</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-industrial-teal group-hover:scale-110 transition-transform" />
                <span className="uppercase tracking-wider text-[10px] font-semibold">Play video</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
