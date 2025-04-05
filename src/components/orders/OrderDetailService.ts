
// This service contains the mock data and logic for order details

interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

export interface OrderDetails {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  totalAmount: string;
  items: OrderItem[];
  shipping: {
    method: string;
    cost: string;
    address: ShippingAddress;
    trackingNumber: string;
  };
  payment: {
    method: string;
    cardLast4: string;
    subtotal: string;
    tax: string;
    total: string;
  };
}

// Mock data for the order details
export const getOrderDetails = (orderId: string): OrderDetails => {
  const statusMap: Record<string, string> = {
    'MT2023-756': 'delivered',
    'MT2023-689': 'shipped',
    'MT2023-542': 'cancelled'
  };
  
  return {
    id: orderId,
    orderNumber: `#${orderId}`,
    date: orderId === 'MT2023-756' ? '15/06/2023' : orderId === 'MT2023-689' ? '28/05/2023' : '10/04/2023',
    status: statusMap[orderId] || 'processing',
    totalAmount: orderId === 'MT2023-756' ? '78,90 €' : orderId === 'MT2023-689' ? '124,50 €' : '56,20 €',
    items: [{
      id: '1',
      name: 'T-shirt écologique en coton bio',
      price: '29,90 €',
      quantity: 1,
      image: '/placeholder.svg'
    }, {
      id: '2',
      name: 'Gourde réutilisable 500ml',
      price: '19,90 €',
      quantity: 2,
      image: '/placeholder.svg'
    }],
    shipping: {
      method: 'Livraison standard',
      cost: '4,90 €',
      address: {
        fullName: 'Jean Dupont',
        street: '15 Rue de la Paix',
        city: 'Paris',
        postalCode: '75001',
        country: 'France'
      },
      trackingNumber: 'FR78945612307'
    },
    payment: {
      method: 'Carte bancaire',
      cardLast4: '4242',
      subtotal: '69,70 €',
      tax: '4,30 €',
      total: orderId === 'MT2023-756' ? '78,90 €' : orderId === 'MT2023-689' ? '124,50 €' : '56,20 €'
    }
  };
};
