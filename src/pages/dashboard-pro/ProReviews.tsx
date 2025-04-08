
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Search, Star, ThumbsUp } from 'lucide-react';

const ProReviews = () => {
  // Exemple d'avis clients
  const reviews = [
    { 
      id: 1, 
      customer: 'Marie Martin', 
      product: 'Mini Frigo',
      rating: 5,
      comment: 'Excellent produit, livraison rapide et service impeccable ! Le frigo est très silencieux et maintient parfaitement la température. Je recommande vivement ce vendeur.',
      date: '05/04/2023',
      reply: 'Merci beaucoup pour votre avis, Marie ! Nous sommes ravis que vous soyez satisfaite de votre achat.',
      status: 'answered',
      helpful: 3,
      avatar: '/placeholder.svg'
    },
    { 
      id: 2, 
      customer: 'Thomas Dubois', 
      product: 'Asus Zenbook Pro',
      rating: 4,
      comment: 'Très bon ordinateur avec un excellent rapport qualité-prix. L\'écran est magnifique et les performances sont au rendez-vous. Seul bémol, l\'autonomie est un peu juste pour une journée complète.',
      date: '02/04/2023',
      reply: null,
      status: 'pending',
      helpful: 5,
      avatar: '/placeholder.svg'
    },
    { 
      id: 3, 
      customer: 'Lucas Mercier', 
      product: 'Cafetière Moulinex',
      rating: 3,
      comment: 'Produit correct mais emballage un peu endommagé à la réception. La cafetière fonctionne bien mais j\'aurais aimé qu\'elle soit mieux protégée pour l\'expédition.',
      date: '28/03/2023',
      reply: 'Merci pour votre retour, Lucas. Nous sommes désolés pour le problème d\'emballage et allons améliorer cet aspect. N\'hésitez pas à nous contacter si vous rencontrez le moindre souci avec votre cafetière.',
      status: 'answered',
      helpful: 1,
      avatar: '/placeholder.svg'
    },
    { 
      id: 4, 
      customer: 'Émilie Laurent', 
      product: 'Écouteurs sans fil',
      rating: 5,
      comment: 'Ces écouteurs sont fantastiques ! La qualité du son est exceptionnelle et la batterie tient vraiment longtemps. J\'apprécie aussi beaucoup la réduction de bruit active.',
      date: '25/03/2023',
      reply: null,
      status: 'pending',
      helpful: 7,
      avatar: '/placeholder.svg'
    },
    { 
      id: 5, 
      customer: 'Antoine Lacroix', 
      product: 'Ordinateur Portable',
      rating: 2,
      comment: 'Déçu par ce produit. Des ralentissements fréquents et la batterie se décharge très vite. De plus, j\'ai dû attendre 2 semaines pour la livraison.',
      date: '20/03/2023',
      reply: 'Nous sommes désolés de votre mauvaise expérience, Antoine. Notre service technique va vous contacter rapidement pour diagnostiquer et résoudre les problèmes que vous rencontrez avec votre ordinateur.',
      status: 'answered',
      helpful: 2,
      avatar: '/placeholder.svg'
    },
  ];

  // Fonction pour obtenir les étoiles basées sur la note
  const getRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">En attente</Badge>;
      case 'answered':
        return <Badge className="bg-green-500">Répondu</Badge>;
      default:
        return null;
    }
  };

  return (
    <ProDashboardLayout title="Avis clients">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestion des avis</h1>
          <p className="text-muted-foreground">
            Consultez et répondez aux avis de vos clients
          </p>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Résumé des évaluations</CardTitle>
          <CardDescription>
            Vue d'ensemble de la satisfaction de vos clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center">
              <div className="text-5xl font-bold mb-2">4.2</div>
              <div className="flex mb-2">
                {getRatingStars(4)}
              </div>
              <p className="text-sm text-muted-foreground">
                Basé sur 127 avis
              </p>
            </div>
            
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => {
                // Calculer un pourcentage fictif pour chaque étoile
                const percentage = 
                  star === 5 ? 65 :
                  star === 4 ? 20 :
                  star === 3 ? 10 :
                  star === 2 ? 3 : 2;
                
                return (
                  <div key={star} className="flex items-center">
                    <span className="w-8 text-sm">{star} ★</span>
                    <div className="flex-1 mx-2">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${star >= 4 ? 'bg-green-500' : star === 3 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="w-8 text-sm text-right">{percentage}%</span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col justify-center items-center md:items-start">
              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <div className="w-32 text-sm font-medium">Produit</div>
                  <div className="flex">
                    {getRatingStars(4.5)}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm font-medium">Service client</div>
                  <div className="flex">
                    {getRatingStars(4.8)}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm font-medium">Livraison</div>
                  <div className="flex">
                    {getRatingStars(4.2)}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm font-medium">Rapport qualité-prix</div>
                  <div className="flex">
                    {getRatingStars(4.0)}
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-green-600">93%</span> des clients recommandent vos produits
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Rechercher un avis..." 
                className="pl-9"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Produit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="frigo">Mini Frigo</SelectItem>
                  <SelectItem value="laptop">Asus Zenbook</SelectItem>
                  <SelectItem value="coffee">Cafetière</SelectItem>
                  <SelectItem value="earbuds">Écouteurs</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Note" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="5">5 étoiles</SelectItem>
                  <SelectItem value="4">4 étoiles</SelectItem>
                  <SelectItem value="3">3 étoiles</SelectItem>
                  <SelectItem value="2">2 étoiles</SelectItem>
                  <SelectItem value="1">1 étoile</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="answered">Répondus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.customer.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{review.customer}</h3>
                        <span className="text-sm text-muted-foreground ml-2">• {review.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Produit: <span className="font-medium">{review.product}</span>
                      </p>
                    </div>
                    {getStatusBadge(review.status)}
                  </div>
                  
                  <div className="my-2 flex">
                    {getRatingStars(review.rating)}
                  </div>
                  
                  <p className="mt-2">{review.comment}</p>
                  
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{review.helpful} utile{review.helpful > 1 ? 's' : ''}</span>
                    </Button>
                  </div>
                  
                  {review.reply && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-200">
                      <p className="text-sm font-medium">Votre réponse:</p>
                      <p className="mt-1 text-sm">{review.reply}</p>
                    </div>
                  )}
                  
                  {review.status === 'pending' && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Répondre à cet avis:</p>
                      <Textarea 
                        placeholder="Écrivez votre réponse ici..." 
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-end mt-2">
                        <Button>Envoyer la réponse</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Affichage de {reviews.length} avis sur 127 au total
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Précédent</Button>
          <Button variant="outline" size="sm">Suivant</Button>
        </div>
      </div>
    </ProDashboardLayout>
  );
};

export default ProReviews;
