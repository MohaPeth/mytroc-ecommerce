
import { Event, EventTicket } from '@/types/event.types';

// Mock Events
export const MOCK_EVENTS: Event[] = [
  {
    id: 'event-001',
    name: 'Festival de Jazz de Paris',
    description: 'Le plus grand festival de jazz de Paris avec plus de 50 artistes internationaux',
    category: 'festivals',
    date: new Date('2025-06-15T18:00:00'),
    endDate: new Date('2025-06-18T23:00:00'),
    venue: 'Parc de la Villette',
    address: '211 Avenue Jean Jaurès',
    city: 'Paris',
    country: 'France',
    organizerId: 'org-1',
    organizerName: 'Paris Jazz Productions',
    verified: true,
    imageUrl: '/placeholder.svg',
    ticketTypes: [
      {
        type: 'vip',
        description: 'Accès à toutes les scènes + espace VIP',
        price: 199.99,
        availableQuantity: 100
      },
      {
        type: 'standard',
        description: 'Accès à toutes les scènes',
        price: 89.99,
        availableQuantity: 500
      }
    ],
    resaleDeadline: new Date('2025-06-14T23:59:59'),
    maxResaleTickets: 2
  },
  {
    id: 'event-002',
    name: 'Concert Aya Nakamura',
    description: 'Aya Nakamura en concert exceptionnel à Lyon',
    category: 'concerts',
    date: new Date('2025-05-10T20:30:00'),
    venue: 'Halle Tony Garnier',
    address: '20 Place des Docteurs Charles et Christophe Mérieux',
    city: 'Lyon',
    country: 'France',
    organizerId: 'org-2',
    organizerName: 'Live Nation France',
    verified: true,
    imageUrl: '/placeholder.svg',
    ticketTypes: [
      {
        type: 'fosse',
        description: 'Placement libre - Fosse',
        price: 69.99,
        availableQuantity: 1000
      },
      {
        type: 'gradin',
        description: 'Placement numéroté - Gradin',
        price: 79.99,
        availableQuantity: 2000
      }
    ],
    resaleDeadline: new Date('2025-05-09T23:59:59'),
    maxResaleTickets: 2
  },
  {
    id: 'event-003',
    name: 'Match PSG - Marseille',
    description: 'Le classique du championnat français',
    category: 'sport',
    date: new Date('2025-04-20T21:00:00'),
    venue: 'Parc des Princes',
    address: '24 Rue du Commandant Guilbaud',
    city: 'Paris',
    country: 'France',
    organizerId: 'org-3',
    organizerName: 'PSG',
    verified: true,
    imageUrl: '/placeholder.svg',
    ticketTypes: [
      {
        type: 'vip',
        description: 'Loges VIP avec service de restauration',
        price: 350,
        availableQuantity: 50
      },
      {
        type: 'standard-plus',
        description: 'Tribune centrale',
        price: 120,
        availableQuantity: 1000
      },
      {
        type: 'standard',
        description: 'Tribune latérale',
        price: 80,
        availableQuantity: 5000
      }
    ],
    resaleDeadline: new Date('2025-04-19T23:59:59'),
    maxResaleTickets: 1
  }
];

// Mock Tickets for sale/resale
export const MOCK_TICKETS: EventTicket[] = [
  {
    id: 'ticket-001',
    eventId: 'event-001',
    ticketType: 'vip',
    originalPrice: 199.99,
    sellingPrice: 230,
    status: 'en-vente',
    ownerId: 'user-1',
    qrCodeUrl: '/placeholder.svg',
    isResale: true,
    originalOrderNumber: 'ORD-X12345',
    seat: '',
    section: 'VIP'
  },
  {
    id: 'ticket-002',
    eventId: 'event-002',
    ticketType: 'fosse',
    originalPrice: 69.99,
    sellingPrice: 69.99,
    status: 'en-vente',
    ownerId: 'user-2',
    isResale: false
  },
  {
    id: 'ticket-003',
    eventId: 'event-003',
    ticketType: 'standard-plus',
    originalPrice: 120,
    sellingPrice: 100,
    status: 'en-vente',
    ownerId: 'user-3',
    qrCodeUrl: '/placeholder.svg',
    isResale: true,
    originalOrderNumber: 'ORD-X54321',
    seat: '45',
    row: 'G',
    section: 'Tribune Est'
  }
];
