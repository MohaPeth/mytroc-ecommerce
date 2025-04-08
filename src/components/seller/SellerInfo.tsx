
import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Store, Calendar, Phone, Mail, Facebook, Instagram, Twitter, 
  Package, Tag, MapPin, UserCheck 
} from 'lucide-react';

interface Seller {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  isCertified: boolean;
  isPro: boolean;
  location: string;
  rating: number;
  reviewsCount: number;
  salesCount: number;
  joinDate: string;
  categories: string[];
  contactEmail: string;
  phone: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

interface SellerInfoProps {
  seller: Seller;
}

const SellerInfo: React.FC<SellerInfoProps> = ({ seller }) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <CardTitle className="mb-4 flex items-center gap-2">
            <Store className="h-5 w-5" />
            <span>À propos de la boutique</span>
          </CardTitle>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Statut</h4>
              <p className="flex items-center gap-1">
                <UserCheck className="h-4 w-4 text-green-500" />
                <span>{seller.isPro ? 'Vendeur Professionnel' : 'Vendeur Particulier'}</span>
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Date d'inscription</h4>
              <p className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{formatDate(seller.joinDate)}</span>
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Localisation</h4>
              <p className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{seller.location}</span>
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Statistiques</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold">{seller.salesCount}</p>
                  <p className="text-xs text-gray-500">Ventes</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{seller.rating}</p>
                  <p className="text-xs text-gray-500">Note moyenne</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{seller.reviewsCount}</p>
                  <p className="text-xs text-gray-500">Avis</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <CardTitle className="mb-4 flex items-center gap-2">
            <Tag className="h-5 w-5" />
            <span>Catégories</span>
          </CardTitle>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {seller.categories.map((category, index) => (
              <div key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {category}
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <CardTitle className="mb-4 flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <span>Contact</span>
          </CardTitle>
          
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <a href={`mailto:${seller.contactEmail}`} className="text-blue-600 hover:underline">
                {seller.contactEmail}
              </a>
            </p>
            
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <a href={`tel:${seller.phone}`} className="text-blue-600 hover:underline">
                {seller.phone}
              </a>
            </p>
          </div>
          
          {(seller.socialMedia.facebook || seller.socialMedia.instagram || seller.socialMedia.twitter) && (
            <>
              <Separator className="my-4" />
              
              <CardTitle className="mb-4 flex items-center gap-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 17.25C14.2279 17.25 17.25 14.2279 17.25 10.5C17.25 6.77208 14.2279 3.75 10.5 3.75C6.77208 3.75 3.75 6.77208 3.75 10.5C3.75 14.2279 6.77208 17.25 10.5 17.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.25 20.25L15.75 15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Réseaux sociaux</span>
              </CardTitle>
              
              <div className="flex gap-3">
                {seller.socialMedia.facebook && (
                  <a href={`https://facebook.com/${seller.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                
                {seller.socialMedia.instagram && (
                  <a href={`https://instagram.com/${seller.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                
                {seller.socialMedia.twitter && (
                  <a href={`https://twitter.com/${seller.socialMedia.twitter}`} target="_blank" rel="noopener noreferrer" className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerInfo;
