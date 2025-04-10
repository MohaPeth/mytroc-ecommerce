
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ProductFeaturesProps {
  features: string[];
  condition: string;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features, condition }) => {
  return (
    <>
      {/* Product Condition Badge */}
      <div className="mb-4">
        <Badge variant="outline" className="text-sm px-3 py-1">{condition}</Badge>
      </div>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-mytroc-primary mr-2">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductFeatures;
