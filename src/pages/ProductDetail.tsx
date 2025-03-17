
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Minus, Plus, Star, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
    { id: 1, author: 'Jean Dupont', rating: 5, comment: 'Excellent produit, image magnifique et fonctionnalités impressionnantes.' },
    { id: 2, author: 'Marie Durand', rating: 4, comment: 'Très bon téléviseur, seul bémol le prix un peu élevé.' },
    { id: 3, author: 'Pierre Martin', rating: 5, comment: 'Image exceptionnelle, le noir est vraiment noir!' }
  ]
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  
  // In a real app, we would fetch the product based on the ID
  // const product = useQuery(['product', id], () => fetchProduct(id));
  const product = productData; // Using mock data for this example
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
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
                  Avis
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
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center mb-2">
                        <span className="font-medium mr-3">{review.author}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  ))}
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
