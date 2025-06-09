
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { motion } from 'framer-motion';

interface FavoriteButtonProps {
  productId: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  showText?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  productId, 
  variant = 'ghost',
  size = 'default',
  showText = false
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isFav = isFavorite(productId);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFav) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Button
        variant={variant}
        size={size}
        onClick={handleToggle}
        className={`gap-2 ${isFav ? 'text-red-500 hover:text-red-600' : ''}`}
      >
        <Heart 
          className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`}
        />
        {showText && (isFav ? 'Retirer des favoris' : 'Ajouter aux favoris')}
      </Button>
    </motion.div>
  );
};

export default FavoriteButton;
