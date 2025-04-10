
import React from 'react';

interface Size {
  size: string;
  selected: boolean;
}

interface ProductSizesProps {
  sizes: Size[];
}

const ProductSizes: React.FC<ProductSizesProps> = ({ sizes }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
      {sizes.map((size, index) => (
        <div 
          key={index} 
          className={`border rounded-md p-3 text-center cursor-pointer transition-colors ${size.selected ? 'border-mytroc-primary bg-mytroc-primary/10 text-mytroc-primary' : 'border-gray-200 hover:border-gray-300'}`}
        >
          {size.size}
        </div>
      ))}
    </div>
  );
};

export default ProductSizes;
