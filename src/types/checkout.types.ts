
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
  id: string | number;
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
