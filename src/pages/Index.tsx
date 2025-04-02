
import React from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/Hero';
import BestSellers from '@/components/BestSellers';
import ProductCategories from '@/components/ProductCategories';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    name: 'Sophie Martin',
    text: 'MyTroc m\'a permis de trouver facilement tous les meubles pour mon nouvel appartement à des prix imbattables !',
    rating: 5,
    avatar: '/placeholder.svg'
  },
  {
    name: 'Thomas Dubois',
    text: 'Le service client est exceptionnel. J\'ai eu un problème avec ma commande qui a été résolu en moins de 24h.',
    rating: 5,
    avatar: '/placeholder.svg'
  },
  {
    name: 'Emma Laurent',
    text: 'J\'adore pouvoir vendre mes anciens appareils électroniques et acheter des articles reconditionnés sur une seule plateforme.',
    rating: 4,
    avatar: '/placeholder.svg'
  }
];

const blogArticles = [
  {
    title: 'Comment bien négocier lors d\'un troc ?',
    excerpt: 'Découvrez nos astuces pour obtenir le meilleur rapport qualité-prix lors de vos échanges sur MyTroc.',
    image: '/placeholder.svg',
    link: '/blog/negocier-troc'
  },
  {
    title: 'Les 5 erreurs à éviter quand vous vendez des objets d\'occasion',
    excerpt: 'Ne laissez pas ces erreurs courantes vous coûter de l\'argent lors de la revente de vos biens.',
    image: '/placeholder.svg',
    link: '/blog/erreurs-vente'
  },
  {
    title: 'Guide pour authentifier les produits de luxe d\'occasion',
    excerpt: 'Apprenez à reconnaître les vrais produits de luxe des contrefaçons avant d\'acheter.',
    image: '/placeholder.svg',
    link: '/blog/authentifier-luxe'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-40 md:pt-48">
        {/* Hero Section */}
        <section className="relative">
          <HeroSlider />
          <div className="absolute inset-0 flex items-center justify-start p-4 md:p-12 bg-gradient-to-r from-black/40 to-transparent">
            <div className="max-w-lg text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-3">Bienvenue sur MyTroc – Votre Plateforme de Confiance</h1>
              <p className="text-lg md:text-xl mb-6">Achetez, Vendez et Échangez Facilement</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-mytroc-secondary hover:bg-mytroc-secondary/90">
                  Découvrez nos Offres
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Commencez à Vendre
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explorez par Catégorie</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Trouvez exactement ce que vous cherchez parmi nos nombreuses catégories
              </p>
            </div>
            
            <ProductCategories />
          </div>
        </section>
        
        {/* Best Offers Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Nos Meilleures Offres du Moment</h2>
              <Link to="/boutique" className="text-mytroc-primary flex items-center hover:underline">
                Voir tout <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <BestSellers />
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ce que Nos Clients Disent de Nous</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez les expériences de nos utilisateurs avec MyTroc
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-subtle hover:shadow-elevated transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Blog Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Conseils et Astuces pour Bien Acheter/Vendre</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nos experts partagent leurs conseils pour optimiser votre expérience sur MyTroc
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogArticles.map((article, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-elevated transition-all duration-300">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <Link to={article.link} className="text-mytroc-primary hover:underline flex items-center">
                      Lire la suite <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-mytroc-primary text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Rejoignez Notre Communauté Dès Aujourd'hui</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Achetez, vendez et échangez facilement avec MyTroc.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-mytroc-primary hover:bg-gray-100">
                Créer un Compte Gratuit
              </Button>
              <Button size="lg" variant="outline" className="border-white hover:bg-white/20">
                Découvrir Nos Produits
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
