
// Mock data for contacts
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  status: string;
  lastActivity: string;
  notes: string;
}

export const CONTACTS_DATA: Contact[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    phone: '06 12 34 56 78',
    type: 'buyer',
    status: 'active',
    lastActivity: '2025-04-08',
    notes: 'Cliente régulière, préfère les articles éco-responsables'
  },
  {
    id: '2',
    name: 'Thomas Durand',
    email: 'thomas.durand@example.com',
    phone: '07 98 76 54 32',
    type: 'seller',
    status: 'active',
    lastActivity: '2025-04-09',
    notes: 'Vendeur professionnel très actif'
  },
  {
    id: '3',
    name: 'Camille Petit',
    email: 'camille.petit@example.com',
    phone: '06 45 67 89 01',
    type: 'buyer_seller',
    status: 'inactive',
    lastActivity: '2025-03-20',
    notes: 'Achète et vend des articles de mode'
  },
  {
    id: '4',
    name: 'Lucas Bernard',
    email: 'lucas.bernard@example.com',
    phone: '07 23 45 67 89',
    type: 'seller',
    status: 'active',
    lastActivity: '2025-04-07',
    notes: 'Vendeur de produits électroniques'
  },
  {
    id: '5',
    name: 'Emma Dubois',
    email: 'emma.dubois@example.com',
    phone: '06 78 90 12 34',
    type: 'buyer',
    status: 'inactive',
    lastActivity: '2025-03-15',
    notes: ''
  },
  {
    id: '6',
    name: 'Hugo Moreau',
    email: 'hugo.moreau@example.com',
    phone: '07 34 56 78 90',
    type: 'buyer_seller',
    status: 'active',
    lastActivity: '2025-04-06',
    notes: 'À contacter pour le programme d\'ambassadeur'
  },
  {
    id: '7',
    name: 'Léa Roux',
    email: 'lea.roux@example.com',
    phone: '06 56 78 90 12',
    type: 'buyer',
    status: 'active',
    lastActivity: '2025-04-05',
    notes: 'Intéressée par les produits artisanaux'
  },
  {
    id: '8',
    name: 'Jules Fournier',
    email: 'jules.fournier@example.com',
    phone: '07 67 89 01 23',
    type: 'seller',
    status: 'active',
    lastActivity: '2025-04-08',
    notes: 'Vendeur de livres et jeux de société'
  }
];
