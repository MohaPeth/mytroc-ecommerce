
import { DeliveryMethod, PaymentMethod } from '@/types/checkout.types';
import { Json } from '@/integrations/supabase/types';

// Format delivery address for database storage
export const formatAddressForStorage = (
  address: any, 
  useMainAddress: boolean
): Json | null => {
  if (useMainAddress || !address) {
    return null;
  }
  return JSON.stringify(address);
};

// Calculate delivery fee based on delivery method
export const calculateDeliveryFee = (deliveryMethod: DeliveryMethod): number => {
  return deliveryMethod === 'home' ? 1000 : 0; // 1000 FCFA pour la livraison à domicile
};

// Generate a temporary order number
export const generateTempOrderNumber = (): string => {
  return `MT${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
};

// Get payment message based on payment method
export const getPaymentMessage = (paymentMethod: PaymentMethod): string => {
  const paymentMessages = {
    card: "Paiement par carte traité avec succès",
    orange: "Vérification du paiement Orange Money en cours...",
    airtel: "Vérification du paiement Airtel Money en cours...",
    cod: "Votre commande a été confirmée. Vous paierez à la livraison."
  };
  
  return paymentMessages[paymentMethod];
};
