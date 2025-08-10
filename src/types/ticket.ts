import {
  TicketType,
  TicketStatus,
  Event,
  User,
  Attendee,
  CheckIn,
} from "@prisma/client";

// Base Ticket interface
export interface Ticket {
  id: string;
  qrCode: string;
  ticketType: TicketType;
  price: number;
  status: TicketStatus;
  purchasedAt: Date;
  validUntil: Date;
  eventId: string;
  userId: string;
}

// Ticket with relations
export interface TicketWithRelations extends Ticket {
  event?: Event;
  user?: User;
  attendee?: Attendee;
  checkIns?: CheckIn[];
}

// Ticket statistics
export interface TicketStats {
  totalTickets: number;
  activeTickets: number;
  usedTickets: number;
  expiredTickets: number;
  cancelledTickets: number;
  refundedTickets: number;
  totalRevenue: number;
  averagePrice: number;
}

// Request types
export interface CreateTicketRequest {
  eventId: string;
  userId: string;
  ticketType: TicketType;
  price?: number;
  validUntil?: Date;
}

export interface UpdateTicketRequest {
  status?: TicketStatus;
  ticketType?: TicketType;
  price?: number;
  validUntil?: Date;
}

export interface BulkTicketRequest {
  eventId: string;
  tickets: Array<{
    userId: string;
    ticketType: TicketType;
    price?: number;
  }>;
}

// Response types
export interface TicketResponse {
  success: boolean;
  data?: TicketWithRelations;
  error?: string;
  message?: string;
}

export interface TicketListResponse {
  success: boolean;
  data?: {
    tickets: TicketWithRelations[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    stats?: TicketStats;
  };
  error?: string;
  message?: string;
}

// Ticket validation
export interface TicketValidation {
  isValid: boolean;
  reason?: string;
  ticket?: TicketWithRelations;
  canCheckIn: boolean;
  alreadyCheckedIn: boolean;
  isExpired: boolean;
}

// QR code data embedded in tickets
export interface TicketQRData {
  ticketId: string;
  eventId: string;
  userId: string;
  type: "ticket";
  validUntil: Date;
  checksum?: string; // For additional security
}

// Ticket filters
export interface TicketFilters {
  eventId?: string;
  userId?: string;
  ticketType?: TicketType;
  status?: TicketStatus;
  dateFrom?: Date;
  dateTo?: Date;
  priceMin?: number;
  priceMax?: number;
  search?: string;
}

// Transfer ticket (for future feature)
export interface TicketTransferRequest {
  ticketId: string;
  fromUserId: string;
  toUserId: string;
  transferReason?: string;
}

export interface TicketTransferResponse {
  success: boolean;
  data?: {
    ticket: TicketWithRelations;
    transferId: string;
    transferredAt: Date;
  };
  error?: string;
  message?: string;
}
