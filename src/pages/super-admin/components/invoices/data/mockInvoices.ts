
export const MOCK_INVOICES = [
  {
    id: 'INV-001',
    customerName: 'Jean Dupont',
    customerEmail: 'jean.dupont@example.com',
    date: new Date(2025, 2, 15),
    amount: 12500,
    status: 'paid',
    items: [
      { name: 'Produit A', quantity: 2, price: 5000 },
      { name: 'Produit B', quantity: 1, price: 2500 }
    ],
  },
  {
    id: 'INV-002',
    customerName: 'Marie Martin',
    customerEmail: 'marie.martin@example.com',
    date: new Date(2025, 2, 18),
    amount: 35000,
    status: 'pending',
    items: [
      { name: 'Service Premium', quantity: 1, price: 35000 }
    ],
  },
  {
    id: 'INV-003',
    customerName: 'Sophie Bernard',
    customerEmail: 'sophie.bernard@example.com',
    date: new Date(2025, 2, 20),
    amount: 7500,
    status: 'paid',
    items: [
      { name: 'Produit C', quantity: 3, price: 2500 }
    ],
  },
  {
    id: 'INV-004',
    customerName: 'Thomas Petit',
    customerEmail: 'thomas.petit@example.com',
    date: new Date(2025, 2, 22),
    amount: 18000,
    status: 'cancelled',
    items: [
      { name: 'Produit D', quantity: 1, price: 15000 },
      { name: 'Service Basic', quantity: 1, price: 3000 }
    ],
  },
  {
    id: 'INV-005',
    customerName: 'Camille Roux',
    customerEmail: 'camille.roux@example.com',
    date: new Date(2025, 2, 25),
    amount: 42500,
    status: 'paid',
    items: [
      { name: 'Pack Complet', quantity: 1, price: 42500 }
    ],
  },
];
