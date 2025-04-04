
export interface Offer {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  customer: {
    name: string;
    email: string;
  };
  originalPrice: number;
  offerPrice: number;
  message?: string;
  sellerResponse?: string;
  status: 'pending' | 'accepted' | 'rejected';
  date: Date;
}

export interface OffersTableProps {
  offers: Offer[];
  onViewProduct: (id: string) => void;
  onAcceptOffer?: (id: string) => void;
  onRejectOffer?: (id: string) => void;
  onRespondToOffer?: (id: string, response: string) => void;
}
