import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/footer';
const ThankYou = () => {
  const {
    clearCart
  } = useCart();
  const navigate = useNavigate();

  // Clear the cart on component mount
  React.useEffect(() => {
    clearCart();
  }, [clearCart]);
  const handleViewOrders = () => {
    navigate('/profile', {
      state: {
        activeTab: 'orders'
      }
    });
  };
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 md:py-20 py-[138px]">
        <div className="max-w-3xl mx-auto">
          <Card className="border-none shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 md:p-12 text-center">
                <motion.div initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }} className="flex justify-center mb-6">
                  <CheckCircle className="w-24 h-24 text-green-500" strokeWidth={1.5} />
                </motion.div>
                
                <motion.h1 initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.4
              }} className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Merci pour votre commande !
                </motion.h1>
                
                <motion.p initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.6
              }} className="text-lg text-gray-600 mb-8">
                  Votre commande a été prise en compte et est en cours de traitement. 
                  Un email de confirmation a été envoyé à l'adresse indiquée.
                </motion.p>
                
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.8
              }} className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <p className="text-gray-700">
                      <span className="font-medium">Numéro de commande:</span> #FR458923
                    </p>
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Link to="/">
                      <Button className="w-full md:w-auto" variant="outline">
                        Continuer vos achats
                      </Button>
                    </Link>
                    
                    <Button className="w-full md:w-auto" variant="default" onClick={handleViewOrders}>
                      Consulter mes commandes
                    </Button>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
          
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 1.2
        }} className="mt-12 text-center">
            <h2 className="text-xl font-medium mb-6">Avez-vous des questions?</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <Card className="flex-1 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-medium mb-2">Support client</h3>
                <p className="text-sm text-gray-600">Notre équipe est disponible 7j/7 pour vous aider</p>
              </Card>
              <Card className="flex-1 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-medium mb-2">FAQ</h3>
                <p className="text-sm text-gray-600">Consultez notre base de connaissances</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default ThankYou;