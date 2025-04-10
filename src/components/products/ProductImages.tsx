
import React, { useState } from 'react';

interface ProductImagesProps {
  images: string[];
  productName: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({ images, productName }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [imageZoomed, setImageZoomed] = useState(false);

  // Function to toggle image zoom
  const toggleImageZoom = () => {
    setImageZoomed(!imageZoomed);
  };

  return (
    <div className="lg:w-1/2">
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        {/* Thumbnails */}
        <div className="flex lg:flex-col gap-2 mt-4 lg:mt-0">
          {images.map((img, index) => (
            <div 
              key={index} 
              className={`border-2 ${activeImage === index ? 'border-mytroc-primary' : 'border-gray-200'} rounded cursor-pointer overflow-hidden w-16 h-16`} 
              onClick={() => setActiveImage(index)}
            >
              <img 
                src={img} 
                alt={`${productName} thumbnail ${index + 1}`} 
                className="w-full h-full object-contain" 
              />
            </div>
          ))}
        </div>
        
        {/* Main Image with Zoom Functionality */}
        <div 
          className={`bg-gray-100 rounded-lg flex-grow ${imageZoomed ? 'h-[500px]' : 'h-80 lg:h-96'} flex items-center justify-center p-4 cursor-zoom-in transition-all duration-300 overflow-hidden relative`}
          onClick={toggleImageZoom}
        >
          <img 
            src={images[activeImage]} 
            alt={productName} 
            className={`${imageZoomed ? 'scale-150' : 'scale-100'} transition-transform duration-300 max-w-full max-h-full object-contain`} 
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
