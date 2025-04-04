
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';
import ReviewList from '@/components/reviews/ReviewList';
import { ReviewType } from '@/pages/Reviews';

interface ProductReviewsTabProps {
  initialReviews: ReviewType[];
}

const ProductReviewsTab: React.FC<ProductReviewsTabProps> = ({ initialReviews }) => {
  const { toast } = useToast();
  
  // Reviews state management
  const [reviews, setReviews] = useState<ReviewType[]>(initialReviews);
  const [filterType, setFilterType] = useState('recent');
  const [reviewToEdit, setReviewToEdit] = useState<ReviewType | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  });
  const [hoverRating, setHoverRating] = useState(0);

  // Function to sort reviews
  const getSortedReviews = () => {
    let sorted = [...reviews];
    switch (filterType) {
      case 'recent':
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'highest':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return sorted.sort((a, b) => a.rating - b.rating);
      case 'helpful':
        return sorted.sort((a, b) => b.helpful - a.helpful);
      default:
        return sorted;
    }
  };

  // Functions to handle reviews
  const handleAddReview = () => {
    if (newReview.rating === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez attribuer une note au produit",
        variant: "destructive"
      });
      return;
    }
    if (newReview.comment.trim() === '') {
      toast({
        title: "Erreur",
        description: "Veuillez ajouter un commentaire",
        variant: "destructive"
      });
      return;
    }

    const review: ReviewType = {
      id: Math.random().toString(36).substring(2, 9),
      productId: 'p1', // In a real app, this would be the actual product ID
      userId: 'current-user',
      userName: 'Vous', // In a real app, this would come from user profile
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      productName: 'TV OLED SMART LG C2', // In a real app, this would be the actual product name
      productImage: '/placeholder.svg' // In a real app, this would be the actual product image
    };

    setReviews([review, ...reviews]);
    setNewReview({
      rating: 0,
      comment: ''
    });
    setShowReviewForm(false);
    toast({
      title: "Avis ajouté",
      description: "Merci d'avoir partagé votre avis sur ce produit!"
    });
  };

  const handleUpdateReview = () => {
    if (!reviewToEdit) return;
    if (newReview.rating === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez attribuer une note au produit",
        variant: "destructive"
      });
      return;
    }
    if (newReview.comment.trim() === '') {
      toast({
        title: "Erreur",
        description: "Veuillez ajouter un commentaire",
        variant: "destructive"
      });
      return;
    }

    const updatedReviews = reviews.map(review => 
      review.id === reviewToEdit.id 
        ? {
            ...review,
            rating: newReview.rating,
            comment: newReview.comment,
            date: new Date().toISOString().split('T')[0] // Update the date
          } 
        : review
    );

    setReviews(updatedReviews);
    setReviewToEdit(null);
    setNewReview({
      rating: 0,
      comment: ''
    });
    toast({
      title: "Avis mis à jour",
      description: "Votre avis a été modifié avec succès"
    });
  };

  const handleEditReview = (review: ReviewType) => {
    setReviewToEdit(review);
    setNewReview({
      rating: review.rating,
      comment: review.comment
    });
    setShowReviewForm(true);
  };

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id));
    toast({
      title: "Avis supprimé",
      description: "Votre avis a été supprimé avec succès"
    });
  };

  const handleMarkHelpful = (id: string) => {
    setReviews(reviews.map(review => 
      review.id === id 
        ? { ...review, helpful: review.helpful + 1 } 
        : review
    ));
    toast({
      description: "Merci d'avoir noté cet avis comme utile"
    });
  };

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
        onClick={() => interactive && setNewReview({ ...newReview, rating: i + 1 })}
      >
        <Star 
          size={interactive ? 24 : 16} 
          className={`${
            interactive 
              ? (hoverRating ? hoverRating > i : newReview.rating > i) 
                ? 'text-yellow-500 fill-yellow-500' 
                : 'text-gray-300' 
              : i < rating 
                ? 'text-yellow-500 fill-yellow-500' 
                : 'text-gray-300'
          } transition-colors`} 
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
            <span className="font-medium">
              {reviews.length > 0 
                ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1) 
                : '0'}
            </span>
            <span className="mx-1">/</span>
            <span>5</span>
            <div className="flex items-center ml-1">
              {renderStars(
                reviews.length > 0 
                  ? Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) 
                  : 0
              )}
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
        <Button onClick={() => {
          setShowReviewForm(true);
          setReviewToEdit(null);
          setNewReview({
            rating: 0,
            comment: ''
          });
        }} className="mb-6">
          Ajouter un avis
        </Button>
      )}

      {/* Review form */}
      {showReviewForm && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {reviewToEdit ? 'Modifier votre avis' : 'Ajouter un nouvel avis'}
            </h3>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setShowReviewForm(false);
                setReviewToEdit(null);
              }} 
              className="h-8 w-8 p-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              <span className="sr-only">Fermer</span>
            </Button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="rating">
              Votre note
            </label>
            <div className="flex items-center mb-2">
              {renderStars(newReview.rating, true)}
              <span className="ml-2 text-sm text-gray-600">
                {newReview.rating > 0 ? `${newReview.rating}/5` : 'Sélectionnez une note'}
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="comment">
              Votre avis
            </label>
            <Textarea 
              id="comment" 
              value={newReview.comment} 
              onChange={e => setNewReview({
                ...newReview,
                comment: e.target.value
              })} 
              placeholder="Partagez votre expérience avec ce produit..." 
              className="min-h-[100px]" 
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowReviewForm(false);
                setReviewToEdit(null);
              }}
            >
              Annuler
            </Button>
            <Button onClick={reviewToEdit ? handleUpdateReview : handleAddReview}>
              {reviewToEdit ? 'Mettre à jour' : 'Publier l\'avis'}
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

export default ProductReviewsTab;
