
import React from 'react';
import { ReviewType } from '@/pages/Reviews';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ThumbsUp, Flag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ReviewItemProps {
  review: ReviewType;
  onEdit: (review: ReviewType) => void;
  onDelete: (id: string) => void;
  onMarkHelpful: (id: string) => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review, onEdit, onDelete, onMarkHelpful }) => {
  // Fonction pour afficher les étoiles
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Formatage de la date relative
  const formattedDate = formatDistanceToNow(new Date(review.date), { 
    addSuffix: true,
    locale: fr 
  });

  return (
    <Card className="hover:shadow-elevated transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Image et informations du produit */}
          <div className="flex-shrink-0 w-full sm:w-32 mb-4 sm:mb-0">
            <img 
              src={review.productImage} 
              alt={review.productName} 
              className="rounded-md w-full sm:w-32 h-32 object-cover object-center border border-gray-200"
            />
            <h4 className="text-sm font-medium mt-2 text-center sm:text-left">{review.productName}</h4>
          </div>
          
          {/* Contenu de l'avis */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-600">({review.rating}/5)</span>
                </div>
                <h3 className="font-medium mt-1 mb-2">{review.userName}</h3>
                <p className="text-sm text-gray-500 mb-1">{formattedDate}</p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onEdit(review)}
                  className="h-8 w-8 p-0"
                >
                  <Edit size={16} />
                  <span className="sr-only">Modifier</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onDelete(review.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  <span className="sr-only">Supprimer</span>
                </Button>
              </div>
            </div>
            
            <p className="my-3 text-gray-700">{review.comment}</p>
            
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onMarkHelpful(review.id)}
                className="h-8 text-xs"
              >
                <ThumbsUp size={14} className="mr-1" />
                Utile ({review.helpful})
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-xs"
              >
                <Flag size={14} className="mr-1" />
                Signaler
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewItem;
