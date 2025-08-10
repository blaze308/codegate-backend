import {
  EventCategory,
  EventStatus,
  TicketType,
  TicketStatus,
  VendorStatus,
  VendorPaymentStatus,
} from "@prisma/client";

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  eventDate: Date;
  startTime: string;
  endTime?: string;
  location: EventLocation;
  capacity: number;
  currentAttendees: number;
  ticketPrice: number;
  currency: string;
  hostId: string;
  status: EventStatus;
  qrCode?: string;
  images: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;

  // Wedding/Party specific fields
  coupleName?: string;
  hostName?: string;
  dressCode?: string;
  specialInstructions?: string;
  giftRegistry?: string;
  rsvpDeadline?: Date;
  isPlusOneAllowed: boolean;
  mealPreferences: string[];
}

export interface EventLocation {
  venue: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface EventGuest {
  id: string;
  eventId: string;
  userId: string;
  ticketId: string;
  checkedIn: boolean;
  checkedInAt?: Date;
  registeredAt: Date;

  // Wedding/Party specific fields
  mealPreference?: string;
  hasPlusOne: boolean;
  plusOneName?: string;
  specialNeeds?: string;
  tableNumber?: number;
  rsvpStatus: string;
}

export interface EventTicket {
  id: string;
  eventId: string;
  userId: string;
  qrCode: string;
  ticketType: TicketType;
  price: number;
  status: TicketStatus;
  purchasedAt: Date;
  validUntil: Date;
}

export interface EventHost {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  verified: boolean;
  createdAt: Date;
}

export interface EventCheckIn {
  id: string;
  eventId: string;
  attendeeId: string;
  ticketId: string;
  qrCode: string;
  checkedInAt: Date;
  checkedInBy: string; // Staff member ID
  location?: string;
}

export interface EventSegment {
  id: string;
  eventId: string;
  eventDetail: string;
  performedBy: string;
  durationMinutes: number;
  startTime: Date;
  endTime: Date;
  order: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vendor {
  id: string;
  eventId: string;
  name: string;
  serviceType: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  socialMedia?: Record<string, string>;
  notes?: string;
  status: VendorStatus;
  paymentStatus: VendorPaymentStatus;
  contractSigned: boolean;
  totalAmount?: number;
  paidAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Types are imported from Prisma client above

// API Request/Response Types
export interface CreateEventRequest {
  title: string;
  description: string;
  category: EventCategory;
  eventDate: string;
  startTime: string;
  endTime?: string;
  location: EventLocation;
  capacity: number;
  ticketPrice: number;
  currency: string;
  images?: string[];
  tags?: string[];

  // Wedding/Party/Business specific fields
  coupleName?: string;
  hostName?: string;
  dressCode?: string;
  specialInstructions?: string;
  giftRegistry?: string;
  rsvpDeadline?: string;
  isPlusOneAllowed?: boolean;
  mealPreferences?: string[];
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  status?: EventStatus;
}

export interface EventResponse {
  success: boolean;
  data?: Event;
  error?: string;
  message?: string;
}

export interface EventListResponse {
  success: boolean;
  data?: {
    events: Event[];
    total: number;
    page: number;
    limit: number;
  };
  error?: string;
  message?: string;
}

export interface EventFilters {
  category?: EventCategory;
  status?: EventStatus;
  startDate?: string;
  endDate?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  search?: string;
}

export interface TicketPurchaseRequest {
  eventId: string;
  ticketType: TicketType;
  quantity: number;
  user: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface QRCheckInRequest {
  qrCode: string;
  eventId?: string;
  staffId?: string;
  location?: string;
}

export interface CreateEventSegmentRequest {
  eventDetail: string;
  performedBy: string;
  durationMinutes: number;
  startTime: string;
  order: number;
  notes?: string;
}

export interface CreateVendorRequest {
  name: string;
  serviceType: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  socialMedia?: Record<string, string>;
  notes?: string;
  totalAmount?: number;
  contractSigned?: boolean;
}

export interface UpdateVendorRequest extends Partial<CreateVendorRequest> {
  status?: VendorStatus;
  paymentStatus?: VendorPaymentStatus;
  paidAmount?: number;
}

export interface EventQRData {
  id?: string;
  title: string;
  eventDate: Date;
  venue: string;
  description?: string;
  dressCode?: string;
  segments: EventSegmentInfo[];
  vendors?: VendorInfo[];
}

export interface EventSegmentInfo {
  eventDetail: string;
  performedBy: string;
  durationMinutes: number;
  startTime: Date;
}

export interface VendorInfo {
  name: string;
  serviceType: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  socialMedia?: Record<string, string>;
}
