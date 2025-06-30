
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  productId: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  productId,
  variant = 'ghost',
  size = 'md',
  className
}) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isInFavorites = isFavorite(productId);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInFavorites) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(productId);
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'sm': return 'h-8 w-8';
      case 'lg': return 'h-12 w-12';
      default: return 'h-10 w-10';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 16;
      case 'lg': return 24;
      default: return 20;
    }
  };

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={handleToggleFavorite}
      className={cn(
        getButtonSize(),
        'transition-colors',
        isInFavorites && 'text-red-500 hover:text-red-600',
        className
      )}
      aria-label={isInFavorites ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <Heart 
        size={getIconSize()} 
        className={cn(
          'transition-all',
          isInFavorites && 'fill-current'
        )} 
      />
    </Button>
  );
};

export default FavoriteButton;
