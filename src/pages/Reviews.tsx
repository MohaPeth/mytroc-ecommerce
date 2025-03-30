
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Star as StarIcon } from 'lucide-react';
import ReviewList from '@/components/reviews/ReviewList';
import ReviewForm from '@/components/reviews/ReviewForm';
import { Card, CardContent } from '@/components/ui/card';

// Types pour les avis
export type ReviewType = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  productName: string;
  productImage: string;
};

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('recent');
  const [showForm, setShowForm] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState<ReviewType | null>(null);

  // Données d'exemple pour les avis
  const [reviews, setReviews] = useState<ReviewType[]>([
    {
      id: '1',
      productId: 'p1',
      userId: 'u1',
      userName: 'Sophie Martin',
      rating: 5,
      comment: 'Produit excellent ! Livraison rapide et article conforme à la description.',
      date: '2023-05-10',
      helpful: 12,
      productName: 'Mini Frigo',
      productImage: '/placeholder.svg',
    },
    {
      id: '2',
      productId: 'p2',
      userId: 'u1',
      userName: 'Sophie Martin',
      rating: 4,
      comment: 'Très bon ordinateur, performant et élégant. Seul bémol : l\'autonomie est un peu juste.',
      date: '2023-04-22',
      helpful: 8,
      productName: 'Asus Zenbook',
      productImage: '/placeholder.svg',
    },
    {
      id: '3',
      productId: 'p3',
      userId: 'u2',
      userName: 'Jean Dupont',
      rating: 3,
      comment: 'Qualité d\'image excellente mais l\'interface est un peu compliquée à utiliser.',
      date: '2023-06-05',
      helpful: 5,
      productName: 'TV OLED LG C2',
      productImage: '/placeholder.svg',
    },
  ]);

  // Fonction pour filtrer les avis
  const getFilteredReviews = () => {
    let filtered = [...reviews];
    
    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(
        review => 
          review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.comment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Tri selon le filtre sélectionné
    switch (filterType) {
      case 'recent':
        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'highest':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return filtered.sort((a, b) => a.rating - b.rating);
      case 'helpful':
        return filtered.sort((a, b) => b.helpful - a.helpful);
      default:
        return filtered;
    }
  };

  // Fonctions pour gérer les avis
  const handleAddReview = (review: Omit<ReviewType, 'id' | 'date' | 'helpful'>) => {
    const newReview: ReviewType = {
      ...review,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
    };
    
    setReviews([newReview, ...reviews]);
    setShowForm(false);
  };

  const handleEditReview = (review: ReviewType) => {
    setReviewToEdit(review);
    setShowForm(true);
  };

  const handleUpdateReview = (updatedReview: ReviewType) => {
    setReviews(reviews.map(r => r.id === updatedReview.id ? updatedReview : r));
    setReviewToEdit(null);
    setShowForm(false);
  };

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  const handleMarkHelpful = (id: string) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, helpful: review.helpful + 1 } : review
    ));
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Mes Avis</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Tous mes avis</TabsTrigger>
          <TabsTrigger value="published">Publiés</TabsTrigger>
          <TabsTrigger value="to-write">À rédiger</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Rechercher un avis..."
                className="pl-10 w-full sm:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter size={18} className="text-gray-600" />
              <select
                className="border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-mytroc-primary/30 w-full"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="recent">Plus récents</option>
                <option value="oldest">Plus anciens</option>
                <option value="highest">Meilleures notes</option>
                <option value="lowest">Moins bonnes notes</option>
                <option value="helpful">Plus utiles</option>
              </select>
            </div>
          </div>
          
          {showForm ? (
            <Card>
              <CardContent className="pt-6">
                <ReviewForm 
                  onSubmit={reviewToEdit ? handleUpdateReview : handleAddReview} 
                  initialData={reviewToEdit}
                  onCancel={() => {
                    setShowForm(false);
                    setReviewToEdit(null);
                  }}
                />
              </CardContent>
            </Card>
          ) : (
            <Button onClick={() => setShowForm(true)} className="mb-6">
              Ajouter un avis
            </Button>
          )}
          
          <ReviewList 
            reviews={getFilteredReviews()} 
            onEdit={handleEditReview}
            onDelete={handleDeleteReview}
            onMarkHelpful={handleMarkHelpful}
          />
        </TabsContent>
        
        <TabsContent value="published">
          <div className="text-center py-8">
            <h3 className="text-xl font-medium text-gray-700 mb-2">Vos avis publiés apparaîtront ici</h3>
            <p className="text-gray-500">Vous pouvez gérer tous vos avis publiés à partir de cette section</p>
          </div>
        </TabsContent>
        
        <TabsContent value="to-write">
          <div className="text-center py-8">
            <h3 className="text-xl font-medium text-gray-700 mb-2">Vous n'avez pas d'avis en attente</h3>
            <p className="text-gray-500">Les produits pour lesquels vous pouvez laisser un avis apparaîtront ici</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reviews;
