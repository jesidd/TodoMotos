import React, { useState, useEffect, useCallback, useRef, memo, lazy, Suspense, useMemo } from 'react';
import {SLIDES} from "./bannerData"
import type {Slide,BannerProps} from "./bannerData"


// Carga perezosa de íconos para optimizar el rendimiento
const ChevronLeftIcon = lazy(() => import('lucide-react').then(m => ({ default: m.ChevronLeft })));
const ChevronRightIcon = lazy(() => import('lucide-react').then(m => ({ default: m.ChevronRight })));


// Hook personalizado que maneja el estado del carrusel
const useCarousel = (slides: readonly Slide[], interval: number, onChange?: (i: number) => void) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false); // Para evitar múltiples transiciones
  const intervalRef = useRef<number | null>(null);// Ref para el autoplay
  const timeoutRef = useRef<number | null>(null); // Ref para la transición

  // Cambiar a un índice específico
  const goTo = useCallback((i: number) => {
    if (i < 0 || i >= slides.length || transitioning) return;
    setTransitioning(true);
    timeoutRef.current = window.setTimeout(() => setTransitioning(false), 500);
    setIndex(i);
    onChange?.(i);
  }, [slides.length, transitioning, onChange]);

  const next = useCallback(() => goTo((index + 1) % slides.length), [index, slides.length, goTo]);
  const prev = useCallback(() => goTo((index - 1 + slides.length) % slides.length), [index, slides.length, goTo]);

  // Manejo de autoplay
  useEffect(() => {
    if (!paused) intervalRef.current = window.setInterval(next, interval);
    return () => clearInterval(intervalRef.current!);
  }, [paused, interval, next]);

  // liampiamos cuando el componente ya no está
  useEffect(() => () => {
    clearInterval(intervalRef.current!);
    clearTimeout(timeoutRef.current!);
  }, []);

  return { index, transitioning, setPaused, next, prev };
};

//el memo aqui se usa para que react reutilice el render anterior y no vuelve a ejecutar el componente, si es el mismo.
const Banner: React.FC<BannerProps> = memo(({ 
  slides = SLIDES,
  autoPlayInterval = 5000,
  showArrows = true,
  className = '',
  onSlideChange,
  preloadNext = true
}) => {
  const { index, transitioning, setPaused, next, prev } = useCarousel(slides, autoPlayInterval, onSlideChange);
  const current = slides[index];

    //Permite desplazar las slides con el dedo
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = (touchStartX.current ?? 0) - e.changedTouches[0].clientX;
    const threshold = 50;
    if (deltaX > threshold) next();
    else if (deltaX < -threshold) prev();
  };

  // Calcula qué slides deben ser visibles (actual, siguiente o anterior)
  const visible = useMemo(() => {
    const set = new Set([index]);
    if (preloadNext) {
      set.add((index + 1) % slides.length);
      set.add((index - 1 + slides.length) % slides.length);
    }
    return Array.from(set);
  }, [index, slides.length, preloadNext]);

  return (
    <div
    className={`relative w-full aspect-[16/9] sm:aspect-[16/6] md:aspect-[16/5] lg:aspect-[16/4] xl:aspect-[16/3] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] max-h-[90vh] overflow-hidden bg-black group antialiased will-change-transform ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0">
        {visible.map(i => {
          const s = slides[i];
          const active = i === index;
          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              aria-hidden={!active}
              style={{ willChange: 'opacity' }}
            >
              <img
                src={s.imageUrl}
                loading={s.priority ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
            </div>
          );
        })}
      </div>


      {/* Contenido de texto */}
      <div className="relative z-20 h-full flex items-center">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-2">
          <div className="max-w-2xl text-left px-12 sm:px-20 md:px-24 lg:px-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.9rem] font-bold text-white mb-6 leading-tight drop-shadow-md">
              {current.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-light whitespace-pre-line drop-shadow-sm">
              {current.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Flechas*/}
      {showArrows && slides.length > 1 && (
        <Suspense fallback={null}>
          <button
            onClick={prev}
            disabled={transitioning}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 disabled:opacity-30 text-white cursor-pointer transition-all duration-300 hover:scale-110 hidden sm:block"
          >
            <ChevronLeftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <button
            onClick={next}
            disabled={transitioning}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 disabled:opacity-30 text-white cursor-pointer transition-all duration-300 hover:scale-110 hidden sm:block"
          >
            <ChevronRightIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </Suspense>
      )}
    </div>
  );
});

export default Banner;
