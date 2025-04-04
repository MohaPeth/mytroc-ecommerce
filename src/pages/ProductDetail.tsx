
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import CartPopup from '@/components/cart/CartPopup';
import RelatedProducts from '@/components/products/RelatedProducts';
import ProductImages from '@/components/products/ProductImages';
import ProductInfo from '@/components/products/ProductInfo';
import ProductTabs from '@/components/products/ProductTabs';
import OfferSuccessAlert from '@/components/products/OfferSuccessAlert';
import { ReviewType } from '@/pages/Reviews';

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
const relatedProductsData = [{
  id: 2,
  name: 'Barre de son LG',
  price: 299.99,
  image: '/placeholder.svg',
  brand: 'LG'
}, {
  id: 3,
  name: 'Support mural TV universel',
  price: 49.99,
  image: '/placeholder.svg',
  brand: 'Vogel\'s'
}, {
  id: 4,
  name: 'Câble HDMI 2.1 Ultra HD 8K',
  price: 19.99,
  image: '/placeholder.svg',
  brand: 'Belkin'
}, {
  id: 5,
  name: 'Console PlayStation 5',
  price: 499.99,
  image: '/placeholder.svg',
  brand: 'Sony'
}];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [offerSuccess, setOfferSuccess] = useState(false);

  // In a real app, we would fetch the product based on the ID
  // const product = useQuery(['product', id], () => fetchProduct(id));
  const product = productData; // Using mock data for this example

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-36">
        <div className="container mx-auto px-4 py-8">
          {/* Product Detail Section */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Product Images */}
            <div className="lg:w-1/2">
              <ProductImages 
                images={product.images} 
                productName={product.name} 
              />
            </div>
            
            {/* Product Info */}
            <div className="lg:w-1/2">
              <ProductInfo product={product} />
            </div>
          </div>
          
          {/* Product Tabs (Description, Specs, Reviews) */}
          <div className="mb-12">
            <ProductTabs 
              description={product.description}
              specifications={product.specifications}
              reviews={product.reviews}
            />
          </div>

          {/* Related Products */}
          <RelatedProducts 
            products={relatedProductsData} 
            currentProductId={product.id} 
          />
        </div>
      </main>
      
      <Footer />
      
      {/* Floating assistance button */}
      <AssistanceButton />

      {/* Cart Popup */}
      <CartPopup 
        show={showCartPopup} 
        onClose={() => setShowCartPopup(false)} 
      />

      {/* Offer Success Alert */}
      <OfferSuccessAlert 
        open={offerSuccess} 
        onOpenChange={setOfferSuccess} 
      />
    </div>
  );
};

export default ProductDetail;
