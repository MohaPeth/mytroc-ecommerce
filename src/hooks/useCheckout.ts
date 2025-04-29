
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { useAuth } from './useAuth';
import { useCart } from './useCart';
import { useUserProfile } from './useUserProfile';
import { Json } from '@/integrations/supabase/types';

// Types pour les informations personnelles
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Types pour l'adresse de livraison
export interface DeliveryAddress {
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

// Types pour le mode de livraison
export type DeliveryMethod = 'relay' | 'home';

// Types pour les informations du point relais
export interface RelayPoint {
  id: string | number; // Changed to accept both string and number
  name: string;
  address: string;
  distance: string;
}

// Types pour la méthode de paiement
export type PaymentMethod = 'card' | 'orange' | 'airtel' | 'cod';

// Types pour l'état complet du checkout
export interface CheckoutState {
  personalInfo: PersonalInfo | null;
  deliveryAddress: DeliveryAddress | null;
  useMainAddress: boolean;
  deliveryMethod: DeliveryMethod;
  relayPoint: RelayPoint | null;
  paymentMethod: PaymentMethod;
  mobileNumber: string;
  transactionId: string;
  termsAccepted: boolean;
  promoCode: string;
}

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

      // Préparation des données pour la commande
      const orderItems = items.map(item => ({
        product_id: String(item.productId || item.id),
        quantity: item.quantity,
        price: item.price,
        total_price: item.price * item.quantity
      }));

      // Calcul de la livraison
      const deliveryFee = deliveryMethod === 'home' ? 1000 : 0; // 1000 FCFA pour la livraison à domicile

      // Génère un numéro de commande temporaire (sera remplacé par la séquence côté DB)
      const tempOrderNumber = `MT${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

      // Préparation des données de livraison pour la base de données
      const orderDataToInsert = {
        user_id: user.id,
        order_number: tempOrderNumber,
        total_amount: totalPrice + deliveryFee,
        delivery_method: deliveryMethod,
        delivery_fee: deliveryFee,
        relay_point_id: relayPoint?.id ? String(relayPoint.id) : null, // Convert to string to match Supabase type
        delivery_address: useMainAddress ? null : deliveryAddress ? JSON.stringify(deliveryAddress) : null,
        payment_method: paymentMethod,
        payment_details: paymentMethod === 'orange' || paymentMethod === 'airtel' ? {
          mobile_number: checkoutState.mobileNumber,
          transaction_id: checkoutState.transactionId
        } : {},
        status: 'pending',
        payment_status: paymentMethod === 'cod' ? 'pending' : 'processing'
      };

      // Insertion de la commande dans la base de données
      const { data, error: orderError } = await supabase
        .from('orders')
        .insert(orderDataToInsert)
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // Insertion des articles de la commande
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(
          orderItems.map(item => ({
            order_id: data.id,
            product_id: String(item.product_id), // Ensure product_id is a string
            quantity: item.quantity,
            price: item.price,
            total_price: item.total_price
          }))
        );

      if (itemsError) {
        throw itemsError;
      }

      // Créer une notification pour l'utilisateur
      await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          title: 'Commande confirmée',
          message: `Votre commande #${data.order_number} a été confirmée et est en cours de traitement.`,
          type: 'order',
          action_url: `/order-details/${data.order_number}`
        });

      setOrderCreated(true);
      
      // Message de succès selon le mode de paiement
      const paymentMessages = {
        card: "Paiement par carte traité avec succès",
        orange: "Vérification du paiement Orange Money en cours...",
        airtel: "Vérification du paiement Airtel Money en cours...",
        cod: "Votre commande a été confirmée. Vous paierez à la livraison."
      };
      
      toast({
        title: "Commande confirmée",
        description: paymentMessages[paymentMethod]
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
