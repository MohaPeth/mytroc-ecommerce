import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AssistanceButton from '@/components/AssistanceButton';
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';
import CartPopup from '@/components/cart/CartPopup';
import { useProductSearch } from '@/hooks/useProductSearch';
import SearchFilters from '@/components/search/SearchFilters';
import ProductCardSkeleton from '@/components/search/ProductCardSkeleton';
import FavoriteButton from '@/components/favorites/FavoriteButton';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const { addItem } = useCart();
  const { results, isLoading, searchProducts, loadMore } = useProductSearch();

  // Effectuer la recherche quand les filtres changent
  useEffect(() => {
    const filters = {
      searchTerm,
      categoryFilter,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder
    };
    
    searchProducts(filters, 1);
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, minPrice, maxPrice, sortBy, sortOrder]);

  const handleLoadMore = () => {
    const filters = {
      searchTerm,
      categoryFilter,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder
    };
    
    loadMore(filters, currentPage);
    setCurrentPage(prev => prev + 1);
  };

  const handleReset = () => {
    setSearchTerm('');
    setCategoryFilter(null);
    setMinPrice(null);
    setMaxPrice(null);
    setSortBy('created_at');
    setSortOrder('DESC');
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.original_price,
      quantity: 1,
      image: product.images?.[0] || '/placeholder.svg',
      brand: product.brand || 'MyTroc',
      productId: product.id
    });

    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
      setShowCartPopup(true);
    }, 500);
  };

  const getProductImage = (images: any) => {
    if (Array.isArray(images) && images.length > 0) {
      return images[0];
    }
    return '/placeholder.svg';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* En-tête de page */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Boutique</h1>
            <p className="text-muted-foreground">
              {results.total} produit{results.total > 1 ? 's' : ''} trouvé{results.total > 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Filtres de recherche */}
          <div className="mb-8">
            <SearchFilters
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
              minPrice={minPrice}
              onMinPriceChange={setMinPrice}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              onReset={handleReset}
            />
          </div>

          {/* Grille de produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading && results.products.length === 0 ? (
              // Skeleton loaders pour le chargement initial
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : (
              results.products.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-elevated transition-all duration-300">
                  <Link to={`/produit/${product.id}`} className="block">
                    <div className="relative pt-[100%]">
                      <img 
                        src={getProductImage(product.images)} 
                        alt={product.name} 
                        className="absolute inset-0 w-full h-full object-contain p-6" 
                      />
                      {product.original_price && product.original_price > product.price && (
                        <Badge className="absolute top-4 right-4 bg-mytroc-accent">
                          -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                        </Badge>
                      )}
                      <div className="absolute top-4 left-4">
                        <FavoriteButton productId={product.id} />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold">{product.price.toFixed(2)} €</span>
                        {product.original_price && product.original_price > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.original_price.toFixed(2)} €
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Link>
                  <CardFooter className="p-4 pt-0">
                    <motion.div 
                      className="w-full" 
                      whileTap={{ scale: 0.95 }}
                      animate={addedProductId === product.id ? {
                        scale: [1, 1.1, 1],
                        transition: { duration: 0.5 }
                      } : {}}
                    >
                      <Button 
                        className="w-full gap-2" 
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart size={18} />
                        Ajouter au panier
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>

          {/* Bouton charger plus */}
          {results.hasMore && (
            <div className="mt-8 flex justify-center">
              <Button 
                variant="outline" 
                onClick={handleLoadMore}
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? 'Chargement...' : 'Charger plus de produits'}
              </Button>
            </div>
          )}

          {/* Message si aucun résultat */}
          {!isLoading && results.products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                Aucun produit trouvé pour votre recherche
              </p>
              <Button variant="outline" onClick={handleReset}>
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <AssistanceButton />
      <CartPopup show={showCartPopup} onClose={() => setShowCartPopup(false)} />
    </div>
  );
};

export default Shop;
