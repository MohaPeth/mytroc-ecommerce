
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  bgColor?: string;
  buttonText?: string;
  buttonLink?: string;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const slides: Slide[] = [
    {
      id: 1,
      image: "/lovable-uploads/9753e513-631d-4433-a854-995275268ea0.png",
      title: "Facilités de paiement",
      description: "Devis Caf et services sociaux\nDépannage\nPièces détachées",
      bgColor: "bg-green-600",
      buttonText: "Pour plus d'informations",
      buttonLink: "#"
    },
    {
      id: 2,
      image: "/lovable-uploads/9753e513-631d-4433-a854-995275268ea0.png",
      title: "FACILITÉS DE PAIEMENT",
      description: "3X\nSANS FRAIS",
      bgColor: "bg-green-600",
      buttonText: "",
      buttonLink: "#"
    },
    {
      id: 3,
      image: "/lovable-uploads/9753e513-631d-4433-a854-995275268ea0.png",
      title: "Notre sélection de marques à prix discount !",
      description: "",
      bgColor: "bg-white",
      buttonText: "",
      buttonLink: "#"
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
    <div className="relative w-full h-[280px] md:h-[300px] overflow-hidden bg-mytroc-lightgray rounded-xl shadow-subtle mt-[120px] md:mt-[120px]">
      {/* Address and info bar */}
      <div className="absolute bottom-0 left-0 w-full bg-white/80 py-1 px-4 text-xs text-gray-700 z-10">
        <div className="flex justify-between items-center">
          <div>98 Boulevard de Ménilmontant 75020 PARIS</div>
          <div>01 43 66 19 51</div>
          <div className="text-xs text-gray-500">Design par SwiftTech</div>
        </div>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          // Special rendering for the third slide (brands)
          if (index === 2) {
            return (
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
                <div className="absolute inset-0 w-full h-full bg-white">
                  <div className="flex flex-col h-full justify-center items-center py-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-6">{slide.title}</h3>
                    <div className="grid grid-cols-3 gap-4 px-8">
                      <div className="flex justify-center">
                        <img src="/placeholder.svg" alt="NEFF" className="h-8 object-contain" />
                      </div>
                      <div className="flex justify-center">
                        <img src="/placeholder.svg" alt="Electrolux" className="h-8 object-contain" />
                      </div>
                      <div className="flex justify-center">
                        <img src="/placeholder.svg" alt="Bosch" className="h-8 object-contain" />
                      </div>
                      <div className="flex justify-center">
                        <img src="/placeholder.svg" alt="GLEM" className="h-8 object-contain" />
                      </div>
                      <div className="flex justify-center">
                        <img src="/placeholder.svg" alt="Siemens" className="h-8 object-contain" />
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">VOIR</div>
                      </div>
                    </div>
                    <div className="absolute right-8 bottom-12">
                      <img src="/placeholder.svg" alt="Home appliances" className="h-24 object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Special rendering for the second slide (3X SANS FRAIS)
          if (index === 1) {
            return (
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
                <div className="absolute inset-0 w-full h-full bg-green-600">
                  <div className="flex flex-col h-full justify-center items-center px-4 py-8 text-white">
                    <h3 className="text-lg font-medium mb-4">{slide.title}</h3>
                    <div className="text-6xl font-bold mb-4">3X</div>
                    <div className="text-2xl font-bold">SANS FRAIS</div>
                    <div className="mt-4 flex space-x-2">
                      <div className="bg-white rounded-full h-8 w-12"></div>
                      <div className="bg-white rounded-full h-8 w-12"></div>
                      <div className="bg-white rounded-full h-8 w-12"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // First slide with NESSI DISCOUNT
          return (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 w-full h-full transition-all duration-500 ease-apple flex",
                index === currentSlide 
                  ? "opacity-100 translate-x-0" 
                  : index < currentSlide 
                    ? "opacity-0 -translate-x-full" 
                    : "opacity-0 translate-x-full"
              )}
            >
              <div className="w-1/2 h-full bg-green-600 flex flex-col justify-center p-6 text-white">
                <h3 className="text-xl font-bold mb-3">{slide.title}</h3>
                <p className="whitespace-pre-line mb-6">{slide.description}</p>
              </div>
              <div className="w-1/2 h-full bg-blue-800 flex flex-col justify-center items-center p-6 text-white">
                <div className="text-sm font-medium mb-2">NESSI DISCOUNT ET LA CAF</div>
                <img src="/placeholder.svg" alt="CAF" className="h-16 w-16 object-contain mb-4" />
                <button className="bg-blue-700 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded flex items-center">
                  <span>Pour plus d'informations</span>
                  <span className="ml-2">cliquez ici</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-elevated hover:scale-105 transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="text-mytroc-darkgray" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-elevated hover:scale-105 transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="text-mytroc-darkgray" />
      </button>
    </div>
  );
};

export default HeroSlider;
