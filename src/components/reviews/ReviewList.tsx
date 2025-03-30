
import React from 'react';
import { ReviewType } from '@/pages/Reviews';
import ReviewItem from './ReviewItem';

interface ReviewListProps {
  reviews: ReviewType[];
  onEdit: (review: ReviewType) => void;
  onDelete: (id: string) => void;
  onMarkHelpful: (id: string) => void;
  className?: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ 
  reviews, 
  onEdit, 
  onDelete, 
  onMarkHelpful,
  className = ""
}) => {
  if (reviews.length === 0) {
    return (
      <div className={`text-center py-8 bg-gray-50 rounded-lg ${className}`}>
        <h3 className="text-xl font-medium text-gray-700 mb-2">Aucun avis trouvé</h3>
        <p className="text-gray-500">Soyez le premier à donner votre avis sur ce produit</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {reviews.map(review => (
        <ReviewItem 
          key={review.id} 
          review={review} 
          onEdit={onEdit}
          onDelete={onDelete}
          onMarkHelpful={onMarkHelpful}
        />
      ))}
    </div>
  );
};

export default ReviewList;
