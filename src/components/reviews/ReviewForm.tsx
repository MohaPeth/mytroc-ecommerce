
import React, { useState, useEffect } from 'react';
import { ReviewType } from '@/pages/Reviews';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Star, X } from 'lucide-react';

interface ReviewFormProps {
  onSubmit: (review: any) => void;
  initialData: ReviewType | null;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState(initialData?.comment || '');
  const [productName, setProductName] = useState(initialData?.productName || '');
  const [productImage, setProductImage] = useState(initialData?.productImage || '/placeholder.svg');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setRating(initialData.rating);
      setComment(initialData.comment);
      setProductName(initialData.productName);
      setProductImage(initialData.productImage);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Veuillez attribuer une note à ce produit');
      return;
    }
    
    if (comment.trim() === '') {
      setError('Veuillez ajouter un commentaire');
      return;
    }
    
    const reviewData = {
      ...(initialData || {}),
      rating,
      comment,
      productName,
      productImage,
      userId: 'u1', // Dans une application réelle, cela viendrait de l'authentification
      userName: 'Sophie Martin', // Dans une application réelle, cela viendrait de l'authentification
    };
    
    onSubmit(reviewData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">
          {initialData ? 'Modifier votre avis' : 'Ajouter un nouvel avis'}
        </h3>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={onCancel}
          className="h-8 w-8 p-0"
        >
          <X size={18} />
          <span className="sr-only">Fermer</span>
        </Button>
      </div>
      
      {!initialData && (
        <div className="mb-4">
          <Label htmlFor="productName">Nom du produit</Label>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mytroc-input mt-1 block w-full"
            placeholder="Entrez le nom du produit"
            required
          />
        </div>
      )}
      
      <div className="mb-4">
        <Label>Votre note</Label>
        <div className="flex items-center mt-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className="focus:outline-none"
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(value)}
            >
              <Star
                size={24}
                className={`${
                  (hoverRating ? hoverRating >= value : rating >= value)
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-300'
                } cursor-pointer transition-colors`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {rating > 0 ? `${rating}/5` : 'Sélectionnez une note'}
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="comment">Votre avis</Label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mytroc-input mt-1 block w-full h-32"
          placeholder="Partagez votre expérience avec ce produit..."
          required
        />
      </div>
      
      {error && (
        <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="flex justify-end space-x-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">
          {initialData ? 'Mettre à jour' : 'Publier l\'avis'}
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
