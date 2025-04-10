
import React from 'react';

interface ProductDescriptionTabProps {
  description: string;
}

const ProductDescriptionTab: React.FC<ProductDescriptionTabProps> = ({ description }) => {
  return (
    <div className="prose max-w-none">
      <p className="whitespace-pre-line">{description}</p>
    </div>
  );
};

export default ProductDescriptionTab;
