
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Minus, Plus, Star, ShoppingCart, Edit, Trash2, ThumbsUp, Flag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Modified ReviewType - same structure as in Reviews.tsx
type ReviewType = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
};

// Mock product data - in a real app, this would come from an API
const productData = {
  id: 1,
  name: 'TV OLED SMART LG C2 42 (106CM) 4K | WEBOS | CINEMA HDR',
  brand: 'LG',
  model: 'OLED42C2PSA',
  availability: 'Seulement 2 en stock',
  price: 600.72,
  originalPrice: 900.72,
  rating: 4,
  features: [
    'Processeur AI α9 Gen5 avec AI Picture Pro et AI 4K Upscaling',
    'Pixel Dimming, Noir parfait, 100% fidélité des couleurs et volume de couleur',
    'Contrôle vocal mains libres, toujours prêt',
    'Dolby Vision IQ avec détails précis, Dolby Atmos, Mode réalisateur',
    'Écran confort pour les yeux : faible lumière bleue, sans scintillement'
  ],
  description: 'La TV OLED Smart LG C2 42 (106cm) 4K est la meilleure TV OLED polyvalente que nous avons testée. Bien que tous les OLED offrent une qualité d\'image fantastique similaire, celle-ci se distingue par sa valeur car elle possède de nombreuses fonctionnalités orientées vers le jeu qui sont idéales pour les joueurs.\n\n*Seul le modèle 65G2 est montré sur l\'image à titre d\'exemple. Tous les modèles OLED LG 2022 présentent un emballage écologique.\n**Le modèle de support 65C2 est au minimum 39 % plus léger que la série C1.',
  specifications: [
    { name: 'Taille d\'écran', value: '42 pouces (106 cm)' },
    { name: 'Résolution', value: '4K UHD (3840 x 2160)' },
    { name: 'Type d\'écran', value: 'OLED' },
    { name: 'Processeur', value: 'α9 Gen5 AI Processor 4K' },
    { name: 'HDR', value: 'Dolby Vision, HDR10, HLG' },
    { name: 'Son', value: '20W (2.0 Ch)' },
    { name: 'Smart TV', value: 'webOS 22' },
    { name: 'Connectivité', value: 'HDMI 2.1 x4, USB x3, Bluetooth, Wi-Fi' },
    { name: 'Dimensions (LxHxP)', value: '93.3 x 57.0 x 25.0 cm (avec pied)' },
    { name: 'Poids', value: '11.2 kg (avec pied)' }
  ],
  sizes: [
    { size: '106 cm (42)', selected: true },
    { size: '121 cm (48)', selected: false },
    { size: '139 cm (55)', selected: false },
    { size: '164 cm (65)', selected: false },
    { size: '196 cm (77)', selected: false },
    { size: '210 cm (83)', selected: false }
  ],
  images: [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg'
  ],
  reviews: [
    { 
      id: '1', 
      productId: 'p1',
      userId: 'u1', 
      userName: 'Jean Dupont', 
      rating: 5, 
      comment: 'Excellent produit, image magnifique et fonctionnalités impressionnantes.',
      date: '2023-05-10',
      helpful: 12
    },
    { 
      id: '2', 
      productId: 'p1',
      userId: 'u2', 
      userName: 'Marie Durand', 
      rating: 4, 
      comment: 'Très bon téléviseur, seul bémol le prix un peu élevé.',
      date: '2023-04-22',
      helpful: 8
    },
    { 
      id: '3', 
      productId: 'p1',
      userId: 'u3', 
      userName: 'Pierre Martin', 
      rating: 5, 
      comment: 'Image exceptionnelle, le noir est vraiment noir!',
      date: '2023-06-05',
      helpful: 5
    }
  ]
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  const { toast } = useToast();
  
  // In a real app, we would fetch the product based on the ID
  // const product = useQuery(['product', id], () => fetchProduct(id));
  const product = productData; // Using mock data for this example
  
  // Reviews state management
  const [reviews, setReviews] = useState<ReviewType[]>(product.reviews);
  const [filterType, setFilterType] = useState('recent');
  const [reviewToEdit, setReviewToEdit] = useState<ReviewType | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });
  const [hoverRating, setHoverRating] = useState(0);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

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
      productId: product.id.toString(),
      userId: 'current-user', // In a real app, this would come from auth
      userName: 'Vous', // In a real app, this would come from user profile
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 0, comment: '' });
    setShowReviewForm(false);
    
    toast({
      title: "Avis ajouté",
      description: "Merci d'avoir partagé votre avis sur ce produit!",
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
    setNewReview({ rating: 0, comment: '' });
    
    toast({
      title: "Avis mis à jour",
      description: "Votre avis a été modifié avec succès",
    });
  };

  const handleEditReview = (review: ReviewType) => {
    setReviewToEdit(review);
    setNewReview({ 
      rating: review.rating, 
      comment: review.comment 
    });
  };

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id));
    
    toast({
      title: "Avis supprimé",
      description: "Votre avis a été supprimé avec succès",
    });
  };

  const handleMarkHelpful = (id: string) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, helpful: review.helpful + 1 } : review
    ));
    
    toast({
      description: "Merci d'avoir noté cet avis comme utile",
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-36">
        <div className="container mx-auto px-4 py-8">
          {/* Product Detail Section */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Product Images */}
            <div className="lg:w-1/2">
              <div className="flex flex-col-reverse lg:flex-row gap-4">
                {/* Thumbnails */}
                <div className="flex lg:flex-col gap-2 mt-4 lg:mt-0">
                  {product.images.map((img, index) => (
                    <div 
                      key={index}
                      className={`border-2 ${activeImage === index ? 'border-mytroc-primary' : 'border-gray-200'} rounded cursor-pointer overflow-hidden w-16 h-16`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Main Image */}
                <div className="bg-gray-100 rounded-lg flex-grow h-80 lg:h-96 flex items-center justify-center p-4">
                  <img 
                    src={product.images[activeImage]} 
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="lg:w-1/2">
              <div className="mb-2">
                <div className="text-sm text-gray-600 mb-1">Marque : {product.brand}</div>
                <div className="text-sm text-gray-600 mb-1">Modèle : {product.model}</div>
                <div className="text-sm text-gray-600 mb-4">Disponibilité : {product.availability}</div>
                
                <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
                
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-mytroc-primary mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Sizes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                  {product.sizes.map((size, index) => (
                    <div 
                      key={index}
                      className={`border rounded-md p-3 text-center cursor-pointer transition-colors ${
                        size.selected 
                          ? 'border-mytroc-primary bg-mytroc-primary/10 text-mytroc-primary' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {size.size}
                    </div>
                  ))}
                </div>
                
                {/* Price */}
                <div className="mb-6">
                  <div className="text-sm text-gray-500 uppercase mb-1">USD (TOUTES TAXES COMPRISES)</div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold">{product.price.toFixed(2)} $</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        {product.originalPrice.toFixed(2)} $
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Quantity and Add to Cart */}
                <div className="flex gap-4 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center border border-gray-300 rounded-md w-32">
                    <button 
                      className="w-10 h-10 flex items-center justify-center text-gray-600"
                      onClick={decreaseQuantity}
                    >
                      <Minus size={16} />
                    </button>
                    <input 
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-12 h-10 text-center border-x border-gray-300"
                    />
                    <button 
                      className="w-10 h-10 flex items-center justify-center text-gray-600"
                      onClick={increaseQuantity}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <Button className="bg-mytroc-primary hover:bg-mytroc-primary/90 flex-1">
                    Acheter maintenant
                  </Button>
                  
                  <Button variant="outline" className="border-mytroc-primary text-mytroc-primary hover:bg-mytroc-primary/10 flex-1">
                    <ShoppingCart className="mr-2" size={18} />
                    Ajouter au panier
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs (Description, Specs, Reviews) */}
          <div className="mb-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="mb-6 w-full justify-start border-b rounded-none bg-transparent p-0 h-auto">
                <TabsTrigger 
                  value="description" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-mytroc-primary bg-transparent px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                  Description
                </TabsTrigger>
                <TabsTrigger 
                  value="specification" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-mytroc-primary bg-transparent px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                  Spécification
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-mytroc-primary bg-transparent px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                  Avis ({reviews.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-4">
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line">{product.description}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="specification" className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      {product.specifications.map((spec, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="border border-gray-200 px-4 py-3 font-medium">{spec.name}</td>
                          <td className="border border-gray-200 px-4 py-3">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-4">
                {/* Reviews header with filter */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">Avis clients</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">{product.rating}</span>
                      <span className="mx-1">/</span>
                      <span>5</span>
                      <div className="flex items-center ml-1">
                        {renderStars(product.rating)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      className="border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-mytroc-primary/30 w-full sm:w-auto"
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

                {/* Add review button */}
                {!showReviewForm && (
                  <Button 
                    onClick={() => {
                      setShowReviewForm(true);
                      setReviewToEdit(null);
                      setNewReview({ rating: 0, comment: '' });
                    }} 
                    className="mb-6"
                  >
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
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
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
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
                      <Button 
                        onClick={reviewToEdit ? handleUpdateReview : handleAddReview}
                      >
                        {reviewToEdit ? 'Mettre à jour' : 'Publier l\'avis'}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Reviews list */}
                <div className="space-y-6">
                  {getSortedReviews().length > 0 ? (
                    getSortedReviews().map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              {renderStars(review.rating)}
                              <span className="text-sm text-gray-600">({review.rating}/5)</span>
                            </div>
                            <h4 className="font-medium mt-1">{review.userName}</h4>
                            <p className="text-sm text-gray-500 mb-2">
                              {formatDistanceToNow(new Date(review.date), { 
                                addSuffix: true,
                                locale: fr 
                              })}
                            </p>
                          </div>
                          
                          {/* Edit/Delete buttons - only show for the current user's reviews */}
                          {review.userId === 'current-user' && (
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEditReview(review)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit size={16} />
                                <span className="sr-only">Modifier</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDeleteReview(review.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                                <span className="sr-only">Supprimer</span>
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        <p className="my-3 text-gray-700">{review.comment}</p>
                        
                        <div className="flex items-center gap-3 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleMarkHelpful(review.id)}
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
                    ))
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <h3 className="text-xl font-medium text-gray-700 mb-2">Aucun avis pour le moment</h3>
                      <p className="text-gray-500">Soyez le premier à donner votre avis sur ce produit</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Floating assistance button */}
      <AssistanceButton />
    </div>
  );
};

export default ProductDetail;
