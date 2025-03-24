
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobile = useIsMobile();
  
  const slides: Slide[] = [
    {
      id: 1,
      image: '/lovable-uploads/17d3d839-28a7-44de-8aef-82dc656423e3.png',
      title: "Facilités de paiement",
      description: "Paiement en 3X SANS FRAIS et service Devis Caf"
    },
    {
      id: 2,
      image: '/placeholder.svg',
      title: "Pièces détachées & dépannage",
      description: "Grand choix de pièces pour vos appareils électroménagers"
    },
    {
      id: 3,
      image: '/placeholder.svg',
      title: "Marques à prix discount",
      description: "Notre sélection de marques NEFF, Bosch, GLEM, Siemens"
    }
  ];
  
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);
  
  return (
    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[500px] overflow-hidden bg-mytroc-lightgray rounded-lg md:rounded-2xl shadow-subtle mt-[130px] md:mt-[150px]">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 w-full h-full transition-all duration-500 ease-apple",
              index === currentSlide 
                ? "opacity-100 translate-x-0" 
                : index < currentSlide 
                  ? "opacity-0 -translate-x-full" 
                  : "opacity-0 translate-x-full"
            )}
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            </div>
            
            <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-16 text-white max-w-md sm:max-w-xl md:max-w-2xl">
              <div className={cn(
                "transition-all duration-700 delay-100",
                index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 md:mb-4">{slide.title}</h2>
                <p className="text-sm sm:text-base md:text-xl mb-4 md:mb-8">{slide.description}</p>
                <button className="mytroc-btn-primary text-sm sm:text-base py-1.5 px-3 sm:py-2 sm:px-4 md:py-2.5 md:px-5">
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      {!isMobile && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-elevated hover:scale-105 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft size={isMobile ? 18 : 24} className="text-mytroc-darkgray" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-elevated hover:scale-105 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight size={isMobile ? 18 : 24} className="text-mytroc-darkgray" />
          </button>
        </>
      )}
      
      {/* Indicators */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-white scale-110 w-5 sm:w-8"
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
