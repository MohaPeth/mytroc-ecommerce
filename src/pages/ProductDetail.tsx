import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';
import CartPopup from '@/components/cart/CartPopup';
import RelatedProducts from '@/components/products/RelatedProducts';
import { ReviewType } from '@/pages/Reviews';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

// Import our new components
import ProductImages from '@/components/products/ProductImages';
import ProductInfo from '@/components/products/ProductInfo';
import ProductDescriptionTab from '@/components/products/ProductDescriptionTab';
import ProductSpecificationsTab from '@/components/products/ProductSpecificationsTab';
import ReviewsTab from '@/components/reviews/ReviewsTab';
import { offerFormSchema, OfferFormValues } from '@/components/products/ProductPrice';

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
  condition: 'Neuf',
  seller: {
    id: 's1',
    name: 'MarcElectroBoutique',
    isCertified: true,
    isPro: true,
    location: 'Libreville, Gabon',
    rating: 4.8,
    salesCount: 142
  },
  features: ['Processeur AI α9 Gen5 avec AI Picture Pro et AI 4K Upscaling', 'Pixel Dimming, Noir parfait, 100% fidélité des couleurs et volume de couleur', 'Contrôle vocal mains libres, toujours prêt', 'Dolby Vision IQ avec détails précis, Dolby Atmos, Mode réalisateur', 'Écran confort pour les yeux : faible lumière bleue, sans scintillement'],
  description: 'La TV OLED Smart LG C2 42 (106cm) 4K est la meilleure TV OLED polyvalente que nous avons testée. Bien que tous les OLED offrent une qualité d\'image fantastique similaire, celle-ci se distingue par sa valeur car elle possède de nombreuses fonctionnalités orientées vers le jeu qui sont idéales pour les joueurs.\n\n*Seul le modèle 65G2 est montré sur l\'image à titre d\'exemple. Tous les modèles OLED LG 2022 présentent un emballage écologique.\n**Le modèle de support 65C2 est au minimum 39 % plus léger que la série C1.',
  specifications: [{
    name: 'Taille d\'écran',
    value: '42 pouces (106 cm)'
  }, {
    name: 'Résolution',
    value: '4K UHD (3840 x 2160)'
  }, {
    name: 'Type d\'écran',
    value: 'OLED'
  }, {
    name: 'Processeur',
    value: 'α9 Gen5 AI Processor 4K'
  }, {
    name: 'HDR',
    value: 'Dolby Vision, HDR10, HLG'
  }, {
    name: 'Son',
    value: '20W (2.0 Ch)'
  }, {
    name: 'Smart TV',
    value: 'webOS 22'
  }, {
    name: 'Connectivité',
    value: 'HDMI 2.1 x4, USB x3, Bluetooth, Wi-Fi'
  }, {
    name: 'Dimensions (LxHxP)',
    value: '93.3 x 57.0 x 25.0 cm (avec pied)'
  }, {
    name: 'Poids',
    value: '11.2 kg (avec pied)'
  }, {
    name: 'Connectivité',
    value: 'HDMI 2.1 x4, USB x3, Bluetooth, Wi-Fi'
  }, {
    name: 'Dimensions (LxHxP)',
    value: '93.3 x 57.0 x 25.0 cm (avec pied)'
  }, {
    name: 'Poids',
    value: '11.2 kg (avec pied)'
  }],
  sizes: [{
    size: '106 cm (42)',
    selected: true
  }, {
    size: '121 cm (48)',
    selected: false
  }, {
    size: '139 cm (55)',
    selected: false
  }, {
    size: '164 cm (65)',
    selected: false
  }, {
    size: '196 cm (77)',
    selected: false
  }, {
    size: '210 cm (83)',
    selected: false
  }],
  images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  reviews: [{
    id: '1',
    productId: 'p1',
    userId: 'u1',
    userName: 'Jean Dupont',
    rating: 5,
    comment: 'Excellent produit, image magnifique et fonctionnalités impressionnantes.',
    date: '2023-05-10',
    helpful: 12,
    productName: 'TV OLED SMART LG C2',
    productImage: '/placeholder.svg'
  }, {
    id: '2',
    productId: 'p1',
    userId: 'u2',
    userName: 'Marie Durand',
    rating: 4,
    comment: 'Très bon téléviseur, seul bémol le prix un peu élevé.',
    date: '2023-04-22',
    helpful: 8,
    productName: 'TV OLED SMART LG C2',
    productImage: '/placeholder.svg'
  }, {
    id: '3',
    productId: 'p1',
    userId: 'u3',
    userName: 'Pierre Martin',
    rating: 5,
    comment: 'Image exceptionnelle, le noir est vraiment noir!',
    date: '2023-06-05',
    helpful: 5,
    productName: 'TV OLED SMART LG C2',
    productImage: '/placeholder.svg'
  }]
};

// Mock related products data - in a real app, this would come from an API
const relatedProductsData = [
  {
    id: 2,
    name: 'Barre de son LG',
    price: 299.99,
    image: '/placeholder.svg',
    brand: 'LG',
    sellerId: 's1',
    sellerName: 'MarcElectroBoutique',
    sellerIsPro: true
  }, 
  {
    id: 3,
    name: 'Support mural TV universel',
    price: 49.99,
    image: '/placeholder.svg',
    brand: 'Vogel\'s',
    sellerId: 's2',
    sellerName: 'MonturesExpert',
    sellerIsPro: false
  }, 
  {
    id: 4,
    name: 'Câble HDMI 2.1 Ultra HD 8K',
    price: 19.99,
    image: '/placeholder.svg',
    brand: 'Belkin',
    sellerId: 's1',
    sellerName: 'MarcElectroBoutique',
    sellerIsPro: true
  }, 
  {
    id: 5,
    name: 'Console PlayStation 5',
    price: 499.99,
    image: '/placeholder.svg',
    brand: 'Sony',
    sellerId: 's1',
    sellerName: 'MarcElectroBoutique',
    sellerIsPro: true
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { addItem } = useCart();
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [offerSuccess, setOfferSuccess] = useState(false);

  // In a real app, we would fetch the product based on the ID
  // const product = useQuery(['product', id], () => fetchProduct(id));
  const product = productData; // Using mock data for this example

  // Offer form setup
  const offerForm = useForm<OfferFormValues>({
    resolver: zodResolver(offerFormSchema),
    defaultValues: {
      offerPrice: "",
      message: "",
    },
  });

  // Reviews state management
  const [reviews, setReviews] = useState<ReviewType[]>(product.reviews);
  const [filterType, setFilterType] = useState('recent');
  const [reviewToEdit, setReviewToEdit] = useState<ReviewType | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
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

  // Function to submit offer
  const handleOfferSubmit = (values: OfferFormValues) => {
    // Here you would send the offer to your backend API
    console.log('Offer submitted:', values);
    
    // Show success message
    setOfferDialogOpen(false);
    setOfferSuccess(true);
    
    // Reset form after submission
    offerForm.reset();
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
      userId: 'current-user',
      userName: 'Vous',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      productName: product.name,
      productImage: product.images[0]
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
    const updatedReviews = reviews.map(review => review.id === reviewToEdit.id ? {
      ...review,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0] // Update the date
    } : review);
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
  };

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id));
    toast({
      title: "Avis supprimé",
      description: "Votre avis a été supprimé avec succès"
    });
  };

  const handleMarkHelpful = (id: string) => {
    setReviews(reviews.map(review => review.id === id ? {
      ...review,
      helpful: review.helpful + 1
    } : review));
    toast({
      description: "Merci d'avoir noté cet avis comme utile"
    });
  };

  // Function to handle adding product to cart
  const handleAddToCart = () => {
    setIsAddingToCart(true);

    // Add product to cart
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity,
      image: product.images[0],
      brand: product.brand,
      productId: product.id
    });

    // Show animation and cart popup
    setTimeout(() => {
      setIsAddingToCart(false);
      setShowCartPopup(true);
      setQuantity(1); // Reset quantity after adding to cart
    }, 500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-36">
        <div className="container mx-auto px-4 py-8">
          {/* Product Detail Section */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Product Images */}
            <ProductImages images={product.images} productName={product.name} />
            
            {/* Product Info */}
            <ProductInfo 
              product={product}
              quantity={quantity}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
              handleAddToCart={handleAddToCart}
              isAddingToCart={isAddingToCart}
              offerForm={offerForm}
              offerDialogOpen={offerDialogOpen}
              setOfferDialogOpen={setOfferDialogOpen}
              handleOfferSubmit={handleOfferSubmit}
            />
          </div>
          
          {/* Product Tabs (Description, Specs, Reviews) */}
          <div className="mb-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="mb-6 w-full justify-start border-b rounded-none bg-transparent p-0 h-auto">
                <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-mytroc-primary bg-transparent px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                  Description
                </TabsTrigger>
                <TabsTrigger value="specification" className="rounded-none border-b-2 border-transparent data-[state=active]:border-mytroc-primary bg-transparent px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                  Spécification
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-mytroc-primary bg-transparent px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                  Avis ({reviews.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-4">
                <ProductDescriptionTab description={product.description} />
              </TabsContent>
              
              <TabsContent value="specification" className="mt-4">
                <ProductSpecificationsTab specifications={product.specifications} />
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-4">
                <ReviewsTab 
                  productRating={product.rating}
                  reviews={reviews}
                  filterType={filterType}
                  setFilterType={setFilterType}
                  showReviewForm={showReviewForm}
                  setShowReviewForm={setShowReviewForm}
                  reviewToEdit={reviewToEdit}
                  setReviewToEdit={setReviewToEdit}
                  newReview={newReview}
                  setNewReview={setNewReview}
                  handleAddReview={handleAddReview}
                  handleUpdateReview={handleUpdateReview}
                  handleEditReview={handleEditReview}
                  handleDeleteReview={handleDeleteReview}
                  handleMarkHelpful={handleMarkHelpful}
                  hoverRating={hoverRating}
                  setHoverRating={setHoverRating}
                  getSortedReviews={getSortedReviews}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Produits associés</h2>
            <RelatedProducts products={relatedProductsData} currentProductId={product.id} />
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Floating Assistance Button */}
      <AssistanceButton />
      
      {/* Cart Popup */}
      <CartPopup show={showCartPopup} onClose={() => setShowCartPopup(false)} />
      
      {/* Offer Success Alert */}
      <AlertDialog open={offerSuccess} onOpenChange={setOfferSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Offre envoyée avec succès</AlertDialogTitle>
            <AlertDialogDescription>
              Votre offre a bien été transmise au vendeur. Vous recevrez une notification lorsqu'il y répondra.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Compris</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductDetail;
