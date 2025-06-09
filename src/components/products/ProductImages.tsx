
import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductImagesProps {
  images: string[];
  productName: string;
  isLoading?: boolean;
}

const ProductImages: React.FC<ProductImagesProps> = ({ images, productName, isLoading = false }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [imageZoomed, setImageZoomed] = useState(false);
  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>({});

  const toggleImageZoom = () => {
    setImageZoomed(!imageZoomed);
  };

  const handleImageLoad = (index: number) => {
    setImageLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleImageLoadStart = (index: number) => {
    setImageLoading(prev => ({ ...prev, [index]: true }));
  };

  if (isLoading) {
    return (
      <div className="lg:w-1/2">
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          <div className="flex lg:flex-col gap-2 mt-4 lg:mt-0">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="w-16 h-16 rounded" />
            ))}
          </div>
          <Skeleton className="flex-grow h-80 lg:h-96 rounded-lg" />
        </div>
      </div>
    );
  }

  const displayImages = images.length > 0 ? images : ['/placeholder.svg'];

  return (
    <div className="lg:w-1/2">
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        {/* Thumbnails */}
        <div className="flex lg:flex-col gap-2 mt-4 lg:mt-0">
          {displayImages.map((img, index) => (
            <div 
              key={index} 
              className={`border-2 ${activeImage === index ? 'border-mytroc-primary' : 'border-gray-200'} rounded cursor-pointer overflow-hidden w-16 h-16 relative`} 
              onClick={() => setActiveImage(index)}
            >
              {imageLoading[index] && (
                <Skeleton className="absolute inset-0" />
              )}
              <img 
                src={img} 
                alt={`${productName} thumbnail ${index + 1}`} 
                className="w-full h-full object-contain" 
                onLoadStart={() => handleImageLoadStart(index)}
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageLoad(index)}
              />
            </div>
          ))}
        </div>
        
        {/* Main Image with Zoom Functionality */}
        <div 
          className={`bg-gray-100 rounded-lg flex-grow ${imageZoomed ? 'h-[500px]' : 'h-80 lg:h-96'} flex items-center justify-center p-4 cursor-zoom-in transition-all duration-300 overflow-hidden relative`}
          onClick={toggleImageZoom}
        >
          {imageLoading[activeImage] && (
            <Skeleton className="absolute inset-0 rounded-lg" />
          )}
          <img 
            src={displayImages[activeImage]} 
            alt={productName} 
            className={`${imageZoomed ? 'scale-150' : 'scale-100'} transition-transform duration-300 max-w-full max-h-full object-contain`} 
            onLoadStart={() => handleImageLoadStart(activeImage)}
            onLoad={() => handleImageLoad(activeImage)}
            onError={() => handleImageLoad(activeImage)}
          />
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            {imageZoomed ? "Cliquez pour réduire" : "Cliquez pour zoomer"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
