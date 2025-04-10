
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { ReviewType } from '@/pages/Reviews';
import ReviewList from './ReviewList';
import { useToast } from '@/hooks/use-toast';

interface ReviewsTabProps {
  productRating: number;
  reviews: ReviewType[];
  filterType: string;
  setFilterType: (type: string) => void;
  showReviewForm: boolean;
  setShowReviewForm: (show: boolean) => void;
  reviewToEdit: ReviewType | null;
  setReviewToEdit: (review: ReviewType | null) => void;
  newReview: {
    rating: number;
    comment: string;
  };
  setNewReview: (review: { rating: number; comment: string }) => void;
  handleAddReview: () => void;
  handleUpdateReview: () => void;
  handleEditReview: (review: ReviewType) => void;
  handleDeleteReview: (id: string) => void;
  handleMarkHelpful: (id: string) => void;
  hoverRating: number;
  setHoverRating: (rating: number) => void;
  getSortedReviews: () => ReviewType[];
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({
  productRating,
  reviews,
  filterType,
  setFilterType,
  showReviewForm,
  setShowReviewForm,
  reviewToEdit,
  setReviewToEdit,
  newReview,
  setNewReview,
  handleAddReview,
  handleUpdateReview,
  handleEditReview,
  handleDeleteReview,
  handleMarkHelpful,
  hoverRating,
  setHoverRating,
  getSortedReviews
}) => {
  // Function to render stars for ratings
  const renderStars = (rating: number, interactive = false) => {
    return Array(5).fill(0).map((_, i) => (
      <button 
        key={i} 
        type="button" 
        disabled={!interactive} 
        className={`focus:outline-none ${interactive ? 'cursor-pointer' : ''}`} 
        onMouseEnter={() => interactive && setHoverRating(i + 1)} 
        onMouseLeave={() => interactive && setHoverRating(0)} 
        onClick={() => interactive && setNewReview({
          ...newReview,
          rating: i + 1
        })}
      >
        <Star 
          size={interactive ? 24 : 16} 
          className={`${interactive ? (hoverRating ? hoverRating > i : newReview.rating > i) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300' : i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} transition-colors`} 
        />
      </button>
    ));
  };

  return (
    <>
      {/* Reviews header with filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">Avis clients</h3>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">{productRating}</span>
            <span className="mx-1">/</span>
            <span>5</span>
            <div className="flex items-center ml-1">
              {renderStars(productRating)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select 
            className="border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-mytroc-primary/30 w-full sm:w-auto" 
            value={filterType} 
            onChange={e => setFilterType(e.target.value)}
          >
            <option value="recent">Plus récents</option>
            <option value="oldest">Plus anciens</option>
            <option value="highest">Meilleures notes</option>
            <option value="lowest">Moins bonnes notes</option>
            <option value="helpful">Plus utiles</option>
          </select>
        </div>
      </div>

      {/* Add review button */}
      {!showReviewForm && (
        <Button 
          onClick={() => {
            setShowReviewForm(true);
            setReviewToEdit(null);
            setNewReview({
              rating: 0,
              comment: ''
            });
          }} 
          className="mb-6"
        >
          Ajouter un avis
        </Button>
      )}

      {/* Review form */}
      {showReviewForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
          <h4 className="font-medium text-lg mb-4">
            {reviewToEdit ? "Modifier votre avis" : "Ajouter un avis"}
          </h4>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Note</label>
            <div className="flex gap-1">
              {renderStars(newReview.rating, true)}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="reviewComment" className="block text-sm font-medium mb-2">Commentaire</label>
            <Textarea 
              id="reviewComment" 
              placeholder="Partagez votre expérience avec ce produit..." 
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              className="min-h-[120px]"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowReviewForm(false);
                setNewReview({rating: 0, comment: ''});
              }}
            >
              Annuler
            </Button>
            <Button 
              onClick={reviewToEdit ? handleUpdateReview : handleAddReview}
            >
              {reviewToEdit ? "Mettre à jour" : "Publier"}
            </Button>
          </div>
        </div>
      )}

      {/* Reviews list */}
      <ReviewList 
        reviews={getSortedReviews()} 
        onEdit={handleEditReview} 
        onDelete={handleDeleteReview} 
        onMarkHelpful={handleMarkHelpful}
      />
    </>
  );
};

export default ReviewsTab;
