
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ReviewType } from '@/pages/Reviews';
import ProductReviewsTab from './ProductReviewsTab';

interface Specification {
  name: string;
  value: string;
}

interface ProductTabsProps {
  description: string;
  specifications: Specification[];
  reviews: ReviewType[];
}

const ProductTabs: React.FC<ProductTabsProps> = ({ 
  description, 
  specifications, 
  reviews 
}) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="mb-6 w-full justify-start border-b rounded-none bg-transparent p-0 h-auto">
        <TabsTrigger 
          value="description" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-mytroc-primary bg-transparent px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Description
        </TabsTrigger>
        <TabsTrigger 
          value="specification" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-mytroc-primary bg-transparent px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Spécification
        </TabsTrigger>
        <TabsTrigger 
          value="reviews" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-mytroc-primary bg-transparent px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Avis ({reviews.length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="mt-4">
        <div className="prose max-w-none">
          <p className="whitespace-pre-line">{description}</p>
        </div>
      </TabsContent>
      
      <TabsContent value="specification" className="mt-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {specifications.map((spec, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-gray-200 px-4 py-3 font-medium">{spec.name}</td>
                  <td className="border border-gray-200 px-4 py-3">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-4">
        <ProductReviewsTab initialReviews={reviews} />
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
