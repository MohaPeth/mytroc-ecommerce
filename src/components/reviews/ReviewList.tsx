
import React from 'react';
import { ReviewType } from '@/pages/Reviews';
import ReviewItem from './ReviewItem';

interface ReviewListProps {
  reviews: ReviewType[];
  onEdit: (review: ReviewType) => void;
  onDelete: (id: string) => void;
  onMarkHelpful: (id: string) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, onEdit, onDelete, onMarkHelpful }) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-medium text-gray-700 mb-2">Aucun avis trouvé</h3>
        <p className="text-gray-500">Vous n'avez pas encore publié d'avis ou votre recherche n'a donné aucun résultat</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
