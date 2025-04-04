
import React, { useState } from 'react';

interface Image {
  src: string;
  alt: string;
}

interface ProductImagesProps {
  images: string[];
  productName: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({ images, productName }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
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
      
      {/* Main Image */}
      <div className="bg-gray-100 rounded-lg flex-grow h-80 lg:h-96 flex items-center justify-center p-4">
        <img 
          src={images[activeImage]} 
          alt={productName} 
          className="max-w-full max-h-full object-contain" 
        />
      </div>
    </div>
  );
};

export default ProductImages;
