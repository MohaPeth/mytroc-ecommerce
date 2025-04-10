
// Mock data for a user profile
export const USER_PROFILE = {
  id: '2',
  name: 'Thomas Durand',
  email: 'thomas.durand@example.com',
  phone: '07 98 76 54 32',
  address: '15 Rue des Fleurs, 75001 Paris',
  type: 'seller',
  status: 'active',
  registrationDate: '2024-01-15',
  lastActivity: '2025-04-09',
  notes: 'Vendeur professionnel très actif',
  rating: 4.7,
  totalSales: 42,
  totalPurchases: 3,
  totalRevenue: 3450.75,
  profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas',
  sellerDetails: {
    companyName: 'Durand Électronique',
    siret: '12345678901234',
    vatNumber: 'FR12345678901',
    storeUrl: '/vendeur/thomas-durand',
    productCategories: ['Électronique', 'Informatique'],
    averageResponseTime: '2h'
  }
};

// Mock data for products
export const PRODUCTS_DATA = [
  {
    id: 'P1',
    name: 'Smartphone reconditionné',
    price: 299.99,
    status: 'active',
    stock: 5,
    views: 1243,
    sales: 18
  },
  {
    id: 'P2',
    name: 'Casque audio sans fil',
    price: 89.99,
    status: 'active',
    stock: 12,
    views: 876,
    sales: 14
  },
  {
    id: 'P3',
    name: 'Tablette 10 pouces',
    price: 199.99,
    status: 'inactive',
    stock: 0,
    views: 432,
    sales: 6
  },
  {
    id: 'P4',
    name: 'Souris ergonomique',
    price: 49.99,
    status: 'active',
    stock: 8,
    views: 354,
    sales: 4
  }
];

// Mock data for transactions
export const TRANSACTIONS_DATA = [
  {
    id: 'T1',
    date: '2025-04-02',
    type: 'sale',
    product: 'Smartphone reconditionné',
    amount: 299.99,
    status: 'completed',
    customer: 'Sophie Martin'
  },
  {
    id: 'T2',
    date: '2025-03-28',
    type: 'sale',
    product: 'Casque audio sans fil',
    amount: 89.99,
    status: 'completed',
    customer: 'Lucas Bernard'
  },
  {
    id: 'T3',
    date: '2025-03-25',
    type: 'sale',
    product: 'Smartphone reconditionné',
    amount: 299.99,
    status: 'completed',
    customer: 'Emma Dubois'
  },
  {
    id: 'T4',
    date: '2025-03-20',
    type: 'purchase',
    product: 'Écouteurs sans fil',
    amount: 59.99,
    status: 'completed',
    customer: 'Hugo Moreau'
  }
];

// Mock data for ratings
export const RATINGS_DATA = [
  {
    id: 'R1',
    date: '2025-04-03',
    rating: 5,
    comment: 'Excellent vendeur, livraison rapide et produit conforme à la description !',
    from: 'Sophie Martin'
  },
  {
    id: 'R2',
    date: '2025-03-29',
    rating: 4,
    comment: 'Bon vendeur, produit de qualité.',
    from: 'Lucas Bernard'
  },
  {
    id: 'R3',
    date: '2025-03-26',
    rating: 5,
    comment: 'Très satisfaite de mon achat, je recommande !',
    from: 'Emma Dubois'
  }
];

// Mock data for sales chart
export const SALES_CHART_DATA = [
  { date: '01/03', revenue: 350, orders: 2 },
  { date: '08/03', revenue: 290, orders: 1 },
  { date: '15/03', revenue: 580, orders: 3 },
  { date: '22/03', revenue: 390, orders: 2 },
  { date: '29/03', revenue: 690, orders: 4 },
  { date: '05/04', revenue: 300, orders: 1 },
];
