
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';
import { useAuth } from './useAuth';
import { useCart } from './useCart';
import { useUserProfile } from './useUserProfile';
import { 
  CheckoutState, 
  DeliveryAddress, 
  DeliveryMethod, 
  PaymentMethod, 
  PersonalInfo, 
  RelayPoint 
} from '@/types/checkout.types';
import { calculateDeliveryFee, getPaymentMessage } from '@/utils/checkout.utils';
import { createOrder, createOrderItems, createOrderNotification } from '@/services/checkout.service';

// Re-export types using "export type" syntax for isolatedModules compatibility
export type { PersonalInfo } from '@/types/checkout.types';
export type { DeliveryAddress } from '@/types/checkout.types';
export type { DeliveryMethod } from '@/types/checkout.types';
export type { RelayPoint } from '@/types/checkout.types';
export type { PaymentMethod } from '@/types/checkout.types';
export type { CheckoutState } from '@/types/checkout.types';

export function useCheckout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, totalPrice, clearCart } = useCart();
  const { fetchUserProfile } = useUserProfile();
  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);

  // État initial du checkout
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    personalInfo: null,
    deliveryAddress: null,
    useMainAddress: true,
    deliveryMethod: 'relay',
    relayPoint: null,
    paymentMethod: 'card',
    mobileNumber: '',
    transactionId: '',
    termsAccepted: false,
    promoCode: ''
  });

  // Récupérer les informations du profil pour pré-remplir les formulaires
  const loadUserProfile = async () => {
    if (!user) return;

    try {
      const profile = await fetchUserProfile();
      if (profile) {
        // Pré-remplir les informations personnelles
        setCheckoutState(prev => ({
          ...prev,
          personalInfo: {
            firstName: profile.first_name || '',
            lastName: profile.last_name || '',
            email: user.email || '',
            phone: profile.phone || ''
          },
          deliveryAddress: profile.address ? {
            fullName: `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
            street: profile.address.street || '',
            city: profile.address.city || '',
            postalCode: profile.address.zip_code || '',
            country: profile.address.country || '',
            phone: profile.phone || ''
          } : null
        }));
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
    }
  };

  // Mettre à jour les différentes sections du checkout
  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    setCheckoutState(prev => ({ ...prev, personalInfo }));
    // Stocker temporairement les informations
    sessionStorage.setItem('checkoutPersonalInfo', JSON.stringify(personalInfo));
    navigate('/checkout/livraison');
  };

  const updateDeliveryDetails = (details: {
    deliveryMethod: DeliveryMethod;
    relayPoint?: RelayPoint | null;
    deliveryAddress?: DeliveryAddress | null;
    useMainAddress?: boolean;
  }) => {
    setCheckoutState(prev => ({
      ...prev,
      ...details
    }));
    // Stocker temporairement les détails de livraison
    sessionStorage.setItem('deliveryMethod', details.deliveryMethod);
    if (details.relayPoint) {
      sessionStorage.setItem('relayPoint', JSON.stringify(details.relayPoint));
    }
    if (details.deliveryAddress) {
      sessionStorage.setItem('deliveryAddress', JSON.stringify(details.deliveryAddress));
    }
    navigate('/checkout/confirmation');
  };

  const updatePaymentDetails = (details: {
    paymentMethod: PaymentMethod;
    mobileNumber?: string;
    transactionId?: string;
    termsAccepted: boolean;
    promoCode?: string;
  }) => {
    setCheckoutState(prev => ({
      ...prev,
      ...details
    }));
  };

  // Finaliser la commande
  const finalizeOrder = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour finaliser votre commande",
        variant: "destructive"
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Panier vide",
        description: "Votre panier est vide",
        variant: "destructive"
      });
      return;
    }

    const { paymentMethod, deliveryMethod, relayPoint, useMainAddress, deliveryAddress } = checkoutState;

    if (!checkoutState.termsAccepted) {
      toast({
        title: "Conditions requises",
        description: "Veuillez accepter les conditions générales de vente pour continuer",
        variant: "destructive"
      });
      return;
    }

    // Validation spécifique pour les paiements mobiles
    if ((paymentMethod === 'orange' || paymentMethod === 'airtel') && 
        (!checkoutState.mobileNumber || !checkoutState.transactionId)) {
      toast({
        title: "Informations requises",
        description: "Veuillez fournir votre numéro de téléphone et l'ID de transaction",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);

      // Calcul de la livraison
      const deliveryFee = calculateDeliveryFee(deliveryMethod);

      // Préparer les détails de paiement
      const paymentDetails = 
        paymentMethod === 'orange' || paymentMethod === 'airtel' 
          ? {
              mobile_number: checkoutState.mobileNumber,
              transaction_id: checkoutState.transactionId
            } 
          : {};

      // Créer la commande
      const orderData = await createOrder(
        user.id,
        totalPrice + deliveryFee,
        deliveryMethod,
        deliveryFee,
        relayPoint,
        useMainAddress,
        deliveryAddress,
        paymentMethod,
        paymentDetails
      );

      // Créer les articles de la commande
      await createOrderItems(orderData.id, items);

      // Créer une notification pour l'utilisateur
      await createOrderNotification(user.id, orderData.order_number);

      setOrderCreated(true);
      
      // Message de succès selon le mode de paiement
      toast({
        title: "Commande confirmée",
        description: getPaymentMessage(paymentMethod)
      });

      // Rediriger vers la page de remerciement
      setTimeout(() => {
        clearCart();
        navigate('/checkout/merci');
      }, 1500);

    } catch (error: any) {
      console.error('Erreur lors de la finalisation de la commande:', error.message);
      toast({
        title: "Erreur",
        description: `Impossible de finaliser votre commande: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    checkoutState,
    loading,
    orderCreated,
    loadUserProfile,
    updatePersonalInfo,
    updateDeliveryDetails,
    updatePaymentDetails,
    finalizeOrder,
  };
}
