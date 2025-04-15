import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/header/Header';
import Footer from '@/components/footer';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { BadgePercent, SearchIcon, HelpCircle, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AssistanceButton from '@/components/AssistanceButton';
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';
import CartPopup from '@/components/cart/CartPopup';
const Shop = () => {
  const [currentFilter, setCurrentFilter] = useState<string>('reconditioned');
  const [sortOption, setSortOption] = useState<string>('popularity');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);
  const {
    addItem
  } = useCart();
  const brands = [{
    name: 'ASUS',
    count: 245
  }, {
    name: 'HP',
    count: 189
  }, {
    name: 'ACER',
    count: 156
  }, {
    name: 'LENOVO',
    count: 383
  }, {
    name: 'MSI',
    count: 78
  }, {
    name: 'APPLE',
    count: 412
  }, {
    name: 'MACBOOK',
    count: 315
  }, {
    name: 'MICROSOFT',
    count: 92
  }, {
    name: 'SAMSUNG',
    count: 267
  }, {
    name: 'RAZER',
    count: 54
  }];
  const products = [{
    id: 1,
    name: 'Mini Frigo',
    price: 300,
    discount: 0,
    image: '/placeholder.svg',
    brand: 'SAMSUNG'
  }, {
    id: 2,
    name: 'Asus Zenbook',
    price: 1499,
    discount: 0,
    image: '/placeholder.svg',
    brand: 'ASUS'
  }, {
    id: 3,
    name: 'Cafetière Moulinex',
    price: 1234,
    originalPrice: 2110,
    discount: 56,
    image: '/placeholder.svg',
    brand: 'MOULINEX'
  }, {
    id: 4,
    name: 'Brosse à dent',
    price: 324,
    originalPrice: 367,
    discount: 12,
    image: '/placeholder.svg',
    brand: 'SAMSUNG'
  },
  // More products to fill the grid
  {
    id: 5,
    name: 'Écouteurs sans fil',
    price: 149,
    discount: 0,
    image: '/placeholder.svg',
    brand: 'SAMSUNG'
  }, {
    id: 6,
    name: 'Ordinateur Portable',
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    image: '/placeholder.svg',
    brand: 'LENOVO'
  }, {
    id: 7,
    name: 'Machine à Laver',
    price: 699,
    discount: 0,
    image: '/placeholder.svg',
    brand: 'SAMSUNG'
  }, {
    id: 8,
    name: 'TV OLED SMART LG C2',
    price: 600.72,
    originalPrice: 900.72,
    discount: 33,
    image: '/placeholder.svg',
    brand: 'LG'
  }];
  const handleBrandSelect = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };
  const filteredProducts = selectedBrands.length > 0 ? products.filter(product => selectedBrands.includes(product.brand)) : products;
  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      image: product.image,
      brand: product.brand,
      productId: product.id
    });

    // Show animation and popup
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
      setShowCartPopup(true);
    }, 500);
  };
  return <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Page Title and Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Boutique</h1>
              <p className="text-muted-foreground">
                {currentFilter === 'reconditioned' ? '2226' : '1845'} produits {currentFilter === 'reconditioned' ? 'reconditionnés' : 'neufs'}
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Input placeholder="Rechercher un produit..." className="pl-10" />
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          {/* Main content with filters and products */}
          <div className="flex flex-col lg:flex-row gap-8 mx-0 px-0 my-[68px]">
            {/* Filter sidebar */}
            <div className="w-full lg:w-64 shrink-0">
              <div className="bg-white rounded-lg shadow-subtle p-5 sticky top-20">
                <h2 className="font-medium text-lg mb-4">Filtres</h2>
                
                {/* Condition filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Condition</h3>
                  <RadioGroup value={currentFilter} onValueChange={setCurrentFilter} className="gap-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="new" />
                      <Label htmlFor="new">Neuf</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reconditioned" id="reconditioned" />
                      <Label htmlFor="reconditioned">Reconditionné</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Sort options */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Trier par</h3>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner une option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularité</SelectItem>
                      <SelectItem value="price-asc">Prix: Croissant</SelectItem>
                      <SelectItem value="price-desc">Prix: Décroissant</SelectItem>
                      <SelectItem value="newest">Nouveautés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Brand filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Marques</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {brands.map(brand => <div key={brand.name} className="flex items-center space-x-2">
                        <Checkbox id={`brand-${brand.name}`} checked={selectedBrands.includes(brand.name)} onCheckedChange={() => handleBrandSelect(brand.name)} />
                        <Label htmlFor={`brand-${brand.name}`} className="text-sm">
                          {brand.name} ({brand.count})
                        </Label>
                      </div>)}
                  </div>
                </div>
                
                {/* See more button */}
                <Button variant="outline" className="w-full">
                  Voir plus
                </Button>
              </div>
            </div>
            
            {/* Products grid */}
            <div className="flex-1">
              {/* Featured sections */}
              <div className="mb-8 py-[26px]">
                <h2 className="font-semibold text-xl mb-4">A ne pas manquer</h2>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  <div className="bg-mytroc-primary/10 text-mytroc-primary px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                    Notre Sélection
                  </div>
                  <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                    Nos incontournables
                  </div>
                  <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                    Nouveautés
                  </div>
                  <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                    Bonnes affaires
                  </div>
                </div>
              </div>
              
              {/* Products grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => <Card key={product.id} className="overflow-hidden hover:shadow-elevated transition-all duration-300">
                    <Link to={`/produit/${product.id}`} className="block">
                      <div className="relative pt-[100%]">
                        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-contain p-6" />
                        {product.discount > 0 && <Badge className="absolute top-4 right-4 bg-mytroc-accent">
                            -{product.discount}%
                          </Badge>}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg mb-2 line-clamp-2">{product.name}</h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">{product.price.toFixed(2)} €</span>
                          {product.originalPrice && <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice.toFixed(2)} €
                            </span>}
                        </div>
                      </CardContent>
                    </Link>
                    <CardFooter className="p-4 pt-0">
                      <motion.div className="w-full" whileTap={{
                    scale: 0.95
                  }} animate={addedProductId === product.id ? {
                    scale: [1, 1.1, 1],
                    transition: {
                      duration: 0.5
                    }
                  } : {}}>
                        <Button className="w-full gap-2" onClick={() => handleAddToCart(product)}>
                          <ShoppingCart size={18} />
                          Ajouter au panier
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>)}
              </div>
              
              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <div className="join">
                  {[1, 2, 3, 4, 5].map(page => <Button key={page} variant={page === 1 ? "default" : "outline"} className="rounded-md mx-1">
                      {page}
                    </Button>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Floating assistance button */}
      <AssistanceButton />
      
      {/* Cart Popup */}
      <CartPopup show={showCartPopup} onClose={() => setShowCartPopup(false)} />
    </div>;
};
export default Shop;
