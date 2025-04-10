
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import AssistanceButton from '@/components/AssistanceButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Mock categories data
const categoriesData = [
  {
    id: 'c1',
    name: 'Électronique',
    description: 'Téléphones, ordinateurs, TV et autres appareils électroniques',
    image: '/placeholder.svg',
    itemCount: 245
  },
  {
    id: 'c2',
    name: 'Mode',
    description: 'Vêtements, chaussures et accessoires pour hommes et femmes',
    image: '/placeholder.svg',
    itemCount: 189
  },
  {
    id: 'c3',
    name: 'Maison',
    description: 'Meubles, décoration et articles ménagers',
    image: '/placeholder.svg',
    itemCount: 167
  },
  {
    id: 'c4',
    name: 'Beauté & Santé',
    description: 'Produits de beauté, cosmétiques et articles de santé',
    image: '/placeholder.svg',
    itemCount: 112
  },
  {
    id: 'c5',
    name: 'Sports & Loisirs',
    description: 'Équipements sportifs et articles de loisirs',
    image: '/placeholder.svg',
    itemCount: 94
  },
  {
    id: 'c6',
    name: 'Alimentation',
    description: 'Produits alimentaires et boissons',
    image: '/placeholder.svg',
    itemCount: 78
  },
  {
    id: 'c7',
    name: 'Auto & Moto',
    description: 'Accessoires et pièces pour automobiles et motos',
    image: '/placeholder.svg',
    itemCount: 56
  },
  {
    id: 'c8',
    name: 'Livres & Médias',
    description: 'Livres, films, musique et jeux vidéo',
    image: '/placeholder.svg',
    itemCount: 134
  }
];

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter categories based on search term
  const filteredCategories = categoriesData.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-36">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Catégories</h1>
          
          {/* Search bar */}
          <div className="relative max-w-md mx-auto mb-10">
            <Input
              type="text"
              placeholder="Rechercher des catégories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          
          {/* Categories grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="h-full hover:shadow-md transition-shadow">
                <div className="p-4 h-56 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{category.itemCount} produits</span>
                    <Button variant="outline">Explorer</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Aucune catégorie trouvée pour "{searchTerm}"</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <AssistanceButton />
    </div>
  );
};

export default Categories;
