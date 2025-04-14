
export type EventCategory = 
  | "concerts"
  | "festivals"
  | "theatre"
  | "soirees-privees"
  | "sport";

export type TicketType = 
  | "vip"
  | "standard"
  | "standard-plus"
  | "balcon"
  | "fosse"
  | "gradin"
  | "lounge"
  | "emplacement";

export type TicketStatus = 
  | "en-vente"        // Available for purchase
  | "vendu"           // Sold but not yet validated
  | "revendu"         // Resold to another user
  | "valide"          // Scanned at event entry
  | "annule"          // Cancelled
  | "expire";         // Event has passed

export interface EventTicket {
  id: string;
  eventId: string;
  ticketType: TicketType;
  originalPrice: number;
  sellingPrice: number;
  status: TicketStatus;
  ownerId: string;
  originalOwnerId?: string;
  qrCodeUrl?: string;
  purchaseDate?: Date;
  validationDate?: Date;
  seat?: string;
  section?: string;
  row?: string;
  isResale: boolean;
  originalOrderNumber?: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  category: EventCategory;
  date: Date;
  endDate?: Date;
  venue: string;
  address: string;
  city: string;
  country: string;
  organizerId: string;
  organizerName: string;
  verified: boolean;
  imageUrl?: string;
  ticketTypes: {
    type: TicketType;
    description: string;
    price: number;
    availableQuantity: number;
  }[];
  resaleDeadline?: Date;
  maxResaleTickets?: number;
  termsAndConditions?: string;
}
